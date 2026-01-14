#!/usr/bin/env python3
"""
High-Quality Lesson Audio Generator with Quality Controls

Features:
- Per-chunk loudness normalization (target -16 LUFS)
- Quality gating with automatic regeneration of outliers
- Post-processing (compression, limiting)
- Detailed quality logging
"""

import os
import re
import sys
import json
import torch
import torchaudio
import subprocess
import wave
import numpy as np
from pathlib import Path
from datetime import datetime

# Platform-aware paths
if sys.platform == "linux":
    BASE_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator")
else:
    BASE_DIR = Path(r"C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator")

# Import lesson mappings
sys.path.insert(0, str(BASE_DIR))
from generate_all_lessons import LESSON_SCRIPT_MAP, LESSON_VOICE_MAP

# Quality thresholds
QUALITY_CONFIG = {
    'target_lufs': -16.0,          # Target loudness
    'lufs_tolerance': 2.0,          # Acceptable LUFS deviation
    'max_tempo_deviation': 40,      # Max BPM deviation from mean
    'max_regeneration_attempts': 3, # Tries before accepting chunk
    'min_chunk_duration': 1.0,      # Minimum chunk length in seconds
    'max_chunk_duration': 30.0,     # Maximum chunk length in seconds
}


def calculate_lufs(audio, sr):
    """Calculate integrated LUFS loudness."""
    # Simple LUFS approximation using RMS with K-weighting approximation
    # For production, use pyloudnorm for accurate ITU-R BS.1770-4
    rms = np.sqrt(np.mean(audio**2))
    if rms > 0:
        return 20 * np.log10(rms) + 3.0  # Rough LUFS approximation
    return -70.0


def normalize_lufs(audio, sr, target_lufs=-16.0):
    """Normalize audio to target LUFS."""
    current_lufs = calculate_lufs(audio, sr)
    if current_lufs < -60:  # Too quiet, likely silence
        return audio

    gain_db = target_lufs - current_lufs
    gain_linear = 10 ** (gain_db / 20)

    # Apply gain with soft limiting to prevent clipping
    normalized = audio * gain_linear

    # Soft clip at 0.95 to prevent harsh clipping
    normalized = np.tanh(normalized / 0.95) * 0.95

    return normalized


def apply_compression(audio, sr, threshold_db=-20, ratio=3.0, attack_ms=5, release_ms=50):
    """Apply dynamic range compression."""
    threshold = 10 ** (threshold_db / 20)
    attack_samples = int(sr * attack_ms / 1000)
    release_samples = int(sr * release_ms / 1000)

    envelope = np.abs(audio)

    # Smooth envelope
    from scipy.ndimage import uniform_filter1d
    envelope = uniform_filter1d(envelope, size=attack_samples)

    # Calculate gain reduction
    gain = np.ones_like(audio)
    above_threshold = envelope > threshold

    if np.any(above_threshold):
        # Compression ratio applied to signal above threshold
        excess_db = 20 * np.log10(envelope[above_threshold] / threshold + 1e-10)
        reduced_db = excess_db / ratio
        gain[above_threshold] = threshold * (10 ** (reduced_db / 20)) / (envelope[above_threshold] + 1e-10)

    compressed = audio * gain
    return compressed


def analyze_chunk(audio, sr):
    """Analyze a single chunk for quality metrics."""
    import librosa

    duration = len(audio) / sr
    lufs = calculate_lufs(audio, sr)
    rms = np.sqrt(np.mean(audio**2))

    # Tempo estimation
    if duration > 1.0:
        onset_env = librosa.onset.onset_strength(y=audio.astype(np.float32), sr=sr)
        tempo = librosa.feature.tempo(onset_envelope=onset_env, sr=sr)[0]
    else:
        tempo = 120  # Default for very short chunks

    # Zero crossing rate (noise indicator)
    zcr = np.mean(librosa.feature.zero_crossing_rate(audio.astype(np.float32)))

    return {
        'duration': duration,
        'lufs': lufs,
        'rms': rms,
        'tempo': tempo,
        'zcr': zcr
    }


def is_chunk_acceptable(metrics, reference_metrics=None):
    """Check if chunk meets quality standards."""
    issues = []

    # Duration check
    if metrics['duration'] < QUALITY_CONFIG['min_chunk_duration']:
        issues.append(f"too short ({metrics['duration']:.2f}s)")
    if metrics['duration'] > QUALITY_CONFIG['max_chunk_duration']:
        issues.append(f"too long ({metrics['duration']:.2f}s)")

    # Loudness check (before normalization)
    if metrics['lufs'] < -45:
        issues.append(f"too quiet (LUFS: {metrics['lufs']:.1f})")

    # Tempo check against reference
    if reference_metrics and 'mean_tempo' in reference_metrics:
        tempo_dev = abs(metrics['tempo'] - reference_metrics['mean_tempo'])
        if tempo_dev > QUALITY_CONFIG['max_tempo_deviation']:
            issues.append(f"tempo outlier ({metrics['tempo']:.0f} vs {reference_metrics['mean_tempo']:.0f})")

    # High noise indicator
    if metrics['zcr'] > 0.3:
        issues.append(f"possible noise (ZCR: {metrics['zcr']:.3f})")

    return len(issues) == 0, issues


def generate_single_chunk(model, text, speaker_embedding, chunk_num, max_attempts=3):
    """Generate a single chunk with quality checking and retry."""
    from zonos.conditioning import make_cond_dict

    best_audio = None
    best_metrics = None
    best_score = -float('inf')

    for attempt in range(max_attempts):
        # Slightly vary parameters on retry to get different output
        emotion_variation = 0.02 * attempt
        rate_variation = 0.5 * attempt

        cond_dict = make_cond_dict(
            text=text,
            language="en-us",
            speaker=speaker_embedding,
            emotion=[
                0.35 + emotion_variation,  # Happiness
                0.15 - emotion_variation,  # Sadness
                0.0,                        # Disgust
                0.05,                       # Fear
                0.15,                       # Surprise
                0.0,                        # Anger
                0.1,                        # Other
                0.2                         # Neutral
            ],
            pitch_std=70.0,
            speaking_rate=14.0 + rate_variation,
        )

        conditioning = model.prepare_conditioning(cond_dict)
        codes = model.generate(conditioning)
        wav = model.autoencoder.decode(codes).cpu()

        audio = wav[0].numpy().flatten()
        sr = model.autoencoder.sampling_rate

        metrics = analyze_chunk(audio, sr)

        # Score based on target loudness and reasonable tempo
        lufs_score = -abs(metrics['lufs'] - (-25))  # Prefer around -25 LUFS pre-normalization
        tempo_score = -abs(metrics['tempo'] - 120) / 10  # Prefer moderate tempo
        noise_score = -metrics['zcr'] * 100  # Penalize high ZCR

        score = lufs_score + tempo_score + noise_score

        if score > best_score:
            best_score = score
            best_audio = audio
            best_metrics = metrics

        # If first attempt is good enough, use it
        acceptable, issues = is_chunk_acceptable(metrics)
        if acceptable and attempt == 0:
            break
        elif attempt > 0:
            print(f"      Retry {attempt}: score={score:.1f}, issues={issues}")

    return best_audio, best_metrics


def split_into_chunks(text, max_chars=250):
    """Split text into chunks suitable for TTS generation."""
    chunks = []
    paragraphs = re.split(r'\n\n+', text.strip())
    current_chunk = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # Chapter titles should always be their own chunk
        is_chapter = para.startswith('Chapter ')

        if is_chapter:
            if current_chunk:
                chunks.append(current_chunk.strip())
            chunks.append(para)
            current_chunk = ""
            continue

        if len(current_chunk) + len(para) + 2 <= max_chars:
            if current_chunk:
                current_chunk += "\n\n" + para
            else:
                current_chunk = para
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())

            if len(para) > max_chars:
                sentences = re.split(r'(?<=[.!?])\s+', para)
                current_chunk = ""
                for sent in sentences:
                    if len(current_chunk) + len(sent) + 1 <= max_chars:
                        if current_chunk:
                            current_chunk += " " + sent
                        else:
                            current_chunk = sent
                    else:
                        if current_chunk:
                            chunks.append(current_chunk.strip())
                        current_chunk = sent
            else:
                current_chunk = para

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks


def generate_lesson_high_quality(lesson_num, output_dir=None):
    """Generate a lesson with full quality controls."""

    print(f"\n{'='*70}")
    print(f"HIGH-QUALITY GENERATION: LESSON {lesson_num}")
    print(f"{'='*70}")

    # Get script and voice info
    script_name = LESSON_SCRIPT_MAP.get(lesson_num)
    voice_name = LESSON_VOICE_MAP.get(lesson_num)

    if not script_name or not voice_name:
        print(f"ERROR: Missing mapping for lesson {lesson_num}")
        return False

    script_path = BASE_DIR / "lessons" / f"{script_name}_TTS_Script.txt"
    voice_path = BASE_DIR / "voice_references" / "selected" / f"{voice_name}.wav"

    if not script_path.exists():
        print(f"ERROR: Script not found: {script_path}")
        return False
    if not voice_path.exists():
        print(f"ERROR: Voice not found: {voice_path}")
        return False

    if output_dir is None:
        output_dir = BASE_DIR / "lessons"
    output_dir = Path(output_dir)

    print(f"Script: {script_name}")
    print(f"Voice: {voice_name}")
    print(f"Target LUFS: {QUALITY_CONFIG['target_lufs']}")

    # Load model
    print("\nLoading Zonos model...")
    from zonos.model import Zonos
    model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device="cuda")
    sample_rate = model.autoencoder.sampling_rate
    print(f"Model loaded! Sample rate: {sample_rate}")

    # Load voice reference
    ref_wav, ref_sr = torchaudio.load(str(voice_path))
    speaker_embedding = model.make_speaker_embedding(ref_wav, ref_sr)
    print(f"Voice reference loaded: {ref_wav.shape[1]/ref_sr:.1f}s")

    # Read script
    with open(script_path, "r", encoding="utf-8") as f:
        lesson_text = f.read()

    chunks = split_into_chunks(lesson_text, max_chars=250)
    print(f"Script: {len(lesson_text)} chars, {len(chunks)} chunks")

    # Create chunks directory
    chunks_dir = output_dir / f"lesson_{lesson_num:02d}_chunks_hq"
    chunks_dir.mkdir(exist_ok=True)

    # Generate all chunks
    print(f"\n{'='*70}")
    print("GENERATING CHUNKS")
    print(f"{'='*70}")

    chunk_data = []
    all_metrics = []

    for i, chunk_text in enumerate(chunks):
        print(f"\nChunk {i+1}/{len(chunks)}: {chunk_text[:50]}...")

        audio, metrics = generate_single_chunk(
            model, chunk_text, speaker_embedding, i,
            max_attempts=QUALITY_CONFIG['max_regeneration_attempts']
        )

        # Store raw audio and metrics
        chunk_data.append({
            'index': i,
            'text': chunk_text,
            'audio': audio,
            'metrics': metrics
        })
        all_metrics.append(metrics)

        print(f"    Duration: {metrics['duration']:.2f}s, LUFS: {metrics['lufs']:.1f}, Tempo: {metrics['tempo']:.0f}")

    # Calculate reference metrics for quality gating
    mean_tempo = np.mean([m['tempo'] for m in all_metrics])
    mean_lufs = np.mean([m['lufs'] for m in all_metrics])
    reference_metrics = {'mean_tempo': mean_tempo, 'mean_lufs': mean_lufs}

    print(f"\n{'='*70}")
    print("NORMALIZING AND QUALITY CHECK")
    print(f"{'='*70}")
    print(f"Mean tempo: {mean_tempo:.1f} BPM")
    print(f"Mean LUFS (pre-norm): {mean_lufs:.1f}")

    # Normalize each chunk and save
    normalized_chunks = []
    quality_log = []

    for chunk in chunk_data:
        i = chunk['index']
        audio = chunk['audio']
        metrics = chunk['metrics']

        # Check quality
        acceptable, issues = is_chunk_acceptable(metrics, reference_metrics)

        # Normalize to target LUFS
        normalized = normalize_lufs(audio, sample_rate, QUALITY_CONFIG['target_lufs'])

        # Calculate post-normalization metrics
        post_lufs = calculate_lufs(normalized, sample_rate)

        # Save normalized chunk
        chunk_path = chunks_dir / f"chunk_{i+1:03d}.wav"

        # Convert to tensor for saving
        audio_tensor = torch.from_numpy(normalized).unsqueeze(0).float()
        torchaudio.save(str(chunk_path), audio_tensor, sample_rate)

        normalized_chunks.append({
            'path': chunk_path,
            'duration': metrics['duration'],
            'pre_lufs': metrics['lufs'],
            'post_lufs': post_lufs,
            'tempo': metrics['tempo'],
            'acceptable': acceptable,
            'issues': issues
        })

        status = "✓" if acceptable else "⚠"
        print(f"  {status} Chunk {i+1}: {metrics['lufs']:.1f} -> {post_lufs:.1f} LUFS, tempo={metrics['tempo']:.0f}")
        if issues:
            print(f"      Issues: {', '.join(issues)}")

        quality_log.append({
            'chunk': i + 1,
            'text_preview': chunk['text'][:50],
            'duration': metrics['duration'],
            'pre_lufs': metrics['lufs'],
            'post_lufs': post_lufs,
            'tempo': metrics['tempo'],
            'acceptable': acceptable,
            'issues': issues
        })

    # Save quality log
    log_path = chunks_dir / "quality_log.json"
    with open(log_path, 'w') as f:
        json.dump(quality_log, f, indent=2)

    # Concatenate chunks
    print(f"\n{'='*70}")
    print("CONCATENATING WITH CROSSFADE")
    print(f"{'='*70}")

    # Load all normalized chunks and concatenate with small crossfade
    all_audio = []
    crossfade_samples = int(0.05 * sample_rate)  # 50ms crossfade

    for i, chunk_info in enumerate(normalized_chunks):
        chunk_audio, _ = torchaudio.load(str(chunk_info['path']))
        chunk_audio = chunk_audio.numpy().flatten()

        if i > 0 and len(all_audio) > crossfade_samples and len(chunk_audio) > crossfade_samples:
            # Apply crossfade
            fade_out = np.linspace(1, 0, crossfade_samples)
            fade_in = np.linspace(0, 1, crossfade_samples)

            # Blend the overlap region
            all_audio[-crossfade_samples:] = (
                all_audio[-crossfade_samples:] * fade_out +
                chunk_audio[:crossfade_samples] * fade_in
            )
            all_audio = np.concatenate([all_audio, chunk_audio[crossfade_samples:]])
        else:
            if len(all_audio) > 0:
                # Add small gap between chunks
                gap = np.zeros(int(0.1 * sample_rate))
                all_audio = np.concatenate([all_audio, gap, chunk_audio])
            else:
                all_audio = chunk_audio

    all_audio = np.array(all_audio)

    # Apply final compression
    print("Applying dynamic compression...")
    compressed = apply_compression(all_audio, sample_rate, threshold_db=-18, ratio=2.5)

    # Final normalization
    print("Final loudness normalization...")
    final_audio = normalize_lufs(compressed, sample_rate, QUALITY_CONFIG['target_lufs'])

    # Soft limit to prevent any clipping
    final_audio = np.clip(final_audio, -0.99, 0.99)

    # Save final output
    output_path = output_dir / f"{script_name}_Zonos_HQ.wav"
    final_tensor = torch.from_numpy(final_audio).unsqueeze(0).float()
    torchaudio.save(str(output_path), final_tensor, sample_rate)

    duration = len(final_audio) / sample_rate
    final_lufs = calculate_lufs(final_audio, sample_rate)

    print(f"\n{'='*70}")
    print("GENERATION COMPLETE")
    print(f"{'='*70}")
    print(f"Output: {output_path.name}")
    print(f"Duration: {duration:.1f}s ({duration/60:.1f} minutes)")
    print(f"Final LUFS: {final_lufs:.1f}")

    # Quality summary
    acceptable_count = sum(1 for c in normalized_chunks if c['acceptable'])
    print(f"\nQuality Summary:")
    print(f"  Acceptable chunks: {acceptable_count}/{len(normalized_chunks)}")

    lufs_values = [c['post_lufs'] for c in normalized_chunks]
    tempo_values = [c['tempo'] for c in normalized_chunks]
    print(f"  LUFS range: {min(lufs_values):.1f} to {max(lufs_values):.1f} (std: {np.std(lufs_values):.2f})")
    print(f"  Tempo range: {min(tempo_values):.0f} to {max(tempo_values):.0f} (std: {np.std(tempo_values):.1f})")

    return True


def main():
    import argparse
    parser = argparse.ArgumentParser(description="High-quality lesson audio generation")
    parser.add_argument("--lesson", type=int, required=True, help="Lesson number to generate")
    parser.add_argument("--output", type=str, help="Output directory")
    args = parser.parse_args()

    print(f"CUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"GPU: {torch.cuda.get_device_name(0)}")

    success = generate_lesson_high_quality(args.lesson, args.output)

    if success:
        print("\n✓ Generation successful!")
    else:
        print("\n✗ Generation failed!")
        sys.exit(1)


if __name__ == "__main__":
    main()
