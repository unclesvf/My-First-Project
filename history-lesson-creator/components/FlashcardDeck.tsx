"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from "lucide-react";
import { Flashcard } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FlashcardDeckProps {
  flashcards: Flashcard[];
}

export default function FlashcardDeck({ flashcards }: FlashcardDeckProps) {
  const [cards, setCards] = useState(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const goToNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, cards.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, goToNext, goToPrevious]);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const resetCards = () => {
    setCards(flashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Card {currentIndex + 1} of {cards.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={shuffleCards}
            className="flex items-center gap-2 rounded-lg border-2 border-primary-600 bg-transparent px-4 py-2 text-sm font-semibold text-primary-700 transition-all hover:bg-primary-50 active:scale-95"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle
          </button>
          <button
            onClick={resetCards}
            className="flex items-center gap-2 rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-8 h-80">
        <motion.div
          className="relative h-full w-full cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Front of card (Term) */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-primary-300 bg-gradient-to-br from-primary-50 to-white p-8 shadow-xl",
              "backface-hidden"
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Term
            </p>
            <h3 className="text-center text-3xl font-bold text-gray-900">
              {cards[currentIndex].term}
            </h3>
            <p className="mt-8 text-sm text-gray-500">
              Click or press Space to reveal
            </p>
          </div>

          {/* Back of card (Definition) */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-accent-400 bg-gradient-to-br from-accent-50 to-white p-8 shadow-xl",
              "backface-hidden"
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-700">
              Definition
            </p>
            <p className="text-center text-lg leading-relaxed text-gray-800">
              {cards[currentIndex].definition}
            </p>
            <p className="mt-8 text-sm text-gray-500">
              Click or press Space to flip back
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={cn(
            "flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all",
            currentIndex === 0
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg active:scale-95"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>

        <div className="flex gap-1">
          {cards.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                index === currentIndex ? "w-6 bg-primary-600" : "bg-gray-300"
              )}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === cards.length - 1}
          className={cn(
            "flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all",
            currentIndex === cards.length - 1
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg active:scale-95"
          )}
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Keyboard Hints */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Use arrow keys to navigate • Space/Enter to flip
      </div>
    </div>
  );
}
