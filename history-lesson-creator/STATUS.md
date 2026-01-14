# History for Homeschoolers - Project Status

**Last Updated:** January 13, 2026
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
| **TTS Audio** | ⏳ TESTING | V2 quality pipeline, awaiting feedback |
| **Firebase Auth** | ✅ CONFIGURED | Email/password + Google OAuth |
| **Stripe Payments** | ✅ CONFIGURED | Live keys, $19.99 course price |
| **Firestore Rules** | ⚠️ NEEDS DEPLOY | Rules created, need `firebase deploy --only firestore:rules` |

---

## Active Work Items

### TTS Audio Generation (Priority)
- **Status:** Testing V2 output (`Survival_in_Jamestown_Zonos_V2.wav`)
- **Issues being tested:** Hum elimination, pause consistency, overall quality
- **Next:** If V2 acceptable, batch generate all 51 lessons (~13-17 hours)
- **See:** `TTS_GENERATION_STATUS.md` for full details

### Pending Security Fixes
- [ ] Deploy Firestore security rules
- [ ] Implement input validation in auth
- [ ] Add XSS protection (DOMPurify)
- [ ] Configure Stripe webhooks
- **See:** `SECURITY-FIXES.md` for implementation guide

---

## Content Statistics

| Item | Count | Status |
|------|-------|--------|
| Lessons | 51 (50 + 1 bonus) | Complete |
| Chapters | 260 total | All lessons have 5+ chapters |
| Flashcards | 512 total | All lessons have 10+ flashcards |
| Quiz Questions | 408 total | All lessons have 8 questions |
| Historical Images | 276 | 100% generated and validated |

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

## Key File Locations

| Purpose | Location |
|---------|----------|
| Lesson Data | `data/lessons.ts` (770KB - consider splitting) |
| Firebase Config | `lib/firebase/config.ts` |
| Auth Functions | `lib/firebase/auth.ts` |
| Firestore Operations | `lib/firebase/firestore.ts` |
| Security Rules | `firestore.rules` |
| Generated Images | `generated_images/batch_session_*/keepers/` |
| TTS Scripts | Root: `generate_lesson_verified.py`, `process_chunks_aggressive.py` |

---

## Claude Skills (8 Available)

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

## Known Issues

1. **Firestore Permission Errors** - Deploy security rules to fix
2. **Large Data File** - `data/lessons.ts` is 770KB, should be split
3. **TTS Quality** - Testing V2 processing pipeline

---

## Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Production build
npx tsc --noEmit              # Type check

# Firebase
firebase deploy --only firestore:rules

# TTS Generation (WSL)
python3 generate_lesson_verified.py --lesson N
python3 process_chunks_aggressive.py --lesson N

# Git (from git root, one level up)
cd "C:/Users/scott/My-First-Project/My-First-Project"
git add -A && git commit -m "message" && git push
```

---

## Documentation Index

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | Claude instructions and priorities |
| `SESSION_STATUS.md` | Detailed session state |
| `TTS_GENERATION_STATUS.md` | TTS pipeline status |
| `IMAGE_GENERATION_STATUS.md` | Image generation completion |
| `SECURITY-FIXES.md` | Security implementation guide |
| `HISTORICAL_IMAGE_GENERATION_PRD.md` | Image generation PRD (58KB) |
| `TTS_SCRIPTING_PRD.md` | TTS scripting requirements |

---

*This is a consolidated status document. For detailed information on specific topics, refer to the individual documentation files listed above.*
