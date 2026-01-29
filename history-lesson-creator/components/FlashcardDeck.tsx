"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw, Star } from "lucide-react";
import { Flashcard } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/hooks/useProgress";
import { useAuth } from "@/lib/hooks/useAuth";

interface FlashcardDeckProps {
  flashcards: Flashcard[];
  lessonId: string;
}

export default function FlashcardDeck({ flashcards, lessonId }: FlashcardDeckProps) {
  const { user } = useAuth();
  const { updateFlashcardProgress, currentLessonProgress } = useProgress();
  const [cards, setCards] = useState(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [showMoreControls, setShowMoreControls] = useState(false);

  const getCardId = useCallback((card: Flashcard) => {
    if (card.id) return card.id;
    return `${card.term}-${card.definition}`;
  }, []);

  const normalizeMasteredCardIds = useCallback(
    (ids: string[]) => {
      return ids
        .map((id) => {
          if (/^\d+$/.test(id)) {
            const legacyIndex = Number(id);
            const card = flashcards[legacyIndex];
            return card ? getCardId(card) : id;
          }
          return id;
        })
        .filter((id) => id);
    },
    [flashcards, getCardId]
  );

  // Load mastered cards from progress
  useEffect(() => {
    const fp = currentLessonProgress?.flashcardProgress;
    if (fp && typeof fp === 'object' && 'masteredCards' in fp && fp.masteredCards) {
      const normalized = normalizeMasteredCardIds(fp.masteredCards);
      setMasteredCards(new Set(normalized));
    }
  }, [currentLessonProgress, normalizeMasteredCardIds]);

  // Track progress when card changes
  useEffect(() => {
    if (user && lessonId) {
      updateFlashcardProgress(
        lessonId,
        currentIndex,
        cards.length,
        Array.from(masteredCards)
      );
    }
  }, [currentIndex, user, lessonId, cards.length, masteredCards, updateFlashcardProgress]);

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

  const toggleMastered = () => {
    const currentCardId = getCardId(cards[currentIndex]);
    const newMasteredCards = new Set(masteredCards);

    if (newMasteredCards.has(currentCardId)) {
      newMasteredCards.delete(currentCardId);
    } else {
      newMasteredCards.add(currentCardId);
    }

    setMasteredCards(newMasteredCards);
  };

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

  const isCurrentCardMastered = masteredCards.has(getCardId(cards[currentIndex]));

  return (
    <div className="mx-auto max-w-2xl">
      {/* Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">
            Card {currentIndex + 1} of {cards.length}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {masteredCards.size} mastered
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleMastered}
            aria-label={isCurrentCardMastered ? "Unmark card as mastered" : "Mark card as mastered"}
            aria-pressed={isCurrentCardMastered}
            className={cn(
              "flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all active:scale-95",
              isCurrentCardMastered
                ? "border-yellow-500 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                : "border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
            )}
          >
            <Star className={cn("h-4 w-4", isCurrentCardMastered && "fill-yellow-500")} />
            {isCurrentCardMastered ? "Mastered" : "Master"}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMoreControls((prev) => !prev)}
              aria-label="More flashcard controls"
              className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-transparent px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
            >
              More
            </button>
            {showMoreControls && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                <button
                  onClick={() => {
                    shuffleCards();
                    setShowMoreControls(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Shuffle className="h-4 w-4" />
                  Shuffle
                </button>
                <button
                  onClick={() => {
                    resetCards();
                    setShowMoreControls(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-8 h-80">
        <motion.div
          className="relative h-full w-full cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              setIsFlipped(!isFlipped);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Flashcard ${currentIndex + 1} of ${cards.length}. ${
            isFlipped
              ? `Definition: ${cards[currentIndex].definition}`
              : `Term: ${cards[currentIndex].term}`
          }. Press space to ${isFlipped ? 'see term' : 'reveal definition'}.`}
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
      <nav className="flex items-center justify-between" aria-label="Flashcard navigation">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label="Previous flashcard"
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

        <div className="flex gap-1" role="tablist" aria-label="Flashcard progress">
          {cards.map((_, index) => (
            <div
              key={index}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Card ${index + 1}`}
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
          aria-label="Next flashcard"
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
      </nav>

      {/* Keyboard Hints */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Use arrow keys to navigate; Space/Enter to flip
      </div>
    </div>
  );
}
