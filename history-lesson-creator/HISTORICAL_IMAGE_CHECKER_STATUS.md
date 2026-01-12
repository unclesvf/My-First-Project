# Historical Image Accuracy Checker - Project Status

**Last Updated:** 2026-01-12
**Status:** MVP Complete, Ready for Iteration

---

## Overview

Two-stage VLM pipeline using Ollama to evaluate AI-generated images for historical accuracy. Designed to filter out anachronistic images from AI generation workflows.

## Current Implementation

### What's Working

- **First Pass Evaluation**: Llama 3.2 Vision scans images and scores 0-100
- **Second Pass Evaluation**: Qwen2.5-VL provides detailed scrutiny for images passing threshold
- **JSON Output**: Individual `.accuracy.json` files saved next to each image
- **PDF Reports**: Color-coded summary PDF with green (keeper), yellow (borderline), red (rejected)
- **CLI Interface**: Full argument parsing with `--folder`, `--era`, `--threshold`, `--output`, `--quiet`
- **Auto-detection**: Automatically finds most recent session in `generated_images/` if no folder specified

### Files Created

```
scripts/
  historical_image_accuracy_checker.py    # Main script (340 lines)
  SCRIPTS_DOCUMENTATION.md                # Updated with new script docs

generated_images/session_20260109_154012/
  *.accuracy.json                         # Per-image evaluation results
  accuracy_report_20260112_124026.pdf     # Summary PDF
```

### Dependencies Installed

| Package | Version | Purpose |
|---------|---------|---------|
| reportlab | 4.4.7 | PDF generation |
| pillow | 12.1.0 | Image handling (pre-existing) |
| requests | 2.32.5 | Ollama API calls (pre-existing) |
| ollama | 0.6.1 | Python client (pre-existing) |

### Ollama Models Installed

| Model | Size | Role |
|-------|------|------|
| llama3.2-vision:latest | 7.8 GB | First pass (quick screening) |
| qwen2.5vl:latest | 6.0 GB | Second pass (detailed analysis) |

---

## Test Results

Ran on 6 images for era "1565 Spanish colonial Florida" with threshold 70:

| Image | First Pass | Second Pass | Final | Status |
|-------|------------|-------------|-------|--------|
| chapter_2_v2.png | 80 | Timeout | 80 | Partial |
| chapter_2_v3.png | 80 | Timeout | 80 | Partial |
| chapter_1_v1.png | 60 | - | 60 | Rejected |
| chapter_1_v2.png | 20 | - | 20 | Rejected |
| chapter_1_v3.png | 20 | - | 20 | Rejected |
| chapter_2_v1.png | 20 | - | 20 | Rejected |

**Sample Justification** (from chapter_1_v1.png):
> "The image depicts a young boy dressed in attire reminiscent of the 16th century, with a striped jacket and white shirt, which is consistent with the fashion of the time. However, the architecture in the background appears to be more modern, and the technology and objects visible, such as the camera, are not consistent with the era."

---

## Known Issues

1. **Qwen2.5-VL Timeout**: Second pass model times out on some images even with 300s timeout. May need:
   - Further timeout increase
   - Model optimization/quantization
   - Retry logic

2. **JSON Parsing**: Occasionally models return malformed JSON. Current fallback uses regex to extract scores, but justifications may be incomplete.

3. **No Batch Processing**: Currently processes images sequentially. Could parallelize first pass for speed.

---

## Next Steps / Improvements

### High Priority
- [ ] Add retry logic for timeout failures
- [ ] Implement `--retry-failed` flag to re-run only failed/partial images
- [ ] Add progress bar for long runs (tqdm)

### Medium Priority
- [ ] Parallel processing for first pass evaluations
- [ ] Add `--model` flags to override default models
- [ ] Support for reading era from image metadata or filename patterns
- [ ] Integration with ComfyUI workflow to auto-reject bad generations

### Low Priority
- [ ] Web UI for viewing results
- [ ] Historical accuracy database (reference images per era)
- [ ] Fine-tuned prompts per specific era (1920s vs 1860s vs 1565)
- [ ] Confidence scoring based on model agreement

---

## Usage Quick Reference

```bash
# Basic usage with auto-detected folder
python scripts/historical_image_accuracy_checker.py --era "1920s"

# Specific folder and threshold
python scripts/historical_image_accuracy_checker.py \
  --folder generated_images/session_xxx \
  --era "Civil War era 1863" \
  --threshold 75

# Quiet mode with custom output
python scripts/historical_image_accuracy_checker.py \
  --folder ./my_images \
  --era "Victorian England 1880s" \
  --output my_report.pdf \
  --quiet
```

---

## Architecture

```
Input: Folder of images + Era description + Threshold
                    │
                    ▼
        ┌───────────────────────┐
        │  First Pass (Llama)   │
        │  Quick evaluation     │
        └───────────┬───────────┘
                    │
            Score >= Threshold?
                    │
         ┌──────────┴──────────┐
         │ No                  │ Yes
         ▼                     ▼
    ┌─────────┐    ┌───────────────────────┐
    │ REJECT  │    │  Second Pass (Qwen)   │
    └─────────┘    │  Detailed scrutiny    │
                   └───────────┬───────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
              ┌─────────┐          ┌───────────┐
              │ KEEPER  │          │ BORDERLINE│
              └─────────┘          └───────────┘

Output: JSON per image + PDF summary report
```

---

## Session Notes

- The PRD specified Llama 3.2 Vision and Qwen2.5VL specifically - both installed
- RTX 4090 should handle both models but Qwen is slower on detailed prompts
- Existing `generated_images/` folder had 6 test images from lesson 1 (Spanish colonial 1565)
- Script follows existing project patterns (see `scripts/SCRIPTS_DOCUMENTATION.md`)

---

*For full script documentation, see `scripts/SCRIPTS_DOCUMENTATION.md`*
