"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, Calendar } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { getStudentProgress, getAllQuizAttempts, getStudentAssignments } from "@/lib/firebase/firestore";
import { lessons } from "@/data/lessons";
import StatsCard from "@/components/progress/StatsCard";
import AssignedLessons from "./AssignedLessons";
import ProgressOverview from "./ProgressOverview";
import QuizHistory from "./QuizHistory";
import type { LessonProgress, QuizAttempt, Assignment } from "@/lib/firebase/types";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const lessonTitleMap = new Map(lessons.map((lesson) => [lesson.id, lesson.title]));

  useEffect(() => {
    if (!user || !userProfile) return;

    const loadStudentData = async () => {
      setLoading(true);
      try {
        const [progressData, quizData, assignmentData] = await Promise.all([
          getStudentProgress(user.uid),
          getAllQuizAttempts(user.uid),
          userProfile.teacherId
            ? getStudentAssignments(user.uid)
            : Promise.resolve([]),
        ]);

        setProgress(progressData);
        setQuizAttempts(quizData);
        setAssignments(assignmentData);
      } catch (error) {
        console.error("Failed to load student data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, [user, userProfile]);

  // Calculate stats
  const completedLessons = progress.filter((p) => p.status === "completed").length;
  const totalLessonsStarted = progress.length;
  const averageScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
            quizAttempts.length
        )
      : 0;

  const recentQuizzes = quizAttempts.slice(0, 5);
  const mostRecentProgress = [...progress]
    .filter((p) => p.lastAccessedAt)
    .sort((a, b) => b.lastAccessedAt.toDate().getTime() - a.lastAccessedAt.toDate().getTime())[0];
  const fallbackLesson = lessons[0];
  const nextLessonId = mostRecentProgress?.lessonId || fallbackLesson?.id;
  const nextLessonTitle = nextLessonId
    ? lessonTitleMap.get(nextLessonId) || "Lesson"
    : "Lesson";
  const nextActionLabel =
    mostRecentProgress?.status === "completed"
      ? "Review Lesson"
      : mostRecentProgress?.status === "in_progress"
      ? "Continue Lesson"
      : "Start Lesson";

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, {userProfile?.displayName?.split(" ")[0]}!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Track your progress and continue learning
        </p>
      </div>

      {/* Next Up */}
      <div className="mb-8 rounded-xl border-2 border-primary-200 bg-primary-50 p-6">
        <h2 className="mb-2 text-2xl font-bold text-primary-900">Next Up</h2>
        <p className="text-gray-700">
          {mostRecentProgress ? "Continue where you left off." : "Start your first lesson."}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-lg font-semibold text-gray-900">{nextLessonTitle}</div>
            {mostRecentProgress?.lastAccessedAt && (
              <div className="text-sm text-gray-600">
                Last opened{" "}
                {new Date(mostRecentProgress.lastAccessedAt.toDate()).toLocaleDateString()}
              </div>
            )}
          </div>
          {nextLessonId && (
            <button
              onClick={() => router.push(`/lesson/${nextLessonId}`)}
              className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              {nextActionLabel}
            </button>
          )}
        </div>
      </div>

      {/* Overview Stats */}
      <details className="mb-8 rounded-xl border-2 border-gray-200 bg-white p-6">
        <summary className="cursor-pointer text-lg font-semibold text-gray-900">
          My Stats
        </summary>
        {loading ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl bg-gray-200"
              ></div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 grid gap-4 sm:grid-cols-3"
          >
            <StatsCard
              title="Lessons Completed"
              value={completedLessons}
              subtitle={`${totalLessonsStarted} lessons started`}
              icon={BookOpen}
              color="blue"
              size="md"
            />
            <StatsCard
              title="Average Score"
              value={averageScore > 0 ? `${averageScore}%` : "N/A"}
              subtitle={`${quizAttempts.length} quiz${quizAttempts.length !== 1 ? "zes" : ""} taken`}
              icon={Award}
              color={
                averageScore >= 80
                  ? "green"
                  : averageScore >= 60
                  ? "amber"
                  : "gray"
              }
              size="md"
            />
            <StatsCard
              title="Assignments"
              value={assignments.length}
              subtitle={
                assignments.filter((a) => a.status === "assigned").length > 0
                  ? `${assignments.filter((a) => a.status === "assigned").length} pending`
                  : "All complete!"
              }
              icon={Calendar}
              color={
                assignments.filter((a) => a.status === "assigned").length > 0
                  ? "amber"
                  : "green"
              }
              size="md"
            />
          </motion.div>
        )}

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <ProgressOverview
              progress={progress}
              completedLessons={completedLessons}
              totalLessonsStarted={totalLessonsStarted}
              loading={loading}
            />
          </div>
          <div>
            <QuizHistory quizAttempts={recentQuizzes} loading={loading} />
          </div>
        </div>
      </details>

      {/* Assigned Lessons Section */}
      {assignments.length > 0 && (
        <div className="mb-8">
          <AssignedLessons
            assignments={assignments}
            progress={progress}
            loading={loading}
          />
        </div>
      )}

      {/* All Lessons Section */}
      <div className="mt-8">
        <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            All Available Lessons
          </h2>
          <p className="mb-4 text-gray-600">
            Browse and start any lesson to begin learning
          </p>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson) => {
                const lessonProgress = progress.find(
                  (p) => p.lessonId === lesson.id
                );
                const isCompleted = lessonProgress?.status === "completed";
                const isStarted = !!lessonProgress;
                const actionLabel = isCompleted
                  ? "Review"
                  : isStarted
                  ? "Continue"
                  : "Start";

                return (
                  <motion.button
                    key={lesson.id}
                    onClick={() => router.push(`/lesson/${lesson.id}`)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-primary-500 hover:shadow-md"
                  >
                    <div className="space-y-3">
                      <h3 className="text-base font-semibold text-gray-900">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {lesson.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          isCompleted
                            ? "bg-green-100 text-green-700"
                            : isStarted
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {isCompleted ? "Completed" : isStarted ? "In Progress" : "New"}
                        </span>
                        <span className="text-sm font-semibold text-primary-600">
                          {actionLabel}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
