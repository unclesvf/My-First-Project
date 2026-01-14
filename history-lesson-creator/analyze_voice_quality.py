#!/usr/bin/env python3
"""
Analyze voice test audio files for quality metrics.
Metrics: RMS energy, spectral centroid, zero-crossing rate, duration, clarity.
"""

import sys
from pathlib import Path
import numpy as np

# Platform-aware paths
if sys.platform == "linux":
    BASE_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator")
else:
    BASE_DIR = Path(r"C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator")

VOICE_TESTS_DIR = BASE_DIR / "voice_tests"

def analyze_audio(file_path):
    """Analyze an audio file and return quality metrics."""
    import librosa

    # Load audio
    y, sr = librosa.load(file_path, sr=None)
    duration = len(y) / sr

    # RMS energy (loudness)
    rms = librosa.feature.rms(y=y)[0]
    rms_mean = np.mean(rms)
    rms_std = np.std(rms)

    # Spectral centroid (brightness/clarity)
    spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
    centroid_mean = np.mean(spectral_centroid)

    # Zero crossing rate (noisiness indicator)
    zcr = librosa.feature.zero_crossing_rate(y)[0]
    zcr_mean = np.mean(zcr)

    # Spectral bandwidth (richness)
    spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)[0]
    bandwidth_mean = np.mean(spectral_bandwidth)

    # Dynamic range
    db = librosa.amplitude_to_db(np.abs(y), ref=np.max)
    dynamic_range = np.percentile(db, 95) - np.percentile(db, 5)

    # Signal-to-noise estimate (based on quiet sections)
    frame_rms = librosa.feature.rms(y=y, frame_length=2048, hop_length=512)[0]
    noise_floor = np.percentile(frame_rms, 10)
    signal_peak = np.percentile(frame_rms, 90)
    snr_estimate = 20 * np.log10(signal_peak / max(noise_floor, 1e-10))

    return {
        'duration': duration,
        'sample_rate': sr,
        'rms_mean': rms_mean,
        'rms_std': rms_std,
        'spectral_centroid': centroid_mean,
        'zcr': zcr_mean,
        'bandwidth': bandwidth_mean,
        'dynamic_range': dynamic_range,
        'snr_estimate': snr_estimate
    }

def rate_quality(metrics):
    """Rate overall quality based on metrics."""
    score = 0
    issues = []

    # Duration check (should be reasonable length)
    if 5 <= metrics['duration'] <= 30:
        score += 20
    else:
        issues.append(f"Duration {metrics['duration']:.1f}s outside ideal 5-30s range")

    # RMS energy (should be audible but not clipping)
    if 0.05 <= metrics['rms_mean'] <= 0.3:
        score += 20
    elif metrics['rms_mean'] < 0.05:
        issues.append("Low volume")
        score += 10
    else:
        issues.append("Possibly too loud")
        score += 10

    # Spectral centroid (human speech typically 1000-4000 Hz)
    if 1000 <= metrics['spectral_centroid'] <= 4000:
        score += 20
    else:
        issues.append(f"Unusual spectral centroid: {metrics['spectral_centroid']:.0f}Hz")
        score += 10

    # Dynamic range (good speech has some variation)
    if metrics['dynamic_range'] >= 20:
        score += 20
    else:
        issues.append(f"Low dynamic range: {metrics['dynamic_range']:.1f}dB")
        score += 10

    # SNR estimate (higher is better)
    if metrics['snr_estimate'] >= 20:
        score += 20
    elif metrics['snr_estimate'] >= 10:
        issues.append(f"Moderate SNR: {metrics['snr_estimate']:.1f}dB")
        score += 10
    else:
        issues.append(f"Low SNR: {metrics['snr_estimate']:.1f}dB")

    return score, issues

def main():
    print("=" * 70)
    print("VOICE TEST AUDIO QUALITY ANALYSIS")
    print("=" * 70)

    # Find all test files
    test_files = sorted(VOICE_TESTS_DIR.glob("test_simple_*.wav"))

    if not test_files:
        print(f"No test files found in {VOICE_TESTS_DIR}")
        return

    print(f"\nAnalyzing {len(test_files)} voice test files...\n")

    results = []

    for file_path in test_files:
        voice_name = file_path.stem.replace("test_simple_", "")
        print(f"Analyzing: {voice_name}")

        try:
            metrics = analyze_audio(file_path)
            score, issues = rate_quality(metrics)
            results.append((voice_name, metrics, score, issues))
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append((voice_name, None, 0, [str(e)]))

    # Print summary table
    print("\n" + "=" * 70)
    print("QUALITY SUMMARY")
    print("=" * 70)
    print(f"{'Voice':<30} {'Duration':>8} {'RMS':>8} {'Centroid':>10} {'SNR':>8} {'Score':>8}")
    print("-" * 70)

    for voice_name, metrics, score, issues in results:
        if metrics:
            print(f"{voice_name:<30} {metrics['duration']:>7.1f}s {metrics['rms_mean']:>8.3f} "
                  f"{metrics['spectral_centroid']:>9.0f}Hz {metrics['snr_estimate']:>7.1f}dB {score:>7}/100")
        else:
            print(f"{voice_name:<30} {'ERROR':>8}")

    # Print detailed results
    print("\n" + "=" * 70)
    print("DETAILED ANALYSIS")
    print("=" * 70)

    for voice_name, metrics, score, issues in results:
        print(f"\n{voice_name}:")
        if metrics:
            print(f"  Quality Score: {score}/100")
            if issues:
                print(f"  Issues: {', '.join(issues)}")
            else:
                print("  Issues: None - Excellent quality!")
            print(f"  Duration: {metrics['duration']:.2f}s")
            print(f"  Sample Rate: {metrics['sample_rate']}Hz")
            print(f"  RMS Energy: {metrics['rms_mean']:.4f} (std: {metrics['rms_std']:.4f})")
            print(f"  Spectral Centroid: {metrics['spectral_centroid']:.1f}Hz")
            print(f"  Spectral Bandwidth: {metrics['bandwidth']:.1f}Hz")
            print(f"  Zero Crossing Rate: {metrics['zcr']:.4f}")
            print(f"  Dynamic Range: {metrics['dynamic_range']:.1f}dB")
            print(f"  SNR Estimate: {metrics['snr_estimate']:.1f}dB")

    # Overall recommendation
    print("\n" + "=" * 70)
    print("RECOMMENDATION")
    print("=" * 70)

    avg_score = sum(r[2] for r in results) / len(results) if results else 0
    good_voices = [r[0] for r in results if r[2] >= 80]
    moderate_voices = [r[0] for r in results if 60 <= r[2] < 80]
    poor_voices = [r[0] for r in results if r[2] < 60]

    print(f"\nAverage Quality Score: {avg_score:.0f}/100")

    if good_voices:
        print(f"\nExcellent voices ({len(good_voices)}): {', '.join(good_voices)}")
    if moderate_voices:
        print(f"Moderate voices ({len(moderate_voices)}): {', '.join(moderate_voices)}")
    if poor_voices:
        print(f"Needs improvement ({len(poor_voices)}): {', '.join(poor_voices)}")

    if avg_score >= 70:
        print("\n>>> READY FOR BATCH GENERATION <<<")
    else:
        print("\n>>> CONSIDER IMPROVING VOICE REFERENCES BEFORE BATCH GENERATION <<<")

if __name__ == "__main__":
    main()
