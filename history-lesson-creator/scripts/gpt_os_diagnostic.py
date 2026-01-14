#!/usr/bin/env python3
"""
GPT-OS Diagnostic Test Script

Tests GPT-OS 20B responses across all chapters to identify why some return empty.
Also tests the refinement loop with simulated VLM feedback.

Usage:
    python scripts/gpt_os_diagnostic.py
    python scripts/gpt_os_diagnostic.py --chapter 3
    python scripts/gpt_os_diagnostic.py --test-refinement
"""

import argparse
import json
import re
import time
from pathlib import Path
from datetime import datetime

import requests

# Configuration


def sanitize_text(text):
    """Remove problematic Unicode characters for Windows console."""
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


OLLAMA_URL = "http://localhost:11434"
MODEL = "gpt-oss:20b"
SCRIPTS_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPTS_DIR.parent

# Test variations
PROMPT_VARIATIONS = {
    "full": {
        "system": "You are a historical image prompt specialist. You analyze historical lesson texts and extract specific visual details for generating historically accurate images.",
        "format": """Describe the scene with these specific details (one per line):
ERA: exact time and place
SETTING: specific location description
SUBJECT: main person or focus
ACTION: what is happening
CLOTHING: period-accurate attire details
PROPS: important objects in scene
MOOD: emotional atmosphere
AVOID: modern elements"""
    },
    "simple": {
        "system": "You are an expert at describing historical scenes for image generation.",
        "format": "Describe this scene in detail for creating a historically accurate image. Include the setting, people, clothing, and mood."
    },
    "minimal": {
        "system": "You describe scenes for images.",
        "format": "Describe what this scene would look like as a painting."
    },
    "no_system": {
        "system": None,
        "format": "You are a historical image prompt specialist. Describe this 1565 Spanish colonial scene for an image. Include setting, people, clothing, and mood."
    }
}

# Simulated VLM feedback for refinement testing
SIMULATED_FEEDBACK = [
    "The image depicts a scene that is not historically accurate for the year 1565. The clothing appears too modern - the subject wears what looks like a modern t-shirt instead of period-appropriate Spanish colonial attire like a linen shirt and wool doublet. The architecture in the background includes brick buildings which would not exist in 1565 St. Augustine.",
    "Historical accuracy is low. The buildings shown have glass windows and shingled roofs, which are anachronistic for 1565 Florida. The subject's hairstyle appears contemporary rather than period-appropriate. There are no visible period props like wooden tools or Spanish colonial items.",
    "The scene lacks historical authenticity. Modern elements visible include what appears to be concrete or paved surfaces. Clothing does not match 16th century Spanish colonial style. The overall aesthetic feels more 19th century than 16th century."
]


def load_chapters():
    """Load all chapter files from lesson 1."""
    tts_dir = PROJECT_DIR / "lesson-exports" / "tts" / "lesson_01_one_world_to_the_next"

    chapters = []
    chapter_files = sorted([f for f in tts_dir.glob("*.txt")
                           if f.name[0].isdigit() and "intro" not in f.name.lower() and "outro" not in f.name.lower()])

    for chapter_file in chapter_files:
        with open(chapter_file, "r", encoding="utf-8") as f:
            content = f.read()

        # Extract chapter number and title
        chapter_num = int(chapter_file.stem.split("_")[0])
        chapter_title = chapter_file.stem[3:].replace("_", " ").title()

        chapters.append({
            "num": chapter_num,
            "title": chapter_title,
            "content": content,
            "file": chapter_file.name,
            "word_count": len(content.split())
        })

    return chapters


def test_gpt_os_chat(system_msg, user_msg, temperature=0.7, num_predict=1200, timeout=180):
    """Test GPT-OS with /api/chat endpoint. Returns dict with response details."""

    result = {
        "success": False,
        "response_text": "",
        "response_length": 0,
        "raw_json": None,
        "error": None,
        "time_taken": 0
    }

    start_time = time.time()

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
            timeout=timeout
        )

        result["time_taken"] = time.time() - start_time
        result["raw_json"] = response.json()

        if response.status_code == 200:
            text = response.json().get("message", {}).get("content", "").strip()
            result["response_text"] = text
            result["response_length"] = len(text)
            result["success"] = len(text) > 20
        else:
            result["error"] = f"HTTP {response.status_code}"

    except requests.Timeout:
        result["error"] = "Timeout"
        result["time_taken"] = time.time() - start_time
    except Exception as e:
        result["error"] = str(e)
        result["time_taken"] = time.time() - start_time

    return result


def test_chapter(chapter, variation_name="full"):
    """Test a single chapter with a specific prompt variation."""

    variation = PROMPT_VARIATIONS[variation_name]

    user_msg = f"""Analyze this lesson chapter and describe the scene for an image.

LESSON: One World To The Next
ERA: Year 1565
CHAPTER: {chapter['title']}

TEXT:
{chapter['content']}

{variation['format']}"""

    print(f"\n  Testing with '{variation_name}' prompt variation...")
    result = test_gpt_os_chat(variation['system'], user_msg)

    return result


def run_diagnostic(specific_chapter=None):
    """Run diagnostic tests on all chapters or a specific one."""

    print("=" * 70)
    print("GPT-OS DIAGNOSTIC TEST")
    print(f"Model: {MODEL}")
    print(f"Endpoint: {OLLAMA_URL}/api/chat")
    print("=" * 70)

    # Check Ollama is running
    try:
        response = requests.get(f"{OLLAMA_URL}/api/tags", timeout=5)
        if response.status_code != 200:
            print("ERROR: Ollama not responding")
            return
        print("[OK] Ollama server responding")
    except Exception as e:
        print(f"ERROR: Cannot connect to Ollama: {e}")
        return

    # Load chapters
    chapters = load_chapters()
    print(f"[OK] Loaded {len(chapters)} chapters")

    if specific_chapter:
        chapters = [c for c in chapters if c['num'] == specific_chapter]
        if not chapters:
            print(f"ERROR: Chapter {specific_chapter} not found")
            return

    # Results storage
    results = []

    for chapter in chapters:
        print(f"\n{'='*70}")
        print(f"CHAPTER {chapter['num']}: {chapter['title']}")
        print(f"Word count: {chapter['word_count']}")
        print("=" * 70)

        chapter_results = {
            "chapter": chapter['num'],
            "title": chapter['title'],
            "word_count": chapter['word_count'],
            "tests": {}
        }

        # Test each prompt variation
        for var_name in PROMPT_VARIATIONS.keys():
            result = test_chapter(chapter, var_name)
            chapter_results["tests"][var_name] = result

            status = "[OK]" if result["success"] else "[FAIL]"
            print(f"    {status} {var_name}: {result['response_length']} chars, {result['time_taken']:.1f}s")

            if result["success"]:
                # Show first 100 chars of response
                preview = sanitize_text(result["response_text"][:100].replace("\n", " "))
                print(f"       Preview: {preview}...")
            elif result["error"]:
                print(f"       Error: {result['error']}")

            # Small delay between tests
            time.sleep(2)

        results.append(chapter_results)

    # Summary
    print(f"\n{'='*70}")
    print("SUMMARY")
    print("=" * 70)

    for r in results:
        successes = sum(1 for t in r["tests"].values() if t["success"])
        total = len(r["tests"])
        print(f"  Chapter {r['chapter']} ({r['title']}): {successes}/{total} variations worked")

        # Show which worked
        for var_name, test in r["tests"].items():
            status = "[OK]" if test["success"] else "[FAIL]"
            print(f"    {status} {var_name}")

    # Save detailed results
    report_path = PROJECT_DIR / "gpt_os_diagnostic_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"\nDetailed report saved to: {report_path}")

    return results


def test_refinement_loop(specific_chapter=None):
    """Test the refinement loop with simulated VLM feedback."""

    print("=" * 70)
    print("GPT-OS REFINEMENT LOOP TEST")
    print("Testing prompt refinement with simulated VLM feedback")
    print("=" * 70)

    chapters = load_chapters()

    if specific_chapter:
        chapters = [c for c in chapters if c['num'] == specific_chapter]

    results = []

    for chapter in chapters:
        print(f"\n{'='*70}")
        print(f"CHAPTER {chapter['num']}: {chapter['title']}")
        print("=" * 70)

        chapter_result = {
            "chapter": chapter['num'],
            "title": chapter['title'],
            "rounds": []
        }

        # Initial prompt generation
        print("\n[ROUND 1] Initial prompt generation...")

        system_msg = "You are a historical image prompt specialist. You analyze historical lesson texts and extract specific visual details for generating historically accurate images."

        user_msg = f"""Analyze this lesson chapter and describe the scene for an image.

LESSON: One World To The Next
ERA: Year 1565
CHAPTER: {chapter['title']}

TEXT:
{chapter['content']}

Describe the scene with these specific details (one per line):
ERA: exact time and place
SETTING: specific location description
SUBJECT: main person or focus
ACTION: what is happening
CLOTHING: period-accurate attire details
PROPS: important objects in scene
MOOD: emotional atmosphere
AVOID: modern elements"""

        result = test_gpt_os_chat(system_msg, user_msg)

        round_result = {
            "round": 1,
            "type": "initial",
            "success": result["success"],
            "response_length": result["response_length"],
            "response_preview": result["response_text"][:200] if result["response_text"] else "",
            "time_taken": result["time_taken"]
        }
        chapter_result["rounds"].append(round_result)

        if result["success"]:
            print(f"  [OK] Got initial prompt ({result['response_length']} chars)")
            current_prompt = result["response_text"]
        else:
            print(f"  [FAIL] Empty response - using fallback")
            current_prompt = f"1565 Spanish colonial St. Augustine, Florida, {chapter['title']}, period-accurate scene"

        # Refinement rounds with simulated feedback
        for round_num in range(2, 4):
            print(f"\n[ROUND {round_num}] Refinement with simulated feedback...")

            feedback = SIMULATED_FEEDBACK[round_num - 2]
            print(f"  Feedback: {feedback[:80]}...")

            refine_system = "You are an expert at writing image generation prompts for historically accurate scenes. You refine prompts to fix accuracy issues."

            refine_user = f"""Improve this image generation prompt to fix historical accuracy issues.

ORIGINAL PROMPT:
{current_prompt}

REVIEWER FEEDBACK:
{feedback}

Write a better version of this prompt that fixes these problems. Focus on 1565 Spanish colonial Florida with accurate period details. Just write the improved prompt, nothing else."""

            result = test_gpt_os_chat(refine_system, refine_user)

            round_result = {
                "round": round_num,
                "type": "refinement",
                "success": result["success"],
                "response_length": result["response_length"],
                "response_preview": result["response_text"][:200] if result["response_text"] else "",
                "time_taken": result["time_taken"],
                "feedback_used": feedback[:100]
            }
            chapter_result["rounds"].append(round_result)

            if result["success"]:
                print(f"  [OK] Got refined prompt ({result['response_length']} chars)")
                print(f"     Preview: {sanitize_text(result['response_text'][:100])}...")
                current_prompt = result["response_text"]
            else:
                print(f"  [FAIL] Empty refinement response")

            time.sleep(2)

        results.append(chapter_result)

    # Summary
    print(f"\n{'='*70}")
    print("REFINEMENT TEST SUMMARY")
    print("=" * 70)

    for r in results:
        print(f"\nChapter {r['chapter']} ({r['title']}):")
        for round_data in r["rounds"]:
            status = "[OK]" if round_data["success"] else "[FAIL]"
            round_type = round_data["type"]
            chars = round_data["response_length"]
            print(f"  {status} Round {round_data['round']} ({round_type}): {chars} chars")

    # Save results
    report_path = PROJECT_DIR / "gpt_os_refinement_test_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"\nDetailed report saved to: {report_path}")

    return results


def main():
    parser = argparse.ArgumentParser(description="GPT-OS Diagnostic Tests")
    parser.add_argument("--chapter", "-c", type=int, help="Test specific chapter only")
    parser.add_argument("--test-refinement", "-r", action="store_true",
                       help="Test refinement loop with simulated feedback")
    parser.add_argument("--all", "-a", action="store_true",
                       help="Run both diagnostic and refinement tests")

    args = parser.parse_args()

    if args.all:
        run_diagnostic(args.chapter)
        print("\n" + "=" * 70 + "\n")
        test_refinement_loop(args.chapter)
    elif args.test_refinement:
        test_refinement_loop(args.chapter)
    else:
        run_diagnostic(args.chapter)


if __name__ == "__main__":
    main()
