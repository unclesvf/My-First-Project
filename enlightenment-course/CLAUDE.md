# Claude Instructions for Age of Enlightenment Course

## QUICK CONTEXT

**Last Updated:** January 28, 2026 (Evening)
**Course:** Age of Enlightenment: Ideas That Shaped America
**Target Audience:** 7th-8th grade homeschool students
**Stack:** Next.js 15, React 19, TypeScript, Firebase Auth, Stripe, Tailwind CSS
**Live URL:** https://enlightenment-course.vercel.app

### Current State
- ✅ **Deployed:** Live on Vercel with auto-deploy from GitHub
- ✅ **Lesson Content:** 24 lessons complete with chapters, flashcards, quizzes
- ✅ **Image Prompts:** All 24 hero image prompts ready in IMAGE_PROMPTS.md
- ✅ **Firebase:** Auth, Firestore, Admin SDK all configured
- ✅ **Stripe:** Webhook, checkout, per-course access working
- ✅ **7-Day Trial:** Free trial flow working (no credit card required)
- ✅ **Per-Course Access:** Separate access for each course
- ✅ **TypeScript:** Compilation passing
- ⏳ **Hero Images:** Awaiting GPU availability for generation
- ⏳ **TTS Audio:** Not yet generated

---

## RECENT SESSION SUMMARY (January 28, 2026 - Evening)

### Deployment & Payment Integration

Deployed to Vercel and implemented full payment/trial system.

#### Vercel Deployment
- **Live URL:** https://enlightenment-course.vercel.app
- **Auto-deploy:** Pushes to `main` branch auto-deploy
- **Environment Variables:** Firebase and Stripe keys configured

#### Per-Course Access System
Changed from single `courseAccess` object to `Record<string, CourseAccess>` so each course has separate access tracking.

```typescript
// Old: courseAccess: CourseAccess
// New: courseAccess: Record<string, CourseAccess>

// Stripe products:
// History: price_1SnuHk3jSTlaKj8QA3W4W1Ba
// Enlightenment: price_1Sujbp3jSTlaKj8QxBEZTzy7
```

#### Stripe Webhook
- Endpoint: `/api/stripe/webhook`
- Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- Uses `COURSE_CONFIG` to map price IDs to course IDs

#### User Roles
Added "Homeschooler / Independent Learner" role option:
- **Teacher** - Manages students
- **Homeschooler** - Independent learning (no teacher required)
- **Student** - Linked to a teacher

#### Key Files Changed
- `lib/firebase/types.ts` - Per-course access types, COURSE_CONFIG
- `lib/firebase/firestore.ts` - updateCourseAccess function
- `lib/firebase/trial.ts` - Course-specific trial management
- `lib/utils/accessControl.ts` - Course-aware access checks
- `lib/hooks/useTrialStatus.ts` - Course-specific trial status
- `components/auth/RoleSelectionModal.tsx` - Added learner role
- `components/LessonWithAccessControl.tsx` - Fixed blank page on paywall skip
- `app/api/stripe/webhook/route.ts` - Per-course purchase handling
- `firestore.rules` - Updated for courseAccess and role updates

---

## EARLIER SESSION SUMMARY (January 28, 2026 - Morning)

### Code Review & Bug Fixes

Performed comprehensive code review and fixed high/medium priority issues.

#### High Priority Fixes
1. **FlashcardDeck mastered ID mismatch** - Changed from using array index to actual card ID for mastered tracking, so mastered state survives shuffling
2. **Firestore rules path mismatch** - Updated paths to match code (`users/{userId}/lessonProgress` and `users/{userId}/quizAttempts`)
3. **Wrong course ID constants** - Changed from `history-for-homeschoolers` to `age-of-enlightenment` in LessonView and Stripe checkout API

#### Medium Priority Fixes
1. **Type inconsistency** - Standardized `StoryProgressData` and `FlashcardProgressData` to always use object format; added normalization helpers for legacy data
2. **Missing useEffect dependencies** - Added `updateFlashcardProgress`, `saveQuizAttempt`, and `updateStoryProgress` to respective dependency arrays
3. **ProgressContext efficiency** - Changed from `useState<Map>` to `useRef<Map>` for pendingUpdates to avoid unnecessary re-renders

#### Files Modified
- `components/FlashcardDeck.tsx`
- `components/QuizEngine.tsx`
- `components/StoryReader.tsx`
- `components/LessonView.tsx`
- `lib/contexts/ProgressContext.tsx`
- `lib/firebase/firestore.ts`
- `lib/firebase/types.ts`
- `firestore.rules`
- `app/api/stripe/create-checkout-session/route.ts`

---

## PREVIOUS SESSION SUMMARY (January 15, 2026)

### Tasks Completed
1. **Lessons 23-24 Created** - French Revolution and Enlightenment Legacy lessons added
2. **Image Prompts 17-24** - Generated hero image prompts for remaining lessons
3. **App Infrastructure Copied** - Complete app from history-lesson-creator:
   - `app/` - 18 files (Next.js pages, layouts, API routes)
   - `components/` - 25 files (Auth, payment, progress, dashboards)
   - `lib/` - 17 files (Firebase, contexts, hooks, utilities)

### Configuration Files Added
- `package.json` - Dependencies (Next.js 15, React 19, Firebase, Stripe)
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS with custom colors
- `next.config.ts` - Next.js configuration
- `firebase.json`, `firestore.rules` - Firebase configuration
- `.env.local.example` - Environment variable template

### Course Branding Applied
- App title: "Age of Enlightenment - Ideas That Shaped America"
- Navigation updated with new branding
- Footer updated with course description
- Home page hero section customized

### Build Status
- TypeScript compilation: ✅ Passing
- npm dependencies: ✅ Installed (469 packages)
- Full build: Requires Firebase credentials in `.env.local`

---

## COURSE STRUCTURE

### Lesson Format
Each lesson follows the same structure as history-lesson-creator:
- **Narrator:** First-person perspective from a young person of the era
- **Chapters:** 5 chapters telling the story
- **Flashcards:** 10 key terms and concepts
- **Quiz:** 8 multiple-choice questions with explanations

### Content Organization

**Part 1: The Philosophers (Lessons 1-5)**
- Introduction to Enlightenment
- Locke, Montesquieu, Rousseau, Voltaire

**Part 2: American Founders (Lessons 6-8)**
- Franklin, Jefferson, Madison

**Part 3: Revolutionary Ideas (Lessons 9-11)**
- Paine, Adam Smith, Wollstonecraft

**Part 4: Building the Republic (Lessons 12-16)**
- Federalist Papers, Bill of Rights, Adams, Hamilton, Anti-Federalists

**Part 5: Deeper Enlightenment (Lessons 17-19)**
- Kant, Hume, Beccaria

**Part 6: Tensions and Contradictions (Lessons 20-22)**
- Slavery Contradiction, Washington, Church and State

**Part 7: Revolution and Legacy (Lessons 23-24)**
- French Revolution, Enlightenment Legacy

---

## LESSON OVERVIEW

| # | Title | Focus |
|---|-------|-------|
| 1 | Dawn of Reason | Introduction to Enlightenment |
| 2 | The Rights of Man | John Locke - Natural Rights |
| 3 | The Spirit of the Laws | Montesquieu - Separation of Powers |
| 4 | The Voice of the People | Rousseau - Social Contract |
| 5 | The Fearless Pen | Voltaire - Free Speech & Tolerance |
| 6 | The American Philosopher | Benjamin Franklin |
| 7 | Self-Evident Truths | Jefferson & Declaration |
| 8 | A Republic, If You Can Keep It | Madison & Constitution |
| 9 | Common Sense | Thomas Paine |
| 10 | The Wealth of Nations | Adam Smith & Economics |
| 11 | A Vindication | Mary Wollstonecraft & Women's Rights |
| 12 | Publius Speaks | The Federalist Papers |
| 13 | The First Ten | The Bill of Rights |
| 14 | The Atlas of Independence | John Adams |
| 15 | The Ambitious Vision | Alexander Hamilton |
| 16 | Voices of Caution | The Anti-Federalists |
| 17 | What Is Enlightenment? | Immanuel Kant |
| 18 | The Skeptical Scot | David Hume |
| 19 | Justice Reformed | Cesare Beccaria |
| 20 | The Great Contradiction | Enlightenment & Slavery |
| 21 | The Indispensable Man | George Washington |
| 22 | A Wall of Separation | Church and State |
| 23 | Ideas Unleashed | French Revolution |
| 24 | The Light Endures | Enlightenment Legacy |

---

## KEY CONCEPTS BY LESSON

### Lesson 1: Age of Enlightenment
- What was the Enlightenment / Age of Reason
- Philosophes and salons
- Encyclopédie
- Sapere aude ("Dare to know")

### Lesson 2: John Locke
- Natural rights (life, liberty, property)
- State of nature
- Social contract
- Consent of the governed
- Right of revolution

### Lesson 3: Montesquieu
- Separation of powers
- Legislative, executive, judicial branches
- Checks and balances
- Tyranny prevention

### Lesson 4: Rousseau
- "Man is born free, and everywhere he is in chains"
- General will
- Popular sovereignty
- Civil liberty

### Lesson 5: Voltaire
- Freedom of speech
- Religious tolerance
- Écrasez l'infâme
- Jean Calas affair

### Lesson 6: Benjamin Franklin
- American Enlightenment
- Scientific method & experimentation
- Civic virtue
- Practical philosophy

### Lesson 7: Thomas Jefferson
- Declaration of Independence
- Self-evident truths
- Unalienable rights
- Life, liberty, pursuit of happiness

### Lesson 8: James Madison
- Constitutional Convention
- Three branches
- Checks and balances
- "A republic, if you can keep it"
- Bill of Rights

### Lesson 9: Thomas Paine
- Common Sense
- Plain language advocacy
- "The law is king"
- Asylum for mankind

### Lesson 10: Adam Smith
- Wealth of Nations
- Invisible hand
- Division of labor
- Free markets vs. mercantilism

### Lesson 11: Mary Wollstonecraft
- Vindication of the Rights of Woman
- Rational education for women
- Enlightenment feminism
- Independence and virtue

### Lesson 12: The Federalist Papers
- Publius (Hamilton, Madison, Jay)
- Federalist No. 10 (factions)
- Federalist No. 51 (ambition counteracting ambition)
- Defense of the Constitution

### Lesson 13: Bill of Rights
- First Amendment freedoms
- Fourth Amendment protections
- Fifth Amendment rights
- Ninth and Tenth Amendments

### Lesson 14: John Adams
- Boston Massacre defense
- Thoughts on Government
- Massachusetts Constitution
- Peaceful transfer of power

### Lesson 15: Alexander Hamilton
- Financial system creation
- Bank of the United States
- Implied powers doctrine
- Loose vs. strict construction

### Lesson 16: Anti-Federalists
- Opposition to Constitution
- Small republic theory
- Demand for Bill of Rights
- Loyal opposition tradition

### Lesson 17: Immanuel Kant
- "What Is Enlightenment?" essay
- Sapere aude - "Dare to know"
- Minority vs. maturity of mind
- Public use of reason
- Categorical imperative

### Lesson 18: David Hume
- Scottish Enlightenment
- Philosophical skepticism
- Problem of causation
- Reason as passion's slave
- Proportioning belief to evidence

### Lesson 19: Cesare Beccaria
- On Crimes and Punishments
- Opposition to torture
- Proportionality of punishment
- Certainty over severity
- Eighth Amendment influence

### Lesson 20: Enlightenment & Slavery
- The great contradiction
- Jefferson's paradox
- Three-Fifths Clause
- Fugitive Slave Clause
- Frederick Douglass interpretation

### Lesson 21: George Washington
- Newburgh Conspiracy
- Resignation of commission
- Two-term tradition
- Farewell Address warnings
- Republican virtue

### Lesson 22: Church and State
- Virginia Statute for Religious Freedom
- Establishment Clause
- Free Exercise Clause
- Wall of separation
- Religious pluralism

### Lesson 23: French Revolution
- Reign of Terror
- Robespierre and "virtue and terror"
- Misuse of general will
- Enlightenment without restraint
- American vs. French Revolution

### Lesson 24: Enlightenment Legacy
- Enduring principles
- Unfinished work
- Threats to liberty
- Educated citizenry
- Carrying the torch

---

## WORKING WITH LESSONS

### Adding New Lessons
1. Create `data/lessons/lesson-XX.ts` following existing pattern
2. Add import/export to `data/lessons/index.ts`
3. Update `TOTAL_LESSONS` constant
4. Update STATUS.md

### Lesson TypeScript Structure
```typescript
import { Lesson } from "@/lib/types";

const lesson: Lesson = {
  id: "lesson-N",
  title: "Title",
  description: "Description",
  heroImage: "/images/hero-xxx.jpg",
  story: {
    narrator: "Name, age, context, year",
    chapters: [
      { title: "Chapter Title", content: "Multi-paragraph content..." },
      // 5 chapters
    ]
  },
  flashcards: [
    { id: "fc-1", term: "Term", definition: "Definition" },
    // 10 flashcards
  ],
  quiz: [
    {
      id: "q-1",
      question: "Question?",
      options: ["A", "B", "C", "D"],
      correctOptionIndex: 0,
      explanation: "Explanation..."
    },
    // 8 quiz questions
  ]
};

export default lesson;
```

---

## HISTORICAL ACCURACY NOTES

### Philosopher Timeline
- John Locke: 1632-1704 (Two Treatises published 1689)
- Montesquieu: 1689-1755 (Spirit of the Laws published 1748)
- Voltaire: 1694-1778 (Candide published 1759)
- Rousseau: 1712-1778 (Social Contract published 1762)
- David Hume: 1711-1776 (Treatise published 1739)
- Immanuel Kant: 1724-1804 (What Is Enlightenment? published 1784)
- Cesare Beccaria: 1738-1794 (On Crimes and Punishments published 1764)
- Adam Smith: 1723-1790 (Wealth of Nations published 1776)
- Mary Wollstonecraft: 1759-1797 (Vindication published 1792)

### American Founders Timeline
- Benjamin Franklin: 1706-1790
- John Adams: 1735-1826
- Thomas Jefferson: 1743-1826
- James Madison: 1751-1836
- Alexander Hamilton: 1755-1804
- Thomas Paine: 1737-1809
- George Washington: 1732-1799

### Key Events
- Glorious Revolution: 1688
- Publication of Two Treatises: 1689
- Franklin's lightning experiment: 1752
- Publication of Encyclopédie: 1751-1772
- Publication of Social Contract: 1762
- Publication of On Crimes and Punishments: 1764
- Publication of Wealth of Nations: 1776
- Declaration of Independence: July 4, 1776
- Constitutional Convention: May-September 1787
- Virginia Statute for Religious Freedom: 1786
- The Federalist Papers: 1787-1788
- Ratification of Constitution: 1788
- French Revolution begins: 1789
- Bill of Rights ratified: 1791
- Vindication of Rights of Woman: 1792
- Reign of Terror: 1793-1794
- Washington's Farewell Address: 1796
- Death of Washington: 1799

---

## KEY FILE LOCATIONS

| Purpose | Location |
|---------|----------|
| Lesson Data | `data/lessons/*.ts` |
| Lesson Index | `data/lessons/index.ts` |
| Type Definitions | `lib/types.ts` |
| Project Status | `STATUS.md` |
| Claude Instructions | `CLAUDE.md` |
| Image Prompts | `IMAGE_PROMPTS.md` |

---

## PENDING ACTIONS

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
- Generate narration for all 120 chapters (5 per lesson × 24 lessons)

### 4. Deploy Firebase Rules
```bash
firebase login
firebase deploy --only firestore:rules
```

---

## FILE STRUCTURE

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
├── STATUS.md                     # Project status
├── CLAUDE.md                     # This file
└── IMAGE_PROMPTS.md              # Hero image prompts (all 24)
```

---

## DEVELOPMENT COMMANDS

```bash
# Navigate to project
cd "C:\Users\scott\My-First-Project\My-First-Project\enlightenment-course"

# Install dependencies (already done)
npm install

# Development server
npm run dev

# Production build (requires .env.local)
npm run build

# Type check only
npx tsc --noEmit

# Firebase deployment (requires login)
firebase login
firebase deploy --only firestore:rules
```

---

## CONNECTION TO AMERICAN HISTORY COURSE

This course is designed as a companion to the "History for Homeschoolers" American history course.

**Reference Project:**
`C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator`

**Cross-References:**
- Lesson 7 (Jefferson/Declaration) connects to American History's founding documents
- Lesson 8 (Madison/Constitution) provides philosophical context
- Lessons 14-16 (Adams, Hamilton, Anti-Federalists) illuminate early republic tensions
- Lesson 20 (Slavery Contradiction) provides context for civil war era

---

*Course created January 14, 2026*
*App infrastructure added January 15, 2026*
*Bug fixes applied January 28, 2026*
