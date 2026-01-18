'use client';

import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { useAllProjects } from '@/hooks/usePortfolio';

export default function ProjectsPage() {
  const { data: allProjects, loading, error } = useAllProjects();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <SectionHeader
            eyeBrow="Portfolio"
            title="All Projects"
            description="A collection of projects I've built, from web applications to interactive experiences."
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          {loading && <p className="text-center text-white/70">Loading projects...</p>}
          {error && <p className="text-center text-red-400">Error: {error}</p>}
          {allProjects && allProjects.length === 0 && !loading && (
            <p className="text-center text-white/70">No projects found.</p>
          )}
          {allProjects && allProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
