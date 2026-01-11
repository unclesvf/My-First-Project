# Claude Instructions for History Lesson Creator

## Project Overview

This is a history education application containing 51 lessons covering American history from 1565 to 1877. Each lesson features:
- Narrative chapters told from a first-person historical perspective
- Flashcards for vocabulary
- Quizzes to test comprehension

## Important Files to Know

### Scripts Documentation
**Always refer to `scripts/SCRIPTS_DOCUMENTATION.md` for detailed documentation on all available scripts**, including:
- `historical_accuracy_checker.py` - Scan lessons for anachronisms
- `export_lessons.py` - Export lessons to text and TTS formats
- `lesson_media_generator.py` - Generate mind maps, infographics, video scripts
- `render_mindmaps.py` - Render mind map images with Graphviz

### Data Files
- `data/lessons.ts` - Master file containing all 51 lessons with chapters, flashcards, and quizzes

### Output Directories
- `lesson-exports/` - Exported text files for reading and TTS
- `lesson-media/` - Generated mind maps, infographics, video scripts
- `accuracy_reports/` - Historical accuracy scan results

## Working with Lessons

### Editing Lesson Content
After editing any lesson content in `data/lessons.ts`, run the following scripts in order:
1. `python scripts/historical_accuracy_checker.py` - Verify no anachronisms
2. `python scripts/export_lessons.py` - Update exports
3. `python scripts/lesson_media_generator.py` - Update media files
4. `python scripts/render_mindmaps.py` - Update mind map images

### Historical Accuracy
The accuracy checker contains a 350+ term timeline database. Be especially careful about:
- References to settlements, people, or events before they existed
- The lesson's time period is specified in its description field
- Some forward-looking references are intentional for educational purposes

## Key Constraints

- Lessons must be historically accurate for their time period
- Narrative chapters are written from a first-person perspective of someone living in that era
- Each lesson has a specific narrator character appropriate to the historical context
