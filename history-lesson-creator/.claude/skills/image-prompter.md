# Image Prompter Skill

## Description
Generate expert-level image generation prompts for educational history lessons, optimized for Nano Banana Pro, Grok Imagine, and ChatGPT DALL-E. Creates historically accurate, educationally valuable prompts for lesson hero images and chapter illustrations.

## Usage
User can invoke this skill by saying:
- "create image prompts for lesson [number]"
- "generate hero image prompt for [topic]"
- "/image-prompter"
- "make prompts for [lesson/chapter]"
- "create illustration prompts"

## Instructions

You are an expert at creating image generation prompts for historical educational content. You specialize in crafting prompts that work across multiple AI platforms while maintaining historical accuracy and educational value.

### Step 1: Understand the Context

First, gather information about what needs illustration:

**For Hero Images (Lesson Overview):**
- Lesson title and description
- Historical period
- Key figures
- Main themes
- Educational goals

**For Chapter Illustrations:**
- Chapter title and content
- Specific scene or moment
- Characters/figures present
- Setting and time period
- Emotional tone

Ask user:
- What do you want to illustrate? (hero image, specific chapter, or all chapters)
- Which lesson/chapter?
- Any specific elements to emphasize?
- Any elements to avoid?

### Step 2: Read Lesson Content

If creating prompts for an existing lesson:
1. Read the relevant lesson from `data/lessons.ts`
2. Extract key information:
   - Historical period and dates
   - Main figures and their roles
   - Important locations
   - Key events described
   - Narrator's perspective
   - Emotional tone
3. Identify 2-3 most visually striking moments per chapter
4. Note historical accuracy requirements (clothing, architecture, technology)

### Step 3: Analyze Platform Requirements

Understand the strengths and syntax of each platform:

**Nano Banana Pro:**
- Strengths: Photorealistic historical scenes, attention to period details
- Syntax: Descriptive, natural language, emphasis on style and mood
- Optimal length: 50-100 words
- Best practices:
  - Start with subject/scene
  - Specify art style or photography style
  - Include lighting and atmosphere
  - Mention historical period explicitly
  - Add quality enhancers at end

**Grok Imagine (X.ai):**
- Strengths: Dynamic compositions, bold colors, dramatic scenes
- Syntax: Clear, structured, comma-separated descriptors
- Optimal length: 30-60 words
- Best practices:
  - Lead with main subject
  - Use specific style keywords
  - Include mood/tone descriptors
  - Historical context keywords
  - Avoid overly complex instructions

**ChatGPT DALL-E 3:**
- Strengths: Conceptual understanding, text integration, artistic styles
- Syntax: Natural language, conversational descriptions
- Optimal length: 80-150 words (can handle longer)
- Best practices:
  - Describe scene as if explaining to artist
  - Can understand complex compositions
  - Good at text in images (titles, labels)
  - Specify artistic medium (oil painting, photograph, etc.)
  - Include educational context

### Step 4: Craft Platform-Specific Prompts

For each illustration need, generate three optimized prompts:

**Template Structure for Historical Educational Images:**

```
[MAIN SUBJECT] in [SETTING], [TIME PERIOD]
[ACTION/POSE/EXPRESSION]
[CLOTHING/APPEARANCE DETAILS]
[BACKGROUND/ENVIRONMENT]
[LIGHTING/ATMOSPHERE]
[STYLE/MEDIUM]
[EDUCATIONAL CONTEXT]
[QUALITY ENHANCERS]
```

**Example for Theodore Roosevelt:**

**Nano Banana Pro Prompt:**
```
Theodore Roosevelt standing confidently at the White House, 1901.
He wears a dark formal suit with round wire-rimmed glasses,
prominent mustache, and determined expression. Presidential office
background with American flag, mahogany desk, and bookcases filled
with volumes. Warm golden afternoon light streams through tall
windows. Photographed in the style of early 20th century formal
presidential portraits, sepia-toned with subtle vignette. High
detail, historically accurate clothing and setting, museum quality,
8K resolution.
```

**Grok Imagine Prompt:**
```
Theodore Roosevelt, 26th President, formal portrait, 1901, dark
suit, round glasses, bold mustache, confident stance, White House
office, American flag, presidential desk, historical photograph
style, sepia tone, dramatic lighting, early 1900s photography,
authoritative presence, detailed, sharp focus, professional
historical documentation style
```

**ChatGPT DALL-E 3 Prompt:**
```
Create a formal presidential portrait of Theodore Roosevelt in his
first year as president, 1901. Show him as a robust man of 42 with
his characteristic round wire-rimmed glasses and prominent mustache,
wearing a dark three-piece suit typical of the era. He stands in the
White House with an air of confident determination that reflects his
"speak softly and carry a big stick" philosophy. The setting includes
mahogany furniture, leather-bound books suggesting his intellectual
nature, and subtle Progressive Era details. The photograph should
capture the style of formal early 20th century presidential
portraiture with warm sepia tones and careful attention to period-
accurate details in clothing, furniture, and decor. This image will
be used in an educational context for 7th grade American history
students learning about the Progressive Era.
```

### Step 5: Historical Accuracy Guidelines

For each prompt, ensure:

**Clothing & Fashion:**
- Accurate to specific decade
- Appropriate to person's social class
- Region-specific styles
- Proper accessories (hats, jewelry, etc.)

**Architecture & Setting:**
- Period-appropriate building styles
- Correct interior furnishings
- Accurate technology for time period
- Regional architectural features

**People & Figures:**
- Age-appropriate appearance
- Ethnically accurate representation
- Period-appropriate hairstyles
- Accurate uniforms/professional attire

**Technology & Objects:**
- No anachronisms (objects from wrong time)
- Correct tools and equipment
- Period-accurate transportation
- Appropriate writing implements, lighting, etc.

**Cultural Context:**
- Historically accurate social customs
- Period-appropriate activities
- Accurate representation of daily life
- Sensitive to historical realities (include diverse perspectives when historically accurate)

### Step 6: Educational Value Enhancement

Add elements that increase educational value:

**Visual Learning Cues:**
- Include identifying features students should remember
- Show cause-and-effect relationships visually
- Depict scale and scope of historical events
- Include recognizable historical symbols

**Context Clues:**
- Period-specific background details that teach
- Visual comparisons (before/after, rich/poor, etc.)
- Symbolic elements representing themes
- Geographic/environmental context

**Engagement Factors:**
- Dynamic compositions (action, emotion)
- Human interest (facial expressions, interactions)
- Surprising or memorable details
- Visual storytelling elements

### Step 7: Format Output

Present prompts in clear, organized format:

```markdown
## Prompts for [Lesson/Chapter Name]

**Context:** [Brief description of what this illustrates]
**Historical Period:** [Dates]
**Key Elements:** [3-5 most important visual elements]

---

### 🍌 Nano Banana Pro Prompt

[Full prompt optimized for Nano Banana Pro]

**Key Features:**
- [What makes this work well on this platform]

---

### 🤖 Grok Imagine Prompt

[Full prompt optimized for Grok Imagine]

**Key Features:**
- [What makes this work well on this platform]

---

### 🎨 ChatGPT DALL-E 3 Prompt

[Full prompt optimized for DALL-E 3]

**Key Features:**
- [What makes this work well on this platform]

---

### 📋 Generation Tips

**For best results:**
1. [Specific tip for this subject matter]
2. [Aspect ratio recommendation]
3. [Style variation suggestions]

**Historical Accuracy Notes:**
- [Important accuracy considerations]
- [References to verify details]

**Educational Use:**
- [How this image supports learning]
- [Discussion questions for students]
```

### Step 8: Quality Enhancers by Platform

Add platform-specific quality keywords:

**Nano Banana Pro Enhancers:**
- "8K resolution, highly detailed"
- "photorealistic, museum quality"
- "professional photography, award-winning"
- "historically accurate, archival quality"
- "sharp focus, perfect composition"
- "cinematic lighting, dramatic atmosphere"

**Grok Imagine Enhancers:**
- "detailed, sharp focus"
- "professional, high quality"
- "dramatic lighting, bold composition"
- "historically accurate"
- "vivid, clear, striking"

**DALL-E 3 Enhancers:**
- "in the style of [specific artist or period]"
- "suitable for educational textbook"
- "historically accurate and detailed"
- "clear composition for learning"
- "museum exhibition quality"

### Step 9: Iterate and Refine

After presenting prompts:
1. Ask if user wants variations
2. Offer to adjust for:
   - Different artistic styles (realistic, illustrated, painted)
   - Different time of day/lighting
   - Different perspectives/angles
   - Different emotional tones
   - More or less detail
3. Provide alternative prompt versions if requested

### Step 10: Create Prompt Collection

If generating prompts for entire lesson:
1. Create hero image prompt (lesson overview)
2. Create prompts for each chapter (5-6 prompts)
3. Optionally create prompts for:
   - Key vocabulary terms (visual definitions)
   - Quiz question illustrations
   - Timeline graphics
4. Save all prompts in organized markdown file in `prompts/` directory

## Example Workflows

### Workflow 1: Single Hero Image

**User:** "Create image prompts for lesson 51"

**Assistant:**
1. Read lesson 51 from data/lessons.ts
2. Extract: Theodore Roosevelt, Progressive Era, 1901-1909
3. Identify key themes: trust-busting, conservation, big stick
4. Generate 3 platform-specific prompts for hero image
5. Present formatted output with context and tips

### Workflow 2: All Chapter Illustrations

**User:** "Generate prompts for all chapters in lesson 51"

**Assistant:**
1. Read all 6 chapters from lesson 51
2. For each chapter, identify most visual scene
3. Generate 3 prompts per chapter (18 total)
4. Create organized markdown document
5. Save to `prompts/lesson-51-all-chapters.md`
6. Present summary with sample prompts

### Workflow 3: Specific Scene

**User:** "Create prompt for TR charging up San Juan Hill"

**Assistant:**
1. Identify historical event (Spanish-American War, 1898)
2. Research accurate details (Rough Riders, uniforms, setting)
3. Craft dramatic action scene prompts
4. Emphasize educational elements (courage, leadership, context)
5. Present 3 platform-specific versions

## Advanced Techniques

### For Action Scenes:
- Use dynamic verbs (charging, rallying, confronting)
- Specify camera angle (low angle for heroism, eye level for realism)
- Include motion blur or frozen action as appropriate
- Show multiple figures in coordinated action

### For Portrait Compositions:
- Specify pose and expression precisely
- Use "environmental portrait" style for context
- Include symbolic objects (props that tell story)
- Lighting that reveals character

### For Landscape/Setting Scenes:
- Establish scale with human figures
- Show period-specific development level
- Include atmospheric perspective for depth
- Use time of day to set mood

### For Educational Diagrams:
- Request clear labels and annotations
- Simple, uncluttered compositions
- High contrast for readability
- Infographic style when appropriate

## Historical Periods Quick Reference

**Colonial Era (1607-1776):**
- Wooden architecture, thatched roofs
- Puritans: dark clothing, white collars
- Native Americans: regional tribal dress
- Ships: tall ships, wooden vessels

**Revolutionary Era (1775-1800):**
- Continental Army: blue coats, tricorn hats
- British Redcoats
- Powdered wigs for upper class
- Colonial architecture becoming more refined

**Early Republic (1800-1850):**
- Empire style furniture
- Top hats for men
- Long dresses with high waists for women
- Candlelight, oil lamps

**Civil War Era (1850-1865):**
- Union blue vs Confederate gray uniforms
- Hoop skirts for women
- Kepi caps, rifles
- Telegraph, railroads

**Gilded Age (1870-1900):**
- Industrial settings, factories
- Victorian fashion: bustles, corsets
- Suits with vests for men
- Gaslight, early electricity

**Progressive Era (1900-1920):**
- Automobiles appearing
- Women's suffrage imagery
- Modern suits for men
- Gibson Girl style for women
- Early photography style

## Error Handling

If user requests:

**Anachronistic elements:**
- Politely explain historical inaccuracy
- Offer period-appropriate alternative
- Educate on why it matters

**Inappropriate content:**
- Redirect to educational focus
- Suggest age-appropriate alternatives
- Maintain historical sensitivity

**Vague requests:**
- Ask clarifying questions
- Offer specific options
- Provide examples to guide

**Technical limitations:**
- Explain what might not work on platform
- Suggest workarounds
- Offer alternative approaches

## Quality Checklist

Before presenting prompts, verify:
- [ ] Historically accurate to specific time period
- [ ] Age-appropriate for 7th grade audience
- [ ] Educationally valuable (teaches something)
- [ ] Culturally sensitive and inclusive
- [ ] Platform-optimized (right length, keywords)
- [ ] Clear and specific (not vague or ambiguous)
- [ ] Visually interesting (engaging composition)
- [ ] Technically achievable (not overly complex)
- [ ] Free of anachronisms (no wrong-period objects)
- [ ] Diverse perspectives when historically accurate

## Success Metrics

Excellent prompts should:
- Generate images usable in educational materials
- Accurately represent historical period
- Engage students visually
- Support lesson learning objectives
- Work consistently across all three platforms
- Require minimal regeneration attempts

## Platform Comparison Summary

| Feature | Nano Banana Pro | Grok Imagine | DALL-E 3 |
|---------|-----------------|--------------|----------|
| Best for | Photorealism | Dynamic scenes | Conceptual |
| Prompt length | 50-100 words | 30-60 words | 80-150 words |
| Style keywords | Very effective | Moderately effective | Very effective |
| Text in images | Limited | Limited | Excellent |
| Historical accuracy | Excellent | Good | Excellent |
| Complexity handling | Moderate | Moderate | High |
| Artistic styles | Primarily realistic | Versatile | Very versatile |

## Resources

**Historical Image References:**
- Library of Congress (loc.gov)
- National Archives (archives.gov)
- Smithsonian Collections
- Period fashion guides
- Historical architecture databases

**Style References:**
- Historical photography styles by decade
- Portrait painting styles (John Singer Sargent, etc.)
- Documentary photography
- Educational illustration styles

## Notes

- Always prioritize historical accuracy over artistic license
- Educational value comes first, aesthetics second
- When in doubt, consult primary sources
- Multiple prompt variations increase success rate
- Test prompts across platforms to find best fit
- Save successful prompts for future reference
