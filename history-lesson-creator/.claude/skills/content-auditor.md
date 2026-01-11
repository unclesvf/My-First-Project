# Content Auditor Skill

## Description
Audit lesson content for completeness, consistency, and quality. Verifies all lessons have the required number of chapters, flashcards, and quiz questions. Reports any gaps or issues.

## Usage
User can invoke this skill by saying:
- "audit the content"
- "check lesson completeness"
- "verify all lessons"
- "content report"
- "/audit-content"

## Instructions

You are helping audit educational content for completeness and quality. Follow these steps:

### Step 1: Full Content Scan

Read the main content file and extract counts:

```bash
cd "C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator"
```

Read `data/lessons.ts` and count for each lesson:
- Number of chapters
- Number of flashcards
- Number of quiz questions
- Content length (word count)

### Step 2: Minimum Requirements Check

Each lesson MUST have:

| Component | Minimum | Target | Notes |
|-----------|---------|--------|-------|
| Chapters | 4 | 5-6 | Story mode content |
| Flashcards | 10 | 12 | Vocabulary/terms |
| Quiz Questions | 8 | 8 | Exactly 8 required |

### Step 3: Generate Audit Report

Create a detailed report showing:

```
# Content Audit Report
Generated: [DATE]

## Summary
- Total Lessons: [N]
- Lessons Passing: [N]
- Lessons with Issues: [N]

## Content Totals
- Total Chapters: [N]
- Total Flashcards: [N]
- Total Quiz Questions: [N]

## Lesson-by-Lesson Status

| Lesson | Title | Chapters | Flashcards | Quiz | Status |
|--------|-------|----------|------------|------|--------|
| 1 | Ancient Egypt | 5 | 12 | 8 | PASS |
| 2 | Greek Democracy | 4 | 10 | 8 | PASS |
| ... | ... | ... | ... | ... | ... |

## Issues Found

### Missing Chapters (< 4)
- [List lessons]

### Missing Flashcards (< 10)
- [List lessons]

### Missing Quiz Questions (< 8)
- [List lessons]

### Other Issues
- [Empty content, formatting issues, etc.]
```

### Step 4: Quality Checks

Beyond counts, check for:

#### Chapter Quality
- [ ] All chapters have content (not empty/placeholder)
- [ ] Content uses proper narrator voice
- [ ] No [PLACEHOLDER] markers remaining
- [ ] Appropriate length (200-600 words per chapter)

#### Flashcard Quality
- [ ] All terms have definitions
- [ ] Definitions are appropriate length
- [ ] No duplicate terms
- [ ] IDs are unique (fc-1, fc-2, etc.)

#### Quiz Quality
- [ ] All questions have 4 options
- [ ] correctOptionIndex is valid (0-3)
- [ ] All questions have explanations
- [ ] No duplicate questions
- [ ] IDs are unique (q-1, q-2, etc.)

### Step 5: Identify Priority Fixes

Rank issues by severity:

1. **Critical** - Blocks lesson use
   - Missing quiz questions (need exactly 8)
   - Empty chapters
   - Broken IDs

2. **High** - Degrades experience
   - Less than 4 chapters
   - Less than 10 flashcards
   - Missing explanations

3. **Medium** - Quality concerns
   - Short chapter content
   - Brief definitions
   - Duplicate content

4. **Low** - Minor improvements
   - Formatting inconsistencies
   - Word count variations

### Step 6: Generate Fix Tasks

For each issue found, create an actionable task:

```
## Fix Tasks

### Critical
1. Lesson 23: Add 3 quiz questions (currently 5/8)
2. Lesson 45: Fill in Chapter 3 content (currently placeholder)

### High Priority
3. Lesson 12: Add 2 more flashcards (currently 8/10)
4. Lesson 31: Add Chapter 5 (currently 4 chapters)

### Medium Priority
5. Lesson 7: Expand Chapter 2 (only 150 words)
```

## Audit Scripts

### Count Chapters per Lesson
```javascript
// count_chapters.js
const { lessons } = require('./data/lessons');

lessons.forEach((lesson, i) => {
  const chapterCount = lesson.story?.chapters?.length || 0;
  const status = chapterCount >= 4 ? 'OK' : 'LOW';
  console.log(`Lesson ${i + 1}: ${chapterCount} chapters [${status}]`);
});
```

### Count Flashcards per Lesson
```javascript
// count_flashcards.js
const { lessons } = require('./data/lessons');

lessons.forEach((lesson, i) => {
  const fcCount = lesson.flashcards?.length || 0;
  const status = fcCount >= 10 ? 'OK' : 'LOW';
  console.log(`Lesson ${i + 1}: ${fcCount} flashcards [${status}]`);
});
```

### Count Quiz Questions per Lesson
```javascript
// count_quizzes.js
const { lessons } = require('./data/lessons');

lessons.forEach((lesson, i) => {
  const qCount = lesson.quiz?.length || 0;
  const status = qCount === 8 ? 'OK' : (qCount < 8 ? 'LOW' : 'HIGH');
  console.log(`Lesson ${i + 1}: ${qCount} questions [${status}]`);
});
```

## Report Output Location

Save audit report to:
```
C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\AUDIT_REPORT.md
```

Or update the existing status file:
```
C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\PROGRESS_STATUS.md
```

## Example Output

```
# Content Audit Report
Generated: January 10, 2026

## Summary
- Total Lessons: 51 (50 regular + 1 bonus)
- Lessons Passing All Checks: 51
- Lessons with Issues: 0

## Content Totals
| Component | Count | Average per Lesson |
|-----------|-------|-------------------|
| Chapters | 260 | 5.1 |
| Flashcards | 512 | 10.0 |
| Quiz Questions | 408 | 8.0 |

## Status: ALL CHECKS PASSING

All 51 lessons meet minimum requirements:
- 4+ chapters per lesson
- 10+ flashcards per lesson
- 8 quiz questions per lesson

## Quality Metrics
- Average chapter length: 380 words
- Average flashcard definition: 45 words
- All quiz questions have explanations
```

## Example Interaction

**User:** "Audit the lesson content"

**Assistant:** I'll run a comprehensive content audit on all lessons.

*[Reads data/lessons.ts]*

Scanning 51 lessons for completeness...

**Audit Results:**

| Metric | Count | Status |
|--------|-------|--------|
| Total Lessons | 51 | |
| Chapters | 260 | 5.1 avg |
| Flashcards | 512 | 10.0 avg |
| Quiz Questions | 408 | 8.0 avg |

**All lessons pass minimum requirements.**

Detailed breakdown:
- All 51 lessons have 4+ chapters
- All 51 lessons have 10+ flashcards
- All 51 lessons have exactly 8 quiz questions

No critical issues found.

Would you like me to:
1. Generate a detailed per-lesson report?
2. Check content quality (word counts, placeholders)?
3. Export the audit to AUDIT_REPORT.md?

## Technical Notes

- Content is stored in `data/lessons.ts` as TypeScript
- Uses Lesson, Chapter, Flashcard, QuizQuestion types
- IDs follow pattern: lesson-N, fc-N, q-N
- Bonus lesson is "lesson-bonus-1"

## Success Metrics

A successful audit:
- Scans all lessons in the system
- Reports accurate counts
- Identifies all issues
- Prioritizes fixes by severity
- Provides actionable recommendations
