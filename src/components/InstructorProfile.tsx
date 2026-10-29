'use client';

import { motion } from 'framer-motion';
import { Instructor } from '@/types';
import { Linkedin, GitHub, Twitter, Award, Briefcase, GraduationCap } from 'lucide-react';

interface InstructorProfileProps {
  instructor: Instructor;
}

export default function InstructorProfile({ instructor }: InstructorProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-6xl">
            {instructor.avatar}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{instructor.name}</h3>
          <p className="text-[var(--primary)] font-medium mb-4">{instructor.title}</p>
          <p className="text-[var(--foreground)]/70 mb-6">{instructor.bio}</p>

          {/* Credentials */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-[var(--accent)]" />
              Credentials
            </h4>
            <div className="flex flex-wrap gap-2">
              {instructor.credentials.map((credential, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)] text-sm"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {instructor.socialLinks.linkedin && (
              <a
                href={instructor.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--primary)]/10 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-[var(--foreground)]/60 hover:text-[var(--primary)]" />
              </a>
            )}
            {instructor.socialLinks.github && (
              <a
                href={instructor.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--primary)]/10 transition-colors"
              >
                <GitHub className="h-5 w-5 text-[var(--foreground)]/60 hover:text-[var(--primary)]" />
              </a>
            )}
            {instructor.socialLinks.twitter && (
              <a
                href={instructor.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--card-bg)] hover:bg-[var(--primary)]/10 transition-colors"
              >
                <Twitter className="h-5 w-5 text-[var(--foreground)]/60 hover:text-[var(--primary)]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
