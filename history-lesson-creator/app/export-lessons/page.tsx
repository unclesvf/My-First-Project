"use client";

import { lessons } from '@/data/lessons';
import { useState } from 'react';

export default function ExportLessonsPage() {
  const [exporting, setExporting] = useState(false);
  const [copying, setCopying] = useState(false);

  // Generate combined markdown file
  const generateCombinedMarkdown = () => {
    let content = `# American History for 7th Grade - Complete Course\n\n`;
    content += `**50 Lessons - Complete Text Export**\n\n`;
    content += `*Generated for AI image prompt assistance*\n\n`;
    content += `---\n\n`;

    lessons.forEach((lesson, index) => {
      content += `\n\n# LESSON ${index + 1}: ${lesson.title}\n\n`;
      content += `${lesson.description}\n\n`;

      lesson.story.chapters.forEach((chapter) => {
        content += `## ${chapter.title}\n\n`;
        content += `${chapter.content}\n\n`;
      });

      content += `---\n\n`;
    });

    return content;
  };

  // Generate lesson summary
  const generateSummary = () => {
    let content = `# American History Course - Lesson Summary\n\n`;
    content += `**Course:** American History for 7th Grade\n`;
    content += `**Total Lessons:** 50\n`;
    content += `**Format:** Interactive stories with vocabulary and quizzes\n\n`;
    content += `## Lesson Titles and Topics\n\n`;

    lessons.forEach((lesson, index) => {
      content += `${index + 1}. **${lesson.title}**\n`;
      content += `   ${lesson.description}\n\n`;
    });

    content += `\n## Notes for Image Prompt Generation\n\n`;
    content += `This course covers American History chronologically from colonial times through modern history.\n\n`;
    content += `When creating image prompts:\n`;
    content += `1. Consider the historical period and setting\n`;
    content += `2. Include key figures mentioned in the story\n`;
    content += `3. Reflect the tone and perspective of the narrator\n`;
    content += `4. Capture important historical events or moments\n`;
    content += `5. Use historically accurate details (clothing, architecture, technology)\n\n`;
    content += `## Recommended Image Styles\n\n`;
    content += `- Historical realism for accuracy\n`;
    content += `- Illustrations for educational clarity\n`;
    content += `- Period-appropriate color palettes\n`;
    content += `- Engaging compositions for student interest\n`;
    content += `- Diverse perspectives showing multiple viewpoints\n`;

    return content;
  };

  // Generate individual lesson markdown
  const generateLessonMarkdown = (lessonIndex: number) => {
    const lesson = lessons[lessonIndex];
    let content = `# ${lesson.title}\n\n`;
    content += `**Lesson ${lessonIndex + 1} of 50**\n\n`;
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
        content += `   ${String.fromCharCode(65 + optIndex)}. ${option}${isCorrect ? ' (correct)' : ''}\n`;
      });
      content += `   *${question.explanation}*\n\n`;
    });

    return content;
  };

  // Generate JSON export
  const generateJSON = () => {
    const jsonExport = lessons.map((lesson, index) => ({
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

    return JSON.stringify(jsonExport, null, 2);
  };

  // Download helper
  const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = (type: string) => {
    if (type === 'all-individual') {
      const confirmed =
        typeof window !== 'undefined' &&
        window.confirm('This will trigger 50 downloads. Continue?');
      if (!confirmed) return;
    }

    setExporting(true);

    setTimeout(() => {
      switch (type) {
        case 'combined':
          downloadFile(generateCombinedMarkdown(), 'ALL-LESSONS-COMBINED.md', 'text/markdown');
          break;
        case 'summary':
          downloadFile(generateSummary(), 'LESSON-SUMMARY.md', 'text/markdown');
          break;
        case 'json':
          downloadFile(generateJSON(), 'lessons-data.json', 'application/json');
          break;
        case 'all-individual':
          // Download all 50 lessons as individual files
          lessons.forEach((lesson, index) => {
            setTimeout(() => {
              const filename = `${String(index + 1).padStart(2, '0')}-${lesson.id}.md`;
              downloadFile(generateLessonMarkdown(index), filename, 'text/markdown');
            }, index * 100); // Stagger downloads
          });
          break;
      }
      setExporting(false);
    }, 100);
  };

  const handleCopySummary = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(generateSummary());
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Export Lessons for AI Assistants
          </h1>

          <p className="text-gray-600 mb-6">
            Export your history lessons in various formats to share with Grok, Gemini, or other AI assistants
            for help creating image prompts and illustrations.
          </p>

          <div className="space-y-4">
            {/* Summary File */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Lesson Summary (Recommended First)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Overview with all 50 lesson titles and topics. Start here to give AI context.
                <br />
                <strong>File size:</strong> ~15 KB
              </p>
              <button
                onClick={() => handleExport('summary')}
                disabled={exporting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
              >
                Download LESSON-SUMMARY.md
              </button>
              <button
                onClick={handleCopySummary}
                disabled={copying || exporting}
                className="ml-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded disabled:opacity-50"
              >
                {copying ? "Copying..." : "Copy Summary"}
              </button>
            </div>

            {/* Combined File */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                All Lessons Combined
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Complete text of all 50 lessons in one file. Best for comprehensive analysis.
                <br />
                <strong>File size:</strong> ~500 KB (large - may need to split for some AIs)
              </p>
              <button
                onClick={() => handleExport('combined')}
                disabled={exporting}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
              >
                Download ALL-LESSONS-COMBINED.md
              </button>
            </div>

            {/* JSON Export */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                JSON Data Export
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Structured data format with all lessons, chapters, vocabulary, and quizzes.
                <br />
                <strong>File size:</strong> ~400 KB
              </p>
              <button
                onClick={() => handleExport('json')}
                disabled={exporting}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
              >
                Download lessons-data.json
              </button>
            </div>

            {/* Individual Files */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Individual Lesson Files
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Download all 50 lessons as separate markdown files (one per lesson).
                <br />
                <strong>Warning:</strong> Will trigger 50 downloads in sequence
              </p>
              <button
                onClick={() => handleExport('all-individual')}
                disabled={exporting}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
              >
                Download All 50 Individual Files
              </button>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Tips for Using with AI Assistants:</h3>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li><strong>Start with LESSON-SUMMARY.md</strong> - Gives AI overview of all 50 lessons</li>
              <li><strong>For specific lessons:</strong> Upload individual lesson files</li>
              <li><strong>For bulk analysis:</strong> Use ALL-LESSONS-COMBINED.md (if AI accepts large files)</li>
              <li><strong>Ask AI to:</strong> "Create detailed image prompts for each chapter that would help illustrate the story"</li>
              <li><strong>For Gemini/Grok:</strong> You can upload multiple files in one conversation</li>
              <li><strong>File limits:</strong> Most AIs accept files up to 1-2 MB, so the combined file should work</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {"<-"} Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
