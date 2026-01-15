# Check Batch Status

## Description
Monitor the status of running image generation batches. Shows progress, estimates completion time, displays recent outputs, and identifies any errors or failures.

## When to Use
- During long-running FLUX.2 Dev batch generations
- To check how many images have been generated
- To estimate remaining time for completion
- To identify failed generations that need retry
- When returning to a session to see batch progress

## Capabilities
- Counts generated images in ComfyUI output directory
- Compares against total expected images
- Calculates completion percentage
- Estimates remaining time based on average generation speed
- Lists most recently generated images
- Identifies any errors in the batch log
- Shows running ComfyUI processes

## Process

### Step 1: Check ComfyUI Status
Verify ComfyUI is running:
```bash
powershell -Command "Get-Process | Where-Object {$_.ProcessName -like '*python*' -or $_.ProcessName -like '*comfy*'} | Select-Object ProcessName, Id, CPU"
```

### Step 2: Count Generated Images
Count images generated today matching the batch pattern:
```bash
powershell -Command "(Get-ChildItem 'C:\Users\scott\ComfyUI\output\L*_Ch*_20260114*.png').Count"
```

### Step 3: Determine Total Expected
The batch generates 252 images (276 total minus 24 skipped good images).

For different batch types, check:
- `flux2_batch_generate.py` - 252 images (skips 24)
- `flux2_lessons_1_2.py` - 11 images (Lessons 1-2 only)
- Full batch - 276 images

### Step 4: Calculate Progress
```
Progress = (Generated / Total) * 100
Remaining = Total - Generated
```

### Step 5: Estimate Time Remaining
Based on average generation time of ~4-5 minutes per image:
```
Average time per image: ~4.5 minutes
Remaining time = Remaining images * 4.5 minutes
Convert to hours:minutes format
```

### Step 6: List Recent Outputs
Show the 10 most recently generated images:
```bash
powershell -Command "Get-ChildItem 'C:\Users\scott\ComfyUI\output\L*_Ch*_20260114*.png' | Sort-Object LastWriteTime -Descending | Select-Object -First 10 | ForEach-Object { $_.Name }"
```

### Step 7: Check for Errors
Read the batch task output file for any errors:
```bash
tail -50 C:\Users\scott\AppData\Local\Temp\claude\C--Users-scott\tasks\*.output
```

Look for:
- Python exceptions
- ComfyUI errors
- Failed prompts
- Timeout errors

### Step 8: Generate Status Report

Output format:
```
## Batch Generation Status

**Status:** Running / Completed / Error
**Progress:** XX/YYY images (ZZ%)
**Estimated Completion:** ~X hours Y minutes remaining

### Recent Generations:
1. L10_Ch3_20260114_152512_00001_.png
2. L10_Ch2_20260114_152512_00001_.png
3. ...

### Performance:
- Average time per image: ~4.5 minutes
- Current speed: X.X seconds/step

### Errors Found: None / [List errors]

### Next Steps:
- [Recommendations based on status]
```

## Example Usage

**User**: "/check-batch"

**Assistant**:
```
## Batch Generation Status

**Status:** Running
**Progress:** 97/252 images (38%)
**Estimated Completion:** ~11.6 hours remaining

### Recent Generations:
1. L10_Ch4_20260114_192512_00001_.png
2. L10_Ch3_20260114_192012_00001_.png
3. L10_Ch2_20260114_191512_00001_.png
4. L10_Ch1_20260114_191012_00001_.png (fixed - no typewriter)
5. L9_Ch6_20260114_190512_00001_.png

### Performance:
- Average time per image: ~4.5 minutes
- Current speed: 7.4 seconds/step
- PyTorch 2.9.0+cu130 with CUDA 13

### Errors Found: None

### Next Steps:
- Batch is progressing normally
- After completion, run `flux2_lessons_1_2.py` for Lessons 1-2
- Consider running anachronism scan on completed images
```

## Output Locations

| Batch Type | Output Directory |
|------------|------------------|
| FLUX.2 Dev batch | `C:\Users\scott\ComfyUI\output\` |
| Higgsfield batch | `generated_images\higgsfield_batch\<timestamp>\` |
| Auto-fix results | `generated_images\auto_fixed\` |

## Troubleshooting

### If batch appears stuck:
1. Check ComfyUI console for errors
2. Verify GPU memory isn't exhausted
3. Check if ComfyUI process is still running

### If images missing:
1. Verify correct output directory
2. Check filename pattern matches expected format
3. Look for error messages in batch log

### If progress seems wrong:
1. Some images may be skipped (24 skip list)
2. Check if running correct batch script
3. Verify date pattern in filename search

## Integration with Other Skills

- **After batch completes**: Use `/scan-anachronisms` to check for issues
- **If errors found**: Use `/fix-anachronisms` to correct problems
- **For status updates**: Run periodically during long batches
