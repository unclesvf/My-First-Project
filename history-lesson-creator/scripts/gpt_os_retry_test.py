#!/usr/bin/env python3
"""
GPT-OS Retry Test - Tests same prompt multiple times to measure failure rate
and finds reliable settings.
"""

import json
import time
from pathlib import Path
import requests

OLLAMA_URL = "http://localhost:11434"
MODEL = "gpt-oss:20b"
PROJECT_DIR = Path(__file__).parent.parent


def sanitize_text(text):
    """Remove problematic Unicode characters."""
    if not text:
        return text
    replacements = {
        '\u202f': ' ', '\u2011': '-', '\u2013': '-', '\u2014': '-',
        '\u2018': "'", '\u2019': "'", '\u201c': '"', '\u201d': '"',
        '\u2026': '...', '\u00a0': ' ',
    }
    for char, replacement in replacements.items():
        text = text.replace(char, replacement)
    return text.encode('ascii', 'ignore').decode('ascii')


def test_call(system_msg, user_msg, temperature, num_predict):
    """Single test call, returns (success, length, time)."""
    start = time.time()
    try:
        messages = [{"role": "user", "content": user_msg}]
        if system_msg:
            messages.insert(0, {"role": "system", "content": system_msg})

        response = requests.post(
            f"{OLLAMA_URL}/api/chat",
            json={
                "model": MODEL,
                "messages": messages,
                "stream": False,
                "options": {"temperature": temperature, "num_predict": num_predict}
            },
            timeout=120
        )

        elapsed = time.time() - start
        if response.status_code == 200:
            text = response.json().get("message", {}).get("content", "").strip()
            return (len(text) > 20, len(text), elapsed, text[:100] if text else "")
        return (False, 0, elapsed, "HTTP error")
    except Exception as e:
        return (False, 0, time.time() - start, str(e))


def main():
    print("=" * 70)
    print("GPT-OS RETRY TEST")
    print("Testing same prompts multiple times to measure failure rate")
    print("=" * 70)

    # Load Chapter 3 (the consistent failure case)
    tts_dir = PROJECT_DIR / "lesson-exports" / "tts" / "lesson_01_one_world_to_the_next"
    with open(tts_dir / "03_building_a_new_world.txt", "r", encoding="utf-8") as f:
        chapter_content = f.read()

    # Test configurations
    configs = [
        {"name": "temp_0.3", "temp": 0.3, "num_predict": 600},
        {"name": "temp_0.5", "temp": 0.5, "num_predict": 600},
        {"name": "temp_0.7", "temp": 0.7, "num_predict": 600},
        {"name": "temp_0.9", "temp": 0.9, "num_predict": 600},
        {"name": "high_tokens", "temp": 0.7, "num_predict": 1200},
        {"name": "prefix_prompt", "temp": 0.7, "num_predict": 600, "prefix": True},
    ]

    system_msg = "You are a historical image prompt specialist. You analyze historical lesson texts and extract specific visual details for generating historically accurate images."

    base_user_msg = f"""Analyze this lesson chapter and describe the scene for an image.

LESSON: One World To The Next
ERA: Year 1565
CHAPTER: Building A New World

TEXT:
{chapter_content}

Describe the scene with these specific details (one per line):
ERA: exact time and place
SETTING: specific location description
SUBJECT: main person or focus
ACTION: what is happening
CLOTHING: period-accurate attire details
PROPS: important objects in scene
MOOD: emotional atmosphere
AVOID: modern elements"""

    prefix_user_msg = f"""Analyze this lesson chapter and describe the scene for an image.

LESSON: One World To The Next
ERA: Year 1565
CHAPTER: Building A New World

TEXT:
{chapter_content}

You MUST respond with a scene description. Begin your response with "ERA:" and continue with the other details.

ERA: exact time and place
SETTING: specific location description
SUBJECT: main person or focus
ACTION: what is happening
CLOTHING: period-accurate attire details
PROPS: important objects in scene
MOOD: emotional atmosphere
AVOID: modern elements"""

    RETRIES = 5

    print(f"\nTesting Chapter 3 with {RETRIES} retries per configuration...")
    print(f"Chapter content: {len(chapter_content)} chars")

    results = {}

    for config in configs:
        name = config["name"]
        temp = config["temp"]
        num_predict = config["num_predict"]
        use_prefix = config.get("prefix", False)
        user_msg = prefix_user_msg if use_prefix else base_user_msg

        print(f"\n[{name}] temp={temp}, num_predict={num_predict}, prefix={use_prefix}")

        successes = 0
        total_time = 0
        lengths = []

        for i in range(RETRIES):
            success, length, elapsed, preview = test_call(system_msg, user_msg, temp, num_predict)
            total_time += elapsed

            status = "[OK]" if success else "[FAIL]"
            print(f"  Trial {i+1}: {status} {length} chars, {elapsed:.1f}s")
            if success:
                print(f"    Preview: {sanitize_text(preview)}...")
                successes += 1
                lengths.append(length)

            time.sleep(1)  # Brief pause between retries

        avg_time = total_time / RETRIES
        success_rate = successes / RETRIES * 100
        avg_length = sum(lengths) / len(lengths) if lengths else 0

        print(f"  RESULT: {successes}/{RETRIES} ({success_rate:.0f}%) success, avg {avg_time:.1f}s, avg {avg_length:.0f} chars when successful")

        results[name] = {
            "success_rate": success_rate,
            "avg_time": avg_time,
            "avg_length": avg_length,
            "successes": successes,
            "trials": RETRIES
        }

    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY - Success rates by configuration")
    print("=" * 70)

    for name, data in sorted(results.items(), key=lambda x: -x[1]["success_rate"]):
        print(f"  {name}: {data['success_rate']:.0f}% ({data['successes']}/{data['trials']})")

    # Find best config
    best = max(results.items(), key=lambda x: x[1]["success_rate"])
    print(f"\nBest configuration: {best[0]} with {best[1]['success_rate']:.0f}% success rate")


if __name__ == "__main__":
    main()
