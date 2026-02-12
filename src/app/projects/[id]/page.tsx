'use client';

import { useProject } from '@/hooks/usePortfolio';
import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { LoadingState } from '@/components/LoadingState';
import { ArrowLeft, CheckCircle2, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { data: project, loading, error } = useProject(params.id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <LoadingState message="Loading project details..." centered size="xl" variant="pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Back Button */}
      <div className="container max-w-4xl mx-auto px-4 pt-24 pb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="container max-w-4xl mx-auto px-4 mb-12">
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
          <Image src={project.image} alt={project.title} fill className="object-cover" priority />
        </div>
      </div>

      {/* Content */}
      <article className="container max-w-4xl mx-auto px-4 pb-20">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">
            <span>{project.company}</span>
            <span>&bull;</span>
            <span>{project.year}</span>
            <span>&bull;</span>
            <span className="capitalize">{project.category}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">{project.title}</h1>
          <p className="text-lg text-white/70 leading-relaxed">{project.description}</p>
        </header>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-full text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Results */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl text-white mb-6">Key Results</h2>
          <ul className="flex flex-col gap-4">
            {project.results.map((result) => (
              <li key={result.title} className="flex gap-3 text-base text-white/80">
                <CheckCircle2 className="size-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{result.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 h-12 px-6 rounded-xl font-semibold hover:bg-white/90 transition-colors"
            >
              <ExternalLink className="size-4" />
              <span>Visit Live Site</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 h-12 px-6 rounded-xl font-semibold transition-colors"
            >
              <Github className="size-4" />
              <span>View Code</span>
            </a>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
