"""
Lesson Media Generator

Generates supplementary learning materials from history lessons:
1. NotebookLM-ready exports (PDF/Markdown for import)
2. Mind maps (Mermaid format for rendering, Graphviz DOT)
3. Infographic content (structured JSON)
4. Video overview scripts

Usage:
    python lesson_media_generator.py --lesson 1
    python lesson_media_generator.py --all
    python lesson_media_generator.py --lesson 1 --type mindmap
    python lesson_media_generator.py --lesson 1 --type infographic
    python lesson_media_generator.py --lesson 1 --type video

Requirements:
    pip install graphviz markdown

For Graphviz rendering, install Graphviz: https://graphviz.org/download/
"""

import os
import re
import json
import argparse
from pathlib import Path
from datetime import datetime

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
LESSONS_FILE = PROJECT_DIR / "data" / "lessons.ts"
OUTPUT_DIR = PROJECT_DIR / "lesson-media"


def parse_lessons(filepath):
    """Parse lessons.ts and extract all lesson content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lessons = []

    lesson_block_pattern = re.compile(
        r'\{\s*id:\s*"(lesson-\d+)"(.*?)(?=\{\s*id:\s*"lesson-|\];\s*$)',
        re.DOTALL
    )

    for block_match in lesson_block_pattern.finditer(content):
        lesson_id = block_match.group(1)
        lesson_block = block_match.group(2)

        title_match = re.search(r'title:\s*"([^"]+)"', lesson_block)
        title = title_match.group(1) if title_match else "Unknown"

        desc_match = re.search(r'description:\s*"([^"]+)"', lesson_block)
        description = desc_match.group(1) if desc_match else ""

        narrator_match = re.search(r'narrator:\s*"([^"]+)"', lesson_block)
        narrator = narrator_match.group(1) if narrator_match else ""

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

        # Extract flashcards
        flashcards_match = re.search(r'flashcards:\s*\[(.*?)\],\s*quiz:', lesson_block, re.DOTALL)
        flashcards = []
        if flashcards_match:
            fc_pattern = re.compile(r'term:\s*"([^"]+)".*?definition:\s*"([^"]+)"', re.DOTALL)
            for fc_match in fc_pattern.finditer(flashcards_match.group(1)):
                flashcards.append({
                    "term": fc_match.group(1),
                    "definition": fc_match.group(2)
                })

        num_match = re.search(r'lesson-(\d+)', lesson_id)
        lesson_num = int(num_match.group(1)) if num_match else 0

        lessons.append({
            "id": lesson_id,
            "num": lesson_num,
            "title": title,
            "description": description,
            "narrator": narrator,
            "chapters": chapters,
            "flashcards": flashcards
        })

    lessons.sort(key=lambda x: x["num"])
    return lessons


def extract_key_concepts(lesson):
    """Extract key concepts from lesson content for mind map."""
    concepts = {
        "main_topic": lesson["title"],
        "time_period": "",
        "key_people": [],
        "key_events": [],
        "key_places": [],
        "themes": [],
        "chapter_topics": []
    }

    # Extract time period from description
    time_match = re.search(r'\((\d{4}[-–]\d{4}|\d{4}s?)\)', lesson["description"])
    if time_match:
        concepts["time_period"] = time_match.group(1)

    # Extract from chapters
    all_content = " ".join([ch["content"] for ch in lesson["chapters"]])

    # Add chapter topics
    for ch in lesson["chapters"]:
        concepts["chapter_topics"].append(ch["title"])

    # Extract from flashcards (these are the key terms)
    for fc in lesson["flashcards"]:
        concepts["themes"].append(fc["term"])

    return concepts


def generate_mermaid_mindmap(lesson):
    """Generate a Mermaid-format mind map for the lesson."""
    concepts = extract_key_concepts(lesson)

    # Sanitize text for Mermaid
    def sanitize(text):
        return text.replace('"', "'").replace("(", "").replace(")", "").replace("&", "and")[:50]

    lines = ["mindmap"]
    lines.append(f"  root(({sanitize(lesson['title'])}))")

    # Add time period
    if concepts["time_period"]:
        lines.append(f"    Time Period")
        lines.append(f"      {concepts['time_period']}")

    # Add chapters as main branches
    lines.append(f"    Chapters")
    for i, ch_title in enumerate(concepts["chapter_topics"], 1):
        lines.append(f"      Ch{i}: {sanitize(ch_title)}")

    # Add key terms from flashcards
    if concepts["themes"]:
        lines.append(f"    Key Concepts")
        for term in concepts["themes"][:8]:  # Limit to 8 for readability
            lines.append(f"      {sanitize(term)}")

    # Add narrator info
    if lesson["narrator"]:
        lines.append(f"    Perspective")
        narrator_short = sanitize(lesson["narrator"].split(",")[0])
        lines.append(f"      {narrator_short}")

    return "\n".join(lines)


def generate_graphviz_mindmap(lesson):
    """Generate a Graphviz DOT format mind map."""
    concepts = extract_key_concepts(lesson)

    def sanitize(text):
        return text.replace('"', '\\"').replace("&", "and")[:40]

    def make_id(text):
        return re.sub(r'[^a-zA-Z0-9]', '_', text)[:20]

    lines = [
        'digraph MindMap {',
        '  rankdir=LR;',
        '  node [shape=box, style="rounded,filled", fontname="Arial"];',
        '  edge [color="#666666"];',
        '',
        f'  root [label="{sanitize(lesson["title"])}", fillcolor="#4285f4", fontcolor="white", fontsize=14];',
        ''
    ]

    # Chapters branch
    lines.append('  chapters [label="Chapters", fillcolor="#34a853", fontcolor="white"];')
    lines.append('  root -> chapters;')
    for i, ch in enumerate(lesson["chapters"], 1):
        ch_id = f"ch{i}"
        lines.append(f'  {ch_id} [label="Ch{i}: {sanitize(ch["title"])}", fillcolor="#e8f5e9"];')
        lines.append(f'  chapters -> {ch_id};')

    # Key Concepts branch
    if lesson["flashcards"]:
        lines.append('')
        lines.append('  concepts [label="Key Concepts", fillcolor="#fbbc04", fontcolor="black"];')
        lines.append('  root -> concepts;')
        for i, fc in enumerate(lesson["flashcards"][:8], 1):
            fc_id = f"fc{i}"
            lines.append(f'  {fc_id} [label="{sanitize(fc["term"])}", fillcolor="#fff9c4"];')
            lines.append(f'  concepts -> {fc_id};')

    # Time Period
    if concepts["time_period"]:
        lines.append('')
        lines.append(f'  timeperiod [label="Time: {concepts["time_period"]}", fillcolor="#ea4335", fontcolor="white"];')
        lines.append('  root -> timeperiod;')

    lines.append('}')
    return "\n".join(lines)


def generate_infographic_content(lesson):
    """Generate structured content for infographic creation."""
    concepts = extract_key_concepts(lesson)

    infographic = {
        "title": lesson["title"],
        "subtitle": lesson["description"],
        "time_period": concepts["time_period"],
        "narrator": lesson["narrator"],
        "sections": [],
        "key_facts": [],
        "timeline_events": [],
        "vocabulary": []
    }

    # Create sections from chapters
    for i, ch in enumerate(lesson["chapters"], 1):
        # Extract first 2-3 sentences as summary
        sentences = re.split(r'(?<=[.!?])\s+', ch["content"])
        summary = " ".join(sentences[:3]) if sentences else ""

        infographic["sections"].append({
            "number": i,
            "title": ch["title"],
            "summary": summary[:300] + "..." if len(summary) > 300 else summary
        })

    # Add key vocabulary from flashcards
    for fc in lesson["flashcards"][:6]:
        infographic["vocabulary"].append({
            "term": fc["term"],
            "definition": fc["definition"][:150] + "..." if len(fc["definition"]) > 150 else fc["definition"]
        })

    # Generate key facts (one per chapter)
    for i, ch in enumerate(lesson["chapters"]):
        # Try to extract a key statement
        sentences = re.split(r'(?<=[.!?])\s+', ch["content"])
        for sent in sentences:
            if len(sent) > 50 and len(sent) < 200:
                infographic["key_facts"].append(sent)
                break

    return infographic


def generate_video_script(lesson):
    """Generate a video overview script."""
    script = {
        "title": f"Video Overview: {lesson['title']}",
        "duration_estimate": f"{len(lesson['chapters']) * 1.5:.0f}-{len(lesson['chapters']) * 2:.0f} minutes",
        "sections": []
    }

    # Introduction
    intro = {
        "section": "Introduction",
        "duration": "30 seconds",
        "narration": f"Welcome to our lesson on {lesson['title']}. {lesson['description']}. "
                     f"You'll experience this story through the eyes of {lesson['narrator']}.",
        "visuals": [
            f"Title card: {lesson['title']}",
            "Historical map or period artwork",
            "Narrator character introduction"
        ]
    }
    script["sections"].append(intro)

    # Chapter sections
    for i, ch in enumerate(lesson["chapters"], 1):
        sentences = re.split(r'(?<=[.!?])\s+', ch["content"])
        key_points = sentences[:4] if sentences else []

        section = {
            "section": f"Chapter {i}: {ch['title']}",
            "duration": "1-2 minutes",
            "narration": " ".join(key_points),
            "visuals": [
                f"Chapter title: {ch['title']}",
                "Period-appropriate imagery",
                "Key concept highlights",
                "Animated map or diagram (if applicable)"
            ],
            "key_takeaway": sentences[0] if sentences else ""
        }
        script["sections"].append(section)

    # Conclusion
    conclusion = {
        "section": "Conclusion",
        "duration": "30 seconds",
        "narration": f"In this lesson, we explored {lesson['title']} through {len(lesson['chapters'])} chapters. "
                     f"Key concepts included: {', '.join([fc['term'] for fc in lesson['flashcards'][:4]])}.",
        "visuals": [
            "Summary graphic with key points",
            "Timeline showing events covered",
            "Call to action for quiz/flashcards"
        ]
    }
    script["sections"].append(conclusion)

    return script


def generate_notebooklm_export(lesson):
    """Generate a markdown file optimized for NotebookLM import."""
    lines = []

    # Header with metadata
    lines.append(f"# {lesson['title']}")
    lines.append("")
    lines.append(f"**Description:** {lesson['description']}")
    lines.append("")
    lines.append(f"**Narrator:** {lesson['narrator']}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Chapters
    for i, ch in enumerate(lesson["chapters"], 1):
        lines.append(f"## Chapter {i}: {ch['title']}")
        lines.append("")
        lines.append(ch["content"])
        lines.append("")
        lines.append("---")
        lines.append("")

    # Key Terms section (helpful for NotebookLM)
    if lesson["flashcards"]:
        lines.append("## Key Terms and Definitions")
        lines.append("")
        for fc in lesson["flashcards"]:
            lines.append(f"**{fc['term']}:** {fc['definition']}")
            lines.append("")

    return "\n".join(lines)


def save_lesson_media(lesson, output_dir, media_types=None):
    """Save all media types for a lesson."""
    if media_types is None:
        media_types = ["mindmap", "infographic", "video", "notebooklm"]

    lesson_dir = output_dir / f"lesson_{lesson['num']:02d}_{sanitize_filename(lesson['title'])}"
    lesson_dir.mkdir(parents=True, exist_ok=True)

    created_files = []

    if "mindmap" in media_types:
        # Mermaid mind map
        mermaid_path = lesson_dir / "mindmap_mermaid.md"
        mermaid_content = generate_mermaid_mindmap(lesson)
        with open(mermaid_path, 'w', encoding='utf-8') as f:
            f.write(f"# Mind Map: {lesson['title']}\n\n")
            f.write("```mermaid\n")
            f.write(mermaid_content)
            f.write("\n```\n\n")
            f.write("## How to Render\n\n")
            f.write("1. Copy the mermaid code block above\n")
            f.write("2. Paste into [Mermaid Live Editor](https://mermaid.live/)\n")
            f.write("3. Download as PNG or SVG\n")
        created_files.append(mermaid_path)

        # Graphviz DOT
        dot_path = lesson_dir / "mindmap.dot"
        dot_content = generate_graphviz_mindmap(lesson)
        with open(dot_path, 'w', encoding='utf-8') as f:
            f.write(dot_content)
        created_files.append(dot_path)

        # Try to render with Graphviz if available
        try:
            import graphviz
            graph = graphviz.Source(dot_content)
            png_path = lesson_dir / "mindmap"
            graph.render(str(png_path), format='png', cleanup=True)
            created_files.append(Path(str(png_path) + ".png"))
        except ImportError:
            pass
        except Exception as e:
            print(f"  Note: Could not render Graphviz PNG: {e}")

    if "infographic" in media_types:
        # Infographic JSON
        infographic_path = lesson_dir / "infographic_content.json"
        infographic = generate_infographic_content(lesson)
        with open(infographic_path, 'w', encoding='utf-8') as f:
            json.dump(infographic, f, indent=2)
        created_files.append(infographic_path)

        # Human-readable infographic outline
        outline_path = lesson_dir / "infographic_outline.md"
        with open(outline_path, 'w', encoding='utf-8') as f:
            f.write(f"# Infographic Outline: {lesson['title']}\n\n")
            f.write(f"**Subtitle:** {infographic['subtitle']}\n\n")
            f.write(f"**Time Period:** {infographic['time_period']}\n\n")
            f.write("## Sections\n\n")
            for sec in infographic["sections"]:
                f.write(f"### {sec['number']}. {sec['title']}\n")
                f.write(f"{sec['summary']}\n\n")
            f.write("## Key Vocabulary\n\n")
            for vocab in infographic["vocabulary"]:
                f.write(f"- **{vocab['term']}:** {vocab['definition']}\n")
            f.write("\n## Key Facts\n\n")
            for i, fact in enumerate(infographic["key_facts"], 1):
                f.write(f"{i}. {fact}\n")
        created_files.append(outline_path)

    if "video" in media_types:
        # Video script
        video_path = lesson_dir / "video_script.json"
        video_script = generate_video_script(lesson)
        with open(video_path, 'w', encoding='utf-8') as f:
            json.dump(video_script, f, indent=2)
        created_files.append(video_path)

        # Human-readable video script
        script_path = lesson_dir / "video_script.md"
        with open(script_path, 'w', encoding='utf-8') as f:
            f.write(f"# {video_script['title']}\n\n")
            f.write(f"**Estimated Duration:** {video_script['duration_estimate']}\n\n")
            f.write("---\n\n")
            for sec in video_script["sections"]:
                f.write(f"## {sec['section']}\n")
                f.write(f"*Duration: {sec['duration']}*\n\n")
                f.write(f"**Narration:**\n{sec['narration']}\n\n")
                f.write("**Visuals:**\n")
                for vis in sec["visuals"]:
                    f.write(f"- {vis}\n")
                f.write("\n---\n\n")
        created_files.append(script_path)

    if "notebooklm" in media_types:
        # NotebookLM export
        nlm_path = lesson_dir / "notebooklm_import.md"
        nlm_content = generate_notebooklm_export(lesson)
        with open(nlm_path, 'w', encoding='utf-8') as f:
            f.write(nlm_content)
        created_files.append(nlm_path)

    return created_files


def sanitize_filename(name):
    """Remove invalid characters for filenames."""
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        name = name.replace(char, '')
    name = name.replace(' ', '_').replace('&', 'and').replace("'", '')
    return name[:30]


def main():
    parser = argparse.ArgumentParser(description="Generate supplementary learning media from lessons")
    parser.add_argument('--lesson', type=int, help='Lesson number to process (1-51)')
    parser.add_argument('--all', action='store_true', help='Process all lessons')
    parser.add_argument('--type', choices=['mindmap', 'infographic', 'video', 'notebooklm', 'all'],
                        default='all', help='Type of media to generate')
    args = parser.parse_args()

    print("=" * 60)
    print("LESSON MEDIA GENERATOR")
    print("=" * 60)

    # Parse lessons
    print(f"\nParsing lessons from: {LESSONS_FILE}")
    lessons = parse_lessons(LESSONS_FILE)
    print(f"Found {len(lessons)} lessons")

    # Determine which lessons to process
    if args.all:
        to_process = lessons
    elif args.lesson:
        to_process = [l for l in lessons if l["num"] == args.lesson]
        if not to_process:
            print(f"Error: Lesson {args.lesson} not found")
            return
    else:
        print("Error: Specify --lesson NUMBER or --all")
        return

    # Determine media types
    if args.type == 'all':
        media_types = ["mindmap", "infographic", "video", "notebooklm"]
    else:
        media_types = [args.type]

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"\nGenerating media types: {', '.join(media_types)}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("-" * 40)

    total_files = 0
    for lesson in to_process:
        print(f"\nProcessing Lesson {lesson['num']}: {lesson['title']}")
        files = save_lesson_media(lesson, OUTPUT_DIR, media_types)
        total_files += len(files)
        for f in files:
            print(f"  Created: {f.name}")

    print("\n" + "=" * 60)
    print("GENERATION COMPLETE")
    print("=" * 60)
    print(f"Lessons processed: {len(to_process)}")
    print(f"Files created: {total_files}")
    print(f"Output directory: {OUTPUT_DIR}")

    print("\n" + "-" * 40)
    print("NEXT STEPS:")
    print("-" * 40)
    print("1. MIND MAPS:")
    print("   - Open mindmap_mermaid.md and copy to https://mermaid.live/")
    print("   - Or render mindmap.dot with Graphviz")
    print("")
    print("2. INFOGRAPHICS:")
    print("   - Use infographic_outline.md as content guide")
    print("   - Import infographic_content.json into design tools")
    print("   - Upload notebooklm_import.md to NotebookLM for AI infographic")
    print("")
    print("3. VIDEO OVERVIEWS:")
    print("   - Use video_script.md as narration guide")
    print("   - Upload notebooklm_import.md to NotebookLM for AI video")
    print("")
    print("4. NOTEBOOKLM:")
    print("   - Go to https://notebooklm.google.com/")
    print("   - Create new notebook and upload notebooklm_import.md")
    print("   - Use 'Generate' > 'Infographic' or 'Video Overview'")


if __name__ == "__main__":
    main()
