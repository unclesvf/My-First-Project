"""
Image Prompt Generator for History Lessons
Generates image prompts for Grok Imagine or Nano Banana Pro (Gemini) from history lesson files.
Supports manual copy/paste mode OR automated API generation with authenticity verification.
"""

import json
import re
import os
import glob
import base64
import shutil
import argparse
import time
from datetime import datetime

# Configuration
SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPTS_DIR)
OUTPUT_DIR = os.path.join(PROJECT_DIR, "generated_images")
PROJECT_IMAGES_DIR = os.path.join(PROJECT_DIR, "public", "images", "lessons")

# Gemini API Configuration
GEMINI_API_KEY_ENV = "GEMINI_API_KEY"
GEMINI_MODELS = {
    "flash": "gemini-2.0-flash-exp",  # Speed optimized
    "pro": "gemini-2.0-flash-exp"     # For image generation (update when gemini-3-pro-image available)
}

# Auto-regeneration settings
MAX_REGENERATION_ATTEMPTS = 3
MIN_AUTHENTICITY_SCORE = 7  # Minimum score to pass (1-10)
API_DELAY_SECONDS = 7  # Delay between API calls to avoid rate limits


def check_gemini_sdk():
    """Check if the Google GenAI SDK is installed."""
    try:
        from google import genai
        return True
    except ImportError:
        return False


def get_gemini_client():
    """Initialize and return a Gemini client."""
    api_key = os.environ.get(GEMINI_API_KEY_ENV)
    if not api_key:
        print(f"\nError: {GEMINI_API_KEY_ENV} environment variable not set.")
        print("Get your API key at: https://aistudio.google.com/apikey")
        print(f"Then set it: set {GEMINI_API_KEY_ENV}=your_key_here")
        return None

    from google import genai
    client = genai.Client(api_key=api_key)
    return client


def find_lesson_files():
    """Find all available lesson files in the project."""
    lesson_files = []

    # Check scripts folder for .txt files
    scripts_txt = glob.glob(os.path.join(SCRIPTS_DIR, "*.txt"))
    for f in scripts_txt:
        lesson_files.append(("scripts", os.path.basename(f), f))

    # Check data folder
    data_dir = os.path.join(PROJECT_DIR, "data")
    if os.path.exists(data_dir):
        data_txt = glob.glob(os.path.join(data_dir, "*.txt"))
        for f in data_txt:
            lesson_files.append(("data", os.path.basename(f), f))

    # Check for any other lesson directories
    lessons_dir = os.path.join(PROJECT_DIR, "lessons")
    if os.path.exists(lessons_dir):
        lessons_txt = glob.glob(os.path.join(lessons_dir, "**/*.txt"), recursive=True)
        for f in lessons_txt:
            rel_path = os.path.relpath(f, PROJECT_DIR)
            lesson_files.append(("lessons", rel_path, f))

    return lesson_files


def select_lesson_file(lesson_files):
    """Interactive menu to select a lesson file."""
    print("\n" + "="*60)
    print("HISTORY LESSON IMAGE PROMPT GENERATOR")
    print("="*60)
    print("\nAvailable lesson files:\n")

    for i, (folder, name, path) in enumerate(lesson_files, 1):
        print(f"  [{i}] {folder}/{name}")

    print(f"\n  [0] Enter custom file path")
    print()

    while True:
        try:
            choice = input("Select a lesson file (enter number): ").strip()
            if choice == "0":
                custom_path = input("Enter the full path to your lesson file: ").strip()
                if os.path.exists(custom_path):
                    return custom_path
                else:
                    print("File not found. Please try again.")
            else:
                idx = int(choice) - 1
                if 0 <= idx < len(lesson_files):
                    return lesson_files[idx][2]
                else:
                    print(f"Please enter a number between 1 and {len(lesson_files)}")
        except ValueError:
            print("Please enter a valid number.")


def select_platform():
    """Select output platform."""
    print("\n" + "-"*40)
    print("Select output platform:\n")
    print("  [1] Grok Imagine (manual copy/paste)")
    print("  [2] Nano Banana Pro / Gemini (manual copy/paste)")
    print("  [3] Gemini API (automated generation)")
    print()

    while True:
        choice = input("Enter your choice (1/2/3): ").strip()
        if choice in ("1", "2", "3"):
            return choice
        print("Please enter 1, 2, or 3.")


def parse_chapters(history_text):
    """Parse the lesson text into chapters."""
    chapters = []
    current_title = None
    current_content = []
    lines = history_text.split('\n')

    for line in lines:
        stripped = line.strip()
        # Match chapter headers: "### CHAPTER X:", "Chapter X:", "Lesson X:", numbered headings
        if re.match(r'^(#{1,3}\s*)?(Chapter|Lesson|\d+\.?\s+)', stripped, re.IGNORECASE):
            if current_title is not None and current_content:
                chapters.append({
                    'title': current_title,
                    'content': '\n'.join(current_content).strip()
                })
            # Clean up the title
            current_title = re.sub(r'^#{1,3}\s*', '', stripped).strip()
            current_content = []
        elif current_title is not None:
            current_content.append(line)

    # Don't forget the last chapter
    if current_title is not None and current_content:
        chapters.append({
            'title': current_title,
            'content': '\n'.join(current_content).strip()
        })

    # If no chapters found, treat entire text as one
    if not chapters and history_text.strip():
        chapters.append({
            'title': 'Untitled Lesson',
            'content': history_text.strip()
        })

    return chapters


def generate_nano_banana_prompt(title, content):
    """Generate a Nano Banana Pro / Gemini optimized prompt."""
    content_summary = content[:300].strip() + '...' if len(content) > 300 else content
    base_desc = f"the key historical scene from {title}: {content_summary}"

    prompt = (
        f"Generate a photorealistic image capturing {base_desc}. "
        "Ensure all elements are era-appropriate, with detailed depictions of clothing, architecture, tools, and cultural contexts. "
        "Composition: wide-angle shot emphasizing the central historical event or figure, with balanced foreground and background elements. "
        "Lighting: era-specific, such as soft golden hour sunlight filtering through ancient structures, casting long realistic shadows. "
        "Camera: 85mm portrait lens for sharp focus on key details, soft bokeh background. "
        "Details: period clothing with authentic patterns, architectural features true to the era, environmental elements consistent with historical records. "
        "Mood: immersive and educational, vibrant yet muted color palette reflective of natural dyes. "
        "Quality: 8K resolution, ultra-detailed textures, realistic proportions, no anachronisms. "
        "Masterpiece-level detail, sharp focus, cinematic depth."
    )
    return prompt


def generate_grok_prompt(title, content):
    """Generate a Grok Imagine optimized prompt."""
    content_summary = content[:300].strip() + '...' if len(content) > 300 else content
    base_desc = f"the key historical scene from {title}: {content_summary}"

    prompt = (
        f"Create a highly detailed image of {base_desc}. "
        "Style: photorealistic with cinematic feel, like a frame from a historical documentary. "
        "Focus: one central visual idea - the main event or figure in sharp detail, surrounded by authentic environment. "
        "Composition: wide-angle shot, aspect ratio 16:9. "
        "Atmosphere: dramatic natural daylight or torchlight appropriate to era, soft shadows, earth tones with muted blues and golds. "
        "Textures: rough-hewn wood, aged leather, stone carvings - everything feels lived-in and period-accurate. "
        "Mood: immersive and reflective, highlighting cultural nuances. "
        "Avoid: modern elements, anachronisms, electricity, contemporary clothing, unnatural distortions, busy backgrounds, cartoonish styles. "
        "Quality: 8K resolution, masterpiece with intricate details, vibrant yet realistic colors, perfect lighting."
    )
    return prompt


def display_prompt(chapter_num, total_chapters, title, prompt, platform_name):
    """Display a single prompt formatted for easy copy/paste."""
    print("\n" + "="*60)
    print(f"PROMPT {chapter_num}/{total_chapters} - {platform_name}")
    print(f"Chapter: {title}")
    print("="*60)
    print("\n--- COPY BELOW THIS LINE ---\n")
    print(prompt)
    print("\n--- COPY ABOVE THIS LINE ---\n")


def run_interactive_prompt_session(chapters, platform_choice):
    """Run an interactive session showing prompts one at a time."""
    total = len(chapters)
    current = 0

    print(f"\nFound {total} chapters. Generating prompts...\n")
    print("Navigation: [Enter]=Next  [p]=Previous  [j]=Jump to #  [q]=Quit")
    print("-"*60)

    while True:
        chapter = chapters[current]
        title = chapter['title']
        content = chapter['content']

        if platform_choice == "1":
            prompt = generate_grok_prompt(title, content)
            display_prompt(current + 1, total, title, prompt, "GROK IMAGINE")
        else:
            prompt = generate_nano_banana_prompt(title, content)
            display_prompt(current + 1, total, title, prompt, "NANO BANANA PRO")

        # Navigation
        print("-"*60)
        nav = input(f"[{current+1}/{total}] Enter=Next, p=Prev, j=Jump, q=Quit: ").strip().lower()

        if nav == "" or nav == "n":
            if current < total - 1:
                current += 1
            else:
                print("\nYou've reached the last chapter!")
                again = input("Start over? (y/n): ").strip().lower()
                if again == 'y':
                    current = 0
                else:
                    print("\nDone! Happy image generating!")
                    break
        elif nav == "p":
            if current > 0:
                current -= 1
            else:
                print("Already at the first chapter.")
        elif nav == "j":
            try:
                jump_to = int(input(f"Enter chapter number (1-{total}): ").strip())
                if 1 <= jump_to <= total:
                    current = jump_to - 1
                else:
                    print(f"Please enter a number between 1 and {total}")
            except ValueError:
                print("Invalid number.")
        elif nav == "q":
            print("\nExiting. Happy image generating!")
            break


# =============================================================================
# GEMINI API INTEGRATION
# =============================================================================

def generate_image_with_gemini(client, prompt, aspect_ratio="16:9"):
    """Generate an image using the Gemini API."""
    from google.genai import types

    # Rate limiting delay
    time.sleep(API_DELAY_SECONDS)

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT', 'IMAGE']
            )
        )

        # Extract image from response
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data') and part.inline_data:
                return {
                    'success': True,
                    'image_data': part.inline_data.data,
                    'mime_type': part.inline_data.mime_type,
                    'text': None
                }
            elif hasattr(part, 'text') and part.text:
                # Sometimes only text is returned
                pass

        return {'success': False, 'error': 'No image in response'}

    except Exception as e:
        return {'success': False, 'error': str(e)}


def verify_historical_authenticity(client, image_data, chapter_title, chapter_content):
    """Use Gemini to verify if the generated image is historically authentic."""
    from google.genai import types

    # Rate limiting delay
    time.sleep(API_DELAY_SECONDS)

    verification_prompt = f"""You are a historical accuracy expert reviewing an AI-generated image for a 7th grade history lesson.

Chapter: {chapter_title}
Historical Context: {chapter_content[:500]}

Analyze this image for historical authenticity. Check for:
1. ANACHRONISMS: Any objects, clothing, architecture, or technology that doesn't belong in the depicted era
2. CULTURAL ACCURACY: Are cultural elements (dress, customs, settings) appropriate for the time and place?
3. ARCHITECTURAL ACCURACY: Do buildings and structures match the historical period?
4. OVERALL AUTHENTICITY: Does the image feel true to the historical period?

Provide your assessment in this EXACT format (use these exact labels):
AUTHENTICITY_SCORE: [number 1-10, where 10 is perfectly accurate]
ANACHRONISMS_FOUND: [List any historical inaccuracies, or "None" if none found]
RECOMMENDATIONS: [Specific suggestions for improvement, or "None" if score >= 8]
VERDICT: [APPROVED or NEEDS_REVISION or REJECTED]
"""

    try:
        # Create image part from base64 data
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=[
                {
                    "parts": [
                        {"text": verification_prompt},
                        {
                            "inline_data": {
                                "mime_type": "image/png",
                                "data": image_data
                            }
                        }
                    ]
                }
            ]
        )

        analysis_text = response.text

        # Parse the structured response
        score = None
        verdict = None
        anachronisms = None
        recommendations = None

        for line in analysis_text.split('\n'):
            line = line.strip()
            if line.startswith('AUTHENTICITY_SCORE:'):
                try:
                    score_str = line.split(':')[1].strip()
                    # Extract just the number
                    score = int(''.join(c for c in score_str.split()[0] if c.isdigit()))
                except:
                    score = None
            elif line.startswith('VERDICT:'):
                verdict = line.split(':')[1].strip().upper()
            elif line.startswith('ANACHRONISMS_FOUND:'):
                anachronisms = line.split(':', 1)[1].strip()
            elif line.startswith('RECOMMENDATIONS:'):
                recommendations = line.split(':', 1)[1].strip()

        return {
            'success': True,
            'analysis': analysis_text,
            'score': score,
            'verdict': verdict,
            'anachronisms': anachronisms,
            'recommendations': recommendations
        }

    except Exception as e:
        return {'success': False, 'error': str(e)}


def refine_prompt_with_feedback(original_prompt, anachronisms, recommendations):
    """Refine the image generation prompt based on authenticity feedback."""
    refinements = []

    if anachronisms and anachronisms.lower() != 'none':
        refinements.append(f"CRITICAL: Avoid these anachronisms from previous attempt: {anachronisms}")

    if recommendations and recommendations.lower() != 'none':
        refinements.append(f"IMPORTANT improvements needed: {recommendations}")

    if refinements:
        refined_prompt = original_prompt + " " + " ".join(refinements)
        return refined_prompt

    return original_prompt


def generate_with_authenticity_check(client, chapter, session_dir, chapter_num):
    """Generate an image and verify authenticity, with auto-regeneration on failure."""
    title = chapter['title']
    content = chapter['content']

    base_prompt = generate_nano_banana_prompt(title, content)
    current_prompt = base_prompt
    attempts = []

    for attempt in range(1, MAX_REGENERATION_ATTEMPTS + 1):
        print(f"\n  Attempt {attempt}/{MAX_REGENERATION_ATTEMPTS}...")

        # Generate image
        print(f"  Generating image...")
        result = generate_image_with_gemini(client, current_prompt)

        if not result['success']:
            print(f"  Generation failed: {result['error']}")
            attempts.append({
                'attempt': attempt,
                'status': 'generation_failed',
                'error': result['error']
            })
            continue

        # Save the image (even if it might fail authenticity)
        safe_title = re.sub(r'[^\w\s-]', '', title)[:30].strip().replace(' ', '_')
        filename = f"chapter_{chapter_num}_{safe_title}_v{attempt}.png"
        filepath = save_image(result['image_data'], filename, session_dir)
        print(f"  Image saved: {filepath}")

        # Verify authenticity
        print(f"  Verifying historical authenticity...")
        verification = verify_historical_authenticity(client, result['image_data'], title, content)

        if not verification['success']:
            print(f"  Verification failed: {verification['error']}")
            attempts.append({
                'attempt': attempt,
                'status': 'verification_failed',
                'image_path': filepath,
                'error': verification['error']
            })
            continue

        score = verification.get('score')
        verdict = verification.get('verdict', '').upper()

        print(f"\n  --- AUTHENTICITY ANALYSIS (Attempt {attempt}) ---")
        print(f"  Score: {score}/10")
        print(f"  Verdict: {verdict}")
        if verification.get('anachronisms'):
            print(f"  Anachronisms: {verification['anachronisms']}")
        if verification.get('recommendations'):
            print(f"  Recommendations: {verification['recommendations']}")
        print(f"  {'='*45}")

        attempts.append({
            'attempt': attempt,
            'status': 'verified',
            'image_path': filepath,
            'score': score,
            'verdict': verdict,
            'analysis': verification['analysis'],
            'anachronisms': verification.get('anachronisms'),
            'recommendations': verification.get('recommendations')
        })

        # Check if approved
        is_approved = (
            verdict == 'APPROVED' or
            (score is not None and score >= MIN_AUTHENTICITY_SCORE)
        )

        if is_approved:
            print(f"\n  APPROVED - Image passed authenticity check!")
            return {
                'chapter': chapter_num,
                'title': title,
                'status': 'approved',
                'final_image': filepath,
                'final_score': score,
                'attempts': attempts,
                'total_attempts': attempt
            }

        # Not approved - refine prompt for next attempt
        if attempt < MAX_REGENERATION_ATTEMPTS:
            print(f"\n  Image needs revision. Refining prompt for next attempt...")
            current_prompt = refine_prompt_with_feedback(
                base_prompt,
                verification.get('anachronisms'),
                verification.get('recommendations')
            )

    # All attempts exhausted
    print(f"\n  MAX ATTEMPTS REACHED - Best available image saved.")

    # Find the best attempt (highest score)
    best_attempt = max(
        [a for a in attempts if a.get('score') is not None],
        key=lambda x: x.get('score', 0),
        default=attempts[-1] if attempts else None
    )

    return {
        'chapter': chapter_num,
        'title': title,
        'status': 'max_attempts_reached',
        'final_image': best_attempt.get('image_path') if best_attempt else None,
        'final_score': best_attempt.get('score') if best_attempt else None,
        'attempts': attempts,
        'total_attempts': len(attempts)
    }


def save_image(image_data, filename, output_dir):
    """Save base64 image data to file."""
    os.makedirs(output_dir, exist_ok=True)
    filepath = os.path.join(output_dir, filename)

    # Decode if it's base64 string
    if isinstance(image_data, str):
        image_bytes = base64.b64decode(image_data)
    else:
        image_bytes = image_data

    with open(filepath, 'wb') as f:
        f.write(image_bytes)

    return filepath


def run_api_generation_session(chapters, selected_file, lesson_name=None, batch_mode=False, auto_integrate=False):
    """Run automated image generation using Gemini API with auto-regeneration."""
    if not check_gemini_sdk():
        print("\nError: Google GenAI SDK not installed.")
        print("Install it with: pip install google-genai")
        return

    client = get_gemini_client()
    if not client:
        return

    # Get lesson name for organizing images
    default_lesson_name = os.path.splitext(os.path.basename(selected_file))[0]
    if lesson_name is None:
        print(f"\n{'='*60}")
        print("LESSON CONFIGURATION")
        print(f"{'='*60}")
        lesson_name = input(f"Enter lesson name [{default_lesson_name}]: ").strip()
        if not lesson_name:
            lesson_name = default_lesson_name
    else:
        print(f"\nLesson name: {lesson_name}")

    total = len(chapters)
    print(f"\nFound {total} chapters. Starting API generation...\n")
    print(f"Settings: Max {MAX_REGENERATION_ATTEMPTS} attempts per image, min score {MIN_AUTHENTICITY_SCORE}/10")

    if batch_mode:
        mode = 'a'
        print("\nBatch mode: Generating all chapters automatically...")
    else:
        print("\nOptions: [a]=Generate All  [s]=Step through one by one  [q]=Quit")
        mode = input("Select mode: ").strip().lower()

        if mode == 'q':
            return

    # Create output directory with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    session_dir = os.path.join(OUTPUT_DIR, f"session_{timestamp}")
    os.makedirs(session_dir, exist_ok=True)

    results = []

    for i, chapter in enumerate(chapters):
        title = chapter['title']

        print(f"\n{'='*60}")
        print(f"CHAPTER {i+1}/{total}: {title}")
        print("="*60)

        if mode == 's':
            proceed = input("\nGenerate image for this chapter? (y/n/q): ").strip().lower()
            if proceed == 'q':
                break
            if proceed != 'y':
                continue

        # Generate with auto-regeneration on failed authenticity
        result = generate_with_authenticity_check(client, chapter, session_dir, i + 1)
        results.append(result)

        # Show result summary for this chapter
        if result['status'] == 'approved':
            print(f"\n  Result: APPROVED (Score: {result['final_score']}/10, Attempts: {result['total_attempts']})")
        else:
            print(f"\n  Result: {result['status'].upper()} (Best Score: {result['final_score']}/10, Attempts: {result['total_attempts']})")

        if mode == 's':
            input("\nPress Enter to continue...")

    # Save results summary
    summary_path = os.path.join(session_dir, "generation_summary.json")
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    # Generate final report
    print(f"\n{'='*60}")
    print("GENERATION COMPLETE")
    print(f"{'='*60}")
    print(f"Images saved to: {session_dir}")
    print(f"Summary saved to: {summary_path}")

    # Statistics
    approved = sum(1 for r in results if r['status'] == 'approved')
    max_attempts = sum(1 for r in results if r['status'] == 'max_attempts_reached')
    failed = sum(1 for r in results if r['status'] not in ('approved', 'max_attempts_reached'))
    total_attempts = sum(r.get('total_attempts', 0) for r in results)

    print(f"\n--- SUMMARY ---")
    print(f"Approved (score >= {MIN_AUTHENTICITY_SCORE}): {approved}/{len(results)}")
    print(f"Best effort (max attempts): {max_attempts}/{len(results)}")
    print(f"Failed: {failed}/{len(results)}")
    print(f"Total API calls: {total_attempts}")

    # List any chapters that need manual review
    needs_review = [r for r in results if r['status'] != 'approved']
    if needs_review:
        print(f"\n--- NEEDS MANUAL REVIEW ---")
        for r in needs_review:
            print(f"  Chapter {r['chapter']}: {r['title']} (Score: {r.get('final_score', 'N/A')})")

    # Copy approved images to 'approved' subfolder
    approved_dir = os.path.join(session_dir, "approved")
    if approved:
        os.makedirs(approved_dir, exist_ok=True)
        for r in results:
            if r['status'] == 'approved' and r.get('final_image'):
                src = r['final_image']
                # Rename to clean filename without version number
                safe_title = re.sub(r'[^\w\s-]', '', r['title'])[:30].strip().replace(' ', '_')
                dst = os.path.join(approved_dir, f"chapter_{r['chapter']}_{safe_title}.png")
                shutil.copy2(src, dst)
        print(f"\nApproved images copied to: {approved_dir}")

    # Offer to integrate into project
    if approved:
        if auto_integrate:
            print(f"\n{'='*60}")
            print("Auto-integrating approved images into project...")
            integrate_images_to_project(results, lesson_name)
        else:
            print(f"\n{'='*60}")
            integrate = input("Integrate approved images into project? (y/n): ").strip().lower()
            if integrate == 'y':
                integrate_images_to_project(results, lesson_name)


def integrate_images_to_project(results, lesson_name):
    """Copy approved images to the project's public/images/lessons folder."""
    approved_results = [r for r in results if r['status'] == 'approved' and r.get('final_image')]

    if not approved_results:
        print("\nNo approved images to integrate.")
        return None

    # Create lesson-specific folder
    safe_lesson_name = re.sub(r'[^\w\s-]', '', lesson_name).strip().replace(' ', '-').lower()
    lesson_images_dir = os.path.join(PROJECT_IMAGES_DIR, safe_lesson_name)
    os.makedirs(lesson_images_dir, exist_ok=True)

    integrated = []
    manifest = {
        'lesson': lesson_name,
        'generated': datetime.now().isoformat(),
        'images': []
    }

    print(f"\n{'='*60}")
    print("INTEGRATING IMAGES TO PROJECT")
    print(f"{'='*60}")
    print(f"Destination: {lesson_images_dir}")

    for r in approved_results:
        src = r['final_image']
        chapter_num = r['chapter']
        chapter_title = r['title']

        # Create clean filename
        safe_title = re.sub(r'[^\w\s-]', '', chapter_title)[:40].strip().replace(' ', '-').lower()
        filename = f"chapter-{chapter_num}-{safe_title}.png"
        dst = os.path.join(lesson_images_dir, filename)

        # Copy the file
        shutil.copy2(src, dst)

        # Web path for use in the app
        web_path = f"/images/lessons/{safe_lesson_name}/{filename}"

        print(f"  Chapter {chapter_num}: {filename}")
        print(f"    Web path: {web_path}")

        integrated.append({
            'chapter': chapter_num,
            'title': chapter_title,
            'filename': filename,
            'web_path': web_path,
            'score': r.get('final_score')
        })

        manifest['images'].append({
            'chapter': chapter_num,
            'title': chapter_title,
            'filename': filename,
            'webPath': web_path,
            'authenticityScore': r.get('final_score')
        })

    # Save manifest JSON for easy reference
    manifest_path = os.path.join(lesson_images_dir, "manifest.json")
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)

    print(f"\nManifest saved: {manifest_path}")
    print(f"\nIntegrated {len(integrated)} images to project.")

    # Generate code snippet for easy integration
    print(f"\n{'='*60}")
    print("CODE SNIPPET FOR LESSON DATA")
    print(f"{'='*60}")
    print("\nAdd these image paths to your lesson data:\n")
    print("```javascript")
    print(f"// Images for {lesson_name}")
    print("const chapterImages = {")
    for img in integrated:
        print(f'  {img["chapter"]}: "{img["web_path"]}",')
    print("};")
    print("```\n")

    return {
        'lesson_dir': lesson_images_dir,
        'manifest_path': manifest_path,
        'integrated': integrated
    }


def export_all_prompts(chapters, platform_choice, output_file):
    """Export all prompts to a file for batch processing."""
    with open(output_file, 'w', encoding='utf-8') as f:
        for i, chapter in enumerate(chapters, 1):
            title = chapter['title']
            content = chapter['content']

            f.write(f"\n{'='*60}\n")
            f.write(f"CHAPTER {i}: {title}\n")
            f.write(f"{'='*60}\n\n")

            if platform_choice == "1":
                f.write("--- GROK IMAGINE ---\n\n")
                f.write(generate_grok_prompt(title, content))
            else:
                f.write("--- NANO BANANA PRO ---\n\n")
                f.write(generate_nano_banana_prompt(title, content))
            f.write("\n\n")

    print(f"\nExported all prompts to: {output_file}")


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(
        description="Generate historically accurate images for history lessons"
    )
    parser.add_argument(
        '--file', '-f',
        help='Path to lesson file (skips file selection)'
    )
    parser.add_argument(
        '--lesson-name', '-n',
        help='Name for the lesson (used for organizing images)'
    )
    parser.add_argument(
        '--api', '-a',
        action='store_true',
        help='Use Gemini API mode (automated generation)'
    )
    parser.add_argument(
        '--auto-integrate', '-i',
        action='store_true',
        help='Automatically integrate approved images to project'
    )
    parser.add_argument(
        '--batch', '-b',
        action='store_true',
        help='Batch mode: generate all chapters without prompting'
    )
    parser.add_argument(
        '--api-key', '-k',
        help='Gemini API key (or set GEMINI_API_KEY env var)'
    )

    args = parser.parse_args()

    # Set API key from command line if provided
    if args.api_key:
        os.environ[GEMINI_API_KEY_ENV] = args.api_key

    # Find or use specified lesson file
    if args.file:
        if not os.path.exists(args.file):
            print(f"Error: File not found: {args.file}")
            return
        selected_file = args.file
    else:
        lesson_files = find_lesson_files()

        if not lesson_files:
            print("No lesson files found!")
            print(f"Please add .txt lesson files to: {SCRIPTS_DIR}")
            custom = input("\nOr enter a custom file path (or 'q' to quit): ").strip()
            if custom.lower() == 'q' or not custom:
                return
            if not os.path.exists(custom):
                print("File not found. Exiting.")
                return
            selected_file = custom
        else:
            selected_file = select_lesson_file(lesson_files)

    # Read the lesson file
    print(f"\nLoading: {selected_file}")
    with open(selected_file, 'r', encoding='utf-8') as f:
        history_text = f.read()

    # Parse chapters
    chapters = parse_chapters(history_text)

    if not chapters:
        print("No chapters found in the lesson file!")
        return

    print(f"Found {len(chapters)} chapters.")

    # Determine mode
    if args.api:
        platform_choice = "3"
    else:
        platform_choice = select_platform()

    if platform_choice == "3":
        # Gemini API mode
        run_api_generation_session(
            chapters,
            selected_file,
            lesson_name=args.lesson_name,
            batch_mode=args.batch,
            auto_integrate=args.auto_integrate
        )
    else:
        # Manual mode
        print("\n" + "-"*40)
        print("Select mode:\n")
        print("  [1] Interactive (one prompt at a time)")
        print("  [2] Export all to file")
        print()

        mode = input("Enter your choice (1/2): ").strip()

        if mode == "2":
            output_file = os.path.join(SCRIPTS_DIR, "generated_prompts.txt")
            export_all_prompts(chapters, platform_choice, output_file)
        else:
            run_interactive_prompt_session(chapters, platform_choice)


if __name__ == "__main__":
    main()
