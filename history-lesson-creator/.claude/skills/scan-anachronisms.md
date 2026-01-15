# Scan Anachronisms

## Description
Quick scan of generated images for anachronistic objects using the Grounding DINO AI detection model. Provides a report of detected issues without automatically fixing them, allowing review before taking action.

## When to Use
- After batch image generation completes
- To review specific images for historical accuracy
- Before finalizing images for the lesson website
- When user suspects an image contains anachronisms
- As a quality check before deploying content

## Capabilities
- Scans single images or entire directories
- Detects era-inappropriate objects (typewriters, modern maps, electronics, etc.)
- Reports confidence scores for each detection
- Categorizes findings by severity
- Generates actionable reports
- Supports multiple historical eras (1600s, 1700s, 1760s colonial, 1776, 1800s)

## Prerequisites
- Python packages installed via `setup_auto_fix.py`
- Grounding DINO model (auto-downloads on first use)
- Images to scan in accessible directory

## Process

### Step 1: Determine Scan Scope
Ask user or infer:
- Single image path, or
- Directory to scan, or
- Batch session folder

### Step 2: Determine Historical Era
Map lessons to eras:
```
Lessons 1-2: 1565 Spanish Colonial (1600s)
Lessons 3-5: 1620 Plymouth Colony (1600s)
Lessons 6-10: 1630-1760s Colonial America
Lessons 11-15: 1760s-1776 Revolutionary Era
Lessons 16-20: 1776-1789 Revolution/Constitution
Lessons 21-30: 1800s early (1800-1850)
Lessons 31-40: 1850-1865 Civil War Era
Lessons 41-51: 1865-1920 Reconstruction/Progressive
```

### Step 3: Run Detection Script
Execute the anachronism detection in dry-run mode:
```bash
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\scripts"
python auto_fix_anachronisms.py --image [PATH] --era "[ERA]" --dry-run
```

For directory scan:
```bash
python auto_fix_anachronisms.py --dir [DIRECTORY] --era "[ERA]" --dry-run
```

### Step 4: Parse Detection Results
The script outputs detections like:
```
Found 8 potential anachronisms:
  - typewriter: 67.55% confidence
  - keyboard: 51.63% confidence
  - modern glasses frames: 52.36% confidence
```

Categorize by confidence:
- **High (>60%)**: Likely real anachronisms - flag for review
- **Medium (40-60%)**: Possible issues - manual review recommended
- **Low (<40%)**: Probably false positives - can likely ignore

### Step 5: Generate Scan Report

Output format:
```markdown
## Anachronism Scan Report

**Scanned:** [X] images
**Era:** [Historical Era]
**Date:** [Scan Date]

---

### Summary
| Category | Count |
|----------|-------|
| High Confidence (>60%) | X |
| Medium Confidence (40-60%) | Y |
| Low Confidence (<40%) | Z |
| Clean Images | W |

---

### High Confidence Detections (Action Required)

#### Image: L10_Ch1.png
**Era:** 1760s colonial
**Detections:**
| Object | Confidence | Severity |
|--------|------------|----------|
| typewriter | 67.55% | CRITICAL |
| keyboard | 51.63% | HIGH |

**Recommendation:** Run `/fix-anachronisms` on this image

---

#### Image: L15_Ch1.png
**Era:** 1776
**Detections:**
| Object | Confidence | Severity |
|--------|------------|----------|
| 50 state map | 64.23% | CRITICAL |
| modern US map | 58.12% | HIGH |

**Recommendation:** Replace with 13-colony map

---

### Medium Confidence (Review Recommended)

[List images with 40-60% detections]

---

### Clean Images (No Issues Found)

[List images with no detections above threshold]

---

### Next Steps

1. Review high-confidence detections manually
2. Run `/fix-anachronisms` on confirmed issues
3. Re-scan after fixes to verify
```

### Step 6: Offer Next Actions

After presenting the report, offer:
> "I found [X] images with potential anachronisms. Would you like me to:
> 1. Fix all high-confidence issues automatically (`/fix-anachronisms`)
> 2. Show detailed view of a specific image
> 3. Export report to file
> 4. Scan additional images"

## Era-Specific Detection Lists

### 1600s (Spanish/Early Colonial)
Detect: typewriter, computer, telephone, car, television, radio, photograph, camera, wristwatch, plastic, electric light, lightbulb

### 1700s (Colonial)
Detect: typewriter, computer, telephone, car, television, radio, photograph, camera, modern map with all US states, plastic, wristwatch

### 1760s Colonial America
Detect: typewriter, keyboard, computer, telephone, car, automobile, television, radio, photograph, camera, wristwatch, modern United States map, 50 state map, plastic, zipper, electric light, lightbulb

### 1776 Revolutionary Era
Detect: typewriter, computer, telephone, car, television, radio, photograph, camera, wristwatch, modern United States map, map showing western states, plastic, electric light, lightbulb, modern flag with 50 stars

### 1800s Early (1800-1850)
Detect: typewriter (before 1867), computer, telephone (before 1876), car, television, radio, modern camera, digital watch, plastic, electric lights

### 1800s Late (1850-1900)
Detect: computer, television, radio, car (before 1885), modern camera, digital watch, plastic, smartphone, modern appliances

## Example Usage

**User**: "/scan-anachronisms"

**Assistant**: "I'll scan for anachronisms. What would you like to scan?
1. All images from today's batch (`C:\Users\scott\ComfyUI\output\L*_20260114*.png`)
2. A specific image (provide path)
3. A specific lesson's images"

**User**: "1"

**Assistant**: [Runs scan on all today's images, generates report]

---

**User**: "/scan-anachronisms L10_Ch1.png"

**Assistant**: [Scans specific image]
```
## Scan Result: L10_Ch1.png

**Era:** 1760s colonial (auto-detected from filename)

### Detections Found: 3

| Object | Confidence | Action |
|--------|------------|--------|
| typewriter | 67.55% | FIX REQUIRED |
| keyboard | 51.63% | Review |
| modern glasses | 52.36% | Review |

The **typewriter** detection at 67.55% confidence is a confirmed anachronism.
Typewriters weren't invented until 1867, over 100 years after this scene.

**Recommendation:** Run `/fix-anachronisms L10_Ch1.png` to automatically replace the typewriter with period-appropriate items (quill pen, ink pot, ledger).
```

## Threshold Guidelines

| Threshold | Use Case |
|-----------|----------|
| 0.25 | Comprehensive scan - catches more but more false positives |
| 0.40 | Balanced (default) - good accuracy with fewer false positives |
| 0.50 | Strict - only high-confidence detections |
| 0.60 | Very strict - almost certainly real anachronisms |

Adjust threshold with `--threshold` flag:
```bash
python auto_fix_anachronisms.py --image img.png --era "1776" --threshold 0.50 --dry-run
```

## Integration with Other Skills

- **Before this skill**: Use `/check-batch` to ensure generation is complete
- **After this skill**: Use `/fix-anachronisms` on flagged images
- **Alternative**: Use `/review-images` for manual visual inspection

## Output Files

Scan results can be saved to:
- Console output (default)
- JSON report: `generated_images/auto_fixed/scan_results_<timestamp>.json`
- Markdown report: `generated_images/auto_fixed/scan_report_<timestamp>.md`

## Notes

- First scan may take longer as Grounding DINO model downloads (~400MB)
- GPU acceleration significantly speeds up scanning
- False positives are common at lower thresholds - always review before fixing
- Some detections like "modern glasses" may be false positives on period-appropriate spectacles
