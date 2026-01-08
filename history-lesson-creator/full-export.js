// Full lesson export - all 50 lessons with complete chapter text
const fs = require('fs');
const path = require('path');

// Read the lessons.ts file as text
const lessonsFile = fs.readFileSync(path.join(__dirname, 'data', 'lessons.ts'), 'utf8');

// Extract lesson objects with their full content
// This regex captures: id, title, description, and all chapters
const lessonPattern = /\{\s*id:\s*["']([^"']+)["'][^}]*title:\s*["']([^"']+)["'][^}]*description:\s*["']([^"']+)["'][^}]*story:\s*\{[^}]*narrator:\s*["']([^"']+)["'][^}]*chapters:\s*\[([\s\S]*?)\]\s*\}/g;

let fullContent = `# American History for 7th Grade - Complete Course Text\n\n`;
fullContent += `**All 50 Lessons with Full Chapter Content**\n\n`;
fullContent += `This file contains the complete text of all 50 American History lessons.\n`;
fullContent += `Each lesson is clearly marked, and each chapter within the lesson is labeled.\n`;
fullContent += `Use this to generate image prompts for each chapter.\n\n`;
fullContent += `---\n\n`;

let lessonCount = 0;

// Match all lessons
const lessonMatches = [...lessonsFile.matchAll(lessonPattern)];

for (const match of lessonMatches) {
    lessonCount++;
    const lessonId = match[1];
    const title = match[2].replace(/\\'/g, "'");
    const description = match[3].replace(/\\'/g, "'");
    const narrator = match[4].replace(/\\'/g, "'");
    const chaptersText = match[5];

    // Add lesson header
    fullContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    fullContent += `LESSON ${lessonCount} OF 50: ${title}\n`;
    fullContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    fullContent += `**Description:** ${description}\n\n`;
    fullContent += `**Narrator:** ${narrator}\n\n`;
    fullContent += `---\n\n`;

    // Extract chapters
    const chapterPattern = /\{\s*title:\s*["']([^"']+)["'][^}]*content:\s*["'`]([\s\S]*?)["'`]\s*\}/g;
    const chapterMatches = [...chaptersText.matchAll(chapterPattern)];

    let chapterNum = 0;
    for (const chapterMatch of chapterMatches) {
        chapterNum++;
        const chapterTitle = chapterMatch[1].replace(/\\'/g, "'");
        let chapterContent = chapterMatch[2]
            .replace(/\\'/g, "'")
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\s+/g, ' ')
            .trim();

        fullContent += `### CHAPTER ${chapterNum}: ${chapterTitle}\n\n`;
        fullContent += `${chapterContent}\n\n`;
        fullContent += `---\n\n`;
    }
}

// Create output directory
const outputDir = path.join(__dirname, 'lesson-exports');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write the file
fs.writeFileSync(path.join(outputDir, 'ALL-LESSONS-FULL-TEXT.md'), fullContent);

console.log('\n✅ Export Complete!\n');
console.log(`📄 Created: ALL-LESSONS-FULL-TEXT.md`);
console.log(`📊 Lessons: ${lessonCount}`);
console.log(`📦 Size: ${Math.round(fullContent.length / 1024)} KB\n`);
console.log('📁 Location: lesson-exports/ALL-LESSONS-FULL-TEXT.md\n');
console.log('💡 Upload this file to Grok, Gemini, or ChatGPT to get image prompts for each chapter!\n');
