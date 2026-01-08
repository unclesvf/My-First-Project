// Full lesson export - all 50 lessons with complete chapter text
const fs = require('fs');
const path = require('path');

// Read the lessons.ts file as text
const lessonsFile = fs.readFileSync(path.join(__dirname, 'data', 'lessons.ts'), 'utf8');

let fullContent = `# American History for 7th Grade - Complete Course Text\n\n`;
fullContent += `**All 50 Lessons with Full Chapter Content**\n\n`;
fullContent += `This file contains the complete text of all 50 American History lessons.\n`;
fullContent += `Each lesson is clearly marked, and each chapter within the lesson is labeled.\n`;
fullContent += `Use this to generate image prompts for each chapter.\n\n`;
fullContent += `Total: 50 Lessons | ~254 Chapters\n\n`;
fullContent += `---\n\n`;

// Extract the lessons array content
const lessonsArrayMatch = lessonsFile.match(/export const lessons: Lesson\[\] = \[([\s\S]*)\];/);
if (!lessonsArrayMatch) {
    console.error('Could not find lessons array');
    process.exit(1);
}

const lessonsArrayContent = lessonsArrayMatch[1];

// Split by top-level lesson objects - look for pattern: },\n  {
// We'll split more carefully by looking for lesson boundaries
const lessonObjects = [];
let currentLesson = '';
let braceDepth = 0;
let inLesson = false;

for (let i = 0; i < lessonsArrayContent.length; i++) {
    const char = lessonsArrayContent[i];

    if (char === '{') {
        braceDepth++;
        if (braceDepth === 1) {
            inLesson = true;
            currentLesson = '{';
            continue;
        }
    } else if (char === '}') {
        braceDepth--;
        if (braceDepth === 0 && inLesson) {
            currentLesson += '}';
            lessonObjects.push(currentLesson);
            currentLesson = '';
            inLesson = false;
            continue;
        }
    }

    if (inLesson) {
        currentLesson += char;
    }
}

console.log(`Found ${lessonObjects.length} lesson objects`);

let lessonCount = 0;

for (const lessonText of lessonObjects) {
    lessonCount++;

    // Extract basic info
    const idMatch = lessonText.match(/id:\s*["']([^"']+)["']/);
    const titleMatch = lessonText.match(/title:\s*["']([^"']+)["']/);
    const descMatch = lessonText.match(/description:\s*["']([^"']+)["']/);
    const narratorMatch = lessonText.match(/narrator:\s*["']([^"']+)["']/);

    if (!titleMatch) {
        console.warn(`Lesson ${lessonCount}: No title found`);
        continue;
    }

    const lessonId = idMatch ? idMatch[1] : `lesson-${lessonCount}`;
    const title = titleMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
    const description = descMatch ? descMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : '';
    const narrator = narratorMatch ? narratorMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : '';

    // Add lesson header
    fullContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    fullContent += `LESSON ${lessonCount} OF 50: ${title}\n`;
    fullContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    fullContent += `**Lesson ID:** ${lessonId}\n\n`;
    fullContent += `**Description:** ${description}\n\n`;
    fullContent += `**Narrator:** ${narrator}\n\n`;
    fullContent += `---\n\n`;

    // Extract chapters - look for chapter objects
    const chaptersMatch = lessonText.match(/chapters:\s*\[([\s\S]*?)\]\s*,?\s*\}/);
    if (chaptersMatch) {
        const chaptersText = chaptersMatch[1];

        // Extract each chapter
        const chapterMatches = [...chaptersText.matchAll(/\{\s*title:\s*["']([^"']+)["'],\s*content:\s*`([\s\S]*?)`\s*\}/g)];

        let chapterNum = 0;
        for (const chapterMatch of chapterMatches) {
            chapterNum++;

            const chapterTitle = chapterMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
            const chapterContent = chapterMatch[2]
                .replace(/\\'/g, "'")
                .replace(/\\"/g, '"')
                .trim();

            fullContent += `### CHAPTER ${chapterNum}: ${chapterTitle}\n\n`;

            if (chapterContent) {
                // Split into paragraphs for better readability
                const paragraphs = chapterContent.split(/\n\n+/);
                for (const para of paragraphs) {
                    if (para.trim()) {
                        fullContent += `${para.trim()}\n\n`;
                    }
                }
            } else {
                fullContent += `[Content not found]\n\n`;
            }

            fullContent += `\n---\n\n`;
        }

        console.log(`Lesson ${lessonCount}: "${title}" - ${chapterNum} chapters extracted`);
    } else {
        console.warn(`Lesson ${lessonCount}: No chapters found`);
    }
}

// Create output directory
const outputDir = path.join(__dirname, 'lesson-exports');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write the file
const outputPath = path.join(outputDir, 'ALL-LESSONS-FULL-TEXT.md');
fs.writeFileSync(outputPath, fullContent);

const fileSizeKB = Math.round(fullContent.length / 1024);

console.log('\n✅ Export Complete!\n');
console.log(`📄 Created: ALL-LESSONS-FULL-TEXT.md`);
console.log(`📊 Lessons extracted: ${lessonCount}`);
console.log(`📦 File size: ${fileSizeKB} KB\n`);
console.log('📁 Location: lesson-exports/ALL-LESSONS-FULL-TEXT.md\n');
console.log('💡 This file contains all lesson text with clear markers for each lesson and chapter.');
console.log('   Upload to Grok, Gemini, or ChatGPT to generate image prompts!\n');
