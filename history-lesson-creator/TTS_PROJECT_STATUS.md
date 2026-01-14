# TTS Audio Generation Project Status

**Last Updated:** January 11, 2026

---

## CURRENT STATUS: Quality Testing V2 Pipeline

**SEE `TTS_GENERATION_STATUS.md` FOR DETAILED CURRENT SESSION STATUS**

### Summary
- Voice references: All 10 tested and working (100/100 quality scores)
- Generation pipeline: Iterating on quality improvements
- Current test: V2 processing on Lesson 2 (Whisper verification + noise reduction + precise pauses)

### Voice Reference Quality (All Passing)

| Voice | SNR | Dynamic Range | Score |
|-------|-----|---------------|-------|
| 01_young_male | 33.8dB | 67.4dB | 100/100 |
| 02_older_male | 57.7dB | 69.6dB | 100/100 |
| 03_adult_male | 65.2dB | 71.2dB | 100/100 |
| 04_young_female | 47.0dB | 72.1dB | 100/100 |
| 05_older_female | 32.9dB | 71.5dB | 100/100 |
| 06_african_american_male | 46.4dB | 66.3dB | 100/100 |
| 07_african_american_female | 44.3dB | 68.2dB | 100/100 |
| 08_accented_male_european | 33.6dB | 68.4dB | 100/100 |
| 09_native_female | 49.8dB | 66.6dB | 100/100 |
| 10_french_accented_female | 55.4dB | 72.3dB | 100/100 |

### Current Best Pipeline
```bash
wsl
cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator

# Step 1: Generate with Whisper verification
python3 generate_lesson_verified.py --lesson N

# Step 2: Apply aggressive processing
python3 process_chunks_aggressive.py --lesson N
```

### What's Been Done This Session:
1. Created simplified voice preparation script (LibriSpeech only, no aggressive silence removal)
2. Generated all 10 voice references successfully
3. Tested all 10 voices with Zonos TTS - ALL WORKING
4. Generated TTS scripts for all 51 lessons
5. Created batch generation script (`generate_all_lessons.py`)
6. Installed Whisper and transcribed test audio - quality verified
7. Installed MCP Music Analysis server (needs Claude Code restart to use)

### Whisper Transcription Results (Quality Check):
| Voice | Transcription Accuracy |
|-------|----------------------|
| 09 Native Female | ⭐ PERFECT (100%) |
| 04 Young Female | Very Good (~95%) |
| 10 French Female | Very Good (~93%) |
| 02 Older Male | Good (~85%) |
| 01 Young Male | Good (~85%) |
| 06 Male Voice 6 | Good (~80%) |

### After Quality Analysis Complete:
- Run batch generation: `python3 generate_all_lessons.py`
- Or test single lesson: `python3 generate_all_lessons.py --lesson 2`

### Completed
- Voice reference creation (simplified approach using LibriSpeech only)
- Voice testing (all 10 voices successful)
- TTS script generation (all 51 lessons)
- Whisper transcription verification
- MCP Music Analysis server installation

---

## Project Overview

This project generates audio narration for 51 history lessons using Zonos TTS with voice cloning. Each lesson is narrated by a different historical character (teenagers from various time periods in American history).

---

## Current Status

### Completed
1. Zonos TTS setup in WSL2 with GPU acceleration (~130 it/s on RTX 4090)
2. Lesson 1 audio generated successfully (8.7 minutes)
3. Generation script working (`generate_lesson_chunked.py`)
4. Voice character documentation (`VOICE_CHARACTERS.md`)
5. Voice datasets downloaded (LibriSpeech, CREMA-D)
6. **Voice reference creation - SUCCESS** (using simplified LibriSpeech-only approach)
7. **Voice testing - ALL 10 VOICES WORKING** (see `TTS_VOICE_TESTING_NOTES.md`)
8. **TTS script generation - ALL 51 LESSONS** (in `lessons/*_TTS_Script.txt`)

### Ready to Start
- Batch generate all lesson audio (all prerequisites complete)

---

## Working Configuration (Lesson 1)

The following settings produced good results for Lesson 1:

### Reference Audio
- `lessons/zonos_test.wav` - Male voice reference that works well

### Generation Script Settings
```python
# Chunk settings
max_chars = 250  # Characters per chunk

# Pause settings
pause_normal = 0.45        # Between paragraphs
pause_before_chapter = 1.0  # Before chapter title
pause_after_title = 0.65    # After chapter title

# Zonos conditioning
cond_dict = make_cond_dict(
    text=chunk,
    language="en-us",
    speaker=speaker_embedding,
    emotion=[0.35, 0.15, 0.0, 0.05, 0.15, 0.0, 0.1, 0.2],
    pitch_std=70.0,
    speaking_rate=14.0,
)
```

---

## Voice Types Needed

10 voice types to cover all 51 lessons:

| # | Voice Type | Lessons |
|---|------------|---------|
| 1 | Young Male (13-15) | 1, 2, 4, 6, 13, 21, 26, 31, 34, 37 |
| 2 | Older Male (16-18) | 7, 9, 11, 14, 16, 20, 23, 24, 28, 32, 35, 38, 40, 50 |
| 3 | Adult Male | 51 (Roosevelt) |
| 4 | Young Female (12-14) | 3, 5, 12, 19, 33, 39, 48 |
| 5 | Older Female (15-17) | 8, 10, 15, 18, 25, 29, 30, 44, 47, 49 |
| 6 | African American Male | 17, 36, 41, 43 |
| 7 | African American Female | 42 |
| 8 | Accented Male (European) | 45, 46 |
| 9 | Native/Cherokee Female | 27 |
| 10 | French-accented Female | 22 |

---

## Key Files

### Scripts
- `generate_lesson_chunked.py` - Main generation script (WORKING)
- `voice_references/prepare_voices.py` - Voice prep (NEEDS SIMPLIFICATION)
- `test_all_voices.py` - Voice testing (NEEDS SIMPLIFICATION)

### Audio
- `lessons/zonos_test.wav` - Working male voice reference
- `lessons/One_World_to_the_Next_Zonos_Full.wav` - Lesson 1 output (GOOD)

### Data
- `data/lessons.ts` - All 51 lessons
- `lessons/One_World_to_the_Next_TTS_Script.txt` - Lesson 1 TTS script

### Documentation
- `VOICE_CHARACTERS.md` - All narrator details
- `TTS_VOICE_TESTING_NOTES.md` - Voice testing session notes (READ THIS)

### Datasets
- `voice_references/LibriSpeech/` - RECOMMENDED for voice references
- `voice_references/crema_d/` - NOT RECOMMENDED (short clips)

---

## Next Steps

1. **Read `TTS_VOICE_TESTING_NOTES.md`** for context on what was tried

2. **Create simple voice references from LibriSpeech only**
   - Use minimal audio processing (just normalization)
   - Single speaker per voice type
   - ~25 seconds of continuous speech

3. **Test each voice individually** before batch processing

4. **Generate TTS scripts** for remaining lessons once voices are working

5. **Batch generate** all lesson audio

---

## How to Run Generation (WSL2)

```bash
# Open WSL2
wsl

# Navigate to project
cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator

# Run generation
python3 generate_lesson_chunked.py
```

---

## Troubleshooting

### Voice sounds choppy or cut off
- Audio processing is too aggressive
- Use minimal processing (just peak normalization)
- Don't remove internal silence

### Voice sounds flat or robotic
- Reference audio may not be suitable
- Use LibriSpeech (continuous speech) not CREMA-D (short clips)
- Ensure reference is 10-30 seconds of clear speech

### Generation is slow
- Ensure running in WSL2 (not Windows) for Triton support
- Check `torch.cuda.is_available()` returns True
