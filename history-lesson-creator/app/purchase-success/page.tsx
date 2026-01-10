'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import Navigation from '@/components/Navigation';

function PurchaseSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = searchParams.get('session_id');
  const courseId = searchParams.get('course_id') || 'history-for-homeschoolers';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  } as const;

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.2, duration: 0.6, ease: 'easeOut' as const },
    },
  } as const;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <div className="text-center">
              <div className="mb-6 inline-block">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Processing Your Purchase
              </h2>
              <p className="text-gray-600">
                Please wait while we confirm your order...
              </p>
            </div>
          ) : (
            <>
              <motion.div
                className="mb-6 flex justify-center"
                variants={iconVariants}
              >
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </motion.div>

              <div className="mb-8 text-center">
                <h1 className="mb-4 text-3xl font-bold text-gray-900">
                  Purchase Complete!
                </h1>
                <p className="mb-2 text-lg text-gray-700">
                  Thank you for your purchase!
                </p>
                <p className="text-gray-600">
                  You now have full access to all lessons in History for Homeschoolers.
                </p>
              </div>

              <div className="mb-8 rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Email Confirmation
                    </p>
                    <p className="mt-1 text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Course Access
                    </p>
                    <p className="mt-1 text-gray-900">
                      History for Homeschoolers
                    </p>
                  </div>
                  {sessionId && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        Transaction ID
                      </p>
                      <p className="mt-1 break-all font-mono text-sm text-gray-700">
                        {sessionId.substring(0, 20)}...
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Status
                    </p>
                    <p className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      Confirmed
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/lesson/${courseId}`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-center font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  <BookOpen className="h-5 w-5" />
                  Access Your Course
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/"
                  className="block rounded-lg border border-primary-200 bg-white px-6 py-3 text-center font-semibold text-primary-600 transition-all hover:bg-primary-50 active:bg-white"
                >
                  Return Home
                </Link>
              </div>

              <div className="mt-8 rounded-lg bg-blue-50 p-4 border border-blue-200">
                <p className="text-sm text-blue-900">
                  A confirmation email has been sent to your email address. Check your inbox for receipt details and access information.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <PurchaseSuccessContent />
    </Suspense>
  );
}
