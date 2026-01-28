# Age of Enlightenment Course - Project Status

**Last Updated:** January 28, 2026
**Project Path:** `C:\Users\scott\My-First-Project\My-First-Project\enlightenment-course`

---

## Course Overview

**Course Title:** The Age of Enlightenment: Ideas That Shaped America

**Target Audience:** 7th-8th grade homeschool students

**Course Description:** This comprehensive course explores the major figures of the Age of Enlightenment and how their revolutionary ideas about natural rights, government, and liberty directly influenced the founding of the United States. Students learn through first-person narratives from the 17th and 18th centuries.

---

## Current Status Summary

| Component | Status | Details |
|-----------|--------|---------|
| **Lesson Content** | ✅ COMPLETE | 24 lessons, 120 chapters, 240 flashcards, 192 quiz questions |
| **TypeScript Types** | ✅ COMPLETE | Lesson, Chapter, Flashcard, QuizQuestion types defined |
| **Project Structure** | ✅ COMPLETE | Follows history-lesson-creator pattern |
| **App Components** | ✅ COMPLETE | Copied from history-lesson-creator (Jan 15) |
| **Code Quality** | ✅ COMPLETE | Bug fixes applied (Jan 28) |
| **Image Prompts** | ✅ COMPLETE | 24 hero image prompts ready for generation |
| **Hero Images** | ⏳ PENDING | Awaiting GPU availability for generation |
| **TTS Audio** | ⏳ PENDING | Narration audio not yet generated |
| **Firebase Config** | ⏳ PENDING | Requires .env.local configuration |

---

## Recent Session (January 28, 2026)

### Code Review & Bug Fixes

Performed comprehensive code review and fixed high/medium priority issues.

#### Critical Fixes (Latest)
| Issue | File | Fix |
|-------|------|-----|
| Wrong PaywallModal defaults | `components/payment/PaywallModal.tsx` | Changed default courseId from `history-for-homeschoolers` to `age-of-enlightenment` |
| Wrong LessonWithAccessControl courseId | `components/LessonWithAccessControl.tsx` | Changed courseId from `american-history-7th-grade` to `age-of-enlightenment` |
| Invalid Stripe API version | `app/api/stripe/create-checkout-session/route.ts` | Removed invalid `apiVersion: '2025-12-15.clover'` |
| Missing Stripe webhook | `app/api/stripe/webhook/route.ts` | Created webhook handler to verify payments server-side |
| Missing Firebase Admin SDK | `lib/firebase/admin.ts` | Added Firebase Admin configuration for server-side operations |

#### High Priority Fixes
| Issue | File | Fix |
|-------|------|-----|
| Flashcard mastered ID mismatch | `FlashcardDeck.tsx` | Use actual card ID instead of array index for mastered tracking |
| Firestore rules path mismatch | `firestore.rules` | Updated paths to match code (`users/{userId}/lessonProgress`, `users/{userId}/quizAttempts`) |
| Wrong course ID constants | `LessonView.tsx`, `create-checkout-session/route.ts` | Changed from `history-for-homeschoolers` to `age-of-enlightenment` |

#### Medium Priority Fixes
| Issue | File | Fix |
|-------|------|-----|
| Type inconsistency | `lib/firebase/types.ts`, `firestore.ts`, `ProgressContext.tsx` | Standardized `StoryProgressData` and `FlashcardProgressData` to always use object format |
| Missing useEffect dependencies | `FlashcardDeck.tsx`, `QuizEngine.tsx`, `StoryReader.tsx` | Added missing dependencies to avoid stale closures |
| ProgressContext efficiency | `ProgressContext.tsx` | Use `useRef` instead of `useState` for `pendingUpdates` map |

#### Files Modified
- `components/FlashcardDeck.tsx`
- `components/QuizEngine.tsx`
- `components/StoryReader.tsx`
- `components/LessonView.tsx`
- `components/LessonWithAccessControl.tsx`
- `components/payment/PaywallModal.tsx`
- `lib/contexts/ProgressContext.tsx`
- `lib/firebase/firestore.ts`
- `lib/firebase/types.ts`
- `lib/firebase/admin.ts` (NEW)
- `firestore.rules`
- `app/api/stripe/create-checkout-session/route.ts`
- `app/api/stripe/webhook/route.ts` (NEW)
- `package.json` (added firebase-admin)
- `.env.local.example` (added Firebase Admin credentials)

#### Build Status
- TypeScript compilation: ✅ Passing
- npm dependencies: ✅ 562 packages installed (added firebase-admin)

---

## Previous Session (January 15, 2026)

### App Infrastructure Copied
Copied complete app infrastructure from history-lesson-creator:

| Directory | Files | Description |
|-----------|-------|-------------|
| `app/` | 18 files | Next.js pages, layouts, API routes (Stripe, Firebase) |
| `components/` | 25 files | Auth, payment, progress, student/teacher dashboards |
| `lib/` | 17 files | Firebase, contexts, hooks, utilities, Stripe |

### Configuration Files Added
- `package.json` - Dependencies (Next.js 15, React 19, Firebase, Stripe)
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS with custom colors
- `next.config.ts` - Next.js configuration
- `firebase.json`, `firestore.rules` - Firebase configuration
- `.env.local.example` - Environment variable template

### Course Branding Updated
- App title: "Age of Enlightenment - Ideas That Shaped America"
- Navigation: "Age of Enlightenment - Ideas That Shaped America"
- Footer: Updated copyright text
- Home page: Updated hero section

### Build Status
- TypeScript compilation: ✅ Passing
- npm dependencies: ✅ Installed (469 packages)
- Full build: Requires Firebase credentials in `.env.local`

---

## Lesson Overview

### Part 1: The Philosophers (Lessons 1-5)
| # | Title | Focus | Narrator |
|---|-------|-------|----------|
| 1 | Dawn of Reason | Introduction to the Enlightenment | Sophie, Paris, 1751 |
| 2 | The Rights of Man | John Locke & Natural Rights | Thomas, London, 1689 |
| 3 | The Spirit of the Laws | Montesquieu & Separation of Powers | Henri, France, 1748 |
| 4 | The Voice of the People | Rousseau & Social Contract | Marie, Paris, 1762 |
| 5 | The Fearless Pen | Voltaire & Free Speech | Jacques, Paris, 1759 |

### Part 2: American Founders (Lessons 6-8)
| # | Title | Focus | Narrator |
|---|-------|-------|----------|
| 6 | The American Philosopher | Benjamin Franklin | William, Philadelphia, 1752 |
| 7 | Self-Evident Truths | Jefferson & Declaration | Samuel, Philadelphia, 1776 |
| 8 | A Republic, If You Can Keep It | Madison & Constitution | Catherine, Philadelphia, 1787 |

### Part 3: Revolutionary Ideas (Lessons 9-11)
| # | Title | Focus | Narrator |
|---|-------|-------|----------|
| 9 | Common Sense | Thomas Paine | Nathaniel, Philadelphia, 1776 |
| 10 | The Wealth of Nations | Adam Smith & Economics | James, Glasgow, 1776 |
| 11 | A Vindication | Mary Wollstonecraft & Women's Rights | Elizabeth, London, 1792 |

### Part 4: Building the Republic (Lessons 12-16)
| # | Title | Focus | Narrator |
|---|-------|-------|----------|
| 12 | Publius Speaks | The Federalist Papers | Daniel, New York, 1788 |
| 13 | The First Ten | The Bill of Rights | Hannah, Virginia, 1791 |
| 14 | The Atlas of Independence | John Adams | Abigail (niece), Braintree, 1800 |
| 15 | The Ambitious Vision | Alexander Hamilton | Robert, Philadelphia, 1791 |
| 16 | Voices of Caution | The Anti-Federalists | Mercy, Massachusetts, 1788 |

### Part 5: Deeper Enlightenment (Lessons 17-19)
| # | Title | Focus | Narrator |
|---|-------|-------|----------|
| 17 | What Is Enlightenment? | Immanuel Kant | Johann, Königsberg, 1784 |
| 18 | The Skeptical Scot | David Hume | Angus, Edinburgh, 1752 |
| 19 | Justice Reformed | Cesare Beccaria | Marco, Milan, 1764 |

### Part 6: Tensions and Contradictions (Lessons 20-22)
| # | Title | Focus | Narrator |
|---|-------|-------|----------|
| 20 | The Great Contradiction | Enlightenment & Slavery | James, Philadelphia, 1787 |
| 21 | The Indispensable Man | George Washington | Tobias, Mount Vernon, 1799 |
| 22 | A Wall of Separation | Church and State | Sarah, Virginia, 1786 |

### Part 7: Revolution and Legacy (Lessons 23-24)
| # | Title | Focus | Narrator |
|---|-------|-------|----------|
| 23 | Ideas Unleashed | French Revolution | Pierre, Paris, 1793 |
| 24 | The Light Endures | Enlightenment Legacy | Modern student, 2026 |

---

## Content Statistics

| Item | Count | Status |
|------|-------|--------|
| Lessons | 24 | Complete |
| Chapters | 120 | 5 per lesson |
| Flashcards | 240 | 10 per lesson |
| Quiz Questions | 192 | 8 per lesson |
| Image Prompts | 24 | Complete |

---

## Key Themes Covered

### Philosophical Foundations
- **Natural Rights** - Locke's theory of life, liberty, and property
- **Social Contract** - Government by consent of the governed
- **Separation of Powers** - Montesquieu's legislative, executive, judicial branches
- **Popular Sovereignty** - Ultimate power resides in the people
- **Freedom of Expression** - Voltaire's fight for speech and tolerance
- **Sapere Aude** - Kant's challenge to "dare to know"
- **Philosophical Skepticism** - Hume's questioning of knowledge claims

### Criminal Justice Reform
- **Opposition to Torture** - Beccaria's rational critique
- **Proportional Punishment** - Punishment fitting the crime
- **Eighth Amendment** - Constitutional protection from cruelty

### Economic Ideas
- **Free Markets** - Adam Smith's invisible hand and division of labor
- **Limited Government** - Restraint on economic intervention

### Women's Rights
- **Rational Education** - Wollstonecraft's demand for women's equality
- **Natural Rights for All** - Extending Enlightenment principles to women

### American Application
- **Declaration of Independence** - Jefferson's synthesis of Enlightenment ideals
- **Constitution** - Madison's practical application of theory
- **Federalist Papers** - Explaining constitutional design
- **Bill of Rights** - Securing individual liberties
- **Federalist vs. Anti-Federalist** - The debate over government power
- **Religious Freedom** - Jefferson's wall of separation
- **Republican Virtue** - Washington's leadership by example

### Critical Examination
- **Slavery Contradiction** - Founders who proclaimed equality while enslaving
- **French Revolution** - When Enlightenment ideas lacked restraint
- **Unfinished Work** - Extending principles to more people over time

---

## File Structure

```
enlightenment-course/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes (Stripe, Firebase)
│   ├── dashboard/                # Dashboard page
│   ├── lesson/[id]/              # Dynamic lesson pages
│   ├── student/                  # Student dashboard
│   ├── teacher/                  # Teacher dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── auth/                     # Authentication (AuthModal, EmailSignIn, Google)
│   ├── payment/                  # Payment (PaywallModal, PurchaseButton)
│   ├── progress/                 # Progress tracking (ProgressBar, Badge)
│   ├── student/                  # Student dashboard components
│   ├── teacher/                  # Teacher dashboard components
│   ├── FlashcardDeck.tsx         # Flashcard UI
│   ├── QuizEngine.tsx            # Quiz interface
│   ├── LessonView.tsx            # Lesson display
│   ├── Navigation.tsx            # Nav bar
│   └── Footer.tsx                # Footer
├── data/
│   └── lessons/
│       ├── index.ts              # Exports all 24 lessons
│       └── lesson-XX.ts          # Individual lesson files (1-24)
├── lib/
│   ├── firebase/                 # Firebase config, auth, firestore
│   ├── contexts/                 # AuthContext, ProgressContext
│   ├── hooks/                    # useAuth, useProgress, useTrialStatus
│   ├── stripe/                   # Stripe configuration
│   ├── utils/                    # logger, sanitize, accessControl
│   └── types.ts                  # TypeScript type definitions
├── public/
│   └── images/                   # Hero images (to be generated)
├── prompts_export/
│   └── hero_prompts.txt          # Clean prompts for batch processing
├── .env.local.example            # Environment variable template
├── firebase.json                 # Firebase CLI config
├── firestore.rules               # Firestore security rules
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── STATUS.md                     # This file
├── CLAUDE.md                     # Claude instructions
└── IMAGE_PROMPTS.md              # Hero image prompts (all 24)
```

---

## Pending Actions

### 1. Configure Firebase (Required for Build)
```bash
# Copy example and add your Firebase credentials
cp .env.local.example .env.local
# Edit .env.local with Firebase project settings
```

### 2. Generate Hero Images
- 24 prompts ready in `IMAGE_PROMPTS.md` and `prompts_export/hero_prompts.txt`
- Use same pipeline as history-lesson-creator
- Resolution: 1344x768 (16:9 landscape)
- Model: Flux.2 Dev recommended

### 3. Generate TTS Audio
- Use same pipeline as history-lesson-creator
- Generate narration for all 120 chapters
- Consider using Zonos V2 pipeline once tested

### 4. Deploy Firebase Rules
```bash
firebase login
firebase deploy --only firestore:rules
```

---

## Development Commands

```bash
# Navigate to project
cd "C:\Users\scott\My-First-Project\My-First-Project\enlightenment-course"

# Install dependencies (already done)
npm install

# Development server
npm run dev

# Production build (requires .env.local)
npm run build

# Type check
npx tsc --noEmit
```

---

## Connection to American History Course

This course is designed as a companion to the "History for Homeschoolers" American history course. While that course covers events chronologically (1565-1920), this course focuses on the philosophical ideas that shaped American founding principles.

**Recommended Sequence:**
1. Take Enlightenment course first (or concurrently with early American history lessons)
2. Cross-reference when Declaration and Constitution are covered in American history

**Cross-References:**
- Lesson 7 (Jefferson/Declaration) connects to American History's founding documents
- Lesson 8 (Madison/Constitution) provides philosophical context for constitutional topics
- Lessons 14-16 (Adams, Hamilton, Anti-Federalists) illuminate early republic tensions
- Lesson 20 (Slavery Contradiction) provides context for civil war era
- Lesson 21 (Washington) expands on founding leadership

---

*Course created January 14, 2026*
*App infrastructure added January 15, 2026*
*Bug fixes applied January 28, 2026*
