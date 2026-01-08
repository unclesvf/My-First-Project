const fs = require('fs');
const path = require('path');

// Import lessons data
const { lessons } = require('../data/lessons.ts');

// Create output directory
const outputDir = path.join(__dirname, '../lesson-exports');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Exporting lessons...\n');

// ==================== 1. Export as individual Markdown files ====================
const markdownDir = path.join(outputDir, 'markdown');
if (!fs.existsSync(markdownDir)) {
  fs.mkdirSync(markdownDir, { recursive: true });
}

lessons.forEach((lesson, index) => {
  const filename = `${String(index + 1).padStart(2, '0')}-${lesson.id}.md`;
  const filepath = path.join(markdownDir, filename);

  let content = `# ${lesson.title}\n\n`;
  content += `**Lesson ${index + 1} of 50**\n\n`;
  content += `${lesson.description}\n\n`;
  content += `---\n\n`;
  content += `## Story\n\n`;
  content += `*Narrator: ${lesson.story.narrator}*\n\n`;

  lesson.story.chapters.forEach((chapter, chapterIndex) => {
    content += `### Chapter ${chapterIndex + 1}: ${chapter.title}\n\n`;
    content += `${chapter.content}\n\n`;
  });

  content += `---\n\n`;
  content += `## Vocabulary (${lesson.flashcards.length} terms)\n\n`;

  lesson.flashcards.forEach((card) => {
    content += `**${card.term}**: ${card.definition}\n\n`;
  });

  content += `---\n\n`;
  content += `## Quiz Questions (${lesson.quiz.length} questions)\n\n`;

  lesson.quiz.forEach((question, qIndex) => {
    content += `${qIndex + 1}. ${question.question}\n`;
    question.options.forEach((option, optIndex) => {
      const isCorrect = optIndex === question.correctOptionIndex;
      content += `   ${String.fromCharCode(65 + optIndex)}. ${option}${isCorrect ? ' ✓' : ''}\n`;
    });
    content += `   *${question.explanation}*\n\n`;
  });

  fs.writeFileSync(filepath, content);
  console.log(`✓ Created: ${filename}`);
});

// ==================== 2. Export as single combined Markdown file ====================
let combinedMarkdown = `# American History for 7th Grade - Complete Course\n\n`;
combinedMarkdown += `**50 Lessons - Complete Text Export**\n\n`;
combinedMarkdown += `*Generated for AI image prompt assistance*\n\n`;
combinedMarkdown += `---\n\n`;

lessons.forEach((lesson, index) => {
  combinedMarkdown += `\n\n# LESSON ${index + 1}: ${lesson.title}\n\n`;
  combinedMarkdown += `${lesson.description}\n\n`;

  lesson.story.chapters.forEach((chapter, chapterIndex) => {
    combinedMarkdown += `## ${chapter.title}\n\n`;
    combinedMarkdown += `${chapter.content}\n\n`;
  });

  combinedMarkdown += `---\n\n`;
});

fs.writeFileSync(
  path.join(outputDir, 'ALL-LESSONS-COMBINED.md'),
  combinedMarkdown
);
console.log(`\n✓ Created: ALL-LESSONS-COMBINED.md (${(combinedMarkdown.length / 1024).toFixed(0)} KB)`);

// ==================== 3. Export as JSON ====================
const jsonExport = lessons.map((lesson, index) => ({
  lessonNumber: index + 1,
  id: lesson.id,
  title: lesson.title,
  description: lesson.description,
  narrator: lesson.story.narrator,
  chapters: lesson.story.chapters.map((chapter, chapterIndex) => ({
    chapterNumber: chapterIndex + 1,
    title: chapter.title,
    content: chapter.content
  })),
  vocabulary: lesson.flashcards.map(card => ({
    term: card.term,
    definition: card.definition
  })),
  quizQuestions: lesson.quiz.map(q => ({
    question: q.question,
    correctAnswer: q.options[q.correctOptionIndex],
    explanation: q.explanation
  }))
}));

fs.writeFileSync(
  path.join(outputDir, 'lessons-data.json'),
  JSON.stringify(jsonExport, null, 2)
);
console.log(`✓ Created: lessons-data.json`);

// ==================== 4. Export story-only text files for image prompts ====================
const storiesDir = path.join(outputDir, 'stories-only');
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

lessons.forEach((lesson, index) => {
  const filename = `lesson-${String(index + 1).padStart(2, '0')}-story.txt`;
  const filepath = path.join(storiesDir, filename);

  let content = `LESSON ${index + 1}: ${lesson.title}\n`;
  content += `${'='.repeat(60)}\n\n`;

  lesson.story.chapters.forEach((chapter, chapterIndex) => {
    content += `CHAPTER ${chapterIndex + 1}: ${chapter.title}\n`;
    content += `${'-'.repeat(60)}\n\n`;
    content += `${chapter.content}\n\n\n`;
  });

  fs.writeFileSync(filepath, content);
});

console.log(`✓ Created: 50 story-only text files in stories-only/`);

// ==================== 5. Create a summary file for AI context ====================
const summaryContent = `# American History Course - Lesson Summary

**Course:** American History for 7th Grade
**Total Lessons:** 50
**Format:** Interactive stories with vocabulary and quizzes

## Lesson Titles and Topics

${lessons.map((lesson, index) =>
  `${index + 1}. **${lesson.title}**\n   ${lesson.description}`
).join('\n\n')}

## Notes for Image Prompt Generation

This course covers American History chronologically from colonial times through modern history. Each lesson includes:

- **Story**: Narrative format told by different historical figures
- **Vocabulary**: 10-12 key terms related to the lesson
- **Quiz**: 8 comprehension questions

When creating image prompts:
1. Consider the historical period and setting
2. Include key figures mentioned in the story
3. Reflect the tone and perspective of the narrator
4. Capture important historical events or moments
5. Use historically accurate details (clothing, architecture, technology)

## Recommended Image Styles

- **Historical realism** for accuracy
- **Illustrations** for educational clarity
- **Period-appropriate** color palettes
- **Engaging compositions** for student interest
- **Diverse perspectives** showing multiple viewpoints

## Export Files Available

1. **markdown/** - Individual markdown files per lesson (detailed)
2. **stories-only/** - Plain text story content only
3. **ALL-LESSONS-COMBINED.md** - Single file with all lessons
4. **lessons-data.json** - Structured JSON data
5. **LESSON-SUMMARY.md** - This summary file

Choose the format that works best for your AI assistant!
`;

fs.writeFileSync(
  path.join(outputDir, 'LESSON-SUMMARY.md'),
  summaryContent
);
console.log(`✓ Created: LESSON-SUMMARY.md`);

console.log(`\n✅ Export complete!`);
console.log(`\nFiles created in: ${outputDir}`);
console.log(`\nYou can now upload these files to Grok, Gemini, or other AI assistants.`);
console.log(`\nRecommended files to upload:`);
console.log(`  - LESSON-SUMMARY.md (overview + all lesson titles)`);
console.log(`  - ALL-LESSONS-COMBINED.md (complete text, large file)`);
console.log(`  - Or individual files from markdown/ folder (one at a time)`);
