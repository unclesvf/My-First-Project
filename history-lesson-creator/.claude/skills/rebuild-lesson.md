# Rebuild Lesson

## Description
Regenerate all assets for a single lesson from scratch. Handles image regeneration, TTS audio, and validation in one coordinated workflow. Use when a lesson needs complete refresh due to content changes or quality issues.

## When to Use
- After significant content changes to a lesson
- When multiple images in a lesson need regeneration
- When audio needs re-recording after text changes
- To fix systematic issues affecting one lesson
- When starting fresh is easier than patching

## Capabilities
- Regenerates all chapter images
- Regenerates TTS audio narration
- Validates content before and after
- Tracks progress through rebuild phases
- Preserves originals as backups
- Coordinates multiple generation tools

## Process

### Step 1: Identify Lesson
Get lesson number and confirm scope:
```markdown
## Rebuild Lesson [N]

**Title:** [Lesson Title]
**Chapters:** [N] chapters
**Current Assets:**
- Images: [N] files
- Audio: [exists/missing]

### What needs rebuilding?
1. **Full rebuild** - Images + Audio + Validation
2. **Images only** - Regenerate all chapter images
3. **Audio only** - Regenerate TTS narration
4. **Selective** - Choose specific chapters
```

### Step 2: Backup Existing Assets
```bash
# Create backup folder
$lesson = "10"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "generated_images/backups/lesson_${lesson}_${timestamp}"
mkdir -p $backupDir

# Backup images
Copy-Item "generated_images/batch_session_*/keepers/L${lesson}_*.png" $backupDir/
Copy-Item "public/images/lessons/lesson-${lesson}-*.png" $backupDir/

# Backup audio
Copy-Item "lessons/*lesson*${lesson}*.wav" $backupDir/

Write-Host "Backed up to: $backupDir"
```

### Step 3: Validate Content First
```bash
# Check lesson content is ready
python scripts/historical_accuracy_checker.py --lesson [N]
```

```markdown
### Pre-Rebuild Validation:
| Check | Status |
|-------|--------|
| Lesson file exists | ✅ |
| All chapters have content | ✅ |
| All chapters have image prompts | ✅ |
| No anachronisms in text | ✅ |
| Era consistency | ✅ |

Ready to proceed with rebuild.
```

### Step 4: Regenerate Images
```bash
# Option A: Local FLUX generation
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\scripts"
python flux2_batch_generate.py --lesson [N]

# Option B: Export for Higgsfield
python export_prompts_for_higgsfield.py --lesson [N]
# Then use web UI or API
```

Monitor progress:
```markdown
### Image Generation Progress:
| Chapter | Status | Time |
|---------|--------|------|
| 1 | ✅ Complete | 4:32 |
| 2 | ✅ Complete | 4:28 |
| 3 | 🔄 Generating | - |
| 4 | ⏳ Pending | - |
| 5 | ⏳ Pending | - |
| 6 | ⏳ Pending | - |
```

### Step 5: Review Generated Images
```markdown
### Image Review Required:

New images generated in:
`C:\Users\scott\ComfyUI\output\L[N]_*.png`

**Quick Review:**
1. Check each image for quality
2. Run anachronism scan: `/scan-anachronisms L[N]`
3. Mark any needing fixes

Proceed with current images? [Y/review/redo]
```

### Step 6: Regenerate TTS Audio
```bash
# Generate in WSL
wsl -d Ubuntu -e bash -c "
cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator
python3 generate_lesson_verified.py --lesson [N]
python3 process_chunks_aggressive.py --lesson [N]
"
```

```markdown
### TTS Generation Progress:
| Phase | Status | Time |
|-------|--------|------|
| Chunk 1/6 | ✅ | 1:42 |
| Chunk 2/6 | ✅ | 1:38 |
| Chunk 3/6 | 🔄 | - |
| Whisper verify | ⏳ | - |
| Post-process | ⏳ | - |
```

### Step 7: Final Validation
```bash
# Run full validation
# (conceptually - uses validate-lesson skill logic)
```

```markdown
### Post-Rebuild Validation:

| Component | Before | After | Status |
|-----------|--------|-------|--------|
| Images | 6 | 6 | ✅ Regenerated |
| Audio | 1 file | 1 file | ✅ Regenerated |
| Anachronisms | 0 | 0 | ✅ Clean |
| Content | Valid | Valid | ✅ Unchanged |

**Rebuild Status: ✅ COMPLETE**
```

### Step 8: Deploy New Assets
```bash
# Move images to deployment
$lesson = "10"
Get-ChildItem "C:\Users\scott\ComfyUI\output\L${lesson}_*.png" | ForEach-Object {
    if ($_.Name -match 'L(\d+)_Ch(\d+)') {
        $lessonNum = $matches[1].PadLeft(2, '0')
        $chapter = $matches[2]
        $dest = "public\images\lessons\lesson-$lessonNum-chapter-$chapter.png"
        Copy-Item $_.FullName $dest -Force
        Write-Host "Deployed: $dest"
    }
}
```

### Step 9: Report Results
```markdown
## Lesson [N] Rebuild Complete

**Lesson:** [Title]
**Duration:** [total time]

### Summary:
| Asset | Status | Location |
|-------|--------|----------|
| Images (6) | ✅ Regenerated | `public/images/lessons/` |
| Audio | ✅ Regenerated | `lessons/lesson_[N]_*.wav` |
| Backups | ✅ Preserved | `generated_images/backups/` |

### Changes:
- 6 new images generated
- 1 new audio file (12:34 duration)
- Old assets backed up

### Verification:
- ✅ All images pass quality check
- ✅ No anachronisms detected
- ✅ Audio Whisper-verified
- ✅ Deployed to public folder

### Next Steps:
1. Run `npm run build` to include new assets
2. Test lesson in browser
3. Deploy to production when ready
```

## Example Usage

**User**: "/rebuild-lesson 10"

**Assistant**:
```
## Rebuild Lesson 10: The Stamp Act Crisis

### Current Assets:
| Asset | Count | Status |
|-------|-------|--------|
| Images | 6 | Exists |
| Audio | 1 | Exists |

### Rebuild Options:
1. **Full rebuild** - Images + Audio (~45 min)
2. **Images only** - 6 chapters (~27 min)
3. **Audio only** - TTS regeneration (~18 min)
4. **Cancel** - Keep current assets

Which rebuild type?
```

**User**: "1"

**Assistant**:
```
## Starting Full Rebuild: Lesson 10

### Phase 1: Backup
✅ Backed up 6 images to `backups/lesson_10_20260115_203000/`
✅ Backed up audio file

### Phase 2: Validation
✅ Content validated - no issues found

### Phase 3: Image Generation
Starting FLUX.2 Dev batch for 6 images...

| Chapter | Title | Status |
|---------|-------|--------|
| 1 | The Sugar Act | 🔄 Generating... |
| 2 | The Stamp Act | ⏳ Queued |
| 3 | Colonial Resistance | ⏳ Queued |
| 4 | The Sons of Liberty | ⏳ Queued |
| 5 | Repeal | ⏳ Queued |
| 6 | Legacy | ⏳ Queued |

Estimated time: ~27 minutes
```

---

**User**: "/rebuild-lesson 5 --images-only"

**Assistant**:
```
## Rebuild Images: Lesson 5

**Lesson:** Survival in Jamestown
**Chapters:** 5 images to regenerate

### Backup Created:
`backups/lesson_05_20260115_203500/`

### Generation Method:
1. **Local FLUX** (~22 min) - Recommended
2. **Higgsfield API** (~$0.28)
3. **Higgsfield Web** (free, manual)

Which method?
```

## Rebuild Options

### Full Rebuild
- Regenerates all images
- Regenerates TTS audio
- Full validation before and after
- Estimated: 35-50 minutes per lesson

### Images Only
- Regenerates chapter images
- Validates image quality
- Scans for anachronisms
- Estimated: 20-30 minutes per lesson

### Audio Only
- Regenerates TTS narration
- Whisper verification
- Post-processing
- Estimated: 15-20 minutes per lesson

### Selective
- Choose specific chapters
- Mix of image/audio
- Custom rebuild scope

## Integration with Other Skills

- **Before**: Use `/validate-lesson` to identify issues
- **During images**: Use `/check-batch` for progress
- **After images**: Use `/scan-anachronisms` to verify
- **After audio**: Listen and verify quality
- **Finally**: Use `/organize-images` to deploy

## Safety Features

### Automatic Backups
- All existing assets backed up before rebuild
- Backups stored with timestamp
- Can restore if rebuild fails

### Validation Gates
- Content validated before generation
- Images scanned for anachronisms
- Audio Whisper-verified

### Rollback
```bash
# Restore from backup if needed
$backup = "generated_images/backups/lesson_10_20260115_203000"
Copy-Item "$backup/*.png" "public/images/lessons/" -Force
Copy-Item "$backup/*.wav" "lessons/" -Force
```

## Notes

- Always backs up before rebuilding
- Full rebuild takes 35-50 minutes
- Can be interrupted and resumed
- Original files preserved in backups/
- Run validation after to confirm success
- Consider rebuilding during off-hours for large lessons
