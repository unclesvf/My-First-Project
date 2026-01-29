'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { handleCheckout } from '@/lib/stripe/checkout';
import AuthModal from '@/components/auth/AuthModal';
import { getCourseAccessForCourse } from '@/lib/firebase/types';

interface CourseInfo {
  id: string;
  name: string;
  description?: string;
}

interface PurchaseCourseButtonProps {
  course: CourseInfo;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Button component for purchasing a course
 * Handles authentication check, checkout session creation, and Stripe redirect
 */
export function PurchaseCourseButton({
  course,
  className = '',
  onSuccess,
  onError,
}: PurchaseCourseButtonProps) {
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchaseClick = async () => {
    // Check if user is logged in
    if (!user || !userProfile) {
      setShowAuthModal(true);
      return;
    }

    // Check if user already has access to this specific course
    const courseAccess = getCourseAccessForCourse(userProfile, course.id);
    if (courseAccess?.status === 'purchased') {
      setError('You already have access to this course');
      onError?.('You already have access to this course');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Get current URL for success/cancel redirects
      const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';

      await handleCheckout({
        userId: user.uid,
        userEmail: user.email || '',
        courseId: course.id,
        courseName: course.name,
        successUrl: `${currentUrl}/purchase-success`,
        cancelUrl: `${currentUrl}/purchase-cancel`,
      });

      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start checkout';
      setError(errorMessage);
      onError?.(errorMessage);
      console.error('Purchase error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          onClick={handlePurchaseClick}
          disabled={isLoading}
          className={`
            px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400
            text-white font-semibold rounded-lg transition-colors
            disabled:cursor-not-allowed flex items-center justify-center gap-2
            ${className}
          `}
          aria-label={`Purchase ${course.name}`}
        >
          {isLoading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
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
              Processing...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Buy Now
            </>
          )}
        </button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Auth modal for unauthenticated users */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={() => {
            setShowAuthModal(false);
            // User is now authenticated, they can click the button again
          }}
        />
      )}
    </>
  );
}
