"""
Qwen3-TTS Batch Generator for History Courses
Generates audio for all 75 lessons (24 Enlightenment + 51 American History)

Place this script in: C:\AI\qwen-tts-models\
Run with: python tts_batch_generator.py

Requirements:
- Lesson text files in subdirectories (will be copied from repo)
- VoiceDesign model downloaded to ./VoiceDesign/
"""

import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel
import os
import re
import time
from pathlib import Path

# =============================================================================
# CONFIGURATION
# =============================================================================

# Input folders (copy your lessons-revised folders here)
ENLIGHTENMENT_INPUT = "./lessons/enlightenment/"
HISTORY_INPUT = "./lessons/american-history/"

# Output folder for generated audio
OUTPUT_DIR = "./generated_audio/"

# Model path
MODEL_PATH = "./VoiceDesign"

# =============================================================================
# NARRATOR VOICE DESCRIPTIONS
# Carefully crafted for each narrator to sound age-appropriate and in-character
# =============================================================================

NARRATOR_VOICES = {
    # =========================================================================
    # ENLIGHTENMENT COURSE (24 lessons)
    # =========================================================================
    
    # Lesson 01 - Dawn of Reason
    "Sophie": "Teenage French girl, 14 years old, warm clear voice with subtle French-accented English, curious and intelligent, speaks with wonder about ideas, not childish but youthful and earnest.",
    
    # Lesson 02 - Rights of Man
    "Thomas": "Teenage English boy, 15 years old, working-class London accent, earnest and hardworking, speaks with conviction about justice and rights, steady and determined voice.",
    
    # Lesson 03 - Spirit of the Laws
    "Henri": "Teenage French boy, 14 years old, servant's son, observant and thoughtful, soft-spoken but perceptive, mild French accent, speaks with quiet intelligence.",
    
    # Lesson 04 - Voice of the People
    "Marie": "Teenage French girl, 15 years old, Parisian chambermaid, practical and sharp-witted, clear voice with French inflection, speaks with passion about equality.",
    
    # Lesson 05 - Fearless Pen
    "Jacques": "Teenage French boy, 14 years old, aspiring playwright, dramatic and expressive, artistic temperament, speaks with theatrical flair about Voltaire.",
    
    # Lesson 06 - American Philosopher
    "William": "Teenage American boy, 15 years old, Philadelphia printer's apprentice, eager and industrious, colonial American accent, admires Franklin greatly.",
    
    # Lesson 07 - Self-Evident Truths
    "Samuel": "Young American man, 16 years old, Philadelphia clerk, formal and educated speech, colonial accent, awed and reverent tone when discussing the Declaration.",
    
    # Lesson 08 - Republic If You Can Keep It
    "Catherine": "Teenage American girl, 14 years old, innkeeper's daughter in Philadelphia, practical and observant, colonial accent, speaks with civic pride.",
    
    # Lesson 09 - Common Sense
    "Nathaniel": "Teenage American boy, 15 years old, printer's devil in Philadelphia, enthusiastic and idealistic, colonial accent, passionate about revolution.",
    
    # Lesson 10 - Wealth of Nations
    "James": "Teenage Scottish boy, 14 years old, merchant's apprentice in Glasgow, Scottish accent, practical and business-minded, speaks clearly about economics.",
    
    # Lesson 11 - A Vindication
    "Elizabeth": "Young English woman, 16 years old, governess in London, educated and articulate, proper English accent, speaks with quiet determination about women's rights.",
    
    # Lesson 12 - Publius Speaks
    "Daniel": "Teenage American boy, 15 years old, newspaper apprentice in New York, curious and politically engaged, colonial accent, fascinated by constitutional debates.",
    
    # Lesson 13 - First Ten
    "Hannah": "Teenage American girl, 14 years old, Virginia farmer's daughter, rural Southern colonial accent, practical and grounded, values liberty.",
    
    # Lesson 14 - Atlas of Independence
    "Abigail": "Teenage American girl, 15 years old, niece of Abigail Adams, New England accent, intelligent and well-read, admires her aunt greatly.",
    
    # Lesson 15 - Ambitious Vision
    "Robert": "Young American man, 16 years old, Treasury clerk, formal educated speech, colonial accent, ambitious and detail-oriented.",
    
    # Lesson 16 - Voices of Caution
    "Mercy": "Teenage American girl, 15 years old, Massachusetts farmer's daughter, thoughtful New England accent, skeptical and cautious about concentrated power.",
    
    # Lesson 17 - Dare to Know
    "Friedrich": "Teenage German boy, 15 years old, university student in Königsberg, intellectual and philosophical, German-accented English, deeply thoughtful.",
    
    # Lesson 18 - Skeptical Scot
    "Angus": "Teenage Scottish boy, 14 years old, bookseller's son in Edinburgh, Scottish accent, witty and questioning, loves philosophical debate.",
    
    # Lesson 19 - Justice Reformed
    "Marco": "Teenage Italian boy, 15 years old, law student in Milan, Italian-accented English, passionate about justice and reform, speaks with conviction.",
    
    # Lesson 20 - Great Contradiction (different James - Black apprentice)
    "James_Philadelphia": "Young African American man, 16 years old, free Black apprentice in Philadelphia, dignified and contemplative, speaks with quiet intensity about freedom and contradiction.",
    
    # Lesson 21 - Indispensable Man
    "Tobias": "Teenage Black American boy, 15 years old, aide at Mount Vernon, observant and respectful, Southern accent, speaks thoughtfully about Washington.",
    
    # Lesson 22 - Wall of Separation
    "Sarah": "Teenage American girl, 14 years old, Baptist minister's daughter in Virginia, devout but thoughtful, Southern accent, speaks with conviction about religious freedom.",
    
    # Lesson 23 - Ideas Unleashed
    "Pierre": "Teenage French boy, 15 years old, printer's apprentice in revolutionary Paris, troubled and reflective, French accent, speaks with horror about the Terror.",
    
    # Lesson 24 - Light Endures
    "Modern_Student": "Contemporary American teenager, gender-neutral voice, clear and reflective, speaks directly to the listener about history's relevance today.",
    
    # =========================================================================
    # AMERICAN HISTORY COURSE (51 lessons)
    # =========================================================================
    
    # One World to the Next
    "Mateo": "Young Spanish boy, 13 years old, settler in St. Augustine, Spanish-accented English, adventurous and observant, speaks with wonder about the New World.",
    
    # Survival in Jamestown
    "Samuel_Jamestown": "Teenage English boy, 14 years old, indentured servant, desperate and hardworking, speaks with fear and determination about survival.",
    
    # Mayflower Compact
    "Elizabeth_Pilgrim": "Young Pilgrim girl, 12 years old, devout and hopeful, English accent, speaks with faith about the journey and compact.",
    
    # City Upon a Hill
    "John_Puritan": "Teenage Puritan boy, 13 years old, minister's son in Boston, serious and devout, speaks with religious conviction.",
    
    # Southern Way
    "Thomas_Virginia": "Teenage boy, 14 years old, small tobacco farmer's son in Virginia, rural Southern colonial accent, hardworking and practical.",
    
    # Triangular Trade
    "James_Boston": "Teenage boy, 15 years old, merchant captain's son in Boston, knowledgeable about trade, speaks with growing awareness of slavery's horror.",
    
    # Diversity in the Colonies
    "Maria": "Teenage Dutch girl, 14 years old, merchant's daughter in New York, Dutch-accented English, observant about different cultures.",
    
    # Great Awakening
    "Sarah_Connecticut": "Teenage girl, 14 years old, Connecticut farmer's daughter, moved by religious revival, speaks with spiritual fervor.",
    
    # French and Indian War
    "Benjamin": "Teenage boy, 16 years old, colonial militiaman from Virginia, brave and loyal, speaks about war with both fear and duty.",
    
    # No Taxation Without Representation
    "William_Boston": "Teenage boy, 16 years old, Boston printer's apprentice, politically awakened, speaks with growing anger about British taxes.",
    
    # Boston Massacre
    "Abigail_Boston": "Teenage girl, 14 years old, Boston shopkeeper's daughter, frightened and outraged, describes the violence with horror.",
    
    # Boston Tea Party
    "Thomas_Carpenter": "Teenage boy, 15 years old, Boston carpenter's apprentice, bold and defiant, excited about the protest.",
    
    # Shot Heard Round the World
    "Nathan": "Young man, 17 years old, Minuteman from Concord, brave and determined, speaks with urgency about the first battle.",
    
    # Common Sense and Independence
    "Hannah_Philadelphia": "Teenage girl, 16 years old, Philadelphia delegate's daughter, educated and passionate, speaks with conviction about independence.",
    
    # Winter at Valley Forge
    "Joseph": "Young man, 17 years old, Continental Army soldier, exhausted but resolute, speaks of suffering and endurance.",
    
    # Victory at Yorktown
    "Marcus_Yorktown": "Teenage boy, 16 years old, son of freed Black soldier, proud and hopeful, speaks of victory and his father's courage.",
    
    # Colonial Life on Eve of Revolution
    "Rachel": "Teenage girl, 15 years old, Philadelphia printer's daughter, observant and articulate, describes colonial daily life.",
    
    # A More Perfect Union
    "Rebecca": "Teenage girl, 15 years old, Pennsylvania delegate's daughter, curious about the Convention, speaks with hope about the new government.",
    
    # Bill of Rights
    "Jacob": "Teenage boy, 16 years old, newspaper printer's apprentice, passionate about liberty, speaks with conviction about rights.",
    
    # President Washington
    "Eleanor": "Teenage girl, 14 years old, living in New York City, excited and proud, describes Washington's inauguration.",
    
    # Hamilton vs. Jefferson
    "Samuel_Virginia": "Teenage boy, 15 years old, Virginia farmer's son, caught between two visions, speaks thoughtfully about the debate.",
    
    # Louisiana Purchase
    "Marie_NewOrleans": "Teenage French girl, 14 years old, French trader's daughter in New Orleans, French-accented, experiencing the transfer of her homeland.",
    
    # Lewis and Clark
    "William_Corps": "Young man, 17 years old, Corps of Discovery member, adventurous and observant, speaks with wonder about the journey.",
    
    # War of 1812
    "Daniel_Baltimore": "Teenage boy, 16 years old, Baltimore militiaman, patriotic and brave, speaks of defending his home.",
    
    # Monroe Doctrine
    "Clara": "Teenage girl, 15 years old, State Department clerk's daughter, informed and thoughtful, explains foreign policy.",
    
    # Jacksonian Democracy
    "Thomas_Western": "Teenage boy, 15 years old, western farmer's son, enthusiastic about Jackson, speaks with frontier spirit.",
    
    # Indian Removal
    "Sarah_Cherokee": "Teenage Cherokee girl, 14 years old, facing removal, speaks with grief and dignity about the Trail of Tears.",
    
    # Nullification Crisis
    "James_SouthCarolina": "Teenage boy, 16 years old, from South Carolina, torn between state and nation, speaks with tension.",
    
    # Second Great Awakening
    "Emily": "Teenage girl, 15 years old, from New York, spiritually moved, speaks with religious enthusiasm.",
    
    # Manifest Destiny
    "Samuel_Oregon": "Teenage boy, 16 years old, on Oregon Trail, hopeful and determined, speaks of the journey west.",
    
    # Mexican-American War
    "Miguel": "Teenage boy, 16 years old, American soldier, conflicted about the war, speaks with complexity.",
    
    # Seneca Falls Convention
    "Charlotte": "Young woman, 17 years old, at the convention, inspired and determined, speaks passionately about women's rights.",
    
    # Compromise of 1850
    "Anna": "Teenage girl, 15 years old, from California, observing the crisis, speaks with worry about the nation's future.",
    
    # Uncle Tom's Cabin
    "Rebecca_North": "Teenage Northern girl, 14 years old, deeply moved by the book, speaks with moral awakening.",
    
    # Kansas-Nebraska Act
    "John_Kansas": "Young man, 17 years old, Kansas settler, caught in Bleeding Kansas, speaks with fear and determination.",
    
    # Dred Scott Decision
    "Frederick": "Teenage free Black boy, 16 years old, in Pennsylvania, speaks with anger and fear about the ruling.",
    
    # Lincoln's Election and Secession
    "William_SC": "Teenage boy, 15 years old, from South Carolina, watching his state secede, conflicted and worried.",
    
    # Civil War Begins
    "Thomas_Union": "Young Union soldier, 17 years old, idealistic at first, speaks of the war's beginning.",
    
    # Gettysburg and Vicksburg
    "Sarah_Gettysburg": "Teenage girl, 15 years old, from Gettysburg, witnessed the battle, speaks with horror and sorrow.",
    
    # Appomattox and Lincoln's Assassination
    "Daniel_Union": "Young Union soldier, 16 years old, present at war's end, speaks of relief then grief.",
    
    # Reconstruction Begins
    "Marcus_Freed": "Teenage freed slave, 15 years old, in Georgia, hopeful and determined, speaks of new freedom.",
    
    # Radical Reconstruction
    "Eliza": "Teenage freed slave, 16 years old, in South Carolina, speaks of voting and new schools with hope.",
    
    # End of Reconstruction
    "Samuel_Mississippi": "Young Black voter, 17 years old, in Mississippi, speaks with fear as rights are stripped away.",
    
    # Gilded Age
    "Anna_Factory": "Teenage factory worker, 15 years old, in New York, tired but resilient, speaks of hard labor and inequality.",
    
    # Labor Movement
    "Michael": "Young factory worker, 17 years old, speaks with solidarity about workers' rights and strikes.",
    
    # Immigration and Urbanization
    "Giuseppe": "Teenage Italian immigrant, 14 years old, newly arrived, Italian-accented English, hopeful but struggling.",
    
    # Progressive Era
    "Catherine_Settlement": "Teenage settlement house worker, 15 years old, dedicated to reform, speaks with purpose.",
    
    # Populist Movement
    "Emma": "Teenage farm girl, 16 years old, Kansas farmer's daughter, speaks with prairie determination about farmers' struggles.",
    
    # Rough Rider President
    "Theodore_Roosevelt": "Adult male voice, 40s, energetic and commanding, Theodore Roosevelt himself, vigorous and enthusiastic.",
    
    # Women's Suffrage
    "Alice": "Teenage suffragist, 16 years old, determined and brave, speaks with conviction about the vote.",
    
    # World War I
    "Henry": "Young American soldier, 18 years old, experiencing the Great War, speaks with initial idealism then sobering reality.",
}

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def extract_narrator_name(text):
    """Extract narrator name from the script's introduction line."""
    # Pattern: "You will hear this story from [Name], ..."
    match = re.search(r"You will hear this story from ([A-Za-z]+)", text)
    if match:
        return match.group(1)
    return None

def get_voice_description(narrator_name, filename):
    """Get the voice description for a narrator, handling duplicates."""
    # Handle special cases where same name appears in different lessons
    if narrator_name == "James" and "Great_Contradiction" in filename:
        return NARRATOR_VOICES.get("James_Philadelphia", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Samuel" and "Jamestown" in filename:
        return NARRATOR_VOICES.get("Samuel_Jamestown", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Elizabeth" and "Mayflower" in filename:
        return NARRATOR_VOICES.get("Elizabeth_Pilgrim", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "John" and "City_Upon" in filename:
        return NARRATOR_VOICES.get("John_Puritan", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Thomas" and "Southern_Way" in filename:
        return NARRATOR_VOICES.get("Thomas_Virginia", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "James" and "Triangular" in filename:
        return NARRATOR_VOICES.get("James_Boston", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Sarah" and "Great_Awakening" in filename:
        return NARRATOR_VOICES.get("Sarah_Connecticut", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "William" and "No_Taxation" in filename:
        return NARRATOR_VOICES.get("William_Boston", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Abigail" and "Boston_Massacre" in filename:
        return NARRATOR_VOICES.get("Abigail_Boston", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Thomas" and "Boston_Tea" in filename:
        return NARRATOR_VOICES.get("Thomas_Carpenter", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Hannah" and "Common_Sense" in filename:
        return NARRATOR_VOICES.get("Hannah_Philadelphia", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Marcus" and "Yorktown" in filename:
        return NARRATOR_VOICES.get("Marcus_Yorktown", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Samuel" and "Hamilton" in filename:
        return NARRATOR_VOICES.get("Samuel_Virginia", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Marie" and "Louisiana" in filename:
        return NARRATOR_VOICES.get("Marie_NewOrleans", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "William" and "Lewis" in filename:
        return NARRATOR_VOICES.get("William_Corps", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Daniel" and "War_of_1812" in filename:
        return NARRATOR_VOICES.get("Daniel_Baltimore", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Thomas" and "Jacksonian" in filename:
        return NARRATOR_VOICES.get("Thomas_Western", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Sarah" and "Indian_Removal" in filename:
        return NARRATOR_VOICES.get("Sarah_Cherokee", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "James" and "Nullification" in filename:
        return NARRATOR_VOICES.get("James_SouthCarolina", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Samuel" and "Manifest" in filename:
        return NARRATOR_VOICES.get("Samuel_Oregon", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Rebecca" and "Uncle_Tom" in filename:
        return NARRATOR_VOICES.get("Rebecca_North", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "John" and "Kansas" in filename:
        return NARRATOR_VOICES.get("John_Kansas", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "William" and "Secession" in filename:
        return NARRATOR_VOICES.get("William_SC", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Thomas" and "Civil_War_Begins" in filename:
        return NARRATOR_VOICES.get("Thomas_Union", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Sarah" and "Gettysburg" in filename:
        return NARRATOR_VOICES.get("Sarah_Gettysburg", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Daniel" and "Appomattox" in filename:
        return NARRATOR_VOICES.get("Daniel_Union", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Marcus" and "Reconstruction_Begins" in filename:
        return NARRATOR_VOICES.get("Marcus_Freed", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Samuel" and "End_of_Reconstruction" in filename:
        return NARRATOR_VOICES.get("Samuel_Mississippi", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Anna" and "Gilded" in filename:
        return NARRATOR_VOICES.get("Anna_Factory", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Catherine" and "Progressive" in filename:
        return NARRATOR_VOICES.get("Catherine_Settlement", NARRATOR_VOICES.get(narrator_name))
    if narrator_name == "Theodore" in filename or "Rough_Rider" in filename:
        return NARRATOR_VOICES.get("Theodore_Roosevelt")
    
    # Check for "modern student" pattern
    if "modern student" in text.lower() or "Light_Endures" in filename:
        return NARRATOR_VOICES.get("Modern_Student")
    
    return NARRATOR_VOICES.get(narrator_name)

def chunk_text(text, max_chars=1000):
    """Split text into chunks at sentence boundaries for better TTS quality."""
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current_chunk = ""
    
    for sentence in sentences:
        if len(current_chunk) + len(sentence) < max_chars:
            current_chunk += sentence + " "
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = sentence + " "
    
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks

# =============================================================================
# MAIN PROCESSING
# =============================================================================

def process_lesson(model, input_path, output_path, lesson_name):
    """Process a single lesson file and generate audio."""
    print(f"\n{'='*60}")
    print(f"Processing: {lesson_name}")
    print(f"{'='*60}")
    
    # Read the script
    with open(input_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Extract narrator
    narrator = extract_narrator_name(text)
    voice_desc = get_voice_description(narrator, lesson_name) if narrator else None
    
    if not voice_desc:
        print(f"  WARNING: No voice description found for narrator '{narrator}'")
        print(f"  Using default teenage narrator voice.")
        voice_desc = "Teenage American narrator, clear and engaging, speaks with historical interest."
    
    print(f"  Narrator: {narrator}")
    print(f"  Voice: {voice_desc[:60]}...")
    
    # Chunk the text for better quality
    chunks = chunk_text(text, max_chars=800)
    print(f"  Text chunks: {len(chunks)}")
    
    # Generate audio for each chunk
    all_audio = []
    sample_rate = None
    
    for i, chunk in enumerate(chunks):
        print(f"  Generating chunk {i+1}/{len(chunks)}...", end=" ", flush=True)
        start_time = time.time()
        
        wavs, sr = model.generate_voice_design(
            text=chunk,
            language="English",
            instruct=voice_desc,
        )
        
        all_audio.append(wavs[0])
        sample_rate = sr
        
        elapsed = time.time() - start_time
        print(f"({elapsed:.1f}s)")
    
    # Concatenate all chunks
    import numpy as np
    final_audio = np.concatenate(all_audio)
    
    # Save the audio
    sf.write(output_path, final_audio, sample_rate)
    print(f"  Saved: {output_path}")
    print(f"  Duration: {len(final_audio)/sample_rate:.1f} seconds")
    
    return True

def main():
    print("="*60)
    print("Qwen3-TTS Batch Generator for History Courses")
    print("="*60)
    
    # Create output directories
    os.makedirs(f"{OUTPUT_DIR}/enlightenment", exist_ok=True)
    os.makedirs(f"{OUTPUT_DIR}/american-history", exist_ok=True)
    
    # Load model
    print("\nLoading VoiceDesign model...")
    print("(This may take a minute on first run)")
    
    model = Qwen3TTSModel.from_pretrained(
        MODEL_PATH,
        device_map="cuda:0",
        dtype=torch.bfloat16,
    )
    print("Model loaded successfully!\n")
    
    # Track progress
    total_lessons = 0
    completed = 0
    failed = []
    
    # Process Enlightenment lessons
    if os.path.exists(ENLIGHTENMENT_INPUT):
        enlightenment_files = sorted([f for f in os.listdir(ENLIGHTENMENT_INPUT) if f.endswith('.txt')])
        total_lessons += len(enlightenment_files)
        
        print(f"\n{'#'*60}")
        print(f"# ENLIGHTENMENT COURSE ({len(enlightenment_files)} lessons)")
        print(f"{'#'*60}")
        
        for filename in enlightenment_files:
            input_path = os.path.join(ENLIGHTENMENT_INPUT, filename)
            output_filename = filename.replace('.txt', '.wav').replace('_TTS_Script', '')
            output_path = os.path.join(OUTPUT_DIR, "enlightenment", output_filename)
            
            try:
                process_lesson(model, input_path, output_path, filename)
                completed += 1
            except Exception as e:
                print(f"  ERROR: {e}")
                failed.append(filename)
    else:
        print(f"\nWARNING: Enlightenment input folder not found: {ENLIGHTENMENT_INPUT}")
        print("Please copy your enlightenment lessons-revised folder to ./lessons/enlightenment/")
    
    # Process American History lessons
    if os.path.exists(HISTORY_INPUT):
        history_files = sorted([f for f in os.listdir(HISTORY_INPUT) if f.endswith('.txt')])
        total_lessons += len(history_files)
        
        print(f"\n{'#'*60}")
        print(f"# AMERICAN HISTORY COURSE ({len(history_files)} lessons)")
        print(f"{'#'*60}")
        
        for filename in history_files:
            input_path = os.path.join(HISTORY_INPUT, filename)
            output_filename = filename.replace('.txt', '.wav').replace('_TTS_Script_REVISED', '').replace('_TTS_Script', '')
            output_path = os.path.join(OUTPUT_DIR, "american-history", output_filename)
            
            try:
                process_lesson(model, input_path, output_path, filename)
                completed += 1
            except Exception as e:
                print(f"  ERROR: {e}")
                failed.append(filename)
    else:
        print(f"\nWARNING: American History input folder not found: {HISTORY_INPUT}")
        print("Please copy your history lessons-revised folder to ./lessons/american-history/")
    
    # Summary
    print("\n" + "="*60)
    print("BATCH PROCESSING COMPLETE")
    print("="*60)
    print(f"Total lessons: {total_lessons}")
    print(f"Completed: {completed}")
    print(f"Failed: {len(failed)}")
    
    if failed:
        print("\nFailed lessons:")
        for f in failed:
            print(f"  - {f}")
    
    print(f"\nOutput saved to: {OUTPUT_DIR}")
    print("="*60)

if __name__ == "__main__":
    main()
