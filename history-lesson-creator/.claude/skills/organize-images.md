# Organize Images

## Description
Move reviewed and approved images to their final deployment locations. Handles renaming, organizing by lesson, and preparing images for website deployment.

## When to Use
- After `/review-images` has categorized images as keepers
- When preparing images for production deployment
- To consolidate images from multiple batch sessions
- To rename images to final naming convention
- Before deploying to website/CDN

## Capabilities
- Move keepers to deployment folder
- Rename images to standard format
- Organize by lesson number
- Generate image manifest/index
- Verify all lessons have required images
- Create deployment-ready package

## Process

### Step 1: Identify Source Images
Check current image locations:
```bash
# Main batch (L3-51)
powershell -Command "(Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\generated_images\batch_session_20260113_150301\keepers\*.png').Count"

# Lessons 1-2 batch
powershell -Command "(Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\generated_images\batch_session_20260113_195255\keepers\*.png').Count"

# Reviewed keepers
powershell -Command "(Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\generated_images\reviewed\keepers\*.png').Count"

# Auto-fixed images
powershell -Command "(Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\generated_images\auto_fixed\*_fixed.png').Count"
```

### Step 2: Determine Destination
Ask user for deployment target:
1. **Local public folder** - `public/images/lessons/`
2. **CDN staging** - Prepare for upload
3. **Custom location** - User-specified path

### Step 3: Show Organization Plan
```markdown
## Image Organization Plan

### Source Locations:
| Source | Images | Status |
|--------|--------|--------|
| batch_session_20260113_150301/keepers | 252 | Ready |
| batch_session_20260113_195255/keepers | 24 | Ready |
| reviewed/keepers | 0 | Empty |
| auto_fixed | 3 | Fixed images |

### Destination:
`public/images/lessons/`

### Naming Convention:
`lesson-{NN}-chapter-{N}.png`

Examples:
- `L10_Ch1_20260114_*.png` → `lesson-10-chapter-1.png`
- `L3_Ch2_20260113_*.png` → `lesson-03-chapter-2.png`

### Actions:
1. Create destination folders
2. Copy and rename 276 images
3. Replace 3 images with fixed versions
4. Generate manifest.json
5. Verify all lessons complete

Proceed? [Y/n]
```

### Step 4: Execute Organization
```bash
# Create destination structure
mkdir -p "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\public\images\lessons"

# Copy with renaming (PowerShell)
powershell -Command "
$files = Get-ChildItem 'generated_images\batch_session_*\keepers\*.png' -Recurse
foreach ($file in $files) {
    if ($file.Name -match 'L(\d+)_Ch(\d+)') {
        $lesson = $matches[1].PadLeft(2, '0')
        $chapter = $matches[2]
        $newName = \"lesson-$lesson-chapter-$chapter.png\"
        Copy-Item $file.FullName \"public\images\lessons\$newName\"
    }
}
"
```

### Step 5: Apply Fixed Images
Replace originals with fixed versions:
```bash
# Copy fixed images over originals
powershell -Command "
$fixed = Get-ChildItem 'generated_images\auto_fixed\*_fixed.png'
foreach ($file in $fixed) {
    if ($file.Name -match 'L(\d+)_Ch(\d+)') {
        $lesson = $matches[1].PadLeft(2, '0')
        $chapter = $matches[2]
        $dest = \"public\images\lessons\lesson-$lesson-chapter-$chapter.png\"
        Copy-Item $file.FullName $dest -Force
        Write-Host \"Replaced: $dest\"
    }
}
"
```

### Step 6: Generate Manifest
Create `public/images/lessons/manifest.json`:
```json
{
  "generated": "2026-01-14T20:00:00Z",
  "total_images": 276,
  "lessons": [
    {
      "lesson": 1,
      "title": "St. Augustine",
      "images": [
        "lesson-01-chapter-1.png",
        "lesson-01-chapter-2.png"
      ]
    }
  ]
}
```

### Step 7: Verify Completeness
```bash
# Check all lessons have images
powershell -Command "
1..51 | ForEach-Object {
    $lesson = $_.ToString().PadLeft(2, '0')
    $count = (Get-ChildItem \"public\images\lessons\lesson-$lesson-*.png\").Count
    if ($count -eq 0) {
        Write-Host \"MISSING: Lesson $lesson\" -ForegroundColor Red
    } else {
        Write-Host \"Lesson $lesson : $count images\" -ForegroundColor Green
    }
}
"
```

### Step 8: Report Results
```markdown
## Image Organization Complete

### Summary:
| Metric | Count |
|--------|-------|
| Total images | 276 |
| Lessons covered | 51/51 |
| Fixed images applied | 3 |

### Destination:
`public/images/lessons/`

### Files Created:
- 276 image files (renamed)
- manifest.json (image index)

### Verification:
✅ All 51 lessons have images
✅ Naming convention applied
✅ Fixed images replaced originals

### Next Steps:
1. Run `npm run build` to include in bundle
2. Deploy to production
3. Verify images load on website
```

## Example Usage

**User**: "/organize-images"

**Assistant**:
```
## Image Organization

### Current Image Inventory:
| Location | Count | Status |
|----------|-------|--------|
| Batch 1 keepers (L3-51) | 252 | ✅ Ready |
| Batch 2 keepers (L1-2) | 24 | ✅ Ready |
| Auto-fixed | 3 | ✅ Ready to replace |

**Total:** 276 images ready for deployment

### Where should I organize these?
1. **public/images/lessons/** (recommended for Next.js)
2. **Custom location**
3. **Just rename in place** (no move)
```

---

**User**: "/organize-images --verify"

**Assistant**:
```
## Image Verification

Checking public/images/lessons/...

### Results:
| Lesson | Expected | Found | Status |
|--------|----------|-------|--------|
| 1 | 6 | 6 | ✅ |
| 2 | 6 | 6 | ✅ |
| 3 | 5 | 5 | ✅ |
...
| 51 | 4 | 4 | ✅ |

**Total:** 276/276 images in place ✅

All lessons have their required images.
```

## Naming Conventions

### Input Format (from generation):
```
L{lesson}_Ch{chapter}_{date}_{time}_{seed}_.png
Example: L10_Ch1_20260114_152512_00001_.png
```

### Output Format (for deployment):
```
lesson-{NN}-chapter-{N}.png
Example: lesson-10-chapter-1.png
```

### Special Cases:
- Fixed images: `L10_Ch1_fixed.png` → `lesson-10-chapter-1.png`
- Multiple versions: Keep only the approved/fixed version

## Output Locations

| Output | Location |
|--------|----------|
| Deployed images | `public/images/lessons/` |
| Manifest | `public/images/lessons/manifest.json` |
| Organization log | `generated_images/organization_log.json` |

## Integration with Other Skills

- **Before**: Use `/review-images` to categorize keepers
- **Before**: Use `/fix-anachronisms` to fix issues
- **After**: Use `/deploy` to push to production
- **Related**: Use `/project-status` to verify completion

## Notes

- Original images are copied, not moved (preserves source)
- Fixed images automatically replace originals
- Manifest enables programmatic image loading
- Run verification after to ensure completeness
- Images are optimized for web during Next.js build
