// Fix the lesson numbering in the exported file
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lesson-exports', 'ALL-LESSONS-FULL-TEXT.md');
let content = fs.readFileSync(filePath, 'utf8');

// Find all lesson headers and renumber them 1-50
let lessonNum = 0;
content = content.replace(/LESSON \d+ OF 50:/g, (match) => {
    lessonNum++;
    return `LESSON ${lessonNum} OF 50:`;
});

// Write back the fixed file
fs.writeFileSync(filePath, content);

console.log(`✅ Fixed lesson numbering: ${lessonNum} lessons renumbered correctly`);
