# History Lesson Creator - Scripts Documentation

This document provides comprehensive documentation for all scripts in the history-lesson-creator project. Future Claude sessions should reference this file to understand the available tooling.

## Overview

The history-lesson-creator project contains 51 history lessons covering American history from 1565 to 1877. Each lesson includes narrative chapters, flashcards, and quizzes, all stored in `data/lessons.ts`.

---

## Scripts

### 1. `historical_accuracy_checker.py`

**Purpose:** Scans all 51 lessons, 512 flashcards, and 224 quiz questions for chronological anachronisms (references to events, people, or concepts that didn't exist at the time the lesson is set).

**Location:** `scripts/historical_accuracy_checker.py`

**Usage:**
```bash
python scripts/historical_accuracy_checker.py
```

**Key Features:**
- 350+ term timeline database covering settlements, events, people, documents, and concepts
- Scans lesson chapters, flashcard terms/definitions, and quiz questions/explanations
- Three-tier false positive filtering:
  - `SKIP_TERMS`: Generic terms that shouldn't be flagged (e.g., "america", "sugar")
  - `FORWARD_NARRATIVE_TERMS`: Intentional educational foreshadowing (e.g., "civil war" mentioned before it happens)
  - `EXACT_MATCH_TERMS`: Multi-word terms requiring exact phrase match to avoid partial matches

**Output:** Console report showing any anachronisms found with lesson context

**When to Use:** After editing any lesson content to verify historical accuracy

---

### 2. `export_lessons.py`

**Purpose:** Export all lesson text to readable and TTS-ready formats.

**Location:** `scripts/export_lessons.py`

**Usage:**
```bash
python scripts/export_lessons.py
```

**Output:**
- `lesson-exports/All_Lessons_Complete.txt` - Single file with all 51 lessons formatted for reading
- `lesson-exports/tts/` - Directory with 362 TTS-ready chapter files organized by lesson

**TTS File Structure:**
```
lesson-exports/tts/
├── lesson_01_one_world_to_the_next/
│   ├── 00_intro.txt
│   ├── 01_the_journey_begins.txt
│   ├── 02_survival_and_struggle.txt
│   └── ...
├── lesson_02_.../
└── ...
```

**When to Use:** After updating lesson content to regenerate exports for reading or text-to-speech processing

---

### 3. `lesson_media_generator.py`

**Purpose:** Generate supplementary learning materials for all 51 lessons.

**Location:** `scripts/lesson_media_generator.py`

**Usage:**
```bash
python scripts/lesson_media_generator.py
```

**Generates for Each Lesson:**
1. **Mind Maps** (2 formats):
   - `mindmap_mermaid.md` - Mermaid diagram syntax (render at mermaid.live)
   - `mindmap.dot` - Graphviz DOT format (render with `render_mindmaps.py`)

2. **Infographic Content** (2 formats):
   - `infographic.json` - Structured JSON data
   - `infographic_outline.md` - Markdown outline for design tools

3. **Video Script:**
   - `video_script.md` - Narrated script with timing suggestions

4. **NotebookLM Export:**
   - `notebooklm_export.md` - Optimized markdown for Google NotebookLM import

**Output Directory:** `lesson-media/`

**File Structure:**
```
lesson-media/
├── lesson_01_one_world_to_the_next/
│   ├── mindmap_mermaid.md
│   ├── mindmap.dot
│   ├── mindmap.png (after rendering)
│   ├── infographic.json
│   ├── infographic_outline.md
│   ├── video_script.md
│   └── notebooklm_export.md
├── lesson_02_.../
└── ...
```

**When to Use:** After adding new lessons or updating existing lesson content

---

### 4. `render_mindmaps.py`

**Purpose:** Render all Graphviz DOT mind map files to PNG images.

**Location:** `scripts/render_mindmaps.py`

**Prerequisites:** Graphviz must be installed on the system
- Windows: Download from https://graphviz.org/download/
- Or install via: `winget install graphviz` or `choco install graphviz`

**Usage:**
```bash
python scripts/render_mindmaps.py
```

**Input:** All `mindmap.dot` files in `lesson-media/`

**Output:** `mindmap.png` files in each lesson's media directory

**When to Use:** After running `lesson_media_generator.py` to create visual mind map images

---

### 5. `historical_image_accuracy_checker.py`

**Purpose:** Evaluate AI-generated images for historical accuracy using a two-stage VLM pipeline.

**Location:** `scripts/historical_image_accuracy_checker.py`

**Prerequisites:**
- Ollama running with vision models installed:
  - `ollama pull llama3.2-vision`
  - `ollama pull qwen2.5vl`
- Python packages: `pillow`, `requests`, `reportlab`

**Usage:**
```bash
# Evaluate images with specific era
python scripts/historical_image_accuracy_checker.py --folder generated_images/session_xxx --era "1920s"

# Use defaults (most recent session in generated_images/)
python scripts/historical_image_accuracy_checker.py --era "1565 Spanish colonial"

# Custom threshold (default is 80)
python scripts/historical_image_accuracy_checker.py --folder ./images --era "Civil War era" --threshold 70
```

**How It Works:**
1. **First Pass (Llama 3.2 Vision):** Quick evaluation of each image against the specified era
2. **Second Pass (Qwen2.5-VL):** Images scoring above threshold get detailed scrutiny with stricter prompts
3. **Scoring:** Final score is average of both passes for qualifying images

**Output:**
- `*.accuracy.json` - Individual JSON report next to each image
- `accuracy_report_<timestamp>.pdf` - Summary PDF with color-coded results:
  - Green: Keepers (passed both evaluations)
  - Yellow: Borderline (passed first, borderline on second)
  - Red: Rejected (failed first pass)

**Arguments:**
| Argument | Short | Description |
|----------|-------|-------------|
| `--folder` | `-f` | Path to image folder |
| `--era` | `-e` | Historical era (e.g., "1920s", "Victorian England") |
| `--threshold` | `-t` | Score threshold for second pass (default: 80) |
| `--output` | `-o` | Custom PDF output path |
| `--quiet` | `-q` | Suppress progress output |

**When to Use:** After generating images with AI tools to filter out historically inaccurate results

---

## Data Files

### `data/lessons.ts`

**Purpose:** Master data file containing all 51 lessons

**Structure:**
```typescript
export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "One World to the Next",
    description: "Spanish Settlement in the Americas...",
    narrator: "Mateo, a 13-year-old boy...",
    chapters: [
      { title: "The Journey Begins", content: `...` },
      // ... more chapters
    ],
    flashcards: [
      { term: "St. Augustine", definition: "..." },
      // ... more flashcards
    ],
    quizzes: [
      { question: "...", options: [...], correctAnswer: 0, explanation: "..." },
      // ... more quizzes
    ]
  },
  // ... 50 more lessons
];
```

---

## Output Directories

| Directory | Purpose |
|-----------|---------|
| `lesson-exports/` | Exported lesson text and TTS files |
| `lesson-media/` | Generated mind maps, infographics, video scripts |
| `accuracy_reports/` | Historical accuracy scan results |

---

## Workflow Examples

### After Editing Lesson Content:
```bash
# 1. Check for anachronisms
python scripts/historical_accuracy_checker.py

# 2. Regenerate exports
python scripts/export_lessons.py

# 3. Regenerate media files
python scripts/lesson_media_generator.py

# 4. Render mind map images
python scripts/render_mindmaps.py
```

### Adding a New Lesson:
1. Add lesson data to `data/lessons.ts`
2. Run all four scripts in sequence above
3. Verify no accuracy issues were introduced

---

## Notes for Future Sessions

- All scripts use Python 3 and standard library (no external dependencies except Graphviz for rendering)
- The `lessons.ts` file uses TypeScript syntax but is parsed with regex by Python scripts
- Mind maps can be rendered two ways:
  - Online: Copy Mermaid code to https://mermaid.live/
  - Local: Use `render_mindmaps.py` with Graphviz installed
- NotebookLM exports are designed for manual upload to Google NotebookLM (no public API available)
- The accuracy checker has been tuned to minimize false positives while catching genuine anachronisms

---

*Last updated: January 2026*
