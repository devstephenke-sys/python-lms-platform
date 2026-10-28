'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--secondary)]/10" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span>Interactive Learning Platform</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            Master Python Programming
          </h1>

          <p className="text-lg md:text-xl text-[var(--foreground)]/80 mb-8 max-w-2xl mx-auto">
            Learn Python from beginner to intermediate with hands-on lessons, interactive code examples, and real-world projects. Build your coding skills step by step.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#modules"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              <Play className="h-5 w-5" />
              Start Learning
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[var(--border)] rounded-lg font-medium hover:bg-[var(--card-bg)] transition-colors"
            >
              View Projects
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary)]">8+</div>
              <div className="text-sm text-[var(--foreground)]/60">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--secondary)]">40+</div>
              <div className="text-sm text-[var(--foreground)]/60">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--accent)]">12</div>
              <div className="text-sm text-[var(--foreground)]/60">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary)]">100%</div>
              <div className="text-sm text-[var(--foreground)]/60">Interactive</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
