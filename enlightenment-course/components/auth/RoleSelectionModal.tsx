"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { GraduationCap, Users, Mail, AlertCircle, BookOpen } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { getUserByEmail } from '@/lib/firebase/firestore';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function RoleSelectionModal({ isOpen, onComplete }: RoleSelectionModalProps) {
  const { setUserRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | 'learner' | null>(null);
  const [teacherEmail, setTeacherEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (role: 'teacher' | 'student' | 'learner') => {
    setSelectedRole(role);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (selectedRole === 'student') {
        // Validate teacher email
        if (!teacherEmail) {
          setError('Please enter your teacher\'s email address');
          setLoading(false);
          return;
        }

        // Check if teacher exists
        const teacher = await getUserByEmail(teacherEmail);
        if (!teacher) {
          setError('No teacher found with this email address. Please check and try again.');
          setLoading(false);
          return;
        }

        if (teacher.role !== 'teacher') {
          setError('This email is not registered as a teacher.');
          setLoading(false);
          return;
        }

        // Set role with teacher ID
        await setUserRole('student', teacher.id);
      } else if (selectedRole === 'teacher') {
        // Teacher role
        await setUserRole('teacher');
      } else if (selectedRole === 'learner') {
        // Independent learner - no special role needed, just complete setup
        // They can access courses based on their purchase/trial status
        onComplete();
        return;
      }

      onComplete();
    } catch (err: any) {
      console.error('Role selection error:', err);
      setError(err.message || 'Failed to set role. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome! Tell us about yourself
                </Dialog.Title>
                <p className="text-gray-600 mb-6">
                  How will you be using this course?
                </p>

                <div className="space-y-3 mb-6">
                  {/* Teacher Option */}
                  <button
                    onClick={() => handleRoleSelect('teacher')}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all duration-200
                      ${
                        selectedRole === 'teacher'
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`
                        rounded-lg p-3 transition-colors
                        ${selectedRole === 'teacher' ? 'bg-primary-100' : 'bg-gray-100'}
                      `}
                      >
                        <GraduationCap
                          className={`h-6 w-6 ${selectedRole === 'teacher' ? 'text-primary-600' : 'text-gray-600'}`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900">I'm a Teacher</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Create student accounts, assign lessons, and track their progress
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Homeschooler / Independent Learner Option */}
                  <button
                    onClick={() => handleRoleSelect('learner')}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all duration-200
                      ${
                        selectedRole === 'learner'
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`
                        rounded-lg p-3 transition-colors
                        ${selectedRole === 'learner' ? 'bg-primary-100' : 'bg-gray-100'}
                      `}
                      >
                        <BookOpen
                          className={`h-6 w-6 ${selectedRole === 'learner' ? 'text-primary-600' : 'text-gray-600'}`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900">Homeschooler / Independent Learner</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Learn at your own pace without a classroom teacher
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Student with Teacher Option */}
                  <button
                    onClick={() => handleRoleSelect('student')}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all duration-200
                      ${
                        selectedRole === 'student'
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`
                        rounded-lg p-3 transition-colors
                        ${selectedRole === 'student' ? 'bg-primary-100' : 'bg-gray-100'}
                      `}
                      >
                        <Users
                          className={`h-6 w-6 ${selectedRole === 'student' ? 'text-primary-600' : 'text-gray-600'}`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900">Student with a Teacher</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Join your teacher's class to receive assignments and track progress together
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Teacher Email Input (shown only for students) */}
                {selectedRole === 'student' && (
                  <div className="mb-6">
                    <label htmlFor="teacherEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Teacher's Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="teacherEmail"
                        type="email"
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        placeholder="teacher@school.com"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400"
                        disabled={loading}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the email address your teacher used to sign up
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!selectedRole || loading}
                  className="w-full px-4 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Setting up your account...
                    </span>
                  ) : (
                    'Continue'
                  )}
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
