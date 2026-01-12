#!/usr/bin/env python3
"""
Historical Image Accuracy Checker

Two-stage VLM pipeline using Ollama to evaluate AI-generated images for historical accuracy.
- First pass: Llama 3.2 Vision for initial screening
- Second pass: Qwen2.5-VL for detailed evaluation of passing images

Usage:
    python scripts/historical_image_accuracy_checker.py --folder <path> --era "1920s" --threshold 80
    python scripts/historical_image_accuracy_checker.py  # Uses defaults from generated_images/
"""

import argparse
import base64
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

import requests
from PIL import Image

# PDF generation
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

# Configuration
OLLAMA_URL = "http://localhost:11434"
FIRST_PASS_MODEL = "llama3.2-vision:latest"
SECOND_PASS_MODEL = "qwen2.5vl:latest"
DEFAULT_THRESHOLD = 80
SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}


def encode_image_to_base64(image_path: str) -> str:
    """Encode an image file to base64 string."""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


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
            return any(m.get("name", "").startswith(model_name.split(":")[0]) for m in models)
        return False
    except requests.RequestException:
        return False


def evaluate_image(
    image_path: str,
    model: str,
    era: str,
    strict: bool = False
) -> dict:
    """
    Evaluate an image for historical accuracy using a VLM.

    Args:
        image_path: Path to the image file
        model: Ollama model name to use
        era: Historical era description (e.g., "1920s", "Civil War era")
        strict: If True, use stricter evaluation prompt

    Returns:
        dict with 'score', 'justification', 'model', 'error' keys
    """
    result = {
        "score": 0,
        "justification": "",
        "model": model,
        "error": None,
        "timestamp": datetime.now().isoformat()
    }

    # Build the prompt
    if strict:
        prompt = f"""You are a meticulous historical accuracy reviewer. Analyze this image for historical accuracy as a {era} scene.

Be BRUTAL and check EVERY tiny detail:
- Clothing styles, fabrics, and patterns
- Hairstyles and accessories
- Architecture and building materials
- Technology and objects present
- Vehicles, signs, and text
- Color palette and photographic style
- Any anachronistic elements

Rate the historical accuracy from 0 to 100, where:
- 0-30: Major anachronisms, clearly wrong era
- 31-60: Some period-appropriate elements but noticeable issues
- 61-80: Mostly accurate with minor issues
- 81-100: Highly accurate, period-appropriate details

Respond in this exact JSON format:
{{"score": <number 0-100>, "justification": "<detailed explanation of accuracy issues or strengths>"}}"""
    else:
        prompt = f"""Evaluate this image's historical accuracy for a {era} scene.

Consider:
- Clothing and fashion appropriate to the era
- Architecture and setting
- Technology and objects visible
- Overall period authenticity

Rate the historical accuracy from 0 to 100 and explain your reasoning.

Respond in this exact JSON format:
{{"score": <number 0-100>, "justification": "<brief explanation>"}}"""

    try:
        # Encode the image
        image_base64 = encode_image_to_base64(image_path)

        # Make the API request
        payload = {
            "model": model,
            "prompt": prompt,
            "images": [image_base64],
            "stream": False,
            "options": {
                "temperature": 0.1  # Low temperature for consistent scoring
            }
        }

        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json=payload,
            timeout=300  # Vision models can be slow, especially on detailed prompts
        )

        if response.status_code != 200:
            result["error"] = f"API error: {response.status_code}"
            return result

        response_data = response.json()
        response_text = response_data.get("response", "")

        # Parse the JSON response
        # Try to extract JSON from the response
        try:
            # Find JSON in the response
            json_start = response_text.find("{")
            json_end = response_text.rfind("}") + 1
            if json_start != -1 and json_end > json_start:
                json_str = response_text[json_start:json_end]
                parsed = json.loads(json_str)
                result["score"] = int(parsed.get("score", 0))
                result["justification"] = parsed.get("justification", response_text)
            else:
                # Fallback: try to extract score from text
                result["justification"] = response_text
                # Look for patterns like "Score: 75" or "75/100"
                import re
                score_match = re.search(r'(\d{1,3})(?:/100|\s*(?:out of|/)\s*100)?', response_text)
                if score_match:
                    result["score"] = min(100, int(score_match.group(1)))
        except json.JSONDecodeError:
            result["justification"] = response_text
            result["error"] = "Could not parse JSON response"

    except requests.Timeout:
        result["error"] = "Request timed out"
    except requests.RequestException as e:
        result["error"] = f"Request failed: {str(e)}"
    except Exception as e:
        result["error"] = f"Unexpected error: {str(e)}"

    return result


def process_images(
    folder_path: str,
    era: str,
    threshold: int = DEFAULT_THRESHOLD,
    verbose: bool = True
) -> list[dict]:
    """
    Process all images in a folder through the two-stage evaluation pipeline.

    Args:
        folder_path: Path to folder containing images
        era: Historical era description
        threshold: Score threshold for second pass (default 80)
        verbose: Print progress information

    Returns:
        List of result dictionaries for each image
    """
    results = []
    folder = Path(folder_path)

    if not folder.exists():
        print(f"Error: Folder not found: {folder_path}")
        return results

    # Find all image files
    image_files = [
        f for f in folder.iterdir()
        if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS
    ]

    if not image_files:
        print(f"No images found in {folder_path}")
        return results

    if verbose:
        print(f"\nFound {len(image_files)} images to evaluate")
        print(f"Era: {era}")
        print(f"Threshold for second pass: {threshold}")
        print(f"First pass model: {FIRST_PASS_MODEL}")
        print(f"Second pass model: {SECOND_PASS_MODEL}")
        print("-" * 60)

    for i, image_path in enumerate(image_files, 1):
        if verbose:
            print(f"\n[{i}/{len(image_files)}] Processing: {image_path.name}")

        image_result = {
            "filename": image_path.name,
            "filepath": str(image_path),
            "era": era,
            "first_pass": None,
            "second_pass": None,
            "final_score": 0,
            "status": "rejected"
        }

        # First pass evaluation
        if verbose:
            print(f"  First pass ({FIRST_PASS_MODEL})...", end=" ", flush=True)

        first_pass = evaluate_image(str(image_path), FIRST_PASS_MODEL, era, strict=False)
        image_result["first_pass"] = first_pass

        if first_pass["error"]:
            if verbose:
                print(f"ERROR: {first_pass['error']}")
            image_result["status"] = "error"
            results.append(image_result)
            continue

        if verbose:
            print(f"Score: {first_pass['score']}")

        # Check if passes threshold for second evaluation
        if first_pass["score"] >= threshold:
            if verbose:
                print(f"  Second pass ({SECOND_PASS_MODEL})...", end=" ", flush=True)

            second_pass = evaluate_image(str(image_path), SECOND_PASS_MODEL, era, strict=True)
            image_result["second_pass"] = second_pass

            if second_pass["error"]:
                if verbose:
                    print(f"ERROR: {second_pass['error']}")
                # Use first pass score if second pass fails
                image_result["final_score"] = first_pass["score"]
                image_result["status"] = "passed_first_only"
            else:
                if verbose:
                    print(f"Score: {second_pass['score']}")
                # Average the two scores for final
                image_result["final_score"] = (first_pass["score"] + second_pass["score"]) // 2
                image_result["status"] = "keeper" if second_pass["score"] >= threshold else "borderline"
        else:
            image_result["final_score"] = first_pass["score"]
            image_result["status"] = "rejected"

        # Save individual JSON result
        json_path = image_path.with_suffix(".accuracy.json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(image_result, f, indent=2)

        if verbose:
            status_emoji = {
                "keeper": "[PASS]",
                "borderline": "[BORDERLINE]",
                "rejected": "[FAIL]",
                "error": "[ERROR]",
                "passed_first_only": "[PARTIAL]"
            }.get(image_result["status"], "?")
            print(f"  Final: {image_result['final_score']} {status_emoji}")

        results.append(image_result)

    return results


def generate_pdf_report(results: list[dict], output_path: str, era: str) -> None:
    """
    Generate a PDF summary report of all evaluated images.

    Args:
        results: List of evaluation result dictionaries
        output_path: Path for the output PDF file
        era: Historical era description for the report header
    """
    doc = SimpleDocTemplate(output_path, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=18,
        spaceAfter=20,
        alignment=1  # Center
    )
    elements.append(Paragraph("Historical Image Accuracy Report", title_style))
    elements.append(Spacer(1, 10))

    # Summary info
    summary_style = ParagraphStyle(
        'Summary',
        parent=styles['Normal'],
        fontSize=10,
        spaceAfter=5
    )

    keepers = sum(1 for r in results if r["status"] == "keeper")
    borderline = sum(1 for r in results if r["status"] == "borderline")
    rejected = sum(1 for r in results if r["status"] == "rejected")
    errors = sum(1 for r in results if r["status"] in ("error", "passed_first_only"))

    elements.append(Paragraph(f"<b>Era:</b> {era}", summary_style))
    elements.append(Paragraph(f"<b>Generated:</b> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", summary_style))
    elements.append(Paragraph(f"<b>Total Images:</b> {len(results)}", summary_style))
    elements.append(Paragraph(
        f"<b>Results:</b> {keepers} keepers, {borderline} borderline, {rejected} rejected, {errors} errors",
        summary_style
    ))
    elements.append(Spacer(1, 20))

    # Results table
    table_data = [["Image", "First Pass", "Second Pass", "Final", "Status"]]

    for r in sorted(results, key=lambda x: x["final_score"], reverse=True):
        first_score = r["first_pass"]["score"] if r["first_pass"] else "-"
        second_score = r["second_pass"]["score"] if r["second_pass"] else "-"

        # Truncate filename if too long
        filename = r["filename"]
        if len(filename) > 35:
            filename = filename[:32] + "..."

        table_data.append([
            filename,
            str(first_score),
            str(second_score),
            str(r["final_score"]),
            r["status"].upper()
        ])

    table = Table(table_data, colWidths=[3*inch, 0.8*inch, 0.8*inch, 0.6*inch, 1*inch])

    # Table styling
    table_style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ])

    # Color-code rows based on status
    for i, r in enumerate(sorted(results, key=lambda x: x["final_score"], reverse=True), 1):
        if r["status"] == "keeper":
            table_style.add('BACKGROUND', (0, i), (-1, i), colors.lightgreen)
        elif r["status"] == "borderline":
            table_style.add('BACKGROUND', (0, i), (-1, i), colors.lightyellow)
        elif r["status"] == "rejected":
            table_style.add('BACKGROUND', (0, i), (-1, i), colors.lightcoral)
        else:
            table_style.add('BACKGROUND', (0, i), (-1, i), colors.lightgrey)

    table.setStyle(table_style)
    elements.append(table)
    elements.append(Spacer(1, 20))

    # Detailed results for keepers and borderline
    detail_style = ParagraphStyle(
        'Detail',
        parent=styles['Normal'],
        fontSize=9,
        spaceAfter=10
    )

    elements.append(Paragraph("<b>Detailed Analysis (Keepers & Borderline)</b>", styles['Heading2']))
    elements.append(Spacer(1, 10))

    for r in sorted(results, key=lambda x: x["final_score"], reverse=True):
        if r["status"] in ("keeper", "borderline"):
            elements.append(Paragraph(f"<b>{r['filename']}</b> - Score: {r['final_score']}", detail_style))

            if r["first_pass"] and r["first_pass"].get("justification"):
                justification = r["first_pass"]["justification"][:500]
                elements.append(Paragraph(f"<i>First pass:</i> {justification}", detail_style))

            if r["second_pass"] and r["second_pass"].get("justification"):
                justification = r["second_pass"]["justification"][:500]
                elements.append(Paragraph(f"<i>Second pass:</i> {justification}", detail_style))

            elements.append(Spacer(1, 10))

    # Build the PDF
    doc.build(elements)


def main():
    parser = argparse.ArgumentParser(
        description="Evaluate AI-generated images for historical accuracy using VLMs"
    )
    parser.add_argument(
        "--folder", "-f",
        type=str,
        help="Path to folder containing images to evaluate"
    )
    parser.add_argument(
        "--era", "-e",
        type=str,
        default="historical",
        help="Historical era description (e.g., '1920s', 'Civil War era', '1565 Spanish colonial')"
    )
    parser.add_argument(
        "--threshold", "-t",
        type=int,
        default=DEFAULT_THRESHOLD,
        help=f"Score threshold for second pass evaluation (default: {DEFAULT_THRESHOLD})"
    )
    parser.add_argument(
        "--output", "-o",
        type=str,
        help="Output PDF filename (default: accuracy_report_<timestamp>.pdf)"
    )
    parser.add_argument(
        "--quiet", "-q",
        action="store_true",
        help="Suppress progress output"
    )

    args = parser.parse_args()

    # Determine folder path
    if args.folder:
        folder_path = args.folder
    else:
        # Default: find the most recent session in generated_images
        script_dir = Path(__file__).parent.parent
        generated_images = script_dir / "generated_images"
        if generated_images.exists():
            sessions = sorted(
                [d for d in generated_images.iterdir() if d.is_dir()],
                key=lambda x: x.stat().st_mtime,
                reverse=True
            )
            if sessions:
                folder_path = str(sessions[0])
                print(f"Using most recent session: {folder_path}")
            else:
                print("No image sessions found in generated_images/")
                sys.exit(1)
        else:
            print("Error: No folder specified and generated_images/ not found")
            print("Usage: python scripts/historical_image_accuracy_checker.py --folder <path> --era '1920s'")
            sys.exit(1)

    # Verify Ollama is available
    if not check_ollama_available():
        print("Error: Ollama server not available at", OLLAMA_URL)
        print("Make sure Ollama is running (ollama serve)")
        sys.exit(1)

    # Verify models are available
    for model in [FIRST_PASS_MODEL, SECOND_PASS_MODEL]:
        if not check_model_available(model):
            print(f"Error: Model not available: {model}")
            print(f"Install with: ollama pull {model}")
            sys.exit(1)

    # Process images
    verbose = not args.quiet
    results = process_images(folder_path, args.era, args.threshold, verbose)

    if not results:
        print("No images were processed")
        sys.exit(1)

    # Generate PDF report
    if args.output:
        pdf_path = args.output
    else:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        pdf_path = os.path.join(folder_path, f"accuracy_report_{timestamp}.pdf")

    generate_pdf_report(results, pdf_path, args.era)

    if verbose:
        print("\n" + "=" * 60)
        print("SUMMARY")
        print("=" * 60)

        keepers = [r for r in results if r["status"] == "keeper"]
        borderline = [r for r in results if r["status"] == "borderline"]
        rejected = [r for r in results if r["status"] == "rejected"]

        print(f"Keepers ({len(keepers)}): ", end="")
        print(", ".join(r["filename"] for r in keepers) if keepers else "None")

        print(f"Borderline ({len(borderline)}): ", end="")
        print(", ".join(r["filename"] for r in borderline) if borderline else "None")

        print(f"Rejected ({len(rejected)}): ", end="")
        print(", ".join(r["filename"] for r in rejected) if rejected else "None")

        print(f"\nPDF Report: {pdf_path}")
        print(f"JSON files saved next to each image")


if __name__ == "__main__":
    main()
