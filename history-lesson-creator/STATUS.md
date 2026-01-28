# History for Homeschoolers - Project Status

**Last Updated:** January 28, 2026
**Project Path:** `C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator`

---

## Quick Start

```bash
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator"
npm run dev
# Opens at http://localhost:3000
```

---

## Current Status Summary

| Component | Status | Details |
|-----------|--------|---------|
| **App Build** | ✅ PASSING | Next.js 15, TypeScript, Tailwind |
| **Content** | ✅ COMPLETE | 51 lessons, 260 chapters, 512 flashcards, 408 quiz questions |
| **Images** | ✅ COMPLETE | 276/276 images generated (100% success) |
| **Code Quality** | ✅ COMPLETE | Two audits completed (Jan 14 & 15), all critical fixes applied |
| **TTS Audio** | ⏳ TESTING | V2 quality pipeline, awaiting user feedback |
| **Firebase Auth** | ✅ CONFIGURED | Email/password + Google OAuth |
| **Stripe Payments** | ✅ CONFIGURED | Live keys, $19.99 course price |
| **Firestore Rules** | ⚠️ NEEDS DEPLOY | Run: `firebase login && firebase deploy --only firestore:rules` |

---

## Recent Session (January 28, 2026)

### UI and Logic Improvements
- Flashcard mastery now uses stable card IDs (shuffle-safe) with legacy index migration
- Progress debouncing uses a ref-backed timer map to avoid stale updates
- Lesson access control uses explicit lesson numbers (no reliance on lesson ID format)
- Quiz engine guards empty question sets and avoids NaN percentages
- Role selection modal is dismissible and respects a per-user "not now" flag
- Dashboard now redirects to `/student` or `/teacher` based on role
- UI updates: access badges on lesson cards, sticky lesson tabs, review links in quiz history
- Trial banner is sticky (no nav overlap), export page confirms mass downloads and supports copy summary
- Mojibake cleanup across UI text labels
- Build: `npm run build` passes clean; React Hook warnings resolved and `outputFileTracingRoot` set to avoid lockfile root warning
- Lint: `npm run lint` passes clean (Next.js notes `next lint` deprecation)

---

## Recent Session (January 15, 2026)

### Code Audit & Fixes (Two Commits)

**Commit 1: `fa01af4`** - Console logging + Stripe modernization
| Fix | Files | Description |
|-----|-------|-------------|
| Console → logger | 5 files | 24 console calls replaced with secure logger |
| Stripe API update | 2 files | Removed deprecated `redirectToCheckout`, now uses URL redirect |

**Commit 2: `979fe49`** - Quiz data integrity + remaining logging
| Fix | Files | Description |
|-----|-------|-------------|
| Quiz data fix | `lib/types.ts`, `QuizEngine.tsx` | Added `correctIndex` to properly capture correct answers |
| Type safety | `ProgressContext.tsx` | Changed `any[]` to `QuizResult[]`, transforms to `QuizAnswer` for Firestore |
| Console → logger | 7 files | 14 additional console calls replaced |
| React Hook fix | `dashboard/page.tsx` | Fixed useCallback/useEffect ordering |

### Terminal Setup
- Installed **WezTerm** terminal emulator (GPU-accelerated, Rust-based)
- Configuration: `~/.wezterm.lua` with Catppuccin Mocha theme
- Installed **JetBrains Mono Nerd Font** as primary font

### Remaining Non-Critical Warnings
7 ESLint warnings about React Hook dependencies in `ProgressContext.tsx` and `StoryReader.tsx`. These are internal function references that don't cause runtime issues. Build passes and app functions correctly.

### DEV_BYPASS_PAYWALL Note
The `DEV_BYPASS_PAYWALL` flag in `lib/utils/accessControl.ts` is intentionally left enabled for testing purposes. This bypasses paywall checks in development mode.

---

## Previous Session (January 14, 2026)

### GPU/ComfyUI Optimizations (Latest)
| Optimization | Status | Details |
|--------------|--------|---------|
| PyTorch 2.9.0+cu130 | ✅ | CUDA 13 optimized kernels |
| Flash Attention 2.8.3 | ✅ | Memory-efficient attention |
| SageAttention 2.2.0 | ✅ | Faster attention computation |
| Triton 3.5.1 | ✅ | JIT kernel compilation |
| Optimized startup script | ✅ | `C:\Users\scott\ComfyUI\start_optimized.bat` |

**Performance Improvement:** ~14% faster (7.2s/step vs 8.5s/step before)

**Note:** NVFP4 models require RTX 50-series (Blackwell) GPUs. RTX 4090 uses FP8 which is already optimal.

### Flux.2 Dev Test (In Progress)
- **Status:** Running 50-prompt quality test
- **Model:** flux2_dev_fp8mixed.safetensors
- **Resolution:** 1344x768 (landscape 16:9)
- **Steps:** 28 @ ~7.2s/step
- **Time per image:** ~280-320 seconds
- **Estimated completion:** ~4 hours total

### Code Quality Fixes (Completed Earlier)
| Fix | Status |
|-----|--------|
| Remove unused imports | ✅ |
| Replace console.error with secure logger | ✅ |
| Fix ProgressContext type errors | ✅ |
| Add input validation to auth | ✅ |
| Add ARIA accessibility labels | ✅ |
| Fix `any[]` type in firestore | ✅ |
| Clean up ~70 temp files | ✅ |
| Update .gitignore | ✅ |
| Split lessons.ts (770KB → 51 files) | ✅ |
| Add XSS protection (DOMPurify) | ✅ |

### New Files
- `lib/utils/sanitize.ts` - XSS protection utilities
- `data/lessons/*.ts` - 51 individual lesson files
- `scripts/split-lessons.js` - Lesson split utility
- `C:\Users\scott\ComfyUI\start_optimized.bat` - Optimized ComfyUI launcher

---

## Pending Actions (User Required)

### 1. Deploy Firestore Rules
```bash
firebase login
firebase deploy --only firestore:rules
```

### 2. Configure Stripe Webhooks
- Stripe Dashboard → Developers → Webhooks
- Add endpoint for payment confirmations

### 3. TTS Audio Quality Review
- Evaluate `lessons/Survival_in_Jamestown_Zonos_V2.wav`
- If acceptable: batch generate all 51 lessons

---

## Content Statistics

| Item | Count | Status |
|------|-------|--------|
| Lessons | 51 | Complete |
| Chapters | 260+ | All lessons 5+ chapters |
| Flashcards | 512+ | All lessons 10+ flashcards |
| Quiz Questions | 408 | All lessons 8 questions |
| Historical Images | 276 | 100% generated |

---

## Key File Locations

| Purpose | Location |
|---------|----------|
| Lesson Data | `data/lessons/` (51 individual files) |
| Lesson Index | `data/lessons/index.ts` (exports all) |
| Legacy Import | `data/lessons.ts` (re-exports for compatibility) |
| Firebase Config | `lib/firebase/config.ts` |
| Auth Functions | `lib/firebase/auth.ts` |
| Firestore Ops | `lib/firebase/firestore.ts` |
| Security Rules | `firestore.rules` |
| XSS Protection | `lib/utils/sanitize.ts` |
| Secure Logger | `lib/utils/logger.ts` |

---

## Configuration

### Environment Variables (.env.local)
```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=history-for-homeschoolers

# Stripe (Live)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PRICE_ID=price_1SnuHk3jSTlaKj8QA3W4W1Ba

# Course Settings
NEXT_PUBLIC_COURSE_PRICE=1999
NEXT_PUBLIC_FREE_LESSONS_COUNT=8
NEXT_PUBLIC_TRIAL_DAYS=7
```

### Access Control
- **Lessons 1-8:** Free for everyone
- **Lessons 9-51:** Require purchase or 7-day trial
- **Dev Mode:** All access checks bypassed

---

## Security Implementation Status

| Feature | Status | Location |
|---------|--------|----------|
| Secure logger | ✅ Done | `lib/utils/logger.ts` |
| Input validation | ✅ Done | `lib/firebase/auth.ts` |
| XSS protection | ✅ Done | `lib/utils/sanitize.ts` |
| Firestore rules | ⚠️ Need deploy | `firestore.rules` |
| Error boundary | ✅ Done | `app/error.tsx` |
| ARIA accessibility | ✅ Done | FlashcardDeck, QuizEngine |

---

## Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npx tsc --noEmit              # Type check

# Firebase
firebase login
firebase deploy --only firestore:rules

# TTS Generation (WSL)
python3 generate_lesson_verified.py --lesson N
python3 process_chunks_aggressive.py --lesson N

# Git (from git root)
cd "C:\Users\scott\My-First-Project\My-First-Project"
git add -A && git commit -m "message" && git push
```

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | Claude instructions and context |
| `SECURITY-FIXES.md` | Security implementation guide |
| `TTS_GENERATION_STATUS.md` | TTS pipeline status |
| `IMAGE_GENERATION_STATUS.md` | Image generation completion |
| `HISTORICAL_IMAGE_GENERATION_PRD.md` | Image generation PRD |
| `scripts/SCRIPTS_DOCUMENTATION.md` | Python scripts reference |

---

## Known Issues

1. ~~Large Data File~~ → **FIXED:** Split into 51 files
2. ~~Console.error exposure~~ → **FIXED:** 38+ calls replaced with secure logger (Jan 14-15)
3. ~~Missing input validation~~ → **FIXED:** Added to auth
4. ~~No XSS protection~~ → **FIXED:** DOMPurify added
5. ~~Quiz data integrity~~ → **FIXED:** correctIndex now captured properly (Jan 15)
6. ~~Deprecated Stripe API~~ → **FIXED:** Modernized to URL-based checkout (Jan 15)
7. **Firestore permissions** → Need to deploy rules (user action required)
8. **TTS quality** → Awaiting V2 feedback
9. **ESLint warnings** → 7 non-critical React Hook warnings (safe to ignore)

---

*For detailed Claude instructions, see `CLAUDE.md`*
