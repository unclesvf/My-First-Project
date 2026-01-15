# Fix Anachronisms

## Description
Interactive pipeline to detect anachronistic objects in images and fix them using AI inpainting. Combines Grounding DINO detection, SAM segmentation, and FLUX Fill inpainting for automated correction.

## When to Use
- After `/scan-anachronisms` identifies issues
- When specific images need anachronism removal
- To batch-fix multiple flagged images
- When a typewriter, modern map, or other anachronism appears in generated images

## Capabilities
- Detects anachronistic objects using Grounding DINO
- Generates precise segmentation masks with SAM
- Inpaints with period-appropriate content using FLUX Fill
- Supports interactive confirmation before fixing
- Can process single images or batches
- Saves original, mask, and fixed versions

## Prerequisites
- Dependencies installed via `setup_auto_fix.py`
- ComfyUI running with FLUX Fill model loaded
- SAM model downloaded (`models/sam/sam_vit_h_4b8939.pth`)

## Process

### Step 1: Identify Target Images
Options:
1. Single image from user input
2. All flagged images from previous scan
3. Specific lesson's images
4. Directory of images

### Step 2: Determine Era
Map image filename to era:
```
L1-L2: 1565 (1600s)
L3-L5: 1620 (1600s)
L6-L10: 1630-1760s colonial
L11-L15: 1760s-1776
L16-L20: 1776-1789
L21-L30: 1800s early
L31-L40: 1850-1865
L41-L51: 1865-1920
```

Or ask user to specify era.

### Step 3: Run Detection
```bash
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\scripts"
python auto_fix_anachronisms.py --image [PATH] --era "[ERA]" --dry-run
```

### Step 4: Present Findings for Confirmation
Show user what was detected:
```
## Detected Anachronisms in L10_Ch1.png

| Object | Confidence | Will Replace With |
|--------|------------|-------------------|
| typewriter | 67.55% | Colonial desk items: quill pen, ink pot, ledger |
| keyboard | 51.63% | (included in above) |

**Replacement prompt:** "colonial era items: quill pen, ink pot, ledger book, candle, oil lamp, parchment map of 13 colonies"

Proceed with fix? [Y/n]
```

### Step 5: Execute Fix
If user confirms, run full pipeline:
```bash
python auto_fix_anachronisms.py --image [PATH] --era "[ERA]"
```

This will:
1. Generate segmentation mask around detected objects
2. Save mask to `generated_images/auto_fixed/[name]_mask.png`
3. Run FLUX Fill inpainting via ComfyUI
4. Save fixed image to `generated_images/auto_fixed/[name]_fixed.png`

### Step 6: Verify Fix
After inpainting completes:
1. Show before/after comparison (if possible)
2. Run detection again on fixed image to confirm no remaining anachronisms
3. Report success or issues

### Step 7: Report Results
```markdown
## Fix Results: L10_Ch1.png

**Status:** SUCCESS

### Before:
- Detected: typewriter (67.55%), keyboard (51.63%)
- Era violations: 2

### After:
- Detected: None above threshold
- Era violations: 0

### Files Created:
- Original: `L10_Ch1.png`
- Mask: `generated_images/auto_fixed/L10_Ch1_mask.png`
- Fixed: `generated_images/auto_fixed/L10_Ch1_fixed.png`

### Inpainting Details:
- Model: FLUX Fill Q8 GGUF
- Prompt: "colonial era items: quill pen, ink pot, ledger book..."
- Steps: 28
- Time: ~4 minutes
```

## Batch Mode

For multiple images:
```bash
python auto_fix_anachronisms.py --batch fix_list.json
```

Batch JSON format:
```json
{
  "images": [
    {"path": "L10_Ch1.png", "era": "1760s colonial"},
    {"path": "L15_Ch1.png", "era": "1776"}
  ]
}
```

## Era-Specific Replacement Prompts

### 1600s
"period-appropriate 17th century items, wooden furniture, candles, quill pens, parchment"

### 1700s
"period-appropriate 18th century items, oil lamps, quill pens, parchment, wooden desk"

### 1760s Colonial
"colonial era items: quill pen, ink pot, ledger book, candle, oil lamp, parchment map of 13 colonies"

### 1776 Revolutionary
"Revolutionary era items: quill pen, parchment, 13-colony map, candles, 13-star flag"

### 1800s Early
"early 19th century items: oil lamps, hand-written documents, period maps, wooden furniture"

### 1800s Late
"late 19th century items: gas lamps, early typewriters (after 1870), period photographs, Victorian furnishings"

## Example Usage

**User**: "/fix-anachronisms L10_Ch1.png"

**Assistant**:
```
Scanning L10_Ch1.png for anachronisms...
Era: 1760s colonial (detected from filename)

## Detected Issues:

| Object | Confidence |
|--------|------------|
| typewriter | 67.55% |
| keyboard | 51.63% |

These will be replaced with: "colonial era items: quill pen, ink pot, ledger book, candle"

Proceed with fix? This will:
1. Generate segmentation mask
2. Run FLUX Fill inpainting (~4 minutes)
3. Save fixed image to auto_fixed/
```

**User**: "yes"

**Assistant**: [Runs fix, reports results]

---

**User**: "/fix-anachronisms --batch"

**Assistant**: "I'll fix all flagged images from the last scan. Found 3 images:
- L10_Ch1.png (typewriter)
- L15_Ch1.png (modern map)
- L22_Ch3.png (electric light)

Estimated time: ~12 minutes. Proceed?"

## Error Handling

### If ComfyUI not running:
```
ERROR: ComfyUI not running at http://127.0.0.1:8188
Please start ComfyUI with FLUX Fill model:
  C:\Users\scott\ComfyUI\start_optimized.bat
```

### If FLUX Fill model not found:
```
ERROR: FLUX Fill model not found
Expected: models/unet/flux1-fill-dev-Q8_0.gguf
Download with: python scripts/download_flux_fill.py
```

### If mask generation fails:
```
WARNING: Mask generation failed for L10_Ch1.png
Possible causes:
- Detection boxes too small
- SAM model not loaded
Fallback: Create mask manually in image editor
```

## Integration with Other Skills

- **Before**: Use `/scan-anachronisms` to identify issues
- **After**: Use `/check-batch` if running multiple fixes
- **Alternative**: Use manual `fill_inpaint.py` with custom mask

## Output Locations

| File Type | Location |
|-----------|----------|
| Fixed images | `generated_images/auto_fixed/` |
| Masks | `generated_images/auto_fixed/*_mask.png` |
| Results JSON | `generated_images/auto_fixed/fix_results_*.json` |

## Notes

- Fixing one image takes ~4-5 minutes (FLUX Fill generation time)
- Original images are never modified - fixed versions are saved separately
- Masks are saved for manual review/adjustment if needed
- Re-run scan after fix to verify success
