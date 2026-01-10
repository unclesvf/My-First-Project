"""
Export all lessons to text files for reading and TTS.

Creates:
1. A single consolidated file with all 51 lessons
2. Individual TTS-ready chapter files for each lesson

Usage:
    python export_lessons.py
"""

import os
import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
LESSONS_FILE = PROJECT_DIR / "data" / "lessons.ts"
OUTPUT_DIR = PROJECT_DIR / "lesson-exports"
TTS_DIR = OUTPUT_DIR / "tts"


def parse_lessons(filepath):
    """Parse lessons.ts and extract all lesson content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lessons = []

    # Extract each complete lesson block
    lesson_block_pattern = re.compile(
        r'\{\s*id:\s*"(lesson-\d+)"(.*?)(?=\{\s*id:\s*"lesson-|\];\s*$)',
        re.DOTALL
    )

    for block_match in lesson_block_pattern.finditer(content):
        lesson_id = block_match.group(1)
        lesson_block = block_match.group(2)

        # Extract title
        title_match = re.search(r'title:\s*"([^"]+)"', lesson_block)
        title = title_match.group(1) if title_match else "Unknown"

        # Extract description
        desc_match = re.search(r'description:\s*"([^"]+)"', lesson_block)
        description = desc_match.group(1) if desc_match else ""

        # Extract narrator
        narrator_match = re.search(r'narrator:\s*"([^"]+)"', lesson_block)
        narrator = narrator_match.group(1) if narrator_match else ""

        # Extract chapters
        chapters_match = re.search(r'chapters:\s*\[(.*?)\],\s*\},?\s*flashcards:', lesson_block, re.DOTALL)
        chapters = []
        if chapters_match:
            chapter_pattern = re.compile(
                r'\{\s*title:\s*"([^"]+)".*?content:\s*`([^`]+)`',
                re.DOTALL
            )
            for ch_match in chapter_pattern.finditer(chapters_match.group(1)):
                chapters.append({
                    "title": ch_match.group(1),
                    "content": ch_match.group(2).strip()
                })

        # Extract lesson number
        num_match = re.search(r'lesson-(\d+)', lesson_id)
        lesson_num = int(num_match.group(1)) if num_match else 0

        lessons.append({
            "id": lesson_id,
            "num": lesson_num,
            "title": title,
            "description": description,
            "narrator": narrator,
            "chapters": chapters
        })

    # Sort by lesson number
    lessons.sort(key=lambda x: x["num"])
    return lessons


def format_for_reading(lesson):
    """Format a lesson for human reading."""
    lines = []
    lines.append("=" * 80)
    lines.append(f"LESSON {lesson['num']}: {lesson['title'].upper()}")
    lines.append(f"Description: {lesson['description']}")
    lines.append(f"Narrator: {lesson['narrator']}")
    lines.append("=" * 80)
    lines.append("")

    for i, chapter in enumerate(lesson["chapters"], 1):
        lines.append("-" * 60)
        lines.append(f"CHAPTER {i}: {chapter['title']}")
        lines.append("-" * 60)
        lines.append("")
        lines.append(chapter["content"])
        lines.append("")

    lines.append("")
    return "\n".join(lines)


def format_for_tts(text):
    """Format text for text-to-speech (remove markdown, simplify punctuation)."""
    # Remove markdown formatting
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)  # Bold
    text = re.sub(r'\*([^*]+)\*', r'\1', text)  # Italic
    text = re.sub(r'_([^_]+)_', r'\1', text)  # Underscore italic

    # Convert em dashes to regular dashes with spaces
    text = text.replace('—', ' - ')
    text = text.replace('–', ' - ')

    # Remove special characters that don't speak well
    text = text.replace('"', '"').replace('"', '"')
    text = text.replace(''', "'").replace(''', "'")

    # Clean up whitespace
    text = re.sub(r'\n\s*\n', '\n\n', text)
    text = re.sub(r' +', ' ', text)

    return text.strip()


def create_tts_intro(lesson):
    """Create an introduction for TTS."""
    intro = f"Lesson {lesson['num']}. {lesson['title']}.\n\n"
    intro += f"{lesson['description']}.\n\n"
    intro += f"You will hear this story from {lesson['narrator']}.\n"
    return format_for_tts(intro)


def create_tts_chapter(chapter, chapter_num):
    """Create a TTS-ready chapter file."""
    text = f"Chapter {chapter_num}. {chapter['title']}.\n\n"
    text += chapter["content"]
    return format_for_tts(text)


def create_tts_outro(lesson):
    """Create an outro for TTS."""
    outro = f"This concludes Lesson {lesson['num']}. {lesson['title']}. Thank you for listening."
    return format_for_tts(outro)


def export_single_file(lessons, output_path):
    """Export all lessons to a single text file."""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("ALL HISTORY LESSONS\n")
        f.write("=" * 80 + "\n")
        f.write(f"Total Lessons: {len(lessons)}\n")
        f.write("=" * 80 + "\n\n\n")

        for lesson in lessons:
            f.write(format_for_reading(lesson))
            f.write("\n\n")

        f.write("=" * 80 + "\n")
        f.write("END OF ALL LESSONS\n")
        f.write("=" * 80 + "\n")

    print(f"Created: {output_path}")


def sanitize_filename(name):
    """Remove invalid characters for Windows filenames."""
    # Replace invalid Windows filename characters
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        name = name.replace(char, '')
    # Replace spaces and other characters
    name = name.replace(' ', '_').replace('&', 'and').replace("'", '')
    return name


def export_tts_files(lessons, tts_dir):
    """Export TTS-ready files for each lesson."""
    # Create main TTS directory
    tts_dir.mkdir(parents=True, exist_ok=True)

    total_files = 0

    for lesson in lessons:
        # Create lesson directory
        lesson_title_safe = sanitize_filename(lesson['title'].lower())[:30]
        lesson_dir = tts_dir / f"lesson_{lesson['num']:02d}_{lesson_title_safe}"
        lesson_dir.mkdir(exist_ok=True)

        # Create intro file
        intro_path = lesson_dir / "00_intro.txt"
        with open(intro_path, 'w', encoding='utf-8') as f:
            f.write(create_tts_intro(lesson))
        total_files += 1

        # Create chapter files
        for i, chapter in enumerate(lesson["chapters"], 1):
            chapter_title_safe = sanitize_filename(chapter['title'].lower())[:40]
            chapter_filename = f"{i:02d}_{chapter_title_safe}.txt"
            chapter_path = lesson_dir / chapter_filename
            with open(chapter_path, 'w', encoding='utf-8') as f:
                f.write(create_tts_chapter(chapter, i))
            total_files += 1

        # Create outro file
        outro_num = len(lesson["chapters"]) + 1
        outro_path = lesson_dir / f"{outro_num:02d}_outro.txt"
        with open(outro_path, 'w', encoding='utf-8') as f:
            f.write(create_tts_outro(lesson))
        total_files += 1

    print(f"Created {total_files} TTS files in {tts_dir}")


def main():
    print("=" * 60)
    print("LESSON EXPORT TOOL")
    print("=" * 60)

    # Parse lessons
    print(f"\nParsing lessons from: {LESSONS_FILE}")
    lessons = parse_lessons(LESSONS_FILE)
    print(f"Found {len(lessons)} lessons")

    # Count chapters
    total_chapters = sum(len(l["chapters"]) for l in lessons)
    print(f"Total chapters: {total_chapters}")

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Export single file
    print("\n" + "-" * 40)
    print("Creating consolidated lesson file...")
    single_file_path = OUTPUT_DIR / "All_Lessons_Complete.txt"
    export_single_file(lessons, single_file_path)

    # Export TTS files
    print("\n" + "-" * 40)
    print("Creating TTS chapter files...")
    export_tts_files(lessons, TTS_DIR)

    print("\n" + "=" * 60)
    print("EXPORT COMPLETE")
    print("=" * 60)
    print(f"\nOutput directory: {OUTPUT_DIR}")
    print(f"  - All_Lessons_Complete.txt (single file with all lessons)")
    print(f"  - tts/ (directory with TTS-ready files)")


if __name__ == "__main__":
    main()
