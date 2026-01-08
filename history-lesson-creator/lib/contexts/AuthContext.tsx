"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import {
  signInWithGoogle as firebaseSignInWithGoogle,
  signInWithEmail as firebaseSignInWithEmail,
  signUpWithEmail as firebaseSignUpWithEmail,
  signOut as firebaseSignOut,
} from '@/lib/firebase/auth';
import {
  getUserProfile,
  createUserProfile,
  updateUserRole,
  updateLastLogin,
} from '@/lib/firebase/firestore';
import type { UserProfile } from '@/lib/firebase/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUserRole: (role: 'teacher' | 'student', teacherId?: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const profile = await getUserProfile(uid);
      setUserProfile(profile);
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Refresh user profile (useful after updates)
  const refreshUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // User is signed in
        const profile = await fetchUserProfile(firebaseUser.uid);

        // If no profile exists, create one (first-time user)
        if (!profile) {
          await createUserProfile(
            firebaseUser.uid,
            firebaseUser.email || '',
            firebaseUser.displayName || 'User'
          );
          await fetchUserProfile(firebaseUser.uid);
        } else {
          // Update last login
          await updateLastLogin(firebaseUser.uid);
        }
      } else {
        // User is signed out
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const handleSignInWithGoogle = async () => {
    try {
      await firebaseSignInWithGoogle();
      // onAuthStateChanged will handle the rest
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign in with Email/Password
  const handleSignInWithEmail = async (email: string, password: string) => {
    try {
      await firebaseSignInWithEmail(email, password);
      // onAuthStateChanged will handle the rest
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign up with Email/Password
  const handleSignUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      await firebaseSignUpWithEmail(email, password, displayName);
      // onAuthStateChanged will handle the rest
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      // onAuthStateChanged will handle the rest
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Set user role (teacher or student)
  const setUserRole = async (role: 'teacher' | 'student', teacherId?: string) => {
    if (!user) {
      throw new Error('No user signed in');
    }

    try {
      await updateUserRole(user.uid, role, teacherId);
      await refreshUserProfile();
    } catch (error: any) {
      console.error('Error setting user role:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signInWithGoogle: handleSignInWithGoogle,
    signInWithEmail: handleSignInWithEmail,
    signUpWithEmail: handleSignUpWithEmail,
    signOut: handleSignOut,
    setUserRole,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
