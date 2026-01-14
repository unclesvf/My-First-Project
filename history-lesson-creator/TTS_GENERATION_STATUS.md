# TTS Audio Generation Status

**Last Updated:** January 13, 2026

---

## CURRENT STATUS: Quality Testing V2

### IMMEDIATE NEXT STEP:
User is testing `Survival_in_Jamestown_Zonos_V2.wav` for quality. Waiting for feedback on:
1. Are hums eliminated?
2. Are pauses consistent?
3. Overall quality assessment

### If V2 Quality is Acceptable:
- Update `generate_lesson_verified.py` to include V2 processing steps
- Run batch generation for all 51 lessons

### If V2 Quality Still Has Issues:
- Consider slower speaking rate (currently 13.5, try 12.0)
- Consider different voice reference
- Consider different TTS model (XTTS, StyleTTS2)

---

## SESSION SUMMARY (January 13, 2026)

### Problem Statement
User reported quality issues with initial TTS generation:
1. **Missing words** - Zonos model dropping words
2. **Background hums** - Low-frequency artifacts
3. **Inconsistent pauses** - Some too long, some sentences racing together
4. **Volume variations** - Fixed in earlier session

### Solutions Attempted

#### Attempt 1: Basic Generation (`generate_all_lessons.py`)
- **Result:** Volume varied wildly (13.1 dB range)
- **Issues:** Missing words, hums, inconsistent pauses

#### Attempt 2: HQ Pipeline (`generate_lesson_quality.py`)
- **Added:** Per-chunk LUFS normalization, compression
- **Result:** Volume fixed (1.1 dB range), but still had missing words, hums, pauses issues

#### Attempt 3: Whisper-Verified Pipeline (`generate_lesson_verified.py`)
- **Added:**
  - Sentence-based chunking (not character-based)
  - Whisper transcription verification for each chunk
  - Word Error Rate calculation with regeneration on failure
  - High-pass filter at 80Hz
  - Standardized pause insertion
- **Result:** Fewer missing words, hums reduced but not gone, pauses still inconsistent

#### Attempt 4: Aggressive Processing (`process_chunks_aggressive.py`)
- **Added:**
  - Higher high-pass filter (120Hz)
  - Noise reduction via `noisereduce` library
  - Aggressive silence trimming from BOTH ends of chunks
  - Precise pause insertion (1.0s after title, 0.9s after chapters, 0.45s between sentences)
- **Result:** TESTING - User evaluating V2 output

---

## FILES CREATED THIS SESSION

### Generation Scripts
| File | Purpose | Status |
|------|---------|--------|
| `generate_lesson_verified.py` | Quality-gated generation with Whisper verification | Working |
| `process_chunks_aggressive.py` | Post-processing with noise reduction and precise pauses | Working |
| `concatenate_chunks.py` | Simple chunk concatenation with normalization | Working |
| `analyze_generated_audio.py` | Quality analysis tool | Working |
| `analyze_voice_quality.py` | Voice reference quality analysis | Working |

### Generated Audio Files (Lesson 2)
| File | Description | Quality |
|------|-------------|---------|
| `Survival_in_Jamestown_Zonos_Full.wav` | Original generation | Poor - volume issues |
| `Survival_in_Jamestown_Zonos_HQ.wav` | With LUFS normalization | Better volume, still has issues |
| `Survival_in_Jamestown_Zonos_Verified.wav` | With Whisper verification | Fewer missing words |
| `Survival_in_Jamestown_Zonos_V2.wav` | With aggressive processing | **TESTING** |

### Chunk Directories
| Directory | Contents |
|-----------|----------|
| `lessons/lesson_02_chunks/` | Original chunks (44 files) |
| `lessons/lesson_02_chunks_hq/` | LUFS-normalized chunks (44 files) |
| `lessons/lesson_02_verified/` | Whisper-verified chunks (50 files) |

---

## QUALITY METRICS COMPARISON

| Version | Volume Std | Volume Range | Tonal Var | Score |
|---------|-----------|--------------|-----------|-------|
| Original | 2.93 dB | 13.1 dB | 21.4% | 70/100 |
| HQ | 0.36 dB | 1.1 dB | 13.5% | 100/100 |
| Verified | 0.41 dB | 1.4 dB | 9.0% | 100/100 |

**Note:** Metrics look good but don't capture subjective issues (missing words, hums, pauses)

---

## KNOWN ISSUES WITH ZONOS TTS

1. **Word Dropping:** Model occasionally skips words, especially proper nouns like "Jamestown"
2. **Hum Artifacts:** Low-frequency hum in generated audio
3. **Variable Pacing:** Inconsistent speech rate and pause lengths within chunks
4. **Speaking Rate:** Default rate may be too fast for clear articulation

### Mitigation Strategies Implemented
- Whisper verification catches missing words (regenerate if WER > 15%)
- High-pass filter (120Hz) reduces hums
- Noise reduction (spectral gating) further reduces artifacts
- Aggressive silence trimming + precise pause insertion normalizes pauses

---

## CONFIGURATION SETTINGS

### Current Generation Settings (`generate_lesson_verified.py`)
```python
CONFIG = {
    'max_wer': 0.15,                # Maximum Word Error Rate (15%)
    'max_regeneration_attempts': 3,  # Tries before accepting chunk
    'target_lufs': -16.0,           # Target loudness
    'pause_between_sentences': 0.4,  # 400ms between sentences
    'pause_after_chapter': 0.8,      # 800ms after chapter titles
    'highpass_freq': 80,            # High-pass filter cutoff (Hz)
}
```

### Current Processing Settings (`process_chunks_aggressive.py`)
```python
PAUSE_CONFIG = {
    'after_title': 1.0,        # After lesson title/intro
    'after_chapter': 0.9,      # After "Chapter X. Title"
    'between_sentences': 0.45, # Between regular sentences
}
# High-pass: 120Hz
# Noise reduction: noisereduce library with prop_decrease=0.6
# Silence threshold: -35dB
```

### Zonos TTS Settings
```python
cond_dict = make_cond_dict(
    text=text,
    language="en-us",
    speaker=speaker_embedding,
    emotion=[0.35, 0.15, 0.0, 0.05, 0.15, 0.0, 0.1, 0.2],
    pitch_std=70.0,
    speaking_rate=13.5,  # Consider lowering to 12.0 if still having issues
)
```

---

## VOICE REFERENCES

All 10 voice references tested and working. Quality scores: 100/100 for all.

| Voice | Used For | Source |
|-------|----------|--------|
| 01_young_male | Lessons 1,2,4,6,13,21,26,31,34,37 | LibriSpeech |
| 02_older_male | Lessons 7,9,11,14,16,20,23,24,28,32,35,38,40,50 | LibriSpeech |
| 03_adult_male | Lesson 51 (Roosevelt) | LibriSpeech |
| 04_young_female | Lessons 3,5,12,19,33,39,48 | LibriSpeech |
| 05_older_female | Lessons 8,10,15,18,25,29,30,44,47,49 | LibriSpeech |
| 06_african_american_male | Lessons 17,36,41,43 | LibriSpeech |
| 07_african_american_female | Lesson 42 | LibriSpeech |
| 08_accented_male_european | Lessons 45,46 | LibriSpeech |
| 09_native_female | Lesson 27 | LibriSpeech |
| 10_french_accented_female | Lesson 22 | LibriSpeech |

---

## NEXT STEPS (Priority Order)

1. **Get user feedback on V2** - Is quality acceptable?

2. **If V2 acceptable:**
   - Create unified generation script combining all improvements
   - Run batch generation for all 51 lessons
   - Monitor quality per lesson

3. **If V2 still has issues:**
   - Try lower speaking_rate (12.0 instead of 13.5)
   - Try lower WER threshold (10% instead of 15%)
   - Consider different TTS model

4. **For batch generation:**
   - Estimate time: ~15-20 min per lesson with verification
   - Total: ~13-17 hours for all 51 lessons
   - Consider running in background

---

## HOW TO CONTINUE

### To regenerate Lesson 2 with current pipeline:
```bash
wsl
cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator

# Step 1: Generate verified chunks
python3 generate_lesson_verified.py --lesson 2

# Step 2: Process with aggressive noise reduction
python3 process_chunks_aggressive.py --lesson 2
```

### To generate a different lesson:
```bash
# Replace 2 with lesson number (1-51)
python3 generate_lesson_verified.py --lesson N
python3 process_chunks_aggressive.py --lesson N
```

### To analyze audio quality:
```bash
python3 analyze_generated_audio.py /path/to/audio.wav
```

---

## DEPENDENCIES INSTALLED

In WSL2:
- `librosa` - Audio analysis
- `whisper` (openai-whisper) - Speech transcription
- `noisereduce` - Noise reduction
- `scipy` - Signal processing
- `torchaudio` - Audio I/O
- Zonos TTS model (Zyphra/Zonos-v0.1-transformer)

---

## LESSONS LEARNED

1. **Character-based chunking is bad** - Split at sentence boundaries instead
2. **Post-processing can't fix missing words** - Must verify during generation
3. **Zonos generates variable silence** - Must trim and add consistent pauses
4. **80Hz high-pass isn't enough** - 120Hz works better for hum removal
5. **Metrics don't tell the whole story** - Human listening is essential
6. **Voice references matter** - LibriSpeech works, CREMA-D doesn't
