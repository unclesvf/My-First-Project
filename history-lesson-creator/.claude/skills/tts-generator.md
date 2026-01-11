# TTS Audio Generator Skill

## Description
Generate text-to-speech audio narration for lessons using the Piper TTS engine. Creates MP3 audio files for story mode chapters.

## Usage
User can invoke this skill by saying:
- "generate audio for lesson [number]"
- "create TTS narration"
- "make audio files"
- "/generate-audio"

## Instructions

You are helping generate audio narration for lesson chapters. Follow these steps carefully:

### Prerequisites

Before running TTS generation:
1. Ensure Piper TTS is installed
2. Verify ONNX models exist in `lessons/tts/models/`
3. Check Python/Node.js environment is ready

### Step 1: Identify Target Lesson

Ask the user:
1. Which lesson(s) to generate audio for?
   - Single lesson: "lesson 5"
   - Range: "lessons 10-15"
   - All lessons: "all"
2. Which voice model to use?
   - `en_US-lessac-medium` (60 MB, natural voice)
   - `en_US-ryan-high` (115 MB, higher quality)

### Step 2: Extract Chapter Content

For each target lesson:
1. Read `data/lessons.ts`
2. Find the lesson by ID
3. Extract chapter content from `story.chapters`
4. Clean text for TTS:
   - Remove markdown formatting
   - Convert special characters
   - Split into appropriate chunks

### Step 3: Generate Audio Files

For each chapter:

```bash
# Navigate to TTS directory
cd "C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/lessons/tts"

# Generate audio using Piper
echo "[chapter text]" | piper \
  --model models/en_US-lessac-medium.onnx \
  --output_file output/lesson-[N]-chapter-[N].wav

# Convert to MP3 (if ffmpeg available)
ffmpeg -i output/lesson-[N]-chapter-[N].wav \
  -codec:a libmp3lame -b:a 128k \
  output/lesson-[N]-chapter-[N].mp3
```

### Step 4: File Naming Convention

Audio files should follow this pattern:
```
output/lesson-[lesson-number]-chapter-[chapter-number].[ext]

Examples:
- lesson-1-chapter-1.mp3
- lesson-1-chapter-2.mp3
- lesson-15-chapter-5.mp3
```

### Step 5: Integration

After generating audio:
1. Move files to appropriate public directory
2. Update lesson data with audio file paths (if applicable)
3. Test playback in the application

### Step 6: Verify & Report

After generation:
1. List all generated files with sizes
2. Report any failures or issues
3. Total generation time
4. Disk space used

## Audio Quality Settings

| Setting | Value | Notes |
|---------|-------|-------|
| Sample Rate | 22050 Hz | Piper default |
| Channels | Mono | Reduces file size |
| MP3 Bitrate | 128 kbps | Good quality/size balance |
| Format | MP3 | Wide compatibility |

## Model Information

### en_US-lessac-medium.onnx
- **Size:** 60 MB
- **Quality:** Medium
- **Speed:** Faster generation
- **Best for:** Bulk generation, testing

### en_US-ryan-high.onnx
- **Size:** 115 MB
- **Quality:** High
- **Speed:** Slower generation
- **Best for:** Final production audio

## Error Handling

Common issues and solutions:

### Model not found
```
Error: Cannot find model file
Solution: Verify models exist in lessons/tts/models/
```

### Out of memory
```
Error: Memory allocation failed
Solution: Process one chapter at a time, close other applications
```

### Audio quality issues
```
Problem: Robotic or unclear audio
Solution: Check text preprocessing, try different model
```

## Text Preprocessing

Before sending to TTS:
1. Remove HTML/markdown tags
2. Expand abbreviations (e.g., "Mr." -> "Mister")
3. Convert numbers to words for dates
4. Add pauses with punctuation
5. Handle special characters

Example preprocessing:
```javascript
function preprocessForTTS(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold
    .replace(/\*(.*?)\*/g, '$1')      // Remove italic
    .replace(/\n\n/g, '. ')           // Paragraph breaks
    .replace(/Mr\./g, 'Mister')       // Expand abbreviations
    .replace(/Mrs\./g, 'Missus')
    .trim();
}
```

## Storage Considerations

Audio files are large:
- Average chapter: 2-5 minutes = 2-5 MB per chapter
- Lesson with 5 chapters: ~15-25 MB
- Full course (51 lessons): ~750 MB - 1.2 GB

**Important:** Audio files are NOT tracked in Git LFS. Consider:
- Cloud storage (S3, Firebase Storage)
- CDN delivery
- On-demand generation

## Example Interaction

**User:** "Generate audio for lesson 10"

**Assistant:** I'll generate TTS audio for Lesson 10. Let me first check the lesson content.

*[Reads lesson 10 from data/lessons.ts]*

Lesson 10 has 5 chapters:
1. "The Journey Begins" (450 words)
2. "Crossing the Atlantic" (380 words)
3. "Arriving in America" (520 words)
4. "The New Life" (410 words)
5. "Looking Back" (290 words)

Which voice model would you like?
1. lessac-medium (faster, good quality)
2. ryan-high (slower, higher quality)

*[User selects]*

Generating audio... This may take a few minutes.

*[Generates each chapter]*

**Results:**
- lesson-10-chapter-1.mp3 (3.2 MB)
- lesson-10-chapter-2.mp3 (2.8 MB)
- lesson-10-chapter-3.mp3 (3.9 MB)
- lesson-10-chapter-4.mp3 (3.1 MB)
- lesson-10-chapter-5.mp3 (2.2 MB)

Total: 15.2 MB, generated in 4m 32s

## Technical Notes

- Piper TTS is a fast, local TTS engine
- ONNX models are neural network voice models
- Models tracked with Git LFS (>50 MB each)
- Generation is CPU-bound, GPU not required
- Can batch process multiple lessons

## Success Metrics

A successful audio generation includes:
- All chapters converted to audio
- Consistent audio quality across chapters
- Proper naming convention followed
- Files playable in standard players
- Reasonable file sizes
