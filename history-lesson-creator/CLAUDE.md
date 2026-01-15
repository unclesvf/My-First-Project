# Claude Instructions for History Lesson Creator

## QUICK CONTEXT

**Last Major Update:** January 15, 2026
**Project:** History for Homeschoolers - 51 lessons on American history (1565-1920)
**Stack:** Next.js 15, TypeScript, Firebase Auth, Stripe, Tailwind CSS

### Current State
- ✅ **App Build:** Passing, production-ready
- ✅ **Content:** 51 lessons complete with chapters, flashcards, quizzes
- ✅ **Images:** 276/276 historical images generated
- ✅ **Code Quality:** All critical issues fixed (Jan 15) - 2 comprehensive audits completed
- ✅ **Logging:** All console.error replaced with secure logger across entire codebase
- ✅ **Quiz Data:** Fixed data integrity issue - correct answers now properly captured
- ⏳ **TTS Audio:** V2 quality testing - awaiting user feedback
- ⚠️ **Firestore Rules:** Created but need manual deployment (requires `firebase login`)

---

## RECENT SESSION SUMMARY (January 15, 2026)

### Code Audit & Fixes (Two Commits)

**Commit 1: `fa01af4`** - Console logging + Stripe modernization
| Fix | Files | Description |
|-----|-------|-------------|
| Console → logger | `lib/firebase/trial.ts` | 6 console calls replaced |
| Console → logger | `lib/contexts/ProgressContext.tsx` | 13 console calls replaced |
| Console → logger | `components/QuizEngine.tsx` | 2 console calls replaced |
| Console → logger | `lib/stripe/checkout.ts` | 2 console calls replaced |
| Console → logger | `app/api/grant-test-access/route.ts` | 1 console call replaced |
| Stripe API update | `lib/stripe/checkout.ts` | Removed deprecated `redirectToCheckout`, now uses URL redirect |
| Stripe API update | `app/api/stripe/create-checkout-session/route.ts` | Returns session URL for modern flow |

**Commit 2: `979fe49`** - Quiz data integrity + remaining logging
| Fix | Files | Description |
|-----|-------|-------------|
| **Quiz data fix** | `lib/types.ts` | Added `correctIndex` to `QuizResult` type |
| **Quiz data fix** | `components/QuizEngine.tsx` | Now captures correct answer index |
| **Type safety** | `lib/contexts/ProgressContext.tsx` | Changed `any[]` to `QuizResult[]`, transforms to `QuizAnswer` for Firestore |
| Console → logger | `app/api/stripe/create-checkout-session/route.ts` | 3 console calls |
| Console → logger | `app/api/stripe/webhooks/route.ts` | 8 console calls |
| Console → logger | `app/dashboard/page.tsx` | 1 console call + hook fix |
| Console → logger | `lib/stripe/config.ts` | 1 console call |
| Console → logger | `components/auth/EmailSignInForm.tsx` | 1 console call |
| Console → logger | `components/auth/GoogleSignInButton.tsx` | 1 console call |
| Console → logger | `app/error.tsx` | Consolidated error logging |
| React Hook fix | `app/dashboard/page.tsx` | Fixed useCallback/useEffect ordering |

### Terminal Setup (User Environment)
- Installed **WezTerm** terminal emulator (GPU-accelerated, Rust-based)
- Configuration: `~/.wezterm.lua` with Catppuccin Mocha theme
- Installed **JetBrains Mono Nerd Font** as primary font
- Optimized for Claude Code usage

### Remaining Non-Critical Warnings
7 ESLint warnings about React Hook dependencies in `ProgressContext.tsx` and `StoryReader.tsx`. These are internal function references that don't cause runtime issues but would require significant refactoring. Build passes and app functions correctly.

### DEV_BYPASS_PAYWALL Note
The `DEV_BYPASS_PAYWALL` flag in `lib/utils/accessControl.ts` is intentionally left enabled for testing purposes. This bypasses paywall checks in development mode.

---

## PREVIOUS SESSION SUMMARY (January 14, 2026)

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

### GPU/ComfyUI Optimizations (Latest - Jan 14, 2026)
Upgraded Python environment for maximum GPU performance on RTX 4090:

| Package | Version | Purpose |
|---------|---------|---------|
| PyTorch | 2.9.0+cu130 | CUDA 13 optimized kernels |
| Flash Attention | 2.8.3 | Memory-efficient attention |
| SageAttention | 2.2.0 | Faster attention computation |
| Triton | 3.5.1 | JIT kernel compilation |

**Optimized ComfyUI Startup:**
```batch
C:\Users\scott\ComfyUI\start_optimized.bat
```
Includes: `--cuda-malloc`, `--force-channels-last`, `--use-sage-attention`, `--opt-sdp-attention`, `--fast`

**Performance:** ~14% faster inference (7.2s/step vs 8.5s/step)

**Note:** NVFP4 models (3x speedup) require RTX 50-series Blackwell GPUs. RTX 4090 uses FP8 acceleration which is optimal for Ada architecture.

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

## IMAGE REFINEMENT & ANACHRONISM DETECTION

### Automated Anachronism Detection Pipeline
Detects and fixes anachronisms using AI vision models + inpainting.

**Components:**
- **Grounding DINO** - Zero-shot object detection (finds typewriters, modern items, etc.)
- **SAM (Segment Anything)** - Generates precise masks from detected objects
- **FLUX Fill** - Inpaints masked areas with period-appropriate content

**Usage:**
```bash
# Detect anachronisms (dry run)
python scripts/auto_fix_anachronisms.py --image L10_Ch1.png --era "1760s colonial" --dry-run

# Auto-detect and fix
python scripts/auto_fix_anachronisms.py --image L10_Ch1.png --era "1760s colonial"

# Batch processing
python scripts/auto_fix_anachronisms.py --batch images_to_check.json
```

**Supported Eras:** `1600s`, `1700s`, `1760s colonial`, `1776`, `1800s early`, `1800s late`

### Manual Inpainting Tools

| Tool | Script | Use Case |
|------|--------|----------|
| FLUX Fill | `scripts/fill_inpaint.py` | Mask-based replacement (white mask = replace) |
| FLUX Kontext | `scripts/kontext_refine.py` | Text-described edits ("remove the typewriter") |

**FLUX Fill Example:**
```bash
python scripts/fill_inpaint.py --image img.png --mask mask.png --prompt "colonial desk items"
```

**FLUX Kontext Example:**
```bash
python scripts/kontext_refine.py --image img.png --edit "Remove the typewriter, replace with quill and ink"
```

### Models Downloaded (ComfyUI)
| Model | Location | Size |
|-------|----------|------|
| FLUX Fill Q8 GGUF | `models/unet/flux1-fill-dev-Q8_0.gguf` | 11.84 GB |
| FLUX Kontext FP8 | `models/diffusion_models/flux1-dev-kontext_fp8_scaled.safetensors` | 11.09 GB |
| SAM ViT-H | `models/sam/sam_vit_h_4b8939.pth` | 2.39 GB |

### ComfyUI Workflows
- `workflows/flux_fill_inpaint.json` - Mask-based inpainting
- `workflows/kontext_image_refine.json` - Text-based editing

---

## PROMPT EXPORT (for Higgsfield/Nano Banana Pro)

Export prompts in formats suitable for external generation services.

**Export Script:**
```bash
# Full export with metadata (60-dash separators)
python scripts/export_prompts_for_higgsfield.py

# Clean prompts only
python scripts/export_prompts_for_higgsfield.py --format prompts

# CSV for spreadsheets
python scripts/export_prompts_for_higgsfield.py --format csv

# Filter by lesson
python scripts/export_prompts_for_higgsfield.py --lesson 10
```

**Output Location:** `prompts_export/`
- `all_prompts_*.txt` - Full with metadata
- `all_prompts_*_clean.txt` - Prompts only (60-dash separated)
- `all_prompts_*.csv` - Spreadsheet format

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
| `/check-batch` | Monitor running image generation batches |
| `/scan-anachronisms` | Detect anachronisms in images (dry-run) |
| `/fix-anachronisms` | Interactive anachronism detection and fix with FLUX Fill |
| `/export-prompts` | Export prompts for external services (Higgsfield, etc.) |
| `/review-images` | Interactive image quality review workflow |
| `/comfyui-model` | Check and swap ComfyUI models (FLUX.2 Dev/Fill/Kontext) |
| `/higgsfield` | Higgsfield generation helper (Web UI vs Cloud API) |
| `/tts-generate` | TTS audio generation pipeline (Zonos + Whisper verification) |
| `/project-status` | Quick overview of all systems and completion status |
| `/organize-images` | Move reviewed images to deployment folders |
| `/validate-lesson` | Deep validation of lesson content, images, audio, quiz |
| `/cost-estimate` | Estimate costs/time for Higgsfield API, local FLUX, TTS batches |
| `/rebuild-lesson` | Regenerate all assets (images + audio) for a single lesson |

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

## EXTERNAL API CREDENTIALS

API credentials are stored in `.env.local` (gitignored). Environment variables are also set system-wide.

### Higgsfield Cloud API (Ultimate Account)
- **Portal:** https://cloud.higgsfield.ai/
- **Web UI:** https://higgsfield.ai/ (Ultimate = unlimited Nano Banana Pro)
- **SDK:** `pip install higgsfield-client` (installed)
- **Env vars:** `HF_API_KEY`, `HF_API_SECRET` (or combined `HF_KEY`)
- **Scripts:** `scripts/higgsfield_batch_generate.py`

**IMPORTANT: API vs Subscription are SEPARATE billing:**
| Access Method | Billing | Nano Banana Pro |
|---------------|---------|-----------------|
| Web UI (higgsfield.ai) | Ultimate subscription | **Unlimited** |
| Cloud API (cloud.higgsfield.ai) | Separate credit purchase | ~$0.05-0.06/image |

**API Usage:**
```python
import higgsfield_client
result = higgsfield_client.subscribe('bytedance/seedream/v4/text-to-image',
    arguments={'prompt': '...', 'resolution': '2K', 'aspect_ratio': '16:9'})
```

**Batch Generation:**
```bash
python scripts/higgsfield_batch_generate.py --dry-run  # Preview
python scripts/higgsfield_batch_generate.py            # Generate all 265 images
python scripts/higgsfield_batch_generate.py --lesson 10  # Single lesson
```

**Alternative (No API cost):** Use exported prompts (`prompts_export/*.txt`) with web UI for unlimited generation

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
