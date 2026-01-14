#!/usr/bin/env python3
"""
Historical Image Gen Loop - FluxDev + Ollama VLM Pipeline

Self-correcting image generation pipeline that:
1. Loads lesson text and extracts era/scene information
2. Uses Ollama LLM to generate era-action-props JSON
3. Converts to Flux-ready prompts
4. Generates images via ComfyUI/FluxDev
5. Evaluates with two-stage VLM pipeline (MiniCPM-V -> Qwen2.5-VL)
6. Auto-refines failed images (up to 3 attempts)
7. Organizes outputs into keepers/fails folders

Usage:
    python scripts/historical_image_gen_loop.py --lesson 1
    python scripts/historical_image_gen_loop.py --lesson 1 --chapter 2
    python scripts/historical_image_gen_loop.py --text-file lesson_exports/lesson_1.txt
"""

import argparse
import base64
import json
import os
import re
import shutil
import sys
import time
import uuid
from datetime import datetime
from pathlib import Path
from typing import Optional

import requests

# Configuration
SCRIPTS_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPTS_DIR.parent
OUTPUT_DIR = PROJECT_DIR / "generated_images"

# Ollama Configuration
OLLAMA_URL = "http://localhost:11434"
PROMPT_GEN_MODEL = "gpt-oss:20b"  # GPT-OS 20B for prompt generation (as per PRD)
FIRST_PASS_MODEL = "minicpm-v:latest"  # Changed from llama3.2-vision (too harsh)
SECOND_PASS_MODEL = "qwen2.5vl:latest"

# ComfyUI Configuration
COMFYUI_URL = "http://127.0.0.1:8188"
COMFYUI_OUTPUT_DIR = Path("C:/Users/scott/ComfyUI/output")

# Generation Settings
DEFAULT_THRESHOLD = 75  # Score threshold for acceptance
MAX_ATTEMPTS = 3
API_TIMEOUT = 300  # 5 minutes for VLM evaluation
COMFYUI_TIMEOUT = 900  # 15 minutes for Flux image generation (Flux Dev is slow)
RETRY_DELAY = 5  # Seconds between retries
BATCH_SIZE = 100  # Number of images to generate before switching to evaluation

# Supported image extensions
SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


# ==============================================================================
# LESSON LOADING
# ==============================================================================

def load_lesson_from_exports(lesson_num: int) -> Optional[dict]:
    """Load lesson data from exported text files."""
    exports_dir = PROJECT_DIR / "lesson-exports"
    tts_dir = exports_dir / "tts"

    # Find lesson directory in TTS exports (format: lesson_01_title)
    lesson_prefix = f"lesson_{lesson_num:02d}_"
    lesson_dirs = [d for d in tts_dir.iterdir() if d.is_dir() and d.name.startswith(lesson_prefix)]

    if lesson_dirs:
        lesson_dir = lesson_dirs[0]
        lesson_name = lesson_dir.name.replace(lesson_prefix, "").replace("_", " ").title()

        lesson = {
            "id": f"lesson-{lesson_num}",
            "title": lesson_name,
            "description": "",
            "era": "",
            "narrator": "",
            "chapters": []
        }

        # Read intro for era/narrator info
        intro_file = lesson_dir / "00_intro.txt"
        if intro_file.exists():
            with open(intro_file, "r", encoding="utf-8") as f:
                intro = f.read()
                # Extract era from narrator line (e.g., "1565")
                year_match = re.search(r"(\d{4})", intro)
                if year_match:
                    lesson["era"] = f"Year {year_match.group(1)}"
                lesson["narrator"] = intro.strip()[:200]  # First 200 chars as narrator context

        # Read chapter files (01_xxx.txt, 02_xxx.txt, etc.)
        chapter_files = sorted([f for f in lesson_dir.glob("*.txt") if f.name[0].isdigit() and f.name != "00_intro.txt" and "outro" not in f.name.lower()])

        for chapter_file in chapter_files:
            with open(chapter_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Extract chapter title from filename
            chapter_title = chapter_file.stem[3:].replace("_", " ").title()  # Skip "01_"

            lesson["chapters"].append({
                "title": chapter_title,
                "content": content.strip()
            })

        if lesson["chapters"]:
            return lesson

    # Fallback: try direct lesson files
    patterns = [
        f"lesson_{lesson_num}_*.txt",
        f"lesson-{lesson_num}_*.txt",
    ]

    for pattern in patterns:
        matches = list(exports_dir.glob(pattern))
        if matches:
            with open(matches[0], "r", encoding="utf-8") as f:
                text = f.read()
            return parse_lesson_text(text, lesson_num)

    return None


def parse_lesson_text(text: str, lesson_num: int) -> dict:
    """Parse exported lesson text into structured format."""
    lines = text.split("\n")

    lesson = {
        "id": f"lesson-{lesson_num}",
        "title": "",
        "description": "",
        "era": "",
        "narrator": "",
        "chapters": []
    }

    current_chapter = None
    current_content = []

    for line in lines:
        stripped = line.strip()

        # Extract title
        if stripped.startswith("# ") and not lesson["title"]:
            lesson["title"] = stripped[2:].strip()

        # Extract description/era from "Era:" or narrator line
        elif "Era:" in stripped or "1565" in stripped or "16th century" in stripped.lower():
            lesson["era"] = stripped
        elif stripped.startswith("Narrator:") or "year old" in stripped.lower():
            lesson["narrator"] = stripped.replace("Narrator:", "").strip()
            # Extract era from narrator info
            year_match = re.search(r"(\d{4})", stripped)
            if year_match:
                lesson["era"] = f"Year {year_match.group(1)}"

        # Chapter detection
        elif re.match(r"^(#{1,3}\s*)?(Chapter|CHAPTER)\s*\d+", stripped, re.IGNORECASE):
            if current_chapter and current_content:
                lesson["chapters"].append({
                    "title": current_chapter,
                    "content": "\n".join(current_content).strip()
                })
            current_chapter = re.sub(r"^#{1,3}\s*", "", stripped).strip()
            current_content = []
        elif current_chapter:
            current_content.append(line)

    # Add last chapter
    if current_chapter and current_content:
        lesson["chapters"].append({
            "title": current_chapter,
            "content": "\n".join(current_content).strip()
        })

    return lesson


def load_lesson_from_json(lesson_num: int) -> Optional[dict]:
    """Try to load lesson from JSON export if available."""
    json_file = PROJECT_DIR / "lesson-exports" / f"lesson_{lesson_num}.json"
    if json_file.exists():
        with open(json_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return None


# ==============================================================================
# OLLAMA INTEGRATION
# ==============================================================================

def check_ollama_available() -> bool:
    """Check if Ollama server is running."""
    try:
        response = requests.get(f"{OLLAMA_URL}/api/tags", timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False


def check_model_available(model_name: str) -> bool:
    """Check if a specific model is available in Ollama."""
    try:
        response = requests.get(f"{OLLAMA_URL}/api/tags", timeout=5)
        if response.status_code == 200:
            models = response.json().get("models", [])
            base_name = model_name.split(":")[0]
            return any(base_name in m.get("name", "") for m in models)
        return False
    except requests.RequestException:
        return False


def parse_plain_text_props(text: str) -> dict:
    """Parse plain text LLM response into era props dict."""
    result = {
        "era": "",
        "setting": "",
        "main_subject": "",
        "action": "",
        "props": [],
        "clothing": "",
        "mood": "",
        "avoid": [],
        "style": "historical illustration, oil painting style, muted earth tones"
    }

    # Parse line by line looking for labeled fields
    lines = text.split('\n')
    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Match patterns like "ERA: value" or "Era: value" or "**ERA:** value"
        line_clean = line.replace('**', '').replace('*', '')

        if ':' in line_clean:
            key, _, value = line_clean.partition(':')
            key = key.strip().upper()
            value = value.strip()

            if not value:
                continue

            if key == 'ERA' or key == 'TIME PERIOD':
                result["era"] = value
            elif key == 'SETTING' or key == 'LOCATION':
                result["setting"] = value
            elif key == 'SUBJECT' or key == 'MAIN SUBJECT' or key == 'PERSON':
                result["main_subject"] = value
            elif key == 'ACTION' or key == 'ACTIVITY':
                result["action"] = value
            elif key == 'CLOTHING' or key == 'ATTIRE' or key == 'DRESS':
                result["clothing"] = value
            elif key == 'PROPS' or key == 'OBJECTS' or key == 'ITEMS':
                # Split on commas if multiple items
                result["props"] = [p.strip() for p in value.split(',') if p.strip()]
            elif key == 'MOOD' or key == 'ATMOSPHERE' or key == 'TONE':
                result["mood"] = value
            elif key == 'AVOID' or key == 'NEGATIVE' or key == 'DO NOT INCLUDE':
                result["avoid"] = [a.strip() for a in value.split(',') if a.strip()]

    return result


def generate_era_props_json(lesson: dict, chapter: dict, prompt_model: str = PROMPT_GEN_MODEL) -> dict:
    """Use Ollama LLM to generate era-action-props from chapter content."""

    era_info = lesson.get("era", "")
    narrator_info = lesson.get("narrator", "")
    title = lesson.get("title", "")
    chapter_title = chapter.get("title", "")
    content = chapter.get("content", "")[:2500]

    # System message for the chat template (harmony format)
    system_message = "You are a historical image prompt specialist. You analyze historical lesson texts and extract specific visual details for generating historically accurate images."

    # User message with the content and instructions (simplified format for reliable GPT-OS responses)
    user_message = f"""Analyze this lesson chapter and describe the scene for an image.

LESSON: {title}
ERA: {era_info}
CHAPTER: {chapter_title}

TEXT:
{content}

Describe the scene with these specific details (one per line):
ERA: exact time and place
SETTING: specific location description
SUBJECT: main person or focus
ACTION: what is happening
CLOTHING: period-accurate attire details
PROPS: important objects in scene
MOOD: emotional atmosphere
AVOID: modern elements"""

    try:
        # Use /api/chat endpoint with role-based messages (harmony format)
        response = requests.post(
            f"{OLLAMA_URL}/api/chat",
            json={
                "model": prompt_model,
                "messages": [
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": user_message}
                ],
                "stream": False,
                "options": {"temperature": 0.7, "num_predict": 1200}
            },
            timeout=180
        )

        if response.status_code == 200:
            # /api/chat returns message.content, not response
            result_json = response.json()
            text = result_json.get("message", {}).get("content", "").strip()
            # Sanitize response to avoid Windows console encoding issues
            text = sanitize_text(text)

            if text and len(text) > 20:
                # Parse plain text response into dict
                result = parse_plain_text_props(text)
                if result.get("era"):
                    era_display = sanitize_text(result.get('era', 'unknown')[:50])
                    subject_display = sanitize_text(result.get('main_subject', 'unknown')[:40])
                    print(f"      Era props: {era_display}, Subject: {subject_display}")
                    return result
                else:
                    print(f"      Could not parse response, using fallback")
            else:
                print(f"      Empty or short response ({len(text)} chars)")
    except Exception as e:
        print(f"      Error generating era props: {e}")

    # Intelligent fallback based on lesson content analysis
    fallback = extract_era_props_from_content(lesson, chapter)
    print(f"      Using fallback extraction: {fallback.get('era', 'unknown')}")
    return fallback


def extract_era_props_from_content(lesson: dict, chapter: dict) -> dict:
    """Extract era props directly from content using pattern matching."""
    content = chapter.get("content", "").lower()
    narrator = lesson.get("narrator", "").lower()
    title = lesson.get("title", "").lower()

    # Try to extract year
    year_match = re.search(r'\b(1[4-8]\d{2})\b', narrator + " " + content)
    year = year_match.group(1) if year_match else "16th century"

    # Detect era/location from keywords
    era = f"Year {year}"
    setting = "colonial settlement"
    clothing = "period-appropriate attire"
    props = []

    if "st. augustine" in content or "florida" in content or "la florida" in content:
        era = f"{year} Spanish colonial St. Augustine, Florida"
        setting = "wooden Spanish colonial settlement on Florida coast"
        clothing = "16th century Spanish colonial attire: linen shirt, wool doublet, breeches, leather boots"
        props = ["wooden fortifications", "Spanish ships", "palmetto trees", "sandy beach"]
    elif "jamestown" in content or "virginia" in content:
        era = f"{year} English colonial Jamestown, Virginia"
        setting = "English colonial fort along the James River"
        clothing = "early 17th century English colonial attire"
        props = ["wooden palisade", "English ships", "thatched roof buildings"]
    elif "plymouth" in content or "mayflower" in content:
        era = f"{year} Plymouth Colony, Massachusetts"
        setting = "Pilgrim settlement on rocky New England coast"
        clothing = "Puritan attire: dark wool clothing, white collars"
        props = ["Mayflower ship", "wooden houses", "pine trees"]

    # Extract main subject from narrator info
    main_subject = "historical figure"
    name_match = re.search(r'([A-Z][a-z]+),?\s+(?:a\s+)?(\d+)[- ]year[- ]old', lesson.get("narrator", ""))
    if name_match:
        main_subject = f"{name_match.group(1)}, a {name_match.group(2)}-year-old"

    # Detect action from chapter title
    chapter_title = chapter.get("title", "").lower()
    action = "daily life in the settlement"
    if "journey" in chapter_title or "begin" in chapter_title:
        action = "arriving at the new settlement"
    elif "survival" in chapter_title or "struggle" in chapter_title:
        action = "working to survive in the harsh conditions"
    elif "building" in chapter_title:
        action = "constructing new buildings and fortifications"

    return {
        "era": era,
        "setting": setting,
        "main_subject": main_subject,
        "action": action,
        "props": props,
        "clothing": clothing,
        "mood": "determined, hopeful yet anxious",
        "avoid": ["modern technology", "contemporary clothing", "electric lights", "paved roads", "glass windows"],
        "style": "historical illustration, oil painting style, muted earth tones"
    }


def sanitize_text(text: str) -> str:
    """Remove problematic Unicode characters that can't be encoded on Windows console."""
    if not text:
        return text
    # Replace problematic Unicode characters with ASCII equivalents
    replacements = {
        '\u202f': ' ',   # Narrow no-break space -> regular space
        '\u2011': '-',   # Non-breaking hyphen -> regular hyphen
        '\u2013': '-',   # En dash -> hyphen
        '\u2014': '-',   # Em dash -> hyphen
        '\u2018': "'",   # Left single quote
        '\u2019': "'",   # Right single quote
        '\u201c': '"',   # Left double quote
        '\u201d': '"',   # Right double quote
        '\u2026': '...', # Ellipsis
        '\u00a0': ' ',   # Non-breaking space
    }
    for char, replacement in replacements.items():
        text = text.replace(char, replacement)
    # Final fallback: encode to ASCII, ignoring any remaining problematic chars
    return text.encode('ascii', 'ignore').decode('ascii')


def generate_flux_prompt(era_props: dict, previous_feedback: str = None, prompt_model: str = PROMPT_GEN_MODEL) -> str:
    """Convert era-action-props JSON into a Flux-optimized image prompt."""

    # Sanitize feedback to avoid Windows console encoding issues
    if previous_feedback:
        previous_feedback = sanitize_text(previous_feedback)

    # Build props string
    props_str = ", ".join(era_props.get('props', [])) if era_props.get('props') else ""

    # Get style or use default
    style = era_props.get('style', 'historical documentary illustration, oil painting style')

    # Build the main prompt with rich details
    base_prompt = f"""{era_props['era']}, {era_props['setting']},
{era_props['main_subject']} {era_props['action']},
wearing {era_props['clothing']},
{props_str},
{era_props.get('mood', 'authentic')} atmosphere,
{style},
cinematic composition, natural lighting, highly detailed,
historically accurate, no modern elements"""

    # Add negative guidance
    avoid_list = era_props.get('avoid', [])
    negative = era_props.get('negative_prompt', '')
    if negative:
        avoid_list = [negative] if isinstance(negative, str) else list(avoid_list) + [negative]
    if avoid_list:
        base_prompt += f", absolutely no {', no '.join(str(x) for x in avoid_list if x)}"

    # Clean up the prompt
    base_prompt = base_prompt.replace("\n", " ").replace("  ", " ").strip()

    # If we have feedback from a failed attempt, use LLM to refine
    if previous_feedback:
        print(f"      Refining prompt based on feedback: {previous_feedback[:80]}...")

        # Extract key issues from feedback
        issues = []
        feedback_lower = previous_feedback.lower()
        if "architecture" in feedback_lower or "building" in feedback_lower:
            issues.append("use only primitive wooden structures, thatched roofs, no brick or stone buildings")
        if "clothing" in feedback_lower or "fashion" in feedback_lower or "shirt" in feedback_lower:
            issues.append("use authentic 16th century Spanish doublet and breeches, no modern clothing")
        if "ship" in feedback_lower:
            issues.append("use 16th century Spanish galleon with period-accurate rigging")
        if "modern" in feedback_lower:
            issues.append("remove all modern elements, use only hand-crafted period items")

        # Add specific fixes to prompt
        fixes = ", ".join(issues) if issues else "more historically accurate details"

        # Use chat endpoint with role-based messages (harmony format)
        system_msg = "You are an expert at writing image generation prompts for historically accurate scenes. You refine prompts to fix accuracy issues."

        user_msg = f"""Improve this image generation prompt to fix historical accuracy issues.

ORIGINAL PROMPT:
{base_prompt}

PROBLEMS FOUND:
{fixes}

REVIEWER NOTES:
{previous_feedback[:400]}

Write a better version of this prompt that fixes these problems. Focus on 1565 Spanish colonial Florida with accurate period details. Just write the improved prompt, nothing else."""

        try:
            response = requests.post(
                f"{OLLAMA_URL}/api/chat",
                json={
                    "model": prompt_model,
                    "messages": [
                        {"role": "system", "content": system_msg},
                        {"role": "user", "content": user_msg}
                    ],
                    "stream": False,
                    "options": {"temperature": 0.7, "num_predict": 1200}
                },
                timeout=180
            )
            if response.status_code == 200:
                refined = response.json().get("message", {}).get("content", "").strip()
                # Sanitize to avoid Windows console encoding issues
                refined = sanitize_text(refined)
                # Clean up any markdown or extra text
                refined = refined.replace("```", "").strip()
                # Remove any leading explanatory text
                if ":" in refined[:50]:
                    refined = refined.split(":", 1)[-1].strip()
                if refined and len(refined) > 50:
                    print(f"      Refined prompt: {refined[:80]}...")
                    return refined
                else:
                    print(f"      Refinement too short ({len(refined)} chars), using base + fixes")
                    return base_prompt + f", {fixes}"
            else:
                print(f"      Refinement API error: {response.status_code}")
        except Exception as e:
            print(f"      Refinement failed: {e}")

        # Fallback: append fixes to base prompt
        return base_prompt + f", {fixes}"

    return base_prompt


# ==============================================================================
# COMFYUI INTEGRATION
# ==============================================================================

def check_comfyui_available() -> bool:
    """Check if ComfyUI server is running."""
    try:
        response = requests.get(f"{COMFYUI_URL}/system_stats", timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False


def get_flux_workflow(prompt: str, output_prefix: str) -> dict:
    """Generate a ComfyUI workflow for Flux image generation."""

    # Flux requires separate UNet, CLIP, and VAE loaders
    workflow = {
        "4": {
            "class_type": "UNETLoader",
            "inputs": {
                "unet_name": "flux1-dev.safetensors",
                "weight_dtype": "default"
            }
        },
        "11": {
            "class_type": "DualCLIPLoader",
            "inputs": {
                "clip_name1": "t5xxl_fp16.safetensors",
                "clip_name2": "clip_l.safetensors",
                "type": "flux"
            }
        },
        "10": {
            "class_type": "VAELoader",
            "inputs": {
                "vae_name": "ae.safetensors"
            }
        },
        "5": {
            "class_type": "EmptySD3LatentImage",
            "inputs": {
                "batch_size": 1,
                "height": 768,
                "width": 1024
            }
        },
        "6": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["11", 0],
                "text": prompt
            }
        },
        "22": {
            "class_type": "FluxGuidance",
            "inputs": {
                "conditioning": ["6", 0],
                "guidance": 3.5
            }
        },
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "cfg": 1.0,
                "denoise": 1.0,
                "latent_image": ["5", 0],
                "model": ["4", 0],
                "negative": ["6", 0],
                "positive": ["22", 0],
                "sampler_name": "euler",
                "scheduler": "simple",
                "seed": int(time.time()) % (2**32),
                "steps": 20
            }
        },
        "8": {
            "class_type": "VAEDecode",
            "inputs": {
                "samples": ["3", 0],
                "vae": ["10", 0]
            }
        },
        "9": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": output_prefix,
                "images": ["8", 0]
            }
        }
    }

    return workflow


def get_zimage_workflow(prompt: str, output_prefix: str) -> dict:
    """Generate a ComfyUI workflow for Z-Image Turbo image generation.

    Z-Image Turbo is faster than Flux (8 steps vs 20) with comparable quality.
    Uses: qwen_3_4b text encoder (lumina2 type), z_image_turbo diffusion model, VAE.
    """

    workflow = {
        # Text Encoder - Qwen 3 4B with lumina2 type
        "1": {
            "class_type": "CLIPLoader",
            "inputs": {
                "clip_name": "qwen_3_4b.safetensors",
                "type": "lumina2"
            }
        },
        # Diffusion Model - Z-Image Turbo
        "2": {
            "class_type": "UNETLoader",
            "inputs": {
                "unet_name": "z_image_turbo_bf16.safetensors",
                "weight_dtype": "default"
            }
        },
        # VAE - use the Flux VAE (ae.safetensors) which Z-Image shares
        "3": {
            "class_type": "VAELoader",
            "inputs": {
                "vae_name": "ae.safetensors"
            }
        },
        # Empty Latent Image - SD3 type for Z-Image
        "4": {
            "class_type": "EmptySD3LatentImage",
            "inputs": {
                "batch_size": 1,
                "height": 768,
                "width": 1280
            }
        },
        # Text Encode
        "5": {
            "class_type": "CLIPTextEncode",
            "inputs": {
                "clip": ["1", 0],
                "text": prompt
            }
        },
        # KSampler - Z-Image uses 8 steps
        "6": {
            "class_type": "KSampler",
            "inputs": {
                "cfg": 4.5,
                "denoise": 1.0,
                "latent_image": ["4", 0],
                "model": ["2", 0],
                "negative": ["5", 0],
                "positive": ["5", 0],
                "sampler_name": "euler",
                "scheduler": "simple",
                "seed": int(time.time()) % (2**32),
                "steps": 8
            }
        },
        # VAE Decode
        "7": {
            "class_type": "VAEDecode",
            "inputs": {
                "samples": ["6", 0],
                "vae": ["3", 0]
            }
        },
        # Save Image
        "8": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": output_prefix,
                "images": ["7", 0]
            }
        }
    }

    return workflow


# Current image generation model (can be changed via --image-model argument)
IMAGE_MODEL = "flux"  # Options: "flux", "zimage"


def get_workflow(prompt: str, output_prefix: str) -> dict:
    """Get the appropriate workflow based on the current image model setting."""
    if IMAGE_MODEL == "zimage":
        return get_zimage_workflow(prompt, output_prefix)
    else:
        return get_flux_workflow(prompt, output_prefix)


def queue_prompt(workflow: dict) -> Optional[str]:
    """Queue a workflow in ComfyUI and return the prompt ID."""
    try:
        client_id = str(uuid.uuid4())
        response = requests.post(
            f"{COMFYUI_URL}/prompt",
            json={"prompt": workflow, "client_id": client_id},
            timeout=30
        )
        if response.status_code == 200:
            return response.json().get("prompt_id")
    except Exception as e:
        print(f"  Error queuing prompt: {e}")
    return None


def wait_for_completion(prompt_id: str, output_prefix: str, timeout: int = COMFYUI_TIMEOUT) -> Optional[Path]:
    """Wait for a queued prompt to complete and return the output path."""
    start_time = time.time()
    check_interval = 3  # seconds between checks

    # Get initial file count to detect new files
    # Extract just the filename prefix if output_prefix is an absolute path
    prefix_name = Path(output_prefix).stem if "/" in output_prefix or "\\" in output_prefix else output_prefix
    initial_files = set(COMFYUI_OUTPUT_DIR.glob(f"{prefix_name}*.png")) if COMFYUI_OUTPUT_DIR.exists() else set()

    while time.time() - start_time < timeout:
        # Method 1: Check ComfyUI history API for completion
        try:
            response = requests.get(f"{COMFYUI_URL}/history/{prompt_id}", timeout=10)
            if response.status_code == 200:
                history = response.json()
                if prompt_id in history:
                    prompt_data = history[prompt_id]
                    # Check if outputs exist in the response
                    outputs = prompt_data.get("outputs", {})
                    if outputs:
                        # Look for SaveImage node output (node "9" in our workflow)
                        for node_id, node_output in outputs.items():
                            if "images" in node_output:
                                for img in node_output["images"]:
                                    filename = img.get("filename")
                                    if filename:
                                        img_path = COMFYUI_OUTPUT_DIR / filename
                                        if img_path.exists():
                                            return img_path
        except Exception:
            pass

        # Method 2: Check for new files in output directory
        if COMFYUI_OUTPUT_DIR.exists():
            current_files = set(COMFYUI_OUTPUT_DIR.glob(f"{prefix_name}*.png"))
            new_files = current_files - initial_files
            if new_files:
                # Return the newest file
                newest = max(new_files, key=lambda p: p.stat().st_mtime)
                # Wait a moment to ensure file is fully written
                time.sleep(1)
                return newest

        time.sleep(check_interval)

    return None


def get_latest_output(prefix: str) -> Optional[Path]:
    """Find the most recently generated image with the given prefix."""
    if not COMFYUI_OUTPUT_DIR.exists():
        return None

    # Extract just the filename prefix if prefix is an absolute path
    prefix_name = Path(prefix).stem if "/" in prefix or "\\" in prefix else prefix
    matches = list(COMFYUI_OUTPUT_DIR.glob(f"{prefix_name}*.png"))
    if matches:
        return max(matches, key=lambda p: p.stat().st_mtime)
    return None


def generate_image_comfyui(prompt: str, output_prefix: str) -> dict:
    """Generate an image using ComfyUI and return result dict with success status."""
    result = {"success": False, "path": None, "error": None}

    # Extract just the filename for the workflow (ComfyUI won't save outside its output folder)
    target_path = Path(output_prefix)
    filename_only = target_path.stem  # e.g., "lesson_07_chapter_5_v2"

    workflow = get_workflow(prompt, filename_only)
    prompt_id = queue_prompt(workflow)

    if not prompt_id:
        result["error"] = "Failed to queue prompt"
        return result

    print(f"    Queued prompt: {prompt_id[:8]}...", end=" ", flush=True)

    # wait_for_completion returns path in ComfyUI output directory
    comfy_result_path = wait_for_completion(prompt_id, filename_only)

    if comfy_result_path:
        # Copy from ComfyUI output to target location
        try:
            import shutil
            target_file = target_path.with_suffix('.png')
            target_file.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(comfy_result_path, target_file)
            print("done")
            result["success"] = True
            result["path"] = target_file
            return result
        except Exception as e:
            result["error"] = f"Failed to copy file: {e}"
            return result
    else:
        print("timeout")
        # Last resort: check if file appeared anyway
        fallback = get_latest_output(filename_only)
        if fallback and fallback.stat().st_mtime > time.time() - 60:
            try:
                import shutil
                target_file = target_path.with_suffix('.png')
                target_file.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(fallback, target_file)
                print("    (found via fallback)")
                result["success"] = True
                result["path"] = target_file
                return result
            except Exception as e:
                result["error"] = f"Failed to copy fallback: {e}"
        else:
            result["error"] = "Timeout waiting for image generation"
        return result


# ==============================================================================
# VLM EVALUATION (from historical_image_accuracy_checker.py)
# ==============================================================================

def encode_image_to_base64(image_path: str) -> str:
    """Encode an image file to base64 string."""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def evaluate_image(image_path: str, model: str, era: str, strict: bool = False) -> dict:
    """Evaluate an image for historical accuracy using a VLM.

    Uses simple prompts that return just a number to avoid JSON parsing issues.
    """
    result = {
        "score": 0,
        "justification": "",
        "model": model,
        "error": None,
        "timestamp": datetime.now().isoformat()
    }

    # Simple prompt that returns just a number - much more reliable than JSON
    prompt = f"Score this image 0-100 for historical accuracy to {era}. Reply with just the number."

    for attempt in range(3):  # Retry logic for timeouts
        try:
            image_base64 = encode_image_to_base64(image_path)

            response = requests.post(
                f"{OLLAMA_URL}/api/chat",
                json={
                    "model": model,
                    "messages": [{"role": "user", "content": prompt, "images": [image_base64]}],
                    "stream": False,
                    "options": {"temperature": 0.1, "num_ctx": 8192}
                },
                timeout=API_TIMEOUT
            )

            if response.status_code != 200:
                result["error"] = f"API error: {response.status_code}"
                continue

            response_text = response.json().get("message", {}).get("content", "")
            response_text = sanitize_text(response_text)

            # Extract score - look for any number in the response
            score_match = re.search(r'(\d{1,3})', response_text)
            if score_match:
                result["score"] = min(100, int(score_match.group(1)))

                # If score is below threshold and we need feedback for refinement,
                # get brief feedback in a separate call
                if result["score"] < DEFAULT_THRESHOLD:
                    feedback = get_brief_feedback(image_path, model, era)
                    result["justification"] = feedback
                else:
                    result["justification"] = f"Score: {result['score']}"

                return result
            else:
                result["error"] = f"Could not parse score from: {response_text[:100]}"

        except requests.Timeout:
            if attempt < 2:
                print(f"    Timeout, retrying ({attempt + 1}/3)...")
                time.sleep(RETRY_DELAY)
            else:
                result["error"] = "Request timed out after 3 attempts"
        except Exception as e:
            result["error"] = f"Error: {str(e)}"
            break

    return result


def get_brief_feedback(image_path: str, model: str, era: str) -> str:
    """Get brief feedback about what's historically inaccurate in an image."""
    try:
        image_base64 = encode_image_to_base64(image_path)

        prompt = f"What is historically inaccurate about this {era} scene? List 1-3 issues briefly."

        response = requests.post(
            f"{OLLAMA_URL}/api/chat",
            json={
                "model": model,
                "messages": [{"role": "user", "content": prompt, "images": [image_base64]}],
                "stream": False,
                "options": {"temperature": 0.3, "num_ctx": 8192}
            },
            timeout=120
        )

        if response.status_code == 200:
            feedback = response.json().get("message", {}).get("content", "")
            return sanitize_text(feedback)[:500]  # Limit length
    except Exception:
        pass

    return "Historical accuracy issues detected"


def two_stage_evaluation(image_path: str, era: str, threshold: int) -> dict:
    """Run the two-stage VLM evaluation pipeline."""
    result = {
        "first_pass": None,
        "second_pass": None,
        "final_score": 0,
        "status": "rejected",
        "feedback": ""
    }

    # First pass with Llama 3.2 Vision
    print(f"    First pass ({FIRST_PASS_MODEL})...", end=" ", flush=True)
    first_pass = evaluate_image(image_path, FIRST_PASS_MODEL, era, strict=False)
    result["first_pass"] = first_pass

    if first_pass["error"]:
        print(f"ERROR: {first_pass['error']}")
        result["status"] = "error"
        result["feedback"] = first_pass.get("justification", "Evaluation failed")
        return result

    print(f"Score: {first_pass['score']}")

    # Check threshold for second pass
    if first_pass["score"] >= threshold:
        print(f"    Second pass ({SECOND_PASS_MODEL})...", end=" ", flush=True)
        second_pass = evaluate_image(image_path, SECOND_PASS_MODEL, era, strict=True)
        result["second_pass"] = second_pass

        if second_pass["error"]:
            print(f"ERROR: {second_pass['error']}")
            result["final_score"] = first_pass["score"]
            result["status"] = "passed_first_only"
            result["feedback"] = first_pass.get("justification", "")
        else:
            print(f"Score: {second_pass['score']}")
            result["final_score"] = (first_pass["score"] + second_pass["score"]) // 2
            result["feedback"] = second_pass.get("justification", "")

            if second_pass["score"] >= threshold:
                result["status"] = "keeper"
            else:
                result["status"] = "borderline"
    else:
        result["final_score"] = first_pass["score"]
        result["status"] = "rejected"
        result["feedback"] = first_pass.get("justification", "")

    return result


# ==============================================================================
# MAIN GENERATION LOOP
# ==============================================================================

def generate_chapter_image(
    lesson: dict,
    chapter: dict,
    chapter_num: int,
    session_dir: Path,
    threshold: int = DEFAULT_THRESHOLD,
    prompt_model: str = PROMPT_GEN_MODEL
) -> dict:
    """Generate and verify an image for a single chapter with auto-refinement."""

    result = {
        "chapter": chapter_num,
        "title": chapter["title"],
        "status": "pending",
        "final_image": None,
        "final_score": None,
        "attempts": []
    }

    era = lesson.get("era", "historical")
    era_props = None
    previous_feedback = None

    for attempt in range(1, MAX_ATTEMPTS + 1):
        print(f"\n  Attempt {attempt}/{MAX_ATTEMPTS}")

        attempt_result = {
            "attempt": attempt,
            "status": "pending",
            "image_path": None,
            "prompt": None,
            "score": None,
            "feedback": None
        }

        # Step 1: Generate era-props JSON (first attempt only, or if refining)
        if era_props is None or previous_feedback:
            print("    Generating scene analysis...")
            era_props = generate_era_props_json(lesson, chapter, prompt_model)

        # Step 2: Generate Flux prompt
        print("    Generating Flux prompt...")
        flux_prompt = generate_flux_prompt(era_props, previous_feedback, prompt_model)
        attempt_result["prompt"] = flux_prompt
        print(f"    Prompt: {flux_prompt[:100]}...")

        # Step 3: Generate image via ComfyUI
        print("    Generating image via ComfyUI...")
        output_prefix = f"lesson_{lesson['id'].split('-')[-1]}_ch{chapter_num}_v{attempt}"
        image_path = generate_image_comfyui(flux_prompt, output_prefix)

        if not image_path:
            print("    Image generation failed!")
            attempt_result["status"] = "generation_failed"
            attempt_result["error"] = "ComfyUI generation failed or timed out"
            result["attempts"].append(attempt_result)
            time.sleep(RETRY_DELAY)
            continue

        # Copy image to session directory
        dest_path = session_dir / f"chapter_{chapter_num}_v{attempt}.png"
        shutil.copy(image_path, dest_path)
        attempt_result["image_path"] = str(dest_path)

        # Step 4: Two-stage VLM evaluation
        print("    Evaluating historical accuracy...")
        eval_result = two_stage_evaluation(str(dest_path), era, threshold)

        attempt_result["score"] = eval_result["final_score"]
        attempt_result["status"] = eval_result["status"]
        attempt_result["feedback"] = eval_result["feedback"]
        result["attempts"].append(attempt_result)

        # Step 5: Check if accepted
        if eval_result["status"] == "keeper":
            print(f"    [PASS] Score: {eval_result['final_score']} - Image accepted!")
            result["status"] = "accepted"
            result["final_image"] = str(dest_path)
            result["final_score"] = eval_result["final_score"]
            break
        elif eval_result["status"] == "borderline":
            print(f"    [BORDERLINE] Score: {eval_result['final_score']}")
            result["final_image"] = str(dest_path)
            result["final_score"] = eval_result["final_score"]
            # Continue trying for better
            previous_feedback = eval_result["feedback"]
        else:
            print(f"    [FAIL] Score: {eval_result['final_score']} - Will retry with refinements")
            previous_feedback = eval_result["feedback"]

        if attempt < MAX_ATTEMPTS:
            time.sleep(RETRY_DELAY)

    # Final status
    if result["status"] == "pending":
        result["status"] = "max_attempts_reached"
        # Keep best attempt
        best = max(result["attempts"], key=lambda x: x.get("score", 0) or 0)
        if best.get("image_path"):
            result["final_image"] = best["image_path"]
            result["final_score"] = best.get("score")

    return result


def generate_batch_mode(
    lesson: dict,
    chapters: list,
    session_dir: Path,
    threshold: int = DEFAULT_THRESHOLD,
    prompt_model: str = PROMPT_GEN_MODEL
) -> list:
    """
    Generate images in batched mode to minimize model switching.

    Instead of switching models per-chapter, this keeps each model loaded
    while processing all work for that stage:
    1. Generate ALL prompts (GPT-OS stays loaded)
    2. Generate ALL images (Flux stays loaded)
    3. Evaluate ALL images first pass (Llama Vision stays loaded)
    4. Evaluate passing images second pass (Qwen VL stays loaded)
    5. Collect failures and repeat for refinement rounds
    """

    era = lesson.get("era", "historical")
    results = []

    # Initialize tracking for all chapters
    chapter_data = []
    for i, chapter in enumerate(chapters, 1):
        chapter_data.append({
            "chapter_num": i,
            "chapter": chapter,
            "era_props": None,
            "prompt": None,
            "image_path": None,
            "score": None,
            "status": "pending",
            "feedback": None,
            "attempts": [],
            "current_attempt": 0
        })

    for round_num in range(1, MAX_ATTEMPTS + 1):
        pending = [c for c in chapter_data if c["status"] == "pending"]
        if not pending:
            break

        print(f"\n{'='*60}")
        print(f"ROUND {round_num}/{MAX_ATTEMPTS} - Processing {len(pending)} chapters")
        print("="*60)

        # ===== PHASE 1: Generate all prompts with GPT-OS =====
        print(f"\n[PHASE 1] Generating prompts with {prompt_model}...")
        for data in pending:
            chapter_num = data["chapter_num"]
            chapter = data["chapter"]
            previous_feedback = data["feedback"]

            print(f"  Chapter {chapter_num}: {chapter['title'][:40]}...", end=" ")

            # Generate era props
            era_props = generate_era_props_json(lesson, chapter, prompt_model)
            data["era_props"] = era_props

            # Generate Flux prompt
            flux_prompt = generate_flux_prompt(era_props, previous_feedback, prompt_model)
            data["prompt"] = flux_prompt
            print("done")

        print(f"  Generated {len(pending)} prompts")

        # ===== PHASE 2: Generate all images with Flux =====
        print(f"\n[PHASE 2] Generating images with Flux...")
        for data in pending:
            chapter_num = data["chapter_num"]
            data["current_attempt"] += 1
            attempt = data["current_attempt"]

            print(f"  Chapter {chapter_num} (attempt {attempt}):", end=" ")

            output_prefix = f"lesson_{lesson['id'].split('-')[-1]}_ch{chapter_num}_v{attempt}"
            image_path = generate_image_comfyui(data["prompt"], output_prefix)

            if image_path:
                # Copy to session directory
                dest_path = session_dir / f"chapter_{chapter_num}_v{attempt}.png"
                shutil.copy(image_path, dest_path)
                data["image_path"] = str(dest_path)

                data["attempts"].append({
                    "attempt": attempt,
                    "prompt": data["prompt"],
                    "image_path": str(dest_path),
                    "status": "generated"
                })
            else:
                print("  FAILED to generate")
                data["attempts"].append({
                    "attempt": attempt,
                    "status": "generation_failed"
                })

        generated = [c for c in pending if c.get("image_path")]
        print(f"  Generated {len(generated)}/{len(pending)} images")

        # ===== PHASE 3: First pass evaluation with Llama Vision =====
        print(f"\n[PHASE 3] First pass evaluation with {FIRST_PASS_MODEL}...")
        to_evaluate = [c for c in pending if c.get("image_path")]

        for data in to_evaluate:
            chapter_num = data["chapter_num"]
            print(f"  Chapter {chapter_num}:", end=" ")

            first_pass = evaluate_image(data["image_path"], FIRST_PASS_MODEL, era, strict=False)
            data["first_pass_score"] = first_pass["score"]
            data["feedback"] = first_pass.get("justification", "")

            if first_pass["error"]:
                print(f"ERROR: {first_pass['error']}")
                data["status"] = "error"
            else:
                print(f"Score: {first_pass['score']}")

                # Update attempt record
                if data["attempts"]:
                    data["attempts"][-1]["first_pass_score"] = first_pass["score"]

        # ===== PHASE 4: Second pass for passing images with Qwen VL =====
        passing_first = [c for c in to_evaluate if c.get("first_pass_score", 0) >= threshold]
        if passing_first:
            print(f"\n[PHASE 4] Second pass evaluation with {SECOND_PASS_MODEL}...")

            for data in passing_first:
                chapter_num = data["chapter_num"]
                print(f"  Chapter {chapter_num}:", end=" ")

                second_pass = evaluate_image(data["image_path"], SECOND_PASS_MODEL, era, strict=True)

                if second_pass["error"]:
                    print(f"ERROR: {second_pass['error']}")
                    # Still count as borderline if first pass was good
                    data["score"] = data["first_pass_score"]
                    data["status"] = "borderline"
                else:
                    print(f"Score: {second_pass['score']}")
                    data["score"] = (data["first_pass_score"] + second_pass["score"]) // 2
                    data["feedback"] = second_pass.get("justification", "")

                    if second_pass["score"] >= threshold:
                        data["status"] = "accepted"
                        print(f"    -> ACCEPTED (avg: {data['score']})")
                    else:
                        data["status"] = "borderline"
                        print(f"    -> BORDERLINE (avg: {data['score']})")

                if data["attempts"]:
                    data["attempts"][-1]["second_pass_score"] = second_pass.get("score")
                    data["attempts"][-1]["final_score"] = data["score"]
                    data["attempts"][-1]["status"] = data["status"]
        else:
            print(f"\n[PHASE 4] No images passed first pass threshold ({threshold})")

        # Mark failures as pending for next round
        for data in to_evaluate:
            if data["status"] == "pending":
                # Failed first pass, will retry
                data["score"] = data.get("first_pass_score", 0)
                if data["attempts"]:
                    data["attempts"][-1]["final_score"] = data["score"]
                    data["attempts"][-1]["status"] = "rejected"

        # Summary for this round
        accepted = sum(1 for c in chapter_data if c["status"] == "accepted")
        borderline = sum(1 for c in chapter_data if c["status"] == "borderline")
        pending_count = sum(1 for c in chapter_data if c["status"] == "pending")

        print(f"\n  Round {round_num} summary: {accepted} accepted, {borderline} borderline, {pending_count} pending")

    # Build final results
    for data in chapter_data:
        result = {
            "chapter": data["chapter_num"],
            "title": data["chapter"]["title"],
            "status": data["status"] if data["status"] != "pending" else "max_attempts_reached",
            "final_image": data.get("image_path"),
            "final_score": data.get("score"),
            "attempts": data["attempts"]
        }
        results.append(result)

    return results


def organize_outputs(session_dir: Path, results: list):
    """Organize generated images into keepers and fails folders."""
    keepers_dir = session_dir / "keepers"
    fails_dir = session_dir / "fails"
    keepers_dir.mkdir(exist_ok=True)
    fails_dir.mkdir(exist_ok=True)

    for result in results:
        if not result.get("final_image"):
            continue

        src = Path(result["final_image"])
        if not src.exists():
            continue

        if result["status"] == "accepted":
            dest = keepers_dir / src.name
        else:
            dest = fails_dir / src.name

        shutil.copy(src, dest)

        # Also save the result JSON
        json_path = dest.with_suffix(".json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2)


def generate_summary_report(session_dir: Path, results: list, lesson: dict, threshold: int = DEFAULT_THRESHOLD, prompt_model: str = PROMPT_GEN_MODEL):
    """Generate a summary JSON report."""
    summary = {
        "session_id": session_dir.name,
        "generated_at": datetime.now().isoformat(),
        "lesson": {
            "id": lesson.get("id"),
            "title": lesson.get("title"),
            "era": lesson.get("era")
        },
        "settings": {
            "threshold": threshold,
            "max_attempts": MAX_ATTEMPTS,
            "prompt_model": prompt_model,
            "first_pass_model": FIRST_PASS_MODEL,
            "second_pass_model": SECOND_PASS_MODEL
        },
        "summary": {
            "total_chapters": len(results),
            "accepted": sum(1 for r in results if r["status"] == "accepted"),
            "borderline": sum(1 for r in results if r["status"] == "borderline"),
            "failed": sum(1 for r in results if r["status"] in ("rejected", "max_attempts_reached")),
            "errors": sum(1 for r in results if r["status"] == "error")
        },
        "results": results
    }

    report_path = session_dir / "generation_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    return report_path


# ==============================================================================
# MAIN
# ==============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Generate historically accurate images for lesson chapters"
    )
    parser.add_argument(
        "--lesson", "-l",
        type=int,
        help="Lesson number to process"
    )
    parser.add_argument(
        "--chapter", "-c",
        type=int,
        help="Specific chapter to process (default: all chapters)"
    )
    parser.add_argument(
        "--text-file", "-f",
        type=str,
        help="Path to lesson text file"
    )
    parser.add_argument(
        "--threshold", "-t",
        type=int,
        default=DEFAULT_THRESHOLD,
        help=f"Score threshold for acceptance (default: {DEFAULT_THRESHOLD})"
    )
    parser.add_argument(
        "--prompt-model", "-m",
        type=str,
        default=PROMPT_GEN_MODEL,
        help=f"Ollama model for prompt generation (default: {PROMPT_GEN_MODEL})"
    )
    parser.add_argument(
        "--batch", "-b",
        action="store_true",
        help="Use batch mode to minimize model switching (recommended for multiple chapters)"
    )
    parser.add_argument(
        "--image-model", "-i",
        type=str,
        choices=["flux", "zimage"],
        default="flux",
        help="Image generation model: 'flux' (default, 20 steps) or 'zimage' (faster, 8 steps)"
    )

    args = parser.parse_args()

    # Set global image model
    global IMAGE_MODEL
    IMAGE_MODEL = args.image_model

    model_name = "Z-Image Turbo" if IMAGE_MODEL == "zimage" else "FluxDev"
    print("=" * 60)
    print("HISTORICAL IMAGE GENERATION LOOP")
    print(f"{model_name} + Ollama VLM Pipeline")
    print("=" * 60)

    # Check prerequisites
    print("\nChecking prerequisites...")

    if not check_ollama_available():
        print("ERROR: Ollama server not available at", OLLAMA_URL)
        print("Start with: ollama serve")
        sys.exit(1)
    print(f"  [OK] Ollama server")

    # Check required models
    prompt_model = args.prompt_model
    required_models = [prompt_model, FIRST_PASS_MODEL, SECOND_PASS_MODEL]
    for model in required_models:
        if not check_model_available(model):
            print(f"ERROR: Model not available: {model}")
            print(f"Install with: ollama pull {model}")
            sys.exit(1)
        print(f"  [OK] Model: {model}")

    if not check_comfyui_available():
        print("WARNING: ComfyUI server not available at", COMFYUI_URL)
        print("Make sure ComfyUI is running with the Flux model loaded")
        response = input("Continue anyway? (y/n): ")
        if response.lower() != 'y':
            sys.exit(1)
    else:
        print(f"  [OK] ComfyUI server")

    # Load lesson
    print("\nLoading lesson...")
    lesson = None

    if args.text_file:
        with open(args.text_file, "r", encoding="utf-8") as f:
            text = f.read()
        lesson = parse_lesson_text(text, args.lesson or 0)
    elif args.lesson:
        lesson = load_lesson_from_json(args.lesson)
        if not lesson:
            lesson = load_lesson_from_exports(args.lesson)

    if not lesson or not lesson.get("chapters"):
        print("ERROR: Could not load lesson or no chapters found")
        print("Usage: python scripts/historical_image_gen_loop.py --lesson 1")
        sys.exit(1)

    print(f"  Lesson: {lesson.get('title', 'Unknown')}")
    print(f"  Era: {lesson.get('era', 'Unknown')}")
    print(f"  Chapters: {len(lesson['chapters'])}")

    # Create session directory
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    session_dir = OUTPUT_DIR / f"session_{timestamp}"
    session_dir.mkdir(parents=True, exist_ok=True)
    print(f"\nOutput directory: {session_dir}")

    # Process chapters
    chapters_to_process = lesson["chapters"]
    if args.chapter:
        if 1 <= args.chapter <= len(chapters_to_process):
            chapters_to_process = [chapters_to_process[args.chapter - 1]]
        else:
            print(f"ERROR: Invalid chapter number. Valid range: 1-{len(lesson['chapters'])}")
            sys.exit(1)

    # Choose processing mode
    if args.batch or len(chapters_to_process) > 1:
        # Batch mode: minimize model switching by processing all chapters per phase
        print(f"\nUsing BATCH MODE (minimizes model switching)")
        results = generate_batch_mode(
            lesson, chapters_to_process, session_dir, args.threshold, prompt_model
        )
    else:
        # Single chapter mode: original per-chapter processing
        results = []
        for i, chapter in enumerate(chapters_to_process, 1):
            chapter_num = args.chapter if args.chapter else i
            print(f"\n{'='*60}")
            print(f"Chapter {chapter_num}: {chapter['title']}")
            print("=" * 60)

            result = generate_chapter_image(
                lesson, chapter, chapter_num, session_dir, args.threshold, prompt_model
            )
            results.append(result)

    # Organize outputs
    print("\nOrganizing outputs...")
    organize_outputs(session_dir, results)

    # Generate report
    report_path = generate_summary_report(session_dir, results, lesson, args.threshold, prompt_model)

    # Print summary
    print("\n" + "=" * 60)
    print("GENERATION COMPLETE")
    print("=" * 60)

    accepted = sum(1 for r in results if r["status"] == "accepted")
    borderline = sum(1 for r in results if r["status"] == "borderline")
    failed = sum(1 for r in results if r["status"] in ("rejected", "max_attempts_reached"))

    print(f"\nResults:")
    print(f"  Accepted (keepers): {accepted}")
    print(f"  Borderline: {borderline}")
    print(f"  Failed/Max attempts: {failed}")

    print(f"\nOutput directory: {session_dir}")
    print(f"  keepers/  - Accepted images")
    print(f"  fails/    - Failed images with notes")
    print(f"Report: {report_path}")


if __name__ == "__main__":
    main()
