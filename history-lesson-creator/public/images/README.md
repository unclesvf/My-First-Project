# Hero Images for History Lessons

## Current Status

**Lesson 51 (Theodore Roosevelt):** Placeholder SVG created at `hero-roosevelt.svg`

## Getting Historical Images

### Free Public Domain Sources:

1. **Library of Congress** - https://www.loc.gov/
   - Massive collection of historical photos
   - Most are public domain
   - Search: "Theodore Roosevelt"
   - Recommended: Presidential portraits, Rough Riders photos

2. **National Archives** - https://www.archives.gov/
   - Government photos, all public domain
   - High-quality historical images
   - Search their catalog

3. **Wikimedia Commons** - https://commons.wikimedia.org/
   - Public domain historical images
   - Search: "Theodore Roosevelt 1901"
   - Check licensing carefully

4. **Smithsonian Institution** - https://www.si.edu/
   - Open Access collection
   - Download high-resolution images

### Recommended Images for Lesson 51 (Theodore Roosevelt):

**Option 1:** Official presidential portrait
- Formal, presidential
- Shows TR in his prime
- Good for educational content

**Option 2:** Rough Riders photo
- TR in military uniform with his cavalry
- Action-oriented, engaging
- Connects to chapter 1 content

**Option 3:** TR at Yosemite
- Shows conservation work
- With John Muir
- Connects to chapter 4 content

**Option 4:** TR speaking from train platform ("Bully Pulpit")
- Shows him as orator
- Connects to chapter 6 content

### Image Specifications:

- **Format:** JPG or PNG (Next.js supports both)
- **Dimensions:** 1200x400px (or similar 3:1 ratio)
- **File size:** Under 500KB for web performance
- **Resolution:** 72-150 DPI for web

### Using AI Image Generation:

You can also use AI tools like:
- **Midjourney**: Historical portrait style
- **DALL-E 3**: "Theodore Roosevelt presidential portrait, 1901, historical photograph style"
- **Stable Diffusion**: Use historical photography prompts

**Sample Prompt:**
```
"Formal presidential portrait of Theodore Roosevelt,
26th President, circa 1901, wearing glasses and formal suit,
mustache, serious expression, sepia-toned historical photograph,
library background, high quality"
```

### File Naming Convention:

- Format: `hero-[topic-slug].jpg`
- Example: `hero-roosevelt.jpg`
- Keep consistent with `heroImage` property in lessons.ts

### Replacing the Placeholder:

1. Download or generate your image
2. Resize to 1200x400px (or 3:1 ratio)
3. Optimize file size (use TinyPNG or similar)
4. Save as `hero-roosevelt.jpg` in this directory
5. Delete `hero-roosevelt.svg` placeholder

### Future Lessons:

When creating new lessons, add hero images following this pattern:
- Lesson 52: `hero-[topic].jpg`
- Lesson 53: `hero-[topic].jpg`
- etc.

## Legal Note:

Always verify images are:
- Public domain (published before 1928 in US)
- Government work (no copyright)
- Creative Commons licensed (check restrictions)
- Properly attributed if required

**Most presidential photos from Library of Congress are public domain.**

## Next.js Image Optimization

Next.js automatically optimizes images, but for static export:
- Images remain as-is (no optimization)
- Use optimized images before adding to project
- Consider WebP format for better compression

---

**Current placeholder (hero-roosevelt.svg) is a temporary solution.**
**Replace with historical photo when available.**
