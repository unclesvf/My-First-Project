"""
Test voice references with Zonos TTS - SIMPLIFIED VERSION
Based on lessons learned from TTS_VOICE_TESTING_NOTES.md

Key principles:
- NO silence removal (that was destroying audio)
- Just basic normalization and fade
- Uses same settings as working Lesson 1 generation

Run this in WSL2: python3 test_voices_simple.py
"""
import os
import torch
import torchaudio
import numpy as np
import soundfile as sf
from pathlib import Path

print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")

from zonos.model import Zonos
from zonos.conditioning import make_cond_dict

# Load model
print("\nLoading Zonos model...")
model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device="cuda")
print("Model loaded!")

# Paths
VOICE_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/voice_references/selected")
OUTPUT_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/voice_tests")
OUTPUT_DIR.mkdir(exist_ok=True)

# Test chunks - same story content for fair comparison
TEST_CHUNKS = [
    "My name is a narrator from history, and I have an amazing story to tell you today.",
    "Life in early America was very different from what you might imagine.",
    "Every day brought new challenges and adventures that shaped who we became.",
    "The people I knew were brave and determined, facing hardships with courage.",
    "Come with me now as I share the remarkable events that changed everything.",
]

# Voice files to test
VOICE_FILES = [
    ("01_young_male.wav", "Young Male (13-15)"),
    ("02_older_male.wav", "Older Male (16-18) - KNOWN GOOD"),
    ("03_adult_male.wav", "Adult Male"),
    ("04_young_female.wav", "Young Female (12-14)"),
    ("05_older_female.wav", "Older Female (15-17)"),
    ("06_african_american_male.wav", "Male Voice 6"),
    ("07_african_american_female.wav", "Female Voice 7"),
    ("08_accented_male_european.wav", "Male Voice 8"),
    ("09_native_female.wav", "Female Voice 9 - KNOWN GOOD"),
    ("10_french_accented_female.wav", "Female Voice 10"),
]

print(f"\nGenerating tests for {len(VOICE_FILES)} voices...")
print("SIMPLE approach: NO silence removal, just normalization")
print("=" * 60)

sample_rate = model.autoencoder.sampling_rate

for voice_file, voice_name in VOICE_FILES:
    voice_path = VOICE_DIR / voice_file
    if not voice_path.exists():
        print(f"\n{voice_name}: NOT FOUND - {voice_path}")
        continue

    print(f"\n{voice_name} ({voice_file}):")

    # Load reference audio
    ref_wav, ref_sr = torchaudio.load(str(voice_path))
    ref_duration = ref_wav.shape[1] / ref_sr
    print(f"  Reference audio: {ref_duration:.1f}s")

    # Extract speaker embedding
    speaker_embedding = model.make_speaker_embedding(ref_wav, ref_sr)

    # Generate audio for each chunk
    all_audio = []

    for i, chunk_text in enumerate(TEST_CHUNKS):
        print(f"  Generating chunk {i+1}/{len(TEST_CHUNKS)}...", end=" ", flush=True)

        # Same settings as working Lesson 1 generation
        cond_dict = make_cond_dict(
            text=chunk_text,
            language="en-us",
            speaker=speaker_embedding,
            emotion=[0.35, 0.15, 0.0, 0.05, 0.15, 0.0, 0.1, 0.2],  # Warm storytelling
            pitch_std=70.0,
            speaking_rate=14.0,
        )

        conditioning = model.prepare_conditioning(cond_dict)
        codes = model.generate(conditioning)
        wav = model.autoencoder.decode(codes).cpu()

        # Convert to numpy
        audio_np = wav[0].squeeze().numpy()

        # Simple normalization ONLY - no silence removal!
        max_val = np.abs(audio_np).max()
        if max_val > 0:
            audio_np = audio_np / max_val * 0.85

        duration = len(audio_np) / sample_rate
        print(f"{duration:.1f}s")

        all_audio.append(audio_np)

        # Add pause between chunks (0.45 seconds - matching lesson settings)
        pause = np.zeros(int(0.45 * sample_rate))
        all_audio.append(pause)

    # Concatenate all chunks
    combined = np.concatenate(all_audio)

    # Final normalization only
    max_val = np.abs(combined).max()
    if max_val > 0:
        combined = combined / max_val * 0.95

    # Simple fade in/out (30ms) at edges only
    fade_samples = int(0.03 * sample_rate)
    if len(combined) > fade_samples * 2:
        fade_in = np.linspace(0, 1, fade_samples)
        fade_out = np.linspace(1, 0, fade_samples)
        combined[:fade_samples] *= fade_in
        combined[-fade_samples:] *= fade_out

    # Save test output
    output_path = OUTPUT_DIR / f"test_simple_{voice_file}"
    sf.write(str(output_path), combined, sample_rate)

    total_duration = len(combined) / sample_rate
    print(f"  SAVED: {output_path.name} ({total_duration:.1f}s)")

print("\n" + "=" * 60)
print("SIMPLE VOICE TESTING COMPLETE")
print("=" * 60)
print(f"\nTest outputs saved to: {OUTPUT_DIR}")
print("\nCompare these to the previous tests in the same folder.")
print("The 'test_simple_*.wav' files should sound BETTER because")
print("we're not destroying audio with aggressive silence removal.")
