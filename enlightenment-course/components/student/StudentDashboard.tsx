"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Award, Calendar } from "lucide-react";
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

      {/* Overview Stats */}
      {loading ? (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
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
          className="mb-8 grid gap-4 sm:grid-cols-3"
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

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Progress Overview */}
        <div>
          <ProgressOverview
            progress={progress}
            completedLessons={completedLessons}
            totalLessonsStarted={totalLessonsStarted}
            loading={loading}
          />
        </div>

        {/* Quiz History */}
        <div>
          <QuizHistory quizAttempts={recentQuizzes} loading={loading} />
        </div>
      </div>

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

                return (
                  <motion.button
                    key={lesson.id}
                    onClick={() => router.push(`/lesson/${lesson.id}`)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-primary-500 hover:shadow-md"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {lesson.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                            ✓ Completed
                          </span>
                        ) : isStarted ? (
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                            In Progress
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                            Not Started
                          </span>
                        )}
                      </div>
                      <TrendingUp className="h-4 w-4 text-gray-400" />
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
