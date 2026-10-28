'use client';

import { useState } from 'react';
import { Moon, Sun, Menu, X, BookOpen } from 'lucide-react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)] backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-[var(--primary)]" />
            <span className="text-xl font-bold">Python LMS</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#modules" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
              Modules
            </a>
            <a href="#projects" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
              Projects
            </a>
            <a href="#about" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--border)]">
            <a href="#modules" className="block py-2 text-sm font-medium hover:text-[var(--primary)] transition-colors">
              Modules
            </a>
            <a href="#projects" className="block py-2 text-sm font-medium hover:text-[var(--primary)] transition-colors">
              Projects
            </a>
            <a href="#about" className="block py-2 text-sm font-medium hover:text-[var(--primary)] transition-colors">
              About
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
