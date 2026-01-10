"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { getUserProfile, createUserProfile } from '@/lib/firebase/firestore';
import { UserProfile } from '@/lib/firebase/types';
import {
  signInWithEmail as firebaseSignInWithEmail,
  signUpWithEmail as firebaseSignUpWithEmail,
  signInWithGoogle as firebaseSignInWithGoogle,
  signOut as firebaseSignOut,
} from '@/lib/firebase/auth';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setUserRole: (role: 'teacher' | 'student', teacherId?: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  setUserRole: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        let profile = await getUserProfile(firebaseUser.uid);

        if (!profile) {
          profile = await createUserProfile(firebaseUser);
        }

        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithEmail = async (email: string, password: string) => {
    try {
      await firebaseSignInWithEmail(email, password);
    } catch (error) {
      throw error;
    }
  };

  const handleSignUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      await firebaseSignUpWithEmail(email, password, displayName);
    } catch (error) {
      throw error;
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await firebaseSignInWithGoogle();
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      throw error;
    }
  };

  const handleSetUserRole = async (role: 'teacher' | 'student', teacherId?: string) => {
    try {
      if (!user) throw new Error('No authenticated user');

      const { updateUserRole } = await import('@/lib/firebase/firestore');
      await updateUserRole(user.uid, role, teacherId);

      // Update user profile with new role
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          role,
          ...(teacherId && { teacherId }),
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRefreshProfile = async () => {
    if (!user) return;
    const profile = await getUserProfile(user.uid);
    if (profile) {
      setUserProfile(profile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithEmail: handleSignInWithEmail,
        signUpWithEmail: handleSignUpWithEmail,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
        setUserRole: handleSetUserRole,
        refreshProfile: handleRefreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
