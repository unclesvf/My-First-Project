# Phase 4 Integration Guide

## Quick Start

### 1. Wrap Your App with ProgressProvider (if not already done)

In your layout or main page component:

```typescript
import { ProgressProvider } from '@/lib/contexts/ProgressContext';

export default function Layout({ children }) {
  return (
    <ProgressProvider>
      {children}
    </ProgressProvider>
  );
}
```

### 2. Access Dashboard

Navigate to: `/dashboard`

The dashboard is protected and will redirect unauthenticated users to the home page.

---

## Implementation in Quiz Components

### Save Quiz Results After Completion

```typescript
import { useProgress } from '@/lib/hooks/useProgress';

export default function QuizCompletionScreen() {
  const { saveQuizAttempt } = useProgress();

  const handleQuizComplete = async (quizData) => {
    try {
      const attemptId = await saveQuizAttempt(
        lessonId,                    // string
        quizData.score,              // number
        quizData.totalQuestions,     // number
        quizData.percentage,         // number (0-100)
        quizData.answers,            // QuizAnswer[]
        Math.floor(quizData.timeSpent / 1000)  // seconds
      );

      console.log('Quiz saved:', attemptId);
      // Show success message and redirect
    } catch (error) {
      console.error('Failed to save quiz:', error);
    }
  };

  return (
    // Your component
  );
}
```

### QuizAnswer Structure

```typescript
interface QuizAnswer {
  questionId: string;
  selectedOptionIndex: number;  // 0-based index
  correctOptionIndex: number;   // 0-based index
  isCorrect: boolean;
}

// Example:
const answers = [
  {
    questionId: 'q1',
    selectedOptionIndex: 1,
    correctOptionIndex: 1,
    isCorrect: true,
  },
  {
    questionId: 'q2',
    selectedOptionIndex: 2,
    correctOptionIndex: 0,
    isCorrect: false,
  },
];
```

---

## Implementation in Story/Flashcard Components

### Update Story Progress

```typescript
import { useProgress } from '@/lib/hooks/useProgress';

export default function StoryComponent({ lessonId, totalChapters }) {
  const { updateStoryProgress } = useProgress();
  const [currentChapter, setCurrentChapter] = useState(0);

  const handleNextChapter = async () => {
    const nextChapter = currentChapter + 1;
    setCurrentChapter(nextChapter);

    try {
      await updateStoryProgress(lessonId, nextChapter, totalChapters);
      // Progress saved automatically
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  return (
    // Your component
  );
}
```

### Update Flashcard Progress

```typescript
import { useProgress } from '@/lib/hooks/useProgress';

export default function FlashcardComponent({ lessonId, cards }) {
  const { updateFlashcardProgress } = useProgress();
  const [masteredCards, setMasteredCards] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCardMastered = async (cardId: string) => {
    const newMasteredCards = [...masteredCards, cardId];
    setMasteredCards(newMasteredCards);

    try {
      await updateFlashcardProgress(
        lessonId,
        currentIndex,
        cards.length,
        newMasteredCards
      );
      // Progress saved automatically
    } catch (error) {
      console.error('Failed to update flashcard progress:', error);
    }
  };

  return (
    // Your component
  );
}
```

---

## Using Progress Data in Components

### Get Current Lesson Progress

```typescript
import { useProgress } from '@/lib/hooks/useProgress';

export default function MyComponent({ lessonId }) {
  const { getLessonProgressData } = useProgress();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      const data = await getLessonProgressData(lessonId);
      setProgress(data);
    };
    fetchProgress();
  }, [lessonId]);

  if (!progress) return <div>Loading...</div>;

  return (
    <div>
      <p>Status: {progress.status}</p>
      <p>Story Progress: {progress.storyProgress}</p>
      <p>Mastered Cards: {progress.flashcardProgress.length}</p>
    </div>
  );
}
```

### Get Quiz History for a Lesson

```typescript
import { useProgress } from '@/lib/hooks/useProgress';

export default function LessonStats({ lessonId }) {
  const { getQuizHistory } = useProgress();
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getQuizHistory(lessonId);
      setAttempts(data);
    };
    fetchHistory();
  }, [lessonId]);

  const averageScore = attempts.length > 0
    ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length)
    : 0;

  return (
    <div>
      <p>Quiz Attempts: {attempts.length}</p>
      <p>Average Score: {averageScore}%</p>
      <p>Best Score: {Math.max(...attempts.map(a => a.percentage))}%</p>
    </div>
  );
}
```

---

## Dashboard Features

### Student Dashboard (`/dashboard`)

The dashboard automatically displays:
- Overall completion percentage
- Lessons started and completed counts
- Quiz statistics (average score, total attempts)
- Progress overview with recent activity
- Complete quiz history with filters and sorting

### Accessing Student Progress Programmatically

```typescript
import { useProgress } from '@/lib/hooks/useProgress';

export default function StudentCard({ studentId }) {
  const { allLessonProgress, allQuizAttempts } = useProgress();

  const completedLessons = allLessonProgress.filter(
    p => p.status === 'completed'
  ).length;

  const averageScore = allQuizAttempts.length > 0
    ? Math.round(
        allQuizAttempts.reduce((sum, a) => sum + a.percentage, 0) /
        allQuizAttempts.length
      )
    : 0;

  return (
    <div>
      <p>Completed: {completedLessons}</p>
      <p>Average Score: {averageScore}%</p>
    </div>
  );
}
```

---

## Error Handling

### Common Error Cases

```typescript
import { useProgress } from '@/lib/hooks/useProgress';

export default function QuizScreen() {
  const { saveQuizAttempt } = useProgress();

  const handleSaveQuiz = async (quizData) => {
    try {
      const attemptId = await saveQuizAttempt(
        lessonId,
        quizData.score,
        quizData.totalQuestions,
        quizData.percentage,
        quizData.answers,
        quizData.timeSpent
      );

      // Success
      showSuccessMessage('Quiz saved successfully!');

    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('user not authenticated')) {
          // Redirect to login
          router.push('/login');
        } else if (error.message.includes('Failed to save')) {
          // Retry logic
          showErrorMessage('Failed to save quiz. Please try again.');
        } else {
          // Generic error
          showErrorMessage(error.message);
        }
      }
    }
  };

  return (
    // Your component
  );
}
```

---

## Data Structure Reference

### Storing Quiz Data

When saving a quiz, ensure your data matches this structure:

```typescript
const quizData = {
  score: 8,                    // 0-totalQuestions
  totalQuestions: 10,          // Total questions in quiz
  percentage: 80,              // score/totalQuestions * 100
  timeSpent: 300,              // seconds
  answers: [
    {
      questionId: 'q1',
      selectedOptionIndex: 1,
      correctOptionIndex: 1,
      isCorrect: true,
    },
    // ... more answers
  ]
};

// Save it
await saveQuizAttempt(
  lessonId,
  quizData.score,
  quizData.totalQuestions,
  quizData.percentage,
  quizData.answers,
  quizData.timeSpent
);
```

### Tracking Progress States

Progress has three states:

```typescript
type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

// Progress is automatically:
// - 'not_started': No progress recorded yet
// - 'in_progress': When story/flashcard progress is updated
// - 'completed': When all chapters OR all flashcards are mastered
```

---

## Best Practices

1. **Always provide lesson ID:** All functions require lessonId for organization
2. **Use the progress context:** Don't call Firestore functions directly from components
3. **Debounce is automatic:** Story/flashcard updates are debounced, so call them freely
4. **Quiz saves are immediate:** Quiz attempts save right away (no debounce)
5. **Check for null:** Progress data can be null if not yet started
6. **Error handling:** Always wrap async functions in try-catch
7. **Loading states:** Show loading indicators during data fetches
8. **Refresh when needed:** Call `refreshAllProgress()` for manual sync

---

## Testing Progress Tracking

### Manual Testing Checklist

- [ ] Navigate to `/dashboard` - should show empty state or existing data
- [ ] Complete a quiz - should save and appear in dashboard
- [ ] View quiz history - should show recent quizzes
- [ ] Filter quiz history by lesson - should work
- [ ] Sort quiz history by date/score - should work
- [ ] Update story progress - should reflect in dashboard
- [ ] Update flashcard progress - should reflect in dashboard
- [ ] Check Firestore console - documents should appear in correct subcollections
- [ ] Refresh dashboard - should maintain all data
- [ ] Mobile responsiveness - all controls should work on mobile

### Firestore Console Check

Verify your data structure in Firebase Console:

```
users/{userId}/quizAttempts/
├── {attemptId1}
├── {attemptId2}
└── ...

users/{userId}/lessonProgress/
├── {lessonId1}
├── {lessonId2}
└── ...
```

---

## Troubleshooting

### Quiz attempts not showing

1. Check Firestore rules allow read/write to subcollections
2. Verify quiz is saved with correct userId
3. Check browser console for errors
4. Ensure lesson ID format matches

### Progress not updating

1. Verify user is authenticated
2. Check Firestore quota usage
3. Review browser console errors
4. Use manual refresh button on dashboard

### Dashboard showing old data

1. Use "Refresh Data" button
2. Verify internet connection
3. Check Firestore real-time sync status
4. Clear browser cache if needed

---

## Next Steps

1. **Integrate with quiz components** - Add `saveQuizAttempt()` to your quiz completion handler
2. **Track story progress** - Call `updateStoryProgress()` when navigating chapters
3. **Track flashcard progress** - Call `updateFlashcardProgress()` when mastering cards
4. **Monitor dashboard** - Check `/dashboard` for student progress
5. **Customize styling** - Adjust Tailwind classes in components as needed
6. **Add notifications** - Show toast messages when progress is saved
7. **Implement teacher features** - Build teacher dashboard using same progress data

---

## API Reference

### Progress Context Methods

```typescript
// Save quiz attempt and return attempt ID
saveQuizAttempt(
  lessonId: string,
  score: number,
  totalQuestions: number,
  percentage: number,
  answers: QuizAnswer[],
  timeSpent: number
): Promise<string>

// Update story progress
updateStoryProgress(
  lessonId: string,
  currentChapter: number,
  totalChapters: number
): Promise<void>

// Update flashcard progress
updateFlashcardProgress(
  lessonId: string,
  cardIndex: number,
  totalCards: number,
  masteredCardIds: string[]
): Promise<void>

// Get progress for specific lesson
getLessonProgressData(lessonId: string): Promise<LessonProgress | null>

// Get quiz history for specific lesson
getQuizHistory(lessonId: string): Promise<QuizAttempt[]>

// Get all progress across lessons
getAllLessonProgressData(): Promise<LessonProgress[]>

// Get all quiz attempts
getAllQuizHistoryData(): Promise<QuizAttempt[]>

// Refresh current lesson
refreshProgress(): Promise<void>

// Refresh all progress
refreshAllProgress(): Promise<void>
```

---

For detailed implementation information, see `PHASE_4_PROGRESS_TRACKING.md`
