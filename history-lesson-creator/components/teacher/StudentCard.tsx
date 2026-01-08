"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, TrendingUp, BookOpen, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import ProgressBar from "@/components/progress/ProgressBar";
import StudentProgress from "./StudentProgress";
import type { StudentInfo } from "@/lib/firebase/types";

interface StudentWithProgress extends StudentInfo {
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
}

interface StudentCardProps {
  student: StudentWithProgress;
}

export default function StudentCard({ student }: StudentCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const progressPercentage =
    student.totalLessons > 0
      ? Math.round((student.completedLessons / student.totalLessons) * 100)
      : 0;

  const createdDate = student.createdAt
    ? format(student.createdAt.toDate(), "MMM d, yyyy")
    : "N/A";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-4">
          {/* Student Info */}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                {student.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {student.displayName}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Mail className="h-3.5 w-3.5" />
                  {student.email}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-600">Progress</div>
                <div className="text-lg font-bold text-gray-900">
                  {progressPercentage}%
                </div>
                <div className="text-xs text-gray-500">
                  {student.completedLessons}/{student.totalLessons} lessons
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Avg Score</div>
                <div
                  className={`text-lg font-bold ${
                    student.averageScore >= 80
                      ? "text-green-600"
                      : student.averageScore >= 60
                      ? "text-amber-600"
                      : "text-gray-600"
                  }`}
                >
                  {student.averageScore > 0 ? `${student.averageScore}%` : "N/A"}
                </div>
                <div className="text-xs text-gray-500">quiz average</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Joined</div>
                <div className="text-sm font-semibold text-gray-900">
                  {createdDate}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {student.totalLessons > 0 && (
              <div className="mt-4">
                <ProgressBar
                  current={student.completedLessons}
                  total={student.totalLessons}
                  showPercentage={false}
                  height="sm"
                  barColor={
                    progressPercentage >= 70
                      ? "bg-green-600"
                      : progressPercentage >= 40
                      ? "bg-amber-600"
                      : "bg-gray-600"
                  }
                />
              </div>
            )}
          </div>

          {/* View Details Button */}
          <button
            onClick={() => setShowDetails(true)}
            className="flex items-center gap-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-700 active:scale-95"
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Student Progress Modal */}
      {showDetails && (
        <StudentProgress
          studentId={student.uid}
          studentName={student.displayName}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
