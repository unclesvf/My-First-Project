"use client";

import { useEffect, useState } from 'react';
import { X, AlertCircle, Clock } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useTrialStatus } from '@/lib/hooks/useTrialStatus';
import { handleCheckout } from '@/lib/stripe/checkout';

interface TrialBannerProps {
  courseId?: string;
  courseName?: string;
  dismissKey?: string;
}

/**
 * Banner component shown at top of course pages during active trial
 * Displays trial countdown and purchase CTA
 * Can be dismissed and saves preference to localStorage
 */
export function TrialBanner({ courseId = 'history-for-homeschoolers', courseName = 'History for Homeschoolers', dismissKey = 'trial-banner-dismissed' }: TrialBannerProps) {
  const { user } = useAuth();
  const { isOnTrial, trialExpired, trialDaysLeft, isPurchased } = useTrialStatus(courseId);
  const [isDismissed, setIsDismissed] = useState(true); // Start as true to prevent flash
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize dismissed state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(dismissKey) === 'true';
      setIsDismissed(dismissed);
    }
  }, [dismissKey]);

  // Hide banner if user already purchased or doesn't have active trial
  if (!isOnTrial && !trialExpired) {
    return null;
  }

  // Hide banner if already dismissed
  if (isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(dismissKey, 'true');
  };

  const handleUpgradeClick = async () => {
    if (!user) {
      // Could open auth modal here
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
      await handleCheckout({
        userId: user.uid,
        userEmail: user.email || '',
        courseId,
        courseName,
        successUrl: `${currentUrl}/purchase-success`,
        cancelUrl: `${currentUrl}/purchase-cancel`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start checkout';
      setError(errorMessage);
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine banner styling based on trial status
  const isWarning = isOnTrial && trialDaysLeft <= 3 && trialDaysLeft > 0;
  const isExpired = trialExpired;

  if (isExpired) {
    return (
      <div className="fixed top-0 left-0 right-0 z-40 bg-red-50 border-b-2 border-red-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-red-900">
                  Trial Expired - Purchase to Continue
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Your free trial has ended. Purchase lifetime access to continue learning.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleUpgradeClick}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-sm font-semibold rounded-lg transition-colors disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Purchase Now'
                )}
              </button>

              <button
                onClick={handleDismiss}
                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-2 text-xs text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Active trial banner
  return (
    <div className={`fixed top-0 left-0 right-0 z-40 border-b-2 shadow-sm transition-colors ${
      isWarning
        ? 'bg-yellow-50 border-yellow-300'
        : 'bg-blue-50 border-blue-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className={`h-5 w-5 flex-shrink-0 ${
              isWarning ? 'text-yellow-600' : 'text-blue-600'
            }`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${
                isWarning ? 'text-yellow-900' : 'text-blue-900'
              }`}>
                {trialDaysLeft === 1
                  ? 'Your trial expires tomorrow!'
                  : `${trialDaysLeft} days left in your trial`}
              </p>
              <p className={`text-xs mt-1 ${
                isWarning ? 'text-yellow-700' : 'text-blue-700'
              }`}>
                Get lifetime access to all lessons and materials when you purchase.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleUpgradeClick}
              disabled={isLoading}
              className={`inline-flex items-center px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors disabled:cursor-not-allowed whitespace-nowrap ${
                isWarning
                  ? 'bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Upgrade Now'
              )}
            </button>

            <button
              onClick={handleDismiss}
              className={`p-1 rounded transition-colors ${
                isWarning
                  ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100'
                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-100'
              }`}
              aria-label="Dismiss banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {error && (
          <div className={`mt-2 text-xs ${
            isWarning ? 'text-yellow-700' : 'text-blue-700'
          }`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
