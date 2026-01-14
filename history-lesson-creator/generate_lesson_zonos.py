"""
Generate full history lesson audio with Zonos TTS
Includes emotion controls for expressive narration
"""
import os
# Set espeak-ng path for Windows
os.environ["PHONEMIZER_ESPEAK_LIBRARY"] = r"C:\Program Files\eSpeak NG\libespeak-ng.dll"
os.environ["PHONEMIZER_ESPEAK_PATH"] = r"C:\Program Files\eSpeak NG\espeak-ng.exe"

import torch
# Disable torch.compile to avoid needing MSVC compiler
torch._dynamo.config.suppress_errors = True

import torchaudio
from pathlib import Path

print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")

from zonos.model import Zonos
from zonos.conditioning import make_cond_dict
from zonos.utils import DEFAULT_DEVICE as device

print(f"Using device: {device}")

# Load model
print("Loading Zonos model...")
model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device=device)
print("Model loaded!")

# Read the lesson script
script_path = Path("lessons/One_World_to_the_Next_TTS_Script.txt")
with open(script_path, "r", encoding="utf-8") as f:
    lesson_text = f.read()

print(f"Lesson text length: {len(lesson_text)} characters")

# Create conditioning with emotion controls for engaging narration
# Emotion vector: [Happiness, Sadness, Disgust, Fear, Surprise, Anger, Other, Neutral]
# For a historical narrative by a young boy, we want engaging but thoughtful
cond_dict = make_cond_dict(
    text=lesson_text,
    language="en-us",
    # Emotion: warm storytelling with touch of wonder and reflection
    # [Happiness, Sadness, Disgust, Fear, Surprise, Anger, Other, Neutral]
    emotion=[0.35, 0.15, 0.0, 0.05, 0.15, 0.0, 0.1, 0.2],
    # Pitch variation: 60-80 for moderately expressive speech
    pitch_std=70.0,
    # Speaking rate: 15 is moderate pace, good for educational content
    speaking_rate=14.0,
)

print("Preparing conditioning...")
conditioning = model.prepare_conditioning(cond_dict)

print("Generating speech (this may take a few minutes)...")
codes = model.generate(conditioning)

print("Decoding audio...")
wavs = model.autoencoder.decode(codes).cpu()

output_path = Path("lessons/One_World_to_the_Next_Zonos.wav")
torchaudio.save(str(output_path), wavs[0], model.autoencoder.sampling_rate)

print(f"\nSaved to: {output_path}")
print(f"Sample rate: {model.autoencoder.sampling_rate} Hz")
print(f"Duration: {wavs[0].shape[1] / model.autoencoder.sampling_rate:.1f} seconds")
