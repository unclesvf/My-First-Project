# TTS Lesson Scripting PRD
## Product Requirements Document for Converting History Lessons to Piper TTS-Ready Scripts

---

## Overview

This document defines the requirements and rules for converting written history lesson files into audio-optimized scripts for Piper TTS. The goal is to create a natural, engaging listening experience for students while preserving educational content.

**Important Piper TTS Limitations:**
- Piper does NOT support SSML markup
- Piper does NOT support inline pause/silence tags
- Piper WILL read any bracketed text aloud (e.g., "[PAUSE]" becomes spoken "pause")
- Use `--sentence-silence` flag for consistent pacing between sentences

---

## Input/Output Specifications

**Input:** Plain text lesson files (e.g., `*_Full_Lesson.txt`)
**Output:**
- TTS-ready script files (e.g., `*_TTS_Script.txt`)
- Pronunciation reference files (e.g., `*_Pronunciation_Guide.txt`) - NOT included in TTS script

**Location:** Same `lessons/` directory

---

## Piper Command Line Usage

```bash
piper -m [model.onnx] -i [input.txt] -f [output.wav] --sentence-silence 0.8
```

**Recommended settings:**
- `--sentence-silence 0.8` - Adds 0.8 second pause after each sentence (adjust as needed)
- Use high-quality voice models (e.g., `en_US-libritts-high.onnx`) for better clarity

---

## Conversion Rules

### 1. Header/Introduction Conversion

**Remove and replace the raw header block:**

```
BEFORE:
ONE WORLD TO THE NEXT
English & Spanish Settlement in the Americas

Narrator: Mateo, a 13-year-old Spanish settler in St. Augustine, 1565
```

```
AFTER:
Welcome to today's history lesson. One World to the Next. English and Spanish Settlement in the Americas.

You will hear this story from Mateo, a thirteen year old Spanish settler living in Saint Augustine in the year fifteen sixty-five.
```

**Rules:**
- Convert ALL CAPS titles to sentence case
- Spell out ages ("13-year-old" becomes "thirteen year old")
- Spell out years for proper pronunciation ("1565" becomes "fifteen sixty-five")
- Add welcoming language to engage the student
- Use short sentences with periods to create natural pauses (Piper pauses after sentences)
- Do NOT use bracketed markers like [PAUSE] - they will be spoken aloud

---

### 2. Chapter Title Formatting

**Remove ALL CAPS and format for natural speech:**

```
BEFORE:
================================================================================

CHAPTER 1: The Journey Begins
```

```
AFTER:
Chapter One. The Journey Begins.
```

**Rules:**
- Remove all separator lines (===, ---, etc.)
- Convert "CHAPTER 1" to "Chapter One" (spell out numbers 1-20)
- Use periods instead of colons to create natural pauses
- Add a blank line before chapter titles for visual clarity in the script
- Do NOT add pause markers

---

### 3. Separator and Formatting Removal

**Remove these elements entirely:**
- Lines of equals signs: `================`
- Lines of dashes: `----------------`
- Lines of asterisks: `****************`
- "END OF LESSON" markers
- Any bracketed instructions: `[PAUSE]`, `[GLOSSARY]`, etc.
- Any meta-text not meant to be spoken

**Important:** Piper reads ALL text in the file. Remove anything you don't want spoken.

---

### 4. Punctuation Adjustments

**Em-dashes:** Add spaces or convert to commas for natural flow
```
BEFORE: churned—not from seasickness
AFTER: churned, not from seasickness
```

**Ampersands:** Spell out
```
BEFORE: English & Spanish
AFTER: English and Spanish
```

**Abbreviations:** Spell out fully
```
BEFORE: St. Augustine
AFTER: Saint Augustine
```

**Colons in titles:** Convert to periods for pause
```
BEFORE: CHAPTER 1: The Journey
AFTER: Chapter One. The Journey.
```

---

### 5. Number and Date Formatting

**Years:** Spell out for proper pronunciation
```
1565 → fifteen sixty-five
1607 → sixteen oh seven
1776 → seventeen seventy-six
2000 → two thousand
```

**Ages:** Spell out
```
13-year-old → thirteen year old
```

**Ordinals:** Spell out
```
1st → first
2nd → second
Philip II → Philip the Second
```

**General numbers:** Spell out numbers under 100
```
13 → thirteen
100 → one hundred
```

---

### 6. Pronunciation of Foreign Words

**Piper will attempt to pronounce foreign words phonetically.** If a word is consistently mispronounced, replace it with a phonetic spelling throughout the script.

**Testing approach:**
1. First, try the original spelling
2. If mispronounced, replace with phonetic approximation

**Examples of phonetic replacements (use only if needed):**
```
Original → Phonetic Replacement (if mispronounced)
Menéndez de Avilés → Meh-NEN-dez day Ah-vee-LESS
Timucua → Tee-MOO-kwah
Ahone → Ah-HOH-nay
encomienda → en-koh-mee-EN-dah
Powhatan → Pow-uh-TAN
```

**Create a separate pronunciation reference file** (`*_Pronunciation_Guide.txt`) for human reference. Do NOT include this in the TTS script.

---

### 7. Pacing and Natural Breaks

Since Piper does not support pause markers, use these techniques for pacing:

**Use short sentences:** Break long sentences into shorter ones.
```
BEFORE: I still remember the smell of the salt air as our ship approached the coast, the way my stomach churned—not from seasickness, but from fear and excitement twisted together like rope.

AFTER: I still remember the smell of the salt air as our ship approached the coast. My stomach churned. Not from seasickness, but from fear and excitement twisted together like rope.
```

**Use the `--sentence-silence` flag:** When running Piper, use `--sentence-silence 0.5` to `--sentence-silence 1.0` depending on desired pacing.

**Paragraph structure:** Keep paragraphs as natural groupings. Piper will pause slightly longer at paragraph breaks.

---

### 8. Closing/Outro Standards

**Remove raw ending markers and add spoken closing:**

```
BEFORE:
================================================================================
END OF LESSON
================================================================================
```

```
AFTER:
This concludes today's lesson. One World to the Next. Thank you for listening.
```

**Rules:**
- Reference the lesson title in closing
- Keep closing brief (1-2 sentences)
- Use periods for natural pacing
- No bracketed markers

---

## Script Template Structure

```
Welcome to today's history lesson. [Title]. [Subtitle].

You will hear this story from [Narrator description].

Chapter One. [Chapter Title].

[Narrative content - clean, spoken text only]

Chapter Two. [Chapter Title].

[Narrative content]

...

This concludes today's lesson. [Title]. Thank you for listening.
```

**Note:** The script should contain ONLY text meant to be spoken. No headers, labels, glossaries, or markers.

---

## Quality Checklist

Before finalizing a TTS script, verify:

- [ ] All separator lines removed (===, ---, etc.)
- [ ] ALL CAPS converted to sentence case
- [ ] Numbers spelled out appropriately
- [ ] Years formatted for speech (fifteen sixty-five)
- [ ] Em-dashes converted to commas or periods
- [ ] Ampersands spelled as "and"
- [ ] Abbreviations expanded (St. → Saint)
- [ ] Chapter numbers spelled out (Chapter One)
- [ ] NO bracketed text remains ([PAUSE], [GLOSSARY], etc.)
- [ ] NO meta-text remains (END OF LESSON, Narrator:, etc.)
- [ ] Introduction reads as natural spoken welcome
- [ ] Closing reads as natural spoken farewell
- [ ] Foreign words tested for pronunciation (replace if needed)

---

## File Naming Convention

```
Original lesson: One_World_to_the_Next_Full_Lesson.txt
TTS script: One_World_to_the_Next_TTS_Script.txt
Pronunciation guide: One_World_to_the_Next_Pronunciation_Guide.txt (reference only)
Audio output: One_World_to_the_Next.wav
```

---

## Notes for Implementation

1. **Preserve all educational content** - Only modify formatting, not substance
2. **Maintain narrative voice** - The first-person storytelling should feel natural when heard
3. **Test with Piper** - Generate a sample and listen for pronunciation issues
4. **Iterate on pronunciation** - Build a master glossary of phonetic replacements for historical terms
5. **Script = spoken text only** - If you wouldn't say it aloud, don't include it
6. **Use sentence-silence** - The `--sentence-silence` flag is your primary pacing tool

---

## Piper TTS Limitations Reference

| Feature | Supported |
|---------|-----------|
| SSML markup | No |
| Inline pause tags | No |
| Bracketed instructions | No (will be spoken) |
| `--sentence-silence` flag | Yes |
| Paragraph breaks | Minimal effect |
| Period/sentence endings | Yes (primary pause mechanism) |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-10 | Initial PRD created |
| 1.1 | 2026-01-10 | Removed pause markers and glossary section per Piper limitations; updated pacing guidance |
