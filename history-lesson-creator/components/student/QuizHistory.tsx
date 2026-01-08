"use client";

import { motion } from "framer-motion";
import { Award, TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import type { QuizAttempt } from "@/lib/firebase/types";

interface QuizHistoryProps {
  quizAttempts: QuizAttempt[];
  loading: boolean;
}

export default function QuizHistory({ quizAttempts, loading }: QuizHistoryProps) {
  if (loading) {
    return (
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Recent Quizzes</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-lg bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (quizAttempts.length === 0) {
    return (
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Recent Quizzes</h2>
        <div className="py-8 text-center">
          <div className="mb-4 text-6xl">📝</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No Quizzes Yet
          </h3>
          <p className="text-gray-600">
            Complete a lesson quiz to see your scores here
          </p>
        </div>
      </div>
    );
  }

  // Calculate trend for most recent vs previous
  let trend: "up" | "down" | "neutral" = "neutral";
  if (quizAttempts.length >= 2) {
    const latestScore = quizAttempts[0].percentage;
    const previousScore = quizAttempts[1].percentage;
    if (latestScore > previousScore) {
      trend = "up";
    } else if (latestScore < previousScore) {
      trend = "down";
    }
  }

  const averageScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
            quizAttempts.length
        )
      : 0;

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recent Quizzes</h2>
        {trend !== "neutral" && (
          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
              trend === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trend === "up" ? (
              <>
                <TrendingUp className="h-4 w-4" />
                Improving
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4" />
                Keep Practicing
              </>
            )}
          </div>
        )}
      </div>

      {/* Average Score Card */}
      <div className="mb-4 rounded-lg border-2 border-gray-200 bg-gradient-to-br from-primary-50 to-accent-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Your Average</div>
            <div
              className={`text-4xl font-bold ${
                averageScore >= 80
                  ? "text-green-600"
                  : averageScore >= 60
                  ? "text-amber-600"
                  : "text-gray-600"
              }`}
            >
              {averageScore}%
            </div>
            <div className="text-sm text-gray-600">
              Across {quizAttempts.length} quiz
              {quizAttempts.length !== 1 ? "zes" : ""}
            </div>
          </div>
          <Award
            className={`h-16 w-16 ${
              averageScore >= 80
                ? "text-green-600"
                : averageScore >= 60
                ? "text-amber-600"
                : "text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Quiz Attempts List */}
      <div className="space-y-2">
        {quizAttempts.map((attempt, index) => (
          <motion.div
            key={attempt.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-3 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            {/* Score Badge */}
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                  attempt.percentage >= 80
                    ? "bg-green-100 text-green-700"
                    : attempt.percentage >= 60
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {attempt.percentage}%
              </div>

              {/* Lesson Info */}
              <div>
                <div className="font-semibold text-gray-900">
                  Lesson {attempt.lessonId}
                </div>
                <div className="text-sm text-gray-600">
                  {attempt.score}/{attempt.totalQuestions} correct
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="text-right text-sm text-gray-600">
              <div className="flex items-center justify-end gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {attempt.completedAt
                  ? format(attempt.completedAt.toDate(), "MMM d")
                  : "N/A"}
              </div>
              <div className="flex items-center justify-end gap-1">
                <Clock className="h-3.5 w-3.5" />
                {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      {quizAttempts.length >= 5 && (
        <div className="mt-4 text-center">
          <button className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700">
            View All Quiz History →
          </button>
        </div>
      )}
    </div>
  );
}
