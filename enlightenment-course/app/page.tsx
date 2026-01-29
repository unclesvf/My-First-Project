import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, CreditCard, Brain } from "lucide-react";
import { lessons } from "@/data/lessons";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
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
              The Age of Enlightenment
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Discover the revolutionary ideas that shaped American democracy through immersive stories,
              interactive flashcards, and engaging quizzes. Perfect for middle school learners!
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
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lesson/${lesson.id}`}
                  className="group"
                >
                  <div className="card-base overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                    <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                      <h3 className="mb-2 text-2xl font-bold">
                        {lesson.title}
                      </h3>
                      <p className="text-primary-100">{lesson.description}</p>
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                          Start Learning →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
