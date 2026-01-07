const fs = require('fs');
const content = fs.readFileSync('data/lessons.ts', 'utf8');

// Find all lesson blocks
const lessonPattern = /id: "lesson-(\d+)"[\s\S]*?flashcards: \[([\s\S]*?)\],\s*quiz:/g;
const results = [];

let match;
while ((match = lessonPattern.exec(content)) !== null) {
  const lessonNum = match[1];
  const flashcardContent = match[2];

  // Count flashcards by counting id: occurrences within flashcards section
  const flashcardCount = (flashcardContent.match(/\bid:\s*"fc/g) || []).length;

  results.push({ lesson: lessonNum, count: flashcardCount });
}

// Sort by lesson number
results.sort((a, b) => parseInt(a.lesson) - parseInt(b.lesson));

console.log('\n=== FLASHCARD AUDIT RESULTS ===\n');

const at8 = results.filter(r => r.count === 8);
const needsExpansion = results.filter(r => r.count < 8);
const above8 = results.filter(r => r.count > 8);

if (at8.length > 0) {
  console.log('Lessons with 8 flashcards (target):');
  at8.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} flashcards ✓`));
}

if (above8.length > 0) {
  console.log('\nLessons with >8 flashcards:');
  above8.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} flashcards`));
}

if (needsExpansion.length > 0) {
  console.log('\nLessons needing expansion (<8 flashcards):');
  needsExpansion.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} flashcards → needs ${8 - r.count} more`));
}

console.log(`\nSUMMARY:`);
console.log(`  At target (8 flashcards): ${at8.length} lessons`);
console.log(`  Above target (>8): ${above8.length} lessons`);
console.log(`  Need expansion: ${needsExpansion.length} lessons`);
console.log(`  Total flashcards to add: ${needsExpansion.reduce((sum, r) => sum + (8 - r.count), 0)}`);
console.log(`  Current total flashcards: ${results.reduce((sum, r) => sum + r.count, 0)}`);
