# Project Status

## Description
Quick overview of all project systems and completion status. Shows build health, image generation, TTS audio, and other key metrics in one consolidated view.

## When to Use
- To get a quick snapshot of project health
- Before starting new work to understand current state
- To check what tasks are pending or in progress
- After completing major milestones
- When resuming work after a break

## Capabilities
- Shows build/compilation status
- Displays image generation progress
- Shows TTS audio completion status
- Lists pending user actions
- Identifies running background tasks
- Summarizes recent changes

## Process

### Step 1: Gather Status Data
Run checks in parallel:

```bash
# Build status
cd "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator" && npm run build --dry-run 2>&1 | findstr /i "error warning"

# Image count
powershell -Command "(Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\generated_images\batch_session_*\keepers\*.png' -Recurse).Count"

# TTS audio count
powershell -Command "(Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\lessons\*.wav').Count"

# Lesson count
powershell -Command "(Get-ChildItem 'C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\data\lessons\lesson-*.ts').Count"

# ComfyUI status
powershell -Command "Test-NetConnection -ComputerName 127.0.0.1 -Port 8188 -InformationLevel Quiet"

# Check for running batch
powershell -Command "Get-Process | Where-Object {$_.ProcessName -like '*python*'} | Select-Object ProcessName, Id"
```

### Step 2: Check Recent Changes
```bash
# Git status (from parent directory)
cd "C:\Users\scott\My-First-Project\My-First-Project" && git status --short
cd "C:\Users\scott\My-First-Project\My-First-Project" && git log --oneline -5
```

### Step 3: Present Consolidated Status
```markdown
## Project Status: History for Homeschoolers

**Last Updated:** [timestamp]

### Overall Health
| System | Status | Details |
|--------|--------|---------|
| Build | ✅ Passing | No errors |
| TypeScript | ✅ Clean | No type errors |
| Lessons | ✅ Complete | 51/51 lessons |
| Images | ✅ Complete | 276/276 images |
| TTS Audio | ⏳ Pending | 1/51 lessons |
| Firebase | ⚠️ Action Needed | Rules need deployment |

### Active Tasks
| Task | Progress | ETA |
|------|----------|-----|
| FLUX.2 Batch | 156/252 (62%) | ~3.5 hours |

### Pending User Actions
1. 🔴 Deploy Firestore rules (`firebase deploy --only firestore:rules`)
2. 🟡 Approve TTS V2 quality sample
3. 🟡 Configure Stripe webhooks

### Recent Changes
- [date] Code quality fixes (security, accessibility)
- [date] Split lessons into 51 files
- [date] Added anachronism detection pipeline

### Quick Commands
- Check batch: `/check-batch`
- Generate TTS: `/tts-generate`
- Review images: `/review-images`
```

## Status Categories

### Build Status
| Icon | Meaning |
|------|---------|
| ✅ | Build passing, no errors |
| ⚠️ | Build passing with warnings |
| ❌ | Build failing |

### Completion Status
| Icon | Meaning |
|------|---------|
| ✅ Complete | All items done |
| ⏳ In Progress | Actively being worked on |
| ⏸️ Paused | Started but waiting |
| 🔴 Blocked | Requires action to proceed |
| ⚪ Not Started | Haven't begun |

## Example Usage

**User**: "/project-status"

**Assistant**:
```
## Project Status: History for Homeschoolers

**Snapshot:** January 14, 2026, 8:45 PM

### Systems Overview
| Component | Status | Progress |
|-----------|--------|----------|
| Next.js Build | ✅ Passing | Production ready |
| Lesson Content | ✅ Complete | 51/51 lessons |
| Historical Images | ✅ Complete | 276/276 generated |
| TTS Audio | ⏳ Pending | 1/51 (2%) |
| Firebase Rules | ⚠️ Needs Deploy | Created, not deployed |

### Active Background Tasks
| Task | Status | Progress |
|------|--------|----------|
| FLUX.2 Batch Generation | Running | 156/252 (62%) |

### Pending User Actions
1. **Firebase Rules** - Run `firebase login` then `firebase deploy --only firestore:rules`
2. **TTS Approval** - Review `Survival_in_Jamestown_Zonos_V2.wav` quality
3. **Stripe Webhooks** - Configure in Stripe Dashboard

### Storage Usage
- Generated Images: ~8.2 GB
- TTS Audio: ~45 MB (1 lesson)
- Project Total: ~12.4 GB

### Recommended Next Steps
1. Wait for batch generation to complete (~3.5 hours)
2. Review generated images with `/review-images`
3. Approve TTS quality and start audio generation
```

---

**User**: "/project-status --quick"

**Assistant**:
```
## Quick Status

✅ Build: Passing
✅ Lessons: 51/51
✅ Images: 276/276
⏳ Audio: 1/51
⚠️ Firebase: Needs deploy

**Active:** FLUX.2 batch @ 62%
```

## Detailed Checks

### Build Health
```bash
# Full build check
npm run build

# Type check only (faster)
npx tsc --noEmit
```

### Image Status
```bash
# Count by location
echo "Keepers (L3-51):" && powershell -Command "(Get-ChildItem 'generated_images\batch_session_20260113_150301\keepers\*.png').Count"
echo "Keepers (L1-2):" && powershell -Command "(Get-ChildItem 'generated_images\batch_session_20260113_195255\keepers\*.png').Count"
echo "Reviewed:" && powershell -Command "(Get-ChildItem 'generated_images\reviewed\keepers\*.png').Count"
```

### TTS Status
```bash
# Audio files
powershell -Command "Get-ChildItem 'lessons\*.wav' | Select-Object Name, @{N='Size(MB)';E={[math]::Round($_.Length/1MB,2)}}"
```

### Firebase Status
```bash
# Check if logged in
firebase projects:list

# Check rules file exists
type firestore.rules
```

## Integration with Other Skills

- **For details**: Use specific skills (`/check-batch`, `/tts-generate`, etc.)
- **After status**: Choose next action based on what needs attention
- **Documentation**: See `STATUS.md` for persistent status notes

## Notes

- This skill provides a read-only overview
- No changes are made to the project
- Use specific skills to take action on items
- Run periodically to stay aware of project state
- Useful after resuming from context breaks
