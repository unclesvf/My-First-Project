# Review Images

## Description
Interactive image quality review workflow for generated historical images. Allows quick assessment, categorization, and organization of images into keep/reject/redo categories.

## When to Use
- After batch image generation completes
- To quality-check images before deployment
- To identify images needing regeneration
- To organize images into final folders
- Before running anachronism detection

## Capabilities
- Lists generated images for review
- Shows image metadata (lesson, chapter, era)
- Supports keep/reject/redo categorization
- Moves images to appropriate folders
- Generates redo list for failed images
- Tracks review progress

## Process

### Step 1: Identify Images to Review
Options:
1. Today's batch: `C:\Users\scott\ComfyUI\output\L*_20260114*.png`
2. Specific lesson: `L10_*.png`
3. Custom directory
4. Unreviewed images only

### Step 2: Get Image Count
```bash
powershell -Command "(Get-ChildItem 'C:\Users\scott\ComfyUI\output\L*_Ch*_20260114*.png').Count"
```

### Step 3: Present Review Interface
For each image, show:
```markdown
## Image Review: L10_Ch1_20260114_152512_00001_.png

**Lesson:** 10 - The Stamp Act Crisis
**Chapter:** 1 - The Sugar Act
**Era:** 1760s colonial America
**Generated:** 2026-01-14 15:25:12

**File:** `C:\Users\scott\ComfyUI\output\L10_Ch1_20260114_152512_00001_.png`

### Quick Actions:
- [K] Keep - Move to keepers folder
- [R] Reject - Move to rejects folder
- [D] Redo - Add to regeneration list
- [S] Skip - Review later
- [A] Anachronism scan - Check for issues
- [V] View - Open image in viewer
- [Q] Quit review

Your choice:
```

### Step 4: Process User Choice

#### Keep
```bash
# Move to keepers folder
mkdir -p "generated_images/reviewed/keepers"
move "ComfyUI/output/L10_Ch1_*.png" "generated_images/reviewed/keepers/"
```

#### Reject
```bash
# Move to rejects folder
mkdir -p "generated_images/reviewed/rejects"
move "ComfyUI/output/L10_Ch1_*.png" "generated_images/reviewed/rejects/"
```

#### Redo
Add to redo list JSON:
```json
{
  "redo_list": [
    {
      "image_id": "L10_Ch1",
      "reason": "User marked for redo",
      "original_path": "...",
      "timestamp": "2026-01-14T19:30:00"
    }
  ]
}
```

#### Anachronism Scan
Run quick scan:
```bash
python auto_fix_anachronisms.py --image [PATH] --era "[ERA]" --dry-run
```

### Step 5: Track Progress
```markdown
## Review Progress

**Total:** 98 images
**Reviewed:** 45
**Remaining:** 53

### Categories:
| Status | Count |
|--------|-------|
| Kept | 38 |
| Rejected | 4 |
| Redo | 3 |
| Skipped | 0 |

### Redo List:
1. L10_Ch1 - "Typewriter visible"
2. L15_Ch1 - "Modern map on wall"
3. L22_Ch3 - "Electric light anachronism"
```

### Step 6: Generate Final Report
```markdown
## Review Complete

**Session:** 2026-01-14
**Images Reviewed:** 98

### Summary:
| Category | Count | Location |
|----------|-------|----------|
| Keepers | 91 | `generated_images/reviewed/keepers/` |
| Rejects | 4 | `generated_images/reviewed/rejects/` |
| Redo | 3 | See redo_list.json |

### Redo List Generated:
`generated_images/reviewed/redo_list_20260114.json`

### Next Steps:
1. Run `/fix-anachronisms` on redo list items
2. Regenerate rejected images with updated prompts
3. Copy keepers to final deployment folder
```

## Batch Review Mode

For quick batch review without individual confirmation:
```
/review-images --batch --auto-keep
```

This will:
1. Scan all images
2. Auto-keep images with no detected issues
3. Flag only problematic images for manual review

## Review Criteria Guidelines

### Keep (High Quality)
- Historically accurate for the era
- Good composition and lighting
- Clear, detailed rendering
- No obvious anachronisms
- Matches lesson content

### Reject (Poor Quality)
- Major rendering issues
- Wrong composition/subject
- Doesn't match prompt
- Unusable quality

### Redo (Fixable Issues)
- Anachronisms detected (typewriter, modern items)
- Minor issues that can be inpainted
- Good overall but specific problems
- Worth fixing rather than regenerating

## Example Usage

**User**: "/review-images"

**Assistant**: "I found 98 images from today's batch. How would you like to review?

1. **One by one** - Review each image individually
2. **Quick scan** - Show summary, flag issues only
3. **Anachronism check** - Run detection on all, show flagged
4. **By lesson** - Review one lesson at a time"

**User**: "3"

**Assistant**: [Runs anachronism detection on all images]
```
## Anachronism Scan Complete

**Scanned:** 98 images
**Clean:** 95 images (auto-kept)
**Flagged:** 3 images (need review)

### Flagged Images:

1. **L10_Ch1** - typewriter (67%), keyboard (52%)
2. **L15_Ch1** - modern map (64%), 50 states (45%)
3. **L22_Ch3** - electric light (41%)

Would you like to:
1. Review flagged images one by one
2. Auto-fix all flagged images
3. Export redo list
```

## Output Locations

| Output | Location |
|--------|----------|
| Keepers | `generated_images/reviewed/keepers/` |
| Rejects | `generated_images/reviewed/rejects/` |
| Redo list | `generated_images/reviewed/redo_list_*.json` |
| Review log | `generated_images/reviewed/review_log_*.json` |

## Integration with Other Skills

- **Before**: Use `/check-batch` to ensure generation complete
- **During**: Use `/scan-anachronisms` on suspicious images
- **After**: Use `/fix-anachronisms` on redo list items
- **Finally**: Deploy keepers to website

## Notes

- Images are moved, not copied (saves disk space)
- Original paths recorded in review log for reference
- Redo list can be fed directly to batch regeneration
- Review can be paused and resumed
- Progress saved automatically
