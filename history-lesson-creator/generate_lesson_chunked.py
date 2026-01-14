"""
Generate full history lesson audio with Zonos TTS in WSL2
Chunked approach with consistent speaker embedding from reference audio
"""
import os
import re
import torch
import torchaudio
from pathlib import Path

print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")

from zonos.model import Zonos
from zonos.conditioning import make_cond_dict
from zonos.utils import DEFAULT_DEVICE as device

print(f"Using device: {device}")

# Load model
print("Loading Zonos model...")
model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device=device)
print("Model loaded!")

# Load reference audio for speaker embedding (the good male voice from test)
print("\n=== Extracting speaker embedding from reference audio ===")
ref_audio_path = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/lessons/zonos_test.wav")
ref_wav, ref_sr = torchaudio.load(str(ref_audio_path))
print(f"Reference audio: {ref_audio_path.name}")
print(f"Duration: {ref_wav.shape[1] / ref_sr:.1f} seconds, Sample rate: {ref_sr} Hz")

# Extract speaker embedding
speaker_embedding = model.make_speaker_embedding(ref_wav, ref_sr)
print(f"Speaker embedding shape: {speaker_embedding.shape}")
print("Speaker embedding extracted successfully!")

# Read the lesson script
script_path = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/lessons/One_World_to_the_Next_TTS_Script.txt")
with open(script_path, "r", encoding="utf-8") as f:
    lesson_text = f.read()

print(f"\nTotal lesson text length: {len(lesson_text)} characters")

def trim_silence(wav, sample_rate, min_silence_ms=100):
    """
    Trim silence from the beginning and end of audio.
    Uses relative threshold based on audio's own peak level.

    Args:
        wav: Audio tensor [1, samples]
        sample_rate: Sample rate in Hz
        min_silence_ms: Minimum silence duration in ms to detect

    Returns:
        Trimmed audio tensor
    """
    audio = wav[0].abs()

    # Use 1% of max amplitude as threshold (relative to audio's own level)
    peak = audio.max()
    if peak < 1e-6:  # Audio is essentially silent
        return wav

    threshold = peak * 0.01  # 1% of peak

    min_samples = int(sample_rate * min_silence_ms / 1000)

    # Find start (first non-silent sample)
    start_idx = 0
    for i in range(0, len(audio) - min_samples, min_samples):
        if audio[i:i+min_samples].max() > threshold:
            start_idx = max(0, i - int(sample_rate * 0.05))  # Keep 50ms buffer
            break

    # Find end (last non-silent sample)
    end_idx = len(audio)
    for i in range(len(audio) - min_samples, min_samples, -min_samples):
        if audio[i-min_samples:i].max() > threshold:
            end_idx = min(len(audio), i + int(sample_rate * 0.05))  # Keep 50ms buffer
            break

    # Ensure we don't trim everything
    if end_idx <= start_idx:
        return wav

    return wav[:, start_idx:end_idx]

def split_into_chunks(text, max_chars=250):
    """
    Split text into chunks suitable for Zonos generation.
    Zonos has a 30-second max, so we need ~250 chars per chunk to stay under limit.
    Splits on sentence boundaries to maintain natural flow.
    IMPORTANT: Chapter titles are always kept as separate chunks for proper pacing.
    """
    chunks = []

    # First split by double newlines (paragraphs)
    paragraphs = re.split(r'\n\n+', text.strip())

    current_chunk = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # IMPORTANT: Chapter titles should always be their own chunk
        is_chapter = para.startswith('Chapter ')

        if is_chapter:
            # Save current chunk if any
            if current_chunk:
                chunks.append(current_chunk.strip())
            # Add chapter title as its own chunk
            chunks.append(para)
            current_chunk = ""
            continue

        # If adding this paragraph keeps us under limit, add it
        if len(current_chunk) + len(para) + 2 <= max_chars:
            if current_chunk:
                current_chunk += "\n\n" + para
            else:
                current_chunk = para
        else:
            # Current chunk is full, save it
            if current_chunk:
                chunks.append(current_chunk.strip())

            # If paragraph itself is too long, split by sentences
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

    # Don't forget the last chunk
    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks

# Split lesson into chunks (250 chars = ~20 seconds of speech, under 30s limit)
chunks = split_into_chunks(lesson_text, max_chars=250)
print(f"Split lesson into {len(chunks)} chunks")

for i, chunk in enumerate(chunks):
    print(f"  Chunk {i+1}: {len(chunk)} chars, starts with: {chunk[:50]}...")

# Output directory for chunk files
output_dir = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/lessons/chunks")
output_dir.mkdir(exist_ok=True)

# Generate audio for each chunk
all_wavs = []
sample_rate = None

for i, chunk in enumerate(chunks):
    print(f"\n=== Generating chunk {i+1}/{len(chunks)} ===")
    print(f"Text: {chunk[:80]}...")

    # Create conditioning with speaker embedding and emotion controls
    cond_dict = make_cond_dict(
        text=chunk,
        language="en-us",
        speaker=speaker_embedding,  # Use the consistent male voice
        # Emotion: warm storytelling with touch of wonder and reflection
        emotion=[0.35, 0.15, 0.0, 0.05, 0.15, 0.0, 0.1, 0.2],
        pitch_std=70.0,
        speaking_rate=14.0,
    )

    conditioning = model.prepare_conditioning(cond_dict)
    codes = model.generate(conditioning)
    wav = model.autoencoder.decode(codes).cpu()

    sample_rate = model.autoencoder.sampling_rate
    duration = wav[0].shape[1] / sample_rate
    print(f"Chunk {i+1} duration: {duration:.1f}s")

    # Save individual chunk
    chunk_path = output_dir / f"chunk_{i+1:02d}.wav"
    torchaudio.save(str(chunk_path), wav[0], sample_rate)
    print(f"Saved: {chunk_path}")

    all_wavs.append(wav[0])

# Concatenate all chunks using ffmpeg (more reliable than torch.cat)
print("\n=== Concatenating all chunks with ffmpeg ===")

import subprocess

# Create a file list for ffmpeg
file_list_path = output_dir / "filelist.txt"
with open(file_list_path, "w") as f:
    for i in range(len(chunks)):
        chunk_path = output_dir / f"chunk_{i+1:02d}.wav"
        f.write(f"file '{chunk_path}'\n")

output_path = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/lessons/One_World_to_the_Next_Zonos_Full.wav")

# Use ffmpeg to concatenate
cmd = [
    "ffmpeg", "-y",  # Overwrite output
    "-f", "concat",
    "-safe", "0",
    "-i", str(file_list_path),
    "-c", "copy",  # No re-encoding
    str(output_path)
]

print(f"Running: {' '.join(cmd)}")
result = subprocess.run(cmd, capture_output=True, text=True)

if result.returncode != 0:
    print(f"ffmpeg error: {result.stderr}")
else:
    print("Concatenation successful!")

# Get duration of final file
import wave
with wave.open(str(output_path), 'rb') as wf:
    frames = wf.getnframes()
    rate = wf.getframerate()
    total_duration = frames / rate

print(f"\n=== GENERATION COMPLETE ===")
print(f"Saved to: {output_path}")
print(f"Sample rate: {sample_rate} Hz")
print(f"Total duration: {total_duration:.1f} seconds ({total_duration/60:.1f} minutes)")
print(f"Number of chunks: {len(chunks)}")
