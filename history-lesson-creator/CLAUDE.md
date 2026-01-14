# Claude Instructions for History Lesson Creator

## QUICK CONTEXT

**Last Major Update:** January 14, 2026
**Project:** History for Homeschoolers - 51 lessons on American history (1565-1920)
**Stack:** Next.js 15, TypeScript, Firebase Auth, Stripe, Tailwind CSS

### Current State
- ✅ **App Build:** Passing, production-ready
- ✅ **Content:** 51 lessons complete with chapters, flashcards, quizzes
- ✅ **Images:** 276/276 historical images generated
- ✅ **Code Quality:** Security fixes and optimizations completed (Jan 14)
- ⏳ **TTS Audio:** V2 quality testing - awaiting user feedback
- ⚠️ **Firestore Rules:** Created but need manual deployment (requires `firebase login`)

---

## RECENT SESSION SUMMARY (January 14, 2026)

### Code Quality Fixes Completed
| Fix | File(s) | Description |
|-----|---------|-------------|
| Unused import | `components/QuizEngine.tsx` | Removed unused `History` import |
| Secure logging | `lib/firebase/firestore.ts` | Replaced 12 `console.error` with `logger.error` |
| Type errors | `lib/contexts/ProgressContext.tsx` | Fixed Timestamp and quizProgress type issues |
| Input validation | `lib/firebase/auth.ts` | Added email/password validation, name sanitization |
| Accessibility | `components/FlashcardDeck.tsx` | Added ARIA labels, keyboard support |
| Accessibility | `components/QuizEngine.tsx` | Added ARIA labels, progress bar roles |
| Type safety | `lib/firebase/firestore.ts` | Changed `any[]` to `QuizAnswer[]` |
| XSS protection | `lib/utils/sanitize.ts` | Created DOMPurify sanitization utilities |
| Code organization | `data/lessons/` | Split 770KB file into 51 individual lesson files |

### New Files Created
- `lib/utils/sanitize.ts` - XSS protection utilities (sanitizeHtml, sanitizeText, sanitizeUrl)
- `data/lessons/*.ts` - 51 individual lesson files + index.ts
- `scripts/split-lessons.js` - Utility to regenerate lesson splits
- `STATUS.md` - Consolidated project status document

### Cleanup Done
- Removed ~70 `tmpclaude-*` temp files
- Updated `.gitignore` to exclude temp files, `*.wav`, `*.tar.gz`, `voice_references/`

---

## PENDING ACTIONS (Require User)

### 1. Deploy Firestore Security Rules
```bash
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator"
firebase login
firebase deploy --only firestore:rules
```
**Why:** Rules are created in `firestore.rules` but not deployed. Console shows permission errors until deployed.

### 2. Configure Stripe Webhooks
- Go to Stripe Dashboard → Developers → Webhooks
- Add endpoint for payment confirmations
- Update webhook secret in environment

### 3. TTS Audio Feedback
- User needs to evaluate `Survival_in_Jamestown_Zonos_V2.wav` quality
- If acceptable: batch generate all 51 lessons (~13-17 hours)
- If not: try lower speaking rate or different TTS model

---

## PROJECT STRUCTURE

### Key Directories
```
history-lesson-creator/
├── app/                    # Next.js pages and API routes
├── components/             # React components (auth, payment, progress, student, teacher)
├── data/
│   ├── lessons.ts          # Re-exports from lessons/ (backward compatible)
│   └── lessons/            # 51 individual lesson files (NEW)
├── lib/
│   ├── firebase/           # Auth, Firestore, config
│   ├── contexts/           # AuthContext, ProgressContext
│   ├── hooks/              # useAuth, useProgress, useTrialStatus
│   └── utils/              # logger.ts, sanitize.ts (NEW)
├── scripts/                # Python automation scripts
├── generated_images/       # 276 AI-generated historical images
└── lessons/                # TTS audio files and chunks
```

### Data Files
- `data/lessons/index.ts` - Exports `lessons` array, `getLessonById()`, `TOTAL_LESSONS`
- Individual lessons: `data/lessons/lesson-01.ts` through `lesson-51.ts`
- **Backward compatible:** `import { lessons } from '@/data/lessons'` still works

---

## WORKING WITH LESSONS

### Editing a Single Lesson
```typescript
// Edit the specific lesson file
// e.g., data/lessons/lesson-05.ts

import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  id: "lesson-5",
  title: "...",
  // ...
};

export default lesson;
```

### After Editing Lessons
1. `python scripts/historical_accuracy_checker.py` - Verify no anachronisms
2. `python scripts/export_lessons.py` - Update exports
3. `python scripts/lesson_media_generator.py` - Update media files

---

## SECURITY IMPLEMENTATION

### Completed ✅
| Feature | Location | Notes |
|---------|----------|-------|
| Secure logger | `lib/utils/logger.ts` | Environment-aware, sanitizes in production |
| Input validation | `lib/firebase/auth.ts` | Email format, password strength, name sanitization |
| XSS protection | `lib/utils/sanitize.ts` | DOMPurify-based sanitization |
| Firestore rules | `firestore.rules` | Role-based access, quiz immutability |
| Error boundary | `app/error.tsx` | Graceful error handling |

### Usage
```typescript
import { sanitizeHtml, sanitizeText, sanitizeUrl } from '@/lib/utils/sanitize';
import { logger } from '@/lib/utils/logger';

// Sanitize user input
const safeHtml = sanitizeHtml(userInput);
const safeText = sanitizeText(userInput);
const safeUrl = sanitizeUrl(userInput);

// Secure logging
logger.error('Something went wrong', error);
```

---

## TTS AUDIO GENERATION

### Current Status
- **V2 Pipeline:** Testing quality output
- **Test File:** `lessons/Survival_in_Jamestown_Zonos_V2.wav`
- **Issues Being Resolved:** Hum elimination, pause consistency

### Generation Pipeline
```bash
# In WSL
python3 generate_lesson_verified.py --lesson N    # Whisper-verified chunks
python3 process_chunks_aggressive.py --lesson N   # Noise reduction + pauses
```

### Documentation
- `TTS_GENERATION_STATUS.md` - Current session status
- `TTS_PROJECT_STATUS.md` - Overall configuration
- `TTS_VOICE_TESTING_NOTES.md` - Voice testing results

---

## IMAGE GENERATION ✅ COMPLETE

All 276 historical images generated and validated (100% success rate).

### Location
- `generated_images/batch_session_20260113_150301/keepers/` - Lessons 3-51
- `generated_images/batch_session_20260113_195255/keepers/` - Lessons 1-2

### Documentation
- `IMAGE_GENERATION_STATUS.md` - Completion status
- `HISTORICAL_IMAGE_GENERATION_PRD.md` - Full PRD with era guidelines

---

## AVAILABLE CLAUDE SKILLS

| Command | Purpose |
|---------|---------|
| `/lesson-builder` | Create new lessons |
| `/image-prompter` | Generate AI image prompts |
| `/historical-accuracy-checker` | Verify historical accuracy |
| `/generate-audio` | Create TTS audio narration |
| `/audit-content` | Check lesson completeness |
| `/git-push` | Handle git with LFS |
| `/new-course` | Create new course projects |
| `/deploy` | Production deployment |

---

## USEFUL COMMANDS

```bash
# Development
npm run dev                              # Start dev server (http://localhost:3000)
npm run build                            # Production build
npx tsc --noEmit                         # Type check only

# Firebase (requires login first)
firebase login
firebase deploy --only firestore:rules

# Git (from project root - one level up)
cd "C:\Users\scott\My-First-Project\My-First-Project"
git add -A && git commit -m "message" && git push
```

---

## KEY CONSTRAINTS

- Lessons must be historically accurate for their time period
- Narrative chapters are first-person perspective from that era
- Each lesson has a specific narrator appropriate to historical context
- 350+ term timeline database for anachronism detection

---

## DOCUMENTATION INDEX

| Document | Purpose |
|----------|---------|
| `STATUS.md` | Quick project status overview |
| `SECURITY-FIXES.md` | Security implementation guide |
| `TTS_GENERATION_STATUS.md` | TTS pipeline status |
| `IMAGE_GENERATION_STATUS.md` | Image generation completion |
| `HISTORICAL_IMAGE_GENERATION_PRD.md` | Image generation PRD |
| `scripts/SCRIPTS_DOCUMENTATION.md` | Python scripts reference |
