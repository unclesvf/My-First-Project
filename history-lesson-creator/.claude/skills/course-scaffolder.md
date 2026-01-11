# Course Scaffolder Skill

## Description
Create a new educational course from scratch with proper project structure, configuration, and initial content templates. Sets up Next.js, Firebase, Stripe, and all required infrastructure.

## Usage
User can invoke this skill by saying:
- "create a new course"
- "scaffold a course about [subject]"
- "set up a new educational project"
- "/new-course"

## Instructions

You are helping create a brand new educational course project. Follow these steps:

### Step 1: Gather Course Information

Ask the user for:

1. **Course Subject**
   - What subject? (math, science, language arts, etc.)
   - What specific topic? (e.g., "Ancient Civilizations", "Algebra Basics")

2. **Target Audience**
   - Grade level(s)
   - Homeschool, classroom, or both?

3. **Course Structure**
   - How many lessons planned?
   - Lesson groupings/units?

4. **Project Name**
   - Suggested: `[subject]-lesson-creator`
   - e.g., `math-lesson-creator`, `science-lesson-creator`

5. **Pricing Model**
   - Free lessons count (default: 8)
   - Full course price (default: $19.99)
   - Trial period (default: 7 days)

### Step 2: Create Project Structure

```
[project-name]/
├── app/
│   ├── page.tsx                    # Home - lesson list
│   ├── layout.tsx                  # Root layout + providers
│   ├── globals.css                 # Global styles
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard wrapper
│   │   └── page.tsx                # Student dashboard
│   ├── lesson/
│   │   └── [id]/
│   │       └── page.tsx            # Lesson view
│   ├── purchase-success/
│   │   └── page.tsx                # Stripe success
│   ├── purchase-cancel/
│   │   └── page.tsx                # Stripe cancel
│   └── api/
│       └── stripe/
│           ├── create-checkout/
│           │   └── route.ts        # Checkout API
│           └── webhook/
│               └── route.ts        # Webhook handler
├── components/
│   ├── LessonView.tsx              # Main lesson component
│   ├── LessonWithAccessControl.tsx # Access wrapper
│   ├── StoryReader.tsx             # Story mode
│   ├── FlashcardDeck.tsx           # Flashcard mode
│   ├── QuizEngine.tsx              # Quiz mode
│   ├── Navigation.tsx              # Header nav
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignUpForm.tsx
│   │   └── AuthGuard.tsx
│   └── payment/
│       ├── PaywallModal.tsx
│       └── PurchaseButton.tsx
├── data/
│   └── lessons.ts                  # Lesson content
├── lib/
│   ├── types.ts                    # TypeScript types
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── ProgressContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProgress.ts
│   │   └── useTrialStatus.ts
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── auth.ts
│   │   └── firestore.ts
│   ├── stripe/
│   │   ├── config.ts
│   │   └── checkout.ts
│   └── utils/
│       └── accessControl.ts
├── public/
│   └── images/
│       └── hero-[lesson].jpg       # Hero images
├── .claude/
│   └── skills/                     # Claude skills
├── .env.local.example              # Environment template
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── CLAUDE_INSTRUCTIONS.md
└── SESSION_STATUS.md
```

### Step 3: Initialize Project

```bash
# Create Next.js project
npx create-next-app@latest [project-name] --typescript --tailwind --eslint --app

cd [project-name]

# Install dependencies
npm install firebase stripe @stripe/stripe-js
npm install -D @types/node
```

### Step 4: Configure Environment

Create `.env.local.example`:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Course Settings
NEXT_PUBLIC_COURSE_PRICE=1999
NEXT_PUBLIC_FREE_LESSONS_COUNT=8
NEXT_PUBLIC_TRIAL_DAYS=7
```

### Step 5: Create Type Definitions

`lib/types.ts`:
```typescript
export interface Chapter {
  title: string;
  content: string;
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Lesson {
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
}

export interface UserProfile {
  email: string;
  displayName?: string;
  createdAt: Date;
  courseAccess?: {
    hasPurchased: boolean;
    purchaseDate?: Date;
    trialStartDate?: Date;
  };
  progress?: {
    [lessonId: string]: {
      completed: boolean;
      quizScore?: number;
    };
  };
}
```

### Step 6: Create Initial Lesson Template

`data/lessons.ts`:
```typescript
import { Lesson } from '@/lib/types';

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Introduction to [Subject]",
    description: "Begin your journey learning about [topic].",
    heroImage: "/images/hero-lesson-1.jpg",
    story: {
      narrator: "[Narrator Name], [role], [year]",
      chapters: [
        {
          title: "Chapter 1: Getting Started",
          content: `[Your story content here. Write from the narrator's perspective...]`
        },
        // Add 4-5 more chapters
      ],
    },
    flashcards: [
      {
        id: "fc-1",
        term: "[Term]",
        definition: "[Definition]"
      },
      // Add 10-12 flashcards
    ],
    quiz: [
      {
        id: "q-1",
        question: "[Question text]",
        options: [
          "[Correct answer]",
          "[Wrong answer 1]",
          "[Wrong answer 2]",
          "[Wrong answer 3]"
        ],
        correctOptionIndex: 0,
        explanation: "[Why this answer is correct]"
      },
      // Add exactly 8 questions
    ],
  },
];
```

### Step 7: Copy Core Components

Copy these components from the reference project (history-lesson-creator):

**Required Components:**
- `components/LessonView.tsx`
- `components/LessonWithAccessControl.tsx`
- `components/StoryReader.tsx`
- `components/FlashcardDeck.tsx`
- `components/QuizEngine.tsx`
- `components/Navigation.tsx`

**Auth Components:**
- `components/auth/LoginForm.tsx`
- `components/auth/SignUpForm.tsx`

**Payment Components:**
- `components/payment/PaywallModal.tsx`
- `components/payment/PurchaseButton.tsx`

**Libraries:**
- `lib/contexts/AuthContext.tsx`
- `lib/contexts/ProgressContext.tsx`
- `lib/firebase/config.ts`
- `lib/stripe/checkout.ts`
- `lib/utils/accessControl.ts`

### Step 8: Customize for Subject

Update these files for the new subject:

1. **Navigation.tsx** - Change course name
2. **page.tsx (home)** - Update hero text, descriptions
3. **lesson/[id]/page.tsx** - Subject-specific styling
4. **globals.css** - Color scheme for subject
5. **tailwind.config.ts** - Brand colors

### Step 9: Set Up Firebase Project

1. Go to https://console.firebase.google.com
2. Create new project: `[subject]-for-homeschoolers`
3. Enable Authentication:
   - Email/Password
   - Google Sign-In
4. Create Firestore database
5. Copy config to `.env.local`

### Step 10: Set Up Stripe Product

1. Go to https://dashboard.stripe.com
2. Create new product:
   - Name: "[Subject] for Homeschoolers - Full Course"
   - Price: $19.99 (or custom)
3. Copy keys to `.env.local`

### Step 11: Create Claude Skills

Copy skills from reference project and update for new subject:
- `lesson-builder.md`
- `content-auditor.md`
- `image-prompter.md`
- `historical-accuracy-checker.md` (rename for subject)

### Step 12: Verification Checklist

Before considering complete:

- [ ] `npm run dev` starts without errors
- [ ] Home page shows lesson list
- [ ] Lesson pages load and display modes work
- [ ] Authentication works (Firebase configured)
- [ ] Payment flow works (Stripe configured)
- [ ] Dev bypass enabled for testing
- [ ] At least 1 complete lesson as template
- [ ] All Claude skills copied and updated
- [ ] SESSION_STATUS.md created
- [ ] CLAUDE_INSTRUCTIONS.md created

## Reference Project

Copy from: `C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator`

This project has all working implementations of:
- Next.js 14 App Router
- Firebase Auth + Firestore
- Stripe Checkout
- Three lesson modes (Story, Flashcard, Quiz)
- Access control (free/paid/trial)
- Progress tracking
- Claude skills

## Example Interaction

**User:** "Create a new course about math for 4th graders"

**Assistant:** I'll help you scaffold a new math course for 4th graders.

**Questions:**
1. What specific math topics? (fractions, multiplication, geometry, etc.)
2. How many lessons are you planning?
3. What should the project be called?

**User:** "Fractions, about 30 lessons, call it fraction-mastery"

**Assistant:** I'll create a new course project:
- Project: `fraction-mastery`
- Subject: 4th Grade Fractions
- Target: 30 lessons
- Free lessons: 8
- Price: $19.99

Creating project structure...

*[Creates directories and files]*

**Created:**
- /fraction-mastery (project root)
- 15 core components
- Type definitions
- 1 template lesson
- Firebase config templates
- Stripe config templates
- Claude skills

**Next steps:**
1. Set up Firebase project
2. Set up Stripe product
3. Fill in .env.local
4. Create lesson content

Would you like me to walk through Firebase setup?

## Technical Notes

- Based on Next.js 14 App Router
- Uses TypeScript for type safety
- Tailwind CSS for styling
- Firebase for auth and data
- Stripe for payments
- Supports Git LFS for large files

## Success Metrics

A successfully scaffolded course:
- Runs without errors (`npm run dev`)
- Has all required components
- Includes at least 1 template lesson
- Has working auth flow (with config)
- Has working payment flow (with config)
- Includes Claude skills for development
- Has documentation files
