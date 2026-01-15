# ComfyUI Model Manager

## Description
Check and swap ComfyUI models for different tasks. Manages switching between FLUX.2 Dev (text-to-image), FLUX Fill (inpainting), and FLUX Kontext (image editing).

## When to Use
- Before starting a specific image generation task
- To verify correct model is loaded
- When switching between generation and inpainting workflows
- To check available models and their status
- To troubleshoot model loading issues

## Capabilities
- Shows currently loaded model in ComfyUI
- Lists available models and their sizes
- Provides commands to swap models
- Verifies model files exist
- Shows optimal startup commands for each model

## Available Models

| Model | File | Size | Use Case |
|-------|------|------|----------|
| FLUX.2 Dev FP8 | `flux2_dev_fp8mixed.safetensors` | ~12 GB | Text-to-image generation |
| FLUX Fill Q8 | `flux1-fill-dev-Q8_0.gguf` | 11.84 GB | Mask-based inpainting |
| FLUX Kontext FP8 | `flux1-dev-kontext_fp8_scaled.safetensors` | 11.09 GB | Text-based image editing |

## Process

### Step 1: Check ComfyUI Status
Verify ComfyUI is running:
```bash
powershell -Command "Test-NetConnection -ComputerName 127.0.0.1 -Port 8188 -InformationLevel Quiet"
```

Or check for process:
```bash
powershell -Command "Get-Process | Where-Object {$_.ProcessName -like '*python*'} | Select-Object ProcessName, Id"
```

### Step 2: Check Current Model
Query ComfyUI API for loaded models:
```bash
curl -s http://127.0.0.1:8188/object_info | python -c "import json,sys; print(json.load(sys.stdin).get('UNETLoader',{}).get('input',{}).get('required',{}).get('unet_name',['Unknown'])[0])"
```

Or check recent ComfyUI output for model loading messages.

### Step 3: List Available Models
```bash
# UNET/Diffusion models
dir "C:\Users\scott\ComfyUI\models\unet\"
dir "C:\Users\scott\ComfyUI\models\diffusion_models\"

# Check sizes
powershell -Command "Get-ChildItem 'C:\Users\scott\ComfyUI\models\unet\*.safetensors','C:\Users\scott\ComfyUI\models\unet\*.gguf' | Select-Object Name, @{N='Size(GB)';E={[math]::Round($_.Length/1GB,2)}}"
```

### Step 4: Report Status
```markdown
## ComfyUI Model Status

**ComfyUI Status:** Running on http://127.0.0.1:8188
**Current Task:** Image generation (FLUX.2 Dev)

### Loaded Model:
- **UNET:** flux2_dev_fp8mixed.safetensors (12.1 GB)
- **CLIP:** mistral_3_small_flux2_fp8.safetensors
- **VAE:** flux2-vae.safetensors

### Available Models:
| Model | Status | Size |
|-------|--------|------|
| flux2_dev_fp8mixed.safetensors | LOADED | 12.1 GB |
| flux1-fill-dev-Q8_0.gguf | Available | 11.84 GB |
| flux1-dev-kontext_fp8_scaled.safetensors | Available | 11.09 GB |

### To Switch Models:
See commands below for each workflow type.
```

### Step 5: Provide Swap Instructions

#### For FLUX.2 Dev (Text-to-Image)
```markdown
### Switch to FLUX.2 Dev

**Best for:** Generating new images from text prompts

**Workflow:** Use existing batch generation or queue prompts

**If not loaded, restart ComfyUI:**
```batch
cd C:\Users\scott\ComfyUI
python -s main.py --cuda-malloc --force-channels-last --fast
```

**Script:** `flux2_batch_generate.py`
```

#### For FLUX Fill (Inpainting)
```markdown
### Switch to FLUX Fill

**Best for:** Mask-based inpainting, anachronism fixing

**Required files:**
- `models/unet/flux1-fill-dev-Q8_0.gguf`
- `models/clip/t5xxl_fp16.safetensors`
- `models/clip/clip_l.safetensors`
- `models/vae/ae.safetensors`

**Workflow:** Load `workflows/flux_fill_inpaint.json` in ComfyUI

**Script:** `fill_inpaint.py` or `auto_fix_anachronisms.py`

**Note:** FLUX Fill uses GGUF format (loads via UnetLoaderGGUF node)
```

#### For FLUX Kontext (Image Editing)
```markdown
### Switch to FLUX Kontext

**Best for:** Text-described image modifications

**Required files:**
- `models/diffusion_models/flux1-dev-kontext_fp8_scaled.safetensors`

**Workflow:** Load `workflows/kontext_image_refine.json` in ComfyUI

**Script:** `kontext_refine.py`
```

## Example Usage

**User**: "/comfyui-model"

**Assistant**:
```
## ComfyUI Model Status

**Status:** Running ✓
**URL:** http://127.0.0.1:8188

### Currently Active:
**Model:** FLUX.2 Dev FP8
**Task:** Batch generation (98/252 images)

### Available Models:

| Model | Type | Status | Best For |
|-------|------|--------|----------|
| FLUX.2 Dev | Text-to-Image | LOADED | New image generation |
| FLUX Fill | Inpainting | Ready | Fixing anachronisms |
| FLUX Kontext | Editing | Ready | Text-based edits |

### Quick Commands:

**To use FLUX Fill (for /fix-anachronisms):**
Models auto-load when running `fill_inpaint.py` or `auto_fix_anachronisms.py`

**To use FLUX Kontext (for image edits):**
Load workflow: `workflows/kontext_image_refine.json`

Need to switch models?
```

---

**User**: "/comfyui-model status"

**Assistant**: [Shows current model and GPU memory usage]

---

**User**: "/comfyui-model fill"

**Assistant**:
```
## Switching to FLUX Fill

FLUX Fill model will auto-load when you run:
- `python fill_inpaint.py --image img.png --mask mask.png --prompt "..."`
- `python auto_fix_anachronisms.py --image img.png --era "1760s"`

The workflow uses `UnetLoaderGGUF` node which loads:
`models/unet/flux1-fill-dev-Q8_0.gguf`

**Note:** If batch generation is running, FLUX Fill jobs will queue behind it.

Ready to run inpainting?
```

## Model Locations

```
C:\Users\scott\ComfyUI\models\
├── unet/
│   ├── flux2_dev_fp8mixed.safetensors    # FLUX.2 Dev
│   └── flux1-fill-dev-Q8_0.gguf          # FLUX Fill
├── diffusion_models/
│   └── flux1-dev-kontext_fp8_scaled.safetensors  # FLUX Kontext
├── clip/
│   ├── t5xxl_fp16.safetensors
│   ├── clip_l.safetensors
│   └── mistral_3_small_flux2_fp8.safetensors
├── vae/
│   ├── ae.safetensors
│   └── flux2-vae.safetensors
└── sam/
    └── sam_vit_h_4b8939.pth              # For anachronism detection
```

## Troubleshooting

### ComfyUI Not Running
```bash
cd C:\Users\scott\ComfyUI
.\start_optimized.bat
```

### Model Not Found
```
Check file exists:
dir "C:\Users\scott\ComfyUI\models\unet\flux1-fill-dev-Q8_0.gguf"

If missing, download:
python scripts/download_flux_fill.py
```

### Out of VRAM
```
RTX 4090 has 24GB VRAM. If OOM:
1. Close other GPU applications
2. Restart ComfyUI
3. Use FP8 quantized models (already configured)
```

## Integration with Other Skills

- **Before generation**: Verify FLUX.2 Dev loaded
- **Before fixing**: Verify FLUX Fill available
- **Check progress**: Use `/check-batch`
- **After switching**: Run appropriate script

## Notes

- Models auto-load based on workflow nodes
- No need to manually switch in most cases
- Scripts handle model loading via workflow JSON
- RTX 4090 can run any single model comfortably
- Cannot run multiple large models simultaneously
