// Export lessons for AI assistants
// Run with: node export-lessons.js

const fs = require('fs');
const path = require('path');

// Load lessons data
const lessons = require('./data/lessons.ts').lessons;

// Create output directory
const outputDir = path.join(__dirname, 'lesson-exports');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('\n🚀 Exporting lessons for AI assistants...\n');

// ==================== 1. Generate Lesson Summary ====================
console.log('📋 Creating LESSON-SUMMARY.md...');

let summary = `# American History Course - Lesson Summary\n\n`;
summary += `**Course:** American History for 7th Grade\n`;
summary += `**Total Lessons:** 50\n`;
summary += `**Format:** Interactive stories with vocabulary and quizzes\n\n`;
summary += `## Lesson Titles and Topics\n\n`;

lessons.forEach((lesson, index) => {
  summary += `${index + 1}. **${lesson.title}**\n`;
  summary += `   ${lesson.description}\n\n`;
});

summary += `\n## Notes for Image Prompt Generation\n\n`;
summary += `This course covers American History chronologically from colonial times through modern history.\n\n`;
summary += `When creating image prompts:\n`;
summary += `1. Consider the historical period and setting\n`;
summary += `2. Include key figures mentioned in the story\n`;
summary += `3. Reflect the tone and perspective of the narrator\n`;
summary += `4. Capture important historical events or moments\n`;
summary += `5. Use historically accurate details (clothing, architecture, technology)\n\n`;
summary += `## Recommended Image Styles\n\n`;
summary += `- Historical realism for accuracy\n`;
summary += `- Illustrations for educational clarity\n`;
summary += `- Period-appropriate color palettes\n`;
summary += `- Engaging compositions for student interest\n`;
summary += `- Diverse perspectives showing multiple viewpoints\n`;

fs.writeFileSync(path.join(outputDir, 'LESSON-SUMMARY.md'), summary);
console.log('   ✓ Created LESSON-SUMMARY.md (', Math.round(summary.length / 1024), 'KB)\n');

// ==================== 2. Generate Combined Markdown ====================
console.log('📚 Creating ALL-LESSONS-COMBINED.md...');

let combined = `# American History for 7th Grade - Complete Course\n\n`;
combined += `**50 Lessons - Complete Text Export**\n\n`;
combined += `*Generated for AI image prompt assistance*\n\n`;
combined += `---\n\n`;

lessons.forEach((lesson, index) => {
  combined += `\n\n# LESSON ${index + 1}: ${lesson.title}\n\n`;
  combined += `${lesson.description}\n\n`;

  lesson.story.chapters.forEach((chapter) => {
    combined += `## ${chapter.title}\n\n`;
    combined += `${chapter.content}\n\n`;
  });

  combined += `---\n\n`;
});

fs.writeFileSync(path.join(outputDir, 'ALL-LESSONS-COMBINED.md'), combined);
console.log('   ✓ Created ALL-LESSONS-COMBINED.md (', Math.round(combined.length / 1024), 'KB)\n');

// ==================== 3. Generate JSON ====================
console.log('🔧 Creating lessons-data.json...');

const jsonData = lessons.map((lesson, index) => ({
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

const jsonStr = JSON.stringify(jsonData, null, 2);
fs.writeFileSync(path.join(outputDir, 'lessons-data.json'), jsonStr);
console.log('   ✓ Created lessons-data.json (', Math.round(jsonStr.length / 1024), 'KB)\n');

// ==================== 4. Generate Individual Markdown Files ====================
console.log('📄 Creating individual lesson files...');

const individualDir = path.join(outputDir, 'individual-lessons');
if (!fs.existsSync(individualDir)) {
  fs.mkdirSync(individualDir, { recursive: true });
}

lessons.forEach((lesson, index) => {
  const filename = `${String(index + 1).padStart(2, '0')}-${lesson.id}.md`;

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

  fs.writeFileSync(path.join(individualDir, filename), content);
});

console.log('   ✓ Created 50 individual lesson files in individual-lessons/\n');

// ==================== Done! ====================
console.log('✅ Export complete!\n');
console.log('📁 Files created in:', outputDir);
console.log('\n📤 Files ready to upload to Grok, Gemini, or ChatGPT:\n');
console.log('   1. LESSON-SUMMARY.md - Upload this FIRST for context');
console.log('   2. ALL-LESSONS-COMBINED.md - Complete course text');
console.log('   3. lessons-data.json - Structured data format');
console.log('   4. individual-lessons/ - 50 separate lesson files\n');
console.log('💡 Recommended prompt to use with AI:\n');
console.log('   "Please review these American History lessons and help me create');
console.log('   detailed image prompts for each chapter that would illustrate the');
console.log('   story effectively. Consider historical accuracy, educational value,');
console.log('   and student engagement."\n');
