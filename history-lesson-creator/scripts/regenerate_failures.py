#!/usr/bin/env python3
"""Regenerate failed images and re-evaluate them."""
import json
import shutil
import sys
import time
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).parent))
import historical_image_gen_loop
from historical_image_gen_loop import (
    generate_image_comfyui,
    evaluate_image,
    FIRST_PASS_MODEL,
    SECOND_PASS_MODEL,
    DEFAULT_THRESHOLD,
    OLLAMA_URL,
)

# Set to use Z-Image Turbo (same as original batch)
historical_image_gen_loop.IMAGE_MODEL = "zimage"

session_dir = Path("C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/generated_images/batch_session_20260113_150301")
prompts_file = session_dir / "all_prompts.json"
keepers_dir = session_dir / "keepers"
fails_dir = session_dir / "fails"

def unload_ollama_model(model: str):
    try:
        requests.post(f"{OLLAMA_URL}/api/generate", json={"model": model, "keep_alive": 0}, timeout=30)
        print(f"  Unloaded: {model}")
    except: pass

with open(prompts_file) as f:
    prompts = json.load(f)

# Find all failures
failures = []
for key, data in prompts.items():
    status = data.get("status", "")
    if status in ["first_pass_failed", "rejected"]:
        failures.append((key, data))

print(f"Found {len(failures)} failed images to regenerate")
print("=" * 60)

# Phase 1: Regenerate images with ComfyUI
print("\nPHASE 1: REGENERATING IMAGES")
print("=" * 60)

for i, (key, data) in enumerate(failures, 1):
    lesson_num = data["lesson_num"]
    chapter_idx = data["chapter_idx"]
    prompt = data["prompt"]

    # Use version 2 for regenerated images
    image_path = session_dir / f"lesson_{lesson_num:02d}_chapter_{chapter_idx + 1}_v2.png"

    print(f"[{i}/{len(failures)}] {key}...")

    result = generate_image_comfyui(prompt, str(image_path))

    if result.get("success"):
        data["image_path"] = str(image_path)
        data["regenerated"] = True
        print(f"  Generated: {image_path.name}")
    else:
        print(f"  FAILED: {result.get('error', 'Unknown error')}")
        data["status"] = "generation_failed"

# Save progress
with open(prompts_file, 'w') as f:
    json.dump(prompts, f, indent=2)
print("\nImage generation complete. Saved progress.")

# Phase 2: First-pass VLM evaluation
print("\n" + "=" * 60)
print("PHASE 2: FIRST-PASS VLM EVALUATION")
print(f"Model: {FIRST_PASS_MODEL}")
print("=" * 60)

passed_first = 0
failed_first = 0

for i, (key, data) in enumerate(failures, 1):
    if data.get("status") == "generation_failed":
        continue

    if not data.get("regenerated"):
        continue

    image_path = data["image_path"]
    era = data.get("era", "historical")

    print(f"[{i}/{len(failures)}] {key}...", end=" ", flush=True)

    result = evaluate_image(image_path, FIRST_PASS_MODEL, era)
    score = result.get("score", 0)

    data["first_pass_score_v2"] = score
    data["first_pass_feedback_v2"] = result.get("justification", "")

    if score >= DEFAULT_THRESHOLD:
        data["status"] = "regen_first_pass_passed"
        passed_first += 1
        print(f"PASSED ({score})")
    else:
        data["status"] = "regen_first_pass_failed"
        failed_first += 1
        print(f"FAILED ({score})")

print(f"\nFirst-pass: {passed_first} passed, {failed_first} failed")
unload_ollama_model(FIRST_PASS_MODEL)

# Save progress
with open(prompts_file, 'w') as f:
    json.dump(prompts, f, indent=2)

# Phase 3: Second-pass VLM evaluation
print("\n" + "=" * 60)
print("PHASE 3: SECOND-PASS VLM EVALUATION")
print(f"Model: {SECOND_PASS_MODEL}")
print("=" * 60)

winners = [(k, v) for k, v in failures if v.get("status") == "regen_first_pass_passed"]
accepted = 0
rejected = 0

for i, (key, data) in enumerate(winners, 1):
    image_path = data["image_path"]
    era = data.get("era", "historical")
    first_score = data["first_pass_score_v2"]

    print(f"[{i}/{len(winners)}] {key}...", end=" ", flush=True)

    result = evaluate_image(image_path, SECOND_PASS_MODEL, era)
    second_score = result.get("score", 0)

    data["second_pass_score_v2"] = second_score
    avg = (first_score + second_score) / 2
    data["average_score_v2"] = avg

    if avg >= DEFAULT_THRESHOLD:
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

        print(f"ACCEPTED ({first_score}/{second_score}={avg:.0f})")
    else:
        data["status"] = "rejected"
        rejected += 1
        print(f"REJECTED ({first_score}/{second_score}={avg:.0f})")

print(f"\nSecond-pass: {accepted} accepted, {rejected} rejected")
unload_ollama_model(SECOND_PASS_MODEL)

# Final save
with open(prompts_file, 'w') as f:
    json.dump(prompts, f, indent=2)

# Summary
print("\n" + "=" * 60)
print("REGENERATION SUMMARY")
print("=" * 60)
print(f"Total failures attempted: {len(failures)}")
print(f"Regeneration accepted: {accepted}")
print(f"Still failing: {len(failures) - accepted}")
print(f"Total keepers now: {len(list(keepers_dir.glob('*.png')))}")
