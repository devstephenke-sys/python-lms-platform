'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Module } from '@/types';
import * as Icons from 'lucide-react';

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const router = useRouter();
  const Icon = Icons[module.icon as keyof typeof Icons] || Icons.Book;

  const handleClick = () => {
    router.push(`/lesson/${module.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="group cursor-pointer"
    >
      <div className="h-full p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--primary)] transition-all duration-300">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-lg bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20 transition-colors">
            <Icon className="h-6 w-6 text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--primary)] transition-colors">
              {module.title}
            </h3>
            <div className="text-sm text-[var(--foreground)]/60">
              {module.topics.length} lessons
            </div>
          </div>
        </div>

        <p className="text-sm text-[var(--foreground)]/70 mb-4 line-clamp-2">
          {module.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {module.topics.slice(0, 3).map((topic, index) => (
              <div
                key={topic.id}
                className="w-2 h-2 rounded-full bg-[var(--primary)]/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
            {module.topics.length > 3 && (
              <span className="text-xs text-[var(--foreground)]/60">
                +{module.topics.length - 3}
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
            Start →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
