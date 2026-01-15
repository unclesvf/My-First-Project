# Higgsfield Generation

## Description
Helper for generating images via Higgsfield.ai - either through the web UI (unlimited with Ultimate subscription) or the Cloud API (requires credit purchase).

## When to Use
- To generate images using Nano Banana Pro model
- As alternative to local FLUX generation
- For cloud-based generation when local GPU is busy
- To leverage Ultimate subscription benefits

## Capabilities
- Generate via web UI (unlimited, manual)
- Generate via Cloud API (credits, automated)
- Check API credit balance
- Batch generation with progress tracking
- Cost estimation before generation

## Important: API vs Web UI

| Method | Billing | Nano Banana Pro | Automation |
|--------|---------|-----------------|------------|
| **Web UI** (higgsfield.ai) | Ultimate subscription ($49/mo) | **UNLIMITED** | Manual paste |
| **Cloud API** (cloud.higgsfield.ai) | Separate credits (~$0.05-0.06/image) | Pay per use | Full automation |

**Recommendation:** Use Web UI for free generation, API only when automation is essential.

## Process

### Option 1: Web UI Generation (FREE with Ultimate)

#### Step 1: Export Prompts
```bash
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\scripts"
python export_prompts_for_higgsfield.py --format prompts
```

#### Step 2: Guide User
```markdown
## Web UI Generation (Unlimited)

Your Ultimate plan includes **unlimited Nano Banana Pro** via web interface!

### Steps:
1. Open: https://higgsfield.ai/
2. Log in with your Ultimate account
3. Open exported prompts: `prompts_export/all_prompts_*_clean.txt`
4. Copy a prompt (between the `----` separators)
5. Paste into Higgsfield prompt field
6. Select **Nano Banana Pro** model
7. Set aspect ratio: **16:9** (landscape)
8. Generate!

### Settings:
- Model: Nano Banana Pro
- Aspect Ratio: 16:9
- Resolution: 2K (or highest available)

### Tips:
- Open prompts file and web UI side by side
- Use Ctrl+C/Ctrl+V for quick copying
- Generate multiple images per prompt for variety
- Download and rename with lesson/chapter ID
```

### Option 2: API Generation (Costs Credits)

#### Step 1: Check Prerequisites
Verify credentials:
```bash
python -c "import os; print('API Key:', 'Set' if os.environ.get('HF_API_KEY') else 'Missing')"
```

#### Step 2: Estimate Costs
```markdown
## API Cost Estimate

**Prompts to generate:** 265
**Cost per image:** ~$0.05-0.06
**Estimated total:** $13.25 - $15.90

### Credit Packs:
| Pack | Cost | Images (~$0.05 each) |
|------|------|---------------------|
| 100 credits | $5 | ~100 images |
| 300 credits | $15 | ~300 images |
| 600 credits | $30 | ~600 images |

**Recommendation:** $15 pack covers 265 images with buffer
```

#### Step 3: Run API Generation
```bash
# Dry run first
python higgsfield_batch_generate.py --dry-run

# Generate all
python higgsfield_batch_generate.py

# Generate single lesson
python higgsfield_batch_generate.py --lesson 10
```

#### Step 4: Monitor Progress
```markdown
## API Generation Progress

**Status:** Running
**Completed:** 45/265 images
**Credits Used:** ~45 ($2.25)
**Remaining:** 220 images (~$11)

### Recent:
- L10_Ch1.png ✓
- L10_Ch2.png ✓
- L10_Ch3.png (generating...)

### Output:
`generated_images/higgsfield_batch/20260114_201530/`
```

## Example Usage

**User**: "/higgsfield"

**Assistant**:
```
## Higgsfield Generation Options

You have an **Ultimate subscription** - here are your options:

### 1. Web UI (FREE - Unlimited)
Use Nano Banana Pro unlimited via browser:
- Export prompts: `python export_prompts_for_higgsfield.py --format prompts`
- Open: https://higgsfield.ai/
- Copy/paste prompts manually
- **Cost: $0** (included in subscription)

### 2. Cloud API (Costs Credits)
Automated batch generation:
- 265 images × ~$0.05 = **~$13-16**
- Requires credit purchase at cloud.higgsfield.ai
- Run: `python higgsfield_batch_generate.py`

Which would you like to use?
```

---

**User**: "/higgsfield api"

**Assistant**:
```
## Higgsfield API Generation

### Prerequisites:
✓ API credentials configured
✓ higgsfield-client installed
✓ 265 prompts ready

### Cost Estimate:
- 265 images × $0.05 = **$13.25**
- Recommended: Purchase $15 credit pack

### Before Running:
1. Purchase credits at https://cloud.higgsfield.ai/
2. Verify balance

### Commands:
```bash
# Test connection
python higgsfield_batch_generate.py --dry-run

# Generate single lesson (test)
python higgsfield_batch_generate.py --lesson 3

# Generate all
python higgsfield_batch_generate.py
```

Ready to proceed?
```

---

**User**: "/higgsfield web"

**Assistant**:
```
## Web UI Generation Guide

Your Ultimate plan = **UNLIMITED Nano Banana Pro**!

### Quick Start:
1. I've exported your prompts to:
   `prompts_export/all_prompts_20260114_*_clean.txt`

2. Open Higgsfield: https://higgsfield.ai/

3. Copy prompts between the `----` lines and paste into Higgsfield

### Recommended Settings:
- **Model:** Nano Banana Pro
- **Aspect Ratio:** 16:9 (landscape for lessons)
- **Resolution:** 2K or 4K

### Workflow:
```
Open prompts file → Copy prompt → Paste in Higgsfield → Generate → Download → Rename → Repeat
```

### Naming Convention:
Save as: `L[lesson]_Ch[chapter].png`
Example: `L10_Ch1.png`, `L10_Ch2.png`

Would you like me to open the prompts file location?
```

## API Configuration

Credentials stored in:
- `.env.local` (project file)
- System environment variables (`HF_API_KEY`, `HF_API_SECRET`)

Test configuration:
```bash
python -c "
import os
key = os.environ.get('HF_API_KEY', '')
print(f'API Key: {key[:8]}...' if key else 'API Key: Not set')
"
```

## Output Locations

| Method | Output Directory |
|--------|------------------|
| API batch | `generated_images/higgsfield_batch/<timestamp>/` |
| Manual web | User downloads to chosen location |

## Integration with Other Skills

- **Export prompts**: `/export-prompts` prepares prompts for web UI
- **After generation**: Use `/review-images` to check quality
- **If issues found**: Use `/scan-anachronisms` then `/fix-anachronisms`

## Troubleshooting

### API Authentication Error
```
Check credentials:
1. Verify .env.local has HF_API_KEY and HF_API_SECRET
2. Or set environment variables
3. Get new keys from https://cloud.higgsfield.ai/
```

### Insufficient Credits
```
Purchase credits at https://cloud.higgsfield.ai/
Credit packs: $5 (100), $15 (300), $30 (600)
```

### Rate Limiting
```
If hitting rate limits:
1. Reduce MAX_CONCURRENT in script (default: 5)
2. Add delays between requests
3. Contact Higgsfield support for higher limits
```

## Notes

- Web UI is truly unlimited with Ultimate - use it!
- API is best for automation when credits are available
- Nano Banana Pro produces excellent quality images
- 16:9 aspect ratio matches lesson image requirements
- Consider web UI for initial generation, API for reruns/fixes
