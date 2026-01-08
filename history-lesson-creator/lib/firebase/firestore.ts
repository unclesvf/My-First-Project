import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  Timestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './config';
import type {
  UserProfile,
  LessonProgress,
  QuizAttempt,
  StudentInfo,
  Assignment,
  UserCourseStatus,
} from './types';

// ==================== USER PROFILE ====================

export async function createUserProfile(
  uid: string,
  email: string,
  displayName: string
): Promise<void> {
  const userRef = doc(db, 'users', uid);

  await setDoc(userRef, {
    uid,
    email,
    displayName,
    role: null, // Will be set during role selection
    teacherId: null,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    courses: {},
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return userSnap.data() as UserProfile;
}

export async function updateUserRole(
  uid: string,
  role: 'teacher' | 'student',
  teacherId?: string
): Promise<void> {
  const userRef = doc(db, 'users', uid);

  const updateData: any = {
    role,
    teacherId: teacherId || null,
  };

  await updateDoc(userRef, updateData);
}

export async function updateLastLogin(uid: string): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    lastLogin: serverTimestamp(),
  });
}

// ==================== TEACHER VALIDATION ====================

export async function getUserByEmail(email: string): Promise<(UserProfile & { id: string }) | null> {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('email', '==', email),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data()
  } as UserProfile & { id: string };
}

export async function findTeacherByEmail(email: string): Promise<string | null> {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('email', '==', email),
    where('role', '==', 'teacher'),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  return querySnapshot.docs[0].id; // Return teacher's UID
}

// ==================== COURSE ACCESS ====================

export async function getCourseStatus(
  userId: string,
  courseId: string
): Promise<UserCourseStatus | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  const userData = userSnap.data() as UserProfile;
  return userData.courses?.[courseId] || null;
}

export async function startCourseTrial(
  userId: string,
  courseId: string,
  trialDays: number = 7
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const trialStartedAt = Timestamp.now();
  const trialEndsAt = Timestamp.fromMillis(
    trialStartedAt.toMillis() + trialDays * 24 * 60 * 60 * 1000
  );

  await updateDoc(userRef, {
    [`courses.${courseId}`]: {
      status: 'trial',
      trialStartedAt,
      trialEndsAt,
      purchasedAt: null,
      stripePaymentId: null,
      amount: null,
    },
  });
}

export async function markCoursePurchased(
  userId: string,
  courseId: string,
  stripePaymentId: string,
  amount: number
): Promise<void> {
  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    [`courses.${courseId}`]: {
      status: 'purchased',
      trialStartedAt: null,
      trialEndsAt: null,
      purchasedAt: serverTimestamp(),
      stripePaymentId,
      amount,
    },
  });
}

// ==================== LESSON PROGRESS ====================

export async function getLessonProgress(
  userId: string,
  lessonId: string
): Promise<LessonProgress | null> {
  const progressRef = doc(db, 'progress', userId, 'lessons', lessonId);
  const progressSnap = await getDoc(progressRef);

  if (!progressSnap.exists()) {
    return null;
  }

  return progressSnap.data() as LessonProgress;
}

export async function updateStoryProgress(
  userId: string,
  lessonId: string,
  currentChapter: number,
  totalChapters: number
): Promise<void> {
  const progressRef = doc(db, 'progress', userId, 'lessons', lessonId);

  // Get current progress
  const progressSnap = await getDoc(progressRef);

  let chaptersCompleted: number[] = [];
  if (progressSnap.exists()) {
    const data = progressSnap.data() as LessonProgress;
    chaptersCompleted = data.storyProgress?.chaptersCompleted || [];
  }

  // Add current chapter to completed list if not already there
  if (!chaptersCompleted.includes(currentChapter)) {
    chaptersCompleted.push(currentChapter);
  }

  const isCompleted = chaptersCompleted.length === totalChapters;

  await setDoc(
    progressRef,
    {
      lessonId,
      status: isCompleted ? 'completed' : 'in_progress',
      lastAccessedAt: serverTimestamp(),
      completedAt: isCompleted ? serverTimestamp() : null,
      storyProgress: {
        currentChapter,
        chaptersCompleted,
        totalChapters,
      },
    },
    { merge: true }
  );
}

export async function updateFlashcardProgress(
  userId: string,
  lessonId: string,
  cardIndex: number,
  totalCards: number,
  masteredCardIds: string[]
): Promise<void> {
  const progressRef = doc(db, 'progress', userId, 'lessons', lessonId);

  await setDoc(
    progressRef,
    {
      lessonId,
      lastAccessedAt: serverTimestamp(),
      flashcardProgress: {
        cardsViewed: cardIndex + 1,
        cardsTotal: totalCards,
        lastCardIndex: cardIndex,
        masteredCards: masteredCardIds,
      },
    },
    { merge: true }
  );
}

// ==================== QUIZ ATTEMPTS ====================

export async function saveQuizAttempt(
  userId: string,
  courseId: string,
  lessonId: string,
  score: number,
  totalQuestions: number,
  percentage: number,
  answers: any[],
  timeSpent: number
): Promise<string> {
  const attemptsRef = collection(db, 'progress', userId, 'quizAttempts');

  const attemptDoc = await addDoc(attemptsRef, {
    userId,
    courseId,
    lessonId,
    score,
    totalQuestions,
    percentage,
    answers,
    completedAt: serverTimestamp(),
    timeSpent,
  });

  // Update lesson progress to mark quiz complete
  const progressRef = doc(db, 'progress', userId, 'lessons', lessonId);
  await setDoc(
    progressRef,
    {
      lessonId,
      lastAccessedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return attemptDoc.id;
}

export async function getQuizAttempts(
  userId: string,
  lessonId?: string
): Promise<QuizAttempt[]> {
  const attemptsRef = collection(db, 'progress', userId, 'quizAttempts');

  let q;
  if (lessonId) {
    q = query(
      attemptsRef,
      where('lessonId', '==', lessonId),
      orderBy('completedAt', 'desc')
    );
  } else {
    q = query(attemptsRef, orderBy('completedAt', 'desc'));
  }

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as QuizAttempt[];
}

// ==================== STUDENT MANAGEMENT (Teachers) ====================

export async function createStudentAccount(
  teacherId: string,
  studentEmail: string,
  studentName: string,
  studentUid: string
): Promise<void> {
  const studentRef = doc(
    db,
    'students',
    teacherId,
    'studentList',
    studentUid
  );

  await setDoc(studentRef, {
    uid: studentUid,
    email: studentEmail,
    displayName: studentName,
    createdAt: serverTimestamp(),
    assignedLessons: [],
  });
}

export async function getTeacherStudents(
  teacherId: string
): Promise<StudentInfo[]> {
  const studentsRef = collection(db, 'students', teacherId, 'studentList');
  const querySnapshot = await getDocs(studentsRef);

  return querySnapshot.docs.map(doc => doc.data()) as StudentInfo[];
}

export async function getStudentProgress(
  studentId: string
): Promise<LessonProgress[]> {
  const progressRef = collection(db, 'progress', studentId, 'lessons');
  const querySnapshot = await getDocs(progressRef);

  return querySnapshot.docs.map(doc => doc.data()) as LessonProgress[];
}

// ==================== ASSIGNMENTS ====================

export async function createAssignment(
  teacherId: string,
  studentId: string,
  courseId: string,
  lessonId: string,
  dueDate?: Date
): Promise<string> {
  const assignmentsRef = collection(db, 'assignments', teacherId);

  const assignmentDoc = await addDoc(assignmentsRef, {
    teacherId,
    studentId,
    courseId,
    lessonId,
    assignedAt: serverTimestamp(),
    dueDate: dueDate ? Timestamp.fromDate(dueDate) : null,
    status: 'assigned',
    completedAt: null,
  });

  return assignmentDoc.id;
}

export async function getStudentAssignments(
  studentId: string,
  teacherId: string
): Promise<Assignment[]> {
  const assignmentsRef = collection(db, 'assignments', teacherId);
  const q = query(assignmentsRef, where('studentId', '==', studentId));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Assignment[];
}
