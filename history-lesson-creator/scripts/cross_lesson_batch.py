#!/usr/bin/env python3
"""
Cross-Lesson Batch Image Generator with GPU Memory Management

Processes ALL lessons (3-51) in true batch mode with intelligent GPU memory management:
1. Phase 1: Generate ALL prompts (GPT-OS only - no ComfyUI loaded)
2. Phase 2: Generate ALL images (Unload GPT-OS, start ComfyUI + Z-Image Turbo)
3. Phase 3: First-pass VLM (Stop ComfyUI, load MiniCPM-V)
4. Phase 4: Second-pass VLM (Load Qwen2.5VL)
5. Reiterate on failures

This approach maximizes GPU memory for each phase by unloading unused models.

Usage:
    python scripts/cross_lesson_batch.py --start 3 --end 51 --image-model zimage
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

import requests

# Import from the main script
sys.path.insert(0, str(Path(__file__).parent))
from historical_image_gen_loop import (
    load_lesson_from_exports,
    load_lesson_from_json,
    generate_era_props_json,
    generate_flux_prompt,
    generate_image_comfyui,
    evaluate_image,
    get_brief_feedback,
    check_ollama_available,
    check_comfyui_available,
    check_model_available,
    sanitize_text,
    PROMPT_GEN_MODEL,
    FIRST_PASS_MODEL,
    SECOND_PASS_MODEL,
    DEFAULT_THRESHOLD,
    OUTPUT_DIR,
    PROJECT_DIR,
    OLLAMA_URL,
)
import historical_image_gen_loop as hig

# Configuration
MAX_ROUNDS = 3
COMFYUI_PATH = Path("C:/Users/scott/ComfyUI")


def unload_ollama_model(model: str):
    """Unload a model from Ollama to free GPU memory."""
    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={"model": model, "keep_alive": 0},
            timeout=30
        )
        if response.status_code == 200:
            print(f"  Unloaded: {model}")
            return True
    except Exception as e:
        print(f"  Warning: Could not unload {model}: {e}")
    return False


def unload_all_ollama_models():
    """Unload all models from Ollama to free GPU memory."""
    print("\n[GPU Management] Unloading Ollama models...")
    models = [PROMPT_GEN_MODEL, FIRST_PASS_MODEL, SECOND_PASS_MODEL]
    for model in models:
        unload_ollama_model(model)
    time.sleep(3)  # Give time for memory to free


def start_comfyui():
    """Start ComfyUI server."""
    print("\n[GPU Management] Starting ComfyUI...")

    # Check if already running
    if check_comfyui_available():
        print("  ComfyUI already running")
        return True

    # Start ComfyUI
    try:
        subprocess.Popen(
            ["python", "main.py", "--listen"],
            cwd=str(COMFYUI_PATH),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0
        )

        # Wait for it to start
        for i in range(60):  # Wait up to 60 seconds
            time.sleep(2)
            if check_comfyui_available():
                print("  ComfyUI started successfully")
                return True
            if i % 10 == 9:
                print(f"  Waiting for ComfyUI... ({i+1}s)")

        print("  Warning: ComfyUI may not have started properly")
        return False
    except Exception as e:
        print(f"  Error starting ComfyUI: {e}")
        return False


def stop_comfyui():
    """Stop ComfyUI server to free GPU memory."""
    print("\n[GPU Management] Stopping ComfyUI...")

    if not check_comfyui_available():
        print("  ComfyUI not running")
        return

    # Kill Python processes running ComfyUI
    try:
        if os.name == 'nt':
            # Windows - use taskkill
            result = subprocess.run(
                ["powershell", "-Command",
                 "Get-Process python | Where-Object {$_.Path -like '*ComfyUI*'} | Stop-Process -Force"],
                capture_output=True,
                timeout=30
            )
        else:
            # Unix - use pkill
            subprocess.run(["pkill", "-f", "ComfyUI"], timeout=10)

        time.sleep(3)

        if not check_comfyui_available():
            print("  ComfyUI stopped")
        else:
            # Force kill all Python
            if os.name == 'nt':
                subprocess.run(
                    ["powershell", "-Command", "Stop-Process -Name python -Force -ErrorAction SilentlyContinue"],
                    capture_output=True,
                    timeout=10
                )
            print("  Force stopped Python processes")
            time.sleep(3)
    except Exception as e:
        print(f"  Warning: Error stopping ComfyUI: {e}")


def get_gpu_memory():
    """Get current GPU memory usage."""
    try:
        result = subprocess.run(
            ["nvidia-smi", "--query-gpu=memory.used,memory.total", "--format=csv,noheader,nounits"],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            used, total = result.stdout.strip().split(',')
            return int(used.strip()), int(total.strip())
    except:
        pass
    return None, None


def print_gpu_status():
    """Print current GPU memory status."""
    used, total = get_gpu_memory()
    if used and total:
        pct = used / total * 100
        print(f"  GPU Memory: {used}/{total} MB ({pct:.1f}%)")


def load_all_lessons(start: int, end: int) -> list:
    """Load all lessons from start to end."""
    lessons = []
    for lesson_num in range(start, end + 1):
        lesson = load_lesson_from_json(lesson_num)
        if not lesson:
            lesson = load_lesson_from_exports(lesson_num)

        if lesson and lesson.get("chapters"):
            lesson["lesson_num"] = lesson_num
            lessons.append(lesson)
            print(f"  Loaded Lesson {lesson_num}: {lesson.get('title', 'Unknown')} ({len(lesson['chapters'])} chapters)")
        else:
            print(f"  WARNING: Could not load Lesson {lesson_num}")

    return lessons


def phase1_generate_all_prompts(lessons: list, prompt_model: str) -> dict:
    """Phase 1: Generate prompts for ALL lessons/chapters.

    GPU Strategy: Only GPT-OS loaded, ComfyUI stopped.
    """
    print("\n" + "=" * 60)
    print("PHASE 1: GENERATING ALL PROMPTS")
    print(f"Model: {prompt_model}")
    print("=" * 60)

    # Ensure ComfyUI is stopped to free GPU memory
    stop_comfyui()
    print_gpu_status()

    all_prompts = {}
    total_chapters = sum(len(l["chapters"]) for l in lessons)
    processed = 0

    for lesson in lessons:
        lesson_num = lesson["lesson_num"]
        title = lesson.get("title", "Unknown")
        era = lesson.get("era", "Unknown")

        print(f"\n[Lesson {lesson_num}] {title} (Era: {era})")

        for idx, chapter in enumerate(lesson["chapters"]):
            chapter_title = chapter.get("title", f"Chapter {idx + 1}")
            print(f"  Chapter {idx + 1}: {chapter_title}...", end=" ", flush=True)

            # Generate era props
            era_props = generate_era_props_json(lesson, chapter, prompt_model)

            # Generate Flux prompt
            flux_prompt = generate_flux_prompt(era_props)

            key = (lesson_num, idx)
            all_prompts[key] = {
                "lesson_num": lesson_num,
                "lesson_title": title,
                "era": era,
                "chapter_idx": idx,
                "chapter_title": chapter_title,
                "era_props": era_props,
                "prompt": flux_prompt,
                "attempt": 1,
                "status": "pending"
            }

            processed += 1
            print(f"done ({processed}/{total_chapters})")

    # Unload GPT-OS after prompt generation
    print("\n[Phase 1 Complete] Unloading prompt model...")
    unload_ollama_model(prompt_model)
    print_gpu_status()

    return all_prompts


def phase2_generate_all_images(prompts: dict, session_dir: Path) -> dict:
    """Phase 2: Generate images for ALL prompts.

    GPU Strategy: Start ComfyUI with Z-Image Turbo, Ollama models unloaded.
    """
    print("\n" + "=" * 60)
    print("PHASE 2: GENERATING ALL IMAGES")
    print(f"Using: {'Z-Image Turbo' if hig.IMAGE_MODEL == 'zimage' else 'Flux'}")
    print("=" * 60)

    # Unload all Ollama models
    unload_all_ollama_models()

    # Start ComfyUI
    if not start_comfyui():
        print("ERROR: Could not start ComfyUI")
        return prompts

    # Wait a moment for model loading
    print("  Waiting for image model to load...")
    time.sleep(10)
    print_gpu_status()

    pending = [(k, v) for k, v in prompts.items() if v["status"] == "pending"]
    total = len(pending)

    for i, (key, data) in enumerate(pending, 1):
        lesson_num, chapter_idx = key
        chapter_title = data["chapter_title"]
        attempt = data["attempt"]

        print(f"[{i}/{total}] Lesson {lesson_num}, Chapter {chapter_idx + 1}: {chapter_title} (attempt {attempt})")

        # Generate unique output prefix
        output_prefix = f"L{lesson_num:02d}_Ch{chapter_idx + 1}_v{attempt}"

        # Generate image (returns dict with success, path, error)
        result = generate_image_comfyui(data["prompt"], output_prefix)

        if result.get("success") and result.get("path"):
            # Copy to session directory
            dest_path = session_dir / f"lesson_{lesson_num:02d}_chapter_{chapter_idx + 1}_v{attempt}.png"
            shutil.copy2(result["path"], dest_path)

            prompts[key]["image_path"] = str(dest_path)
            prompts[key]["status"] = "generated"
            print(f"  -> Saved to: {dest_path.name}")
        else:
            prompts[key]["status"] = "failed_generation"
            error_msg = result.get("error", "Unknown error")
            print(f"  -> FAILED to generate image: {error_msg}")

    # Stop ComfyUI after image generation
    print("\n[Phase 2 Complete] Stopping ComfyUI...")
    stop_comfyui()
    print_gpu_status()

    return prompts


def phase3_first_pass_evaluation(prompts: dict, session_dir: Path) -> dict:
    """Phase 3: First-pass VLM evaluation of ALL images.

    GPU Strategy: ComfyUI stopped, MiniCPM-V loaded.
    """
    print("\n" + "=" * 60)
    print("PHASE 3: FIRST-PASS VLM EVALUATION")
    print(f"Model: {FIRST_PASS_MODEL}")
    print("=" * 60)

    # Ensure ComfyUI is stopped
    stop_comfyui()
    print_gpu_status()

    generated = [(k, v) for k, v in prompts.items() if v["status"] == "generated"]
    total = len(generated)

    if total == 0:
        print("No images to evaluate.")
        return prompts

    passed = 0
    failed = 0

    for i, (key, data) in enumerate(generated, 1):
        lesson_num, chapter_idx = key
        image_path = data["image_path"]
        era = data["era"]

        print(f"[{i}/{total}] Lesson {lesson_num}, Chapter {chapter_idx + 1}...", end=" ", flush=True)

        result = evaluate_image(image_path, FIRST_PASS_MODEL, era)
        score = result.get("score", 0)

        prompts[key]["first_pass_score"] = score
        prompts[key]["first_pass_feedback"] = result.get("justification", "")

        if score >= DEFAULT_THRESHOLD:
            prompts[key]["status"] = "first_pass_passed"
            passed += 1
            print(f"PASSED ({score})")
        else:
            prompts[key]["status"] = "first_pass_failed"
            failed += 1
            print(f"FAILED ({score})")

    print(f"\nFirst-pass results: {passed} passed, {failed} failed")

    # Unload first-pass model
    print("[Phase 3 Complete] Unloading first-pass model...")
    unload_ollama_model(FIRST_PASS_MODEL)
    print_gpu_status()

    return prompts


def phase4_second_pass_evaluation(prompts: dict, session_dir: Path) -> dict:
    """Phase 4: Second-pass VLM evaluation on first-pass winners.

    GPU Strategy: Qwen2.5VL loaded (replaces MiniCPM-V).
    """
    print("\n" + "=" * 60)
    print("PHASE 4: SECOND-PASS VLM EVALUATION")
    print(f"Model: {SECOND_PASS_MODEL}")
    print("=" * 60)

    print_gpu_status()

    first_pass_winners = [(k, v) for k, v in prompts.items() if v["status"] == "first_pass_passed"]
    total = len(first_pass_winners)

    if total == 0:
        print("No images passed first evaluation.")
        return prompts

    keepers_dir = session_dir / "keepers"
    keepers_dir.mkdir(exist_ok=True)
    fails_dir = session_dir / "fails"
    fails_dir.mkdir(exist_ok=True)

    accepted = 0
    rejected = 0

    for i, (key, data) in enumerate(first_pass_winners, 1):
        lesson_num, chapter_idx = key
        image_path = data["image_path"]
        era = data["era"]
        first_score = data["first_pass_score"]

        print(f"[{i}/{total}] Lesson {lesson_num}, Chapter {chapter_idx + 1}...", end=" ", flush=True)

        result = evaluate_image(image_path, SECOND_PASS_MODEL, era)
        second_score = result.get("score", 0)

        prompts[key]["second_pass_score"] = second_score
        prompts[key]["second_pass_feedback"] = result.get("justification", "")

        # Calculate average
        avg_score = (first_score + second_score) / 2
        prompts[key]["average_score"] = avg_score

        if avg_score >= DEFAULT_THRESHOLD:
            prompts[key]["status"] = "accepted"
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
            prompts[key]["status"] = "rejected"
            rejected += 1

            # Copy to fails
            src = Path(image_path)
            dest = fails_dir / src.name
            shutil.copy2(src, dest)

            print(f"REJECTED (1st:{first_score}, 2nd:{second_score}, avg:{avg_score:.0f})")

    print(f"\nSecond-pass results: {accepted} accepted, {rejected} rejected")

    # Unload second-pass model
    print("[Phase 4 Complete] Unloading second-pass model...")
    unload_ollama_model(SECOND_PASS_MODEL)
    print_gpu_status()

    return prompts


def collect_failures(prompts: dict) -> list:
    """Collect all failed/rejected items for reiteration."""
    failures = []
    for key, data in prompts.items():
        if data["status"] in ["failed_generation", "first_pass_failed", "rejected"]:
            failures.append(key)
    return failures


def prepare_reiteration(prompts: dict, failures: list) -> dict:
    """Prepare failed items for another round of generation."""
    for key in failures:
        data = prompts[key]

        # Get feedback for refinement
        feedback = ""
        if data.get("first_pass_feedback"):
            feedback = data["first_pass_feedback"]
        if data.get("second_pass_feedback"):
            feedback += " " + data["second_pass_feedback"]

        # Regenerate prompt with feedback
        if feedback:
            data["prompt"] = generate_flux_prompt(data["era_props"], feedback)

        data["attempt"] += 1
        data["status"] = "pending"

    return prompts


def save_report(prompts: dict, session_dir: Path, round_num: int):
    """Save generation report."""
    report = {
        "session": str(session_dir),
        "round": round_num,
        "timestamp": datetime.now().isoformat(),
        "summary": {
            "total": len(prompts),
            "accepted": sum(1 for p in prompts.values() if p["status"] == "accepted"),
            "rejected": sum(1 for p in prompts.values() if p["status"] == "rejected"),
            "failed_generation": sum(1 for p in prompts.values() if p["status"] == "failed_generation"),
            "first_pass_failed": sum(1 for p in prompts.values() if p["status"] == "first_pass_failed"),
            "pending": sum(1 for p in prompts.values() if p["status"] == "pending"),
        },
        "details": {f"L{k[0]}_Ch{k[1]+1}": v for k, v in prompts.items()}
    }

    report_path = session_dir / f"report_round_{round_num}.json"
    with open(report_path, 'w') as f:
        json.dump(report, f, indent=2)

    print(f"\nReport saved to: {report_path}")
    return report


def save_prompts(prompts: dict, session_dir: Path):
    """Save all prompts to a JSON file for debugging/resuming."""
    prompts_file = session_dir / "all_prompts.json"
    # Convert tuple keys to strings for JSON
    serializable = {f"L{k[0]}_Ch{k[1]+1}": v for k, v in prompts.items()}
    with open(prompts_file, 'w') as f:
        json.dump(serializable, f, indent=2)
    print(f"Prompts saved to: {prompts_file}")


def main():
    parser = argparse.ArgumentParser(description="Cross-Lesson Batch Image Generator")
    parser.add_argument("--start", type=int, default=3, help="Starting lesson number")
    parser.add_argument("--end", type=int, default=51, help="Ending lesson number")
    parser.add_argument("--image-model", choices=["flux", "zimage"], default="zimage", help="Image generation model")
    parser.add_argument("--prompt-model", default=PROMPT_GEN_MODEL, help="Prompt generation model")
    parser.add_argument("--threshold", type=int, default=DEFAULT_THRESHOLD, help="Score threshold")
    parser.add_argument("--max-rounds", type=int, default=MAX_ROUNDS, help="Max refinement rounds")
    args = parser.parse_args()

    # Set image model
    hig.IMAGE_MODEL = args.image_model

    print("=" * 60)
    print("CROSS-LESSON BATCH IMAGE GENERATOR")
    print("With GPU Memory Management")
    print("=" * 60)
    print(f"Lessons: {args.start} to {args.end}")
    print(f"Image Model: {args.image_model}")
    print(f"Prompt Model: {args.prompt_model}")
    print(f"Threshold: {args.threshold}")
    print("=" * 60)

    # Check prerequisites
    print("\nChecking prerequisites...")
    if not check_ollama_available():
        print("ERROR: Ollama server not available")
        sys.exit(1)
    print("  [OK] Ollama server")

    for model in [args.prompt_model, FIRST_PASS_MODEL, SECOND_PASS_MODEL]:
        if not check_model_available(model):
            print(f"ERROR: Model not available: {model}")
            sys.exit(1)
        print(f"  [OK] Model: {model}")

    # Note: ComfyUI check skipped - will start when needed
    print("  [INFO] ComfyUI will be started for Phase 2")

    # Create session directory
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    session_dir = OUTPUT_DIR / f"batch_session_{timestamp}"
    session_dir.mkdir(parents=True, exist_ok=True)
    print(f"\nSession directory: {session_dir}")

    # Initial GPU status
    print("\nInitial GPU status:")
    print_gpu_status()

    # Load all lessons
    print("\nLoading lessons...")
    lessons = load_all_lessons(args.start, args.end)
    total_chapters = sum(len(l["chapters"]) for l in lessons)
    print(f"\nLoaded {len(lessons)} lessons with {total_chapters} total chapters")

    # Phase 1: Generate all prompts (ComfyUI stopped)
    prompts = phase1_generate_all_prompts(lessons, args.prompt_model)
    save_prompts(prompts, session_dir)

    # Processing rounds
    for round_num in range(1, args.max_rounds + 1):
        print(f"\n{'=' * 60}")
        print(f"ROUND {round_num}/{args.max_rounds}")
        print(f"{'=' * 60}")

        pending_count = sum(1 for p in prompts.values() if p["status"] == "pending")
        if pending_count == 0:
            print("No pending items to process.")
            break

        print(f"Processing {pending_count} items...")

        # Phase 2: Generate all images (Start ComfyUI)
        prompts = phase2_generate_all_images(prompts, session_dir)

        # Phase 3: First-pass evaluation (Stop ComfyUI, load VLM)
        prompts = phase3_first_pass_evaluation(prompts, session_dir)

        # Phase 4: Second-pass evaluation
        prompts = phase4_second_pass_evaluation(prompts, session_dir)

        # Save report
        report = save_report(prompts, session_dir, round_num)
        save_prompts(prompts, session_dir)

        # Check if we need another round
        failures = collect_failures(prompts)
        accepted = report["summary"]["accepted"]

        print(f"\n--- Round {round_num} Summary ---")
        print(f"Accepted: {accepted}/{total_chapters}")
        print(f"Failures: {len(failures)}")

        if len(failures) == 0:
            print("\nAll images accepted!")
            break

        if round_num < args.max_rounds:
            print(f"\nPreparing {len(failures)} items for round {round_num + 1}...")
            prompts = prepare_reiteration(prompts, failures)

    # Final cleanup
    print("\n[Final Cleanup] Unloading all models...")
    unload_all_ollama_models()
    stop_comfyui()

    # Final summary
    print("\n" + "=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)

    final_accepted = sum(1 for p in prompts.values() if p["status"] == "accepted")
    final_failed = total_chapters - final_accepted

    print(f"Total Chapters: {total_chapters}")
    print(f"Accepted: {final_accepted}")
    print(f"Failed: {final_failed}")
    print(f"Success Rate: {final_accepted/total_chapters*100:.1f}%")
    print(f"\nKeepers: {session_dir / 'keepers'}")
    print(f"Fails: {session_dir / 'fails'}")
    print_gpu_status()

    # Save final report
    save_report(prompts, session_dir, 999)


if __name__ == "__main__":
    main()
