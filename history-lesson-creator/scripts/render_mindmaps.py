"""
Render all mind map DOT files to PNG images using Graphviz.

Usage:
    python render_mindmaps.py
"""

import os
import subprocess
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
MEDIA_DIR = PROJECT_DIR / "lesson-media"

# Try to find Graphviz dot executable
GRAPHVIZ_PATHS = [
    r"C:\Program Files\Graphviz\bin\dot.exe",
    r"C:\Program Files (x86)\Graphviz\bin\dot.exe",
    r"C:\Users\scott\AppData\Local\Programs\Graphviz\bin\dot.exe",
    "dot",  # If in PATH
]

def find_dot_executable():
    """Find the Graphviz dot executable."""
    for path in GRAPHVIZ_PATHS:
        if path == "dot":
            # Check if dot is in PATH
            try:
                result = subprocess.run(["dot", "-V"], capture_output=True, text=True)
                if result.returncode == 0:
                    return "dot"
            except FileNotFoundError:
                continue
        elif os.path.exists(path):
            return path
    return None


def render_dot_to_png(dot_file, output_file, dot_exe):
    """Render a DOT file to PNG using Graphviz."""
    try:
        result = subprocess.run(
            [dot_exe, "-Tpng", str(dot_file), "-o", str(output_file)],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            return True
        else:
            print(f"  Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"  Error: {e}")
        return False


def main():
    print("=" * 60)
    print("MIND MAP RENDERER")
    print("=" * 60)

    # Find Graphviz
    dot_exe = find_dot_executable()
    if not dot_exe:
        print("\nERROR: Graphviz 'dot' executable not found!")
        print("Please ensure Graphviz is installed and in your PATH.")
        print("Download from: https://graphviz.org/download/")
        return

    print(f"\nUsing Graphviz: {dot_exe}")

    # Find all DOT files
    dot_files = list(MEDIA_DIR.glob("**/mindmap.dot"))
    print(f"Found {len(dot_files)} mind map files to render")
    print("-" * 40)

    success_count = 0
    fail_count = 0

    for dot_file in dot_files:
        lesson_dir = dot_file.parent
        lesson_name = lesson_dir.name
        output_file = lesson_dir / "mindmap.png"

        print(f"\nRendering: {lesson_name}")
        if render_dot_to_png(dot_file, output_file, dot_exe):
            print(f"  Created: mindmap.png")
            success_count += 1
        else:
            fail_count += 1

    print("\n" + "=" * 60)
    print("RENDERING COMPLETE")
    print("=" * 60)
    print(f"Successfully rendered: {success_count}")
    print(f"Failed: {fail_count}")
    print(f"Output location: {MEDIA_DIR}")


if __name__ == "__main__":
    main()
