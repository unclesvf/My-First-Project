"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { X } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import GoogleSignInButton from './GoogleSignInButton';
import EmailSignInForm from './EmailSignInForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'signin' }: AuthModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(defaultTab === 'signin' ? 0 : 1);

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    onClose();
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    await signInWithEmail(email, password);
    onClose();
  };

  const handleEmailSignUp = async (email: string, password: string, displayName?: string) => {
    if (!displayName) throw new Error('Display name is required');
    await signUpWithEmail(email, password, displayName);
    onClose();
  };

  return (
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900">
                    Welcome Back
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                  <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`
                            w-full rounded-lg py-2.5 text-sm font-medium leading-5
                            transition-all duration-200
                            ${
                              selected
                                ? 'bg-white text-primary-700 shadow'
                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
                            }
                          `}
                        >
                          Sign In
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`
                            w-full rounded-lg py-2.5 text-sm font-medium leading-5
                            transition-all duration-200
                            ${
                              selected
                                ? 'bg-white text-primary-700 shadow'
                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-900'
                            }
                          `}
                        >
                          Sign Up
                        </button>
                      )}
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel>
                      {/* Sign In Panel */}
                      <div className="space-y-4">
                        <GoogleSignInButton onSignIn={handleGoogleSignIn} />

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                          </div>
                        </div>

                        <EmailSignInForm mode="signin" onSubmit={handleEmailSignIn} />

                        <p className="text-center text-sm text-gray-600">
                          Don't have an account?{' '}
                          <button
                            onClick={() => setSelectedIndex(1)}
                            className="font-medium text-primary-600 hover:text-primary-700"
                          >
                            Sign up
                          </button>
                        </p>
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      {/* Sign Up Panel */}
                      <div className="space-y-4">
                        <GoogleSignInButton onSignIn={handleGoogleSignIn} />

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or create account with email</span>
                          </div>
                        </div>

                        <EmailSignInForm mode="signup" onSubmit={handleEmailSignUp} />

                        <p className="text-center text-sm text-gray-600">
                          Already have an account?{' '}
                          <button
                            onClick={() => setSelectedIndex(0)}
                            className="font-medium text-primary-600 hover:text-primary-700"
                          >
                            Sign in
                          </button>
                        </p>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <p className="mt-6 text-xs text-center text-gray-500">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
