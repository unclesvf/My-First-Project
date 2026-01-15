export type Lesson = {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  story: {
    narrator: string;
    chapters: Chapter[];
  };
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
};

export type Chapter = {
  title: string;
  content: string;
};

export type Flashcard = {
  id: string;
  term: string;
  definition: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

export type QuizResult = {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
};
