# Claude Instructions for History Lesson Creator

## IMMEDIATE ACTION REQUIRED

**CHECK THESE STATUS FILES FIRST:**
- `TTS_GENERATION_STATUS.md` - **ACTIVE** - TTS audio generation quality testing (V2 in progress)
- `IMAGE_GENERATION_STATUS.md` - ✅ **COMPLETE** - All 276 images generated (100% success)
- `TTS_PROJECT_STATUS.md` - Overall TTS project status and working configuration

### Current Priority: TTS Audio Generation Quality
- **Testing V2 output** for Lesson 2 (`Survival_in_Jamestown_Zonos_V2.wav`)
- Quality pipeline includes: Whisper verification, noise reduction, standardized pauses
- See `TTS_GENERATION_STATUS.md` for full details on what was tried and next steps

---

## Project Overview

This is a history education application containing 51 lessons covering American history from 1565 to 1877. Each lesson features:
- Narrative chapters told from a first-person historical perspective
- Flashcards for vocabulary
- Quizzes to test comprehension

## Important Files to Know

### Scripts Documentation
**Always refer to `scripts/SCRIPTS_DOCUMENTATION.md` for detailed documentation on all available scripts**, including:
- `historical_accuracy_checker.py` - Scan lessons for anachronisms
- `export_lessons.py` - Export lessons to text and TTS formats
- `lesson_media_generator.py` - Generate mind maps, infographics, video scripts
- `render_mindmaps.py` - Render mind map images with Graphviz

### Data Files
- `data/lessons.ts` - Master file containing all 51 lessons with chapters, flashcards, and quizzes

### Output Directories
- `lesson-exports/` - Exported text files for reading and TTS
- `lesson-media/` - Generated mind maps, infographics, video scripts
- `accuracy_reports/` - Historical accuracy scan results

## Working with Lessons

### Editing Lesson Content
After editing any lesson content in `data/lessons.ts`, run the following scripts in order:
1. `python scripts/historical_accuracy_checker.py` - Verify no anachronisms
2. `python scripts/export_lessons.py` - Update exports
3. `python scripts/lesson_media_generator.py` - Update media files
4. `python scripts/render_mindmaps.py` - Update mind map images

### Historical Accuracy
The accuracy checker contains a 350+ term timeline database. Be especially careful about:
- References to settlements, people, or events before they existed
- The lesson's time period is specified in its description field
- Some forward-looking references are intentional for educational purposes

## TTS Audio Generation

This project uses Zonos TTS with voice cloning to generate audio narration for lessons.

### Critical Documentation
**READ BEFORE WORKING ON TTS:**
- `TTS_GENERATION_STATUS.md` - **Current session status** - what was tried, what works, next steps
- `TTS_VOICE_TESTING_NOTES.md` - Voice testing attempts, what failed, recommendations
- `TTS_PROJECT_STATUS.md` - Overall TTS project status and working configuration

### Key TTS Scripts (in project root)
| Script | Purpose |
|--------|---------|
| `generate_lesson_verified.py` | Quality-gated generation with Whisper verification |
| `process_chunks_aggressive.py` | Post-processing with noise reduction and precise pauses |
| `concatenate_chunks.py` | Simple chunk concatenation with normalization |
| `analyze_generated_audio.py` | Quality analysis tool (volume, tempo, consistency) |
| `generate_all_lessons.py` | Batch generation (needs quality pipeline integration) |

### Voice References
- `voice_references/selected/` - 10 prepared voice references (all tested, working)
- `voice_references/LibriSpeech/` - Source dataset for voice references

### Generated Audio
- `lessons/*_Zonos_V2.wav` - Latest quality version (with V2 processing)
- `lessons/*_Zonos_Verified.wav` - Whisper-verified version
- `lessons/lesson_XX_verified/` - Individual verified chunks

### TTS Quality Pipeline (Current Best)
```bash
# Step 1: Generate with Whisper verification
python3 generate_lesson_verified.py --lesson N

# Step 2: Apply aggressive processing (noise reduction, precise pauses)
python3 process_chunks_aggressive.py --lesson N
```

### Known Issues & Mitigations
| Issue | Mitigation |
|-------|------------|
| Missing words | Whisper verification, regenerate if WER > 15% |
| Background hums | 120Hz high-pass filter + noisereduce library |
| Inconsistent pauses | Aggressive silence trimming + precise pause insertion |
| Volume variation | Per-chunk LUFS normalization |

## Image Generation ✅ COMPLETE

All 276 historical images have been generated and validated.

### Final Results
- **Lessons 1-2**: 11 images in `batch_session_20260113_195255/keepers/`
- **Lessons 3-51**: 265 images in `batch_session_20260113_150301/keepers/`
- **Total**: 276 images, 100% acceptance rate

### Documentation
- `IMAGE_GENERATION_STATUS.md` - Completion status and regeneration history
- `HISTORICAL_IMAGE_GENERATION_PRD.md` - Full PRD with era guidelines and lessons learned

### Image Generation Pipeline (for reference)
1. **Prompt Generation**: GPT-OS generates historically-accurate image prompts
2. **Image Generation**: Z-Image Turbo via ComfyUI (8 steps, fast)
3. **VLM Evaluation**: Two-pass validation (MiniCPM-V, then Qwen2.5VL)
4. **Threshold**: Average score >= 75 to accept

### Key Scripts
- `scripts/cross_lesson_batch.py` - Full batch pipeline
- `scripts/regenerate_failures.py` - Regenerate failed images
- `scripts/historical_image_gen_loop.py` - Core generation/evaluation functions
- `scripts/era_guidelines.py` - 13 historical era specifications
- `scripts/narrator_specs.py` - 51 narrator demographics

### GPU Memory Management (for future work)
**Must manage GPU memory between phases:**
- Unload ComfyUI before running VLM models
- Unload Ollama models before running ComfyUI
- Use `num_ctx: 8192` for VLM (not 65536 default) to fit in GPU

## Key Constraints

- Lessons must be historically accurate for their time period
- Narrative chapters are written from a first-person perspective of someone living in that era
- Each lesson has a specific narrator character appropriate to the historical context
