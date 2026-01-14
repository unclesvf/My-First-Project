"""
Test all 10 voice references with Zonos TTS - Extended Version
With proper audio processing: silence trimming, volume normalization, fade transitions
Run this in WSL2: python3 test_all_voices.py
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

def remove_silence(audio, sample_rate, threshold_db=-35, min_silence_ms=100):
    """Remove silence from audio - both edges AND internal"""
    threshold = 10 ** (threshold_db / 20)
    window_size = int(sample_rate * min_silence_ms / 1000)

    if len(audio) < window_size * 2:
        return audio

    # Find all non-silent regions
    non_silent_regions = []
    i = 0
    in_speech = False
    speech_start = 0

    while i < len(audio) - window_size:
        window_rms = np.sqrt(np.mean(audio[i:i+window_size] ** 2))

        if window_rms > threshold:
            if not in_speech:
                speech_start = max(0, i - int(0.02 * sample_rate))  # 20ms lead-in
                in_speech = True
        else:
            if in_speech:
                speech_end = min(len(audio), i + int(0.02 * sample_rate))  # 20ms tail
                non_silent_regions.append(audio[speech_start:speech_end])
                in_speech = False

        i += window_size // 2

    # Don't forget the last region if still in speech
    if in_speech:
        non_silent_regions.append(audio[speech_start:])

    if not non_silent_regions:
        return audio

    # Concatenate with small gaps
    result = []
    gap = np.zeros(int(0.03 * sample_rate))  # 30ms gap between regions
    for idx, region in enumerate(non_silent_regions):
        result.append(region)
        if idx < len(non_silent_regions) - 1:
            result.append(gap)

    return np.concatenate(result)

def normalize_audio(audio, target_peak=0.95):
    """Normalize audio to target peak level"""
    max_val = np.abs(audio).max()
    if max_val > 0:
        return audio / max_val * target_peak
    return audio

def apply_fade(audio, sample_rate, fade_in_ms=30, fade_out_ms=30):
    """Apply fade in and fade out to smooth transitions"""
    fade_in_samples = int(sample_rate * fade_in_ms / 1000)
    fade_out_samples = int(sample_rate * fade_out_ms / 1000)

    # Apply fade in
    if fade_in_samples > 0 and len(audio) > fade_in_samples:
        fade_in = np.linspace(0, 1, fade_in_samples)
        audio[:fade_in_samples] = audio[:fade_in_samples] * fade_in

    # Apply fade out
    if fade_out_samples > 0 and len(audio) > fade_out_samples:
        fade_out = np.linspace(1, 0, fade_out_samples)
        audio[-fade_out_samples:] = audio[-fade_out_samples:] * fade_out

    return audio

# Load model
print("\nLoading Zonos model...")
model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device="cuda")
print("Model loaded!")

# Paths
VOICE_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/voice_references/selected")
OUTPUT_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/voice_tests")
OUTPUT_DIR.mkdir(exist_ok=True)

# Longer test texts - multiple chunks to create ~30 second clips
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
    ("02_older_male.wav", "Older Male (16-18)"),
    ("03_adult_male.wav", "Adult Male"),
    ("04_young_female.wav", "Young Female (12-14)"),
    ("05_older_female.wav", "Older Female (15-17)"),
    ("06_african_american_male.wav", "African American Male"),
    ("07_african_american_female.wav", "African American Female"),
    ("08_accented_male_european.wav", "European Accented Male"),
    ("09_native_female.wav", "Native/Cherokee Female"),
    ("10_french_accented_female.wav", "French Accented Female"),
]

print(f"\nGenerating extended tests for {len(VOICE_FILES)} voices...")
print("With audio processing: trim silence, normalize volume, fade transitions")
print("=" * 60)

sample_rate = model.autoencoder.sampling_rate

for voice_file, voice_name in VOICE_FILES:
    voice_path = VOICE_DIR / voice_file
    if not voice_path.exists():
        print(f"\n{voice_name}: NOT FOUND")
        continue

    print(f"\n{voice_name} ({voice_file}):")

    # Load reference audio
    ref_wav, ref_sr = torchaudio.load(str(voice_path))
    print(f"  Loading reference audio...")

    # Extract speaker embedding
    speaker_embedding = model.make_speaker_embedding(ref_wav, ref_sr)

    # Generate audio for each chunk
    all_audio = []

    for i, chunk_text in enumerate(TEST_CHUNKS):
        print(f"  Generating chunk {i+1}/{len(TEST_CHUNKS)}...", end=" ")

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

        # Process each chunk:
        # 1. Remove all silence (edges and internal)
        audio_np = remove_silence(audio_np, sample_rate)

        # 2. Normalize to consistent level
        audio_np = normalize_audio(audio_np, target_peak=0.85)

        # 3. Apply fade in/out
        audio_np = apply_fade(audio_np, sample_rate, fade_in_ms=30, fade_out_ms=30)

        duration = len(audio_np) / sample_rate
        print(f"{duration:.1f}s")

        all_audio.append(audio_np)

        # Add pause between chunks (0.45 seconds - matching lesson settings)
        pause = np.zeros(int(0.45 * sample_rate))
        all_audio.append(pause)

    # Concatenate all chunks
    combined = np.concatenate(all_audio)

    # Final normalization of combined audio
    combined = normalize_audio(combined, target_peak=0.95)

    # Save extended test output
    output_path = OUTPUT_DIR / f"test_{voice_file}"
    sf.write(str(output_path), combined, sample_rate)

    duration = len(combined) / sample_rate
    print(f"  Saved: {output_path.name} ({duration:.1f}s)")

print("\n" + "=" * 60)
print("EXTENDED VOICE TESTING COMPLETE")
print("=" * 60)
print(f"\nTest outputs saved to: {OUTPUT_DIR}")
print("\nAudio processing applied:")
print("  - Silence trimmed from start/end of each chunk")
print("  - Volume normalized to consistent level")
print("  - Fade in/out applied for smooth transitions")
