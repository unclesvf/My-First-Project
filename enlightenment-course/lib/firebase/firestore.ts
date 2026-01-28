import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './config';
import { UserProfile, Purchase, CourseAccess, QuizAttempt, QuizAnswer, LessonProgress, StoryProgressData, FlashcardProgressData } from './types';
import { User } from 'firebase/auth';
import { logger } from '../utils/logger';

export async function createUserProfile(user: User): Promise<UserProfile> {
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email!,
    displayName: user.displayName || user.email!.split('@')[0],
    createdAt: Timestamp.now(),
    courseAccess: {
      status: 'free',
      trialStartedAt: null,
      trialEndsAt: null,
      purchasedAt: null,
      stripePaymentIntentId: null,
      stripeCustomerId: null,
    },
  };

  await setDoc(doc(db, 'users', user.uid), userProfile);
  return userProfile;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
}

export async function getUserByEmail(email: string): Promise<(UserProfile & { id: string }) | null> {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as UserProfile & { id: string };
  }
  return null;
}

export async function updateCourseAccess(uid: string, courseAccess: Partial<CourseAccess>): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { courseAccess });
}

export async function createPurchase(purchase: Omit<Purchase, 'id'>): Promise<string> {
  const purchasesRef = collection(db, 'purchases');
  const docRef = await addDoc(purchasesRef, purchase);
  return docRef.id;
}

export async function getUserPurchases(uid: string): Promise<Purchase[]> {
  const purchasesRef = collection(db, 'purchases');
  const q = query(purchasesRef, where('userId', '==', uid), orderBy('purchasedAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Purchase));
}

// ==================== Progress Tracking Functions ====================

/**
 * Save a quiz attempt to Firestore
 * Structure: users/{userId}/quizAttempts/{attemptId}
 */
export async function saveQuizAttempt(
  userId: string,
  lessonId: string,
  score: number,
  totalQuestions: number,
  percentage: number,
  answers: QuizAnswer[],
  timeSpent: number
): Promise<string> {
  try {
    const quizAttempt: Omit<QuizAttempt, 'id'> = {
      userId,
      lessonId,
      score,
      totalQuestions,
      percentage,
      answers,
      timeSpent,
      completedAt: Timestamp.now(),
    };

    const userQuizzesRef = collection(db, 'users', userId, 'quizAttempts');
    const docRef = await addDoc(userQuizzesRef, quizAttempt);

    return docRef.id;
  } catch (error) {
    logger.error('Error saving quiz attempt', error);
    throw new Error(`Failed to save quiz attempt: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all quiz attempts for a specific lesson
 */
export async function getQuizAttempts(userId: string, lessonId: string): Promise<QuizAttempt[]> {
  try {
    const userQuizzesRef = collection(db, 'users', userId, 'quizAttempts');
    const q = query(userQuizzesRef, where('lessonId', '==', lessonId), orderBy('completedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as QuizAttempt));
  } catch (error) {
    logger.error('Error getting quiz attempts', error);
    throw new Error(`Failed to get quiz attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all quiz attempts for a user across all lessons
 * Limited to most recent 50 for performance
 */
export async function getAllQuizAttempts(userId: string): Promise<QuizAttempt[]> {
  try {
    const userQuizzesRef = collection(db, 'users', userId, 'quizAttempts');
    const q = query(userQuizzesRef, orderBy('completedAt', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as QuizAttempt));
  } catch (error) {
    logger.error('Error getting all quiz attempts', error);
    throw new Error(`Failed to get all quiz attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Update lesson progress (story and flashcard progress)
 * Structure: users/{userId}/lessonProgress/{lessonId}
 */
export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  progressData: Partial<LessonProgress>
): Promise<void> {
  try {
    const lessonProgressRef = doc(db, 'users', userId, 'lessonProgress', lessonId);

    // First, try to get existing progress
    const existingProgress = await getDoc(lessonProgressRef);

    if (existingProgress.exists()) {
      // Update existing document
      await updateDoc(lessonProgressRef, {
        ...progressData,
        lastAccessedAt: Timestamp.now(),
      });
    } else {
      // Create new document with defaults using consistent object types
      const defaultStoryProgress: StoryProgressData = {
        currentChapter: 0,
        totalChapters: 5,
        chaptersCompleted: [],
      };

      const defaultFlashcardProgress: FlashcardProgressData = {
        cardsViewed: 0,
        totalCards: 10,
        lastCardIndex: 0,
        masteredCards: [],
      };

      const defaultProgress: LessonProgress = {
        userId,
        lessonId,
        status: 'not_started',
        storyProgress: defaultStoryProgress,
        flashcardProgress: defaultFlashcardProgress,
        lastAccessedAt: Timestamp.now(),
        ...progressData,
      };

      await setDoc(lessonProgressRef, defaultProgress);
    }
  } catch (error) {
    logger.error('Error updating lesson progress', error);
    throw new Error(`Failed to update lesson progress: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get progress for a specific lesson
 */
export async function getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | null> {
  try {
    const lessonProgressRef = doc(db, 'users', userId, 'lessonProgress', lessonId);
    const docSnap = await getDoc(lessonProgressRef);

    if (docSnap.exists()) {
      return docSnap.data() as LessonProgress;
    }

    return null;
  } catch (error) {
    logger.error('Error getting lesson progress', error);
    throw new Error(`Failed to get lesson progress: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get progress for all lessons
 */
export async function getAllLessonProgress(userId: string): Promise<LessonProgress[]> {
  try {
    const lessonProgressRef = collection(db, 'users', userId, 'lessonProgress');
    const q = query(lessonProgressRef, orderBy('lastAccessedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as unknown as LessonProgress));
  } catch (error) {
    logger.error('Error getting all lesson progress', error);
    throw new Error(`Failed to get all lesson progress: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Update story progress for a lesson
 */
export async function updateStoryProgress(
  userId: string,
  lessonId: string,
  currentChapter: number,
  totalChapters: number
): Promise<void> {
  try {
    const lessonProgressRef = doc(db, 'users', userId, 'lessonProgress', lessonId);

    // Determine if lesson is completed
    const isCompleted = currentChapter >= totalChapters - 1;

    // Create story progress data with consistent object type
    const storyProgressData: StoryProgressData = {
      currentChapter,
      totalChapters,
      chaptersCompleted: [],
    };

    // Get or create progress document
    const existingProgress = await getDoc(lessonProgressRef);

    if (existingProgress.exists()) {
      await updateDoc(lessonProgressRef, {
        storyProgress: storyProgressData,
        status: isCompleted ? 'completed' : 'in_progress',
        lastAccessedAt: Timestamp.now(),
      });
    } else {
      const defaultFlashcardProgress: FlashcardProgressData = {
        cardsViewed: 0,
        totalCards: 10,
        lastCardIndex: 0,
        masteredCards: [],
      };

      const defaultProgress: LessonProgress = {
        userId,
        lessonId,
        status: isCompleted ? 'completed' : 'in_progress',
        storyProgress: storyProgressData,
        flashcardProgress: defaultFlashcardProgress,
        lastAccessedAt: Timestamp.now(),
      };

      await setDoc(lessonProgressRef, defaultProgress);
    }
  } catch (error) {
    logger.error('Error updating story progress', error);
    throw new Error(`Failed to update story progress: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Update flashcard progress for a lesson
 */
export async function updateFlashcardProgress(
  userId: string,
  lessonId: string,
  cardIndex: number,
  totalCards: number,
  masteredCardIds: string[]
): Promise<void> {
  try {
    const lessonProgressRef = doc(db, 'users', userId, 'lessonProgress', lessonId);

    // Determine if all cards are mastered
    const isCompleted = masteredCardIds.length === totalCards;

    // Create flashcard progress data with consistent object type
    const flashcardProgressData: FlashcardProgressData = {
      cardsViewed: cardIndex + 1,
      totalCards,
      lastCardIndex: cardIndex,
      masteredCards: masteredCardIds,
    };

    // Get or create progress document
    const existingProgress = await getDoc(lessonProgressRef);

    if (existingProgress.exists()) {
      await updateDoc(lessonProgressRef, {
        flashcardProgress: flashcardProgressData,
        status: isCompleted ? 'completed' : 'in_progress',
        lastAccessedAt: Timestamp.now(),
      });
    } else {
      const defaultStoryProgress: StoryProgressData = {
        currentChapter: 0,
        totalChapters: 5,
        chaptersCompleted: [],
      };

      const defaultProgress: LessonProgress = {
        userId,
        lessonId,
        status: isCompleted ? 'completed' : 'in_progress',
        storyProgress: defaultStoryProgress,
        flashcardProgress: flashcardProgressData,
        lastAccessedAt: Timestamp.now(),
      };

      await setDoc(lessonProgressRef, defaultProgress);
    }
  } catch (error) {
    logger.error('Error updating flashcard progress', error);
    throw new Error(`Failed to update flashcard progress: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// ==================== Student/Teacher Functions ====================

/**
 * Get student progress (alias for getAllLessonProgress)
 */
export async function getStudentProgress(userId: string): Promise<LessonProgress[]> {
  return getAllLessonProgress(userId);
}

/**
 * Get assignments for a student
 */
export async function getStudentAssignments(studentId: string): Promise<any[]> {
  try {
    const assignmentsRef = collection(db, 'assignments');
    const q = query(
      assignmentsRef,
      where('studentId', '==', studentId),
      orderBy('assignedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    logger.error('Error getting student assignments', error);
    return [];
  }
}

/**
 * Update user role
 */
export async function updateUserRole(
  userId: string,
  role: 'teacher' | 'student',
  teacherId?: string
): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const updateData: { role: string; teacherId?: string } = { role };
    if (teacherId) {
      updateData.teacherId = teacherId;
    }
    await updateDoc(userRef, updateData);
  } catch (error) {
    logger.error('Error updating user role', error);
    throw new Error(`Failed to update user role: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Create a student account linked to a teacher
 */
export async function createStudentAccount(
  studentUid: string,
  email: string,
  displayName: string,
  teacherId: string
): Promise<void> {
  try {
    const userProfile = {
      uid: studentUid,
      email,
      displayName,
      role: 'student' as const,
      teacherId,
      createdAt: Timestamp.now(),
      courseAccess: {
        status: 'free' as const,
        trialStartedAt: null,
        trialEndsAt: null,
        purchasedAt: null,
        stripePaymentIntentId: null,
        stripeCustomerId: null,
      },
    };
    await setDoc(doc(db, 'users', studentUid), userProfile);
  } catch (error) {
    logger.error('Error creating student account', error);
    throw new Error(`Failed to create student account: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all students for a teacher
 */
export async function getTeacherStudents(teacherId: string): Promise<any[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('teacherId', '==', teacherId),
      where('role', '==', 'student')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  } catch (error) {
    logger.error('Error getting teacher students', error);
    return [];
  }
}
