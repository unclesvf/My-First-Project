import { UserProfile, getCourseAccessForCourse } from '@/lib/firebase/types';
import { getTrialStatusFromCourseAccess } from '@/lib/firebase/trial';

const FREE_LESSONS_COUNT = parseInt(process.env.NEXT_PUBLIC_FREE_LESSONS_COUNT || '3', 10);

// Development mode bypass - skip access checks
const DEV_BYPASS_PAYWALL = process.env.NODE_ENV === 'development';

export interface LessonAccessResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Check if a user can access a specific lesson for a specific course
 *
 * Access rules:
 * 1. Lessons 1-8 are always free for everyone
 * 2. Lessons 9+ require either:
 *    - Active trial for this course
 *    - Purchased access for this course
 * 3. Trial and purchases can expire
 */
export const checkLessonAccess = (
  lessonNumber: number,
  userProfile: UserProfile | null | undefined,
  courseId: string = 'age-of-enlightenment'
): LessonAccessResult => {
  // In development, always allow access
  if (DEV_BYPASS_PAYWALL) {
    return { allowed: true };
  }

  // Lessons 1-8 are always free
  if (lessonNumber >= 1 && lessonNumber <= FREE_LESSONS_COUNT) {
    return {
      allowed: true,
    };
  }

  // Lessons 9+ require authentication and subscription/trial
  if (!userProfile) {
    return {
      allowed: false,
      reason: 'Please log in to access this lesson',
    };
  }

  // Get course-specific access
  const courseAccess = getCourseAccessForCourse(userProfile, courseId);

  if (!courseAccess) {
    return {
      allowed: false,
      reason: `Only the first ${FREE_LESSONS_COUNT} lessons are free. Please purchase access or start a free trial.`,
    };
  }

  // Check for purchased access
  if (courseAccess.status === 'purchased') {
    return {
      allowed: true,
    };
  }

  // Check for active trial
  if (courseAccess.status === 'trial') {
    const trialStatus = getTrialStatusFromCourseAccess(courseAccess);

    if (trialStatus.isActive) {
      return {
        allowed: true,
      };
    }

    if (trialStatus.isExpired) {
      return {
        allowed: false,
        reason: `Your trial expired on ${trialStatus.endsAt?.toLocaleDateString()}. Please purchase access to continue.`,
      };
    }
  }

  // Default: no access
  return {
    allowed: false,
    reason: `Only the first ${FREE_LESSONS_COUNT} lessons are free. Please purchase access or start a free trial.`,
  };
};

/**
 * Check if a lesson is in the free tier
 */
export const isLessonFree = (lessonNumber: number): boolean => {
  return lessonNumber >= 1 && lessonNumber <= FREE_LESSONS_COUNT;
};

/**
 * Get the number of free lessons available
 */
export const getFreeLessonsCount = (): number => {
  return FREE_LESSONS_COUNT;
};

/**
 * Check if user has any form of access to premium content for a specific course
 */
export const hasPremiumAccess = (
  userProfile: UserProfile | null | undefined,
  courseId: string = 'age-of-enlightenment'
): boolean => {
  // In development, always allow access
  if (DEV_BYPASS_PAYWALL) {
    return true;
  }

  const courseAccess = getCourseAccessForCourse(userProfile, courseId);

  if (!courseAccess) {
    return false;
  }

  if (courseAccess.status === 'purchased') {
    return true;
  }

  if (courseAccess.status === 'trial') {
    const trialStatus = getTrialStatusFromCourseAccess(courseAccess);
    return trialStatus.isActive;
  }

  return false;
};

// Backwards compatibility alias
export const hasLessonAccessToAny = (userProfile: UserProfile | null | undefined): boolean => {
  return hasPremiumAccess(userProfile, 'age-of-enlightenment');
};

/**
 * Get access status message for display
 */
export const getAccessStatusMessage = (
  userProfile: UserProfile | null | undefined,
  courseId: string = 'age-of-enlightenment'
): string => {
  const courseAccess = getCourseAccessForCourse(userProfile, courseId);

  if (!courseAccess) {
    return `You have access to the first ${FREE_LESSONS_COUNT} free lessons`;
  }

  if (courseAccess.status === 'purchased') {
    return 'You have full access to all lessons';
  }

  if (courseAccess.status === 'trial') {
    const trialStatus = getTrialStatusFromCourseAccess(courseAccess);

    if (trialStatus.isActive) {
      const daysLeft = trialStatus.daysRemaining;
      const dayText = daysLeft === 1 ? 'day' : 'days';
      return `You have a free trial with ${daysLeft} ${dayText} remaining`;
    }

    if (trialStatus.isExpired) {
      return 'Your trial has expired';
    }
  }

  return `You have access to the first ${FREE_LESSONS_COUNT} free lessons`;
};

/**
 * Determine what action a user should take for a lesson
 */
export const getLessonAction = (
  lessonNumber: number,
  userProfile: UserProfile | null | undefined,
  courseId: string = 'age-of-enlightenment'
): 'view' | 'start_trial' | 'purchase' => {
  // Free lessons - can view
  if (isLessonFree(lessonNumber)) {
    return 'view';
  }

  // Premium lessons - check access
  const accessResult = checkLessonAccess(lessonNumber, userProfile, courseId);

  if (accessResult.allowed) {
    return 'view';
  }

  // If user is logged in but doesn't have trial/purchase, suggest trial
  if (userProfile) {
    // Get course-specific access
    const courseAccess = getCourseAccessForCourse(userProfile, courseId);

    // If they haven't used trial yet for this course, suggest trial
    if (!courseAccess?.trialStartedAt) {
      return 'start_trial';
    }
    // Otherwise suggest purchase
    return 'purchase';
  }

  // Default to purchase (user not logged in)
  return 'purchase';
};
