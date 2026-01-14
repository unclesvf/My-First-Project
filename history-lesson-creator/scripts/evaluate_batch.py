#!/usr/bin/env python3
"""
Evaluate Batch Images

Runs VLM evaluation on a batch of generated images.
Resumes from a previous batch session that completed image generation.

Usage:
    python scripts/evaluate_batch.py --session batch_session_20260113_150301
"""

import argparse
import json
import shutil
import sys
import time
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).parent))
from historical_image_gen_loop import (
    evaluate_image,
    check_ollama_available,
    FIRST_PASS_MODEL,
    SECOND_PASS_MODEL,
    DEFAULT_THRESHOLD,
    OUTPUT_DIR,
    OLLAMA_URL,
)

def unload_ollama_model(model: str):
    """Unload a model from Ollama."""
    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={"model": model, "keep_alive": 0},
            timeout=30
        )
        if response.status_code == 200:
            print(f"  Unloaded: {model}")
    except Exception as e:
        print(f"  Warning: Could not unload {model}: {e}")


def stop_comfyui():
    """Stop ComfyUI if running."""
    import subprocess
    import os
    try:
        if os.name == 'nt':
            subprocess.run(
                ["powershell", "-Command", "Stop-Process -Name python -Force -ErrorAction SilentlyContinue"],
                capture_output=True, timeout=30
            )
        print("  Stopped ComfyUI processes")
    except:
        pass


def main():
    parser = argparse.ArgumentParser(description="Evaluate batch images with VLM")
    parser.add_argument("--session", required=True, help="Session folder name")
    parser.add_argument("--threshold", type=int, default=DEFAULT_THRESHOLD, help="Score threshold")
    args = parser.parse_args()

    session_dir = OUTPUT_DIR / args.session
    if not session_dir.exists():
        print(f"ERROR: Session directory not found: {session_dir}")
        sys.exit(1)

    # Load prompts data
    prompts_file = session_dir / "all_prompts.json"
    if not prompts_file.exists():
        print(f"ERROR: Prompts file not found: {prompts_file}")
        sys.exit(1)

    with open(prompts_file, 'r') as f:
        prompts = json.load(f)

    print(f"Loaded {len(prompts)} prompt entries from {prompts_file}")

    # Stop ComfyUI to free GPU
    print("\n[GPU Management] Stopping ComfyUI...")
    stop_comfyui()
    time.sleep(3)

    # Phase 3: First-pass evaluation
    print("\n" + "=" * 60)
    print("PHASE 3: FIRST-PASS VLM EVALUATION")
    print(f"Model: {FIRST_PASS_MODEL}")
    print("=" * 60 + "\n")

    passed = 0
    failed = 0
    total = len(prompts)

    for i, (key, data) in enumerate(prompts.items(), 1):
        # Find image file
        lesson_num = data["lesson_num"]
        chapter_idx = data["chapter_idx"]
        image_path = session_dir / f"lesson_{lesson_num:02d}_chapter_{chapter_idx + 1}_v1.png"

        if not image_path.exists():
            print(f"[{i}/{total}] {key}: Image not found, skipping")
            data["status"] = "missing"
            continue

        era = data.get("era", "historical")
        print(f"[{i}/{total}] {key}...", end=" ", flush=True)

        result = evaluate_image(str(image_path), FIRST_PASS_MODEL, era)
        score = result.get("score", 0)

        data["first_pass_score"] = score
        data["first_pass_feedback"] = result.get("justification", "")
        data["image_path"] = str(image_path)

        if score >= args.threshold:
            data["status"] = "first_pass_passed"
            passed += 1
            print(f"PASSED ({score})")
        else:
            data["status"] = "first_pass_failed"
            failed += 1
            print(f"FAILED ({score})")

    print(f"\nFirst-pass results: {passed} passed, {failed} failed")

    # Unload first-pass model
    print("\nUnloading first-pass model...")
    unload_ollama_model(FIRST_PASS_MODEL)
    time.sleep(3)

    # Phase 4: Second-pass evaluation
    print("\n" + "=" * 60)
    print("PHASE 4: SECOND-PASS VLM EVALUATION")
    print(f"Model: {SECOND_PASS_MODEL}")
    print("=" * 60 + "\n")

    keepers_dir = session_dir / "keepers"
    keepers_dir.mkdir(exist_ok=True)
    fails_dir = session_dir / "fails"
    fails_dir.mkdir(exist_ok=True)

    first_pass_winners = [(k, v) for k, v in prompts.items() if v.get("status") == "first_pass_passed"]
    total = len(first_pass_winners)

    accepted = 0
    rejected = 0

    for i, (key, data) in enumerate(first_pass_winners, 1):
        image_path = data["image_path"]
        era = data.get("era", "historical")
        first_score = data["first_pass_score"]

        print(f"[{i}/{total}] {key}...", end=" ", flush=True)

        result = evaluate_image(image_path, SECOND_PASS_MODEL, era)
        second_score = result.get("score", 0)

        data["second_pass_score"] = second_score
        data["second_pass_feedback"] = result.get("justification", "")

        avg_score = (first_score + second_score) / 2
        data["average_score"] = avg_score

        if avg_score >= args.threshold:
            data["status"] = "accepted"
            accepted += 1

            # Copy to keepers
            src = Path(image_path)
            dest = keepers_dir / src.name
            shutil.copy2(src, dest)

            # Save metadata
            meta_path = dest.with_suffix('.json')
            with open(meta_path, 'w') as f:
                json.dump(data, f, indent=2)

            print(f"ACCEPTED (1st:{first_score}, 2nd:{second_score}, avg:{avg_score:.0f})")
        else:
            data["status"] = "rejected"
            rejected += 1

            # Copy to fails
            src = Path(image_path)
            dest = fails_dir / src.name
            shutil.copy2(src, dest)

            print(f"REJECTED (1st:{first_score}, 2nd:{second_score}, avg:{avg_score:.0f})")

    print(f"\nSecond-pass results: {accepted} accepted, {rejected} rejected")

    # Unload second-pass model
    print("\nUnloading second-pass model...")
    unload_ollama_model(SECOND_PASS_MODEL)

    # Save updated prompts
    with open(prompts_file, 'w') as f:
        json.dump(prompts, f, indent=2)
    print(f"\nUpdated prompts saved to: {prompts_file}")

    # Summary
    print("\n" + "=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)
    print(f"Total: {len(prompts)}")
    print(f"Accepted: {accepted}")
    print(f"Rejected: {rejected}")
    print(f"First-pass failed: {failed}")
    print(f"Missing images: {sum(1 for p in prompts.values() if p.get('status') == 'missing')}")
    print(f"\nKeepers: {keepers_dir}")
    print(f"Fails: {fails_dir}")


if __name__ == "__main__":
    main()
