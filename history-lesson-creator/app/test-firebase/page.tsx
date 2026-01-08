"use client";

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase/config';
import { signInAnonymously, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function TestFirebasePage() {
  const [status, setStatus] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const addStatus = (message: string) => {
    setStatus(prev => [...prev, message]);
  };

  const runTests = async () => {
    setStatus([]);
    setError(null);
    setTesting(true);

    try {
      // Test 1: Firebase Config
      addStatus('✓ Firebase app initialized');
      addStatus(`✓ Project ID: ${auth.app.options.projectId}`);

      // Test 2: Firebase Auth
      addStatus('Testing Firebase Authentication...');
      const userCredential = await signInAnonymously(auth);
      addStatus(`✓ Anonymous sign-in successful! UID: ${userCredential.user.uid}`);

      // Test 3: Firestore Write
      addStatus('Testing Firestore write...');
      const testCollection = collection(db, 'test');
      const docRef = await addDoc(testCollection, {
        message: 'Hello from Firebase!',
        timestamp: new Date(),
      });
      addStatus(`✓ Document written with ID: ${docRef.id}`);

      // Test 4: Firestore Read
      addStatus('Testing Firestore read...');
      const querySnapshot = await getDocs(testCollection);
      addStatus(`✓ Found ${querySnapshot.size} document(s) in test collection`);

      // Test 5: Firestore Delete (cleanup)
      addStatus('Cleaning up test data...');
      await deleteDoc(doc(db, 'test', docRef.id));
      addStatus('✓ Test document deleted');

      // Test 6: Sign Out
      addStatus('Testing sign out...');
      await signOut(auth);
      addStatus('✓ Signed out successfully');

      addStatus('');
      addStatus('🎉 ALL TESTS PASSED! Firebase is working correctly.');

    } catch (err: any) {
      setError(`❌ Test failed: ${err.message}`);
      addStatus(`Error code: ${err.code}`);
      console.error('Firebase test error:', err);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Firebase Connection Test
          </h1>

          <p className="text-gray-600 mb-6">
            Click the button below to test your Firebase configuration.
            This will verify authentication and Firestore database connectivity.
          </p>

          <button
            onClick={runTests}
            disabled={testing}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {testing ? 'Testing...' : 'Run Firebase Tests'}
          </button>

          {(status.length > 0 || error) && (
            <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Test Results:</h2>

              <div className="font-mono text-sm space-y-1">
                {status.map((msg, i) => (
                  <div
                    key={i}
                    className={msg.startsWith('✓') ? 'text-green-600' :
                              msg.startsWith('🎉') ? 'text-green-700 font-bold' :
                              'text-gray-700'}
                  >
                    {msg}
                  </div>
                ))}

                {error && (
                  <div className="text-red-600 font-semibold mt-4">
                    {error}
                  </div>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Troubleshooting:</h3>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>Check that .env.local exists and contains your Firebase credentials</li>
                <li>Verify Firebase Authentication is enabled in Firebase Console</li>
                <li>Verify Firestore Database is created in Firebase Console</li>
                <li>Make sure you're running the dev server (npm run dev)</li>
                <li>Try restarting the dev server after adding .env.local</li>
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
