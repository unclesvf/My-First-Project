"use client";

import { useState, useEffect } from "react";
import { Lesson } from "@/lib/types";
import { useAuth } from "@/lib/hooks/useAuth";
import { useTrialStatus } from "@/lib/hooks/useTrialStatus";
import { checkLessonAccess } from "@/lib/utils/accessControl";
import LessonView from "@/components/LessonView";
import { PaywallModal } from "@/components/payment/PaywallModal";
import { TrialBanner } from "@/components/payment/TrialBanner";
import { AlertCircle } from "lucide-react";

// Development mode bypass
const DEV_BYPASS = process.env.NODE_ENV === "development";

interface LessonWithAccessControlProps {
  lesson: Lesson;
}

/**
 * Client component that wraps lesson content with access control
 * Handles authentication, trial status, and paywall logic
 * Shows appropriate UI based on user's access level
 */
export default function LessonWithAccessControl({
  lesson,
}: LessonWithAccessControlProps) {
  const { user, userProfile, loading: authLoading } = useAuth();
  const { isOnTrial, trialExpired } = useTrialStatus();
  const [showPaywall, setShowPaywall] = useState(false);
  const [isAccessGranted, setIsAccessGranted] = useState(DEV_BYPASS);
  const [accessDeniedReason, setAccessDeniedReason] = useState<string | null>(
    null
  );

  // Extract lesson number from lesson id (e.g., "lesson-1" -> 1)
  const lessonNumber = parseInt(lesson.id.split("-")[1] || "0", 10);

  // Determine course ID (could be extracted from lesson in the future)
  const courseId = "american-history-7th-grade";

  useEffect(() => {
    // In development, always grant access immediately
    if (DEV_BYPASS) {
      setIsAccessGranted(true);
      return;
    }

    // Wait for auth to load
    if (authLoading) {
      return;
    }

    // Check access for this lesson
    const accessResult = checkLessonAccess(lessonNumber, userProfile);

    if (accessResult.allowed) {
      setIsAccessGranted(true);
      setShowPaywall(false);
      setAccessDeniedReason(null);
    } else {
      setIsAccessGranted(false);
      setAccessDeniedReason(accessResult.reason || null);

      // Show paywall modal for premium lessons
      if (lessonNumber > 8) {
        setShowPaywall(true);
      }
    }
  }, [lessonNumber, userProfile, authLoading]);

  // In development, skip auth loading check
  // Show loading state while auth is loading
  if (!DEV_BYPASS && authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-6 h-6 animate-spin text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-gray-600">Loading lesson...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render lesson if access is granted
  if (isAccessGranted) {
    return (
      <>
        {/* Show trial banner if user is on trial or trial expired */}
        {(isOnTrial || trialExpired) && (
          <TrialBanner
            courseId={courseId}
            courseName="American History 7th Grade"
          />
        )}
        <LessonView lesson={lesson} />
      </>
    );
  }

  // Access denied - show appropriate message based on lesson type
  if (lessonNumber > 8) {
    // Premium lesson - show paywall modal for authenticated users
    // For unauthenticated users, show "Sign up to continue" message
    return (
      <>
        {/* Show paywall modal for authenticated users */}
        {user && (
          <PaywallModal
            isOpen={showPaywall}
            onClose={() => setShowPaywall(false)}
            courseId={courseId}
            courseName="American History 7th Grade"
          />
        )}

        {/* Show sign-up message for unauthenticated users */}
        {!user && (
          <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 items-center justify-center px-4">
              <div className="w-full max-w-md text-center">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full bg-blue-100 p-4">
                    <AlertCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  Sign up to continue
                </h2>
                <p className="mb-6 text-gray-600">
                  This lesson requires an account. Create a free account to get
                  started with our free lessons, or explore premium content with
                  a trial.
                </p>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.location.href = "/";
                      }
                    }}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() =>
                      typeof window !== "undefined" && window.history.back()
                    }
                    className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback: This shouldn't happen for free lessons, but show a message
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Access Denied
          </h2>
          <p className="mb-6 text-gray-600">
            {accessDeniedReason ||
              "You do not have access to this lesson. Please contact support for assistance."}
          </p>
          <button
            onClick={() =>
              typeof window !== "undefined" && window.history.back()
            }
            className="inline-block rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
