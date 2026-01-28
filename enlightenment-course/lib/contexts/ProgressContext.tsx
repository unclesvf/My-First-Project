"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
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
import type { LessonProgress, QuizAttempt, QuizAnswer, StoryProgressData, FlashcardProgressData } from '@/lib/firebase/types';
import type { QuizResult } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

// Use localStorage fallback when Firestore unavailable or user not logged in
const USE_LOCAL_STORAGE = true; // Always allow local storage fallback
const LOCAL_STORAGE_KEY = 'enlightenment_app_progress';

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
    answers: QuizResult[],
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

  // Debounce timer for batch updates - use ref since we don't need to trigger renders
  const pendingUpdatesRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Load lesson progress on mount or when lessonId changes
  useEffect(() => {
    if (user && lessonId) {
      loadLessonProgress(lessonId);
    } else if (!user && lessonId && USE_LOCAL_STORAGE) {
      // Guest mode: Load from local storage
      const localData = getLocalProgress();
      setCurrentLessonProgress(localData.lessons[lessonId] || null);
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
      const storyProgressData: StoryProgressData = {
        currentChapter,
        totalChapters,
        chaptersCompleted: [],
      };

      if (!user) {
        if (USE_LOCAL_STORAGE) {
           // Guest mode: update local storage
           const localData = getLocalProgress();
           const existingProgress = localData.lessons[lesson];
           const existingFlashcard = existingProgress?.flashcardProgress;

           localData.lessons[lesson] = {
             userId: 'guest-user',
             lessonId: lesson,
             status: currentChapter === totalChapters - 1 ? 'completed' : 'in_progress',
             storyProgress: storyProgressData,
             flashcardProgress: existingFlashcard && typeof existingFlashcard === 'object' && 'masteredCards' in existingFlashcard
               ? existingFlashcard
               : { cardsViewed: 0, totalCards: 10, lastCardIndex: 0, masteredCards: [] },
             lastAccessedAt: Timestamp.now(),
           } as LessonProgress;

           saveLocalProgress(localData);
           setCurrentLessonProgress(localData.lessons[lesson]);
           return;
        }
        logger.warn('Cannot update progress: user not authenticated');
        return;
      }

      // Update local state immediately for responsive UI
      setCurrentLessonProgress(prev => {
        const existingFlashcard = prev?.flashcardProgress;
        return {
          userId: user.uid,
          lessonId: lesson,
          status: currentChapter === totalChapters - 1 ? 'completed' : 'in_progress',
          storyProgress: storyProgressData,
          flashcardProgress: existingFlashcard && typeof existingFlashcard === 'object' && 'masteredCards' in existingFlashcard
            ? existingFlashcard
            : { cardsViewed: 0, totalCards: 10, lastCardIndex: 0, masteredCards: [] },
          lastAccessedAt: Timestamp.now(),
        } as LessonProgress;
      });

      // Debounce Firestore write
      const key = `story-${lesson}`;
      if (pendingUpdatesRef.current.has(key)) {
        clearTimeout(pendingUpdatesRef.current.get(key)!);
      }

      const timer = setTimeout(async () => {
        try {
          await firestoreUpdateStoryProgress(user.uid, lesson, currentChapter, totalChapters);
        } catch (error) {
          logger.error('Error updating story progress', error);
        } finally {
          pendingUpdatesRef.current.delete(key);
        }
      }, 500); // 500ms debounce

      pendingUpdatesRef.current.set(key, timer);
    },
    [user]
  );

  // Debounced flashcard progress update
  const updateFlashcardProgress = useCallback(
    async (
      lesson: string,
      cardIndex: number,
      totalCards: number,
      masteredCardIds: string[]
    ) => {
      const flashcardProgressData: FlashcardProgressData = {
        cardsViewed: cardIndex + 1,
        totalCards,
        lastCardIndex: cardIndex,
        masteredCards: masteredCardIds,
      };

      if (!user) {
        if (USE_LOCAL_STORAGE) {
          // Guest mode: update local storage
          const localData = getLocalProgress();
          const existingProgress = localData.lessons[lesson];
          const existingStory = existingProgress?.storyProgress;

          localData.lessons[lesson] = {
            userId: 'guest-user',
            lessonId: lesson,
            status: existingProgress?.status || 'in_progress',
            storyProgress: existingStory && typeof existingStory === 'object' && 'currentChapter' in existingStory
              ? existingStory
              : { currentChapter: 0, totalChapters: 5, chaptersCompleted: [] },
            flashcardProgress: flashcardProgressData,
            lastAccessedAt: Timestamp.now(),
          } as LessonProgress;

          saveLocalProgress(localData);
          setCurrentLessonProgress(localData.lessons[lesson]);
          return;
        }
        logger.warn('Cannot update progress: user not authenticated');
        return;
      }

      // Update local state immediately
      setCurrentLessonProgress(prev => {
        const existingStory = prev?.storyProgress;
        return {
          userId: user.uid,
          lessonId: lesson,
          status: prev?.status || 'in_progress',
          storyProgress: existingStory && typeof existingStory === 'object' && 'currentChapter' in existingStory
            ? existingStory
            : { currentChapter: 0, totalChapters: 5, chaptersCompleted: [] },
          flashcardProgress: flashcardProgressData,
          lastAccessedAt: Timestamp.now(),
        } as LessonProgress;
      });

      // Debounce Firestore write
      const key = `flashcard-${lesson}`;
      if (pendingUpdatesRef.current.has(key)) {
        clearTimeout(pendingUpdatesRef.current.get(key)!);
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
        } catch (error) {
          logger.error('Error updating flashcard progress', error);
        } finally {
          pendingUpdatesRef.current.delete(key);
        }
      }, 500); // 500ms debounce

      pendingUpdatesRef.current.set(key, timer);
    },
    [user]
  );

  // Save quiz attempt (no debounce - immediate save)
  const saveQuizAttempt = useCallback(
    async (
      lesson: string,
      score: number,
      totalQuestions: number,
      percentage: number,
      answers: QuizResult[],
      timeSpent: number
    ): Promise<string> => {
      // Transform QuizResult to QuizAnswer format for Firestore
      const quizAnswers: QuizAnswer[] = answers.map((answer) => ({
        questionId: answer.questionId,
        selectedOptionIndex: answer.selectedIndex,
        correctOptionIndex: answer.correctIndex,
        isCorrect: answer.isCorrect,
      }));

      // Guest mode or dev fallback
      if (USE_LOCAL_STORAGE && !user) {
        const attemptId = `local-${Date.now()}`;
        const localData = getLocalProgress();
        const newAttempt: QuizAttempt = {
          id: attemptId,
          userId: 'local-dev-user',
          lessonId: lesson,
          score,
          totalQuestions,
          percentage,
          answers: quizAnswers,
          timeSpent,
          completedAt: Timestamp.fromDate(new Date()),
        };
        localData.quizAttempts.push(newAttempt);

        // Update lesson progress with quiz attempt - use consistent types
        const existingProgress = localData.lessons[lesson];
        const existingAttempts = existingProgress?.quizAttempts || [];
        const existingStory = existingProgress?.storyProgress;
        const existingFlashcard = existingProgress?.flashcardProgress;

        localData.lessons[lesson] = {
          userId: 'local-dev-user',
          lessonId: lesson,
          status: 'completed',
          storyProgress: existingStory && typeof existingStory === 'object' && 'currentChapter' in existingStory
            ? existingStory
            : { currentChapter: 0, totalChapters: 5, chaptersCompleted: [] },
          flashcardProgress: existingFlashcard && typeof existingFlashcard === 'object' && 'masteredCards' in existingFlashcard
            ? existingFlashcard
            : { cardsViewed: 0, totalCards: 10, lastCardIndex: 0, masteredCards: [] },
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
          quizAnswers,
          timeSpent
        );

        // Reload lesson progress to reflect quiz completion
        await loadLessonProgress(lesson);

        // Reload all quiz attempts
        await loadAllQuizAttempts();

        return attemptId;
      } catch (error) {
        logger.error('Error saving quiz attempt', error);

        // Fall back to localStorage on Firestore error
        if (USE_LOCAL_STORAGE) {
          const attemptId = `local-${Date.now()}`;
          const localData = getLocalProgress();
          const newAttempt: QuizAttempt = {
            id: attemptId,
            userId: 'local-dev-user',
            lessonId: lesson,
            score,
            totalQuestions,
            percentage,
            answers: quizAnswers,
            timeSpent,
            completedAt: Timestamp.fromDate(new Date()),
          };
          localData.quizAttempts.push(newAttempt);

          // Use consistent types for fallback storage
          const existingProgress = localData.lessons[lesson];
          const existingAttempts = existingProgress?.quizAttempts || [];
          const existingStory = existingProgress?.storyProgress;
          const existingFlashcard = existingProgress?.flashcardProgress;

          localData.lessons[lesson] = {
            userId: 'local-dev-user',
            lessonId: lesson,
            status: 'completed',
            storyProgress: existingStory && typeof existingStory === 'object' && 'currentChapter' in existingStory
              ? existingStory
              : { currentChapter: 0, totalChapters: 5, chaptersCompleted: [] },
            flashcardProgress: existingFlashcard && typeof existingFlashcard === 'object' && 'masteredCards' in existingFlashcard
              ? existingFlashcard
              : { cardsViewed: 0, totalCards: 10, lastCardIndex: 0, masteredCards: [] },
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
      pendingUpdatesRef.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

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
