'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/utils/logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service
    logger.error('Application error', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-8">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>
        <p className="mb-6 text-gray-600">
          We encountered an unexpected error. Don't worry, your progress is saved.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
          <a
            href="/"
            className="block w-full rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Return to Home
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-4 text-xs text-gray-800">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
