"""
TTS Audio Generator for History Lessons
Generates audio files from chapter text using local TTS models.
Supports: Piper TTS, Coqui TTS, or Eleven Labs API

Usage:
    python generate_audio.py --engine piper
    python generate_audio.py --engine coqui
    python generate_audio.py --engine elevenlabs --api-key YOUR_KEY
"""

import os
import glob
import argparse
import subprocess
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR / "audio"


def generate_with_piper(text_file, output_file, model="en_US-lessac-medium"):
    """Generate audio using Piper TTS (local, fast, good quality)."""
    # Piper command: cat text.txt | piper --model en_US-lessac-medium --output_file audio.wav
    cmd = f'type "{text_file}" | piper --model {model} --output_file "{output_file}"'
    print(f"  Running: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  Error: {result.stderr}")
        return False
    return True


def generate_with_coqui(text_file, output_file, model="tts_models/en/ljspeech/tacotron2-DDC"):
    """Generate audio using Coqui TTS (local, high quality)."""
    with open(text_file, 'r', encoding='utf-8') as f:
        text = f.read()

    # Coqui TTS command
    cmd = [
        'tts',
        '--text', text,
        '--model_name', model,
        '--out_path', str(output_file)
    ]
    print(f"  Running Coqui TTS...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  Error: {result.stderr}")
        return False
    return True


def generate_with_elevenlabs(text_file, output_file, api_key, voice_id="21m00Tcm4TlvDq8ikWAM"):
    """Generate audio using Eleven Labs API (cloud, premium quality)."""
    try:
        from elevenlabs import generate, save, set_api_key
        set_api_key(api_key)

        with open(text_file, 'r', encoding='utf-8') as f:
            text = f.read()

        print(f"  Calling Eleven Labs API...")
        audio = generate(
            text=text,
            voice=voice_id,
            model="eleven_monolingual_v1"
        )
        save(audio, str(output_file))
        return True
    except ImportError:
        print("  Error: elevenlabs package not installed. Run: pip install elevenlabs")
        return False
    except Exception as e:
        print(f"  Error: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Generate TTS audio from lesson chapters")
    parser.add_argument('--engine', choices=['piper', 'coqui', 'elevenlabs'],
                        default='piper', help='TTS engine to use')
    parser.add_argument('--api-key', help='API key for Eleven Labs')
    parser.add_argument('--model', help='Model name/path for the TTS engine')
    parser.add_argument('--voice-id', default='21m00Tcm4TlvDq8ikWAM',
                        help='Voice ID for Eleven Labs')
    args = parser.parse_args()

    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)

    # Find all chapter files
    txt_files = sorted(glob.glob(str(SCRIPT_DIR / "*.txt")))

    if not txt_files:
        print("No text files found!")
        return

    print(f"Found {len(txt_files)} text files")
    print(f"Using TTS engine: {args.engine}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("-" * 50)

    for txt_file in txt_files:
        filename = Path(txt_file).stem
        output_file = OUTPUT_DIR / f"{filename}.wav"

        print(f"\nProcessing: {filename}")

        if args.engine == 'piper':
            model = args.model or "en_US-lessac-medium"
            success = generate_with_piper(txt_file, output_file, model)
        elif args.engine == 'coqui':
            model = args.model or "tts_models/en/ljspeech/tacotron2-DDC"
            success = generate_with_coqui(txt_file, output_file, model)
        elif args.engine == 'elevenlabs':
            if not args.api_key:
                print("  Error: --api-key required for Eleven Labs")
                continue
            success = generate_with_elevenlabs(txt_file, output_file, args.api_key, args.voice_id)

        if success:
            print(f"  Created: {output_file}")
        else:
            print(f"  Failed to create audio")

    print("\n" + "=" * 50)
    print("GENERATION COMPLETE")
    print(f"Audio files saved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
