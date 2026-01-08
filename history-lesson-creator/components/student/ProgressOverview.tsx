"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";
import ProgressBar from "@/components/progress/ProgressBar";
import ProgressBadge from "@/components/progress/ProgressBadge";
import type { LessonProgress } from "@/lib/firebase/types";

interface ProgressOverviewProps {
  progress: LessonProgress[];
  completedLessons: number;
  totalLessonsStarted: number;
  loading: boolean;
}

export default function ProgressOverview({
  progress,
  completedLessons,
  totalLessonsStarted,
  loading,
}: ProgressOverviewProps) {
  if (loading) {
    return (
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Your Progress</h2>
        <div className="space-y-4">
          <div className="h-24 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-32 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>
    );
  }

  const inProgressLessons = progress.filter(
    (p) => p.status === "in_progress"
  ).length;

  const progressPercentage =
    totalLessonsStarted > 0
      ? Math.round((completedLessons / totalLessonsStarted) * 100)
      : 0;

  // Motivational message based on progress
  let motivationalMessage = "";
  if (completedLessons === 0) {
    motivationalMessage = "Start your first lesson to begin your learning journey!";
  } else if (progressPercentage < 30) {
    motivationalMessage = "Great start! Keep up the momentum!";
  } else if (progressPercentage < 70) {
    motivationalMessage = "You're making excellent progress!";
  } else if (progressPercentage < 100) {
    motivationalMessage = "Almost there! You're doing amazing!";
  } else {
    motivationalMessage = "Congratulations! You've completed all lessons!";
  }

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Your Progress</h2>

      {totalLessonsStarted === 0 ? (
        <div className="py-8 text-center">
          <div className="mb-4 text-6xl">📚</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Ready to Start Learning?
          </h3>
          <p className="text-gray-600">
            Browse the lessons below and start your first one!
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overall Progress Bar */}
          <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Overall Completion</h3>
              <span className="text-2xl font-bold text-primary-600">
                {progressPercentage}%
              </span>
            </div>
            <ProgressBar
              current={completedLessons}
              total={totalLessonsStarted}
              showPercentage={false}
              height="lg"
              barColor={
                progressPercentage >= 70
                  ? "bg-green-600"
                  : progressPercentage >= 40
                  ? "bg-blue-600"
                  : "bg-gray-600"
              }
            />
            <p className="mt-3 text-sm text-gray-600">{motivationalMessage}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-semibold">Completed</span>
              </div>
              <div className="text-3xl font-bold text-green-900">
                {completedLessons}
              </div>
              <div className="text-sm text-green-700">
                {completedLessons === 1 ? "lesson" : "lessons"} finished
              </div>
            </div>

            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-blue-700">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-semibold">In Progress</span>
              </div>
              <div className="text-3xl font-bold text-blue-900">
                {inProgressLessons}
              </div>
              <div className="text-sm text-blue-700">
                {inProgressLessons === 1 ? "lesson" : "lessons"} active
              </div>
            </div>
          </div>

          {/* Recent Lessons */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Recent Activity</h3>
            <div className="space-y-2">
              {progress.slice(0, 5).map((p) => (
                <div
                  key={p.lessonId}
                  className="flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-3"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Lesson {p.lessonId}
                      </div>
                      {p.lastAccessedAt && (
                        <div className="text-xs text-gray-500">
                          Last accessed:{" "}
                          {new Date(p.lastAccessedAt.toDate()).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <ProgressBadge
                    status={
                      p.status === "completed"
                        ? "completed"
                        : "in-progress"
                    }
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
