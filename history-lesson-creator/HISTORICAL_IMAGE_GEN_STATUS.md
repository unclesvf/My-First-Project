# Historical Image Generation Loop - Status Report

**Last Updated:** 2026-01-13 (Session 4)

## Quick Start - Continue from Here

```bash
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator"

# Next lesson to process:
python scripts/historical_image_gen_loop.py --lesson 3 --batch

# Or process multiple lessons:
for i in {3..10}; do python scripts/historical_image_gen_loop.py --lesson $i --batch; done
```

**Prerequisites:** Ollama running with models loaded, ComfyUI running with Flux.

---

## Summary

Successfully completed image generation for **Lessons 1 and 2** with all chapters passing VLM evaluation. The pipeline fix (simple evaluation prompts) is validated and working perfectly.

**Session 4 Key Achievements:**
- Fixed pipeline script to use simple evaluation prompts (no more JSON parsing errors)
- Lesson 1: 5/5 chapters accepted
- Lesson 2: 6/6 chapters accepted on first round (100% first-attempt success)

## Current Status: LESSONS 1-2 COMPLETE - 49 REMAINING

| Lesson | Title | Era | Chapters | Status |
|--------|-------|-----|----------|--------|
| 1 | One World To The Next | 1565 | 5/5 | COMPLETE |
| 2 | Survival In Jamestown | 1607 | 6/6 | COMPLETE |
| 3-51 | - | - | - | PENDING |

**Total Progress: 2/51 lessons (11 chapters)**

### Lesson 1: "One World To The Next" (Year 1565)
**Keepers:** `generated_images/session_20260112_225212/keepers/`

| Chapter | First Pass | Second Pass | Average | Status |
|---------|------------|-------------|---------|--------|
| 1 - The Journey Begins | 85 | 90 | **88** | ACCEPTED |
| 2 - Survival And Struggle | 79 | 85 | **82** | ACCEPTED |
| 3 - Building A New World | 85 | 90 | **88** | ACCEPTED |
| 4 - Two Worlds Collide | 85 | 90 | **88** | ACCEPTED |
| 5 - Reflections On Settlement | 80 | 85 | **82** | ACCEPTED |

### Lesson 2: "Survival In Jamestown" (Year 1607)
**Keepers:** `generated_images/session_20260113_104712/keepers/`

| Chapter | First Pass | Second Pass | Average | Status |
|---------|------------|-------------|---------|--------|
| 1 - Arrival In Virginia | 95 | 85 | **90** | ACCEPTED |
| 2 - The Starving Time | 95 | 75 | **85** | ACCEPTED |
| 3 - Tobacco Saves The Colony | 85 | 85 | **85** | ACCEPTED |
| 4 - The First Representative Government | 95 | 85 | **90** | ACCEPTED |
| 5 - Freedom's Promise And Price | 95 | 85 | **90** | ACCEPTED |
| 6 - Freedoms Promise And Price | 95 | 85 | **90** | ACCEPTED |

**Lesson 2 Result: 6/6 accepted on first round (100% first-attempt success)**

## What Was Built

### Main Script: `scripts/historical_image_gen_loop.py`

A self-correcting image generation pipeline that:
1. Loads lesson text from `lesson-exports/tts/` directory
2. Uses GPT-OS 20B (via Ollama) to generate era-action-props descriptions
3. Converts to Flux-ready prompts
4. Generates images via ComfyUI/FluxDev
5. Evaluates with two-stage VLM pipeline (MiniCPM-V -> Qwen2.5-VL)
6. Auto-refines failed images (up to 3 attempts)
7. Organizes outputs into keepers/fails folders

### Key Configuration
```python
PROMPT_GEN_MODEL = "gpt-oss:20b"
FIRST_PASS_MODEL = "minicpm-v:latest"  # Changed from llama3.2-vision (was too harsh)
SECOND_PASS_MODEL = "qwen2.5vl:latest"
DEFAULT_THRESHOLD = 75
MAX_ATTEMPTS = 3
COMFYUI_TIMEOUT = 900  # 15 minutes for Flux
# GPT-OS requires higher num_predict for reliable responses
GPT_OS_OPTIONS = {"temperature": 0.7, "num_predict": 1200}
```

### VLM Comparison (Session 3)
Tested 5 VLMs on the same images:

| Model | Avg Score | Notes |
|-------|-----------|-------|
| Qwen2.5VL | 76.0 | Consistent, reasonable |
| MiniCPM-V | 75.0 | Consistent, chosen for first pass |
| LLaVA-Llama3 | 71.8 | Sometimes too generous |
| LLaVA-13B | 63.0 | Moderate |
| Llama3.2-Vision | 58.0 | Too harsh, replaced |

### Batch Mode
Added `--batch` flag that processes all chapters in phases to minimize model switching:
- Phase 1: Generate ALL prompts (GPT-OS stays loaded)
- Phase 2: Generate ALL images (Flux stays loaded)
- Phase 3: First-pass evaluate ALL images (Llama Vision stays loaded)
- Phase 4: Second-pass evaluate passing images (Qwen VL stays loaded)
- Repeat for refinement rounds

## Issues Found and Fixed

### 1. GPT-OS Silent/Empty Responses (FULLY FIXED)

**Problem:** GPT-OS 20B was returning empty (0 chars) responses for many chapters, especially Chapter 3.

**Root Causes Identified (3 issues):**

#### Issue 1A: Wrong API Endpoint
- Was using `/api/generate` instead of `/api/chat`
- GPT-OS requires "harmony format" chat template with role-based messages

**Fix:**
```python
# Changed from:
response = requests.post(f"{OLLAMA_URL}/api/generate", json={"prompt": prompt, ...})

# To:
response = requests.post(f"{OLLAMA_URL}/api/chat", json={
    "messages": [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message}
    ],
    ...
})
```

#### Issue 1B: num_predict Too Low
- Default `num_predict=600` gave only 20% success
- Increasing to `num_predict=1200` gave 100% success in retry tests

**Key Finding from `gpt_os_retry_test.py`:**

| Configuration | Success Rate |
|--------------|--------------|
| num_predict=1200 | **100%** (5/5) |
| num_predict=600, temp=0.3 | 60% (3/5) |
| num_predict=600, temp=0.7 | 20% (1/5) |
| num_predict=600, temp=0.5 | 0% (0/5) |

#### Issue 1C: Prompt Format Complexity (SESSION 3 FIX)
- Complex prompt format caused Chapter 3 to consistently fail initial generation
- Simplified prompt format fixed the issue

**Changes Made:**
| Element | Before (failing) | After (working) |
|---------|-----------------|-----------------|
| NARRATOR field | Included | Removed |
| ERA line | `ERA: exact time and place (example: 1565...)` | `ERA: exact time and place` |
| Extra instruction | `Be specific based on the text above...` | Removed |
| AVOID line | `modern elements that should not appear` | `modern elements` |

**Working Prompt Format:**
```
Analyze this lesson chapter and describe the scene for an image.

LESSON: {title}
ERA: {era_info}
CHAPTER: {chapter_title}

TEXT:
{content}

Describe the scene with these specific details (one per line):
ERA: exact time and place
SETTING: specific location description
SUBJECT: main person or focus
ACTION: what is happening
CLOTHING: period-accurate attire details
PROPS: important objects in scene
MOOD: emotional atmosphere
AVOID: modern elements
```

### 2. Unicode Encoding Errors (FIXED)

**Problem:** Windows console couldn't encode special characters from VLM feedback (`\u202f`, `\u2011`).

**Fix:** Added `sanitize_text()` function that replaces problematic Unicode with ASCII equivalents before printing or using in prompts.

### 3. ComfyUI/Flux Workflow (FIXED)

**Problem:** Initial workflow used wrong node types for Flux model.

**Fix:** Changed from `CheckpointLoaderSimple` to proper Flux nodes:
- `UNETLoader` for `flux1-dev.safetensors`
- `DualCLIPLoader` for `t5xxl_fp16.safetensors` + `clip_l.safetensors`
- `VAELoader` for `ae.safetensors`

### 4. Timeout Issues (FIXED)

**Problem:** Default 2-minute timeout too short for Flux image generation.

**Fix:** Increased to 15 minutes (900s) for image generation, 3 minutes (180s) for LLM calls.

### 5. Response Parsing (FIXED)

**Problem:** `/api/chat` returns `message.content` not `response`.

**Fix:** Updated parsing to use correct response structure.

### 6. VLM Evaluation Prompt Too Complex (FIXED - Session 4)

**Problem:** Complex JSON-formatted evaluation prompts caused VLMs to return truncated or malformed responses, leading to parsing errors like `Invalid control character at: line 3 column 227`.

**Symptoms:**
- Images that passed first pass (score ≥75) would fail second pass due to JSON errors
- `ERROR: Invalid control character` messages in VLM responses
- Scores of -1 from failed JSON parsing

**Fix:** Use simple plain-text evaluation prompt instead of JSON format:
```python
# Instead of complex JSON prompt, use:
"Score this image 0-100 for historical accuracy to 1565 Spanish colonial Florida. Reply with just the number."
```

This simple prompt returns clean numeric scores that are easy to parse.

### 7. VLM Too Harsh (FIXED - Session 4)

**Problem:** Llama3.2-Vision scored all images very low (avg 58), even historically accurate ones. This caused the pipeline to reject good images.

**Fix:** Replaced first-pass VLM with MiniCPM-V which gives more reasonable scores (avg 75). The two-pass system now uses:
- First pass: MiniCPM-V (fast, reasonable scoring)
- Second pass: Qwen2.5VL (thorough, confirms quality)

## Files Modified/Created

1. `scripts/historical_image_gen_loop.py` - Main pipeline script (~1200 lines)
   - Uses `/api/chat` with harmony format
   - `num_predict=1200` for reliable responses
   - Simplified prompt format for GPT-OS

2. `scripts/gpt_os_diagnostic.py` - Diagnostic tests for GPT-OS
   - Tests multiple prompt variations
   - Includes refinement loop testing with simulated VLM feedback
   - Updated to use `num_predict=1200` and simplified prompt format

3. `scripts/gpt_os_retry_test.py` - Retry test script
   - Tests same prompt multiple times with different configurations
   - Used to identify optimal `num_predict` and temperature settings

4. `HISTORICAL_IMAGE_GEN_STATUS.md` - This status file

5. `scripts/SCRIPTS_DOCUMENTATION.md` - Updated with new script docs

## Fallback Mechanism

When GPT-OS fails to generate a prompt, the script uses `extract_era_props_from_content()` which:
- Extracts year from narrator/content text
- Detects location keywords (St. Augustine, Jamestown, Plymouth, etc.)
- Maps chapter titles to actions
- Provides era-appropriate defaults for clothing, props, mood

Example fallback for Lesson 1:
```python
{
    "era": "1565 Spanish colonial St. Augustine, Florida",
    "setting": "wooden Spanish colonial settlement on Florida coast",
    "clothing": "16th century Spanish colonial attire: linen shirt, wool doublet, breeches, leather boots",
    "props": ["wooden fortifications", "Spanish ships", "palmetto trees", "sandy beach"],
    ...
}
```

## Image Generation History

### Session 4 (2026-01-13) - SUCCESSFUL
- Re-evaluated session_20260112_225212 images with simpler VLM prompts
- Chapters 1, 3, 4, 5 passed on first re-evaluation
- Chapter 2 required re-generation (3 attempts)
- Final result: **5/5 chapters accepted**
- Keepers saved to: `generated_images/session_20260112_225212/keepers/`

### Session 3 (2026-01-12)
- Fixed GPT-OS prompt format issues
- 100% initial prompt generation success
- VLM (llama3.2-vision) scored all images too harshly
- Result: 1/5 chapters accepted (Chapter 4 only)

### Earlier Sessions
- Debugging GPT-OS empty responses
- Discovered need for `/api/chat` endpoint and `num_predict=1200`

## Plans / Next Steps

### Immediate: Process Remaining 50 Lessons
With Lesson 1 complete and pipeline validated:
```bash
# Process lessons 2-51 in batch
for lesson in {2..51}; do
    python scripts/historical_image_gen_loop.py --lesson $lesson --batch
done
```

### Recommended Approach for Batch Processing
1. Generate all prompts for multiple lessons first (GPT-OS stays loaded)
2. Then generate all images (Flux stays loaded)
3. Then evaluate all (VLMs stay loaded)
4. Minimizes model switching overhead

### Manual Evaluation Fallback
The automated pipeline script (`historical_image_gen_loop.py`) still uses complex JSON evaluation prompts that cause parsing errors. Until the script is updated, use this manual evaluation workflow when needed:

```python
import requests
import base64

def evaluate_image(image_path, era_description):
    """Manually evaluate an image with VLMs using simple prompts."""
    with open(image_path, 'rb') as f:
        img_b64 = base64.b64encode(f.read()).decode()

    prompt = f'Score this image 0-100 for historical accuracy to {era_description}. Reply with just the number.'

    # First pass with MiniCPM-V
    resp = requests.post('http://localhost:11434/api/chat', json={
        'model': 'minicpm-v:latest',
        'messages': [{'role': 'user', 'content': prompt, 'images': [img_b64]}],
        'stream': False
    }, timeout=180)
    score1 = int(''.join(c for c in resp.json()['message']['content'] if c.isdigit())[:3])
    print(f'MiniCPM-V: {score1}')

    if score1 >= 75:
        # Second pass with Qwen2.5VL
        resp2 = requests.post('http://localhost:11434/api/chat', json={
            'model': 'qwen2.5vl:latest',
            'messages': [{'role': 'user', 'content': prompt, 'images': [img_b64]}],
            'stream': False
        }, timeout=180)
        score2 = int(''.join(c for c in resp2.json()['message']['content'] if c.isdigit())[:3])
        print(f'Qwen2.5VL: {score2}')
        avg = (score1 + score2) / 2
        print(f'Average: {avg:.0f} - {"PASSED" if avg >= 75 else "FAILED"}')
        return avg
    return score1

# Example usage:
# evaluate_image('generated_images/session_xxx/chapter_1_v1.png', '1565 Spanish colonial Florida')
```

### Pipeline Script Fixed (Session 4)
The `historical_image_gen_loop.py` script has been updated to use simple evaluation prompts:

**Changes made:**
1. `evaluate_image()` now uses simple prompt: `"Score this image 0-100 for historical accuracy to {era}. Reply with just the number."`
2. Uses `/api/chat` endpoint instead of `/api/generate` for VLM calls
3. Added `get_brief_feedback()` function to get refinement hints only when needed (score < threshold)
4. Removed complex JSON parsing that caused errors

The pipeline should now work reliably for batch processing all 51 lessons.

### Potential Future Improvements
- Add era-specific evaluation prompts for different time periods
- Batch processing script for all 51 lessons

## How to Run

```bash
# Single lesson, batch mode (recommended)
python scripts/historical_image_gen_loop.py --lesson 1 --batch

# Specific chapter only
python scripts/historical_image_gen_loop.py --lesson 1 --chapter 4

# Lower threshold for more keepers
python scripts/historical_image_gen_loop.py --lesson 1 --threshold 60

# Test GPT-OS prompts only (no image generation)
python scripts/gpt_os_diagnostic.py --test-refinement

# Test specific chapter
python scripts/gpt_os_diagnostic.py --test-refinement --chapter 3
```

## Dependencies

- Ollama with models: `gpt-oss:20b`, `minicpm-v:latest`, `qwen2.5vl:latest`
- ComfyUI with Flux model files in appropriate directories
- Python packages: `requests` (standard library otherwise)

## Session Artifacts

### Lesson 1 Keepers (OFFICIAL OUTPUT)
```
generated_images/session_20260112_225212/keepers/
├── chapter_1_v3.png
├── chapter_2_v3.png
├── chapter_3_v1.png
├── chapter_4_v2.png
└── chapter_5_v1.png
```

### Session Folders
| Session | Date | Contents | Status |
|---------|------|----------|--------|
| `session_20260112_225212` | Jan 12 | Lesson 1 (5 chapters) | **LESSON 1 KEEPERS** |
| `session_20260113_104712` | Jan 13 | Lesson 2 (6 chapters) | **LESSON 2 KEEPERS** |
| `session_20260113_093850` | Jan 13 | Lesson 1 Ch2 re-run attempts | Can be deleted |
| `session_20260112_205013` | Jan 12 | Earlier test run | Can be deleted |

### General Artifacts
- Generated images: `generated_images/session_*/`
- Reports: `generated_images/session_*/generation_report.json`
- Keepers: `generated_images/session_*/keepers/`
- Fails: `generated_images/session_*/fails/`
- Diagnostic reports: `gpt_os_diagnostic_report.json`, `gpt_os_refinement_test_report.json`
