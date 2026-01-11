# Claude Code Instructions for This Project

**Read this file first when starting a new session.**

---

## Project Location

```
C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator
```

**Git root is ONE LEVEL UP:**
```
C:\Users\scott\My-First-Project\My-First-Project
```

---

## Available Skills

This project has **8 custom skills** to help with development. Skills are located in `.claude/skills/` and can be invoked with slash commands or natural language.

### Content Creation Skills

| Skill | Command | Description |
|-------|---------|-------------|
| **Lesson Builder** | `/lesson-builder` | Scaffold new lessons with chapters, flashcards, and quizzes |
| **Image Prompter** | `/image-prompter` | Generate AI image prompts with historical accuracy |
| **Historical Accuracy Checker** | `/historical-accuracy-checker` | Verify historical accuracy of lesson content |
| **TTS Audio Generator** | `/generate-audio` | Create text-to-speech narration for lessons |

### Development Skills

| Skill | Command | Description |
|-------|---------|-------------|
| **Content Auditor** | `/audit-content` | Audit all lessons for completeness and quality |
| **Git/LFS Handler** | `/git-push` | Handle git operations with proper LFS management |
| **Course Scaffolder** | `/new-course` | Create a new course project from scratch |
| **Build & Deploy** | `/deploy` | Build, validate, and deploy to production |

### Skill Usage Examples

```
"Create a new lesson about the American Revolution"
"Generate audio for lesson 15"
"Audit the content for missing flashcards"
"Deploy to production"
"Commit and push my changes"
```

### Skill Files

All skill definitions are in:
```
.claude/skills/
├── lesson-builder.md           # Create new lessons
├── image-prompter.md           # Generate image prompts
├── historical-accuracy-checker.md  # Verify accuracy
├── tts-generator.md            # Audio narration
├── content-auditor.md          # Content completeness
├── git-handler.md              # Git/LFS operations
├── course-scaffolder.md        # New course setup
└── deploy.md                   # Production deployment
```

---

## Git LFS Configuration

This project uses **Git Large File Storage (LFS)** for large files.

### LFS-Tracked File Types
- `*.onnx` - TTS model files (60-120 MB each)

### Important: Before Any Git Push

1. **Verify LFS is installed:**
   ```bash
   git lfs version
   ```

2. **Check LFS tracking:**
   ```bash
   git lfs ls-files
   ```

3. **If adding new large files (>50MB):**
   ```bash
   git lfs track "*.extension"
   git add .gitattributes
   ```

### LFS Limits (GitHub Pro)
- **Per-file limit:** 2 GB (with LFS)
- **Storage:** 2 GB included
- **Bandwidth:** 2 GB/month included

---

## Git Commands - Use These Paths

Always run git commands from the **git root**, not the project subfolder:

```bash
# Correct - from git root
cd "C:/Users/scott/My-First-Project/My-First-Project"
git status
git push

# Also correct - specify full path
git -C "C:/Users/scott/My-First-Project/My-First-Project" status
```

### Common Git Operations

```bash
# Check status
cd "C:/Users/scott/My-First-Project/My-First-Project" && git status

# Add and commit
cd "C:/Users/scott/My-First-Project/My-First-Project" && git add -A && git commit -m "message"

# Push (may take time for LFS files)
cd "C:/Users/scott/My-First-Project/My-First-Project" && git push

# If push fails with large file error, check LFS:
git lfs ls-files  # Should show large files
```

---

## Handling Large File Errors

If you see: `remote: error: File X is larger than 100 MB`

### Solution 1: Track with LFS (if not already)
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project"
git lfs track "*.extension"
git add .gitattributes
git add path/to/large/file
git commit -m "Add large file with LFS"
git push
```

### Solution 2: If file already in history without LFS
Must clean history first:
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project"
git stash  # Save uncommitted changes
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch 'path/to/large/file'" HEAD
git stash pop  # Restore changes
git lfs track "*.extension"
git add .gitattributes path/to/large/file
git commit -m "Add with LFS"
git push --force origin main
```

---

## Files to Never Commit

These are in `.gitignore` but double-check:
- `.env.local` - Contains API keys
- `node_modules/` - Dependencies
- `.next/` - Build output
- `venv*/` - Python virtual environments

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `cd "C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator" && npm run dev` |
| Build | `npm run build` |
| Git status | `cd "C:/Users/scott/My-First-Project/My-First-Project" && git status` |
| Git push | `cd "C:/Users/scott/My-First-Project/My-First-Project" && git push` |
| Check LFS files | `git lfs ls-files` |
| LFS storage used | `git lfs ls-files -s` |

---

## Current LFS Files

As of January 2026:
```
history-lesson-creator/lessons/tts/models/en_US-lessac-medium.onnx (60 MB)
history-lesson-creator/lessons/tts/models/en_US-ryan-high.onnx (115 MB)
```

---

## Session Status File

For full project status, read:
```
C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\SESSION_STATUS.md
```

---

## Remote Repository

- **URL:** https://github.com/unclesvf/My-First-Project.git
- **Branch:** main
- **LFS:** Enabled (GitHub Pro)
