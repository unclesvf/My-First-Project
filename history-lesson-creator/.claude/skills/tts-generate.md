# TTS Generate

## Description
Text-to-speech audio generation pipeline for lesson narration. Uses Zonos TTS with Whisper verification for high-quality, historically-appropriate narration.

## When to Use
- To generate audio narration for lessons
- After TTS quality has been approved (V2 testing)
- To regenerate audio for specific lessons
- To batch generate all remaining lessons

## Capabilities
- Generate TTS audio for individual lessons
- Batch generate multiple lessons
- Whisper verification for accuracy
- Noise reduction and pause processing
- Progress tracking for long batches

## Prerequisites
- WSL environment configured
- Zonos TTS installed and working
- Voice reference files in place
- V2 quality approved by user

## Process

### Step 1: Check TTS Status
```bash
# Check existing audio files
powershell -Command "(Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\lessons\*.wav').Count"

# Check which lessons have audio
powershell -Command "Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\lessons\' -Filter '*.wav' | Select-Object Name"
```

### Step 2: Determine Generation Scope
Ask user:
1. **Single lesson** - Generate audio for one lesson
2. **Range** - Generate for lessons N through M
3. **All remaining** - Generate for all lessons missing audio
4. **Regenerate** - Redo specific lesson(s)

### Step 3: Estimate Time
```markdown
## Generation Time Estimate

**Lessons to generate:** [N]
**Average per lesson:** ~15-20 minutes
**Estimated total:** [N × 17.5 minutes]

### Breakdown:
- Chunk generation: ~8-10 min/lesson
- Whisper verification: ~3-5 min/lesson
- Post-processing: ~2-3 min/lesson
- Buffer for retries: ~2 min/lesson
```

### Step 4: Run Generation (in WSL)
```bash
# Single lesson
wsl -d Ubuntu -e bash -c "cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator && python3 generate_lesson_verified.py --lesson N"

# Process chunks
wsl -d Ubuntu -e bash -c "cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator && python3 process_chunks_aggressive.py --lesson N"
```

### Step 5: Monitor Progress
```markdown
## TTS Generation Progress

**Status:** Running
**Current Lesson:** 5 - Survival in Jamestown
**Phase:** Chunk generation (3/12 chunks)

### Completed:
- Lesson 1 ✓
- Lesson 2 ✓
- Lesson 3 ✓
- Lesson 4 ✓

### Remaining: 47 lessons
### Estimated Time Left: ~13 hours
```

### Step 6: Verify Output
After generation:
```bash
# Check output file exists and size
powershell -Command "Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\lessons\lesson_N_*.wav' | Select-Object Name, @{N='Size(MB)';E={[math]::Round($_.Length/1MB,2)}}"

# Play sample (if possible)
# User should verify quality
```

### Step 7: Report Results
```markdown
## TTS Generation Complete

**Lesson:** 5 - Survival in Jamestown
**Output:** `lessons/lesson_5_survival_in_jamestown.wav`
**Duration:** 12:34
**File Size:** 45.2 MB

### Quality Checks:
- ✓ Whisper verification passed
- ✓ No audio artifacts detected
- ✓ Pauses properly inserted

### Next Steps:
1. Listen to verify quality
2. Run next lesson or continue batch
```

## Batch Generation

For generating all 51 lessons:
```markdown
## Batch TTS Generation

**WARNING:** Full batch takes ~13-17 hours

### Recommended Approach:
1. Run overnight or during work hours
2. Generate in batches of 10-15 lessons
3. Review quality periodically

### Commands:
```bash
# Generate lessons 1-10
wsl -d Ubuntu -e bash -c "cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator && python3 batch_tts_generate.py --start 1 --end 10"

# Resume from lesson N
wsl -d Ubuntu -e bash -c "cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator && python3 batch_tts_generate.py --start N"
```

### Progress File:
`lessons/tts_generation_progress.json`
```

## Example Usage

**User**: "/tts-generate"

**Assistant**:
```
## TTS Audio Generation

### Current Status:
- **Audio files:** 1/51 lessons complete
- **Test file:** `Survival_in_Jamestown_Zonos_V2.wav` (pending approval)

### Before Generating:
⚠️ Has V2 quality been approved? The test file needs user review before batch generation.

### Options:
1. **Review test file** - Listen to V2 sample first
2. **Single lesson** - Generate one lesson (test)
3. **Batch generate** - Start full batch (~13-17 hours)

Which would you like?
```

---

**User**: "/tts-generate lesson 10"

**Assistant**:
```
## Generating TTS for Lesson 10

**Lesson:** The Stamp Act Crisis
**Chapters:** 6 narrative sections
**Estimated time:** ~15-20 minutes

### Running in WSL...
[Executes generation commands]

### Progress:
- Generating chunks... (1/6)
```

## Output Locations

| Output | Location |
|--------|----------|
| Final audio | `lessons/lesson_N_[title].wav` |
| Chunks | `lessons/chunks/lesson_N/` |
| Progress log | `lessons/tts_generation_progress.json` |

## Troubleshooting

### WSL Not Available
```
Ensure WSL is installed and Ubuntu distribution is set up:
wsl --list --verbose
```

### Out of Memory
```
TTS can be memory-intensive. Close other applications.
Consider generating one lesson at a time.
```

### Whisper Verification Fails
```
Chunk may need regeneration with adjusted parameters.
Check logs in lessons/chunks/lesson_N/verification_log.txt
```

## Integration with Other Skills

- **Before**: Use `/validate-lesson` to ensure content is ready
- **After**: Use `/project-status` to see overall completion
- **Related**: TTS documentation in `TTS_GENERATION_STATUS.md`

## Notes

- TTS generation runs in WSL (Linux environment)
- Each lesson takes 15-20 minutes on average
- Full batch of 51 lessons: ~13-17 hours
- Quality should be verified periodically during batch runs
- V2 pipeline includes Whisper verification for accuracy
