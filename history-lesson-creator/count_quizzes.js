const fs = require('fs');
const content = fs.readFileSync('data/lessons.ts', 'utf8');

// Find all lesson blocks
const lessonPattern = /id: "lesson-(\d+)"[\s\S]*?quiz: \[([\s\S]*?)\],\s*\}/g;
const results = [];

let match;
while ((match = lessonPattern.exec(content)) !== null) {
  const lessonNum = match[1];
  const quizContent = match[2];

  // Count questions by counting id: occurrences within quiz section
  const questionCount = (quizContent.match(/\bid:\s*"q/g) || []).length;

  results.push({ lesson: lessonNum, count: questionCount });
}

// Sort by lesson number
results.sort((a, b) => parseInt(a.lesson) - parseInt(b.lesson));

console.log('\n=== QUIZ AUDIT RESULTS ===\n');

const at8 = results.filter(r => r.count === 8);
const needsExpansion = results.filter(r => r.count < 8);
const above8 = results.filter(r => r.count > 8);

if (at8.length > 0) {
  console.log('Lessons with 8 questions (target):');
  at8.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} questions ✓`));
}

if (above8.length > 0) {
  console.log('\nLessons with >8 questions:');
  above8.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} questions`));
}

console.log('\nLessons needing expansion (<8 questions):');
needsExpansion.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} questions → needs ${8 - r.count} more`));

console.log(`\nSUMMARY:`);
console.log(`  At target (8 questions): ${at8.length} lessons`);
console.log(`  Above target (>8): ${above8.length} lessons`);
console.log(`  Need expansion: ${needsExpansion.length} lessons`);
console.log(`  Total questions to add: ${needsExpansion.reduce((sum, r) => sum + (8 - r.count), 0)}`);
console.log(`  Current total questions: ${results.reduce((sum, r) => sum + r.count, 0)}`);
