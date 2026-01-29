"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import StudentDashboard from "@/components/student/StudentDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function StudentPage() {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  // Protect route - redirect if not a student
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (userProfile && userProfile.role !== "student") {
        router.push("/");
      }
    }
  }, [user, userProfile, loading, router]);

  // Show loading state while checking auth
  if (loading || !userProfile) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mx-auto"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Verify user is a student
  if (userProfile.role !== "student") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <StudentDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
