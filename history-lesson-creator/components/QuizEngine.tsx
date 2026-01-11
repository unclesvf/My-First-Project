"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Trophy, RotateCcw, ChevronRight, Clock, History } from "lucide-react";
import { QuizQuestion, QuizResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/hooks/useProgress";
import { useAuth } from "@/lib/hooks/useAuth";

// Development mode flag
const DEV_MODE = process.env.NODE_ENV === 'development';

interface QuizEngineProps {
  questions: QuizQuestion[];
  lessonId: string;
  courseId: string;
}

export default function QuizEngine({ questions, lessonId, courseId }: QuizEngineProps) {
  const { user } = useAuth();
  const { saveQuizAttempt } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [quizSaved, setQuizSaved] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (hasAnswered) return;

    setSelectedOption(optionIndex);
    setHasAnswered(true);

    const isCorrect =
      optionIndex === questions[currentQuestion].correctOptionIndex;

    setResults([
      ...results,
      {
        questionId: questions[currentQuestion].id,
        selectedIndex: optionIndex,
        isCorrect,
      },
    ]);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setResults([]);
    setShowResults(false);
    setQuizSaved(false);
  };

  const score = results.filter((r) => r.isCorrect).length;
  const percentage = Math.round((score / questions.length) * 100);

  // Save quiz attempt when results are shown
  useEffect(() => {
    // In dev mode, save even without user (uses localStorage fallback)
    // In production, require user authentication
    const canSave = DEV_MODE || user;

    if (showResults && !quizSaved && canSave) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds

      saveQuizAttempt(
        lessonId,
        score,
        questions.length,
        percentage,
        results,
        timeSpent
      )
        .then(() => {
          setQuizSaved(true);
          console.log('Quiz attempt saved successfully');
        })
        .catch((error) => {
          console.error('Failed to save quiz attempt:', error);
        });
    }
  }, [showResults, quizSaved, user, lessonId, score, questions.length, percentage, results, startTime]);

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl"
      >
        <div className="card-base p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 inline-block rounded-full bg-gradient-to-br from-accent-400 to-accent-600 p-6"
          >
            <Trophy className="h-16 w-16 text-white" />
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Quiz Complete!
          </h2>

          <div className="mb-8">
            <p className="mb-2 text-6xl font-bold text-primary-600">
              {percentage}%
            </p>
            <p className="text-xl text-gray-700">
              You got {score} out of {questions.length} correct
            </p>
            {quizSaved && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Completed in {Math.round((Date.now() - startTime) / 1000)} seconds</span>
                {DEV_MODE && !user && <span className="text-amber-600">(saved locally)</span>}
              </div>
            )}
          </div>

          <div className="mb-8 space-y-3">
            {questions.map((question, index) => {
              const result = results[index];
              return (
                <div
                  key={question.id}
                  className={cn(
                    "rounded-lg border-2 p-4 text-left",
                    result.isCorrect
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 rounded-full p-1",
                        result.isCorrect ? "bg-green-500" : "bg-red-500"
                      )}
                    >
                      {result.isCorrect ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <X className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        Question {index + 1}
                      </p>
                      <p className="text-sm text-gray-700">
                        {question.question}
                      </p>
                      {!result.isCorrect && (
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-semibold">Correct answer:</span>{" "}
                          {question.options[question.correctOptionIndex]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg active:scale-95"
            >
              <RotateCcw className="h-5 w-5" />
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedOption === question.correctOptionIndex;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-full bg-primary-600"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="card-base p-8"
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrectOption = index === question.correctOptionIndex;
              const showCorrect = hasAnswered && isCorrectOption;
              const showIncorrect = hasAnswered && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={hasAnswered}
                  className={cn(
                    "w-full rounded-lg border-2 p-4 text-left font-medium transition-all",
                    !hasAnswered &&
                      "border-gray-300 bg-white hover:border-primary-500 hover:bg-primary-50",
                    showCorrect &&
                      "border-green-500 bg-green-50 text-green-900",
                    showIncorrect && "border-red-500 bg-red-50 text-red-900",
                    hasAnswered &&
                      !showCorrect &&
                      !showIncorrect &&
                      "border-gray-200 bg-gray-50 text-gray-500"
                  )}
                  whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                  animate={
                    showIncorrect
                      ? {
                          x: [0, -10, 10, -10, 10, 0],
                          transition: { duration: 0.4 },
                        }
                      : {}
                  }
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                    {showIncorrect && <X className="h-5 w-5 text-red-600" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={cn(
                "mt-6 rounded-lg border-2 p-4",
                isCorrect
                  ? "border-green-300 bg-green-50"
                  : "border-amber-300 bg-amber-50"
              )}
            >
              <p className="mb-2 font-semibold text-gray-900">
                {isCorrect ? "Correct! " : "Not quite. "}
              </p>
              <p className="text-gray-700">{question.explanation}</p>
            </motion.div>
          )}

          {/* Next Button */}
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-end"
            >
              <button
                onClick={goToNextQuestion}
                className="flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg active:scale-95"
              >
                {currentQuestion < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
