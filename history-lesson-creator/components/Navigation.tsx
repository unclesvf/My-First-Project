"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { Book, User, LogOut, GraduationCap, Users, Menu } from "lucide-react";
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import AuthModal from './auth/AuthModal';
import RoleSelectionModal from './auth/RoleSelectionModal';

export default function Navigation() {
  const { user, userProfile, signOut, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const showRoleModal = user && userProfile && !userProfile.role;

  useEffect(() => {
    if (!showRoleModal) {
      setRoleModalOpen(false);
      return;
    }

    if (typeof window === 'undefined' || !user) {
      return;
    }

    const key = `role-modal-dismissed-${user.uid}`;
    const dismissed = localStorage.getItem(key) === 'true';
    setRoleModalOpen(!dismissed);
  }, [showRoleModal, user]);

  const handleRoleModalClose = () => {
    setRoleModalOpen(false);
    if (!user) return;
    const key = `role-modal-dismissed-${user.uid}`;
    if (typeof window !== "undefined") {
      localStorage.setItem(key, "true");
    }
  };

  return (
    <>
      <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 p-2">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">History for Homeschoolers</h1>
                <p className="text-xs text-gray-600">American History - 7th Grade</p>
              </div>
            </Link>

            {/* Right side - Auth section */}
            <div className="flex items-center gap-4">
              {loading ? (
                // Loading state
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              ) : user && userProfile ? (
                // Authenticated user
                <div className="flex items-center gap-3">
                  {/* Role-specific link */}
                  {userProfile.role === 'teacher' && (
                    <Link
                      href="/teacher"
                      className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <GraduationCap className="h-4 w-4" />
                      Dashboard
                    </Link>
                  )}
                  {userProfile.role === 'student' && (
                    <Link
                      href="/student"
                      className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <Users className="h-4 w-4" />
                      My Progress
                    </Link>
                  )}

                  {/* User menu */}
                  <HeadlessMenu as="div" className="relative">
                    <HeadlessMenu.Button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="hidden sm:inline">{userProfile.displayName}</span>
                    </HeadlessMenu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="p-1">
                          {/* Profile info */}
                          <div className="px-3 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{userProfile.displayName}</p>
                            <p className="text-xs text-gray-500">{userProfile.email}</p>
                            {userProfile.role && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 mt-1">
                                {userProfile.role === 'teacher' ? 'Teacher' : 'Student'}
                              </span>
                            )}
                          </div>

                          {/* Dashboard link (mobile) */}
                          {userProfile.role && (
                            <HeadlessMenu.Item>
                              {({ active }) => (
                                <Link
                                  href={userProfile.role === 'teacher' ? '/teacher' : '/student'}
                                  className={`${
                                    active ? 'bg-gray-100' : ''
                                  } flex items-center gap-2 px-3 py-2 text-sm text-gray-700 sm:hidden`}
                                >
                                  {userProfile.role === 'teacher' ? (
                                    <GraduationCap className="h-4 w-4" />
                                  ) : (
                                    <Users className="h-4 w-4" />
                                  )}
                                  {userProfile.role === 'teacher' ? 'Dashboard' : 'My Progress'}
                                </Link>
                              )}
                            </HeadlessMenu.Item>
                          )}

                          {/* Sign out */}
                          <HeadlessMenu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleSignOut}
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600`}
                              >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                              </button>
                            )}
                          </HeadlessMenu.Item>
                        </div>
                      </HeadlessMenu.Items>
                    </Transition>
                  </HeadlessMenu>
                </div>
              ) : (
                // Not authenticated
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Role Selection Modal - shown if user has no role */}
      {showRoleModal && (
        <RoleSelectionModal
          isOpen={roleModalOpen}
          onComplete={() => {
            setRoleModalOpen(false);
            if (user && typeof window !== "undefined") {
              const key = `role-modal-dismissed-${user.uid}`;
              localStorage.removeItem(key);
            }
          }}
          onClose={handleRoleModalClose}
        />
      )}
    </>
  );
}
