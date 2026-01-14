"""
Audio Generator for History for Homeschoolers
Converts lesson chapters to audio using ElevenLabs TTS API.

Usage:
    1. Set your API key: set ELEVENLABS_API_KEY=your-key-here
    2. Run: python generate_audio.py

Options:
    --lesson LESSON_ID    Generate audio for a specific lesson (e.g., lesson-1)
    --voice VOICE_ID      Use a specific voice ID
    --list-voices         List available voices
    --dry-run             Show what would be generated without making API calls
"""

import os
import re
import sys
import time
import argparse
from pathlib import Path

# Configuration
PROJECT_DIR = Path(__file__).parent
LESSONS_FILE = PROJECT_DIR / "data" / "lessons.ts"
AUDIO_DIR = PROJECT_DIR / "public" / "audio"

# Default voice settings
DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"  # Adam - warm narrative voice
MODEL_ID = "eleven_multilingual_v2"
OUTPUT_FORMAT = "mp3_44100_128"

# Voice options for different narrator types
VOICE_OPTIONS = {
    "adam": "pNInz6obpgDQGcFmaJgB",      # Adult male, warm
    "charlie": "IKne3meq5aSn9XLyUdCD",   # Young male
    "charlotte": "XB0fDUnXU5powFXDhCwa", # Young female
    "daniel": "onwK4e9ZLuTAKqWW03F9",    # British male
    "emily": "LcfcDJNUP1GQjkzn1xUU",     # American female
}


def extract_lessons_from_ts(filepath):
    """Parse lessons.ts and extract lesson data."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lessons = []

    # Pattern to find lesson id and title
    lesson_start_pattern = r'id:\s*"(lesson-\d+)",\s*title:\s*"([^"]+)"'

    # Pattern for narrator
    narrator_pattern = r'narrator:\s*"([^"]+)"'

    # Pattern for chapters - match title and content with backtick strings
    chapter_pattern = r'\{\s*title:\s*"([^"]+)",\s*content:\s*`([^`]+)`'

    # Split content by lesson boundaries
    lesson_blocks = re.split(r'(?=\{\s*id:\s*"lesson-\d+",)', content)

    for block in lesson_blocks:
        # Find lesson id and title
        lesson_match = re.search(lesson_start_pattern, block)
        if not lesson_match:
            continue

        lesson_id = lesson_match.group(1)
        title = lesson_match.group(2)

        # Find narrator
        narrator_match = re.search(narrator_pattern, block)
        narrator = narrator_match.group(1) if narrator_match else "Unknown"

        # Find all chapters
        chapters = []
        for ch_match in re.finditer(chapter_pattern, block, re.DOTALL):
            ch_title = ch_match.group(1)
            ch_content = ch_match.group(2).strip()
            chapters.append({
                "title": ch_title,
                "content": ch_content
            })

        lessons.append({
            "id": lesson_id,
            "title": title,
            "narrator": narrator,
            "chapters": chapters
        })

    return lessons


def chunk_text(text, max_chars=4500):
    """Split text into chunks that respect sentence boundaries."""
    if len(text) <= max_chars:
        return [text]

    chunks = []
    paragraphs = text.split('\n\n')
    current_chunk = ""

    for para in paragraphs:
        if len(current_chunk) + len(para) + 2 <= max_chars:
            current_chunk += para + "\n\n"
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())

            # If single paragraph is too long, split by sentences
            if len(para) > max_chars:
                sentences = para.replace('. ', '.|').split('|')
                current_chunk = ""
                for sentence in sentences:
                    if len(current_chunk) + len(sentence) <= max_chars:
                        current_chunk += sentence
                    else:
                        if current_chunk:
                            chunks.append(current_chunk.strip())
                        current_chunk = sentence
            else:
                current_chunk = para + "\n\n"

    if current_chunk.strip():
        chunks.append(current_chunk.strip())

    return chunks


def generate_audio_elevenlabs(client, text, output_path, voice_id):
    """Generate audio using ElevenLabs API."""
    chunks = chunk_text(text)
    audio_data = b""

    for i, chunk in enumerate(chunks):
        if len(chunks) > 1:
            print(f"      Chunk {i+1}/{len(chunks)} ({len(chunk)} chars)...")

        try:
            audio = client.text_to_speech.convert(
                text=chunk,
                voice_id=voice_id,
                model_id=MODEL_ID,
                output_format=OUTPUT_FORMAT
            )

            for audio_chunk in audio:
                audio_data += audio_chunk

            # Rate limiting - be nice to the API
            if i < len(chunks) - 1:
                time.sleep(0.5)

        except Exception as e:
            print(f"      ERROR: {e}")
            return False

    # Ensure output directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Save audio file
    with open(output_path, "wb") as f:
        f.write(audio_data)

    return True


def list_voices(client):
    """List available voices."""
    print("\nAvailable Voices:")
    print("-" * 60)

    voices = client.voices.get_all()
    for voice in voices.voices:
        print(f"  {voice.name:<20} {voice.voice_id}")

    print("\nPre-configured voices for this project:")
    for name, vid in VOICE_OPTIONS.items():
        print(f"  --voice {name:<12} ({vid})")


def main():
    parser = argparse.ArgumentParser(description="Generate audio for History for Homeschoolers lessons")
    parser.add_argument("--lesson", help="Generate audio for a specific lesson (e.g., lesson-1)")
    parser.add_argument("--voice", default="adam", help="Voice to use (adam, charlie, charlotte, daniel, emily) or voice ID")
    parser.add_argument("--list-voices", action="store_true", help="List available voices")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be generated without API calls")
    parser.add_argument("--skip-existing", action="store_true", default=True, help="Skip files that already exist")
    parser.add_argument("--force", action="store_true", help="Regenerate even if files exist")
    args = parser.parse_args()

    # Check for API key
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key and not args.dry_run:
        print("ERROR: ELEVENLABS_API_KEY environment variable not set")
        print("\nTo set it:")
        print("  Windows: set ELEVENLABS_API_KEY=your-key-here")
        print("  Linux/Mac: export ELEVENLABS_API_KEY=your-key-here")
        print("\nGet your API key at: https://elevenlabs.io")
        sys.exit(1)

    # Initialize client
    client = None
    if not args.dry_run:
        try:
            from elevenlabs import ElevenLabs
            client = ElevenLabs(api_key=api_key)
        except ImportError:
            print("ERROR: elevenlabs package not installed")
            print("Install with: pip install elevenlabs")
            sys.exit(1)

    # List voices and exit
    if args.list_voices:
        if client:
            list_voices(client)
        else:
            print("Pre-configured voices:")
            for name, vid in VOICE_OPTIONS.items():
                print(f"  {name}: {vid}")
        return

    # Resolve voice ID
    voice_id = VOICE_OPTIONS.get(args.voice.lower(), args.voice)

    # Extract lessons
    print(f"Reading lessons from: {LESSONS_FILE}")
    lessons = extract_lessons_from_ts(LESSONS_FILE)
    print(f"Found {len(lessons)} lessons")

    # Filter to specific lesson if requested
    if args.lesson:
        lessons = [l for l in lessons if l['id'] == args.lesson]
        if not lessons:
            print(f"ERROR: Lesson '{args.lesson}' not found")
            sys.exit(1)

    # Process lessons
    total_chapters = sum(len(l['chapters']) for l in lessons)
    processed = 0
    skipped = 0
    errors = 0

    print(f"\nGenerating audio for {len(lessons)} lessons ({total_chapters} chapters)")
    print(f"Voice: {args.voice} ({voice_id})")
    print(f"Output: {AUDIO_DIR}")
    print("-" * 60)

    for lesson in lessons:
        lesson_dir = AUDIO_DIR / lesson['id']
        print(f"\n{lesson['id']}: {lesson['title']}")
        print(f"  Narrator: {lesson['narrator']}")

        for i, chapter in enumerate(lesson['chapters'], 1):
            output_file = lesson_dir / f"chapter-{i}.mp3"
            char_count = len(chapter['content'])

            # Check if file exists
            if output_file.exists() and not args.force:
                print(f"  Chapter {i}: {chapter['title']} - SKIPPED (exists)")
                skipped += 1
                continue

            print(f"  Chapter {i}: {chapter['title']} ({char_count} chars)")

            if args.dry_run:
                print(f"    Would generate: {output_file}")
                processed += 1
                continue

            # Generate audio
            success = generate_audio_elevenlabs(client, chapter['content'], output_file, voice_id)

            if success:
                print(f"    Saved: {output_file}")
                processed += 1
            else:
                errors += 1

            # Rate limiting between chapters
            time.sleep(1)

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"  Processed: {processed}")
    print(f"  Skipped:   {skipped}")
    print(f"  Errors:    {errors}")
    print(f"  Output:    {AUDIO_DIR}")

    if args.dry_run:
        print("\n(Dry run - no files were generated)")


if __name__ == "__main__":
    main()
