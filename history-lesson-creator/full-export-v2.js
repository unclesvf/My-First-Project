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
fullContent += `---\n\n`;

// Split by lesson objects
const lessonSections = lessonsFile.split(/\{\s*id:/g).slice(1); // Skip the first empty section

let lessonCount = 0;

for (const section of lessonSections) {
    lessonCount++;

    // Extract basic info
    const idMatch = section.match(/["']([^"']+)["']/);
    const titleMatch = section.match(/title:\s*["']([^"']+)["']/);
    const descMatch = section.match(/description:\s*["']([^"']+)["']/);
    const narratorMatch = section.match(/narrator:\s*["']([^"']+)["']/);

    if (!titleMatch) continue;

    const lessonId = idMatch ? idMatch[1] : `lesson-${lessonCount}`;
    const title = titleMatch[1].replace(/\\'/g, "'");
    const description = descMatch ? descMatch[1].replace(/\\'/g, "'") : '';
    const narrator = narratorMatch ? narratorMatch[1].replace(/\\'/g, "'") : '';

    // Add lesson header
    fullContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    fullContent += `LESSON ${lessonCount} OF 50: ${title}\n`;
    fullContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    fullContent += `**Lesson ID:** ${lessonId}\n\n`;
    fullContent += `**Description:** ${description}\n\n`;
    fullContent += `**Narrator:** ${narrator}\n\n`;
    fullContent += `---\n\n`;

    // Extract chapters - look for chapter objects within this lesson
    const chaptersSection = section.match(/chapters:\s*\[([\s\S]*?)\]\s*,?\s*}/);
    if (chaptersSection) {
        const chaptersText = chaptersSection[1];

        // Split by chapter objects
        const chapterParts = chaptersText.split(/\{\s*title:/g).slice(1);

        let chapterNum = 0;
        for (const chapterPart of chapterParts) {
            chapterNum++;

            // Extract chapter title
            const chapterTitleMatch = chapterPart.match(/["']([^"']+)["']/);
            if (!chapterTitleMatch) continue;

            const chapterTitle = chapterTitleMatch[1].replace(/\\'/g, "'");

            // Extract content - look for content in backticks
            const contentMatch = chapterPart.match(/content:\s*`([\s\S]*?)`\s*[,}]/);
            let chapterContent = '';

            if (contentMatch) {
                chapterContent = contentMatch[1]
                    .replace(/\\'/g, "'")
                    .replace(/\\"/g, '"')
                    .trim();
            }

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
