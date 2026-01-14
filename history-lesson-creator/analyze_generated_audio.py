#!/usr/bin/env python3
"""
Analyze generated TTS audio for quality issues.
Detects: speed variations, volume inconsistencies, artifacts, transcription errors.
"""

import sys
from pathlib import Path
import numpy as np

# Platform-aware paths
if sys.platform == "linux":
    BASE_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator")
else:
    BASE_DIR = Path(r"C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator")


def analyze_full_audio(audio_path):
    """Comprehensive analysis of generated audio."""
    import librosa
    import scipy.signal as signal

    print(f"\n{'='*70}")
    print(f"ANALYZING: {audio_path.name}")
    print(f"{'='*70}")

    # Load audio
    y, sr = librosa.load(audio_path, sr=None)
    duration = len(y) / sr
    print(f"\nBasic Info:")
    print(f"  Duration: {duration:.1f}s ({duration/60:.1f} minutes)")
    print(f"  Sample Rate: {sr}Hz")

    # Split into segments for analysis (30-second windows)
    segment_length = 30 * sr
    num_segments = int(np.ceil(len(y) / segment_length))

    print(f"  Analyzing {num_segments} segments (30s each)")

    segment_metrics = []

    for i in range(num_segments):
        start = i * segment_length
        end = min((i + 1) * segment_length, len(y))
        segment = y[start:end]

        if len(segment) < sr:  # Skip very short segments
            continue

        # RMS energy (volume)
        rms = np.sqrt(np.mean(segment**2))

        # Spectral centroid (brightness)
        centroid = np.mean(librosa.feature.spectral_centroid(y=segment, sr=sr))

        # Zero crossing rate (can indicate noise/artifacts)
        zcr = np.mean(librosa.feature.zero_crossing_rate(segment))

        # Tempo estimation (speaking rate proxy)
        onset_env = librosa.onset.onset_strength(y=segment, sr=sr)
        tempo = librosa.feature.tempo(onset_envelope=onset_env, sr=sr)[0]

        # LUFS approximation (loudness)
        # Simple approximation - proper LUFS needs pyloudnorm
        db = 20 * np.log10(rms + 1e-10)

        segment_metrics.append({
            'segment': i + 1,
            'start_time': start / sr,
            'rms': rms,
            'db': db,
            'centroid': centroid,
            'zcr': zcr,
            'tempo': tempo
        })

    # Analyze consistency across segments
    print(f"\n{'='*70}")
    print("SEGMENT-BY-SEGMENT ANALYSIS")
    print(f"{'='*70}")
    print(f"{'Seg':>4} {'Time':>8} {'Volume(dB)':>12} {'Tempo':>8} {'Centroid':>10} {'ZCR':>8}")
    print("-" * 70)

    for m in segment_metrics:
        print(f"{m['segment']:>4} {m['start_time']:>7.1f}s {m['db']:>11.1f} {m['tempo']:>8.1f} {m['centroid']:>9.0f}Hz {m['zcr']:>8.4f}")

    # Calculate variation statistics
    rms_values = [m['rms'] for m in segment_metrics]
    db_values = [m['db'] for m in segment_metrics]
    tempo_values = [m['tempo'] for m in segment_metrics]
    centroid_values = [m['centroid'] for m in segment_metrics]
    zcr_values = [m['zcr'] for m in segment_metrics]

    print(f"\n{'='*70}")
    print("CONSISTENCY ANALYSIS")
    print(f"{'='*70}")

    # Volume consistency
    db_std = np.std(db_values)
    db_range = max(db_values) - min(db_values)
    print(f"\nVolume Consistency:")
    print(f"  Mean: {np.mean(db_values):.1f} dB")
    print(f"  Std Dev: {db_std:.2f} dB")
    print(f"  Range: {db_range:.1f} dB (min: {min(db_values):.1f}, max: {max(db_values):.1f})")

    if db_std > 3:
        print(f"  ⚠️  HIGH VOLUME VARIATION - std dev > 3dB")
    elif db_std > 2:
        print(f"  ⚠️  MODERATE VOLUME VARIATION")
    else:
        print(f"  ✓ Volume is reasonably consistent")

    # Tempo/speed consistency
    tempo_std = np.std(tempo_values)
    tempo_range = max(tempo_values) - min(tempo_values)
    print(f"\nSpeed/Tempo Consistency:")
    print(f"  Mean: {np.mean(tempo_values):.1f} BPM")
    print(f"  Std Dev: {tempo_std:.2f} BPM")
    print(f"  Range: {tempo_range:.1f} BPM")

    if tempo_std > 30:
        print(f"  ⚠️  HIGH SPEED VARIATION - inconsistent pacing")
    elif tempo_std > 20:
        print(f"  ⚠️  MODERATE SPEED VARIATION")
    else:
        print(f"  ✓ Speed is reasonably consistent")

    # Spectral consistency (tone/timbre)
    centroid_std = np.std(centroid_values)
    centroid_cv = centroid_std / np.mean(centroid_values) * 100
    print(f"\nTonal Consistency (Spectral Centroid):")
    print(f"  Mean: {np.mean(centroid_values):.0f} Hz")
    print(f"  Coefficient of Variation: {centroid_cv:.1f}%")

    if centroid_cv > 20:
        print(f"  ⚠️  HIGH TONAL VARIATION - voice character changing")
    else:
        print(f"  ✓ Tonal quality is consistent")

    # ZCR analysis (noise/artifacts)
    zcr_std = np.std(zcr_values)
    print(f"\nNoise/Artifact Indicator (ZCR):")
    print(f"  Mean: {np.mean(zcr_values):.4f}")
    print(f"  Std Dev: {zcr_std:.4f}")

    # Detect potential problem segments
    print(f"\n{'='*70}")
    print("PROBLEM SEGMENT DETECTION")
    print(f"{'='*70}")

    problems = []
    db_mean = np.mean(db_values)
    tempo_mean = np.mean(tempo_values)

    for m in segment_metrics:
        issues = []
        if abs(m['db'] - db_mean) > 2 * db_std and db_std > 0:
            issues.append(f"volume ({m['db']:.1f}dB vs mean {db_mean:.1f}dB)")
        if abs(m['tempo'] - tempo_mean) > 2 * tempo_std and tempo_std > 0:
            issues.append(f"speed ({m['tempo']:.0f} vs mean {tempo_mean:.0f})")
        if m['zcr'] > np.mean(zcr_values) + 2 * zcr_std:
            issues.append(f"possible noise/artifacts")

        if issues:
            problems.append((m['segment'], m['start_time'], issues))

    if problems:
        print("\nSegments with potential issues:")
        for seg, time, issues in problems:
            print(f"  Segment {seg} ({time:.0f}s): {', '.join(issues)}")
    else:
        print("\nNo major problem segments detected.")

    # Overall quality score
    print(f"\n{'='*70}")
    print("OVERALL QUALITY ASSESSMENT")
    print(f"{'='*70}")

    score = 100
    issues_found = []

    if db_std > 3:
        score -= 25
        issues_found.append("High volume variation")
    elif db_std > 2:
        score -= 10
        issues_found.append("Moderate volume variation")

    if tempo_std > 30:
        score -= 25
        issues_found.append("High speed variation")
    elif tempo_std > 20:
        score -= 10
        issues_found.append("Moderate speed variation")

    if centroid_cv > 20:
        score -= 20
        issues_found.append("Voice character inconsistency")

    if len(problems) > num_segments * 0.2:
        score -= 20
        issues_found.append(f"Many problem segments ({len(problems)}/{num_segments})")

    print(f"\nQuality Score: {score}/100")
    if issues_found:
        print(f"Issues: {', '.join(issues_found)}")
    else:
        print("No significant issues detected.")

    return {
        'duration': duration,
        'score': score,
        'db_std': db_std,
        'tempo_std': tempo_std,
        'problems': problems,
        'segment_metrics': segment_metrics
    }


def analyze_chunks(chunks_dir):
    """Analyze individual chunks before concatenation."""
    import librosa

    print(f"\n{'='*70}")
    print(f"ANALYZING CHUNKS: {chunks_dir.name}")
    print(f"{'='*70}")

    chunk_files = sorted(chunks_dir.glob("chunk_*.wav"))
    print(f"Found {len(chunk_files)} chunks")

    chunk_data = []
    for chunk_file in chunk_files:
        y, sr = librosa.load(chunk_file, sr=None)
        duration = len(y) / sr
        rms = np.sqrt(np.mean(y**2))
        db = 20 * np.log10(rms + 1e-10)

        # Tempo
        onset_env = librosa.onset.onset_strength(y=y, sr=sr)
        tempo = librosa.feature.tempo(onset_envelope=onset_env, sr=sr)[0]

        chunk_data.append({
            'file': chunk_file.name,
            'duration': duration,
            'db': db,
            'tempo': tempo
        })

    # Print analysis
    print(f"\n{'Chunk':<15} {'Duration':>10} {'Volume(dB)':>12} {'Tempo':>8}")
    print("-" * 50)

    for c in chunk_data:
        print(f"{c['file']:<15} {c['duration']:>9.2f}s {c['db']:>11.1f} {c['tempo']:>8.1f}")

    # Find outliers
    db_values = [c['db'] for c in chunk_data]
    tempo_values = [c['tempo'] for c in chunk_data]
    db_mean, db_std = np.mean(db_values), np.std(db_values)
    tempo_mean, tempo_std = np.mean(tempo_values), np.std(tempo_values)

    print(f"\nStatistics:")
    print(f"  Volume: mean={db_mean:.1f}dB, std={db_std:.2f}dB")
    print(f"  Tempo: mean={tempo_mean:.1f}, std={tempo_std:.2f}")

    outliers = []
    for c in chunk_data:
        if abs(c['db'] - db_mean) > 2 * db_std:
            outliers.append((c['file'], 'volume'))
        if abs(c['tempo'] - tempo_mean) > 2 * tempo_std:
            outliers.append((c['file'], 'tempo'))

    if outliers:
        print(f"\nOutlier chunks (consider regenerating):")
        for chunk, issue in outliers:
            print(f"  {chunk}: {issue} outlier")

    return chunk_data


def transcribe_and_compare(audio_path, original_text_path):
    """Transcribe audio with Whisper and compare to original."""
    try:
        import whisper
    except ImportError:
        print("Whisper not available - skipping transcription check")
        return None

    print(f"\n{'='*70}")
    print("TRANSCRIPTION ACCURACY CHECK (Whisper)")
    print(f"{'='*70}")

    print("Loading Whisper model (this may take a moment)...")
    model = whisper.load_model("base")

    print(f"Transcribing {audio_path.name}...")
    result = model.transcribe(str(audio_path))
    transcribed = result["text"].strip()

    # Load original text
    with open(original_text_path, 'r', encoding='utf-8') as f:
        original = f.read().strip()

    # Simple word-level comparison
    orig_words = original.lower().split()
    trans_words = transcribed.lower().split()

    # Calculate simple accuracy
    matches = sum(1 for w in trans_words if w in orig_words)
    accuracy = matches / len(orig_words) * 100 if orig_words else 0

    print(f"\nOriginal text: {len(orig_words)} words")
    print(f"Transcribed: {len(trans_words)} words")
    print(f"Approximate word match: {accuracy:.1f}%")

    # Show first discrepancy
    print(f"\nFirst 200 chars of transcription:")
    print(f"  {transcribed[:200]}...")

    return {
        'accuracy': accuracy,
        'transcribed': transcribed,
        'original_words': len(orig_words),
        'transcribed_words': len(trans_words)
    }


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Analyze generated TTS audio quality")
    parser.add_argument("audio_file", nargs="?", help="Audio file to analyze")
    parser.add_argument("--chunks", action="store_true", help="Also analyze individual chunks")
    parser.add_argument("--transcribe", help="Original text file for transcription comparison")
    parser.add_argument("--lesson", type=int, help="Analyze lesson N")
    args = parser.parse_args()

    # Determine which file to analyze
    if args.lesson:
        from generate_all_lessons import LESSON_SCRIPT_MAP
        script_name = LESSON_SCRIPT_MAP.get(args.lesson)
        if not script_name:
            print(f"Unknown lesson number: {args.lesson}")
            return
        audio_path = BASE_DIR / "lessons" / f"{script_name}_Zonos_Full.wav"
        chunks_dir = BASE_DIR / "lessons" / f"lesson_{args.lesson:02d}_chunks"
        text_path = BASE_DIR / "lessons" / f"{script_name}_TTS_Script.txt"
    elif args.audio_file:
        audio_path = Path(args.audio_file)
        chunks_dir = None
        text_path = Path(args.transcribe) if args.transcribe else None
    else:
        # Default: analyze Lesson 2
        audio_path = BASE_DIR / "lessons" / "Survival_in_Jamestown_Zonos_Full.wav"
        chunks_dir = BASE_DIR / "lessons" / "lesson_02_chunks"
        text_path = BASE_DIR / "lessons" / "Survival_in_Jamestown_TTS_Script.txt"

    if not audio_path.exists():
        print(f"Audio file not found: {audio_path}")
        return

    # Main audio analysis
    results = analyze_full_audio(audio_path)

    # Chunk analysis if requested and available
    if args.chunks and chunks_dir and chunks_dir.exists():
        analyze_chunks(chunks_dir)

    # Transcription comparison if text provided
    if text_path and text_path.exists():
        transcribe_and_compare(audio_path, text_path)

    print(f"\n{'='*70}")
    print("RECOMMENDATIONS")
    print(f"{'='*70}")

    if results['score'] < 70:
        print("\n⚠️  Audio quality needs improvement. Consider:")
        if results['db_std'] > 2:
            print("  - Apply loudness normalization (target -16 LUFS)")
            print("  - Normalize each chunk before concatenation")
        if results['tempo_std'] > 20:
            print("  - Adjust speaking_rate parameter for consistency")
            print("  - Regenerate chunks with high tempo variation")
        if results['problems']:
            print(f"  - Regenerate problem segments: {[p[0] for p in results['problems']]}")
    else:
        print("\n✓ Audio quality is acceptable for production.")


if __name__ == "__main__":
    main()
