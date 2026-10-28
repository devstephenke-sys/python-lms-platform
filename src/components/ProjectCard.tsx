'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import * as Icons from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const Icon = Icons[project.icon as keyof typeof Icons] || Icons.Code;

  const difficultyColors = {
    Beginner: 'bg-green-500/10 text-green-500',
    Intermediate: 'bg-yellow-500/10 text-yellow-500',
    Advanced: 'bg-red-500/10 text-red-500',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="h-full p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--secondary)] transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-[var(--secondary)]/10 group-hover:bg-[var(--secondary)]/20 transition-colors">
            <Icon className="h-6 w-6 text-[var(--secondary)]" />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--secondary)] transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--foreground)]/70 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md bg-[var(--background)] text-xs text-[var(--foreground)]/60"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--foreground)]/60">{project.language}</span>
          <span className="text-sm font-medium text-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
            View →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
