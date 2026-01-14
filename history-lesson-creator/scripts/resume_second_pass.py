#!/usr/bin/env python3
"""Resume second-pass VLM evaluation with GPU-optimized settings."""
import json
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from historical_image_gen_loop import evaluate_image, SECOND_PASS_MODEL, DEFAULT_THRESHOLD

session_dir = Path("C:/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/generated_images/batch_session_20260113_150301")
prompts_file = session_dir / "all_prompts.json"
keepers_dir = session_dir / "keepers"
fails_dir = session_dir / "fails"

keepers_dir.mkdir(exist_ok=True)
fails_dir.mkdir(exist_ok=True)

with open(prompts_file) as f:
    prompts = json.load(f)

# Find images that passed first-pass but haven't been second-pass evaluated
# Check if already in keepers directory
existing_keepers = {p.stem for p in keepers_dir.glob("*.png")}

# Get first-pass winners that still need second-pass
to_evaluate = []
for key, data in prompts.items():
    if data.get("status") != "first_pass_passed":
        continue

    image_path = data.get("image_path", "")
    if not image_path:
        continue

    # Check if already processed
    image_name = Path(image_path).stem
    if image_name in existing_keepers:
        # Already accepted - update status
        data["status"] = "accepted"
        continue

    if (fails_dir / Path(image_path).name).exists():
        # Already rejected
        data["status"] = "rejected"
        continue

    to_evaluate.append((key, data))

print(f"Total first-pass passed: {len([d for d in prompts.values() if d.get('first_pass_score', 0) >= DEFAULT_THRESHOLD])}")
print(f"Already in keepers: {len(existing_keepers)}")
print(f"Remaining to evaluate: {len(to_evaluate)}")
print(f"\nModel: {SECOND_PASS_MODEL}")
print(f"Context: 8192 (GPU-optimized)")
print("=" * 60 + "\n")

accepted = 0
rejected = 0

for i, (key, data) in enumerate(to_evaluate, 1):
    image_path = data["image_path"]
    era = data.get("era", "historical")
    first_score = data["first_pass_score"]

    print(f"[{i}/{len(to_evaluate)}] {key}...", end=" ", flush=True)

    result = evaluate_image(image_path, SECOND_PASS_MODEL, era)
    second_score = result.get("score", 0)

    data["second_pass_score"] = second_score
    data["second_pass_feedback"] = result.get("justification", "")

    avg_score = (first_score + second_score) / 2
    data["average_score"] = avg_score

    if avg_score >= DEFAULT_THRESHOLD:
        data["status"] = "accepted"
        accepted += 1

        src = Path(image_path)
        dest = keepers_dir / src.name
        shutil.copy2(src, dest)

        meta_path = dest.with_suffix('.json')
        with open(meta_path, 'w') as f:
            json.dump(data, f, indent=2)

        print(f"ACCEPTED (1st:{first_score}, 2nd:{second_score}, avg:{avg_score:.0f})")
    else:
        data["status"] = "rejected"
        rejected += 1

        src = Path(image_path)
        dest = fails_dir / src.name
        shutil.copy2(src, dest)

        print(f"REJECTED (1st:{first_score}, 2nd:{second_score}, avg:{avg_score:.0f})")

    # Save progress every 10 images
    if i % 10 == 0:
        with open(prompts_file, 'w') as f:
            json.dump(prompts, f, indent=2)
        print(f"  [Checkpoint: {accepted} accepted, {rejected} rejected]")

# Final save
with open(prompts_file, 'w') as f:
    json.dump(prompts, f, indent=2)

print("\n" + "=" * 60)
print("SUMMARY")
print("=" * 60)
print(f"Evaluated: {len(to_evaluate)}")
print(f"Accepted: {accepted}")
print(f"Rejected: {rejected}")
print(f"Total keepers: {len(list(keepers_dir.glob('*.png')))}")
