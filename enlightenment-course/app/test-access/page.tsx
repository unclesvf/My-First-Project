'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Navigation from '@/components/Navigation';
import { getCourseAccessForCourse } from '@/lib/firebase/types';

const COURSE_ID = 'age-of-enlightenment';

export default function TestAccessPage() {
  const { user, userProfile, refreshProfile } = useAuth();
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Get course-specific access
  const courseAccess = getCourseAccessForCourse(userProfile, COURSE_ID);

  const grantAccess = async () => {
    if (!user) {
      setStatus('Please sign in first');
      return;
    }

    setLoading(true);
    try {
      // Update directly from client with auth context - per-course access
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        [`courseAccess.${COURSE_ID}.status`]: 'purchased',
        [`courseAccess.${COURSE_ID}.purchasedAt`]: Timestamp.now(),
        [`courseAccess.${COURSE_ID}.trialStartedAt`]: null,
        [`courseAccess.${COURSE_ID}.trialEndsAt`]: null,
        [`courseAccess.${COURSE_ID}.stripePaymentIntentId`]: null,
        [`courseAccess.${COURSE_ID}.stripeCustomerId`]: null,
      });

      // Refresh profile to get updated data
      if (refreshProfile) {
        await refreshProfile();
      }

      setStatus('Access granted! Refresh the page and try accessing a lesson again.');
    } catch (error) {
      setStatus(`Failed to grant access: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Test Access Manager</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current User</h2>
          {user ? (
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.uid}</p>
              <p><strong>Display Name:</strong> {userProfile?.displayName || 'Not set'}</p>
              <p><strong>Course:</strong> {COURSE_ID}</p>
              <p><strong>Access Status:</strong> {courseAccess?.status || 'free'}</p>
            </div>
          ) : (
            <p className="text-gray-600">Not signed in. Please sign in first.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Grant Test Access</h2>
          <p className="text-gray-600 mb-4">
            Click the button below to grant yourself full course access for testing purposes.
          </p>
          <button
            onClick={grantAccess}
            disabled={loading || !user}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Granting Access...' : 'Grant Full Access'}
          </button>

          {status && (
            <p className={`mt-4 p-3 rounded ${status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
