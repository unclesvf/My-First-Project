#!/bin/bash
# Setup Zonos TTS in WSL2 with Triton support

set -e

echo "=== Installing system dependencies ==="
sudo apt update
sudo apt install -y python3-pip python3-venv espeak-ng git

echo "=== Creating virtual environment ==="
cd /mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator
python3 -m venv venv_zonos
source venv_zonos/bin/activate

echo "=== Installing PyTorch with CUDA ==="
pip install --upgrade pip
pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu124

echo "=== Installing Triton ==="
pip install triton

echo "=== Installing Zonos ==="
cd Zonos
pip install -e .

echo "=== Setup complete! ==="
python -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA: {torch.cuda.is_available()}'); print(f'GPU: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else \"N/A\"}')"
