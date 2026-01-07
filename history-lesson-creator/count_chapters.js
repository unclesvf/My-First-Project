const fs = require('fs');
const content = fs.readFileSync('data/lessons.ts', 'utf8');

// Find all lesson blocks
const lessonPattern = /id: "lesson-(\d+)"[\s\S]*?chapters: \[([\s\S]*?)\],\s*\},\s*flashcards:/g;
const results = [];

let match;
while ((match = lessonPattern.exec(content)) !== null) {
  const lessonNum = match[1];
  const chaptersContent = match[2];

  // Count chapters by counting title: occurrences within chapters section
  const chapterCount = (chaptersContent.match(/\btitle:\s*"/g) || []).length;

  results.push({ lesson: lessonNum, count: chapterCount });
}

// Sort by lesson number
results.sort((a, b) => parseInt(a.lesson) - parseInt(b.lesson));

console.log('\n=== CHAPTER AUDIT RESULTS ===\n');

const above5 = results.filter(r => r.count > 5);
const at5 = results.filter(r => r.count === 5);
const at4 = results.filter(r => r.count === 4);
const at3 = results.filter(r => r.count === 3);
const below3 = results.filter(r => r.count < 3);

if (above5.length > 0) {
  console.log('Lessons with >5 chapters:');
  above5.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} chapters`));
}

if (at5.length > 0) {
  console.log('\nLessons with 5 chapters (target):');
  at5.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} chapters ✓`));
}

if (at4.length > 0) {
  console.log('\nLessons with 4 chapters:');
  at4.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} chapters`));
}

if (at3.length > 0) {
  console.log('\nLessons with 3 chapters (need expansion):');
  at3.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} chapters → needs ${5 - r.count} more`));
}

if (below3.length > 0) {
  console.log('\nLessons with <3 chapters (urgent):');
  below3.forEach(r => console.log(`  Lesson ${r.lesson}: ${r.count} chapters → needs ${5 - r.count} more`));
}

console.log(`\nSUMMARY:`);
console.log(`  Above target (>5 chapters): ${above5.length} lessons`);
console.log(`  At target (5 chapters): ${at5.length} lessons`);
console.log(`  Close (4 chapters): ${at4.length} lessons`);
console.log(`  Need expansion (3 chapters): ${at3.length} lessons`);
console.log(`  Urgent (<3 chapters): ${below3.length} lessons`);
console.log(`  Total lessons: ${results.length}`);
console.log(`  Total chapters to add to reach 5 minimum: ${results.reduce((sum, r) => sum + Math.max(0, 5 - r.count), 0)}`);
console.log(`  Current total chapters: ${results.reduce((sum, r) => sum + r.count, 0)}`);
