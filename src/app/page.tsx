'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ModuleCard from '@/components/ModuleCard';
import ProjectCard from '@/components/ProjectCard';
import Pagination from '@/components/Pagination';
import Auth from '@/components/Auth';
import { courseModules, projects } from '@/data/courseData';
import { Project } from '@/types';

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentModulePage, setCurrentModulePage] = useState(1);
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  const totalModulePages = Math.ceil(courseModules.length / ITEMS_PER_PAGE);
  const totalProjectPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const currentModules = courseModules.slice(
    (currentModulePage - 1) * ITEMS_PER_PAGE,
    currentModulePage * ITEMS_PER_PAGE
  );

  const currentProjects = projects.slice(
    (currentProjectPage - 1) * ITEMS_PER_PAGE,
    currentProjectPage * ITEMS_PER_PAGE
  );

  const handleLoginClick = () => setShowAuth(true);

  const handleLogout = () => {
    setUser(null);
  };

  const handleAuthSuccess = (authenticatedUser: any) => {
    setUser(authenticatedUser);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        <Hero />

        <section id="modules" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Modules</h2>
              <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
                Master Python step by step with our comprehensive curriculum covering everything from basics to advanced concepts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>

            {totalModulePages > 1 && (
              <Pagination
                currentPage={currentModulePage}
                totalPages={totalModulePages}
                onPageChange={setCurrentModulePage}
              />
            )}
          </div>
        </section>

        <section id="projects" className="py-20 bg-[var(--card-bg)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Hands-On Projects</h2>
              <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
                Apply your knowledge with real-world projects. Build applications, games, and tools to solidify your Python skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>

            {totalProjectPages > 1 && (
              <Pagination
                currentPage={currentProjectPage}
                totalPages={totalProjectPages}
                onPageChange={setCurrentProjectPage}
              />
            )}
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Learn Python?</h2>
                <p className="text-lg text-[var(--foreground)]/70">
                  Python is one of the most popular and versatile programming languages in the world.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
                  <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">Easy to Learn</h3>
                  <p className="text-[var(--foreground)]/70">
                    Python's simple syntax makes it perfect for beginners. You can focus on learning programming concepts rather than complex syntax.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
                  <h3 className="text-xl font-semibold mb-3 text-[var(--secondary)]">Versatile</h3>
                  <p className="text-[var(--foreground)]/70">
                    From web development to data science, AI to automation - Python can do it all. It's used by tech giants worldwide.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
                  <h3 className="text-xl font-semibold mb-3 text-[var(--accent)]">High Demand</h3>
                  <p className="text-[var(--foreground)]/70">
                    Python developers are in high demand. Master Python and open doors to exciting career opportunities.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
                  <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">Large Community</h3>
                  <p className="text-[var(--foreground)]/70">
                    Join millions of Python developers. Access thousands of libraries, frameworks, and community support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-[var(--border)] bg-[var(--card-bg)]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-[var(--foreground)]/60">
            © 2024 Python LMS. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <Auth onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl bg-[var(--background)] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <span className="px-3 py-1 rounded-full text-sm bg-[var(--secondary)]/10 text-[var(--secondary)]">
                {selectedProject.difficulty}
              </span>
            </div>

            <p className="text-[var(--foreground)]/70 mb-6">{selectedProject.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-md bg-[var(--card-bg)] text-sm border border-[var(--border)]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Code Preview</h3>
              <pre className="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] overflow-x-auto text-sm">
                <code>{selectedProject.codePreview}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
