# Python LMS Platform

An interactive Learning Management System for Python programming, built with Next.js, TypeScript, and Tailwind CSS. Features a complete backend with SQLite database, user authentication, and progress tracking.

## Features

### Frontend
- **8 Comprehensive Modules**: From Python basics to advanced OOP concepts
- **40+ Interactive Lessons**: Each with explanations, key concepts, and real-world applications
- **12 Hands-On Projects**: Real-world Python projects to practice your skills
- **Interactive Code Editor**: Monaco editor with syntax highlighting
- **Progress Tracking**: Mark lessons as complete and track your progress
- **Pagination**: Efficient navigation through modules and projects
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX**: Smooth animations with Framer Motion

### Backend
- **SQLite Database**: Persistent data storage with better-sqlite3
- **User Authentication**: Registration and login with bcrypt password hashing
- **Progress Persistence**: Track user learning progress in the database
- **REST API**: Next.js API routes for backend operations
- **Input Validation**: Zod schema validation for all API endpoints
- **User Dashboard**: Personalized learning dashboard with progress overview

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor

### Backend
- **Database**: SQLite (better-sqlite3)
- **Authentication**: Custom implementation with bcrypt
- **Validation**: Zod
- **API**: Next.js API Routes
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/devstephenke-sys/python-lms-platform.git
cd lms-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

The database will be automatically created in the `data/` directory on first run.

## Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password

### Progress
- `GET /api/progress?userId={id}` - Get user progress
- `GET /api/progress?userId={id}&moduleId={id}` - Get progress for specific module
- `POST /api/progress` - Mark a topic as complete

## Database Schema

### Users
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Progress
```sql
CREATE TABLE progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  module_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, topic_id)
)
```

### Quiz Attempts
```sql
CREATE TABLE quiz_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  module_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN DEFAULT 0,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

### Certificates
```sql
CREATE TABLE certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  module_id TEXT NOT NULL,
  certificate_id TEXT UNIQUE NOT NULL,
  issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
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

**Note**: For production deployment with SQLite, you may want to use a production database like PostgreSQL and update the database schema accordingly.

## Project Structure

```
lms-platform/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # Authentication endpoints
│   │   │   └── progress/ # Progress tracking endpoints
│   │   ├── dashboard/    # User dashboard
│   │   ├── lesson/       # Lesson pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Auth.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ModuleCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── CodeEditor.tsx
│   │   └── Pagination.tsx
│   ├── data/            # Course data
│   │   └── courseData.ts
│   ├── lib/             # Utility functions
│   │   └── db/          # Database utilities
│   │       ├── schema.ts
│   │       ├── users.ts
│   │       ├── progress.ts
│   │       └── init-server.ts
│   └── types/           # TypeScript types
│       └── index.ts
├── data/                # Database directory (gitignored)
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

## Future Enhancements

- [ ] Quiz system with automatic grading
- [ ] Certificate generation on module completion
- [ ] Instructor dashboard for course management
- [ ] Video lessons integration
- [ ] Discussion forums
- [ ] Code submission and review
- [ ] Integration with external Python execution service
- [ ] Migration to PostgreSQL for production

## License

This project is licensed under the MIT License.

## Credits

Built based on the [Basic-Python](https://github.com/devstephenke-sys/Basic-Python) repository by devstephenke-sys.
