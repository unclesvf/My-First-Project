#!/usr/bin/env python3
"""
Quality-Gated Lesson Audio Generator

Features:
- Sentence-based chunking (not arbitrary character splits)
- Whisper transcription verification for each chunk
- Word Error Rate (WER) calculation with regeneration on failure
- High-pass filtering to remove hums (below 80Hz)
- Silence trimming with standardized pause insertion
- Comprehensive quality logging
"""

import os
import re
import sys
import json
import torch
import torchaudio
import numpy as np
from pathlib import Path
from datetime import datetime
import difflib

# Platform-aware paths
if sys.platform == "linux":
    BASE_DIR = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator")
else:
    BASE_DIR = Path(r"C:\Users\scott\My-First-Project\My-First-Project\history-lesson-creator")

sys.path.insert(0, str(BASE_DIR))
from generate_all_lessons import LESSON_SCRIPT_MAP, LESSON_VOICE_MAP

# Quality thresholds
CONFIG = {
    'max_wer': 0.15,                # Maximum Word Error Rate (15%)
    'max_regeneration_attempts': 3,  # Tries before accepting chunk
    'target_lufs': -16.0,           # Target loudness
    'pause_between_sentences': 0.4,  # 400ms between sentences
    'pause_after_chapter': 0.8,      # 800ms after chapter titles
    'highpass_freq': 80,            # High-pass filter cutoff (Hz)
    'silence_threshold': 0.01,      # RMS threshold for silence detection
    'min_trailing_silence': 0.1,    # Minimum silence to keep at end
    'max_trailing_silence': 0.3,    # Maximum silence at end of chunk
}


def calculate_wer(reference: str, hypothesis: str) -> float:
    """Calculate Word Error Rate between reference and hypothesis."""
    # Normalize text
    ref_words = reference.lower().split()
    hyp_words = hypothesis.lower().split()

    # Remove punctuation for comparison
    import string
    ref_words = [w.strip(string.punctuation) for w in ref_words if w.strip(string.punctuation)]
    hyp_words = [w.strip(string.punctuation) for w in hyp_words if w.strip(string.punctuation)]

    if not ref_words:
        return 0.0 if not hyp_words else 1.0

    # Use dynamic programming for edit distance
    d = np.zeros((len(ref_words) + 1, len(hyp_words) + 1))

    for i in range(len(ref_words) + 1):
        d[i, 0] = i
    for j in range(len(hyp_words) + 1):
        d[0, j] = j

    for i in range(1, len(ref_words) + 1):
        for j in range(1, len(hyp_words) + 1):
            if ref_words[i-1] == hyp_words[j-1]:
                d[i, j] = d[i-1, j-1]
            else:
                d[i, j] = min(
                    d[i-1, j] + 1,      # Deletion
                    d[i, j-1] + 1,      # Insertion
                    d[i-1, j-1] + 1     # Substitution
                )

    wer = d[len(ref_words), len(hyp_words)] / len(ref_words)
    return wer


def find_missing_words(reference: str, hypothesis: str) -> list:
    """Find words in reference that are missing from hypothesis."""
    import string
    ref_words = [w.strip(string.punctuation).lower() for w in reference.split() if w.strip(string.punctuation)]
    hyp_words = [w.strip(string.punctuation).lower() for w in hypothesis.split() if w.strip(string.punctuation)]

    hyp_set = set(hyp_words)
    missing = [w for w in ref_words if w not in hyp_set]
    return missing


def apply_highpass_filter(audio: np.ndarray, sr: int, cutoff: int = 80) -> np.ndarray:
    """Apply high-pass filter to remove low-frequency hums."""
    from scipy.signal import butter, filtfilt

    nyquist = sr / 2
    normalized_cutoff = cutoff / nyquist

    # Design Butterworth high-pass filter
    b, a = butter(4, normalized_cutoff, btype='high')

    # Apply filter
    filtered = filtfilt(b, a, audio)
    return filtered


def trim_silence(audio: np.ndarray, sr: int, threshold: float = 0.01,
                 min_silence: float = 0.1, max_silence: float = 0.3) -> np.ndarray:
    """Trim trailing silence, keeping between min and max seconds."""
    # Calculate RMS in small windows
    window_size = int(sr * 0.02)  # 20ms windows

    # Find where audio ends (last non-silent sample)
    for i in range(len(audio) - window_size, 0, -window_size):
        window_rms = np.sqrt(np.mean(audio[i:i+window_size]**2))
        if window_rms > threshold:
            last_audio_sample = i + window_size
            break
    else:
        last_audio_sample = len(audio)

    # Calculate desired end point
    min_samples = int(min_silence * sr)
    max_samples = int(max_silence * sr)

    current_silence = len(audio) - last_audio_sample

    if current_silence < min_samples:
        # Need to add silence
        padding = np.zeros(min_samples - current_silence)
        return np.concatenate([audio, padding])
    elif current_silence > max_samples:
        # Trim excess silence
        return audio[:last_audio_sample + max_samples]
    else:
        return audio


def normalize_audio(audio: np.ndarray, target_db: float = -16.0) -> np.ndarray:
    """Normalize audio to target dB level."""
    rms = np.sqrt(np.mean(audio**2))
    if rms < 1e-10:
        return audio

    current_db = 20 * np.log10(rms)
    gain_db = target_db - current_db
    gain_linear = 10 ** (gain_db / 20)

    normalized = audio * gain_linear

    # Soft clip to prevent distortion
    normalized = np.tanh(normalized / 0.95) * 0.95

    return normalized


def split_into_sentences(text: str) -> list:
    """Split text into sentences, keeping chapter titles as single items."""
    chunks = []

    # Split by paragraphs first
    paragraphs = re.split(r'\n\n+', text.strip())

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # Chapter titles stay as single chunks
        if para.startswith('Chapter '):
            chunks.append({'text': para, 'type': 'chapter'})
            continue

        # Split paragraph into sentences
        # Handle common abbreviations
        para_clean = para.replace('Mr.', 'Mr@').replace('Mrs.', 'Mrs@').replace('Dr.', 'Dr@')
        para_clean = para_clean.replace('St.', 'St@').replace('vs.', 'vs@')

        sentences = re.split(r'(?<=[.!?])\s+', para_clean)

        for sent in sentences:
            # Restore abbreviations
            sent = sent.replace('Mr@', 'Mr.').replace('Mrs@', 'Mrs.').replace('Dr@', 'Dr.')
            sent = sent.replace('St@', 'St.').replace('vs@', 'vs.')
            sent = sent.strip()
            if sent:
                chunks.append({'text': sent, 'type': 'sentence'})

    return chunks


def group_sentences(sentences: list, max_chars: int = 300, max_sentences: int = 3) -> list:
    """Group sentences into chunks for generation."""
    chunks = []
    current_group = []
    current_chars = 0

    for item in sentences:
        if item['type'] == 'chapter':
            # Save current group if any
            if current_group:
                chunks.append({
                    'text': ' '.join([s['text'] for s in current_group]),
                    'type': 'sentences',
                    'sentence_count': len(current_group)
                })
                current_group = []
                current_chars = 0
            # Add chapter as its own chunk
            chunks.append(item)
            continue

        sent_len = len(item['text'])

        # Check if adding this sentence would exceed limits
        if (current_chars + sent_len > max_chars or len(current_group) >= max_sentences) and current_group:
            # Save current group
            chunks.append({
                'text': ' '.join([s['text'] for s in current_group]),
                'type': 'sentences',
                'sentence_count': len(current_group)
            })
            current_group = []
            current_chars = 0

        current_group.append(item)
        current_chars += sent_len + 1  # +1 for space

    # Don't forget the last group
    if current_group:
        chunks.append({
            'text': ' '.join([s['text'] for s in current_group]),
            'type': 'sentences',
            'sentence_count': len(current_group)
        })

    return chunks


class WhisperVerifier:
    """Handles Whisper transcription and verification."""

    def __init__(self, model_size: str = "base"):
        import whisper
        print(f"Loading Whisper model ({model_size})...")
        self.model = whisper.load_model(model_size)
        print("Whisper loaded!")

    def transcribe(self, audio: np.ndarray, sr: int) -> str:
        """Transcribe audio to text."""
        # Whisper expects 16kHz audio
        if sr != 16000:
            import librosa
            audio_16k = librosa.resample(audio.astype(np.float32), orig_sr=sr, target_sr=16000)
        else:
            audio_16k = audio.astype(np.float32)

        result = self.model.transcribe(audio_16k, language="en")
        return result["text"].strip()

    def verify(self, audio: np.ndarray, sr: int, expected_text: str) -> dict:
        """Verify audio matches expected text."""
        transcription = self.transcribe(audio, sr)
        wer = calculate_wer(expected_text, transcription)
        missing = find_missing_words(expected_text, transcription)

        return {
            'transcription': transcription,
            'wer': wer,
            'missing_words': missing,
            'passed': wer <= CONFIG['max_wer']
        }


class QualityGatedGenerator:
    """Main generator class with quality controls."""

    def __init__(self, lesson_num: int):
        self.lesson_num = lesson_num
        self.script_name = LESSON_SCRIPT_MAP.get(lesson_num)
        self.voice_name = LESSON_VOICE_MAP.get(lesson_num)

        if not self.script_name or not self.voice_name:
            raise ValueError(f"No mapping for lesson {lesson_num}")

        self.script_path = BASE_DIR / "lessons" / f"{self.script_name}_TTS_Script.txt"
        self.voice_path = BASE_DIR / "voice_references" / "selected" / f"{self.voice_name}.wav"
        self.output_dir = BASE_DIR / "lessons"
        self.chunks_dir = self.output_dir / f"lesson_{lesson_num:02d}_verified"

        self.model = None
        self.speaker_embedding = None
        self.sample_rate = None
        self.whisper = None
        self.quality_log = []

    def setup(self):
        """Initialize models and load references."""
        print(f"\n{'='*70}")
        print(f"QUALITY-GATED GENERATOR: LESSON {self.lesson_num}")
        print(f"{'='*70}")
        print(f"Script: {self.script_name}")
        print(f"Voice: {self.voice_name}")

        # Load Zonos
        print("\nLoading Zonos model...")
        from zonos.model import Zonos
        self.model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device="cuda")
        self.sample_rate = self.model.autoencoder.sampling_rate
        print(f"Zonos loaded! Sample rate: {self.sample_rate}")

        # Load voice reference
        ref_wav, ref_sr = torchaudio.load(str(self.voice_path))
        self.speaker_embedding = self.model.make_speaker_embedding(ref_wav, ref_sr)
        print(f"Voice reference loaded: {ref_wav.shape[1]/ref_sr:.1f}s")

        # Load Whisper
        self.whisper = WhisperVerifier("base")

        # Create output directory
        self.chunks_dir.mkdir(exist_ok=True)

    def generate_chunk(self, text: str, attempt: int = 0) -> np.ndarray:
        """Generate audio for a single chunk."""
        from zonos.conditioning import make_cond_dict

        # Slight variation on retries
        rate_adjust = 0.3 * attempt  # Slow down slightly on retries

        cond_dict = make_cond_dict(
            text=text,
            language="en-us",
            speaker=self.speaker_embedding,
            emotion=[0.35, 0.15, 0.0, 0.05, 0.15, 0.0, 0.1, 0.2],
            pitch_std=70.0,
            speaking_rate=13.5 - rate_adjust,  # Slightly slower for clarity
        )

        conditioning = self.model.prepare_conditioning(cond_dict)
        codes = self.model.generate(conditioning)
        wav = self.model.autoencoder.decode(codes).cpu()

        return wav[0].numpy().flatten()

    def process_chunk(self, chunk: dict, chunk_idx: int) -> dict:
        """Generate and verify a single chunk with retries."""
        text = chunk['text']
        chunk_type = chunk['type']

        print(f"\nChunk {chunk_idx + 1}: {text[:60]}...")

        best_audio = None
        best_result = None
        best_wer = float('inf')

        for attempt in range(CONFIG['max_regeneration_attempts']):
            # Generate audio
            audio = self.generate_chunk(text, attempt)

            # Apply high-pass filter to remove hums
            audio = apply_highpass_filter(audio, self.sample_rate, CONFIG['highpass_freq'])

            # Verify with Whisper
            result = self.whisper.verify(audio, self.sample_rate, text)

            print(f"  Attempt {attempt + 1}: WER={result['wer']:.1%}", end="")

            if result['wer'] < best_wer:
                best_wer = result['wer']
                best_audio = audio
                best_result = result

            if result['passed']:
                print(" ✓")
                break
            else:
                print(f" ✗ Missing: {result['missing_words'][:5]}")

        if not best_result['passed']:
            print(f"  ⚠ Accepting best attempt (WER={best_wer:.1%})")

        # Trim and normalize
        processed_audio = trim_silence(
            best_audio, self.sample_rate,
            threshold=CONFIG['silence_threshold'],
            min_silence=CONFIG['min_trailing_silence'],
            max_silence=CONFIG['max_trailing_silence']
        )
        processed_audio = normalize_audio(processed_audio, CONFIG['target_lufs'])

        # Determine pause to add after this chunk
        if chunk_type == 'chapter':
            pause_duration = CONFIG['pause_after_chapter']
        else:
            pause_duration = CONFIG['pause_between_sentences']

        # Save chunk
        chunk_path = self.chunks_dir / f"chunk_{chunk_idx + 1:03d}.wav"
        audio_tensor = torch.from_numpy(processed_audio).unsqueeze(0).float()
        torchaudio.save(str(chunk_path), audio_tensor, self.sample_rate)

        # Log quality info
        log_entry = {
            'chunk': chunk_idx + 1,
            'text': text,
            'type': chunk_type,
            'duration': float(len(processed_audio) / self.sample_rate),
            'wer': float(best_result['wer']),
            'passed': bool(best_result['passed']),
            'transcription': best_result['transcription'],
            'missing_words': best_result['missing_words'],
            'attempts': attempt + 1,
            'pause_after': float(pause_duration)
        }
        self.quality_log.append(log_entry)

        return {
            'path': chunk_path,
            'audio': processed_audio,
            'pause_after': pause_duration,
            'log': log_entry
        }

    def concatenate(self, chunks: list) -> np.ndarray:
        """Concatenate all chunks with appropriate pauses."""
        print(f"\n{'='*70}")
        print("CONCATENATING")
        print(f"{'='*70}")

        segments = []

        for i, chunk in enumerate(chunks):
            # Add the audio
            segments.append(chunk['audio'])

            # Add pause (except after last chunk)
            if i < len(chunks) - 1:
                pause_samples = int(chunk['pause_after'] * self.sample_rate)
                pause = np.zeros(pause_samples)
                segments.append(pause)

        full_audio = np.concatenate(segments)
        print(f"Total duration: {len(full_audio)/self.sample_rate:.1f}s")

        return full_audio

    def generate(self):
        """Main generation method."""
        self.setup()

        # Read and parse script
        with open(self.script_path, 'r', encoding='utf-8') as f:
            script_text = f.read()

        # Split into sentences and group
        sentences = split_into_sentences(script_text)
        chunks = group_sentences(sentences, max_chars=300, max_sentences=2)

        print(f"\nScript: {len(script_text)} chars")
        print(f"Sentences: {len(sentences)}")
        print(f"Chunks: {len(chunks)}")

        # Process each chunk
        print(f"\n{'='*70}")
        print("GENERATING AND VERIFYING CHUNKS")
        print(f"{'='*70}")

        processed_chunks = []
        for i, chunk in enumerate(chunks):
            result = self.process_chunk(chunk, i)
            processed_chunks.append(result)

        # Concatenate
        full_audio = self.concatenate(processed_chunks)

        # Final normalization
        full_audio = normalize_audio(full_audio, CONFIG['target_lufs'])
        full_audio = np.clip(full_audio, -0.99, 0.99)

        # Save output
        output_path = self.output_dir / f"{self.script_name}_Zonos_Verified.wav"
        audio_tensor = torch.from_numpy(full_audio).unsqueeze(0).float()
        torchaudio.save(str(output_path), audio_tensor, self.sample_rate)

        # Save quality log
        log_path = self.chunks_dir / "quality_log.json"
        with open(log_path, 'w', encoding='utf-8') as f:
            json.dump(self.quality_log, f, indent=2)

        # Print summary
        print(f"\n{'='*70}")
        print("GENERATION COMPLETE")
        print(f"{'='*70}")
        print(f"Output: {output_path.name}")
        print(f"Duration: {len(full_audio)/self.sample_rate:.1f}s ({len(full_audio)/self.sample_rate/60:.1f} min)")

        # Quality summary
        total_chunks = len(self.quality_log)
        passed_chunks = sum(1 for c in self.quality_log if c['passed'])
        avg_wer = np.mean([c['wer'] for c in self.quality_log])

        print(f"\nQuality Summary:")
        print(f"  Chunks passed verification: {passed_chunks}/{total_chunks} ({100*passed_chunks/total_chunks:.0f}%)")
        print(f"  Average WER: {avg_wer:.1%}")

        failed_chunks = [c for c in self.quality_log if not c['passed']]
        if failed_chunks:
            print(f"\n  Chunks needing attention:")
            for c in failed_chunks[:5]:
                print(f"    Chunk {c['chunk']}: WER={c['wer']:.1%}, missing: {c['missing_words'][:3]}")

        return output_path


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Quality-gated lesson generation")
    parser.add_argument("--lesson", type=int, required=True, help="Lesson number")
    args = parser.parse_args()

    print(f"CUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"GPU: {torch.cuda.get_device_name(0)}")

    generator = QualityGatedGenerator(args.lesson)
    output_path = generator.generate()

    print(f"\n✓ Output saved to: {output_path}")


if __name__ == "__main__":
    main()
