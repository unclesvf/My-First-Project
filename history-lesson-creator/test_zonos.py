"""
Test script for Zonos TTS with history lesson
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

# Check CUDA availability
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")

# Import Zonos
from zonos.model import Zonos
from zonos.conditioning import make_cond_dict
from zonos.utils import DEFAULT_DEVICE as device

print(f"Using device: {device}")

# Load model (will download from HuggingFace on first run)
print("Loading Zonos model...")
model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device=device)
print("Model loaded!")

# Test with a short sample first
test_text = """Welcome to today's history lesson. One World to the Next.
You will hear this story from Mateo, a thirteen year old Spanish settler."""

print(f"Generating audio for: {test_text[:50]}...")

# Create conditioning without speaker embedding (uses default voice)
cond_dict = make_cond_dict(
    text=test_text,
    language="en-us",
)
conditioning = model.prepare_conditioning(cond_dict)

# Generate audio
print("Generating speech...")
codes = model.generate(conditioning)

# Decode and save
wavs = model.autoencoder.decode(codes).cpu()
output_path = Path("lessons/zonos_test.wav")
torchaudio.save(str(output_path), wavs[0], model.autoencoder.sampling_rate)
print(f"Saved to: {output_path}")
print(f"Sample rate: {model.autoencoder.sampling_rate} Hz")
