"use client";

export const dynamic = 'force-dynamic';
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useProgress } from "@/lib/hooks/useProgress";
import { logger } from "@/lib/utils/logger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProgressOverview from "@/components/student/ProgressOverview";
import QuizHistory from "@/components/student/QuizHistory";
import { ChevronRight, Home } from "lucide-react";
import type { LessonProgress, QuizAttempt } from "@/lib/firebase/types";

export default function DashboardPage() {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();
  const progress = useProgress();

  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Load progress data callback
  const loadProgressData = useCallback(async () => {
    try {
      setDataLoading(true);
      const [allProgress, allQuizzes] = await Promise.all([
        progress.getAllLessonProgressData(),
        progress.getAllQuizHistoryData(),
      ]);
      setLessonProgress(allProgress);
      setQuizAttempts(allQuizzes);
    } catch (error) {
      logger.error("Error loading progress data", error);
    } finally {
      setDataLoading(false);
    }
  }, [progress]);

  // Protect route - redirect if not authenticated
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  // Load progress data
  useEffect(() => {
    if (user && !loading) {
      loadProgressData();
    }
  }, [user, loading, loadProgressData]);

  // Show loading state while checking auth
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

  const completedLessons = lessonProgress.filter(
    (p) => p.status === "completed"
  ).length;
  const totalLessonsStarted = lessonProgress.length;
  const averageQuizScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
            quizAttempts.length
        )
      : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 flex items-center gap-2 text-sm">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Dashboard</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, {userProfile.displayName}!
            </h1>
            <p className="text-gray-600">
              {userProfile.role === "student"
                ? "Track your learning progress and review your quiz performance."
                : "View your teaching dashboard and student progress."}
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="rounded-lg border-2 border-gray-200 bg-white p-4 text-center">
              <div className="text-3xl font-bold text-primary-600">
                {totalLessonsStarted}
              </div>
              <div className="text-sm text-gray-600">Lessons Started</div>
            </div>
            <div className="rounded-lg border-2 border-gray-200 bg-white p-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                {completedLessons}
              </div>
              <div className="text-sm text-gray-600">Lessons Completed</div>
            </div>
            <div className="rounded-lg border-2 border-gray-200 bg-white p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {quizAttempts.length}
              </div>
              <div className="text-sm text-gray-600">Quizzes Completed</div>
            </div>
          </div>

          {/* Main Content Grid */}
          {userProfile.role === "student" ? (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ProgressOverview
                  progress={lessonProgress}
                  completedLessons={completedLessons}
                  totalLessonsStarted={totalLessonsStarted}
                  loading={dataLoading}
                />
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-4">
                {/* Average Score Card */}
                <div className="rounded-lg border-2 border-gray-200 bg-white p-4">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Quiz Stats
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        Average Score
                      </div>
                      <div className="text-4xl font-bold text-primary-600">
                        {averageQuizScore}%
                      </div>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-3">
                      <div className="text-sm text-gray-600 mb-1">
                        Total Attempts
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {quizAttempts.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Summary */}
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <h3 className="mb-3 font-semibold text-blue-900">
                    Progress Summary
                  </h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Completion Rate:</span>
                      <span className="font-semibold">
                        {totalLessonsStarted > 0
                          ? Math.round(
                              (completedLessons / totalLessonsStarted) * 100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>In Progress:</span>
                      <span className="font-semibold">
                        {lessonProgress.filter((p) => p.status === "in_progress")
                          .length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Teacher View */
            <div className="rounded-lg border-2 border-gray-200 bg-white p-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Teacher Dashboard
              </h2>
              <p className="text-gray-600">
                Teacher features coming soon. Manage your students and their
                progress here.
              </p>
            </div>
          )}

          {/* Quiz History Section */}
          <div className="mt-8">
            <QuizHistory quizAttempts={quizAttempts} loading={dataLoading} />
          </div>

          {/* Refresh Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                progress.refreshAllProgress();
                loadProgressData();
              }}
              className="rounded-lg border-2 border-gray-200 bg-white px-6 py-2 font-medium text-gray-900 transition-colors hover:border-gray-300 hover:shadow-sm"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
