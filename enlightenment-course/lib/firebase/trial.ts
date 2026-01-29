import { db } from '@/lib/firebase/config';
import { doc, updateDoc, getDoc, Timestamp } from 'firebase/firestore';
import { UserProfile, CourseAccess, getCourseAccessForCourse, getDefaultCourseAccess } from '@/lib/firebase/types';
import { logger } from '@/lib/utils/logger';

const TRIAL_DURATION_DAYS = parseInt(process.env.NEXT_PUBLIC_TRIAL_DAYS || '7', 10);

export interface TrialStatus {
  isActive: boolean;
  isExpired: boolean;
  startedAt: Date | null;
  endsAt: Date | null;
  daysRemaining: number;
}

/**
 * Start a 7-day trial for a user on a specific course
 * Only allows starting a trial if one hasn't already been started for that course
 */
export const startTrial = async (
  userId: string,
  courseId: string = 'age-of-enlightenment'
): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }

    const userData = userDoc.data();
    const courseAccess = userData?.courseAccess?.[courseId] || null;

    // Check if trial has already been started for this course
    if (courseAccess?.trialStartedAt) {
      logger.warn('Trial already started for this course', { userId, courseId });
      return false;
    }

    // Check if user already has purchased access for this course
    if (courseAccess?.status === 'purchased') {
      logger.warn('User already has purchased access for this course', { userId, courseId });
      return false;
    }

    const now = Timestamp.now();
    const trialEndsAt = new Timestamp(
      now.seconds + TRIAL_DURATION_DAYS * 24 * 60 * 60,
      now.nanoseconds
    );

    // Update user's course access with trial information for this specific course
    await updateDoc(userRef, {
      [`courseAccess.${courseId}.status`]: 'trial',
      [`courseAccess.${courseId}.trialStartedAt`]: now,
      [`courseAccess.${courseId}.trialEndsAt`]: trialEndsAt,
      [`courseAccess.${courseId}.purchasedAt`]: null,
      [`courseAccess.${courseId}.stripePaymentIntentId`]: null,
      [`courseAccess.${courseId}.stripeCustomerId`]: null,
    });

    return true;
  } catch (error) {
    logger.error('Error starting trial', error);
    throw error;
  }
};

/**
 * Get the current trial status for a user on a specific course
 */
export const getTrialStatus = async (
  userId: string,
  courseId: string = 'age-of-enlightenment'
): Promise<TrialStatus> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return {
        isActive: false,
        isExpired: false,
        startedAt: null,
        endsAt: null,
        daysRemaining: 0,
      };
    }

    const userData = userDoc.data() as UserProfile;
    const courseAccess = getCourseAccessForCourse(userData, courseId);

    if (!courseAccess || courseAccess.status !== 'trial') {
      return {
        isActive: false,
        isExpired: false,
        startedAt: null,
        endsAt: null,
        daysRemaining: 0,
      };
    }

    return getTrialStatusFromCourseAccess(courseAccess);
  } catch (error) {
    logger.error('Error getting trial status', error);
    throw error;
  }
};

/**
 * Check if a user's trial has expired for a specific course
 * Returns true if trial is expired or was never started
 */
export const hasTrialExpired = async (
  userId: string,
  courseId: string = 'age-of-enlightenment'
): Promise<boolean> => {
  try {
    const trialStatus = await getTrialStatus(userId, courseId);
    return trialStatus.isExpired;
  } catch (error) {
    logger.error('Error checking trial expiration', error);
    return true; // Default to expired on error for safety
  }
};

/**
 * Check if a user's trial is currently active for a specific course
 */
export const isTrialActive = async (
  userId: string,
  courseId: string = 'age-of-enlightenment'
): Promise<boolean> => {
  try {
    const trialStatus = await getTrialStatus(userId, courseId);
    return trialStatus.isActive;
  } catch (error) {
    logger.error('Error checking if trial is active', error);
    return false; // Default to inactive on error for safety
  }
};

/**
 * Get trial information from a CourseAccess object (synchronous helper)
 */
export const getTrialStatusFromCourseAccess = (courseAccess: CourseAccess | null): TrialStatus => {
  if (!courseAccess || courseAccess.status !== 'trial') {
    return {
      isActive: false,
      isExpired: false,
      startedAt: null,
      endsAt: null,
      daysRemaining: 0,
    };
  }

  const trialStartedAt = courseAccess.trialStartedAt?.toDate() || null;
  const trialEndsAt = courseAccess.trialEndsAt?.toDate() || null;

  if (!trialStartedAt || !trialEndsAt) {
    return {
      isActive: false,
      isExpired: false,
      startedAt: null,
      endsAt: null,
      daysRemaining: 0,
    };
  }

  const now = new Date();
  const isExpired = now > trialEndsAt;
  const isActive = !isExpired;
  const msRemaining = trialEndsAt.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

  return {
    isActive,
    isExpired,
    startedAt: trialStartedAt,
    endsAt: trialEndsAt,
    daysRemaining,
  };
};

/**
 * Get trial information from a user profile for a specific course (synchronous helper)
 * Useful when you already have the user profile loaded
 */
export const getTrialStatusFromProfile = (
  userProfile: UserProfile | null,
  courseId: string = 'age-of-enlightenment'
): TrialStatus => {
  const courseAccess = getCourseAccessForCourse(userProfile, courseId);
  return getTrialStatusFromCourseAccess(courseAccess);
};
