# Quick Reference Card

## 🚀 Start the Application

```bash
cd history-lesson-creator
npm run dev
```

Then open: **http://localhost:3000**

## ⌨️ Keyboard Shortcuts

### Story Tab
- **Next/Previous**: Use navigation buttons only

### Flashcards Tab
- **← Left Arrow**: Previous card
- **→ Right Arrow**: Next card
- **Space / Enter**: Flip card
- **Mouse Click**: Flip card

### Quiz Tab
- **Mouse Click**: Select answers and navigate

## 📚 Application Structure

### Home Page
```
/ → Lesson Dashboard
    ├── Features Overview
    └── Available Lessons
```

### Lesson Page
```
/lesson/lesson-1 → Lesson Detail
    ├── Story Tab (5 chapters)
    ├── Flashcards Tab (8 cards)
    └── Quiz Tab (8 questions)
```

## 🎨 Components

| Component | Purpose | Features |
|-----------|---------|----------|
| StoryReader | Display narrative | Chapter navigation, animations |
| FlashcardDeck | Study terms | 3D flip, shuffle, keyboard nav |
| QuizEngine | Test knowledge | Instant feedback, scoring |

## 📊 Lesson 1 Content

- **Title**: One World to the Next
- **Narrator**: Mateo (Spanish settler, 1565)
- **Chapters**: 5
- **Flashcards**: 8 historical terms
- **Quiz**: 8 multiple-choice questions

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Check code quality |

## 🎯 Key Files

```
📁 app/
  └── page.tsx .................... Home page
  └── lesson/[id]/page.tsx ....... Lesson viewer

📁 components/
  └── StoryReader.tsx ............ Story component
  └── FlashcardDeck.tsx .......... Flashcard component
  └── QuizEngine.tsx ............. Quiz component

📁 data/
  └── lessons.ts ................. Lesson content (EDIT HERE)

📁 lib/
  └── types.ts ................... TypeScript types
  └── utils.ts ................... Helper functions
```

## 📝 Adding New Lessons

Edit `data/lessons.ts`:

```typescript
{
  id: "lesson-2",
  title: "Your New Lesson",
  description: "Description here",
  story: {
    narrator: "Character name",
    chapters: [{ title: "...", content: "..." }]
  },
  flashcards: [{ id: "...", term: "...", definition: "..." }],
  quiz: [{ id: "...", question: "...", options: [...], ... }]
}
```

## 🎓 Educational Flow

1. **Read Story** → Understand historical context
2. **Study Flashcards** → Learn key vocabulary
3. **Take Quiz** → Test comprehension
4. **Review Results** → Reinforce learning

## 🌈 Theme Colors

- **Primary (Indigo)**: Academic, professional
- **Parchment (Yellow)**: Historical atmosphere
- **Accent (Amber)**: Success, achievements
- **Background**: Soft gradient

## ✅ Success Criteria

- ✅ Server running on port 3000
- ✅ No console errors
- ✅ All animations smooth
- ✅ Content displays correctly
- ✅ Navigation works properly

## 🆘 Troubleshooting

**Server won't start:**
```bash
# Kill any process on port 3000
npx kill-port 3000
npm run dev
```

**Build errors:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Type errors:**
```bash
# Check TypeScript
npx tsc --noEmit
```

## 📞 Need Help?

- **README.md** - Full documentation
- **GETTING_STARTED.md** - Detailed user guide
- **PROJECT_SUMMARY.md** - Complete overview

---

**Quick Start**: `npm run dev` → http://localhost:3000 → Enjoy! 🎉
