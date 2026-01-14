#!/usr/bin/env python3
"""
Aggressively process and concatenate chunks with:
- Higher high-pass filter (120Hz)
- Noise reduction
- Aggressive silence trimming from BOTH ends
- Precise, consistent pause insertion
"""

import sys
import torch
import torchaudio
import numpy as np
from pathlib import Path

if sys.platform == "linux":
    BASE_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator")
else:
    BASE_DIR = Path(r"C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator")

# Pause durations (in seconds)
PAUSE_CONFIG = {
    'after_title': 1.0,        # After lesson title/intro
    'after_chapter': 0.9,      # After "Chapter X. Title"
    'between_sentences': 0.45, # Between regular sentences
    'min_pause': 0.3,          # Minimum pause anywhere
}


def apply_highpass_filter(audio, sr, cutoff=120):
    """Apply high-pass filter to remove low-frequency hums."""
    from scipy.signal import butter, filtfilt

    nyquist = sr / 2
    normalized_cutoff = cutoff / nyquist
    b, a = butter(5, normalized_cutoff, btype='high')  # 5th order for steeper rolloff
    return filtfilt(b, a, audio)


def reduce_noise(audio, sr):
    """Apply noise reduction using spectral gating."""
    try:
        import noisereduce as nr
        # Use first 0.5s as noise profile (usually silence/low content)
        noise_sample = audio[:int(0.5 * sr)]
        reduced = nr.reduce_noise(
            y=audio,
            sr=sr,
            y_noise=noise_sample,
            prop_decrease=0.6,  # Moderate reduction
            stationary=True
        )
        return reduced
    except ImportError:
        print("  (noisereduce not installed, skipping noise reduction)")
        return audio


def find_speech_boundaries(audio, sr, threshold_db=-35, min_speech_ms=50):
    """Find where speech starts and ends in audio."""
    # Convert to dB
    frame_size = int(sr * 0.01)  # 10ms frames
    hop_size = frame_size // 2

    # Calculate RMS energy in frames
    num_frames = (len(audio) - frame_size) // hop_size + 1
    rms_db = []

    for i in range(num_frames):
        start = i * hop_size
        frame = audio[start:start + frame_size]
        rms = np.sqrt(np.mean(frame**2) + 1e-10)
        db = 20 * np.log10(rms + 1e-10)
        rms_db.append(db)

    rms_db = np.array(rms_db)

    # Find first frame above threshold
    min_frames = int(min_speech_ms / 10)  # Convert ms to frames

    speech_start = 0
    for i in range(len(rms_db) - min_frames):
        if np.mean(rms_db[i:i+min_frames]) > threshold_db:
            speech_start = i * hop_size
            break

    # Find last frame above threshold
    speech_end = len(audio)
    for i in range(len(rms_db) - 1, min_frames, -1):
        if np.mean(rms_db[i-min_frames:i]) > threshold_db:
            speech_end = min((i + 1) * hop_size + frame_size, len(audio))
            break

    return speech_start, speech_end


def trim_silence_aggressive(audio, sr, threshold_db=-35):
    """Aggressively trim silence from both ends of audio."""
    start, end = find_speech_boundaries(audio, sr, threshold_db)

    # Add tiny buffer (20ms) to avoid cutting speech
    buffer_samples = int(0.02 * sr)
    start = max(0, start - buffer_samples)
    end = min(len(audio), end + buffer_samples)

    return audio[start:end]


def normalize_audio(audio, target_db=-16.0):
    """Normalize audio to target dB level."""
    rms = np.sqrt(np.mean(audio**2))
    if rms < 1e-10:
        return audio

    current_db = 20 * np.log10(rms)
    gain_db = target_db - current_db
    gain_linear = 10 ** (gain_db / 20)

    normalized = audio * gain_linear
    normalized = np.clip(normalized, -0.99, 0.99)

    return normalized


def detect_chunk_type(chunk_path, chunk_idx):
    """Detect what type of chunk this is based on index and filename."""
    # First chunk is usually the title/intro
    if chunk_idx == 0:
        return 'title'

    # Check if this might be a chapter header (short duration)
    audio, sr = torchaudio.load(str(chunk_path))
    duration = audio.shape[1] / sr

    # Chapter headers are typically short (under 4 seconds)
    if duration < 4.0:
        return 'chapter'

    return 'sentence'


def process_and_concatenate(lesson_num, source_dir_name="lesson_02_verified"):
    """Process chunks and concatenate with precise pauses."""

    chunks_dir = BASE_DIR / "lessons" / source_dir_name

    if not chunks_dir.exists():
        print(f"Directory not found: {chunks_dir}")
        return False

    chunk_files = sorted(chunks_dir.glob("chunk_*.wav"))
    print(f"Found {len(chunk_files)} chunks")

    if not chunk_files:
        return False

    # Load and process each chunk
    processed_chunks = []
    sr = None

    for i, chunk_path in enumerate(chunk_files):
        audio, chunk_sr = torchaudio.load(str(chunk_path))
        audio = audio.numpy().flatten()

        if sr is None:
            sr = int(chunk_sr)

        original_duration = len(audio) / sr

        # 1. Apply high-pass filter (120Hz)
        audio = apply_highpass_filter(audio, sr, cutoff=120)

        # 2. Apply noise reduction
        audio = reduce_noise(audio, sr)

        # 3. Aggressively trim silence from both ends
        audio = trim_silence_aggressive(audio, sr, threshold_db=-35)

        # 4. Normalize
        audio = normalize_audio(audio, target_db=-16.0)

        trimmed_duration = len(audio) / sr

        # Detect chunk type
        chunk_type = detect_chunk_type(chunk_path, i)

        # Determine pause after this chunk
        if chunk_type == 'title':
            pause_after = PAUSE_CONFIG['after_title']
        elif chunk_type == 'chapter':
            pause_after = PAUSE_CONFIG['after_chapter']
        else:
            pause_after = PAUSE_CONFIG['between_sentences']

        processed_chunks.append({
            'audio': audio,
            'type': chunk_type,
            'pause_after': pause_after,
            'original_duration': original_duration,
            'trimmed_duration': trimmed_duration
        })

        if (i + 1) % 10 == 0:
            print(f"  Processed {i + 1}/{len(chunk_files)} chunks")

    print(f"Processed all {len(chunk_files)} chunks")

    # Show processing summary
    print(f"\nProcessing summary:")
    total_trimmed = sum(c['original_duration'] - c['trimmed_duration'] for c in processed_chunks)
    print(f"  Total silence trimmed: {total_trimmed:.1f}s")

    # Concatenate with precise pauses
    print(f"\nConcatenating with standardized pauses...")
    segments = []

    for i, chunk in enumerate(processed_chunks):
        # Add the audio
        segments.append(chunk['audio'])

        # Add pause (except after last chunk)
        if i < len(processed_chunks) - 1:
            pause_samples = int(chunk['pause_after'] * sr)
            pause = np.zeros(pause_samples)
            segments.append(pause)

            if chunk['type'] in ['title', 'chapter']:
                print(f"  Chunk {i+1} ({chunk['type']}): {chunk['pause_after']}s pause")

    full_audio = np.concatenate(segments)

    # Final normalization
    full_audio = normalize_audio(full_audio, target_db=-16.0)
    full_audio = np.clip(full_audio, -0.99, 0.99)

    # Get output filename
    sys.path.insert(0, str(BASE_DIR))
    from generate_all_lessons import LESSON_SCRIPT_MAP
    script_name = LESSON_SCRIPT_MAP.get(lesson_num, f"Lesson_{lesson_num:02d}")

    output_path = BASE_DIR / "lessons" / f"{script_name}_Zonos_V2.wav"

    # Save
    print(f"\nSaving to {output_path.name}...")
    audio_tensor = torch.from_numpy(full_audio).unsqueeze(0).float()
    torchaudio.save(str(output_path), audio_tensor, sr)

    duration = len(full_audio) / sr
    print(f"\nComplete!")
    print(f"  Output: {output_path.name}")
    print(f"  Duration: {duration:.1f}s ({duration/60:.1f} min)")

    return True


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--lesson", type=int, required=True)
    parser.add_argument("--source", type=str, help="Source directory name (default: lesson_XX_verified)")
    args = parser.parse_args()

    source_dir = args.source or f"lesson_{args.lesson:02d}_verified"

    success = process_and_concatenate(args.lesson, source_dir)
    if not success:
        sys.exit(1)


if __name__ == "__main__":
    main()
