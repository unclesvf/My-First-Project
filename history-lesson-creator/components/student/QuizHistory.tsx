"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, TrendingUp, TrendingDown, Calendar, Clock, Filter } from "lucide-react";
import { format } from "date-fns";
import type { QuizAttempt } from "@/lib/firebase/types";

interface QuizHistoryProps {
  quizAttempts: QuizAttempt[];
  loading: boolean;
}

export default function QuizHistory({ quizAttempts, loading }: QuizHistoryProps) {
  const [sortBy, setSortBy] = useState<"date" | "score">("date");
  const [filterLesson, setFilterLesson] = useState<string | null>(null);

  // Get unique lessons for filter
  const uniqueLessons = Array.from(
    new Set(quizAttempts.map((attempt) => attempt.lessonId))
  ).sort();

  // Filter and sort attempts
  let filteredAttempts = [...quizAttempts];

  if (filterLesson) {
    filteredAttempts = filteredAttempts.filter(
      (attempt) => attempt.lessonId === filterLesson
    );
  }

  if (sortBy === "date") {
    filteredAttempts.sort(
      (a, b) => b.completedAt.toDate().getTime() - a.completedAt.toDate().getTime()
    );
  } else {
    filteredAttempts.sort((a, b) => b.percentage - a.percentage);
  }

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
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Quiz History</h2>
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
  if (filteredAttempts.length >= 2) {
    const latestScore = filteredAttempts[0].percentage;
    const previousScore = filteredAttempts[1].percentage;
    if (latestScore > previousScore) {
      trend = "up";
    } else if (latestScore < previousScore) {
      trend = "down";
    }
  }

  const averageScore =
    filteredAttempts.length > 0
      ? Math.round(
          filteredAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
            filteredAttempts.length
        )
      : 0;

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quiz History</h2>
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

      {/* Filters and Sort Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          {/* Filter by Lesson */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <select
              value={filterLesson || ""}
              onChange={(e) => setFilterLesson(e.target.value || null)}
              className="rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-300 focus:border-primary-500 focus:outline-none"
            >
              <option value="">All Lessons</option>
              {uniqueLessons.map((lesson) => (
                <option key={lesson} value={lesson}>
                  Lesson {lesson}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("date")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  sortBy === "date"
                    ? "border-2 border-primary-500 bg-primary-50 text-primary-700"
                    : "border-2 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Date
              </button>
              <button
                onClick={() => setSortBy("score")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  sortBy === "score"
                    ? "border-2 border-primary-500 bg-primary-50 text-primary-700"
                    : "border-2 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                Score
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredAttempts.length} of {quizAttempts.length} quizzes
        </div>
      </div>

      {filteredAttempts.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mb-4 text-4xl">📋</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No Quizzes Found
          </h3>
          <p className="text-gray-600">
            {filterLesson
              ? `No quizzes found for Lesson ${filterLesson}`
              : "No quizzes completed yet"}
          </p>
        </div>
      ) : (
        <>
          {/* Average Score Card */}
          <div className="mb-6 rounded-lg border-2 border-gray-200 bg-gradient-to-br from-primary-50 to-accent-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Average Score</div>
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
                  Across {filteredAttempts.length} quiz
                  {filteredAttempts.length !== 1 ? "zes" : ""}
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
            {filteredAttempts.map((attempt, index) => (
              <motion.div
                key={attempt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm"
              >
                {/* Score Badge */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${
                      attempt.percentage >= 80
                        ? "bg-green-100 text-green-700"
                        : attempt.percentage >= 60
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
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
                      {attempt.score}/{attempt.totalQuestions} correct answers
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="text-right text-sm text-gray-600">
                  <div className="mb-1 flex items-center justify-end gap-1">
                    <Calendar className="h-4 w-4" />
                    {attempt.completedAt
                      ? format(attempt.completedAt.toDate(), "MMM d, yyyy")
                      : "N/A"}
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <Clock className="h-4 w-4" />
                    {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
