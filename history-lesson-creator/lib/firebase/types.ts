import { Timestamp } from 'firebase/firestore';

// User Profile Types
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'teacher' | 'student' | null;
  teacherId: string | null;  // For students only
  createdAt: Timestamp;
  lastLogin: Timestamp;
  courses?: {
    [courseId: string]: UserCourseStatus;
  };
}

export interface UserCourseStatus {
  status: 'free' | 'trial' | 'purchased';
  trialStartedAt: Timestamp | null;
  trialEndsAt: Timestamp | null;
  purchasedAt: Timestamp | null;
  stripePaymentId: string | null;
  amount: number | null;  // Amount paid in cents
}

// Progress Tracking Types
export interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt: Timestamp | null;
  completedAt: Timestamp | null;
  lastAccessedAt: Timestamp;
  storyProgress: StoryProgress;
  flashcardProgress: FlashcardProgress;
}

export interface StoryProgress {
  currentChapter: number;
  chaptersCompleted: number[];
  totalChapters: number;
}

export interface FlashcardProgress {
  cardsViewed: number;
  cardsTotal: number;
  lastCardIndex: number;
  masteredCards: string[];  // Flashcard IDs
}

// Quiz Types
export interface QuizAttempt {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: QuizAnswer[];
  completedAt: Timestamp;
  timeSpent: number;  // seconds
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeTaken: number;  // seconds
}

export interface QuizResult {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

// Student Management (for teachers)
export interface StudentInfo {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Timestamp;
  assignedLessons: string[];
}

// Assignment Types
export interface Assignment {
  id: string;
  teacherId: string;
  studentId: string;
  lessonId: string;
  courseId: string;
  assignedAt: Timestamp;
  dueDate: Timestamp | null;
  status: 'assigned' | 'in_progress' | 'completed';
  completedAt: Timestamp | null;
}

// Purchase Types
export interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  amount: number;  // cents
  currency: string;
  stripePaymentIntentId: string;
  stripeCustomerId: string;
  purchasedAt: Timestamp;
  status: 'succeeded' | 'pending' | 'failed';
}
