import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';
import { logger } from '@/lib/utils/logger';

// Google Sign-In
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    logger.error('Error signing in with Google', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
}

// Email/Password Sign Up
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name
    await updateProfile(result.user, { displayName });

    return result.user;
  } catch (error: any) {
    logger.error('Error signing up with email', error);

    // Provide user-friendly error messages
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please sign in instead.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    }

    throw new Error(error.message || 'Failed to create account');
  }
}

// Email/Password Sign In
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    logger.error('Error signing in with email', error);

    // Provide user-friendly error messages
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    }

    throw new Error(error.message || 'Failed to sign in');
  }
}

// Sign Out
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    logger.error('Error signing out', error);
    throw new Error(error.message || 'Failed to sign out');
  }
}
