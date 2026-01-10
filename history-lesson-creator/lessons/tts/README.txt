TTS AUDIO FILES FOR "ONE WORLD TO THE NEXT"
============================================

This directory contains chapter text files formatted for Text-to-Speech synthesis.

FILES
-----
00_intro.txt                              - Lesson introduction
01_chapter_1_the_journey_begins.txt       - Chapter 1
02_chapter_2_survival_and_struggle.txt    - Chapter 2
03_chapter_3_building_a_new_world.txt     - Chapter 3
04_chapter_4_two_worlds_collide.txt       - Chapter 4
05_chapter_5_reflections_on_settlement.txt - Chapter 5
06_outro.txt                              - Lesson closing


USING WITH PIPER TTS (Recommended for RTX 4090)
-----------------------------------------------
Piper is fast and runs locally on your GPU.

Install:
    pip install piper-tts

Generate all chapters:
    python generate_audio.py --engine piper

Or manually for a single file:
    type 01_chapter_1_the_journey_begins.txt | piper --model en_US-lessac-medium --output_file chapter1.wav


USING WITH COQUI TTS
--------------------
Coqui offers high-quality voices with GPU acceleration.

Install:
    pip install TTS

Generate all chapters:
    python generate_audio.py --engine coqui

Or manually:
    tts --text "$(type 01_chapter_1_the_journey_begins.txt)" --model_name tts_models/en/ljspeech/tacotron2-DDC --out_path chapter1.wav


USING WITH ELEVEN LABS (Cloud API)
----------------------------------
Premium quality but requires API key and internet.

Install:
    pip install elevenlabs

Generate all chapters:
    python generate_audio.py --engine elevenlabs --api-key YOUR_API_KEY


QUICK BATCH GENERATION (Windows)
--------------------------------
To generate all audio files at once with Piper:

    for %f in (*.txt) do type "%f" | piper --model en_US-lessac-medium --output_file "audio\%~nf.wav"


OUTPUT
------
Generated audio files will be saved to the 'audio' subdirectory.

