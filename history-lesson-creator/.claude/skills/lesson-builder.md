# Lesson Builder Skill

## Description
Scaffold a new lesson with proper structure including chapters, flashcards, and quiz questions. Automatically validates against TypeScript types and adds to lessons.ts.

## Usage
User can invoke this skill by saying:
- "create a new lesson"
- "build a lesson about [topic]"
- "scaffold lesson [number]"
- "/lesson-builder"

## Instructions

You are helping create a new lesson for an educational course. Follow these steps carefully:

### Step 1: Gather Lesson Information

Ask the user for the following details (use AskUserQuestion if multiple pieces needed):

**Required Information:**
1. **Lesson Number**: What lesson number is this? (e.g., 51, 52, etc.)
2. **Subject**: What subject? (history, math, science, etc.)
3. **Title**: Lesson title (e.g., "The Civil Rights Movement")
4. **Description**: Brief description (1-2 sentences)
5. **Narrator**: Who tells the story? Include name, role, and year
   - Example: "Rosa Parks, civil rights activist, 1955"
   - Example: "Thomas Edison, inventor, 1879"
6. **Number of Chapters**: How many chapters? (typically 4-6)
7. **Grade Level**: Target grade level (for reading level guidance)

### Step 2: Validate Lesson Number

Before proceeding:
1. Read the current `data/lessons.ts` file
2. Find the highest lesson number currently in use
3. Check if the requested lesson number already exists
4. If it exists, ask user if they want to:
   - Replace it
   - Use the next available number
   - Cancel

### Step 3: Generate Chapter Structure

For each chapter (based on number from Step 1):
1. Ask user for chapter title
2. Provide a content template with:
   - Opening paragraph placeholder
   - Body paragraphs (2-3)
   - Closing paragraph
   - Historical context notes
   - Suggested word count based on grade level

Example chapter template:
```typescript
{
  title: "Chapter Title Here",
  content: `[Opening paragraph - introduce the main event/concept of this chapter. Include sensory details and emotional context.]

[Body paragraph 1 - provide historical context and background. Include specific dates, names, and places.]

[Body paragraph 2 - describe the main action or development. Include dialogue or personal perspective from the narrator.]

[Body paragraph 3 - show the consequences or impact. Connect to broader historical themes.]

[Closing paragraph - reflect on the significance. Link to the next chapter or overall lesson theme.]`
}
```

### Step 4: Generate Flashcard Templates

Create 10-12 flashcard objects with:
- Key terms from the lesson topic
- Historical vocabulary
- Important concepts
- Names and dates

Provide template structure:
```typescript
{
  id: "fc-1",
  term: "[TERM TO DEFINE]",
  definition: "[Clear, concise definition suitable for grade level. Include historical context if relevant.]"
}
```

**Flashcard Guidelines:**
- Start with most important/fundamental terms
- Include 2-3 people names (with roles/dates)
- Include 2-3 key events
- Include 2-3 concepts/movements
- Include 1-2 vocabulary words
- Definitions should be 1-3 sentences
- Use age-appropriate language

### Step 5: Generate Quiz Questions

Create 8 quiz questions with:
- Multiple choice format (4 options each)
- Mix of difficulty levels
- Various question types (recall, comprehension, analysis)

Question template:
```typescript
{
  id: "q-1",
  question: "[Question text here. Be specific and clear.]",
  options: [
    "[Correct answer - make it clearly right but not too obvious]",
    "[Plausible distractor - similar but wrong]",
    "[Plausible distractor - related concept but wrong context]",
    "[Obviously wrong but related to topic]"
  ],
  correctOptionIndex: 0,
  explanation: "[Explain why the correct answer is right AND why it matters. 2-3 sentences.]"
}
```

**Quiz Guidelines:**
- Questions 1-3: Recall/knowledge (easier)
- Questions 4-6: Comprehension/application (medium)
- Questions 7-8: Analysis/evaluation (harder)
- Rotate correctOptionIndex (don't make all answers option 0)
- Explanations should teach, not just confirm

### Step 6: Generate Complete Lesson Object

Combine all pieces into proper TypeScript format:

```typescript
{
  id: "lesson-[NUMBER]",
  title: "[TITLE]",
  description: "[DESCRIPTION]",
  heroImage: "/images/hero-[SLUG].jpg",
  story: {
    narrator: "[NARRATOR]",
    chapters: [
      // Chapter objects here
    ],
  },
  flashcards: [
    // Flashcard objects here
  ],
  quiz: [
    // Quiz objects here
  ],
}
```

### Step 7: Validate Structure

Before adding to file, verify:
- [ ] All required fields present
- [ ] Proper TypeScript syntax
- [ ] Correct number of chapters (matches user request)
- [ ] 10-12 flashcards
- [ ] Exactly 8 quiz questions
- [ ] No duplicate IDs
- [ ] Proper quote escaping
- [ ] Content in template literal backticks

### Step 8: Add to lessons.ts

1. Read `data/lessons.ts`
2. Find the `export const lessons: Lesson[] = [` array
3. Add new lesson object at appropriate position (maintain numerical order)
4. Ensure proper comma placement
5. Validate TypeScript compiles with `npm run build` or type-check

### Step 9: Confirmation

After successfully adding the lesson:
1. Show summary of what was created:
   - Lesson number and title
   - Number of chapters created
   - Number of flashcards created
   - Number of quiz questions created
   - File location
2. Suggest next steps:
   - Fill in chapter content placeholders
   - Review flashcard definitions
   - Test quiz questions
   - Add hero image at `/public/images/hero-[slug].jpg`
3. Offer to commit changes to git

## Helper Prompts

**For chapter content:**
"I'll create [N] chapter templates. For each chapter, the structure will guide you on what content to add. Focus on making the narrator's perspective authentic and engaging for [grade level] students."

**For flashcards:**
"I'll generate [N] flashcard templates based on common terms for this topic. You can refine the definitions after I create the structure."

**For quizzes:**
"I'll create 8 quiz questions with varying difficulty. The first 3 focus on recall, the middle 3 on comprehension, and the last 2 on analysis."

## Error Handling

If any step fails:
1. Show clear error message
2. Explain what went wrong
3. Offer to retry or adjust
4. Don't proceed to next step until current step succeeds

Common errors to handle:
- Lesson number already exists
- Invalid lesson number (not a number)
- Missing required fields
- TypeScript compilation errors
- File write permissions

## Example Interaction

**User:** "Create a new lesson about the Industrial Revolution"

**Assistant:** I'll help you build a new lesson about the Industrial Revolution. Let me gather some information:

*[Uses AskUserQuestion for details]*

**Questions:**
1. What lesson number should this be?
2. Who should be the narrator? (Include name, role, and year)
3. How many chapters? (typically 4-6)
4. What grade level is this for?

*[User provides answers]*

**Assistant:** Great! I'll create Lesson 51: "The Industrial Revolution" with narrator "Samuel Slater, factory owner, 1820" and 5 chapters.

*[Generates structure]*

**Assistant:** ✅ Created new lesson structure:
- Lesson 51: The Industrial Revolution
- 5 chapters with content templates
- 12 flashcards with term placeholders
- 8 quiz questions with options

The lesson has been added to `data/lessons.ts`. Here's what to do next:
1. Fill in the chapter content (look for [placeholder] markers)
2. Review and refine flashcard definitions
3. Test the quiz questions for clarity
4. Add hero image at `/public/images/hero-industrial-revolution.jpg`

Would you like me to commit these changes to git?

## Technical Notes

- Uses existing types from `lib/types.ts` (Lesson, Chapter, Flashcard, QuizQuestion)
- Maintains consistent ID format: `lesson-N`, `fc-N`, `q-N`
- Follows existing code style in lessons.ts
- Preserves existing lessons when adding new one
- Validates TypeScript compilation before confirming success

## Success Metrics

A successful lesson build includes:
- Valid TypeScript that compiles without errors
- All required fields populated (may have placeholder content)
- Consistent formatting with existing lessons
- Proper IDs that don't conflict
- Appropriate reading level for target grade
- Educational value in quiz questions and flashcards
