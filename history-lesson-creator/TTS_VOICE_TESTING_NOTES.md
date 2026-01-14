# TTS Voice Testing Session Notes

**Date:** January 11, 2026
**Status:** COMPLETE - All 10 voices tested successfully with simplified approach

---

## Summary

We attempted to create 10 voice reference files for Zonos TTS voice cloning and test them. The tests revealed significant audio processing problems that need to be fixed.

---

## What Was Accomplished

### 1. Datasets Downloaded Successfully
- **CREMA-D**: 7,442 audio clips from 91 actors with demographic data (age, sex, race)
  - Location: `voice_references/crema_d/CREMA-D/`
  - Has AudioWAV folder with WAV files
  - Demographics in `VideoDemographics.csv`

- **LibriSpeech dev-clean**: 40 speakers from LibriVox audiobooks
  - Location: `voice_references/LibriSpeech/dev-clean/`
  - FLAC files organized by speaker ID
  - Speaker metadata in `SPEAKERS.TXT`

### 2. Voice Reference Files Created
- Location: `voice_references/selected/`
- 10 WAV files created, but quality varies significantly

### 3. Scripts Created
- `voice_references/prepare_voices.py` - Prepares voice reference files
- `test_all_voices.py` - Tests voices with Zonos TTS

---

## What Went Wrong

### Problem 1: CREMA-D Audio Quality Issues
- CREMA-D contains short emotional utterances (2-3 seconds each)
- Using "HAP" (happy) emotion samples introduced non-speech sounds ("aaahhh", laughs)
- Even "NEU" (neutral) samples are short clips, not natural continuous speech
- **Result**: Choppy, inconsistent voice references

### Problem 2: Over-Aggressive Silence Removal
- Implemented `remove_silence()` function with -35dB threshold
- This threshold was TOO HIGH and cut actual speech, not just silence
- **Result**: Test clips went from ~27 seconds to 10-15 seconds, missing large portions of text

### Problem 3: Mixing Multiple Speakers
- Early attempts used multiple speakers per voice type
- This caused voice inconsistency within the same reference file
- Later fixed to single speakers, but other issues remained

---

## Test Results (Final Round)

| Voice | Source | Duration | Quality | Notes |
|-------|--------|----------|---------|-------|
| 01 Young Male | LibriSpeech | 10.8s | BAD | Barely intelligible, speech cut off |
| 02 Older Male | LibriSpeech | 21.9s | GOOD | Works well |
| 03 Adult Male | CREMA-D | 10.1s | BAD | Total mess, volume swings |
| 04 Young Female | CREMA-D | 19.6s | OK | Very rushed narration |
| 05 Older Female | CREMA-D | 19.1s | BAD | Musical tones in middle |
| 06 AA Male | CREMA-D | 15.3s | BAD | Stuttered, very slow, missing text |
| 07 AA Female | CREMA-D | ~11s | BAD | Skips around like scratched record |
| 08 Euro Male | LibriSpeech | ~15s | BAD | Choppy (was good before processing) |
| 09 Native Female | LibriSpeech | ~15s | BAD | Choppy (was good before processing) |
| 10 French Female | LibriSpeech | ~16s | BAD | Choppy (was good before processing) |

**Key Observation**: Voices 9 and 10 were GOOD in earlier tests before aggressive silence removal was added.

---

## Recommendations for Next Session

### 1. Use LibriSpeech for ALL Voices
- LibriSpeech has cleaner, longer audio samples (continuous speech)
- CREMA-D is designed for emotion recognition, not TTS voice cloning
- LibriSpeech has 40 speakers in dev-clean with ~8 minutes each

### 2. Minimal Audio Processing
- DO NOT use aggressive silence removal
- Only apply:
  - Basic peak normalization (to 95%)
  - Simple fade in/out (30ms) at edges
- Let Zonos handle the audio characteristics

### 3. Simple Voice Reference Preparation
```python
# Recommended simple approach:
def prepare_voice_simple(audio_files, output_path, target_duration=25):
    all_audio = []
    for f in audio_files:
        data, sr = sf.read(f)
        # Just normalize each clip
        data = data / np.abs(data).max() * 0.85
        all_audio.append(data)
        all_audio.append(np.zeros(int(0.1 * sr)))  # tiny gap

    combined = np.concatenate(all_audio)
    combined = combined / np.abs(combined).max() * 0.95
    sf.write(output_path, combined, sr)
```

### 4. LibriSpeech Speaker Suggestions
Based on SPEAKERS.TXT (dev-clean subset):

**Male speakers:**
- 174: Peter Eastman
- 251: Mark Nelson
- 652: Scott Walter
- 1272: John Rose
- 2902: dexter
- 3000: Brian von Dedenroth (worked well as voice 02)
- 3752: Mark Welch
- 5536: David Mix

**Female speakers:**
- 84: Christie Nowak
- 1462: E. Tavano
- 1673: Tonia
- 1993: Wendy Belcher
- 2035: Sharon Bautista
- 3536: Arielle Lipshaw (worked well as voice 09)
- 3576: JudyGibson
- 6313: Jennifer Wiginton

### 5. For Diverse Voices (AA, Accented)
- LibriSpeech doesn't have demographic labels
- Options:
  a) Use LibriSpeech voices and accept they may not match character demographics
  b) Find alternative datasets with labeled demographics and continuous speech
  c) Record custom reference audio (10-30 seconds of clear speech)

---

## Files to Reference

### Working Files
- `generate_lesson_chunked.py` - Original lesson generation script (WORKS)
- `lessons/One_World_to_the_Next_Zonos_Full.wav` - Successfully generated Lesson 1

### Voice Reference Files (need regeneration)
- `voice_references/selected/*.wav` - Current voice references (problematic)
- `voice_references/prepare_voices.py` - Voice prep script (needs simplification)
- `test_all_voices.py` - Voice test script (needs simplification)

### Datasets
- `voice_references/LibriSpeech/` - Good source for voice references
- `voice_references/crema_d/` - Not recommended for TTS voice cloning

### Documentation
- `TTS_PROJECT_STATUS.md` - Overall project status
- `VOICE_CHARACTERS.md` - All 51 lesson narrator details
- This file - Voice testing session notes

---

## Quick Start for Next Session

1. **Read this file first** to understand what was tried and what failed

2. **Use LibriSpeech only** - it has cleaner audio for voice cloning

3. **Keep processing minimal** - the original Lesson 1 generation worked with just:
   - Speaker embedding extraction
   - Basic concatenation with pauses
   - Peak normalization

4. **Test one voice at a time** before batch processing

5. **The original `zonos_test.wav`** in `lessons/` folder worked well - that's the benchmark quality to match

---

## Contact/Context

This work was done with Claude Code CLI. The original Lesson 1 audio generation was successful using a simple approach. The problems arose from over-engineering the audio processing for the voice reference files.

The key lesson: Zonos voice cloning works best with clean, continuous speech samples. Short emotional clips from datasets like CREMA-D are not suitable.

---

## SUCCESSFUL TEST RESULTS (January 11, 2026 - Session 2)

### Solution Applied
- Created `prepare_voices_simple.py` using LibriSpeech ONLY
- Minimal processing: just peak normalization and tiny fade in/out
- NO silence removal
- Created `test_voices_simple.py` with matching approach

### All 10 Voices Tested Successfully

| Voice | Speaker | Duration | Status | Output File |
|-------|---------|----------|--------|-------------|
| 01 Young Male | dexter (2902) | 26.7s | SUCCESS | test_simple_01_young_male.wav |
| 02 Older Male | Brian von Dedenroth (3000) | 26.8s | SUCCESS | test_simple_02_older_male.wav |
| 03 Adult Male | John Rose (1272) | 26.8s | SUCCESS | test_simple_03_adult_male.wav |
| 04 Young Female | Christie Nowak (84) | 26.7s | SUCCESS | test_simple_04_young_female.wav |
| 05 Older Female | Wendy Belcher (1993) | 26.7s | SUCCESS | test_simple_05_older_female.wav |
| 06 Male Voice 6 | David Mix (5536) | 26.9s | SUCCESS | test_simple_06_african_american_male.wav |
| 07 Female Voice 7 | Jennifer Wiginton (6313) | 26.6s | SUCCESS | test_simple_07_african_american_female.wav |
| 08 Male Voice 8 | Peter Eastman (174) | 26.8s | SUCCESS | test_simple_08_accented_male_european.wav |
| 09 Female Voice 9 | Arielle Lipshaw (3536) | 26.8s | SUCCESS | test_simple_09_native_female.wav |
| 10 Female Voice 10 | E. Tavano (1462) | 26.7s | SUCCESS | test_simple_10_french_accented_female.wav |

### Test Audio Location
- `voice_tests/test_simple_*.wav` - New successful test outputs

### Scripts Created
- `voice_references/prepare_voices_simple.py` - Simple voice preparation (LibriSpeech only)
- `test_voices_simple.py` - Simple voice testing (no silence removal)
- `scripts/generate_tts_scripts.py` - Generate TTS scripts for all 51 lessons

### TTS Scripts Generated
- All 51 lessons now have TTS scripts in `lessons/*_TTS_Script.txt`
- Ready for batch audio generation

### Next Steps
1. Listen to test outputs to verify quality
2. Run batch generation for all 51 lessons
3. Generate audio using the lesson-specific voice assignments from VOICE_CHARACTERS.md
