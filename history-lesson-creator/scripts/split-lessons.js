/**
 * Split lessons.ts into individual lesson files
 * Run with: node scripts/split-lessons.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const LESSONS_FILE = path.join(DATA_DIR, 'lessons-original.ts');
const LESSONS_DIR = path.join(DATA_DIR, 'lessons');

// Check if we need to use the backup
let sourceFile = LESSONS_FILE;
if (!fs.existsSync(LESSONS_FILE)) {
  // Use a backup or the current file
  const currentFile = path.join(DATA_DIR, 'lessons.ts');
  if (fs.existsSync(currentFile) && fs.statSync(currentFile).size > 10000) {
    sourceFile = currentFile;
  } else {
    console.error('No source lessons file found!');
    process.exit(1);
  }
}

// Create lessons directory if it doesn't exist
if (!fs.existsSync(LESSONS_DIR)) {
  fs.mkdirSync(LESSONS_DIR, { recursive: true });
}

// Read the original file
const content = fs.readFileSync(sourceFile, 'utf8');

// Extract lessons using regex - find each lesson object
const lessonRegex = /\{\s*\n\s*id:\s*"(lesson-\d+)"/g;
const lessonStarts = [];
let match;

while ((match = lessonRegex.exec(content)) !== null) {
  lessonStarts.push({
    id: match[1],
    index: match.index
  });
}

console.log(`Found ${lessonStarts.length} lessons`);

// Function to find the matching closing brace for a lesson object
function findLessonEnd(content, startIndex) {
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let escaped = false;

  for (let i = startIndex; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';

    // Handle escape sequences
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\' && inString) {
      escaped = true;
      continue;
    }

    // Handle strings
    if ((char === '"' || char === "'" || char === '`') && !inString) {
      inString = true;
      stringChar = char;
      continue;
    }
    if (char === stringChar && inString) {
      inString = false;
      stringChar = '';
      continue;
    }

    // Skip if inside string
    if (inString) continue;

    // Count braces
    if (char === '{') braceCount++;
    if (char === '}') {
      braceCount--;
      if (braceCount === 0) {
        return i + 1; // Return position after closing brace
      }
    }
  }
  return content.length;
}

// Extract each lesson
const lessons = [];
for (let i = 0; i < lessonStarts.length; i++) {
  const start = lessonStarts[i].index;
  const end = findLessonEnd(content, start);

  let lessonContent = content.substring(start, end).trim();

  // Remove any trailing commas from the entire object
  lessonContent = lessonContent.replace(/,(\s*\])/g, '$1'); // Remove trailing commas before ]
  lessonContent = lessonContent.replace(/,(\s*\})/g, '$1'); // Remove trailing commas before }

  lessons.push({
    id: lessonStarts[i].id,
    content: lessonContent
  });
}

// Write individual lesson files
for (const lesson of lessons) {
  const num = lesson.id.replace('lesson-', '');
  const filename = `lesson-${num.padStart(2, '0')}.ts`;
  const filepath = path.join(LESSONS_DIR, filename);

  const fileContent = `import { Lesson } from "@/lib/types";

const lesson: Lesson = ${lesson.content};

export default lesson;
`;

  fs.writeFileSync(filepath, fileContent);
  console.log(`Created ${filename}`);
}

// Create index file that exports all lessons
const indexContent = `import { Lesson } from "@/lib/types";

// Import all lessons
${lessons.map((l, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  return `import lesson${num} from "./lesson-${num}";`;
}).join('\n')}

// Export all lessons as array
export const lessons: Lesson[] = [
${lessons.map((l, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  return `  lesson${num},`;
}).join('\n')}
];

// Export individual lesson getter for dynamic imports
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

// Export lesson count
export const TOTAL_LESSONS = ${lessons.length};
`;

fs.writeFileSync(path.join(LESSONS_DIR, 'index.ts'), indexContent);
console.log('Created index.ts');

console.log(`\nDone! Split ${lessons.length} lessons into individual files.`);
console.log(`Files are in: ${LESSONS_DIR}`);
