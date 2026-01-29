"use client";

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getTrialStatusFromProfile } from '@/lib/firebase/trial';
import { getCourseAccessForCourse } from '@/lib/firebase/types';

export interface TrialStatusResult {
  hasAccess: boolean;
  isPurchased: boolean;
  isOnTrial: boolean;
  trialDaysLeft: number;
  trialExpired: boolean;
  isLoading: boolean;
}

// Development mode bypass - set to true to skip paywall
const DEV_BYPASS_PAYWALL = process.env.NODE_ENV === 'development';

/**
 * Custom hook that manages trial status for a specific course
 * Returns trial status object with access information
 * Updates when user or courseId changes
 */
export function useTrialStatus(courseId: string = 'age-of-enlightenment'): TrialStatusResult {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [trialStatus, setTrialStatus] = useState<TrialStatusResult>({
    hasAccess: DEV_BYPASS_PAYWALL,
    isPurchased: DEV_BYPASS_PAYWALL,
    isOnTrial: false,
    trialDaysLeft: 0,
    trialExpired: false,
    isLoading: !DEV_BYPASS_PAYWALL,
  });

  useEffect(() => {
    // In development, always grant access
    if (DEV_BYPASS_PAYWALL) {
      setTrialStatus({
        hasAccess: true,
        isPurchased: true,
        isOnTrial: false,
        trialDaysLeft: 0,
        trialExpired: false,
        isLoading: false,
      });
      return;
    }

    if (authLoading) {
      return;
    }

    // If no user or no profile, reset status
    if (!user || !userProfile) {
      setTrialStatus({
        hasAccess: false,
        isPurchased: false,
        isOnTrial: false,
        trialDaysLeft: 0,
        trialExpired: false,
        isLoading: false,
      });
      return;
    }

    // Get course-specific access
    const courseAccess = getCourseAccessForCourse(userProfile, courseId);

    // Get trial status from user profile for this specific course
    const trialInfo = getTrialStatusFromProfile(userProfile, courseId);

    // Determine access based on course-specific access status
    const isPurchased = courseAccess?.status === 'purchased';
    const isOnTrial = trialInfo.isActive;
    const hasAccess = isPurchased || isOnTrial;

    setTrialStatus({
      hasAccess,
      isPurchased,
      isOnTrial,
      trialDaysLeft: trialInfo.daysRemaining,
      trialExpired: trialInfo.isExpired,
      isLoading: false,
    });
  }, [user, userProfile, authLoading, courseId]);

  return trialStatus;
}
