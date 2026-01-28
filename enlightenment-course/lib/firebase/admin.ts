import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Firebase Admin SDK configuration for server-side operations
 * Used by API routes (webhooks, etc.) that need admin access to Firestore
 *
 * Required environment variables:
 * - FIREBASE_PROJECT_ID: Firebase project ID (or uses NEXT_PUBLIC_FIREBASE_PROJECT_ID)
 * - FIREBASE_CLIENT_EMAIL: Service account client email
 * - FIREBASE_PRIVATE_KEY: Service account private key (with \n escaped)
 *
 * To get these credentials:
 * 1. Go to Firebase Console > Project Settings > Service Accounts
 * 2. Click "Generate new private key"
 * 3. Copy the values to your .env.local file
 */

function initializeAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId) {
    throw new Error('Missing FIREBASE_PROJECT_ID environment variable');
  }

  // If we have service account credentials, use them
  if (clientEmail && privateKey) {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  // Fallback: Initialize without credentials (works in Firebase-hosted environments)
  return initializeApp({
    projectId,
  });
}

// Initialize app and get Firestore instance
const adminApp = initializeAdminApp();
export const adminDb = getFirestore(adminApp);
