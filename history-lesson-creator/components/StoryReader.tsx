"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, User, CheckCircle2 } from "lucide-react";
import { Chapter } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/hooks/useProgress";
import { useAuth } from "@/lib/hooks/useAuth";

interface StoryReaderProps {
  narrator: string;
  chapters: Chapter[];
  lessonId: string;
}

export default function StoryReader({ narrator, chapters, lessonId }: StoryReaderProps) {
  const { user } = useAuth();
  const { updateStoryProgress, currentLessonProgress } = useProgress();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const sp = currentLessonProgress?.storyProgress;
    if (typeof sp === 'object' && sp?.currentChapter !== undefined) {
      setCurrentChapter(sp.currentChapter);
    } else if (typeof sp === 'number') {
      setCurrentChapter(sp);
    }
  }, [currentLessonProgress]);

  // Track progress when chapter changes
  useEffect(() => {
    if (user && lessonId) {
      updateStoryProgress(lessonId, currentChapter, chapters.length);

      // Show completion badge if on last chapter
      if (currentChapter === chapters.length - 1) {
        setShowCompletionBadge(true);
      }
    }
  }, [currentChapter, user, lessonId, chapters.length, updateStoryProgress]);

  const goToNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setDirection(1);
      setCurrentChapter(currentChapter + 1);
    }
  };

  const goToPreviousChapter = () => {
    if (currentChapter > 0) {
      setDirection(-1);
      setCurrentChapter(currentChapter - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Narrator Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center gap-3 rounded-xl border border-primary-200 bg-gradient-to-r from-primary-50 to-indigo-50 p-4"
      >
        <div className="rounded-full bg-primary-600 p-2">
          <User className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary-900">Narrator</p>
          <p className="text-base text-primary-700">{narrator}</p>
        </div>
      </motion.div>

      {/* Chapter Content */}
      <div className="relative min-h-[500px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentChapter}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="card-base p-8"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              {chapters[currentChapter].title}
            </h2>
            <div className="story-text space-y-4 whitespace-pre-line">
              {chapters[currentChapter].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={goToPreviousChapter}
          disabled={currentChapter === 0}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all",
            currentChapter === 0
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg active:scale-95"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {chapters.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentChapter ? 1 : -1);
                setCurrentChapter(index);
              }}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all",
                index === currentChapter
                  ? "w-8 bg-primary-600"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to chapter ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNextChapter}
          disabled={currentChapter === chapters.length - 1}
          className={cn(
            "flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all",
            currentChapter === chapters.length - 1
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg active:scale-95"
          )}
        >
          Next Chapter
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Chapter {currentChapter + 1} of {chapters.length}
      </div>

      {/* Completion Badge */}
      {showCompletionBadge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mt-6 rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-full bg-green-500 p-2">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-green-900">Story Complete!</p>
              <p className="text-sm text-green-700">
                You've finished reading all {chapters.length} chapters
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
