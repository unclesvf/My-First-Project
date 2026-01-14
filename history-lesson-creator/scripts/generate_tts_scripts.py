"""
Generate TTS-Ready Scripts for All Lessons

This script creates combined TTS scripts for each lesson following the format
defined in TTS_SCRIPTING_PRD.md and matching the successful Lesson 1 script.

Output: lessons/*_TTS_Script.txt for each lesson

Usage:
    python scripts/generate_tts_scripts.py
"""

import os
import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
LESSONS_FILE = PROJECT_DIR / "data" / "lessons.ts"
OUTPUT_DIR = PROJECT_DIR / "lessons"


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


def number_to_words(num):
    """Convert number to words for TTS (1-20)."""
    words = {
        1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
        6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
        11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen",
        15: "Fifteen", 16: "Sixteen", 17: "Seventeen", 18: "Eighteen",
        19: "Nineteen", 20: "Twenty"
    }
    return words.get(num, str(num))


def format_year(year_str):
    """Format years for TTS pronunciation."""
    # Common year patterns
    year_patterns = {
        "1565": "fifteen sixty-five",
        "1607": "sixteen oh seven",
        "1609": "sixteen oh nine",
        "1620": "sixteen twenty",
        "1630": "sixteen thirty",
        "1680": "sixteen eighty",
        "1690": "sixteen ninety",
        "1720": "seventeen twenty",
        "1741": "seventeen forty-one",
        "1755": "seventeen fifty-five",
        "1763": "seventeen sixty-three",
        "1765": "seventeen sixty-five",
        "1770": "seventeen seventy",
        "1773": "seventeen seventy-three",
        "1775": "seventeen seventy-five",
        "1776": "seventeen seventy-six",
        "1777": "seventeen seventy-seven",
        "1778": "seventeen seventy-eight",
        "1781": "seventeen eighty-one",
        "1787": "seventeen eighty-seven",
        "1789": "seventeen eighty-nine",
        "1791": "seventeen ninety-one",
        "1796": "seventeen ninety-six",
        "1803": "eighteen oh three",
        "1805": "eighteen oh five",
        "1812": "eighteen twelve",
        "1814": "eighteen fourteen",
        "1823": "eighteen twenty-three",
        "1829": "eighteen twenty-nine",
        "1831": "eighteen thirty-one",
        "1832": "eighteen thirty-two",
        "1838": "eighteen thirty-eight",
        "1846": "eighteen forty-six",
        "1847": "eighteen forty-seven",
        "1848": "eighteen forty-eight",
        "1850": "eighteen fifty",
        "1852": "eighteen fifty-two",
        "1856": "eighteen fifty-six",
        "1857": "eighteen fifty-seven",
        "1860": "eighteen sixty",
        "1862": "eighteen sixty-two",
        "1863": "eighteen sixty-three",
        "1865": "eighteen sixty-five",
        "1868": "eighteen sixty-eight",
        "1877": "eighteen seventy-seven",
        "1886": "eighteen eighty-six",
        "1890": "eighteen ninety",
        "1892": "eighteen ninety-two",
        "1896": "eighteen ninety-six",
        "1901": "nineteen oh one",
        "1910": "nineteen ten",
        "1918": "nineteen eighteen",
        "1920": "nineteen twenty",
    }
    return year_patterns.get(year_str, year_str)


def format_narrator(narrator):
    """Format narrator description for TTS."""
    # Replace abbreviations
    narrator = narrator.replace("St.", "Saint")

    # Replace years in format NNNN with words
    def replace_year(match):
        return format_year(match.group(0))

    narrator = re.sub(r'\b(1[5-9]\d{2}|20\d{2})\b', replace_year, narrator)

    # Replace ages
    narrator = re.sub(r'(\d+)-year-old', lambda m: f"{number_to_words(int(m.group(1))).lower()} year old", narrator)
    narrator = re.sub(r'age (\d+)', lambda m: f"age {number_to_words(int(m.group(1))).lower()}", narrator)

    return narrator


def format_content_for_tts(text):
    """Format lesson content for TTS."""
    # Remove markdown formatting
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)  # Bold
    text = re.sub(r'\*([^*]+)\*', r'\1', text)  # Italic
    text = re.sub(r'_([^_]+)_', r'\1', text)  # Underscore italic

    # Convert em dashes to commas for natural flow
    text = text.replace('—', ', ')
    text = text.replace('–', ', ')

    # Replace smart quotes
    text = text.replace('"', '"').replace('"', '"')
    text = text.replace(''', "'").replace(''', "'")

    # Expand ampersands
    text = text.replace(' & ', ' and ')

    # Expand abbreviations
    text = text.replace("St.", "Saint")
    text = text.replace("Mt.", "Mount")
    text = text.replace("Mr.", "Mister")
    text = text.replace("Mrs.", "Missus")
    text = text.replace("Dr.", "Doctor")

    # Convert ordinals
    ordinal_map = {
        "1st": "first", "2nd": "second", "3rd": "third", "4th": "fourth",
        "5th": "fifth", "6th": "sixth", "7th": "seventh", "8th": "eighth",
        "9th": "ninth", "10th": "tenth", "11th": "eleventh", "12th": "twelfth"
    }
    for ord_num, word in ordinal_map.items():
        text = text.replace(ord_num, word)

    # Handle "Philip II" style
    text = re.sub(r'(\w+)\s+II\b', r'\1 the Second', text)
    text = re.sub(r'(\w+)\s+III\b', r'\1 the Third', text)
    text = re.sub(r'(\w+)\s+IV\b', r'\1 the Fourth', text)

    # Clean up whitespace
    text = re.sub(r'\n\s*\n', '\n\n', text)
    text = re.sub(r' +', ' ', text)

    return text.strip()


def sanitize_filename(name):
    """Create a safe filename from lesson title."""
    # Replace invalid Windows filename characters
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        name = name.replace(char, '')
    # Replace spaces and other characters
    name = name.replace(' ', '_').replace('&', 'and').replace("'", '')
    return name


def generate_tts_script(lesson):
    """Generate a complete TTS script for a lesson."""
    lines = []

    # Introduction
    lines.append(f"Welcome to today's history lesson. {lesson['title']}. {lesson['description']}.")
    lines.append("")
    lines.append(f"You will hear this story from {format_narrator(lesson['narrator'])}.")
    lines.append("")

    # Chapters
    for i, chapter in enumerate(lesson["chapters"], 1):
        chapter_num_word = number_to_words(i)
        lines.append(f"Chapter {chapter_num_word}. {chapter['title']}.")
        lines.append("")
        lines.append(format_content_for_tts(chapter["content"]))
        lines.append("")

    # Closing
    lines.append(f"This concludes today's lesson. {lesson['title']}. Thank you for listening.")

    return "\n".join(lines)


def main():
    print("=" * 60)
    print("TTS SCRIPT GENERATOR")
    print("=" * 60)

    # Parse lessons
    print(f"\nParsing lessons from: {LESSONS_FILE}")
    lessons = parse_lessons(LESSONS_FILE)
    print(f"Found {len(lessons)} lessons")

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Generate TTS scripts
    print("\nGenerating TTS scripts...")
    generated = 0
    skipped = 0

    for lesson in lessons:
        # Create filename
        title_safe = sanitize_filename(lesson['title'])
        output_filename = f"{title_safe}_TTS_Script.txt"
        output_path = OUTPUT_DIR / output_filename

        # Check if file already exists (don't overwrite manually created ones)
        if output_path.exists():
            # Check if it's the manually created Lesson 1 - skip it
            if lesson['num'] == 1:
                print(f"  Lesson {lesson['num']:2d}: SKIPPED (manual script exists)")
                skipped += 1
                continue

        # Generate script
        script_content = generate_tts_script(lesson)

        # Write to file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(script_content)

        print(f"  Lesson {lesson['num']:2d}: {output_filename}")
        generated += 1

    print("\n" + "=" * 60)
    print("GENERATION COMPLETE")
    print("=" * 60)
    print(f"\nGenerated: {generated} scripts")
    print(f"Skipped: {skipped} scripts")
    print(f"\nOutput directory: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
