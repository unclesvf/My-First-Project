"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, BookOpen, Award, Clock, Calendar, TrendingUp, Download } from "lucide-react";
import { format } from "date-fns";
import { getStudentProgress, getQuizAttempts } from "@/lib/firebase/firestore";
import ProgressBar from "@/components/progress/ProgressBar";
import ProgressBadge from "@/components/progress/ProgressBadge";
import type { LessonProgress, QuizAttempt } from "@/lib/firebase/types";

interface StudentProgressProps {
  studentId: string;
  studentName: string;
  onClose: () => void;
}

export default function StudentProgress({
  studentId,
  studentName,
  onClose,
}: StudentProgressProps) {
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      try {
        const [progressData, quizData] = await Promise.all([
          getStudentProgress(studentId),
          getQuizAttempts(studentId),
        ]);
        setProgress(progressData);
        setQuizAttempts(quizData);
      } catch (error) {
        console.error("Failed to load student progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [studentId]);

  const completedLessons = progress.filter((p) => p.status === "completed").length;
  const totalLessons = progress.length;
  const averageScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
            quizAttempts.length
        )
      : 0;

  const handleExportReport = () => {
    // Generate a simple text report
    let report = `Progress Report for ${studentName}\n`;
    report += `Generated on ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}\n\n`;
    report += `Summary:\n`;
    report += `- Total Lessons: ${totalLessons}\n`;
    report += `- Completed Lessons: ${completedLessons}\n`;
    report += `- Progress: ${totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%\n`;
    report += `- Average Quiz Score: ${averageScore}%\n\n`;
    report += `Lesson Progress:\n`;

    progress.forEach((p) => {
      report += `\nLesson ${p.lessonId}:\n`;
      report += `- Status: ${p.status}\n`;
      if (p.storyProgress) {
        report += `- Story: Chapter ${p.storyProgress.currentChapter + 1}/${p.storyProgress.totalChapters}\n`;
      }
      if (p.flashcardProgress) {
        report += `- Flashcards: ${p.flashcardProgress.masteredCards?.length || 0} mastered\n`;
      }
    });

    report += `\n\nQuiz Attempts:\n`;
    quizAttempts.forEach((attempt, index) => {
      const date = attempt.completedAt ? format(attempt.completedAt.toDate(), "MMM d, yyyy") : "N/A";
      report += `${index + 1}. Lesson ${attempt.lessonId} - ${attempt.percentage}% (${date})\n`;
    });

    // Create download
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${studentName.replace(/\s+/g, "_")}_progress_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-gray-900">
                      Progress Report: {studentName}
                    </Dialog.Title>
                    <p className="mt-1 text-sm text-gray-600">
                      Detailed lesson progress and quiz performance
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleExportReport}
                      className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                    <button
                      onClick={onClose}
                      className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
                    <p className="text-gray-600">Loading progress...</p>
                  </div>
                ) : (
                  <>
                    {/* Summary Stats */}
                    <div className="mb-6 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                          <BookOpen className="h-4 w-4" />
                          Lessons Completed
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {completedLessons}
                          <span className="text-xl text-gray-500">/{totalLessons}</span>
                        </div>
                        {totalLessons > 0 && (
                          <ProgressBar
                            current={completedLessons}
                            total={totalLessons}
                            showPercentage={false}
                            height="sm"
                            barColor="bg-primary-600"
                          />
                        )}
                      </div>

                      <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                          <Award className="h-4 w-4" />
                          Average Score
                        </div>
                        <div
                          className={`text-3xl font-bold ${
                            averageScore >= 80
                              ? "text-green-600"
                              : averageScore >= 60
                              ? "text-amber-600"
                              : "text-gray-600"
                          }`}
                        >
                          {averageScore > 0 ? `${averageScore}%` : "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {quizAttempts.length} quiz{quizAttempts.length !== 1 ? "zes" : ""} taken
                        </div>
                      </div>

                      <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="h-4 w-4" />
                          Progress
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {totalLessons > 0
                            ? Math.round((completedLessons / totalLessons) * 100)
                            : 0}
                          %
                        </div>
                        <div className="text-sm text-gray-500">overall completion</div>
                      </div>
                    </div>

                    {/* Lesson Progress */}
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900">
                        Lesson Progress
                      </h3>
                      {progress.length === 0 ? (
                        <p className="text-center text-gray-600 py-8">
                          No lessons started yet
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {progress.map((p) => (
                            <div
                              key={p.lessonId}
                              className="rounded-lg border-2 border-gray-200 bg-white p-4"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="mb-2 flex items-center gap-3">
                                    <h4 className="font-semibold text-gray-900">
                                      Lesson {p.lessonId}
                                    </h4>
                                    <ProgressBadge
                                      status={
                                        p.status === "completed"
                                          ? "completed"
                                          : "in-progress"
                                      }
                                      size="sm"
                                    />
                                  </div>
                                  <div className="grid grid-cols-3 gap-4 text-sm">
                                    {p.storyProgress && (
                                      <div>
                                        <span className="text-gray-600">Story:</span>{" "}
                                        <span className="font-medium">
                                          Chapter {p.storyProgress.currentChapter + 1}/
                                          {p.storyProgress.totalChapters}
                                        </span>
                                      </div>
                                    )}
                                    {p.flashcardProgress && (
                                      <div>
                                        <span className="text-gray-600">Flashcards:</span>{" "}
                                        <span className="font-medium">
                                          {p.flashcardProgress.masteredCards?.length || 0}{" "}
                                          mastered
                                        </span>
                                      </div>
                                    )}
                                    {p.lastAccessedAt && (
                                      <div>
                                        <span className="text-gray-600">Last accessed:</span>{" "}
                                        <span className="font-medium">
                                          {format(p.lastAccessedAt.toDate(), "MMM d")}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quiz Attempts */}
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-gray-900">
                        Recent Quiz Attempts
                      </h3>
                      {quizAttempts.length === 0 ? (
                        <p className="text-center text-gray-600 py-8">
                          No quizzes taken yet
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {quizAttempts.slice(0, 10).map((attempt, index) => (
                            <div
                              key={attempt.id}
                              className="flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-3"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                                    attempt.percentage >= 80
                                      ? "bg-green-100 text-green-700"
                                      : attempt.percentage >= 60
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {attempt.percentage}%
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">
                                    Lesson {attempt.lessonId}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {attempt.score}/{attempt.totalQuestions} correct
                                  </div>
                                </div>
                              </div>
                              <div className="text-right text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {attempt.completedAt
                                    ? format(attempt.completedAt.toDate(), "MMM d, yyyy")
                                    : "N/A"}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {Math.floor(attempt.timeSpent / 60)}m {attempt.timeSpent % 60}s
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
