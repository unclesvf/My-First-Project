"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, CheckCircle2, Zap } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useTrialStatus } from '@/lib/hooks/useTrialStatus';
import { startTrial } from '@/lib/firebase/trial';
import { handleCheckout } from '@/lib/stripe/checkout';
import AuthModal from '@/components/auth/AuthModal';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId?: string;
  courseName?: string;
}

/**
 * Modal component shown when users access locked lessons
 * Displays trial offer or purchase options based on trial status
 * Includes course benefits and styled CTAs
 */
export function PaywallModal({ isOpen, onClose, courseId = 'history-for-homeschoolers', courseName = 'History for Homeschoolers' }: PaywallModalProps) {
  const { user, userProfile } = useAuth();
  const { isPurchased, isOnTrial, trialExpired } = useTrialStatus(courseId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Don't show modal if user already has access
  if (isPurchased || isOnTrial) {
    return null;
  }

  const handleStartTrial = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const success = await startTrial(user.uid);
      if (success) {
        onClose();
      } else {
        setError('Trial could not be started. You may have already used your trial or purchased access.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start trial';
      setError(errorMessage);
      console.error('Trial start error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      setShowAuthModal(true);
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
      console.error('Purchase error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { label: '50+ Engaging Lessons' },
    { label: 'Interactive Flashcards' },
    { label: 'Comprehensive Quizzes' },
    { label: 'Progress Tracking' },
    { label: 'Achievement Badges' },
    { label: 'Lifetime Access' },
  ];

  const showTrialOffer = !isOnTrial && !trialExpired;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-2xl transition-all">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Zap className="h-6 w-6 text-blue-600" />
                      </div>
                      <Dialog.Title as="h2" className="text-2xl font-bold text-gray-900">
                        Unlock Full Access
                      </Dialog.Title>
                    </div>
                    <button
                      onClick={onClose}
                      className="rounded-lg p-1 hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Main content area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left side - Benefits */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        What You'll Get:
                      </h3>
                      <ul className="space-y-3">
                        {benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{benefit.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right side - CTA */}
                    <div className="flex flex-col justify-between">
                      {showTrialOffer ? (
                        <div>
                          {/* Trial offer */}
                          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-gray-600 mb-2">Limited time offer:</p>
                            <h4 className="text-3xl font-bold text-blue-600 mb-1">
                              7 Days Free
                            </h4>
                            <p className="text-sm text-gray-600">
                              Try everything risk-free. No credit card required.
                            </p>
                          </div>

                          <button
                            onClick={handleStartTrial}
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
                          >
                            {isLoading ? (
                              <>
                                <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Starting Trial...
                              </>
                            ) : (
                              <>
                                <Zap className="h-5 w-5" />
                                Start 7-Day Free Trial
                              </>
                            )}
                          </button>

                          <p className="text-center text-xs text-gray-500 mb-6">
                            Then $19.99/month. Cancel anytime.
                          </p>
                        </div>
                      ) : (
                        <div>
                          {/* Purchase offer */}
                          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-sm text-gray-600 mb-2">Your free trial has ended</p>
                            <h4 className="text-3xl font-bold text-amber-600 mb-1">
                              $19.99
                            </h4>
                            <p className="text-sm text-gray-600">
                              Get lifetime access to all lessons and materials
                            </p>
                          </div>

                          <button
                            onClick={handlePurchase}
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
                          >
                            {isLoading ? (
                              <>
                                <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>Purchase Course for $19.99</>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={onClose}
                      className="w-full px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    >
                      Maybe Later
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Auth modal for unauthenticated users */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={() => {
            setShowAuthModal(false);
            // User is now authenticated, they can try again
          }}
        />
      )}
    </>
  );
}
