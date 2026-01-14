# Claude Code Session Notes
**Last Updated:** January 11, 2026

## Project Overview
Building a **7th grade history lesson creator** with AI-generated images and text-to-speech audio.

## Current Lesson: "One World to the Next"
- **Topic:** English & Spanish Settlement in the Americas
- **Narrator:** Mateo, a 13-year-old Spanish settler in St. Augustine, 1565
- **Chapters:** 5 chapters covering the journey, survival, building, cultural collision, and reflections

---

## What We've Built

### 1. Image Prompt Generator (`scripts/image_prompt_generator.py`)
- Interactive lesson file selection
- Generates prompts for Grok Imagine or Gemini (Nano Banana Pro)
- **Gemini API integration** with:
  - Auto image generation
  - Historical authenticity verification (scores 1-10)
  - Auto-regeneration if authenticity check fails (up to 3 attempts)
  - Prompt refinement based on feedback
  - Auto-integration of approved images to `public/images/lessons/`
- **API Key:** User has a Gemini API key (set via `--api-key` or `GEMINI_API_KEY` env var)
- **Usage:** `python image_prompt_generator.py -f history.txt -n "Lesson Name" -a -b -i -k API_KEY`

### 2. Lesson Text Files
- **Full lesson:** `lessons/One_World_to_the_Next_Full_Lesson.txt`
- **TTS-formatted chapters:** `lessons/tts/00_intro.txt` through `06_outro.txt`
- User expanded Chapters 4 & 5 with more historical context (Santo Domingo, Havana, Taíno people)

### 3. Text-to-Speech Audio Generation
**Location:** `lessons/tts/audio/`

Two versions generated:

| Engine | Files | Quality | Notes |
|--------|-------|---------|-------|
| **Piper TTS** | `00_intro.wav` - `06_outro.wav` | Good | Fast, synthetic voice |
| **F5-TTS** | `f5_00_intro.wav` - `f5_06_outro.wav` | Excellent | Voice cloned, natural |

**F5-TTS Setup:**
- Installed via `pip install f5-tts`
- Reference voice: `lessons/tts/models/reference_voice.wav`
- Reference text: "Some say it took a hundred years to build."
- Uses CUDA/GPU acceleration
- ~81 seconds total to generate all chapters

**Piper TTS Setup:**
- Installed via `pip install piper-tts`
- Model: `lessons/tts/models/en_US-lessac-medium.onnx`

### 4. Generated Images (Partial)
- Location: `generated_images/session_20260109_154012/`
- 6 images generated before API rate limit
- Chapters 1-2 have images (scored 5-6/10 - need revision)
- Authenticity checker caught anachronisms (modern haircuts, wrong-era ships, etc.)

---

## TTS Options Researched
Best options for RTX 4090 24GB:

| Model | VRAM | Quality | Status |
|-------|------|---------|--------|
| **F5-TTS** | 6-10GB | Excellent | ✅ Installed & Working |
| **Piper** | ~2GB | Good | ✅ Installed & Working |
| **Zonos** | ~6GB | Excellent | User was installing |
| **Fish Speech 1.5** | 12GB | Excellent | Not installed |
| **Chatterbox** | ~6GB | Excellent | Not installed |
| **Kokoro** | ~2GB | Very Good | Failed (Python 3.13 incompatible) |

---

## Next Steps / TODO
1. **Listen to both TTS versions** and compare quality (Piper vs F5-TTS)
2. **Try Zonos TTS** if user finished installing it
3. **Regenerate images** when API quota resets (7-second delay added to avoid rate limits)
4. **Integrate audio files** into the lesson project (web player?)
5. **Create more lessons** using the same pipeline

---

## Key File Locations
```
history-lesson-creator/
├── scripts/
│   ├── image_prompt_generator.py    # Main image generation tool
│   └── history.txt                  # Source lesson content
├── lessons/
│   ├── One_World_to_the_Next_Full_Lesson.txt
│   └── tts/
│       ├── 00_intro.txt - 06_outro.txt  # TTS source files
│       ├── audio/                        # Generated audio files
│       │   ├── 00_intro.wav - 06_outro.wav      (Piper)
│       │   └── f5_00_intro.wav - f5_06_outro.wav (F5-TTS)
│       ├── models/
│       │   ├── en_US-lessac-medium.onnx  # Piper voice model
│       │   └── reference_voice.wav        # F5-TTS reference
│       ├── generate_audio.py             # Audio generation helper
│       └── README.txt
├── generated_images/                     # AI-generated lesson images
└── public/images/lessons/                # Integrated images for web app
```

---

## User's Hardware
- **GPU:** NVIDIA RTX 4090 24GB
- **Python:** 3.13 (note: some TTS packages incompatible)
- **OS:** Windows 11

## API Keys
- **Gemini API:** User has key (provided during session)
