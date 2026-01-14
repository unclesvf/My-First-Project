#!/usr/bin/env python3
"""
Concatenate normalized chunks with crossfade and final processing.
"""

import sys
import torch
import torchaudio
import numpy as np
from pathlib import Path

# Platform-aware paths
if sys.platform == "linux":
    BASE_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator")
else:
    BASE_DIR = Path(r"C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator")


def calculate_lufs(audio, sr):
    """Calculate integrated LUFS loudness."""
    rms = np.sqrt(np.mean(audio**2))
    if rms > 0:
        return 20 * np.log10(rms) + 3.0
    return -70.0


def normalize_lufs(audio, sr, target_lufs=-16.0):
    """Normalize audio to target LUFS."""
    current_lufs = calculate_lufs(audio, sr)
    if current_lufs < -60:
        return audio

    gain_db = target_lufs - current_lufs
    gain_linear = 10 ** (gain_db / 20)
    normalized = audio * gain_linear
    normalized = np.tanh(normalized / 0.95) * 0.95
    return normalized


def apply_compression(audio, sr, threshold_db=-20, ratio=2.5):
    """Apply simple dynamic range compression."""
    from scipy.ndimage import uniform_filter1d

    threshold = 10 ** (threshold_db / 20)
    envelope = np.abs(audio)
    envelope = uniform_filter1d(envelope, size=int(sr * 0.005))

    gain = np.ones_like(audio)
    above_threshold = envelope > threshold

    if np.any(above_threshold):
        excess_db = 20 * np.log10(envelope[above_threshold] / threshold + 1e-10)
        reduced_db = excess_db / ratio
        gain[above_threshold] = threshold * (10 ** (reduced_db / 20)) / (envelope[above_threshold] + 1e-10)

    return audio * gain


def concatenate_lesson(lesson_num, use_hq=True, use_verified=False):
    """Concatenate chunks for a lesson."""

    if use_verified:
        chunks_dir = BASE_DIR / "lessons" / f"lesson_{lesson_num:02d}_verified"
        output_suffix = "_Zonos_Verified.wav"
    elif use_hq:
        chunks_dir = BASE_DIR / "lessons" / f"lesson_{lesson_num:02d}_chunks_hq"
        output_suffix = "_Zonos_HQ.wav"
    else:
        chunks_dir = BASE_DIR / "lessons" / f"lesson_{lesson_num:02d}_chunks"
        output_suffix = "_Zonos_Processed.wav"

    if not chunks_dir.exists():
        print(f"Chunks directory not found: {chunks_dir}")
        return False

    chunk_files = sorted(chunks_dir.glob("chunk_*.wav"))
    print(f"Found {len(chunk_files)} chunks in {chunks_dir.name}")

    if not chunk_files:
        return False

    # Load first chunk to get sample rate
    first_audio, sr = torchaudio.load(str(chunk_files[0]))
    sr = int(sr)
    print(f"Sample rate: {sr}")

    # Concatenate with small gaps
    all_segments = []
    gap_samples = int(0.08 * sr)  # 80ms gap between chunks
    gap = np.zeros(gap_samples)

    for i, chunk_file in enumerate(chunk_files):
        audio, chunk_sr = torchaudio.load(str(chunk_file))
        audio = audio.numpy().flatten()

        if i > 0:
            all_segments.append(gap)
        all_segments.append(audio)

        if (i + 1) % 10 == 0:
            print(f"  Loaded {i + 1}/{len(chunk_files)} chunks")

    print(f"Loaded all {len(chunk_files)} chunks")

    # Concatenate
    full_audio = np.concatenate(all_segments)
    print(f"Concatenated duration: {len(full_audio)/sr:.1f}s")

    # Apply compression
    print("Applying compression...")
    compressed = apply_compression(full_audio, sr, threshold_db=-18, ratio=2.5)

    # Final normalization
    print("Final normalization...")
    final_audio = normalize_lufs(compressed, sr, target_lufs=-16.0)

    # Soft clip
    final_audio = np.clip(final_audio, -0.99, 0.99)

    # Get output filename from lesson script map
    sys.path.insert(0, str(BASE_DIR))
    from generate_all_lessons import LESSON_SCRIPT_MAP
    script_name = LESSON_SCRIPT_MAP.get(lesson_num)

    if not script_name:
        script_name = f"Lesson_{lesson_num:02d}"

    output_path = BASE_DIR / "lessons" / f"{script_name}{output_suffix}"

    # Save
    print(f"Saving to {output_path.name}...")
    final_tensor = torch.from_numpy(final_audio).unsqueeze(0).float()
    torchaudio.save(str(output_path), final_tensor, sr)

    duration = len(final_audio) / sr
    final_lufs = calculate_lufs(final_audio, sr)

    print(f"\nComplete!")
    print(f"  Output: {output_path.name}")
    print(f"  Duration: {duration:.1f}s ({duration/60:.1f} minutes)")
    print(f"  Final LUFS: {final_lufs:.1f}")

    return True


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--lesson", type=int, required=True)
    parser.add_argument("--no-hq", action="store_true", help="Use regular chunks instead of HQ")
    parser.add_argument("--verified", action="store_true", help="Use verified chunks")
    args = parser.parse_args()

    success = concatenate_lesson(args.lesson, use_hq=not args.no_hq, use_verified=args.verified)
    if not success:
        sys.exit(1)


if __name__ == "__main__":
    main()
