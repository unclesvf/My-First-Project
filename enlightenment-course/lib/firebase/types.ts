import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role?: 'teacher' | 'student';
  teacherId?: string;
  createdAt: Timestamp;
  // Per-course access: { 'course-id': CourseAccess, ... }
  courseAccess: Record<string, CourseAccess>;
}

export interface CourseAccess {
  status: 'free' | 'trial' | 'purchased';
  trialStartedAt: Timestamp | null;
  trialEndsAt: Timestamp | null;
  purchasedAt: Timestamp | null;
  stripePaymentIntentId: string | null;
  stripeCustomerId: string | null;
}

// Course configuration - maps Price IDs to Course IDs
export const COURSE_CONFIG: Record<string, { courseId: string; courseName: string }> = {
  'price_1SnuHk3jSTlaKj8QA3W4W1Ba': {
    courseId: 'history-for-homeschoolers',
    courseName: 'American History 1565-1914',
  },
  'price_1Sujbp3jSTlaKj8QxBEZTzy7': {
    courseId: 'age-of-enlightenment',
    courseName: 'Age of Enlightenment - Ideas That Shaped America',
  },
};

// Helper to get default empty course access
export function getDefaultCourseAccess(): CourseAccess {
  return {
    status: 'free',
    trialStartedAt: null,
    trialEndsAt: null,
    purchasedAt: null,
    stripePaymentIntentId: null,
    stripeCustomerId: null,
  };
}

// Helper to get course access for a specific course (with backwards compatibility)
export function getCourseAccessForCourse(
  userProfile: UserProfile | null | undefined,
  courseId: string
): CourseAccess | null {
  if (!userProfile?.courseAccess) return null;

  // Check if it's the new format (keyed by courseId)
  if (userProfile.courseAccess[courseId]) {
    return userProfile.courseAccess[courseId];
  }

  // Backwards compatibility: if courseAccess has 'status' directly, it's old format
  // Treat old format as applying to 'history-for-homeschoolers' only
  const oldFormat = userProfile.courseAccess as unknown as CourseAccess;
  if (oldFormat.status && typeof oldFormat.status === 'string') {
    if (courseId === 'history-for-homeschoolers') {
      return oldFormat;
    }
    return null;
  }

  return null;
}

export interface Purchase {
  id: string;
  userId: string;
  amount: number; // in cents
  currency: string;
  stripePaymentIntentId: string;
  stripeCustomerId: string;
  status: 'succeeded' | 'pending' | 'failed';
  purchasedAt: Timestamp;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: QuizAnswer[];
  timeSpent: number; // in seconds
  completedAt: Timestamp;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionIndex: number;
  correctOptionIndex: number;
  isCorrect: boolean;
}

export interface FlashcardProgressData {
  cardsViewed: number;
  totalCards: number;
  lastCardIndex: number;
  masteredCards: string[];
}

export interface StoryProgressData {
  currentChapter: number;
  totalChapters: number;
  chaptersCompleted: number[];
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  storyProgress: StoryProgressData;
  flashcardProgress: FlashcardProgressData;
  quizAttempts?: QuizAttempt[];
  lastAccessedAt: Timestamp;
}

// Helper to normalize legacy progress data to new format
export function normalizeStoryProgress(data: StoryProgressData | number | undefined): StoryProgressData {
  if (typeof data === 'number') {
    return { currentChapter: data, totalChapters: 5, chaptersCompleted: [] };
  }
  if (!data) {
    return { currentChapter: 0, totalChapters: 5, chaptersCompleted: [] };
  }
  return {
    currentChapter: data.currentChapter ?? 0,
    totalChapters: data.totalChapters ?? 5,
    chaptersCompleted: data.chaptersCompleted ?? [],
  };
}

export function normalizeFlashcardProgress(data: FlashcardProgressData | string[] | number[] | undefined): FlashcardProgressData {
  if (Array.isArray(data)) {
    // Legacy format: array of mastered card IDs
    return {
      cardsViewed: 0,
      totalCards: 10,
      lastCardIndex: 0,
      masteredCards: data.map(String),
    };
  }
  if (!data) {
    return { cardsViewed: 0, totalCards: 10, lastCardIndex: 0, masteredCards: [] };
  }
  return {
    cardsViewed: data.cardsViewed ?? 0,
    totalCards: data.totalCards ?? 10,
    lastCardIndex: data.lastCardIndex ?? 0,
    masteredCards: data.masteredCards ?? [],
  };
}

export interface Assignment {
  id: string;
  lessonId: string;
  studentId: string;
  teacherId: string;
  assignedAt: Timestamp;
  dueDate: Timestamp | null;
  status: 'assigned' | 'in_progress' | 'completed';
}

export interface StudentInfo {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Timestamp;
  teacherId: string;
}
