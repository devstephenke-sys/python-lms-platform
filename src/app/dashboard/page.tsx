'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Trophy, Target, Clock, CheckCircle, Circle } from 'lucide-react';
import { courseModules } from '@/data/courseData';

interface DashboardProps {
  user: any;
}

export default function Dashboard({ user }: DashboardProps) {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching progress
    const fetchProgress = async () => {
      try {
        // In production, fetch from API
        // const response = await fetch(`/api/progress?userId=${user.id}`);
        // const data = await response.json();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  const totalLessons = courseModules.reduce((acc, module) => acc + module.topics.length, 0);
  const completedLessons = Object.values(progress).reduce((acc, val) => acc + val, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-[var(--foreground)]/70">Continue your Python learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5 text-[var(--primary)]" />
              <span className="text-sm text-[var(--foreground)]/60">Modules</span>
            </div>
            <div className="text-2xl font-bold">{courseModules.length}</div>
          </div>

          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-[var(--secondary)]" />
              <span className="text-sm text-[var(--foreground)]/60">Completed</span>
            </div>
            <div className="text-2xl font-bold">{completedLessons}/{totalLessons}</div>
          </div>

          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-5 w-5 text-[var(--accent)]" />
              <span className="text-sm text-[var(--foreground)]/60">Certificates</span>
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>

          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-[var(--primary)]" />
              <span className="text-sm text-[var(--foreground)]/60">Progress</span>
            </div>
            <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
          </div>
        </div>

        {/* Module Progress */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Progress</h2>

          {courseModules.map((module) => {
            const moduleProgress = progress[module.id] || 0;
            const completedTopics = Math.round((moduleProgress / 100) * module.topics.length);

            return (
              <div
                key={module.id}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{module.title}</h3>
                    <p className="text-sm text-[var(--foreground)]/60">
                      {completedTopics}/{module.topics.length} lessons completed
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--primary)]">
                      {moduleProgress.toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary)] transition-all duration-300"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {module.topics.map((topic) => {
                    const isCompleted = Math.random() > 0.5; // Simulated
                    return (
                      <div
                        key={topic.id}
                        className="flex items-center gap-1 px-3 py-1 rounded-md bg-[var(--background)] text-sm"
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-[var(--accent)]" />
                        ) : (
                          <Circle className="h-4 w-4 text-[var(--foreground)]/30" />
                        )}
                        <span className="text-[var(--foreground)]/70">{topic.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
