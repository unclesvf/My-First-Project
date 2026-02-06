"""
Qwen3-TTS Batch Generator v2 - Using CustomVoice for Stability
Generates audio for all 75 lessons (24 Enlightenment + 51 American History)

This version uses CustomVoice (stable built-in voices) instead of VoiceDesign
to avoid voice drift and language switching issues on long texts.

Place this script in: C:/AI/qwen-tts-models/
Run with: python tts_batch_generator_v2.py

Requirements:
- Lesson text files in subdirectories
- CustomVoice model downloaded to ./CustomVoice/
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
OUTPUT_DIR = "./generated_audio_v2/"

# Model path - using CustomVoice for stability
MODEL_PATH = "./CustomVoice"

# =============================================================================
# AVAILABLE SPEAKERS IN CUSTOMVOICE
# =============================================================================
# Vivian   - Bright, slightly edgy young female voice (Chinese native, but speaks English)
# Serena   - Warm, gentle young female voice (Chinese native)
# Ryan     - Dynamic male voice with strong rhythmic drive (English native) 
# Aiden    - Sunny American male voice with clear midrange (English native)
# Ono_Anna - Playful Japanese female voice
# Sohee    - Warm Korean female voice
# Uncle_Fu - Seasoned male voice with low, mellow timbre
# Dylan    - Youthful Beijing male voice  
# Eric     - Lively Chengdu male voice

# =============================================================================
# NARRATOR CONFIGURATION
# Maps narrator names to CustomVoice speaker + style instructions
# =============================================================================

NARRATOR_CONFIG = {
    # =========================================================================
    # ENLIGHTENMENT COURSE - Female narrators use Vivian, males use Ryan/Aiden
    # =========================================================================
    
    # Lesson 01 - Sophie (French girl, 14)
    "Sophie": {
        "speaker": "Vivian",
        "instruct": "Speak as a curious, intelligent teenage girl. Warm and earnest, filled with wonder about new ideas. Clear and engaging storytelling voice."
    },
    
    # Lesson 02 - Thomas (English boy, 15) 
    "Thomas": {
        "speaker": "Aiden",
        "instruct": "Speak as an earnest teenage boy. Working-class, serious and determined. A hint of fear but also conviction about justice."
    },
    
    # Lesson 03 - Henri (French boy, 14)
    "Henri": {
        "speaker": "Aiden",
        "instruct": "Speak as a quiet, observant teenage boy. Soft-spoken but perceptive, thoughtful and intelligent."
    },
    
    # Lesson 04 - Marie (French girl, 15)
    "Marie": {
        "speaker": "Vivian",
        "instruct": "Speak as a practical, sharp-witted teenage girl. Clear voice, passionate about equality and fairness."
    },
    
    # Lesson 05 - Jacques (French boy, 14)
    "Jacques": {
        "speaker": "Aiden",
        "instruct": "Speak as a dramatic, expressive teenage boy. Artistic temperament, theatrical flair when discussing ideas."
    },
    
    # Lesson 06 - William (American boy, 15)
    "William": {
        "speaker": "Aiden",
        "instruct": "Speak as an eager, industrious American teenage boy. Colonial-era, admiring and enthusiastic about learning."
    },
    
    # Lesson 07 - Samuel (American, 16)
    "Samuel": {
        "speaker": "Ryan",
        "instruct": "Speak as a formal, educated young American man. Awed and reverent tone when discussing important documents."
    },
    
    # Lesson 08 - Catherine (American girl, 14)
    "Catherine": {
        "speaker": "Vivian",
        "instruct": "Speak as a practical, observant American teenage girl. Clear voice with civic pride."
    },
    
    # Lesson 09 - Nathaniel (American boy, 15)
    "Nathaniel": {
        "speaker": "Aiden",
        "instruct": "Speak as an enthusiastic, idealistic American teenage boy. Passionate about revolution and new ideas."
    },
    
    # Lesson 10 - James (Scottish boy, 14)
    "James": {
        "speaker": "Aiden",
        "instruct": "Speak as a practical, business-minded teenage boy. Clear and thoughtful about economics."
    },
    
    # Lesson 11 - Elizabeth (English woman, 16)
    "Elizabeth": {
        "speaker": "Vivian",
        "instruct": "Speak as an educated, articulate young woman. Proper and determined, quietly passionate about women's rights."
    },
    
    # Lesson 12 - Daniel (American boy, 15)
    "Daniel": {
        "speaker": "Aiden",
        "instruct": "Speak as a curious, politically engaged American teenage boy. Fascinated by constitutional debates."
    },
    
    # Lesson 13 - Hannah (American girl, 14)
    "Hannah": {
        "speaker": "Vivian",
        "instruct": "Speak as a practical, grounded American teenage girl. Rural background, values liberty."
    },
    
    # Lesson 14 - Abigail (American girl, 15)
    "Abigail": {
        "speaker": "Vivian",
        "instruct": "Speak as an intelligent, well-read American teenage girl. Admiring and thoughtful."
    },
    
    # Lesson 15 - Robert (American, 16)
    "Robert": {
        "speaker": "Ryan",
        "instruct": "Speak as a formal, ambitious young American man. Detail-oriented and professional."
    },
    
    # Lesson 16 - Mercy (American girl, 15)
    "Mercy": {
        "speaker": "Vivian",
        "instruct": "Speak as a thoughtful American teenage girl. Skeptical and cautious, questioning."
    },
    
    # Lesson 17 - Friedrich (German boy, 15)
    "Friedrich": {
        "speaker": "Aiden",
        "instruct": "Speak as an intellectual, philosophical teenage boy. Deeply thoughtful about ideas."
    },
    
    # Lesson 18 - Angus (Scottish boy, 14)
    "Angus": {
        "speaker": "Aiden",
        "instruct": "Speak as a witty, questioning teenage boy. Loves philosophical debate."
    },
    
    # Lesson 19 - Marco (Italian boy, 15)
    "Marco": {
        "speaker": "Aiden",
        "instruct": "Speak as a passionate teenage boy. Strong convictions about justice and reform."
    },
    
    # Lesson 20 - James (Black apprentice, 16) - different James
    "James_Philadelphia": {
        "speaker": "Ryan",
        "instruct": "Speak as a dignified, contemplative young Black man. Quiet intensity, longing for freedom."
    },
    
    # Lesson 21 - Tobias (Black aide, 15)
    "Tobias": {
        "speaker": "Aiden",
        "instruct": "Speak as an observant, respectful teenage boy. Thoughtful about leadership and character."
    },
    
    # Lesson 22 - Sarah (American girl, 14)
    "Sarah": {
        "speaker": "Vivian",
        "instruct": "Speak as a devout, thoughtful American teenage girl. Conviction about religious freedom."
    },
    
    # Lesson 23 - Pierre (French boy, 15)
    "Pierre": {
        "speaker": "Aiden",
        "instruct": "Speak as a troubled, reflective teenage boy. Speaking with horror about violence and tragedy."
    },
    
    # Lesson 24 - Modern Student
    "Modern_Student": {
        "speaker": "Aiden",
        "instruct": "Speak as a contemporary American teenager. Clear, reflective, speaking directly to the listener about history's relevance."
    },
    
    # =========================================================================
    # AMERICAN HISTORY COURSE
    # =========================================================================
    
    "Mateo": {"speaker": "Aiden", "instruct": "Speak as an adventurous, observant young teenage boy. Wonder about the new world."},
    "Samuel_Jamestown": {"speaker": "Aiden", "instruct": "Speak as a desperate, hardworking teenage boy. Fear and determination about survival."},
    "Elizabeth_Pilgrim": {"speaker": "Vivian", "instruct": "Speak as a devout, hopeful young girl. Faith about the journey."},
    "John_Puritan": {"speaker": "Aiden", "instruct": "Speak as a serious, devout teenage boy. Religious conviction."},
    "Thomas_Virginia": {"speaker": "Aiden", "instruct": "Speak as a hardworking, practical teenage boy. Rural, down-to-earth."},
    "James_Boston": {"speaker": "Aiden", "instruct": "Speak as a knowledgeable teenage boy. Growing awareness of moral issues."},
    "Maria": {"speaker": "Vivian", "instruct": "Speak as an observant teenage girl. Curious about different cultures."},
    "Sarah_Connecticut": {"speaker": "Vivian", "instruct": "Speak as a teenage girl moved by spiritual revival. Religious fervor."},
    "Benjamin": {"speaker": "Ryan", "instruct": "Speak as a brave, loyal teenage boy. Fear and duty about war."},
    "William_Boston": {"speaker": "Aiden", "instruct": "Speak as a politically awakened teenage boy. Growing anger about injustice."},
    "Abigail_Boston": {"speaker": "Vivian", "instruct": "Speak as a frightened, outraged teenage girl. Horror about violence."},
    "Thomas_Carpenter": {"speaker": "Aiden", "instruct": "Speak as a bold, defiant teenage boy. Excited about protest."},
    "Nathan": {"speaker": "Ryan", "instruct": "Speak as a brave, determined young man. Urgency about battle."},
    "Hannah_Philadelphia": {"speaker": "Vivian", "instruct": "Speak as an educated, passionate teenage girl. Conviction about independence."},
    "Joseph": {"speaker": "Ryan", "instruct": "Speak as an exhausted but resolute young soldier. Suffering and endurance."},
    "Marcus_Yorktown": {"speaker": "Aiden", "instruct": "Speak as a proud, hopeful teenage boy. Pride about victory and courage."},
    "Rachel": {"speaker": "Vivian", "instruct": "Speak as an observant, articulate teenage girl. Describing daily life."},
    "Rebecca": {"speaker": "Vivian", "instruct": "Speak as a curious teenage girl. Hope about new government."},
    "Jacob": {"speaker": "Ryan", "instruct": "Speak as a passionate teenage boy. Conviction about rights and liberty."},
    "Eleanor": {"speaker": "Vivian", "instruct": "Speak as an excited, proud teenage girl. Describing historic events."},
    "Samuel_Virginia": {"speaker": "Aiden", "instruct": "Speak as a thoughtful teenage boy. Caught between competing ideas."},
    "Marie_NewOrleans": {"speaker": "Vivian", "instruct": "Speak as a teenage girl experiencing change. Mixed feelings about her homeland."},
    "William_Corps": {"speaker": "Ryan", "instruct": "Speak as an adventurous young man. Wonder about exploration and discovery."},
    "Daniel_Baltimore": {"speaker": "Ryan", "instruct": "Speak as a patriotic, brave teenage boy. Defending home."},
    "Clara": {"speaker": "Vivian", "instruct": "Speak as an informed, thoughtful teenage girl. Explaining policy clearly."},
    "Thomas_Western": {"speaker": "Aiden", "instruct": "Speak as an enthusiastic teenage boy. Frontier spirit and optimism."},
    "Sarah_Cherokee": {"speaker": "Vivian", "instruct": "Speak as a teenage girl facing tragedy. Grief and dignity."},
    "James_SouthCarolina": {"speaker": "Aiden", "instruct": "Speak as a teenage boy torn by conflict. Tension between loyalties."},
    "Emily": {"speaker": "Vivian", "instruct": "Speak as a spiritually moved teenage girl. Religious enthusiasm."},
    "Samuel_Oregon": {"speaker": "Aiden", "instruct": "Speak as a hopeful, determined teenage boy. Journey and perseverance."},
    "Miguel": {"speaker": "Aiden", "instruct": "Speak as a conflicted teenage boy. Complexity about war."},
    "Charlotte": {"speaker": "Vivian", "instruct": "Speak as an inspired, determined young woman. Passion about women's rights."},
    "Anna": {"speaker": "Vivian", "instruct": "Speak as a worried teenage girl. Concern about the nation's future."},
    "Rebecca_North": {"speaker": "Vivian", "instruct": "Speak as a deeply moved teenage girl. Moral awakening."},
    "John_Kansas": {"speaker": "Ryan", "instruct": "Speak as a young man facing danger. Fear and determination."},
    "Frederick": {"speaker": "Ryan", "instruct": "Speak as an angry, fearful teenage boy. Outrage about injustice."},
    "William_SC": {"speaker": "Aiden", "instruct": "Speak as a conflicted, worried teenage boy. Watching history unfold."},
    "Thomas_Union": {"speaker": "Ryan", "instruct": "Speak as an idealistic young soldier. Speaking of war's beginning."},
    "Sarah_Gettysburg": {"speaker": "Vivian", "instruct": "Speak as a teenage girl who witnessed horror. Sorrow and trauma."},
    "Daniel_Union": {"speaker": "Ryan", "instruct": "Speak as a young soldier at war's end. Relief then grief."},
    "Marcus_Freed": {"speaker": "Aiden", "instruct": "Speak as a hopeful, determined teenage boy. New freedom and possibility."},
    "Eliza": {"speaker": "Vivian", "instruct": "Speak as a hopeful teenage girl. Excitement about voting and education."},
    "Samuel_Mississippi": {"speaker": "Ryan", "instruct": "Speak as a fearful young man. Watching rights stripped away."},
    "Anna_Factory": {"speaker": "Vivian", "instruct": "Speak as a tired but resilient teenage girl. Hard labor and inequality."},
    "Michael": {"speaker": "Ryan", "instruct": "Speak as a young worker with solidarity. Workers' rights and strikes."},
    "Giuseppe": {"speaker": "Aiden", "instruct": "Speak as a hopeful but struggling teenage immigrant boy. New beginnings."},
    "Catherine_Settlement": {"speaker": "Vivian", "instruct": "Speak as a dedicated teenage girl. Purpose about reform."},
    "Emma": {"speaker": "Vivian", "instruct": "Speak as a determined farm girl. Prairie grit about farmers' struggles."},
    "Theodore_Roosevelt": {"speaker": "Ryan", "instruct": "Speak as an energetic, commanding adult man. Vigorous and enthusiastic leadership."},
    "Alice": {"speaker": "Vivian", "instruct": "Speak as a determined, brave teenage girl. Conviction about voting rights."},
    "Henry": {"speaker": "Ryan", "instruct": "Speak as a young soldier. Initial idealism becoming sober reality."},
}

# Default config for unknown narrators
DEFAULT_CONFIG = {
    "speaker": "Aiden",
    "instruct": "Speak as an engaging teenage narrator. Clear and interested in history."
}

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def extract_narrator_name(text):
    """Extract narrator name from the script's introduction line."""
    match = re.search(r"You will hear this story from ([A-Za-z]+)", text)
    if match:
        return match.group(1)
    return None

def get_narrator_config(narrator_name, filename):
    """Get the speaker and instruct config for a narrator."""
    # Handle special cases where same name appears in different lessons
    if narrator_name == "James" and "Great_Contradiction" in filename:
        return NARRATOR_CONFIG.get("James_Philadelphia", DEFAULT_CONFIG)
    if narrator_name == "Samuel" and "Jamestown" in filename:
        return NARRATOR_CONFIG.get("Samuel_Jamestown", DEFAULT_CONFIG)
    if narrator_name == "Elizabeth" and "Mayflower" in filename:
        return NARRATOR_CONFIG.get("Elizabeth_Pilgrim", DEFAULT_CONFIG)
    if narrator_name == "John" and "City_Upon" in filename:
        return NARRATOR_CONFIG.get("John_Puritan", DEFAULT_CONFIG)
    if narrator_name == "Thomas" and "Southern_Way" in filename:
        return NARRATOR_CONFIG.get("Thomas_Virginia", DEFAULT_CONFIG)
    if narrator_name == "James" and "Triangular" in filename:
        return NARRATOR_CONFIG.get("James_Boston", DEFAULT_CONFIG)
    if narrator_name == "Sarah" and "Great_Awakening" in filename:
        return NARRATOR_CONFIG.get("Sarah_Connecticut", DEFAULT_CONFIG)
    if narrator_name == "William" and "No_Taxation" in filename:
        return NARRATOR_CONFIG.get("William_Boston", DEFAULT_CONFIG)
    if narrator_name == "Abigail" and "Boston_Massacre" in filename:
        return NARRATOR_CONFIG.get("Abigail_Boston", DEFAULT_CONFIG)
    if narrator_name == "Thomas" and "Boston_Tea" in filename:
        return NARRATOR_CONFIG.get("Thomas_Carpenter", DEFAULT_CONFIG)
    if narrator_name == "Hannah" and "Common_Sense" in filename:
        return NARRATOR_CONFIG.get("Hannah_Philadelphia", DEFAULT_CONFIG)
    if narrator_name == "Marcus" and "Yorktown" in filename:
        return NARRATOR_CONFIG.get("Marcus_Yorktown", DEFAULT_CONFIG)
    if narrator_name == "Samuel" and "Hamilton" in filename:
        return NARRATOR_CONFIG.get("Samuel_Virginia", DEFAULT_CONFIG)
    if narrator_name == "Marie" and "Louisiana" in filename:
        return NARRATOR_CONFIG.get("Marie_NewOrleans", DEFAULT_CONFIG)
    if narrator_name == "William" and "Lewis" in filename:
        return NARRATOR_CONFIG.get("William_Corps", DEFAULT_CONFIG)
    if narrator_name == "Daniel" and "War_of_1812" in filename:
        return NARRATOR_CONFIG.get("Daniel_Baltimore", DEFAULT_CONFIG)
    if narrator_name == "Thomas" and "Jacksonian" in filename:
        return NARRATOR_CONFIG.get("Thomas_Western", DEFAULT_CONFIG)
    if narrator_name == "Sarah" and "Indian_Removal" in filename:
        return NARRATOR_CONFIG.get("Sarah_Cherokee", DEFAULT_CONFIG)
    if narrator_name == "James" and "Nullification" in filename:
        return NARRATOR_CONFIG.get("James_SouthCarolina", DEFAULT_CONFIG)
    if narrator_name == "Samuel" and "Manifest" in filename:
        return NARRATOR_CONFIG.get("Samuel_Oregon", DEFAULT_CONFIG)
    if narrator_name == "Rebecca" and "Uncle_Tom" in filename:
        return NARRATOR_CONFIG.get("Rebecca_North", DEFAULT_CONFIG)
    if narrator_name == "John" and "Kansas" in filename:
        return NARRATOR_CONFIG.get("John_Kansas", DEFAULT_CONFIG)
    if narrator_name == "William" and "Secession" in filename:
        return NARRATOR_CONFIG.get("William_SC", DEFAULT_CONFIG)
    if narrator_name == "Thomas" and "Civil_War_Begins" in filename:
        return NARRATOR_CONFIG.get("Thomas_Union", DEFAULT_CONFIG)
    if narrator_name == "Sarah" and "Gettysburg" in filename:
        return NARRATOR_CONFIG.get("Sarah_Gettysburg", DEFAULT_CONFIG)
    if narrator_name == "Daniel" and "Appomattox" in filename:
        return NARRATOR_CONFIG.get("Daniel_Union", DEFAULT_CONFIG)
    if narrator_name == "Marcus" and "Reconstruction_Begins" in filename:
        return NARRATOR_CONFIG.get("Marcus_Freed", DEFAULT_CONFIG)
    if narrator_name == "Samuel" and "End_of_Reconstruction" in filename:
        return NARRATOR_CONFIG.get("Samuel_Mississippi", DEFAULT_CONFIG)
    if narrator_name == "Anna" and "Gilded" in filename:
        return NARRATOR_CONFIG.get("Anna_Factory", DEFAULT_CONFIG)
    if narrator_name == "Catherine" and "Progressive" in filename:
        return NARRATOR_CONFIG.get("Catherine_Settlement", DEFAULT_CONFIG)
    if "Theodore" in str(narrator_name) or "Rough_Rider" in filename:
        return NARRATOR_CONFIG.get("Theodore_Roosevelt", DEFAULT_CONFIG)
    if "Light_Endures" in filename:
        return NARRATOR_CONFIG.get("Modern_Student", DEFAULT_CONFIG)
    
    return NARRATOR_CONFIG.get(narrator_name, DEFAULT_CONFIG)

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
    
    # Extract narrator and get config
    narrator = extract_narrator_name(text)
    config = get_narrator_config(narrator, lesson_name)
    
    print(f"  Narrator: {narrator}")
    print(f"  Speaker: {config['speaker']}")
    print(f"  Style: {config['instruct'][:50]}...")
    print(f"  Text length: {len(text)} characters")
    
    # Generate audio for the whole lesson using CustomVoice
    print(f"  Generating audio...", end=" ", flush=True)
    start_time = time.time()
    
    wavs, sr = model.generate_custom_voice(
        text=text,
        language="English",
        speaker=config["speaker"],
        instruct=config["instruct"],
    )
    
    elapsed = time.time() - start_time
    print(f"({elapsed:.1f}s)")
    
    # Save the audio
    sf.write(output_path, wavs[0], sr)
    print(f"  Saved: {output_path}")
    print(f"  Duration: {len(wavs[0])/sr:.1f} seconds")
    
    return True

def main():
    print("="*60)
    print("Qwen3-TTS Batch Generator v2 (CustomVoice)")
    print("="*60)
    
    # Create output directories
    os.makedirs(f"{OUTPUT_DIR}/enlightenment", exist_ok=True)
    os.makedirs(f"{OUTPUT_DIR}/american-history", exist_ok=True)
    
    # Load CustomVoice model
    print("\nLoading CustomVoice model...")
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
