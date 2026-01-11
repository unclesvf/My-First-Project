# Git/LFS Handler Skill

## Description
Handle all Git operations for this project, including proper Git LFS management for large files. Ensures commands are run from the correct directory (git root is one level up from the project folder).

## Usage
User can invoke this skill by saying:
- "commit changes"
- "push to github"
- "git status"
- "handle git lfs"
- "/git-push"

## Instructions

You are helping manage Git operations for this project. **Critical:** The git root is different from the project folder!

### Directory Structure (IMPORTANT!)

```
C:\Users\scott\My-First-Project\My-First-Project\     <- GIT ROOT (run git commands here!)
├── .git/                                              <- Git repository
├── .gitattributes                                     <- LFS tracking rules
├── history-lesson-creator/                            <- Project folder
│   ├── app/
│   ├── data/
│   ├── lessons/tts/models/                            <- Large ONNX files (LFS)
│   └── ...
└── other-projects/                                    <- Possible sibling projects
```

### Git Command Reference

**Always cd to git root first:**
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project"
```

Or use -C flag:
```bash
git -C "C:/Users/scott/My-First-Project/My-First-Project" status
```

### Standard Operations

#### Check Status
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git status
```

#### Stage All Changes
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git add -A
```

#### Commit Changes
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git commit -m "$(cat <<'EOF'
Your commit message here

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

#### Push to Remote
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git push
```

#### Full Commit & Push
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git add -A && git commit -m "message" && git push
```

### Git LFS Operations

#### Check LFS Status
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git lfs ls-files
```

#### Check LFS Storage Used
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git lfs ls-files -s
```

#### Track New File Type with LFS
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git lfs track "*.extension"
git add .gitattributes
```

#### Current LFS Tracked Types
- `*.onnx` - TTS model files (60-120 MB)

### Handling Large File Errors

If you see: `remote: error: File X is larger than 100 MB`

#### If File Type NOT Already Tracked

1. Track the file type with LFS:
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project"
git lfs track "*.extension"
git add .gitattributes
git add path/to/large/file
git commit -m "Add large file with LFS"
git push
```

#### If File Already in History (Without LFS)

Must rewrite history to remove the file, then re-add with LFS:

```bash
cd "C:/Users/scott/My-First-Project/My-First-Project"

# 1. Save any uncommitted changes
git stash

# 2. Remove file from entire history
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch 'path/to/large/file'" HEAD

# 3. Restore uncommitted changes
git stash pop

# 4. Set up LFS tracking
git lfs track "*.extension"
git add .gitattributes

# 5. Re-add the file (now with LFS)
git add path/to/large/file
git commit -m "Add file with LFS tracking"

# 6. Force push (WARNING: rewrites history)
git push --force origin main
```

### Pre-Push Checklist

Before pushing, verify:

1. **No uncommitted changes:**
   ```bash
   git status
   ```

2. **Large files tracked by LFS:**
   ```bash
   git lfs ls-files
   ```

3. **No secrets being committed:**
   - `.env.local` should be in `.gitignore`
   - Check for API keys in code

4. **Build passes:**
   ```bash
   cd "C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator" && npm run build
   ```

### Files to NEVER Commit

These should be in `.gitignore`:
- `.env.local` - Contains API keys (Firebase, Stripe)
- `node_modules/` - Dependencies
- `.next/` - Build output
- `venv*/` - Python environments
- `*.pem` - Private keys

### Remote Repository Info

- **URL:** https://github.com/unclesvf/My-First-Project.git
- **Branch:** main
- **LFS:** Enabled (GitHub Pro)

### LFS Limits (GitHub Pro)

| Resource | Limit |
|----------|-------|
| Per-file size | 2 GB |
| Storage included | 2 GB |
| Bandwidth/month | 2 GB |

### Troubleshooting

#### "Not a git repository" Error
You're in the wrong directory. Run:
```bash
cd "C:/Users/scott/My-First-Project/My-First-Project"
```

#### LFS not uploading files
```bash
git lfs install
git lfs track "*.extension"  # if not already tracked
git add .gitattributes
git add -A
git commit -m "Fix LFS tracking"
git push
```

#### Push takes forever
Large LFS files can take time. Check progress:
```bash
git lfs push --all origin main
```

#### Authentication failed
```bash
git config credential.helper store
# Then retry push - enter credentials when prompted
```

### Example Interaction

**User:** "commit and push my changes"

**Assistant:** I'll commit and push your changes. Let me check the current status first.

*[Runs git status from correct directory]*

```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git status
```

Found 5 modified files and 2 new files. Let me check for any large files...

*[Checks file sizes]*

All files under 50 MB, no LFS concerns.

*[Runs git add, commit, push]*

```bash
cd "C:/Users/scott/My-First-Project/My-First-Project" && git add -A && git commit -m "Update lesson content and fix styles" && git push
```

Successfully pushed to origin/main.

## Technical Notes

- Git root: `C:\Users\scott\My-First-Project\My-First-Project`
- Project folder: `C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator`
- Always run git commands from git root, not project folder
- LFS is required for files >50 MB (warning) or >100 MB (blocked)
- GitHub Pro provides expanded LFS storage

## Success Metrics

A successful git operation:
- Commands run from correct directory (git root)
- Large files properly tracked by LFS
- No secrets committed
- Clean commit history
- Successful push to remote
