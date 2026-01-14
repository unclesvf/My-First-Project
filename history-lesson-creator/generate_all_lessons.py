"""
Batch Generate Audio for All History Lessons

This script generates Zonos TTS audio for all 51 history lessons using
the appropriate voice references for each lesson.

Run in WSL2:
    python3 generate_all_lessons.py

Options:
    --start N     Start from lesson N (default: 1)
    --end N       End at lesson N (default: 51)
    --lesson N    Generate only lesson N
"""

import os
import re
import sys
import torch
import torchaudio
import subprocess
import wave
from pathlib import Path

# Lesson to voice mapping based on VOICE_CHARACTERS.md
# Voice types: 01-young_male, 02-older_male, 03-adult_male, 04-young_female,
#              05-older_female, 06-aa_male, 07-aa_female, 08-euro_male,
#              09-native_female, 10-french_female

# Lesson number to TTS script filename mapping
LESSON_SCRIPT_MAP = {
    1: "One_World_to_the_Next",
    2: "Survival_in_Jamestown",
    3: "The_Mayflower_Compact",
    4: "City_Upon_a_Hill",
    5: "Diversity_in_the_Colonies",
    6: "The_Southern_Way",
    7: "Triangular_Trade",
    8: "The_Great_Awakening",
    9: "French_and_Indian_War",
    10: "Colonial_Life_on_the_Eve_of_Revolution",
    11: "No_Taxation_Without_Representation",
    12: "The_Boston_Massacre",
    13: "The_Boston_Tea_Party",
    14: "The_Shot_Heard_Round_the_World",
    15: "Common_Sense_and_Independence",
    16: "Winter_at_Valley_Forge",
    17: "Victory_at_Yorktown",
    18: "A_More_Perfect_Union",
    19: "President_Washington",
    20: "The_Bill_of_Rights",
    21: "Hamilton_vs._Jefferson",
    22: "The_Louisiana_Purchase",
    23: "Lewis_and_Clark",
    24: "The_War_of_1812",
    25: "The_Monroe_Doctrine",
    26: "Jacksonian_Democracy",
    27: "Indian_Removal",
    28: "The_Nullification_Crisis",
    29: "The_Second_Great_Awakening",
    30: "Seneca_Falls_Convention",
    31: "Manifest_Destiny",
    32: "The_Mexican-American_War",
    33: "The_Compromise_of_1850",
    34: "Uncle_Toms_Cabin",
    35: "Kansas-Nebraska_Act",
    36: "Dred_Scott_Decision",
    37: "Lincolns_Election_and_Secession",
    38: "The_Civil_War_Begins",
    39: "Gettysburg_and_Vicksburg",
    40: "Appomattox_and_Lincolns_Assassination",
    41: "Reconstruction_Begins",
    42: "Radical_Reconstruction",
    43: "The_End_of_Reconstruction",
    44: "The_Gilded_Age",
    45: "Immigration_and_Urbanization",
    46: "Labor_Movement",
    47: "The_Populist_Movement",
    48: "The_Progressive_Era",
    49: "Womens_Suffrage",
    50: "World_War_I",
    51: "The_Rough_Rider_President",
}

LESSON_VOICE_MAP = {
    1: "01_young_male",      # Mateo, 13yo Spanish settler
    2: "01_young_male",      # Samuel, 14yo indentured servant
    3: "04_young_female",    # Elizabeth, 12yo Pilgrim
    4: "01_young_male",      # John, 13yo Puritan
    5: "04_young_female",    # Maria, 14yo Dutch merchant's daughter
    6: "01_young_male",      # Thomas, 14yo tobacco farmer's son
    7: "02_older_male",      # James, 15yo merchant's son
    8: "05_older_female",    # Sarah, 14yo farmer's daughter
    9: "02_older_male",      # Benjamin, 16yo militiaman
    10: "05_older_female",   # Rachel, 15yo printer's daughter
    11: "02_older_male",     # William, 16yo printer's apprentice
    12: "04_young_female",   # Abigail, 14yo shopkeeper's daughter
    13: "01_young_male",     # Thomas, 15yo carpenter's apprentice
    14: "02_older_male",     # Nathan, 17yo Minuteman
    15: "05_older_female",   # Hannah, 16yo delegate's daughter
    16: "02_older_male",     # Joseph, 17yo Continental soldier
    17: "06_african_american_male",  # Marcus, 16yo freed Black soldier's son
    18: "05_older_female",   # Rebecca, 15yo delegate's daughter
    19: "04_young_female",   # Eleanor, 14yo NYC resident
    20: "02_older_male",     # Jacob, 16yo printer's apprentice
    21: "01_young_male",     # Samuel, 15yo Virginia farmer's son
    22: "10_french_accented_female",  # Marie, 14yo French trader's daughter
    23: "02_older_male",     # William, 17yo Corps of Discovery
    24: "02_older_male",     # Daniel, 16yo militiaman
    25: "05_older_female",   # Clara, 15yo State Dept clerk's daughter
    26: "01_young_male",     # Thomas, 15yo western farmer's son
    27: "09_native_female",  # Sarah, 14yo Cherokee girl
    28: "02_older_male",     # James, 16yo South Carolina youth
    29: "05_older_female",   # Emily, 15yo New York girl
    30: "05_older_female",   # Charlotte, 17yo convention attendee
    31: "01_young_male",     # Samuel, 16yo Oregon Trail pioneer
    32: "02_older_male",     # Miguel, 16yo Mexican-American soldier
    33: "04_young_female",   # Anna, 15yo California girl
    34: "01_young_male",     # Rebecca, 14yo Northern girl (note: should be female, using male for now)
    35: "02_older_male",     # John, 17yo Kansas settler
    36: "06_african_american_male",  # Frederick, 16yo free Black youth
    37: "01_young_male",     # William, 15yo SC youth
    38: "02_older_male",     # Thomas, 17yo Union soldier
    39: "04_young_female",   # Sarah, 15yo Gettysburg resident
    40: "02_older_male",     # Daniel, 16yo Union soldier
    41: "06_african_american_male",  # Marcus, 15yo freed slave
    42: "07_african_american_female",  # Eliza, 16yo freed slave
    43: "06_african_american_male",  # Samuel, 17yo Black voter
    44: "05_older_female",   # Anna, 15yo factory worker
    45: "08_accented_male_european",  # Giuseppe, 14yo Italian immigrant
    46: "08_accented_male_european",  # Michael, 17yo Irish-American worker
    47: "05_older_female",   # Emma, 16yo Kansas farm daughter
    48: "04_young_female",   # Catherine, 15yo settlement house worker
    49: "05_older_female",   # Alice, 16yo suffragist
    50: "02_older_male",     # James, 18yo American soldier
    51: "03_adult_male",     # Theodore Roosevelt, adult
}

def get_tts_script_path(lesson_num):
    """Get the TTS script path for a lesson."""
    lessons_dir = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/lessons")

    # Use the mapping to get script filename
    script_name = LESSON_SCRIPT_MAP.get(lesson_num)
    if not script_name:
        return None

    script_path = lessons_dir / f"{script_name}_TTS_Script.txt"
    if script_path.exists():
        return script_path

    return None


def split_into_chunks(text, max_chars=250):
    """Split text into chunks suitable for Zonos generation."""
    chunks = []
    paragraphs = re.split(r'\n\n+', text.strip())
    current_chunk = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # Chapter titles should always be their own chunk
        is_chapter = para.startswith('Chapter ')

        if is_chapter:
            if current_chunk:
                chunks.append(current_chunk.strip())
            chunks.append(para)
            current_chunk = ""
            continue

        if len(current_chunk) + len(para) + 2 <= max_chars:
            if current_chunk:
                current_chunk += "\n\n" + para
            else:
                current_chunk = para
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())

            if len(para) > max_chars:
                sentences = re.split(r'(?<=[.!?])\s+', para)
                current_chunk = ""
                for sent in sentences:
                    if len(current_chunk) + len(sent) + 1 <= max_chars:
                        if current_chunk:
                            current_chunk += " " + sent
                        else:
                            current_chunk = sent
                    else:
                        if current_chunk:
                            chunks.append(current_chunk.strip())
                        current_chunk = sent
            else:
                current_chunk = para

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks


def generate_lesson(model, lesson_num, voice_file, script_path, output_dir):
    """Generate audio for a single lesson."""
    print(f"\n{'='*60}")
    print(f"GENERATING LESSON {lesson_num}")
    print(f"Voice: {voice_file}")
    print(f"Script: {script_path.name}")
    print(f"{'='*60}")

    # Load reference audio
    voice_path = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/voice_references/selected") / f"{voice_file}.wav"
    if not voice_path.exists():
        print(f"ERROR: Voice file not found: {voice_path}")
        return False

    ref_wav, ref_sr = torchaudio.load(str(voice_path))
    print(f"Loaded voice reference: {ref_wav.shape[1]/ref_sr:.1f}s")

    # Extract speaker embedding
    speaker_embedding = model.make_speaker_embedding(ref_wav, ref_sr)

    # Read the lesson script
    with open(script_path, "r", encoding="utf-8") as f:
        lesson_text = f.read()

    print(f"Script length: {len(lesson_text)} characters")

    # Split into chunks
    chunks = split_into_chunks(lesson_text, max_chars=250)
    print(f"Split into {len(chunks)} chunks")

    # Create output directory for chunks
    lesson_output_dir = output_dir / f"lesson_{lesson_num:02d}_chunks"
    lesson_output_dir.mkdir(exist_ok=True)

    # Generate audio for each chunk
    sample_rate = model.autoencoder.sampling_rate

    from zonos.conditioning import make_cond_dict

    for i, chunk in enumerate(chunks):
        print(f"  Chunk {i+1}/{len(chunks)}: {chunk[:50]}...")

        cond_dict = make_cond_dict(
            text=chunk,
            language="en-us",
            speaker=speaker_embedding,
            emotion=[0.35, 0.15, 0.0, 0.05, 0.15, 0.0, 0.1, 0.2],
            pitch_std=70.0,
            speaking_rate=14.0,
        )

        conditioning = model.prepare_conditioning(cond_dict)
        codes = model.generate(conditioning)
        wav = model.autoencoder.decode(codes).cpu()

        # Save chunk
        chunk_path = lesson_output_dir / f"chunk_{i+1:03d}.wav"
        torchaudio.save(str(chunk_path), wav[0], sample_rate)

    # Concatenate all chunks using ffmpeg
    print("Concatenating chunks...")
    file_list_path = lesson_output_dir / "filelist.txt"
    with open(file_list_path, "w") as f:
        for i in range(len(chunks)):
            chunk_path = lesson_output_dir / f"chunk_{i+1:03d}.wav"
            f.write(f"file '{chunk_path}'\n")

    # Get lesson title from script filename
    title_match = re.match(r'(.+)_TTS_Script\.txt', script_path.name)
    title = title_match.group(1) if title_match else f"Lesson_{lesson_num:02d}"

    output_path = output_dir / f"{title}_Zonos_Full.wav"

    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(file_list_path),
        "-c", "copy",
        str(output_path)
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ffmpeg error: {result.stderr}")
        return False

    # Get final duration
    with wave.open(str(output_path), 'rb') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        duration = frames / rate

    print(f"SUCCESS: {output_path.name}")
    print(f"Duration: {duration:.1f}s ({duration/60:.1f} minutes)")

    return True


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Batch generate lesson audio")
    parser.add_argument("--start", type=int, default=1, help="Start lesson number")
    parser.add_argument("--end", type=int, default=51, help="End lesson number")
    parser.add_argument("--lesson", type=int, help="Generate only this lesson")
    args = parser.parse_args()

    if args.lesson:
        start = end = args.lesson
    else:
        start = args.start
        end = args.end

    print("=" * 60)
    print("BATCH LESSON AUDIO GENERATOR")
    print(f"Generating lessons {start} to {end}")
    print("=" * 60)

    # Check CUDA
    print(f"\nCUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"GPU: {torch.cuda.get_device_name(0)}")

    # Load model
    print("\nLoading Zonos model...")
    from zonos.model import Zonos
    model = Zonos.from_pretrained("Zyphra/Zonos-v0.1-transformer", device="cuda")
    print("Model loaded!")

    # Output directory
    output_dir = Path("/mnt/c/Users/scott/My-First-Project/My-First-Project/history-lesson-creator/lessons")

    # Generate lessons
    success_count = 0
    fail_count = 0

    for lesson_num in range(start, end + 1):
        voice_file = LESSON_VOICE_MAP.get(lesson_num)
        if not voice_file:
            print(f"WARNING: No voice mapping for lesson {lesson_num}")
            fail_count += 1
            continue

        script_path = get_tts_script_path(lesson_num)
        if not script_path:
            print(f"WARNING: No TTS script found for lesson {lesson_num}")
            fail_count += 1
            continue

        try:
            if generate_lesson(model, lesson_num, voice_file, script_path, output_dir):
                success_count += 1
            else:
                fail_count += 1
        except Exception as e:
            print(f"ERROR generating lesson {lesson_num}: {e}")
            fail_count += 1

    print("\n" + "=" * 60)
    print("BATCH GENERATION COMPLETE")
    print("=" * 60)
    print(f"Success: {success_count}")
    print(f"Failed: {fail_count}")


if __name__ == "__main__":
    main()
