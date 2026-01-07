# Getting Started with History Lesson Creator

## Quick Start

1. **Install Dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

### Home Page
- Overview of available history lessons
- Feature cards highlighting Stories, Flashcards, and Quizzes
- Click on "Lesson 1: One World to the Next" to begin

### Lesson Page
The lesson page has three interactive tabs:

#### 1. Story Tab
- Immersive first-person narrative from Mateo, a 13-year-old Spanish settler
- 5 engaging chapters about Spanish and English settlement
- Beautiful animations as you navigate between chapters
- Progress indicator showing your current chapter

**Navigation:**
- Click "Next" / "Previous" buttons
- Click progress dots to jump to specific chapters

#### 2. Flashcards Tab
- 8 key historical terms with definitions
- 3D flip animation (click or press Space/Enter to flip)
- Keyboard navigation with arrow keys
- Shuffle button to randomize order
- Reset button to restore original order

**Navigation:**
- Arrow keys: Previous/Next card
- Space/Enter: Flip card
- Click: Flip card
- Mouse: Use navigation buttons

#### 3. Quiz Tab
- 8 comprehensive questions testing story comprehension
- Multiple-choice format with instant feedback
- Visual animations for correct/incorrect answers
- Detailed explanations for each answer
- Final score summary with review of all questions
- "Try Again" option to retake the quiz

**Features:**
- Real-time score calculation
- Green highlighting for correct answers
- Red highlighting with shake animation for incorrect answers
- Progress bar showing quiz completion

## Educational Content

### Lesson 1: One World to the Next
**Topic:** English & Spanish Settlement in the Americas

**Key Learning Objectives:**
- Understand Spanish settlement (St. Augustine, 1565)
- Learn about English settlement (Jamestown, 1607)
- Explore indigenous peoples (Timucua and Powhatan)
- Examine the motivations for European colonization
- Analyze the impact of cultural collision

**Vocabulary:**
- St. Augustine
- Jamestown
- Conquistador
- Joint-Stock Company
- Timucua
- Powhatan
- Encomienda System
- Columbian Exchange

## Technical Features

### Animations
- **Framer Motion** powers smooth page transitions
- Story chapters slide in/out with spring physics
- Flashcards have 3D flip animations
- Quiz answers shake when incorrect
- Buttons scale on interaction

### Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Optimized for different screen sizes

### Accessibility
- Keyboard navigation support
- Clear visual feedback
- Readable font sizes and colors
- Proper contrast ratios

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Tips for Students

1. **Read the Story First**: The story provides context for the flashcards and quiz
2. **Take Your Time**: Each chapter has valuable historical information
3. **Use Flashcards**: Review terms before taking the quiz
4. **Learn from Mistakes**: Quiz explanations help reinforce learning
5. **Try Multiple Times**: Retake the quiz to improve your score

## For Teachers

This application is designed for:
- **Grade Level**: 7th Grade
- **Subject**: American History
- **Duration**: 30-45 minutes per lesson
- **Format**: Self-paced learning

Students can work through lessons independently or as part of guided instruction.

## Next Steps

To add more lessons, edit the `data/lessons.ts` file following the existing structure. Each lesson should include:
- Story with narrator and chapters
- Flashcards with terms and definitions
- Quiz questions with explanations

Enjoy learning history in an engaging, interactive way!
