import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role?: 'teacher' | 'student';
  teacherId?: string;
  createdAt: Timestamp;
  courseAccess: CourseAccess;
}

export interface CourseAccess {
  status: 'free' | 'trial' | 'purchased';
  trialStartedAt: Timestamp | null;
  trialEndsAt: Timestamp | null;
  purchasedAt: Timestamp | null;
  stripePaymentIntentId: string | null;
  stripeCustomerId: string | null;
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
  currentCard?: number;
  totalCards?: number;
  cardsViewed?: number;
  cardsTotal?: number;
  lastCardIndex?: number;
  masteredCards: string[];
}

export interface StoryProgressData {
  currentChapter: number;
  totalChapters: number;
  chaptersCompleted?: number[];
  status?: 'not_started' | 'in_progress' | 'completed';
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  storyProgress: StoryProgressData | number;
  flashcardProgress: FlashcardProgressData | string[] | number[];
  quizAttempts?: QuizAttempt[];
  lastAccessedAt: Timestamp;
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
