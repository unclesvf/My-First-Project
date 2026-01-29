"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { format, isPast } from "date-fns";
import { lessons } from "@/data/lessons";
import type { Assignment, LessonProgress } from "@/lib/firebase/types";

interface AssignedLessonsProps {
  assignments: Assignment[];
  progress: LessonProgress[];
  loading: boolean;
}

export default function AssignedLessons({
  assignments,
  progress,
  loading,
}: AssignedLessonsProps) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Assigned by Your Teacher
        </h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-lg bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Assigned by Your Teacher
      </h2>
      <p className="mb-4 text-gray-600">
        Complete these lessons to stay on track
      </p>

      <div className="space-y-3">
        {assignments.map((assignment) => {
          const lesson = lessons.find((l) => l.id === assignment.lessonId);
          if (!lesson) return null;

          const lessonProgress = progress.find(
            (p) => p.lessonId === assignment.lessonId
          );
          const isCompleted = lessonProgress?.status === "completed";
          const isOverdue =
            assignment.dueDate && isPast(assignment.dueDate.toDate()) && !isCompleted;

          return (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`rounded-lg border-2 p-4 transition-all ${
                isOverdue
                  ? "border-red-300 bg-red-50"
                  : isCompleted
                  ? "border-green-300 bg-green-50"
                  : "border-blue-300 bg-blue-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Lesson Info */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {lesson.title}
                    </h3>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : isOverdue ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : null}
                  </div>
                  <p className="mb-2 text-sm text-gray-700">
                    {lesson.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    {/* Due Date */}
                    {assignment.dueDate && (
                      <div
                        className={`flex items-center gap-1 ${
                          isOverdue ? "font-semibold text-red-700" : ""
                        }`}
                      >
                        <Clock className="h-4 w-4" />
                        <span>
                          Due {format(assignment.dueDate.toDate(), "MMM d, yyyy")}
                          {isOverdue && " (Overdue)"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => router.push(`/lesson/${lesson.id}`)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 font-semibold transition-all hover:shadow-md active:scale-95 ${
                    isCompleted
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : isOverdue
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isCompleted ? "Review" : "Start Now"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
