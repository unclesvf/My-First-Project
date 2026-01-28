# History for Homeschoolers - Session Status

**Last Updated:** January 28, 2026
**Project Path:** `C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator`
**Git Root:** `C:\Users\scott\My-First-Project\My-First-Project` (one level up!)

---

## IMPORTANT: Read First

**For Git/LFS instructions, see:** `CLAUDE_INSTRUCTIONS.md`

---

## Quick Start

```bash
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator"
npm run dev
# Opens at http://localhost:3000
```

---

## Current State: FULLY FUNCTIONAL

### Content Status
| Item | Count | Status |
|------|-------|--------|
| Lessons | 51 (50 + 1 bonus) | Complete |
| Chapters | 260 total | All lessons have 5+ chapters |
| Flashcards | 512 total | All lessons have 10+ flashcards |
| Quiz Questions | 408 total | All lessons have 8 questions |

### Build Status: PASSING
- `npm run build` - Success
- `npm run dev` - Working

---

## Configuration

### Firebase (Configured)
- Project: `history-for-homeschoolers`
- Auth: Email/password and Google sign-in enabled
- Firestore: Set up (security rules need updating for write access)
- Config location: `.env.local`

### Stripe (Configured - January 2026)
- **Mode:** Live keys configured
- **Publishable Key:** `pk_live_51SntEb3jSTlaKj8Q...`
- **Secret Key:** `sk_live_51SntEb3jSTlaKj8Q...`
- **Price ID:** `price_1SnuHk3jSTlaKj8QA3W4W1Ba`
- **Product ID:** `prod_TlRAHwtKeDo3IN`
- **Course Price:** $19.99 (1999 cents)
- **Webhook Secret:** Not yet configured (optional)

### Environment Variables (.env.local)
```
# Firebase - configured
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=history-for-homeschoolers.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=history-for-homeschoolers
...

# Stripe - configured
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_1SnuHk3jSTlaKj8QA3W4W1Ba

# Course settings
NEXT_PUBLIC_COURSE_PRICE=1999
NEXT_PUBLIC_FREE_LESSONS_COUNT=8
NEXT_PUBLIC_TRIAL_DAYS=7
```

---

## Development Mode Features

### Dev Bypass (Enabled)
In development (`npm run dev`), the following bypasses are active:
- **Paywall bypassed** - All lessons accessible without payment
- **Auth loading skipped** - Lessons load immediately without waiting for Firebase auth
- **Progress saves to localStorage** - Quiz scores persist without Firestore/auth

Files with dev bypass:
- `lib/hooks/useTrialStatus.ts` - `DEV_BYPASS_PAYWALL`
- `lib/utils/accessControl.ts` - `DEV_BYPASS_PAYWALL`
- `components/LessonWithAccessControl.tsx` - `DEV_BYPASS`
- `lib/contexts/ProgressContext.tsx` - `DEV_MODE` localStorage fallback
- `components/QuizEngine.tsx` - `DEV_MODE` allows saving without user

### Test Access Page
- URL: `http://localhost:3000/test-access`
- Shows current user info and access status
- Button to grant test access (blocked by Firestore rules currently)

---

## Claude Code Skills (8 Total)

Custom skills for development assistance. See `CLAUDE_INSTRUCTIONS.md` for full details.

### Content Creation
| Skill | Command | Purpose |
|-------|---------|---------|
| Lesson Builder | `/lesson-builder` | Create new lessons |
| Image Prompter | `/image-prompter` | Generate AI image prompts |
| Historical Accuracy Checker | `/historical-accuracy-checker` | Verify historical accuracy |
| TTS Audio Generator | `/generate-audio` | Create audio narration |

### Development
| Skill | Command | Purpose |
|-------|---------|---------|
| Content Auditor | `/audit-content` | Check lesson completeness |
| Git/LFS Handler | `/git-push` | Handle git with LFS |
| Course Scaffolder | `/new-course` | Create new course projects |
| Build & Deploy | `/deploy` | Production deployment |

Skill files: `.claude/skills/*.md`

---

## Known Issues

### 1. Firestore Permission Errors
**Status:** Non-blocking, can be ignored for now
**Symptom:** Console shows "Missing or insufficient permissions"
**Cause:** Firestore security rules don't allow users to update their own `courseAccess` field
**Impact:** Progress tracking doesn't save to cloud in dev mode
**Fix:** Update Firestore security rules in Firebase Console

### 2. Next.js Lockfile Warning
**Status:** Cosmetic warning only
**Symptom:** Warning about multiple lockfiles
**Cause:** Extra `package-lock.json` in `C:\Users\scott\`
**Impact:** None - app works fine

---

## Key Files & Structure

```
history-lesson-creator/
├── app/
│   ├── page.tsx                 # Home page - lesson list
│   ├── layout.tsx               # Root layout with AuthProvider
│   ├── dashboard/
│   │   ├── layout.tsx           # ProgressProvider wrapper
│   │   └── page.tsx             # Student dashboard
│   ├── lesson/[id]/page.tsx     # Individual lesson view
│   ├── purchase-success/        # Stripe success page
│   ├── purchase-cancel/         # Stripe cancel page
│   ├── test-access/             # Dev testing page
│   └── api/
│       ├── grant-test-access/   # Dev-only access granting
│       └── stripe/              # Stripe checkout & webhooks
├── components/
│   ├── LessonWithAccessControl.tsx  # Access control wrapper
│   ├── LessonView.tsx           # Main lesson UI
│   ├── StoryReader.tsx          # Story mode
│   ├── FlashcardDeck.tsx        # Flashcard mode
│   ├── QuizEngine.tsx           # Quiz mode
│   ├── Navigation.tsx           # Header nav
│   ├── auth/                    # Auth components
│   └── payment/                 # Stripe/paywall components
├── data/
│   └── lessons.ts               # All 51 lessons content
├── lib/
│   ├── contexts/                # React contexts (Auth, Progress)
│   ├── hooks/                   # Custom hooks
│   ├── firebase/                # Firebase config & functions
│   ├── stripe/                  # Stripe config & checkout
│   └── utils/                   # Utility functions
├── .env.local                   # Environment variables (DO NOT COMMIT)
├── PROGRESS_STATUS.md           # Detailed progress tracking
└── SESSION_STATUS.md            # This file
```

---

## Access Control Logic

### Free vs Premium Lessons
- **Lessons 1-8:** Free for everyone
- **Lessons 9-51:** Require purchase or trial

### User States
1. **Not logged in** - Can view lessons 1-8
2. **Logged in, free tier** - Can view lessons 1-8
3. **On trial** - Full access for 7 days
4. **Purchased** - Full access forever

### Dev Mode
- All access checks bypassed
- All lessons accessible immediately

---

## Recent Changes (January 2026)

### January 28, 2026
1. Fixed flashcard mastery tracking to use stable card IDs and migrated legacy index saves
2. Hardened progress debouncing with ref-backed timers to avoid stale updates
3. Lesson access control now uses explicit lesson numbers (no dependency on ID format)
4. Quiz engine guards empty question sets and avoids NaN percentages
5. Role selection modal is dismissible with a per-user "not now" flag
6. Dashboard now redirects by role to `/student` or `/teacher`
7. UI updates: access badges on lesson cards, sticky lesson tabs, review links in quiz history
8. Trial banner no longer overlaps nav (sticky), export page confirms mass downloads and supports copy summary
9. Mojibake cleanup across UI text labels
10. `npm run build` passes clean; React Hook warnings resolved and `outputFileTracingRoot` set
11. `npm run lint` passes clean (Next.js notes `next lint` deprecation)

### January 15, 2026 (Latest Session)
**Full Batch Image Validation & Regeneration Pipeline**

1. **Validated all 276 FLUX.2 Dev generated images:**
   - Created new evaluation session: `generated_images/flux2_dev_eval_20260115_122256/`
   - Copied all images from `C:\Users\scott\ComfyUI\output\` with proper naming
   - Combined era data from L1-2 and L3-51 prompt files

2. **Two-VLM Pipeline Results:**
   - First pass (MiniCPM-V): 268/276 passed (97%)
   - Second pass (Qwen2.5-VL): 261/268 accepted (97%)
   - 15 images failed validation and require regeneration

3. **Failed Images (15 total):**
   | Image | First Pass | Second Pass | Status |
   |-------|------------|-------------|--------|
   | L1_Ch1 | 20 | N/A | First pass fail |
   | L1_Ch2 | 20 | N/A | First pass fail |
   | L1_Ch3 | 25 | N/A | First pass fail |
   | L7_Ch5 | 20 | N/A | First pass fail |
   | L9_Ch1 | 98 | 20 | Second pass reject |
   | L10_Ch1 | 95 | 0 | Second pass reject (typewriter detected!) |
   | L13_Ch2 | 65 | N/A | First pass fail |
   | L19_Ch1 | 65 | N/A | First pass fail |
   | L19_Ch5 | 65 | N/A | First pass fail |
   | L28_Ch6 | 95 | 20 | Second pass reject |
   | L37_Ch3 | 95 | 20 | Second pass reject |
   | L42_Ch5 | 95 | 0 | Second pass reject |
   | L48_Ch4 | 85 | 20 | Second pass reject |
   | L49_Ch3 | 95 | 0 | Second pass reject |
   | L50_Ch3 | 50 | N/A | First pass fail |

4. **VLM Pipeline Validation:**
   - Qwen2.5-VL successfully caught anachronisms MiniCPM-V missed (e.g., typewriter in L10_Ch1)
   - Two-VLM pipeline working as designed - more lenient first pass, strict second pass

5. **New Scripts Created:**
   - `scripts/regenerate_cycle1.py` - Regeneration script for flux2_dev_eval session

6. **Regeneration Cycle 1 (In Progress):**
   - Using FLUX.2 Dev FP8 (`flux2_dev_fp8mixed.safetensors`)
   - Settings: 1344x768, 28 steps, euler sampler, beta scheduler
   - Queue processing: L01_Ch1-3 done, L07_Ch5 in progress
   - Remaining: L09, L10, L13, L19, L28, L37, L42, L48, L49, L50 chapters
   - Estimated completion: ~60 minutes from start
   - After generation: Automatic VLM re-evaluation (MiniCPM-V + Qwen2.5-VL)

### January 13, 2026
**Historical Image Generation Pipeline - Lessons 1 & 2 Complete**
1. **Fixed VLM evaluation issues:**
   - Replaced llama3.2-vision (too harsh, avg 58) with MiniCPM-V (avg 75) for first pass
   - Simplified evaluation prompt to avoid JSON parsing errors
2. **Fixed pipeline script (`historical_image_gen_loop.py`):**
   - Updated `evaluate_image()` to use simple prompts instead of JSON format
   - Switched to `/api/chat` endpoint for VLM calls
   - Added `get_brief_feedback()` for refinement hints
3. **Completed image generation:**
   - Lesson 1: 5/5 chapters accepted → `generated_images/session_20260112_225212/keepers/`
   - Lesson 2: 6/6 chapters accepted (first round!) → `generated_images/session_20260113_104712/keepers/`
4. **Pipeline validated:** 100% first-attempt success on Lesson 2 confirms fix is working

### January 11, 2026
1. **Created 5 new Claude skills:**
   - `tts-generator.md` - Generate TTS audio narration
   - `git-handler.md` - Git/LFS operations with correct paths
   - `content-auditor.md` - Audit lesson completeness
   - `course-scaffolder.md` - Create new course projects
   - `deploy.md` - Build and deploy to production
2. **Updated CLAUDE_INSTRUCTIONS.md** - Added comprehensive skills reference (8 total skills)
3. **Added localStorage fallback for progress** - Quiz scores now persist in dev mode without auth
4. **Updated SESSION_STATUS.md** - Added skills section

### January 10, 2026 (Previous Session)
1. Added dev mode paywall bypass
2. Fixed duplicate Navigation in layout
3. Removed basePath config for local development
4. Added refreshProfile to AuthContext
5. Fixed Suspense boundaries for Next.js 14
6. Added Stripe live keys configuration
7. Updated PROGRESS_STATUS.md with complete audit
8. Set up Git LFS for large ONNX files
9. Created initial 3 Claude skills (lesson-builder, image-prompter, historical-accuracy-checker)

---

## Next Steps (Optional)

1. **Fix Firestore Rules** - Allow users to update their own profile/progress
2. **Configure Stripe Webhooks** - For production payment confirmation
3. **Deploy to Production** - Vercel or similar
4. **Teacher Dashboard** - Student management features
5. **Analytics** - Track user progress and engagement

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for type errors
npx tsc --noEmit

# View at
http://localhost:3000

# Test access page (dev only)
http://localhost:3000/test-access
```

---

## Git & LFS Configuration

### Repository
- **Remote:** https://github.com/unclesvf/My-First-Project.git
- **Branch:** main
- **Git Root:** `C:\Users\scott\My-First-Project\My-First-Project` (NOT the project folder!)

### Git LFS
- **Status:** Enabled (GitHub Pro)
- **Tracked:** `*.onnx` files
- **Current LFS files:**
  - `lessons/tts/models/en_US-lessac-medium.onnx` (60 MB)
  - `lessons/tts/models/en_US-ryan-high.onnx` (115 MB)

### Git Commands (run from git root!)
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project"
git status
git add -A
git commit -m "message"
git push
```

---

## Contact & Resources

- **GitHub Repo:** https://github.com/unclesvf/My-First-Project
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Firebase Console:** https://console.firebase.google.com
- **Project:** history-for-homeschoolers
