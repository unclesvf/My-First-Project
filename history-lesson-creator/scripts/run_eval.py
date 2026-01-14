#!/usr/bin/env python3
"""Simple evaluation script"""
import json
import shutil
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from historical_image_gen_loop import evaluate_image, FIRST_PASS_MODEL, SECOND_PASS_MODEL, DEFAULT_THRESHOLD, OLLAMA_URL
import requests

def unload_model(model):
    try:
        requests.post(f"{OLLAMA_URL}/api/generate", json={"model": model, "keep_alive": 0}, timeout=30)
        print(f"  Unloaded: {model}")
    except: pass

session_dir = Path("C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/generated_images/batch_session_20260113_150301")
prompts_file = session_dir / "all_prompts.json"

with open(prompts_file) as f:
    prompts = json.load(f)

print(f"Loaded {len(prompts)} prompts")
print("\n" + "="*60)
print("PHASE 3: FIRST-PASS VLM EVALUATION")
print(f"Model: {FIRST_PASS_MODEL}")
print("="*60 + "\n")

passed = 0
failed = 0

for i, (key, data) in enumerate(prompts.items(), 1):
    lesson_num = data["lesson_num"]
    chapter_idx = data["chapter_idx"]
    image_path = session_dir / f"lesson_{lesson_num:02d}_chapter_{chapter_idx + 1}_v1.png"

    if not image_path.exists():
        data["status"] = "missing"
        continue

    era = data.get("era", "historical")
    print(f"[{i}/265] {key}...", end=" ", flush=True)

    result = evaluate_image(str(image_path), FIRST_PASS_MODEL, era)
    score = result.get("score", 0)

    data["first_pass_score"] = score
    data["first_pass_feedback"] = result.get("justification", "")
    data["image_path"] = str(image_path)

    if score >= DEFAULT_THRESHOLD:
        data["status"] = "first_pass_passed"
        passed += 1
        print(f"PASSED ({score})")
    else:
        data["status"] = "first_pass_failed"
        failed += 1
        print(f"FAILED ({score})")

    if i % 50 == 0:
        with open(prompts_file, "w") as f:
            json.dump(prompts, f, indent=2)
        print(f"  [Checkpoint: {passed} passed, {failed} failed]")

print(f"\nFirst-pass results: {passed} passed, {failed} failed")
unload_model(FIRST_PASS_MODEL)

# Save
with open(prompts_file, "w") as f:
    json.dump(prompts, f, indent=2)
print("Progress saved")

# Phase 4
print("\n" + "="*60)
print("PHASE 4: SECOND-PASS VLM EVALUATION")
print(f"Model: {SECOND_PASS_MODEL}")
print("="*60 + "\n")

keepers_dir = session_dir / "keepers"
keepers_dir.mkdir(exist_ok=True)
fails_dir = session_dir / "fails"
fails_dir.mkdir(exist_ok=True)

winners = [(k, v) for k, v in prompts.items() if v.get("status") == "first_pass_passed"]
accepted = 0
rejected = 0

for i, (key, data) in enumerate(winners, 1):
    image_path = data["image_path"]
    era = data.get("era", "historical")
    first_score = data["first_pass_score"]

    print(f"[{i}/{len(winners)}] {key}...", end=" ", flush=True)

    result = evaluate_image(image_path, SECOND_PASS_MODEL, era)
    second_score = result.get("score", 0)

    data["second_pass_score"] = second_score
    avg = (first_score + second_score) / 2
    data["average_score"] = avg

    if avg >= DEFAULT_THRESHOLD:
        data["status"] = "accepted"
        accepted += 1
        shutil.copy2(image_path, keepers_dir / Path(image_path).name)
        with open(keepers_dir / (Path(image_path).stem + ".json"), "w") as f:
            json.dump(data, f, indent=2)
        print(f"ACCEPTED ({first_score}/{second_score}={avg:.0f})")
    else:
        data["status"] = "rejected"
        rejected += 1
        shutil.copy2(image_path, fails_dir / Path(image_path).name)
        print(f"REJECTED ({first_score}/{second_score}={avg:.0f})")

print(f"\nSecond-pass: {accepted} accepted, {rejected} rejected")
unload_model(SECOND_PASS_MODEL)

with open(prompts_file, "w") as f:
    json.dump(prompts, f, indent=2)

print("\n" + "="*60)
print("FINAL SUMMARY")
print("="*60)
print(f"Total: 265")
print(f"Accepted: {accepted}")
print(f"Rejected: {rejected}")
print(f"First-pass failed: {failed}")
print(f"Keepers: {keepers_dir}")
