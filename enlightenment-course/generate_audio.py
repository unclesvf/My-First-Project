#!/usr/bin/env python3
"""Generate TTS audio for all Enlightenment course lessons using ElevenLabs via Seafloor."""

import os
import requests
import sys
from pathlib import Path

# Configuration
API_KEY = os.environ.get('ELEVENLABS_API_KEY')
BASE_URL = "https://api.elevenlabs.io"
VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"  # George - British warm storyteller
MODEL_ID = "eleven_multilingual_v2"  # Best quality for educational content

LESSONS_DIR = Path(__file__).parent / "lessons-revised"
AUDIO_DIR = Path(__file__).parent / "audio"

def generate_audio(text: str, output_path: Path) -> bool:
    """Generate audio from text and save to output_path."""
    url = f"{BASE_URL}/v1/text-to-speech/{VOICE_ID}"
    
    headers = {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    
    payload = {
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=300)
        if response.status_code == 200:
            output_path.write_bytes(response.content)
            return True
        else:
            print(f"  ERROR: {response.status_code} - {response.text[:200]}")
            return False
    except Exception as e:
        print(f"  ERROR: {e}")
        return False

def main():
    if not API_KEY:
        print("ERROR: ELEVENLABS_API_KEY not set")
        sys.exit(1)
    
    AUDIO_DIR.mkdir(exist_ok=True)
    
    # Find all lesson files
    lesson_files = sorted(LESSONS_DIR.glob("*_TTS_Script.txt"))
    
    print(f"Found {len(lesson_files)} lessons to process")
    print(f"Voice: George (British warm storyteller)")
    print(f"Model: {MODEL_ID}")
    print()
    
    success_count = 0
    for i, lesson_file in enumerate(lesson_files, 1):
        # Extract lesson number from filename
        lesson_num = lesson_file.name.split("_")[0]
        output_file = AUDIO_DIR / f"lesson_{lesson_num}.mp3"
        
        # Skip if already exists
        if output_file.exists():
            print(f"[{i:02d}/24] Skipping {lesson_file.name} (already exists)")
            success_count += 1
            continue
        
        print(f"[{i:02d}/24] Generating {lesson_file.name}...")
        
        text = lesson_file.read_text(encoding='utf-8')
        print(f"  Text length: {len(text)} characters")
        
        if generate_audio(text, output_file):
            size_kb = output_file.stat().st_size / 1024
            print(f"  SUCCESS: {output_file.name} ({size_kb:.1f} KB)")
            success_count += 1
        else:
            print(f"  FAILED: {lesson_file.name}")
    
    print()
    print(f"Complete: {success_count}/{len(lesson_files)} lessons generated")

if __name__ == "__main__":
    main()
