"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
        return;
      }

      if (userProfile?.role === "student") {
        router.replace("/student");
      } else if (userProfile?.role === "teacher") {
        router.replace("/teacher");
      }
    }
  }, [user, userProfile, loading, router]);

  if (loading || !user || !userProfile) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mx-auto"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            Redirecting to your dashboard...
          </h1>
          <p className="text-gray-600">
            If nothing happens, choose your dashboard below.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => router.push("/student")}
              className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Student Dashboard
            </button>
            <button
              onClick={() => router.push("/teacher")}
              className="rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Teacher Dashboard
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
