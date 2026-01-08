"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, TrendingUp, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { getTeacherStudents, getStudentProgress, getQuizAttempts } from "@/lib/firebase/firestore";
import StatsCard from "@/components/progress/StatsCard";
import StudentList from "./StudentList";
import CreateStudentModal from "./CreateStudentModal";
import type { StudentInfo } from "@/lib/firebase/types";

interface StudentWithProgress extends StudentInfo {
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
}

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState<StudentWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Load students and their progress
  useEffect(() => {
    if (!user) return;

    const loadStudentsWithProgress = async () => {
      setLoading(true);
      try {
        const studentsList = await getTeacherStudents(user.uid);

        // Fetch progress for each student
        const studentsWithProgress = await Promise.all(
          studentsList.map(async (student) => {
            const progress = await getStudentProgress(student.uid);
            const quizAttempts = await getQuizAttempts(student.uid);

            const completedLessons = progress.filter(
              (p) => p.status === "completed"
            ).length;

            // Calculate average quiz score
            let averageScore = 0;
            if (quizAttempts.length > 0) {
              const totalScore = quizAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0);
              averageScore = Math.round(totalScore / quizAttempts.length);
            }

            return {
              ...student,
              totalLessons: progress.length,
              completedLessons,
              averageScore,
            };
          })
        );

        setStudents(studentsWithProgress);
      } catch (error) {
        console.error("Failed to load students:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStudentsWithProgress();
  }, [user]);

  // Calculate overview stats
  const totalStudents = students.length;
  const totalLessonsCompleted = students.reduce(
    (sum, student) => sum + student.completedLessons,
    0
  );
  const averageProgress = totalStudents > 0
    ? Math.round(
        students.reduce((sum, student) => {
          const progress =
            student.totalLessons > 0
              ? (student.completedLessons / student.totalLessons) * 100
              : 0;
          return sum + progress;
        }, 0) / totalStudents
      )
    : 0;

  const averageScore = students.length > 0
    ? Math.round(
        students.reduce((sum, student) => sum + student.averageScore, 0) /
          students.length
      )
    : 0;

  return (
    <>
      <div className="mb-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your students and track their progress
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg active:scale-95"
          >
            <UserPlus className="h-5 w-5" />
            Add Student
          </button>
        </div>

        {/* Overview Stats */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-3">
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
            className="grid gap-4 sm:grid-cols-3"
          >
            <StatsCard
              title="Total Students"
              value={totalStudents}
              subtitle={`${totalLessonsCompleted} lessons completed`}
              icon={Users}
              color="blue"
              size="md"
            />
            <StatsCard
              title="Average Progress"
              value={`${averageProgress}%`}
              subtitle="Across all students"
              icon={TrendingUp}
              color={averageProgress >= 70 ? "green" : averageProgress >= 40 ? "amber" : "gray"}
              size="md"
            />
            <StatsCard
              title="Average Score"
              value={averageScore > 0 ? `${averageScore}%` : "N/A"}
              subtitle="Quiz performance"
              icon={BookOpen}
              color={averageScore >= 80 ? "green" : averageScore >= 60 ? "amber" : "gray"}
              size="md"
            />
          </motion.div>
        )}
      </div>

      {/* Student List */}
      <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Your Students</h2>
        <StudentList students={students} loading={loading} />
      </div>

      {/* Create Student Modal */}
      <CreateStudentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onStudentCreated={() => {
          setShowCreateModal(false);
          // Reload students
          if (user) {
            getTeacherStudents(user.uid).then(async (studentsList) => {
              const studentsWithProgress = await Promise.all(
                studentsList.map(async (student) => {
                  const progress = await getStudentProgress(student.uid);
                  const quizAttempts = await getQuizAttempts(student.uid);
                  const completedLessons = progress.filter(
                    (p) => p.status === "completed"
                  ).length;
                  let averageScore = 0;
                  if (quizAttempts.length > 0) {
                    const totalScore = quizAttempts.reduce(
                      (sum, attempt) => sum + attempt.percentage,
                      0
                    );
                    averageScore = Math.round(totalScore / quizAttempts.length);
                  }
                  return {
                    ...student,
                    totalLessons: progress.length,
                    completedLessons,
                    averageScore,
                  };
                })
              );
              setStudents(studentsWithProgress);
            });
          }
        }}
      />
    </>
  );
}
