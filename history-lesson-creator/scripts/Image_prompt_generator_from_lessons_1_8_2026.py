import json
import re  # For minor text cleaning

def generate_prompts(history_text):
    """
    Processes the history lesson text to identify chapters, generate titles,
    and create detailed image prompts for Nano Banana Pro and Grok Imagine.
    Outputs a JSON array of objects with title, prompts, and rationale.
    """
    # Step 1: Identify distinct lessons/chapters
    # Split by common markers: lines starting with 'Chapter', 'Lesson', '#', or numbered headings
    chapters = []
    current_title = None
    current_content = []
    lines = history_text.split('\n')
    for line in lines:
        stripped = line.strip()
        if re.match(r'^(Chapter|Lesson|#|\d+\.?\s+)', stripped, re.IGNORECASE):
            if current_title is not None and current_content:
                chapters.append({
                    'title': current_title,
                    'content': '\n'.join(current_content).strip()
                })
            current_title = stripped
            current_content = []
        elif current_title is not None:
            current_content.append(line)
    if current_title is not None and current_content:
        chapters.append({
            'title': current_title,
            'content': '\n'.join(current_content).strip()
        })

    # If no clear chapters, treat the whole text as one untitled chapter
    if not chapters and history_text.strip():
        chapters.append({
            'title': 'Untitled Lesson',
            'content': history_text.strip()
        })

    # Step 2: For each chapter, generate prompts using advanced techniques
    output = []
    for chap in chapters:
        # Extract a concise summary for base description (first 300 chars + ellipsis)
        content_summary = chap['content'][:300].strip() + '...' if len(chap['content']) > 300 else chap['content']
        base_desc = f"the key historical scene from {chap['title']}: {content_summary}. Ensure all elements are era-appropriate, with detailed depictions of clothing, architecture, tools, and cultural contexts to maintain historical fidelity."

        # Nano Banana Pro prompt: Full natural language sentences, specific camera/lighting/composition, photorealistic with text integration if needed, factual constraints to prevent anachronisms
        nano_prompt = (
            f"Generate a photorealistic image capturing {base_desc} The composition is a wide-angle shot emphasizing the central historical event or figure, with balanced foreground and background elements to convey depth and context. "
            "Illuminate the scene with era-specific lighting, such as soft golden hour sunlight filtering through ancient structures, casting long, realistic shadows that highlight textures like weathered stone, embroidered fabrics, and metallic artifacts. "
            "Capture this with an 85mm portrait lens for sharp focus on key details, resulting in a soft bokeh background that isolates the subject without distractions. Incorporate intricate, historically accurate details: period clothing with authentic patterns and materials, architectural features true to the time (e.g., no modern constructions), and environmental elements like foliage or weather consistent with historical records. "
            "The mood is immersive and educational, evoking the essence of the era through a vibrant yet muted color palette reflective of natural dyes and lighting conditions. Ensure high resolution, 8K quality, with ultra-detailed textures on surfaces, realistic proportions, and no anachronisms such as contemporary technology or styles. "
            "This image serves as a visual archive, masterpiece-level in detail, avoiding any fictional embellishments that deviate from documented history. Add quality boosters: highly intricate, sharp focus, cinematic depth, and seamless integration of all elements for maximum historical accuracy."
        )  # ~250 words

        # Grok Imagine prompt: Conversational tone, constraints like aspect ratio, negative prompts for anachronisms, keywords for mood/colors/composition
        grok_prompt = (
            f"Hey Grok, create a highly detailed image of {base_desc} Let's make it in a photorealistic style with a cinematic feel, like a frame from a historical documentary. "
            "Focus on one central visual idea: the main event or figure in sharp detail, surrounded by an authentic environment. Use a wide-angle shot for composition, with an aspect ratio of 16:9 to capture the full scene dynamically. "
            "Add atmosphere through lighting like dramatic natural daylight or torchlight appropriate to the era, with soft shadows and a color palette of earth tones, muted blues, and golds to evoke historical realism. Incorporate textures such as rough-hewn wood, aged leather, and stone carvings, ensuring everything feels lived-in and period-accurate. "
            "The mood should be immersive and reflective, highlighting cultural nuances without exaggeration. No modern elements, no anachronisms like electricity or contemporary clothing, avoid unnatural distortions in faces or proportions, no busy backgrounds, and steer clear of cartoonish styles—keep it grounded in history. "
            "Make it high-quality, 8K resolution, masterpiece with intricate details, vibrant yet realistic colors, and perfect lighting balance. If needed, iterate by adding more sensory details like mist or wind effects, but stick to factual historical contexts."
        )  # ~250 words

        # Rationale: Explains accuracies and techniques
        rationale = (
            f"For {chap['title']}: Prompts draw from chapter content to ensure historical fidelity, incorporating era-specific details extracted or inferred from text. "
            "Nano Banana Pro uses full-sentence structure, camera specifics (e.g., 85mm lens), and factual constraints per Gemini guidelines to maximize detail and prevent anachronisms. "
            "Grok Imagine employs conversational phrasing, negative prompts (e.g., no modern elements), and mood keywords for high-quality, accurate outputs. Both aim for 200+ words with photorealistic styles, lighting descriptions, and composition to avoid vagueness."
        )

        output.append({
            'title': chap['title'],
            'nanoBananaProPrompt': nano_prompt,
            'grokImaginePrompt': grok_prompt,
            'rationale': rationale
        })

    # Step 3: Output as JSON array string
    return json.dumps(output, indent=4)

# Read the history lesson from history.txt
with open('history.txt', 'r', encoding='utf-8') as file:
    history_text = file.read()

print(generate_prompts(history_text))