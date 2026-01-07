# Continue History Lesson Creator on iPhone

## Project Location
**Full Path**: `C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\`

## Current Status ✅

### Completed:
- ✅ Full Next.js application built and working
- ✅ 3 complete lessons with full stories, flashcards, and quizzes
  - Lesson 1: Spanish & English Settlement (1565-1607)
  - Lesson 2: Jamestown Survival (1607-1620)
  - Lesson 3: Mayflower Compact (1620-1630)
- ✅ Development server running at http://localhost:3000
- ✅ All components built (StoryReader, FlashcardDeck, QuizEngine)

### Remaining Work:
- ⏳ Lessons 4-50 need to be generated (47 lessons)
- ⏳ Covers: Colonial Period → WWI (1630-1918)

## Key Files to Reference

### Main Content File:
**`data/lessons.ts`** - Contains all lesson data
- Currently has lessons 1-3
- Need to add lessons 4-50 before the final `];`

### Lesson Outline:
**`LESSON_OUTLINE.md`** - Complete list of all 50 lesson topics

### File Structure:
```
history-lesson-creator/
├── data/
│   └── lessons.ts          ← ADD NEW LESSONS HERE
├── LESSON_OUTLINE.md       ← SEE ALL TOPICS HERE
├── lib/
│   └── types.ts            ← TypeScript structure
└── components/             ← Already built
```

## Lesson Structure Template

Each lesson follows this exact TypeScript structure:

```typescript
{
  id: "lesson-X",
  title: "Lesson Title",
  description: "Brief description",
  heroImage: "/images/hero-lessonX.jpg",
  story: {
    narrator: "Character name, age, context",
    chapters: [
      {
        title: "Chapter Title",
        content: `3-4 paragraphs of engaging first-person narrative...`
      },
      // 3-4 chapters total
    ]
  },
  flashcards: [
    {
      id: "fcX-1",
      term: "Term",
      definition: "Clear definition..."
    },
    // 6-8 flashcards total
  ],
  quiz: [
    {
      id: "qX-1",
      question: "Question text?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctOptionIndex: 0,
      explanation: "Detailed explanation..."
    },
    // 6-8 questions total
  ]
},
```

## Next Lessons to Generate

### Lessons 4-10 (Colonial Period):
4. City Upon a Hill - Massachusetts Bay Colony (1630-1650)
5. Diversity in the Colonies - Middle Colonies (1664-1700)
6. The Southern Way - Southern Colonies & Slavery (1660-1700)
7. Triangular Trade - Colonial Economy (1650-1750)
8. The Great Awakening - Religious Revival (1730-1750)
9. French and Indian War (1754-1763)
10. Colonial Life on Eve of Revolution (1763)

### Lessons 11-18 (Revolutionary Era):
11. No Taxation Without Representation - Stamp Act (1765)
12. Boston Massacre (1770)
13. Boston Tea Party (1773)
14. Shot Heard Round the World - Lexington & Concord (1775)
15. Common Sense & Independence (1776)
16. Winter at Valley Forge (1777-1778)
17. Victory at Yorktown (1781)
18. Constitutional Convention (1787-1789)

### Lessons 19-25 (Early Republic):
19. President Washington (1789-1797)
20. Bill of Rights (1791)
21. Hamilton vs. Jefferson (1790s)
22. Louisiana Purchase (1803)
23. Lewis and Clark (1804-1806)
24. War of 1812 (1812-1815)
25. Monroe Doctrine (1823)

### Lessons 26-50:
See LESSON_OUTLINE.md for complete list through WWI

## Instructions for iPhone Claude

**Prompt to use:**

"I'm continuing a project to build a History Lesson Creator for 7th graders. I've built a Next.js app with 3 complete lessons and need to generate lessons 4-50.

Project details:
- File to edit: data/lessons.ts
- See CONTINUE_ON_MOBILE.md for structure
- Each lesson needs: 3-4 story chapters, 6-8 flashcards, 6-8 quiz questions
- First-person narratives, historically accurate, age-appropriate
- Follow exact TypeScript structure shown in template

Please generate lessons 4-20 following the same quality and format as lessons 1-3. Start with lesson 4 (City Upon a Hill - Massachusetts Bay Colony 1630-1650) and continue through lesson 20 (Bill of Rights 1791).

Use the lesson outline in LESSON_OUTLINE.md for topics and dates."

## How to Add Generated Content

1. Open `data/lessons.ts`
2. Find line 545: `];`
3. Insert new lesson objects BEFORE the `];`
4. Each lesson should be comma-separated
5. Test with: `npm run build`

## Testing After Adding Lessons

```bash
cd history-lesson-creator
npm run build
npm run dev
```

Open http://localhost:3000 and verify new lessons appear.

## Token Estimate
- Each full-quality lesson: ~4,800 tokens
- Lessons 4-20 (17 lessons): ~81,600 tokens
- Lessons 21-40 (20 lessons): ~96,000 tokens
- Lessons 41-50 (10 lessons): ~48,000 tokens

**Plan**: Generate in 2-3 sessions for best quality.

---

## Quick Reference

**Project Path**: `C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator\`

**Main File**: `data/lessons.ts`

**Dev Server**: `npm run dev` → http://localhost:3000

**Next Step**: Generate lessons 4-20 (Colonial Period through Bill of Rights)
