'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import CodeEditor from '@/components/CodeEditor';
import { courseModules } from '@/data/courseData';
import { Topic } from '@/types';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, BookOpen, Lightbulb, Globe } from 'lucide-react';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  const module = courseModules.find((m) => m.id === params.moduleId);
  const currentTopic = module?.topics[currentTopicIndex];

  if (!module || !currentTopic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg"
            >
              Go Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentTopicIndex < module.topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
    } else {
      router.push('/');
    }
  };

  const toggleComplete = () => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(currentTopic.id)) {
      newCompleted.delete(currentTopic.id);
    } else {
      newCompleted.add(currentTopic.id);
    }
    setCompletedTopics(newCompleted);
  };

  const progress = ((currentTopicIndex + 1) / module.topics.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-sm text-[var(--foreground)]/60 hover:text-[var(--primary)] transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Modules
              </button>
              <span className="text-sm text-[var(--foreground)]/60">
                Lesson {currentTopicIndex + 1} of {module.topics.length}
              </span>
            </div>
            <div className="h-2 bg-[var(--card-bg)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Topic List */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4">
                <h3 className="font-semibold mb-4 text-sm">Topics</h3>
                <div className="space-y-2">
                  {module.topics.map((topic, index) => (
                    <button
                      key={topic.id}
                      onClick={() => setCurrentTopicIndex(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentTopicIndex === index
                          ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                          : 'hover:bg-[var(--background)]'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {completedTopics.has(topic.id) ? (
                          <CheckCircle className="h-4 w-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-[var(--foreground)]/30 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <div className="text-sm font-medium">{topic.title}</div>
                          <div className="text-xs text-[var(--foreground)]/50">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Lesson Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[var(--primary)] font-medium mb-2">
                    {module.title}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{currentTopic.title}</h1>
                  <button
                    onClick={toggleComplete}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      completedTopics.has(currentTopic.id)
                        ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                        : 'bg-[var(--card-bg)] text-[var(--foreground)]/60 hover:bg-[var(--card-bg)]/80'
                    }`}
                  >
                    {completedTopics.has(currentTopic.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4" />
                        Mark as Complete
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Explanation */}
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-[var(--primary)]" />
                  <h2 className="text-lg font-semibold">Explanation</h2>
                </div>
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  {currentTopic.explanation}
                </p>
              </div>

              {/* Key Concepts */}
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-[var(--secondary)]" />
                  <h2 className="text-lg font-semibold">Key Concepts</h2>
                </div>
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  {currentTopic.keyConcepts}
                </p>
              </div>

              {/* Real World Application */}
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-[var(--accent)]" />
                  <h2 className="text-lg font-semibold">Real World Application</h2>
                </div>
                <p className="text-[var(--foreground)]/80 leading-relaxed">
                  {currentTopic.realWorld}
                </p>
              </div>

              {/* Code Editor */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Interactive Code</h2>
                <CodeEditor code={currentTopic.code} readOnly={false} height="400px" />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-[var(--border)]">
                <button
                  onClick={handlePrevious}
                  disabled={currentTopicIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] font-medium hover:bg-[var(--card-bg)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition-colors"
                >
                  {currentTopicIndex === module.topics.length - 1 ? 'Finish Module' : 'Next Lesson'}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
