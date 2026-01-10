"use client";

import { useContext } from 'react';
import { User } from 'firebase/auth';
import { UserProfile } from '@/lib/firebase/types';
import { AuthContext } from '@/lib/contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
