// Simple export script - extracts lesson data as text
const fs = require('fs');
const path = require('path');

// Read the lessons.ts file as text
const lessonsFile = fs.readFileSync(path.join(__dirname, 'data', 'lessons.ts'), 'utf8');

// Extract lesson objects using regex
const lessonMatches = lessonsFile.matchAll(/\{[\s\S]*?id:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?description:\s*["']([^"']+)["']/g);

const lessons = [];
for (const match of lessonMatches) {
  lessons.push({
    id: match[1],
    title: match[2].replace(/\\'/g, "'"),
    description: match[3].replace(/\\'/g, "'")
  });
}

// Create output directory
const outputDir = path.join(__dirname, 'lesson-exports');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`\n✅ Found ${lessons.length} lessons\n`);

// Generate LESSON-SUMMARY.md
let summary = `# American History Course - Lesson Summary\n\n`;
summary += `**Course:** American History for 7th Grade\n`;
summary += `**Total Lessons:** ${lessons.length}\n\n`;
summary += `## All Lesson Titles\n\n`;

lessons.forEach((lesson, index) => {
  summary += `${index + 1}. **${lesson.title}**\n`;
  summary += `   ${lesson.description}\n\n`;
});

summary += `\n## Instructions for AI Assistants\n\n`;
summary += `This course covers American History for 7th grade students.\n\n`;
summary += `To view the complete lesson content, visit:\n`;
summary += `https://auntsvaluefarm.com/history/\n\n`;
summary += `Each lesson includes:\n`;
summary += `- Interactive story told by historical figures\n`;
summary += `- 10-12 vocabulary flashcards\n`;
summary += `- 8 comprehension quiz questions\n\n`;
summary += `## Request for AI Assistance\n\n`;
summary += `Please help create detailed, historically accurate image generation prompts for each lesson.\n`;
summary += `Consider:\n`;
summary += `- Historical period and setting\n`;
summary += `- Key figures and events\n`;
summary += `- Educational value for 7th graders\n`;
summary += `- Visual storytelling that enhances learning\n`;

fs.writeFileSync(path.join(outputDir, 'LESSON-SUMMARY.md'), summary);
console.log('✓ Created: LESSON-SUMMARY.md');
console.log(`  Size: ${Math.round(summary.length / 1024)} KB`);
console.log(`  Contains: List of all ${lessons.length} lesson titles and descriptions\n`);

// Create README
const readme = `# Lesson Exports for AI Assistants\n\n`;
const readmeContent = readme + `## What's in this folder\n\n` +
  `**LESSON-SUMMARY.md** - Overview of all 50 lessons with titles and descriptions\n\n` +
  `## How to use\n\n` +
  `1. Upload LESSON-SUMMARY.md to Grok, Gemini, or ChatGPT\n` +
  `2. Ask the AI to visit https://auntsvaluefarm.com/history/ to view the full lessons\n` +
  `3. Request image prompts for specific lessons you want to illustrate\n\n` +
  `## Sample prompt to use\n\n` +
  `"I have 50 American History lessons for 7th graders. Here's the summary of all lessons.` +
  ` Please visit https://auntsvaluefarm.com/history/lesson/lesson-1/ to view Lesson 1,` +
  ` then create detailed image generation prompts for each chapter that would help illustrate the story."\n`;

fs.writeFileSync(path.join(outputDir, 'README.md'), readmeContent);
console.log('✓ Created: README.md\n');

console.log('📁 Files are in: lesson-exports/\n');
console.log('📤 Next steps:\n');
console.log('   1. Upload LESSON-SUMMARY.md to your AI assistant\n');
console.log('   2. Ask AI to visit https://auntsvaluefarm.com/history/\n');
console.log('   3. Request image prompts for specific lessons\n');
