# History Lesson Creator

An engaging, interactive history lesson application for 7th graders, featuring immersive first-person stories, interactive flashcards, and knowledge-testing quizzes.

## Features

- **First-Person Stories**: Experience American history through the eyes of those who lived it
- **Interactive Flashcards**: Master key terms and concepts with 3D flip animations
- **Knowledge Quizzes**: Test understanding with instant feedback and detailed explanations
- **Beautiful UI**: Premium design with smooth animations powered by Framer Motion
- **Fully Responsive**: Works great on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

## Project Structure

```
history-lesson-creator/
├── app/                      # Next.js App Router pages
│   ├── lesson/[id]/         # Dynamic lesson pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── Navigation.tsx       # Navigation bar
│   ├── Footer.tsx           # Footer
│   ├── StoryReader.tsx      # Story reading component
│   ├── FlashcardDeck.tsx    # Flashcard component
│   └── QuizEngine.tsx       # Quiz component
├── data/                    # Lesson content
│   └── lessons.ts           # Lesson data
├── lib/                     # Utility functions
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Helper functions
└── public/                  # Static assets

```

## Lesson Content

### Lesson 1: One World to the Next

This lesson covers English and Spanish settlement in the Americas through the first-person narrative of Mateo, a 13-year-old Spanish settler in St. Augustine.

**Topics Covered:**
- Spanish settlement of St. Augustine (1565)
- English settlement of Jamestown (1607)
- Indigenous peoples (Timucua and Powhatan)
- The Columbian Exchange
- Early colonial struggles and survival
- Cultural collisions and consequences

**Learning Components:**
- 5 immersive story chapters
- 8 educational flashcards
- 8 comprehensive quiz questions

## Customization

### Adding New Lessons

Edit `data/lessons.ts` to add new lessons:

```typescript
export const lessons: Lesson[] = [
  {
    id: "your-lesson-id",
    title: "Your Lesson Title",
    description: "Brief description",
    heroImage: "/path/to/image.jpg",
    story: {
      narrator: "Character name and context",
      chapters: [
        {
          title: "Chapter Title",
          content: "Chapter content..."
        }
      ]
    },
    flashcards: [...],
    quiz: [...]
  }
];
```

### Customizing the Theme

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: { /* Your primary colors */ },
  parchment: { /* Your secondary colors */ },
  accent: { /* Your accent colors */ }
}
```

## Educational Standards

This application is designed to align with:
- 7th Grade American History curriculum
- Common Core State Standards for Literacy in History/Social Studies
- Interactive and engaging learning best practices

## License

MIT

## Author

Built for engaging history education for 7th-grade students.
