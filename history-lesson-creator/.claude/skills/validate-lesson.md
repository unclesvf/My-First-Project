# Validate Lesson

## Description
Deep validation of a single lesson to ensure all components are complete and consistent. Checks content, images, audio, flashcards, and quiz data for completeness and correctness.

## When to Use
- Before deploying a specific lesson
- After making changes to lesson content
- To diagnose issues with a particular lesson
- As part of quality assurance process
- When a user reports problems with a lesson

## Capabilities
- Validates lesson content structure
- Checks all required images exist
- Verifies TTS audio files present
- Validates flashcard data
- Checks quiz questions and answers
- Verifies historical accuracy markers
- Cross-references chapter count consistency

## Process

### Step 1: Identify Lesson
Get lesson number from user or parameter.

### Step 2: Load Lesson Data
```bash
# Read lesson file
type "C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\data\lessons\lesson-{NN}.ts"
```

### Step 3: Run Validation Checks

#### Content Validation
```markdown
### Content Checks:
| Check | Status | Details |
|-------|--------|---------|
| Lesson file exists | ✅/❌ | `data/lessons/lesson-{NN}.ts` |
| Has title | ✅/❌ | "[title]" |
| Has description | ✅/❌ | [length] characters |
| Has era | ✅/❌ | "[era]" |
| Has narrator | ✅/❌ | "[narrator]" |
| Chapter count | ✅/❌ | [N] chapters |
```

#### Chapter Validation
```markdown
### Chapter Checks:
| Chapter | Title | Content | Image Prompt |
|---------|-------|---------|--------------|
| 1 | ✅ "[title]" | ✅ [words] words | ✅ Present |
| 2 | ✅ "[title]" | ✅ [words] words | ✅ Present |
| ... | | | |
```

#### Image Validation
```bash
# Check images exist
powershell -Command "
$lesson = '{NN}'
$found = Get-ChildItem 'generated_images\batch_session_*\keepers\L${lesson}_Ch*.png' -Recurse
$deployed = Get-ChildItem 'public\images\lessons\lesson-${lesson}-*.png'
Write-Host \"Generated: $($found.Count)\"
Write-Host \"Deployed: $($deployed.Count)\"
"
```

```markdown
### Image Checks:
| Chapter | Generated | Deployed | Fixed |
|---------|-----------|----------|-------|
| 1 | ✅ | ✅ | - |
| 2 | ✅ | ✅ | ✅ (anachronism fixed) |
| ... | | | |
```

#### Audio Validation
```bash
# Check TTS audio
powershell -Command "
$files = Get-ChildItem 'lessons\*lesson*{N}*.wav'
if ($files) {
    $files | Select-Object Name, @{N='Size(MB)';E={[math]::Round($_.Length/1MB,2)}}, @{N='Duration';E={'TBD'}}
} else {
    Write-Host 'No audio files found'
}
"
```

```markdown
### Audio Checks:
| Check | Status | Details |
|-------|--------|---------|
| Main audio file | ✅/❌/⏳ | `lesson_{N}_[title].wav` |
| File size | ✅/❌ | [X] MB (expected: 30-60 MB) |
| Chunks folder | ✅/❌ | [N] chunks |
```

#### Flashcard Validation
```markdown
### Flashcard Checks:
| Check | Status | Details |
|-------|--------|---------|
| Flashcards array | ✅/❌ | [N] cards |
| All have terms | ✅/❌ | |
| All have definitions | ✅/❌ | |
| No duplicates | ✅/❌ | |
```

#### Quiz Validation
```markdown
### Quiz Checks:
| Check | Status | Details |
|-------|--------|---------|
| Quiz array | ✅/❌ | [N] questions |
| All have question text | ✅/❌ | |
| All have 4 options | ✅/❌ | |
| All have correct answer | ✅/❌ | |
| Correct answers valid | ✅/❌ | All point to existing options |
```

#### Historical Accuracy
```bash
# Run anachronism check on lesson content
python scripts/historical_accuracy_checker.py --lesson {N}
```

```markdown
### Historical Accuracy:
| Check | Status | Details |
|-------|--------|---------|
| Content anachronisms | ✅/❌ | [N] found |
| Era consistency | ✅/❌ | All refs match [era] |
| Narrator appropriate | ✅/❌ | [narrator] fits era |
```

### Step 4: Present Validation Report
```markdown
## Lesson Validation Report: Lesson {N}

**Title:** [Lesson Title]
**Era:** [Era]
**Validated:** [timestamp]

### Summary
| Component | Status | Issues |
|-----------|--------|--------|
| Content | ✅ Complete | - |
| Chapters | ✅ 6/6 valid | - |
| Images | ✅ 6/6 present | - |
| Audio | ⏳ Pending | Not generated |
| Flashcards | ✅ 8 cards | - |
| Quiz | ✅ 5 questions | - |
| Historical | ✅ Accurate | - |

### Overall Status: ⚠️ PARTIAL (Audio pending)

### Issues Found:
1. ⏳ TTS audio not yet generated

### Recommendations:
1. Generate TTS audio with `/tts-generate lesson {N}`
```

## Example Usage

**User**: "/validate-lesson 10"

**Assistant**:
```
## Validating Lesson 10: The Stamp Act Crisis

### Content Structure
| Field | Status | Value |
|-------|--------|-------|
| ID | ✅ | lesson-10 |
| Title | ✅ | The Stamp Act Crisis |
| Era | ✅ | Year 1765 |
| Narrator | ✅ | Samuel Adams |
| Chapters | ✅ | 6 chapters |

### Chapters
| # | Title | Words | Image |
|---|-------|-------|-------|
| 1 | The Sugar Act | ✅ 342 | ✅ |
| 2 | The Stamp Act | ✅ 389 | ✅ |
| 3 | Colonial Resistance | ✅ 356 | ✅ |
| 4 | The Sons of Liberty | ✅ 378 | ✅ |
| 5 | Repeal | ✅ 334 | ✅ |
| 6 | Legacy | ✅ 312 | ✅ |

### Media Assets
| Asset | Status | Location |
|-------|--------|----------|
| Images | ✅ 6/6 | generated_images/.../keepers/ |
| Audio | ⏳ Pending | Not generated |

### Learning Content
| Type | Count | Status |
|------|-------|--------|
| Flashcards | 8 | ✅ Valid |
| Quiz Questions | 5 | ✅ Valid |

### Historical Accuracy
✅ No anachronisms detected in content
✅ Era references consistent (1765)
✅ Narrator (Samuel Adams) appropriate for era

### Overall: ⚠️ PARTIAL
Missing: TTS audio

Generate audio now? [Y/n]
```

---

**User**: "/validate-lesson all"

**Assistant**:
```
## Batch Lesson Validation

Validating all 51 lessons...

### Summary
| Status | Count | Lessons |
|--------|-------|---------|
| ✅ Complete | 0 | - |
| ⚠️ Missing Audio | 51 | All lessons |
| ❌ Issues | 0 | - |

### Common Issues:
- TTS audio pending for all lessons (awaiting V2 approval)

### By Component:
| Component | Complete | Partial | Missing |
|-----------|----------|---------|---------|
| Content | 51 | 0 | 0 |
| Images | 51 | 0 | 0 |
| Audio | 0 | 0 | 51 |
| Flashcards | 51 | 0 | 0 |
| Quiz | 51 | 0 | 0 |

All lessons ready except for TTS audio generation.
```

## Validation Criteria

### Content Requirements
- [ ] Lesson file exists in `data/lessons/`
- [ ] Has valid ID format (`lesson-{N}`)
- [ ] Title present and non-empty
- [ ] Description present (min 50 characters)
- [ ] Era specified
- [ ] Narrator specified
- [ ] At least 3 chapters

### Chapter Requirements
- [ ] Title present
- [ ] Content present (min 200 words)
- [ ] Image prompt present
- [ ] First-person narrative voice

### Image Requirements
- [ ] Generated image exists for each chapter
- [ ] Image in keepers folder (passed review)
- [ ] No pending anachronism fixes

### Audio Requirements
- [ ] Main WAV file exists
- [ ] File size reasonable (30-60 MB typical)
- [ ] Whisper verification passed

### Flashcard Requirements
- [ ] At least 5 flashcards
- [ ] Each has term and definition
- [ ] No duplicate terms

### Quiz Requirements
- [ ] At least 4 questions
- [ ] Each has question text
- [ ] Each has exactly 4 options
- [ ] Correct answer index valid (0-3)

## Integration with Other Skills

- **Before**: Content created with `/lesson-builder`
- **Images**: Generated with `/image-prompter`, reviewed with `/review-images`
- **Audio**: Generated with `/tts-generate`
- **Fix issues**: Use `/fix-anachronisms` for image problems
- **After**: Use `/deploy` when validation passes

## Output

Validation results can be saved to:
```
validation_reports/lesson_{N}_validation.json
```

## Notes

- Validation is read-only (no changes made)
- Use specific skills to fix identified issues
- Run validation after any lesson changes
- "Complete" status means all components present and valid
- "Partial" means some components missing but no errors
- "Failed" means structural problems need fixing
