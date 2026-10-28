# Python LMS Platform

An interactive Learning Management System for Python programming, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **8 Comprehensive Modules**: From Python basics to advanced OOP concepts
- **40+ Interactive Lessons**: Each with explanations, key concepts, and real-world applications
- **12 Hands-On Projects**: Real-world Python projects to practice your skills
- **Interactive Code Editor**: Monaco editor with syntax highlighting
- **Progress Tracking**: Mark lessons as complete and track your progress
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX**: Smooth animations and intuitive navigation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lms-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

### Option 3: Vercel GitHub Integration

1. Go to your repository on GitHub
2. Click "Settings" > "Integrations" > "Vercel"
3. Follow the setup wizard
4. Every push to your main branch will trigger a deployment

## Project Structure

```
lms-platform/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── lesson/       # Lesson pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ModuleCard.tsx
│   │   ├── ProjectCard.tsx
│   │   └── CodeEditor.tsx
│   ├── data/            # Course data
│   │   └── courseData.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── lib/             # Utility functions
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── vercel.json          # Vercel configuration
```

## Course Content

The LMS covers the following modules:

1. **Introduction to Python** - Setup and first program
2. **Variables & Data Types** - Numbers, strings, lists, dictionaries
3. **Control Flow** - If statements, loops
4. **Functions** - Definition, arguments, lambdas
5. **Object-Oriented Programming** - Classes, inheritance, encapsulation
6. **File Handling** - Reading/writing files, JSON
7. **Error Handling** - Try-except, custom exceptions
8. **Modules & Packages** - Importing, creating modules

## Projects Included

- Calculator (Beginner)
- Quiz Game (Beginner)
- To-Do List (Beginner)
- Contact Book (Intermediate)
- Student Grade Management (Intermediate)
- Password Generator (Beginner)
- File Organizer (Intermediate)
- Number Guessing Game (Beginner)
- Tic-Tac-Toe (Intermediate)
- Text Adventure Game (Intermediate)
- Sudoku Generator & Solver (Advanced)
- Mini Programming Language (Advanced)

## Customization

### Adding New Modules

Edit `src/data/courseData.ts` to add new modules:

```typescript
{
  id: 'new-module',
  title: 'Module Title',
  description: 'Module description',
  icon: 'IconName',
  order: 9,
  topics: [
    {
      id: 'topic-id',
      title: 'Topic Title',
      explanation: 'Explanation',
      keyConcepts: 'Key concepts',
      realWorld: 'Real world application',
      code: 'Code example',
      order: 1
    }
  ]
}
```

### Changing Colors

Edit `src/app/globals.css` to customize the color scheme:

```css
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --accent: #10b981;
  /* ... other colors */
}
```

## License

This project is licensed under the MIT License.

## Credits

Built based on the [Basic-Python](https://github.com/devstephenke-sys/Basic-Python) repository by devstephenke-sys.
