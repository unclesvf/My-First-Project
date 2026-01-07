"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, CreditCard, Brain, ArrowLeft } from "lucide-react";
import { lessons } from "@/data/lessons";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StoryReader from "@/components/StoryReader";
import FlashcardDeck from "@/components/FlashcardDeck";
import QuizEngine from "@/components/QuizEngine";
import { cn } from "@/lib/utils";

type Tab = "story" | "flashcards" | "quiz";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("story");

  const lesson = lessons.find((l) => l.id === params.id);

  if (!lesson) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Lesson Not Found
            </h1>
            <button
              onClick={() => router.push("/")}
              className="btn-primary"
            >
              Return Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: "story" as Tab, label: "Story", icon: BookOpen },
    { id: "flashcards" as Tab, label: "Flashcards", icon: CreditCard },
    { id: "quiz" as Tab, label: "Quiz", icon: Brain },
  ];

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
              />
            )}
            {activeTab === "flashcards" && (
              <FlashcardDeck flashcards={lesson.flashcards} />
            )}
            {activeTab === "quiz" && <QuizEngine questions={lesson.quiz} />}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
