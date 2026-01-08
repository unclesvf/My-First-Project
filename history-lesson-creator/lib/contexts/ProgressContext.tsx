"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  getLessonProgress,
  updateStoryProgress as firestoreUpdateStoryProgress,
  updateFlashcardProgress as firestoreUpdateFlashcardProgress,
  saveQuizAttempt as firestoreSaveQuizAttempt,
  getQuizAttempts,
} from '@/lib/firebase/firestore';
import type { LessonProgress, QuizAttempt } from '@/lib/firebase/types';

interface ProgressContextType {
  // Current lesson progress
  currentLessonProgress: LessonProgress | null;
  loading: boolean;

  // Progress tracking methods
  updateStoryProgress: (lessonId: string, currentChapter: number, totalChapters: number) => Promise<void>;
  updateFlashcardProgress: (
    lessonId: string,
    cardIndex: number,
    totalCards: number,
    masteredCardIds: string[]
  ) => Promise<void>;
  saveQuizAttempt: (
    lessonId: string,
    courseId: string,
    score: number,
    totalQuestions: number,
    percentage: number,
    answers: any[],
    timeSpent: number
  ) => Promise<string>;

  // Progress retrieval
  getLessonProgressData: (lessonId: string) => Promise<LessonProgress | null>;
  getQuizHistory: (lessonId?: string) => Promise<QuizAttempt[]>;
  refreshProgress: () => Promise<void>;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
  lessonId?: string; // Optional: if provided, will load progress for this lesson
}

export function ProgressProvider({ children, lessonId }: ProgressProviderProps) {
  const { user } = useAuth();
  const [currentLessonProgress, setCurrentLessonProgress] = useState<LessonProgress | null>(null);
  const [loading, setLoading] = useState(false);

  // Debounce timer for batch updates
  const [pendingUpdates, setPendingUpdates] = useState<Map<string, NodeJS.Timeout>>(new Map());

  // Load lesson progress on mount or when lessonId changes
  useEffect(() => {
    if (user && lessonId) {
      loadLessonProgress(lessonId);
    } else {
      setCurrentLessonProgress(null);
    }
  }, [user, lessonId]);

  // Load lesson progress from Firestore
  const loadLessonProgress = async (lesson: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const progress = await getLessonProgress(user.uid, lesson);
      setCurrentLessonProgress(progress);
    } catch (error) {
      console.error('Error loading lesson progress:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced story progress update
  const updateStoryProgress = useCallback(
    async (lesson: string, currentChapter: number, totalChapters: number) => {
      if (!user) {
        console.warn('Cannot update progress: user not authenticated');
        return;
      }

      // Update local state immediately for responsive UI
      setCurrentLessonProgress(prev => ({
        ...prev,
        lessonId: lesson,
        status: currentChapter === totalChapters - 1 ? 'completed' : 'in_progress',
        storyProgress: {
          currentChapter,
          chaptersCompleted: prev?.storyProgress?.chaptersCompleted || [],
          totalChapters,
        },
      } as LessonProgress));

      // Debounce Firestore write
      const key = `story-${lesson}`;
      if (pendingUpdates.has(key)) {
        clearTimeout(pendingUpdates.get(key)!);
      }

      const timer = setTimeout(async () => {
        try {
          await firestoreUpdateStoryProgress(user.uid, lesson, currentChapter, totalChapters);
          // Reload to get server data
          await loadLessonProgress(lesson);
        } catch (error) {
          console.error('Error updating story progress:', error);
        } finally {
          pendingUpdates.delete(key);
          setPendingUpdates(new Map(pendingUpdates));
        }
      }, 500); // 500ms debounce

      pendingUpdates.set(key, timer);
      setPendingUpdates(new Map(pendingUpdates));
    },
    [user, pendingUpdates]
  );

  // Debounced flashcard progress update
  const updateFlashcardProgress = useCallback(
    async (
      lesson: string,
      cardIndex: number,
      totalCards: number,
      masteredCardIds: string[]
    ) => {
      if (!user) {
        console.warn('Cannot update progress: user not authenticated');
        return;
      }

      // Update local state immediately
      setCurrentLessonProgress(prev => ({
        ...prev,
        lessonId: lesson,
        flashcardProgress: {
          cardsViewed: cardIndex + 1,
          cardsTotal: totalCards,
          lastCardIndex: cardIndex,
          masteredCards: masteredCardIds,
        },
      } as LessonProgress));

      // Debounce Firestore write
      const key = `flashcard-${lesson}`;
      if (pendingUpdates.has(key)) {
        clearTimeout(pendingUpdates.get(key)!);
      }

      const timer = setTimeout(async () => {
        try {
          await firestoreUpdateFlashcardProgress(
            user.uid,
            lesson,
            cardIndex,
            totalCards,
            masteredCardIds
          );
          // Reload to get server data
          await loadLessonProgress(lesson);
        } catch (error) {
          console.error('Error updating flashcard progress:', error);
        } finally {
          pendingUpdates.delete(key);
          setPendingUpdates(new Map(pendingUpdates));
        }
      }, 500); // 500ms debounce

      pendingUpdates.set(key, timer);
      setPendingUpdates(new Map(pendingUpdates));
    },
    [user, pendingUpdates]
  );

  // Save quiz attempt (no debounce - immediate save)
  const saveQuizAttempt = useCallback(
    async (
      lesson: string,
      courseId: string,
      score: number,
      totalQuestions: number,
      percentage: number,
      answers: any[],
      timeSpent: number
    ): Promise<string> => {
      if (!user) {
        throw new Error('Cannot save quiz attempt: user not authenticated');
      }

      try {
        const attemptId = await firestoreSaveQuizAttempt(
          user.uid,
          courseId,
          lesson,
          score,
          totalQuestions,
          percentage,
          answers,
          timeSpent
        );

        // Reload lesson progress to reflect quiz completion
        await loadLessonProgress(lesson);

        return attemptId;
      } catch (error) {
        console.error('Error saving quiz attempt:', error);
        throw error;
      }
    },
    [user]
  );

  // Get lesson progress data
  const getLessonProgressData = useCallback(
    async (lesson: string): Promise<LessonProgress | null> => {
      if (!user) return null;

      try {
        return await getLessonProgress(user.uid, lesson);
      } catch (error) {
        console.error('Error getting lesson progress:', error);
        return null;
      }
    },
    [user]
  );

  // Get quiz history
  const getQuizHistory = useCallback(
    async (lesson?: string): Promise<QuizAttempt[]> => {
      if (!user) return [];

      try {
        return await getQuizAttempts(user.uid, lesson);
      } catch (error) {
        console.error('Error getting quiz history:', error);
        return [];
      }
    },
    [user]
  );

  // Refresh current lesson progress
  const refreshProgress = useCallback(async () => {
    if (lessonId) {
      await loadLessonProgress(lessonId);
    }
  }, [lessonId, user]);

  // Cleanup pending updates on unmount
  useEffect(() => {
    return () => {
      pendingUpdates.forEach(timer => clearTimeout(timer));
    };
  }, [pendingUpdates]);

  const value: ProgressContextType = {
    currentLessonProgress,
    loading,
    updateStoryProgress,
    updateFlashcardProgress,
    saveQuizAttempt,
    getLessonProgressData,
    getQuizHistory,
    refreshProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
