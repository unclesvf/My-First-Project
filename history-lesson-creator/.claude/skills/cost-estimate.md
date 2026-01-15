# Cost Estimate

## Description
Estimate costs and time for batch operations before running them. Covers Higgsfield API credits, local generation time, TTS generation time, and other resource-intensive tasks.

## When to Use
- Before running Higgsfield API batch generation
- To estimate local FLUX generation time
- Before starting TTS audio batch
- When planning resource allocation
- To compare cloud vs local generation options

## Capabilities
- Estimates Higgsfield API costs per image/batch
- Calculates local ComfyUI generation time
- Estimates TTS generation duration
- Compares cloud vs local options
- Provides credit pack recommendations

## Process

### Step 1: Identify Operation Type
Ask user or detect from context:
1. **Higgsfield API** - Cloud image generation
2. **Local FLUX** - ComfyUI generation
3. **TTS Audio** - Voice generation
4. **Mixed** - Multiple operations

### Step 2: Count Items
```bash
# Count prompts for image generation
powershell -Command "(Get-Content 'generated_images\batch_session_*\all_prompts.json' | ConvertFrom-Json).PSObject.Properties.Count"

# Count lessons needing TTS
powershell -Command "51 - (Get-ChildItem 'lessons\*.wav').Count"

# Count images needing fixes
powershell -Command "(Get-ChildItem 'generated_images\reviewed\redo_list_*.json' | Get-Content | ConvertFrom-Json).redo_list.Count"
```

### Step 3: Calculate Estimates

#### Higgsfield API Costs
```markdown
## Higgsfield API Cost Estimate

### Pricing (as of Jan 2026):
| Model | Cost per Image |
|-------|----------------|
| Nano Banana Pro | ~$0.05-0.06 |
| Other models | Varies |

### Your Request:
| Item | Count | Unit Cost | Total |
|------|-------|-----------|-------|
| Images | 265 | $0.055 | $14.58 |
| Buffer (10%) | - | - | $1.46 |
| **Estimated Total** | | | **$16.04** |

### Credit Pack Recommendations:
| Pack | Price | Credits | Covers |余裕 |
|------|-------|---------|--------|------|
| 100 credits | $5 | 100 | 100 images | ❌ Not enough |
| 300 credits | $15 | 300 | ~300 images | ✅ Recommended |
| 600 credits | $30 | 600 | ~600 images | ✅ With buffer |

**Recommendation:** $15 pack (300 credits) covers 265 images with ~35 credit buffer

### Alternative: Web UI (FREE)
Your Ultimate subscription includes **unlimited** Nano Banana Pro via web interface.
Trade-off: Manual copy/paste vs automated API
```

#### Local FLUX Generation Time
```markdown
## Local FLUX Generation Time Estimate

### Hardware: RTX 4090 (24GB VRAM)
### Model: FLUX.2 Dev FP8

### Performance Metrics:
| Metric | Value |
|--------|-------|
| Time per image | ~4.5 minutes |
| Steps | 28 |
| Resolution | 1024x1024 → 2K upscale |

### Your Request:
| Item | Count | Time Each | Total |
|------|-------|-----------|-------|
| Images | 265 | 4.5 min | 1,192.5 min |
| **Total Time** | | | **~19.9 hours** |

### Breakdown:
- Generation: ~18 hours
- Upscaling: ~1.5 hours
- Overhead: ~0.4 hours

### Recommendations:
- Run overnight for large batches
- Can pause/resume with batch script
- Monitor with `/check-batch`
```

#### TTS Generation Time
```markdown
## TTS Generation Time Estimate

### Pipeline: Zonos TTS + Whisper Verification

### Performance Metrics:
| Phase | Time per Lesson |
|-------|-----------------|
| Chunk generation | 8-10 min |
| Whisper verification | 3-5 min |
| Post-processing | 2-3 min |
| **Total per lesson** | **~15-20 min** |

### Your Request:
| Item | Count | Time Each | Total |
|------|-------|-----------|-------|
| Lessons | 51 | 17.5 min | 892.5 min |
| **Total Time** | | | **~14.9 hours** |

### Recommendations:
- Run in WSL environment
- Generate in batches of 10-15
- Review quality every 10 lessons
- Can run overnight
```

### Step 4: Present Comparison (if applicable)
```markdown
## Cost/Time Comparison: Image Generation

| Method | Cost | Time | Automation |
|--------|------|------|------------|
| **Higgsfield API** | ~$15 | ~30 min | Full |
| **Higgsfield Web** | $0 | ~4-6 hours | Manual |
| **Local FLUX** | $0 | ~20 hours | Full |

### Recommendation:
- **Budget priority:** Web UI (free, manual work)
- **Time priority:** API ($15, fastest)
- **Balance:** Local overnight (free, automated)
```

## Example Usage

**User**: "/cost-estimate higgsfield 265 images"

**Assistant**:
```
## Higgsfield API Cost Estimate

### Request: 265 images via Nano Banana Pro

| Cost Component | Amount |
|----------------|--------|
| Base cost | 265 × $0.055 = $14.58 |
| Recommended buffer | +10% = $1.46 |
| **Total estimate** | **$16.04** |

### Credit Pack Options:
| Pack | Price | Recommendation |
|------|-------|----------------|
| 300 credits | $15 | ✅ Best value - covers with buffer |
| 600 credits | $30 | Overkill unless planning more |

### Alternative (FREE):
Use Web UI at higgsfield.ai - unlimited with your Ultimate plan
- Export prompts: `/export-prompts`
- Manual copy/paste required
- Time: ~4-6 hours of manual work

### Purchase credits at:
https://cloud.higgsfield.ai/

Proceed with API generation?
```

---

**User**: "/cost-estimate tts all"

**Assistant**:
```
## TTS Generation Time Estimate

### Request: All 51 lessons

| Metric | Value |
|--------|-------|
| Lessons to generate | 51 |
| Time per lesson | ~17.5 minutes |
| **Total time** | **~14.9 hours** |

### Breakdown:
| Phase | Per Lesson | Total (51) |
|-------|------------|------------|
| Chunk generation | 9 min | 7.7 hrs |
| Whisper verification | 4 min | 3.4 hrs |
| Post-processing | 2.5 min | 2.1 hrs |
| Retries/buffer | 2 min | 1.7 hrs |

### Recommendations:
1. **Start overnight** - Begin at 6 PM, done by 9 AM
2. **Batch approach** - Do 10-15 lessons, review, continue
3. **Monitor** - Check quality every few lessons

### Resource Usage:
- CPU: High (Whisper)
- Memory: ~8-12 GB
- Disk: ~2.5 GB output (~50 MB × 51)

Ready to start generation?
```

---

**User**: "/cost-estimate local flux 50 images"

**Assistant**:
```
## Local FLUX Generation Estimate

### Request: 50 images via ComfyUI

| Metric | Value |
|--------|-------|
| Model | FLUX.2 Dev FP8 |
| Hardware | RTX 4090 |
| Images | 50 |

### Time Estimate:
| Phase | Per Image | Total |
|-------|-----------|-------|
| Generation (28 steps) | 3.5 min | 175 min |
| Upscaling | 0.8 min | 40 min |
| Saving/overhead | 0.2 min | 10 min |
| **Total** | **4.5 min** | **~3.75 hours** |

### Power/Cost:
| Resource | Usage | Cost |
|----------|-------|------|
| GPU Power | ~350W | ~$0.50 electricity |
| Total runtime | 3.75 hrs | Negligible |

### Comparison to Cloud:
| Method | Time | Cost |
|--------|------|------|
| Local FLUX | 3.75 hrs | ~$0.50 |
| Higgsfield API | ~10 min | ~$2.75 |
| Higgsfield Web | ~1 hr | $0 |

Start local generation?
```

## Cost Reference Tables

### Higgsfield API
| Credits | Price | Per Image |
|---------|-------|-----------|
| 100 | $5 | $0.05 |
| 300 | $15 | $0.05 |
| 600 | $30 | $0.05 |

### Local Generation (RTX 4090)
| Model | Time/Image | Power |
|-------|------------|-------|
| FLUX.2 Dev FP8 | ~4.5 min | 350W |
| FLUX Fill Q8 | ~4 min | 350W |
| FLUX Kontext FP8 | ~4 min | 350W |

### TTS Generation
| Component | Time/Lesson |
|-----------|-------------|
| Zonos TTS | 8-10 min |
| Whisper verify | 3-5 min |
| Post-process | 2-3 min |
| **Total** | **15-20 min** |

## Integration with Other Skills

- **After estimate**: Use `/higgsfield` for API generation
- **After estimate**: Use `/tts-generate` for audio
- **Compare**: Use `/project-status` to see what's needed
- **Track**: Use `/check-batch` during generation

## Notes

- Estimates are approximations based on typical performance
- Actual times may vary based on system load
- API costs may change - verify at cloud.higgsfield.ai
- Local generation is "free" but uses electricity
- Web UI is truly free with Ultimate subscription
