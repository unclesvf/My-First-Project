# Reusable Skills for Future Course Building

Based on the patterns in this codebase, here are skills that would accelerate future course development:

---

## 1. 🎓 **lesson-builder** Skill

**Purpose:** Scaffold a new lesson with proper structure (chapters, flashcards, quizzes)

**What it would do:**
- Prompt for lesson metadata (title, description, narrator, subject)
- Create chapter structure with content placeholders
- Generate flashcard templates (10-12 cards)
- Create quiz question templates (8 questions)
- Validate lesson structure against types
- Add to lessons.ts array automatically

**Example Usage:**
```bash
/lesson-builder
# Prompts:
# - Lesson title: "The Civil Rights Movement"
# - Description: "...
# - Number of chapters: 5
# - Narrator perspective: "Rosa Parks, civil rights activist, 1955"
```

**Output:** Complete lesson object added to data/lessons.ts

**Time Saved:** 2-3 hours per lesson (scaffolding, typing, validation)

---

## 2. 🔒 **firebase-security-auditor** Skill

**Purpose:** Scan Firebase integration for security vulnerabilities

**What it would check:**
- `.env.local` not committed to git
- Console logging in production code
- Missing security rules
- Input validation on auth functions
- Exposed error messages
- Client-side Firebase operations without rules
- User role verification in database operations

**Example Usage:**
```bash
/firebase-security-auditor
```

**Output:**
```
🔍 Firebase Security Audit Results:

❌ CRITICAL: Console.error found in lib/firebase/auth.ts (line 20)
❌ HIGH: No firestore.rules file found
⚠️  MEDIUM: signUpWithEmail missing email validation
✅ GOOD: .env.local in .gitignore
```

**Time Saved:** 1-2 hours per audit (manual code review)

---

## 3. ♿ **accessibility-checker** Skill

**Purpose:** Scan components for accessibility issues (WCAG 2.1 AA compliance)

**What it would check:**
- Missing aria-labels on interactive elements
- Missing alt text on images
- Keyboard navigation support
- Color contrast ratios
- Focus management
- Semantic HTML usage
- Screen reader compatibility

**Example Usage:**
```bash
/accessibility-checker components/
```

**Output:**
```
♿ Accessibility Report:

components/FlashcardDeck.tsx:
  ❌ Line 88: Button missing aria-label
  ❌ Line 120: No keyboard handler for Space key
  ⚠️  Line 65: Consider prefers-reduced-motion for animations

components/QuizEngine.tsx:
  ❌ Line 189: Radio buttons need role="radio" and aria-checked
  ⚠️  Line 121: Question text should use semantic <label>

Score: 62/100 (Needs Improvement)
```

**Time Saved:** 2-3 hours per review (manual accessibility testing)

---

## 4. 📦 **data-optimizer** Skill

**Purpose:** Analyze large data files and suggest optimizations

**What it would do:**
- Measure file sizes in `data/` directory
- Identify files over 100KB
- Calculate bundle impact
- Suggest splitting strategies
- Generate split-file scripts
- Recommend lazy loading patterns
- Estimate performance improvements

**Example Usage:**
```bash
/data-optimizer
```

**Output:**
```
📦 Data Optimization Report:

⚠️  LARGE FILE: data/lessons.ts (730KB)
   - Contains 50 lessons
   - Loaded on every page
   - Increases bundle by ~500KB after minification

💡 Recommendations:
   1. Split into per-lesson files (lessons/lesson-1.ts, etc.)
      Estimated savings: 450KB initial load

   2. Move to Firestore or JSON in public/
      Estimated savings: 500KB initial load

   3. Implement dynamic imports
      Code: await import(\`@/data/lessons/\${id}.ts\`)

Would you like me to automatically split lessons.ts? (y/n)
```

**Time Saved:** 1 hour per optimization (analysis + implementation)

---

## 5. 📤 **course-exporter** Skill

**Purpose:** Export course content in multiple formats for various platforms

**What it would export:**
- Markdown (for documentation/AI assistants)
- JSON (for APIs/databases)
- CSV (for spreadsheets)
- SCORM (for LMS platforms like Moodle, Canvas)
- PDF (for printable workbooks)
- HTML (standalone lesson pages)

**Example Usage:**
```bash
/course-exporter --format=json --lessons=1-10
```

**Output:**
```
📤 Exporting lessons 1-10 to JSON format...

✅ Created: exports/lessons-1-10.json (145KB)
✅ Created: exports/flashcards-1-10.json (23KB)
✅ Created: exports/quizzes-1-10.json (31KB)

Files ready to import into your LMS!
```

**Time Saved:** 30-60 minutes per export (manual formatting)

---

## 6. 🧪 **component-tester** Skill

**Purpose:** Generate test files for React components with common scenarios

**What it would generate:**
- Unit tests for component rendering
- Interaction tests (clicks, keyboard nav)
- Accessibility tests
- Snapshot tests
- Edge case tests (empty data, errors)

**Example Usage:**
```bash
/component-tester components/FlashcardDeck.tsx
```

**Output:** Creates `components/FlashcardDeck.test.tsx` with:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import FlashcardDeck from './FlashcardDeck';

describe('FlashcardDeck', () => {
  it('renders first flashcard', () => {
    // Test generated automatically
  });

  it('flips card on click', () => {
    // Test generated automatically
  });

  it('navigates with arrow keys', () => {
    // Test generated automatically
  });

  it('announces changes to screen readers', () => {
    // Accessibility test generated
  });
});
```

**Time Saved:** 1-2 hours per component (writing tests)

---

## 7. 🎨 **theme-generator** Skill

**Purpose:** Generate consistent theme/styling for new courses

**What it would do:**
- Prompt for subject (History, Math, Science, etc.)
- Generate Tailwind color palette
- Create subject-appropriate icons
- Generate hero images
- Create consistent component styling
- Apply theme across all lesson pages

**Example Usage:**
```bash
/theme-generator --subject=mathematics
```

**Output:**
```
🎨 Generated Mathematics Theme:

Colors:
  - Primary: #2563EB (Blue)
  - Secondary: #7C3AED (Purple)
  - Accent: #10B981 (Green)

Created:
  ✅ tailwind.config.ts (updated with math theme)
  ✅ public/images/math-hero.svg
  ✅ styles/themes/mathematics.css

Apply theme now? (y/n)
```

**Time Saved:** 2-3 hours (design + implementation)

---

## 8. 🔄 **lesson-migrator** Skill

**Purpose:** Migrate lessons from one format to another

**What it would handle:**
- TypeScript → Firestore
- JSON → TypeScript
- CSV/Excel → TypeScript lesson format
- Google Docs → Lesson structure
- Markdown → Lesson chapters

**Example Usage:**
```bash
/lesson-migrator --from=google-docs --to=typescript --url=<doc-url>
```

**Output:**
```
🔄 Migrating lesson from Google Doc...

✅ Extracted 5 chapters
✅ Generated 12 flashcards
✅ Created 8 quiz questions
✅ Added to data/lessons.ts

Lesson "The Industrial Revolution" ready!
```

**Time Saved:** 3-4 hours per lesson (manual conversion)

---

## 9. 📊 **analytics-setup** Skill

**Purpose:** Add analytics and progress tracking to existing lessons

**What it would add:**
- Firebase Analytics integration
- Progress tracking hooks
- Completion rate metrics
- Quiz score analytics
- Time-on-page tracking
- User engagement metrics
- Teacher dashboard setup

**Example Usage:**
```bash
/analytics-setup
```

**Output:**
```
📊 Setting up analytics...

✅ Installed dependencies
✅ Created lib/analytics/tracker.ts
✅ Added tracking to StoryReader
✅ Added tracking to FlashcardDeck
✅ Added tracking to QuizEngine
✅ Created analytics dashboard at /teacher/analytics

Ready to track user progress!
```

**Time Saved:** 4-5 hours (setup + integration)

---

## 10. 🚀 **deployment-optimizer** Skill

**Purpose:** Optimize build and deployment for production

**What it would do:**
- Run Lighthouse audit
- Analyze bundle size
- Identify unused dependencies
- Optimize images
- Configure caching
- Set up CDN
- Generate service worker
- Create deployment checklist

**Example Usage:**
```bash
/deployment-optimizer
```

**Output:**
```
🚀 Deployment Optimization Report:

Performance:
  ⚠️  Initial bundle: 1.2MB (target: <500KB)
  ⚠️  First Contentful Paint: 2.1s (target: <1.5s)
  ✅ Time to Interactive: 1.8s

Recommendations:
  1. Enable code splitting for lessons.ts (-500KB)
  2. Optimize images in public/images/ (-200KB)
  3. Remove unused tailwind classes (-50KB)
  4. Enable Brotli compression (-30%)

Run optimizations now? (y/n)
```

**Time Saved:** 2-3 hours per deployment (manual optimization)

---

## 11. 🔐 **security-hardening** Skill

**Purpose:** Implement comprehensive security measures

**What it would add:**
- Content Security Policy headers
- Rate limiting on authentication
- Input validation utilities
- XSS protection (DOMPurify integration)
- CSRF protection
- Security headers in deployment config
- Audit logging for sensitive operations

**Example Usage:**
```bash
/security-hardening
```

**Output:**
```
🔐 Security Hardening Applied:

✅ Added CSP headers in next.config.ts
✅ Created lib/utils/validation.ts
✅ Added rate limiting to auth endpoints
✅ Installed and configured DOMPurify
✅ Updated security headers in deploy config
✅ Created security audit log

Security score: 85/100 (Good)
```

**Time Saved:** 3-4 hours (security implementation)

---

## 12. 📝 **content-validator** Skill

**Purpose:** Validate lesson content for quality and consistency

**What it would check:**
- Grammar and spelling
- Reading level appropriateness
- Historical accuracy (fact-checking)
- Consistent terminology
- Proper citations
- Age-appropriate content
- Balanced perspectives
- Inclusive language

**Example Usage:**
```bash
/content-validator data/lessons.ts --grade-level=7
```

**Output:**
```
📝 Content Validation Report:

Lesson 1: One World to the Next
  ✅ Reading level: 7th grade (Flesch-Kincaid: 7.2)
  ⚠️  Chapter 3: Consider adding citation for 'encomienda system'
  ✅ Inclusive language: Passed
  ⚠️  Vocabulary: 'mercantile' may be too advanced

Lesson 2: Survival in Jamestown
  ✅ All checks passed

Overall Score: 92/100 (Excellent)
```

**Time Saved:** 2-3 hours per lesson (manual review)

---

## Priority Ranking for Skill Development

Based on frequency of use and time savings:

### Phase 1 - Essential (Build First)
1. **lesson-builder** - Used for every new lesson (most common task)
2. **firebase-security-auditor** - Critical for security compliance
3. **data-optimizer** - Performance is crucial

### Phase 2 - High Value
4. **course-exporter** - Enables multi-platform distribution
5. **accessibility-checker** - Required for compliance
6. **component-tester** - Improves code quality

### Phase 3 - Nice to Have
7. **theme-generator** - Speeds up new subject launches
8. **lesson-migrator** - Useful for content imports
9. **content-validator** - Quality assurance

### Phase 4 - Advanced
10. **analytics-setup** - Teacher feature enhancement
11. **deployment-optimizer** - Production optimization
12. **security-hardening** - Ongoing security maintenance

---

## Implementation Roadmap

### Week 1-2: Core Skills
- Build `lesson-builder` skill
- Build `firebase-security-auditor` skill
- Test with existing lessons

### Week 3-4: Quality Skills
- Build `data-optimizer` skill
- Build `accessibility-checker` skill
- Run audits on current codebase

### Week 5-6: Distribution Skills
- Build `course-exporter` skill
- Build `theme-generator` skill
- Test with multiple export formats

### Week 7-8: Advanced Skills
- Build remaining skills as needed
- Integrate with CI/CD pipeline
- Document usage patterns

---

## Estimated ROI

**Without Skills:**
- Creating 1 lesson: 6-8 hours
- Security audit: 2 hours
- Accessibility check: 2 hours
- Export formats: 1 hour
- **Total per lesson: 11-13 hours**

**With Skills:**
- Creating 1 lesson: 2-3 hours (lesson-builder)
- Security audit: 10 minutes (automated)
- Accessibility check: 5 minutes (automated)
- Export formats: 2 minutes (automated)
- **Total per lesson: 2.5-3.5 hours**

**Time Savings: 8-10 hours per lesson**

**For 50 lessons: 400-500 hours saved (10-12 weeks of full-time work)**

---

## Conclusion

These skills would transform course building from a manual, repetitive process into a streamlined, automated workflow. The initial investment in building these skills (approximately 8 weeks) would pay off dramatically when creating future courses in Math, Science, or other subjects.

**Recommended Next Steps:**
1. Start with `lesson-builder` skill (highest impact)
2. Add `firebase-security-auditor` for current project
3. Implement `data-optimizer` to fix 730KB file issue
4. Gradually add remaining skills as needed

These skills would make you 3-4x faster at building educational content platforms.
