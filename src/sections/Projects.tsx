'use client';

import projectsHero from '@/assets/images/projects-hero.png';
import { ProjectBanner } from '@/components/ProjectBanner';
import { SectionHeader } from '@/components/SectionHeader';
import { Spinner } from '@/components/Spinner';
import { useFeaturedProjects } from '@/hooks/usePortfolio';
import { useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export const ProjectsSection = () => {
  const { data: featuredProjects, loading, error } = useFeaturedProjects();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Loading state
  if (loading) {
    return (
      <section ref={containerRef} className="relative pb-16 lg:py-24" id="projects">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/90 via-[#020817]/70 to-transparent" />
          <Image src={projectsHero} alt="" fill className="object-cover" priority />
        </div>
        <div className="container">
          <SectionHeader eyeBrow="Featured Projects" title="Real-world Results" description="See how I transformed concepts into engaging digital experiences." />
          <div className="flex justify-center items-center mt-16">
            <div className="flex flex-col items-center gap-4">
              <Spinner size="xl" variant="ring" label="Loading featured projects..." />
              <p className="text-white/60 text-sm font-medium animate-pulse">Loading featured projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !featuredProjects) {
    return (
      <section ref={containerRef} className="relative pb-16 lg:py-24" id="projects">
        <div className="container">
          <SectionHeader
            eyeBrow="Featured Projects"
            title="Real-world Results"
            description={error || 'Failed to load projects'}
          />
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative pb-16 lg:py-24" id="projects">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/90 via-[#020817]/70 to-transparent" />
        <Image src={projectsHero} alt="" fill className="object-cover" priority />
      </div>
      <div className="container">
        <SectionHeader
          eyeBrow="Featured Projects"
          title="Real-world Results"
          description="See how I transformed concepts into engaging digital experiences."
        />

        <div className="flex flex-col mt-10 md:mt-20 gap-11">
          {featuredProjects.map((project, index) => {
            const targetScale = 1 - (featuredProjects.length - index) * 0.05;

            return (
              <ProjectBanner
                key={project.id}
                project={project}
                index={index}
                targetScale={targetScale}
                range={[index * 0.25, 1]}
                progress={scrollYProgress}
              />
            );
          })}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 px-6 h-12 rounded-xl text-sm font-semibold transition-colors"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
