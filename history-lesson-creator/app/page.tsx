"use client";

import Link from "next/link";
import { BookOpen, CreditCard, Brain } from "lucide-react";
import { lessons } from "@/data/lessons";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { checkLessonAccess, isLessonFree } from "@/lib/utils/accessControl";

export default function Home() {
  const { userProfile } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Sponsor Banner */}
          <div className="mb-8 text-center">
            <p className="text-lg text-gray-600 font-medium">
              Brought to you by Uncle&apos;s Value Farm.
            </p>
          </div>

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">
              Welcome to American History
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Explore history through immersive stories, interactive flashcards, and engaging quizzes.
              Perfect for 7th-grade learners!
            </p>
          </div>

          {/* Features */}
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white/80 p-6 text-center backdrop-blur-sm shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 inline-block rounded-full bg-primary-100 p-4">
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                First-Person Stories
              </h3>
              <p className="text-gray-600">
                Experience history through the eyes of people who lived it
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white/80 p-6 text-center backdrop-blur-sm shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 inline-block rounded-full bg-accent-100 p-4">
                <CreditCard className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Interactive Flashcards
              </h3>
              <p className="text-gray-600">
                Master key terms and concepts with engaging flashcards
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white/80 p-6 text-center backdrop-blur-sm shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 inline-block rounded-full bg-green-100 p-4">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Knowledge Quizzes
              </h3>
              <p className="text-gray-600">
                Test your understanding with instant feedback
              </p>
            </div>
          </div>

          {/* Lessons Grid */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Available Lessons
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lessons.map((lesson, index) => {
                const lessonNumber = index + 1;
                const isFree = isLessonFree(lessonNumber);
                const access = checkLessonAccess(lessonNumber, userProfile);
                const canStart = isFree || access.allowed;
                const accessLabel = isFree
                  ? "Free"
                  : access.allowed
                  ? "Unlocked"
                  : "Locked";
                const accessStyles = isFree
                  ? "bg-green-100 text-green-700"
                  : access.allowed
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600";
                const actionLabel = canStart ? "Start Lesson" : "Unlock Lesson";
                const actionStyles = canStart
                  ? "bg-primary-600 hover:bg-primary-700"
                  : "bg-gray-600 hover:bg-gray-700";

                return (
                  <div
                    key={lesson.id}
                    className="card-base overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                      <div className="mb-3 flex items-center justify-between">
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${accessStyles}`}>
                          {accessLabel}
                        </span>
                      </div>
                      <h3 className="mb-2 text-2xl font-bold">
                        {lesson.title}
                      </h3>
                      <p className="text-primary-100">{lesson.description}</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <Link
                        href={`/lesson/${lesson.id}`}
                        className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold text-white transition-colors ${actionStyles}`}
                      >
                        {actionLabel}
                      </Link>
                      <details className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                        <summary className="cursor-pointer font-semibold text-gray-700">
                          Lesson Details
                        </summary>
                        <div className="mt-3 flex flex-col gap-2">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {lesson.story.chapters.length} chapters
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            {lesson.flashcards.length} cards
                          </span>
                          <span className="flex items-center gap-1">
                            <Brain className="h-4 w-4" />
                            {lesson.quiz.length} questions
                          </span>
                        </div>
                      </details>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
