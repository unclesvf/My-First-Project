'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';

function PurchaseCancelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const courseId = searchParams.get('course_id') || 'history-for-homeschoolers';

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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cancel Icon */}
          <motion.div
            className="mb-6 flex justify-center"
            variants={iconVariants}
          >
            <div className="rounded-full bg-red-100 p-4">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
          </motion.div>

          {/* Cancel Message */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Purchase Cancelled
            </h1>
            <p className="mb-2 text-lg text-gray-700">
              No charges have been made.
            </p>
            <p className="text-gray-600">
              Your payment was not processed. If this was intentional, you can always purchase later.
            </p>
          </div>

          {/* Reason Section */}
          <div className="mb-8 rounded-lg bg-white p-6 border border-gray-200 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">
              What happens next?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Your account remains active with limited access</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>You can still access free lessons and trial content</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>No payment information has been charged</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>You can purchase a full course access anytime</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-center font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowLeft className="h-5 w-5" />
              Try Again
            </button>

            <Link
              href={`/lesson/${courseId}`}
              className="block rounded-lg border border-primary-200 bg-white px-6 py-3 text-center font-semibold text-primary-600 transition-all hover:bg-primary-50 active:bg-white"
            >
              Return to Course
            </Link>

            <Link
              href="/"
              className="block rounded-lg border border-gray-200 bg-white px-6 py-3 text-center font-semibold text-gray-600 transition-all hover:bg-gray-50 active:bg-white"
            >
              Go Home
            </Link>
          </div>

          {/* Contact Support */}
          <div className="mt-8 rounded-lg bg-yellow-50 p-4 border border-yellow-200">
            <p className="text-sm text-yellow-900">
              Having trouble? Contact our support team at{' '}
              <a
                href="mailto:support@example.com"
                className="font-semibold underline hover:text-yellow-700"
              >
                support@example.com
              </a>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function PurchaseCancelPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <PurchaseCancelContent />
    </Suspense>
  );
}
