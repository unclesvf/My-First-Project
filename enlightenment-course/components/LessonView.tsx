"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, CreditCard, Brain, ArrowLeft, Trophy, Target, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StoryReader from "@/components/StoryReader";
import FlashcardDeck from "@/components/FlashcardDeck";
import QuizEngine from "@/components/QuizEngine";
import { ProgressProvider, useProgress } from "@/lib/contexts/ProgressContext";
import ProgressBar from "@/components/progress/ProgressBar";
import ProgressBadge from "@/components/progress/ProgressBadge";
import StatsCard from "@/components/progress/StatsCard";
import { cn } from "@/lib/utils";
import { Lesson } from "@/lib/types";
import { useAuth } from "@/lib/hooks/useAuth";

type Tab = "story" | "flashcards" | "quiz";

interface LessonViewProps {
  lesson: Lesson;
}

// Internal component that consumes progress context
function LessonContent({ lesson }: LessonViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { currentLessonProgress } = useProgress();
  const [activeTab, setActiveTab] = useState<Tab>("story");

  // Course identifier for this educational platform
  const courseId = "age-of-enlightenment";

  const tabs = [
    { id: "story" as Tab, label: "Story", icon: BookOpen },
    { id: "flashcards" as Tab, label: "Flashcards", icon: CreditCard },
    { id: "quiz" as Tab, label: "Quiz", icon: Brain },
  ];

  // Calculate progress statistics using normalized types
  const storyProgress = currentLessonProgress?.storyProgress;
  const flashcardProgress = currentLessonProgress?.flashcardProgress;
  const totalChapters = lesson.story.chapters.length;

  // Extract chapter progress - handle both object and legacy number format
  const currentChapter = storyProgress && typeof storyProgress === 'object' && 'currentChapter' in storyProgress
    ? storyProgress.currentChapter
    : 0;

  // Story is complete when on the last chapter
  const storyComplete = currentChapter >= totalChapters - 1 && currentLessonProgress?.status === 'completed';

  // Extract mastered cards count - handle both object and legacy array format
  const masteredCards = flashcardProgress && typeof flashcardProgress === 'object' && 'masteredCards' in flashcardProgress
    ? flashcardProgress.masteredCards.length
    : 0;

  const totalCards = lesson.flashcards.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Back Button */}
            <button
              onClick={() => router.push("/")}
              className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Lessons
            </button>

            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-2 text-4xl font-bold text-gray-900">
                {lesson.title}
              </h1>
              <p className="text-xl text-gray-600">{lesson.description}</p>
            </div>

            {/* Progress Overview - Only show for authenticated users */}
            {user && currentLessonProgress && (
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Your Progress
                  </h2>
                  {storyComplete && (
                    <ProgressBadge status="completed" size="lg" />
                  )}
                </div>

                {/* Stats Cards Grid */}
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  <StatsCard
                    title="Story Progress"
                    value={`${currentChapter + 1}/${totalChapters}`}
                    subtitle={storyComplete ? "Complete!" : `Chapter ${currentChapter + 1}`}
                    icon={BookOpen}
                    color={storyComplete ? "green" : "blue"}
                    size="sm"
                  />
                  <StatsCard
                    title="Flashcards Mastered"
                    value={`${masteredCards}/${totalCards}`}
                    subtitle={masteredCards === totalCards ? "All mastered!" : "Keep practicing"}
                    icon={Trophy}
                    color={masteredCards === totalCards ? "green" : "purple"}
                    size="sm"
                  />
                  <StatsCard
                    title="Quiz Attempts"
                    value={currentLessonProgress.quizAttempts?.length ?? 0}
                    subtitle={
                      currentLessonProgress.quizAttempts?.length
                        ? `Best: ${Math.max(...(currentLessonProgress.quizAttempts?.map((a) => a.percentage) ?? [0]))}%`
                        : "Not started"
                    }
                    icon={Brain}
                    color={
                      currentLessonProgress.quizAttempts?.some((a) => a.percentage >= 80)
                        ? "green"
                        : "amber"
                    }
                    size="sm"
                  />
                </div>

                {/* Overall Progress Bar */}
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Overall Lesson Progress
                  </h3>
                  <ProgressBar
                    current={
                      (storyComplete ? 1 : 0) +
                      (masteredCards === totalCards ? 1 : 0) +
                      (currentLessonProgress.quizAttempts?.some((a) => a.percentage >= 80) ? 1 : 0)
                    }
                    total={3}
                    label="Completion"
                    barColor="bg-green-600"
                    height="lg"
                  />
                  <div className="mt-4 flex gap-2">
                    <ProgressBadge
                      status={storyComplete ? "completed" : "in-progress"}
                      label="Story"
                      size="sm"
                      variant="pill"
                    />
                    <ProgressBadge
                      status={masteredCards === totalCards ? "completed" : "in-progress"}
                      label="Flashcards"
                      size="sm"
                      variant="pill"
                    />
                    <ProgressBadge
                      status={
                        currentLessonProgress.quizAttempts?.some((a) => a.percentage >= 80)
                          ? "completed"
                          : currentLessonProgress.quizAttempts?.length
                          ? "in-progress"
                          : "not-started"
                      }
                      label="Quiz"
                      size="sm"
                      variant="pill"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="mb-8 flex gap-2 overflow-x-auto border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative flex items-center gap-2 whitespace-nowrap px-6 py-3 font-semibold transition-colors",
                      activeTab === tab.id
                        ? "text-primary-700"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "story" && (
                <StoryReader
                  narrator={lesson.story.narrator}
                  chapters={lesson.story.chapters}
                  lessonId={lesson.id}
                />
              )}
              {activeTab === "flashcards" && (
                <FlashcardDeck
                  flashcards={lesson.flashcards}
                  lessonId={lesson.id}
                />
              )}
              {activeTab === "quiz" && (
                <QuizEngine
                  questions={lesson.quiz}
                  lessonId={lesson.id}
                  courseId={courseId}
                />
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
}

// Main component that provides progress context
export default function LessonView({ lesson }: LessonViewProps) {
  return (
    <ProgressProvider lessonId={lesson.id}>
      <LessonContent lesson={lesson} />
    </ProgressProvider>
  );
}
