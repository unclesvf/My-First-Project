#!/usr/bin/env python3
"""Finish second-pass VLM evaluation on regenerated images."""
import json
import shutil
import sys
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).parent))
from historical_image_gen_loop import evaluate_image, SECOND_PASS_MODEL, DEFAULT_THRESHOLD, OLLAMA_URL

session_dir = Path("C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/generated_images/batch_session_20260113_150301")
prompts_file = session_dir / "all_prompts.json"
keepers_dir = session_dir / "keepers"

with open(prompts_file) as f:
    prompts = json.load(f)

# Find regenerated images that passed first-pass but need second-pass
to_evaluate = []
for key, data in prompts.items():
    if data.get("status") == "regen_first_pass_passed":
        # Check if second-pass was done
        if data.get("second_pass_score_v2", 0) == 0:
            to_evaluate.append((key, data))

print(f"Images needing second-pass: {len(to_evaluate)}")
print(f"Model: {SECOND_PASS_MODEL}")
print(f"Context: 8192 (GPU-optimized)")
print("=" * 60)

accepted = 0
rejected = 0

for i, (key, data) in enumerate(to_evaluate, 1):
    image_path = data["image_path"]
    era = data.get("era", "historical")
    first_score = data["first_pass_score_v2"]

    print(f"[{i}/{len(to_evaluate)}] {key}...", end=" ", flush=True)

    result = evaluate_image(image_path, SECOND_PASS_MODEL, era)
    second_score = result.get("score", 0)

    data["second_pass_score_v2"] = second_score
    avg = (first_score + second_score) / 2
    data["average_score_v2"] = avg

    if avg >= DEFAULT_THRESHOLD:
        data["status"] = "accepted"
        accepted += 1

        src = Path(image_path)
        dest = keepers_dir / src.name
        shutil.copy2(src, dest)

        meta_path = dest.with_suffix('.json')
        with open(meta_path, 'w') as f:
            json.dump(data, f, indent=2)

        print(f"ACCEPTED ({first_score}/{second_score}={avg:.0f})")
    else:
        data["status"] = "rejected"
        rejected += 1
        print(f"REJECTED ({first_score}/{second_score}={avg:.0f})")

# Also update L9_Ch1 and L10_Ch1 from earlier run
# L9_Ch1 was REJECTED (98/20=59)
if "L9_Ch1" in prompts and prompts["L9_Ch1"].get("second_pass_score_v2", 0) == 0:
    prompts["L9_Ch1"]["second_pass_score_v2"] = 20
    prompts["L9_Ch1"]["average_score_v2"] = 59
    prompts["L9_Ch1"]["status"] = "rejected"
    print("Updated L9_Ch1: REJECTED (98/20=59)")
    rejected += 1

# L10_Ch1 was ACCEPTED (95/85=90)
if "L10_Ch1" in prompts and prompts["L10_Ch1"].get("second_pass_score_v2", 0) == 0:
    prompts["L10_Ch1"]["second_pass_score_v2"] = 85
    prompts["L10_Ch1"]["average_score_v2"] = 90
    prompts["L10_Ch1"]["status"] = "accepted"
    # Copy to keepers
    src = Path(prompts["L10_Ch1"]["image_path"])
    dest = keepers_dir / src.name
    shutil.copy2(src, dest)
    meta_path = dest.with_suffix('.json')
    with open(meta_path, 'w') as f:
        json.dump(prompts["L10_Ch1"], f, indent=2)
    print("Updated L10_Ch1: ACCEPTED (95/85=90)")
    accepted += 1

# Save
with open(prompts_file, 'w') as f:
    json.dump(prompts, f, indent=2)

print("\n" + "=" * 60)
print("SUMMARY")
print("=" * 60)
print(f"Accepted: {accepted}")
print(f"Rejected: {rejected}")
print(f"Total keepers: {len(list(keepers_dir.glob('*.png')))}")
