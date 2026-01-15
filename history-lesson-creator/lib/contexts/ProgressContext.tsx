"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { logger } from '@/lib/utils/logger';
import {
  getLessonProgress,
  getAllLessonProgress,
  updateStoryProgress as firestoreUpdateStoryProgress,
  updateFlashcardProgress as firestoreUpdateFlashcardProgress,
  saveQuizAttempt as firestoreSaveQuizAttempt,
  getQuizAttempts,
  getAllQuizAttempts,
  updateLessonProgress as firestoreUpdateLessonProgress,
} from '@/lib/firebase/firestore';
import type { LessonProgress, QuizAttempt } from '@/lib/firebase/types';
import { Timestamp } from 'firebase/firestore';

// Development mode - use localStorage fallback when Firestore unavailable
const DEV_MODE = process.env.NODE_ENV === 'development';
const LOCAL_STORAGE_KEY = 'dev_progress_data';

// Helper functions for localStorage fallback
function getLocalProgress(): { lessons: Record<string, LessonProgress>; quizAttempts: QuizAttempt[] } {
  if (typeof window === 'undefined') return { lessons: {}, quizAttempts: [] };
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : { lessons: {}, quizAttempts: [] };
  } catch {
    return { lessons: {}, quizAttempts: [] };
  }
}

function saveLocalProgress(data: { lessons: Record<string, LessonProgress>; quizAttempts: QuizAttempt[] }) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    logger.warn('Failed to save progress to localStorage', e);
  }
}

interface ProgressContextType {
  // Current lesson progress
  currentLessonProgress: LessonProgress | null;
  allLessonProgress: LessonProgress[];
  allQuizAttempts: QuizAttempt[];
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
    score: number,
    totalQuestions: number,
    percentage: number,
    answers: any[],
    timeSpent: number
  ) => Promise<string>;

  // Progress retrieval
  getLessonProgressData: (lessonId: string) => Promise<LessonProgress | null>;
  getQuizHistory: (lessonId?: string) => Promise<QuizAttempt[]>;
  getAllLessonProgressData: () => Promise<LessonProgress[]>;
  getAllQuizHistoryData: () => Promise<QuizAttempt[]>;
  refreshProgress: () => Promise<void>;
  refreshAllProgress: () => Promise<void>;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
  lessonId?: string; // Optional: if provided, will load progress for this lesson
}

export function ProgressProvider({ children, lessonId }: ProgressProviderProps) {
  const { user } = useAuth();
  const [currentLessonProgress, setCurrentLessonProgress] = useState<LessonProgress | null>(null);
  const [allLessonProgress, setAllLessonProgress] = useState<LessonProgress[]>([]);
  const [allQuizAttempts, setAllQuizAttempts] = useState<QuizAttempt[]>([]);
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
      logger.error('Error loading lesson progress', error);
    } finally {
      setLoading(false);
    }
  };

  // Load all lesson progress from Firestore
  const loadAllLessonProgress = async () => {
    if (!user) return;

    try {
      const progress = await getAllLessonProgress(user.uid);
      setAllLessonProgress(progress);
    } catch (error) {
      logger.error('Error loading all lesson progress', error);
    }
  };

  // Load all quiz attempts from Firestore
  const loadAllQuizAttempts = async () => {
    if (!user) return;

    try {
      const attempts = await getAllQuizAttempts(user.uid);
      setAllQuizAttempts(attempts);
    } catch (error) {
      logger.error('Error loading all quiz attempts', error);
    }
  };

  // Debounced story progress update
  const updateStoryProgress = useCallback(
    async (lesson: string, currentChapter: number, totalChapters: number) => {
      if (!user) {
        logger.warn('Cannot update progress: user not authenticated');
        return;
      }

      // Update local state immediately for responsive UI
      setCurrentLessonProgress(prev => ({
        ...prev,
        lessonId: lesson,
        status: currentChapter === totalChapters - 1 ? 'completed' : 'in_progress',
        storyProgress: {
          currentChapter,
          chaptersCompleted: (typeof prev?.storyProgress === 'object' && prev?.storyProgress?.chaptersCompleted) || [],
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
          logger.error('Error updating story progress', error);
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
        logger.warn('Cannot update progress: user not authenticated');
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
          logger.error('Error updating flashcard progress', error);
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
      score: number,
      totalQuestions: number,
      percentage: number,
      answers: any[],
      timeSpent: number
    ): Promise<string> => {
      // In dev mode without user, use localStorage
      if (DEV_MODE && !user) {
        const attemptId = `local-${Date.now()}`;
        const localData = getLocalProgress();
        const newAttempt: QuizAttempt = {
          id: attemptId,
          userId: 'local-dev-user',
          lessonId: lesson,
          score,
          totalQuestions,
          percentage,
          answers,
          timeSpent,
          completedAt: Timestamp.fromDate(new Date()),
        };
        localData.quizAttempts.push(newAttempt);

        // Update lesson progress with quiz attempt
        const existingAttempts = localData.lessons[lesson]?.quizAttempts || [];
        localData.lessons[lesson] = {
          ...localData.lessons[lesson],
          userId: 'local-dev-user',
          lessonId: lesson,
          status: 'completed',
          storyProgress: localData.lessons[lesson]?.storyProgress || 0,
          flashcardProgress: localData.lessons[lesson]?.flashcardProgress || [],
          quizAttempts: [...existingAttempts, newAttempt],
          lastAccessedAt: Timestamp.fromDate(new Date()),
        } as LessonProgress;

        saveLocalProgress(localData);
        setAllQuizAttempts(localData.quizAttempts);
        setCurrentLessonProgress(localData.lessons[lesson]);
        logger.debug('Quiz saved to localStorage (dev mode)', { lesson, score, percentage });
        return attemptId;
      }

      if (!user) {
        throw new Error('Cannot save quiz attempt: user not authenticated');
      }

      try {
        const attemptId = await firestoreSaveQuizAttempt(
          user.uid,
          lesson,
          score,
          totalQuestions,
          percentage,
          answers,
          timeSpent
        );

        // Reload lesson progress to reflect quiz completion
        await loadLessonProgress(lesson);

        // Reload all quiz attempts
        await loadAllQuizAttempts();

        return attemptId;
      } catch (error) {
        logger.error('Error saving quiz attempt', error);

        // In dev mode, fall back to localStorage on Firestore error
        if (DEV_MODE) {
          const attemptId = `local-${Date.now()}`;
          const localData = getLocalProgress();
          const newAttempt: QuizAttempt = {
            id: attemptId,
            userId: 'local-dev-user',
            lessonId: lesson,
            score,
            totalQuestions,
            percentage,
            answers,
            timeSpent,
            completedAt: Timestamp.fromDate(new Date()),
          };
          localData.quizAttempts.push(newAttempt);
          const existingAttempts = localData.lessons[lesson]?.quizAttempts || [];
          localData.lessons[lesson] = {
            ...localData.lessons[lesson],
            userId: 'local-dev-user',
            lessonId: lesson,
            status: 'completed',
            storyProgress: localData.lessons[lesson]?.storyProgress || 0,
            flashcardProgress: localData.lessons[lesson]?.flashcardProgress || [],
            quizAttempts: [...existingAttempts, newAttempt],
            lastAccessedAt: Timestamp.fromDate(new Date()),
          } as LessonProgress;
          saveLocalProgress(localData);
          setAllQuizAttempts(localData.quizAttempts);
          logger.debug('Quiz saved to localStorage (dev fallback)', { lesson, score, percentage });
          return attemptId;
        }

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
        logger.error('Error getting lesson progress', error);
        return null;
      }
    },
    [user]
  );

  // Get quiz history for a specific lesson
  const getQuizHistory = useCallback(
    async (lesson?: string): Promise<QuizAttempt[]> => {
      if (!user || !lesson) return [];

      try {
        return await getQuizAttempts(user.uid, lesson);
      } catch (error) {
        logger.error('Error getting quiz history', error);
        return [];
      }
    },
    [user]
  );

  // Get all lesson progress data
  const getAllLessonProgressData = useCallback(async (): Promise<LessonProgress[]> => {
    if (!user) return [];

    try {
      return await getAllLessonProgress(user.uid);
    } catch (error) {
      logger.error('Error getting all lesson progress', error);
      return [];
    }
  }, [user]);

  // Get all quiz history data
  const getAllQuizHistoryData = useCallback(async (): Promise<QuizAttempt[]> => {
    if (!user) return [];

    try {
      return await getAllQuizAttempts(user.uid);
    } catch (error) {
      logger.error('Error getting all quiz history', error);
      return [];
    }
  }, [user]);

  // Refresh current lesson progress
  const refreshProgress = useCallback(async () => {
    if (lessonId) {
      await loadLessonProgress(lessonId);
    }
  }, [lessonId, user]);

  // Refresh all progress
  const refreshAllProgress = useCallback(async () => {
    await Promise.all([loadAllLessonProgress(), loadAllQuizAttempts()]);
  }, [user]);

  // Cleanup pending updates on unmount
  useEffect(() => {
    return () => {
      pendingUpdates.forEach(timer => clearTimeout(timer));
    };
  }, [pendingUpdates]);

  const value: ProgressContextType = {
    currentLessonProgress,
    allLessonProgress,
    allQuizAttempts,
    loading,
    updateStoryProgress,
    updateFlashcardProgress,
    saveQuizAttempt,
    getLessonProgressData,
    getQuizHistory,
    getAllLessonProgressData,
    getAllQuizHistoryData,
    refreshProgress,
    refreshAllProgress,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// Custom hook to use progress context
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
