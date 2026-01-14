import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';

// Input validation helpers
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

function sanitizeDisplayName(name: string): string {
  // Remove potential XSS characters and trim
  return name.replace(/[<>\"'&]/g, '').trim();
}

export async function signInWithEmail(email: string, password: string) {
  // Validate email format
  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address');
  }

  // Basic password check (don't enforce strength on sign-in, just sign-up)
  if (!password || password.length < 1) {
    throw new Error('Please enter your password');
  }

  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signUpWithEmail(email: string, password: string, displayName: string) {
  // Validate email format
  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address');
  }

  // Validate password strength
  if (!validatePassword(password)) {
    throw new Error(
      'Password must be at least 8 characters with uppercase, lowercase, and a number'
    );
  }

  // Sanitize and validate display name
  const sanitizedName = sanitizeDisplayName(displayName);
  if (sanitizedName.length < 2) {
    throw new Error('Please enter your name (at least 2 characters)');
  }

  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: sanitizedName });
  return result.user;
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}
