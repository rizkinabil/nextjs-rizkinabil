'use client';

import projectsHero from '@/assets/images/projects-hero.png';
import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { useFeaturedProjects } from '@/hooks/usePortfolio';
import type { Project } from '@/types/frontend.types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
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
        <div className="container">
          <SectionHeader eyeBrow="Featured Projects" title="Real-world Results" description="Loading projects..." />
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
              <ProjectCard
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

// ... (ProjectCard component tetap sama, tapi update untuk menggunakan project.id dan Link)
const ProjectCard = ({
  project,
  index,
  targetScale,
  range,
  progress,
}: {
  project: Project;
  index: number;
  targetScale: number;
  range: [number, number];
  progress: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        top: `calc(64px + ${index * 40}px)`,
      }}
      className="sticky"
      id="project-section-id"
    >
      <Card
        maxCollapsedHeight={700}
        className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 rounded-3xl bg-[#020817]/70 backdrop-blur-2xl border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.3)]"
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <motion.div className="lg:pb-16" style={{ opacity }}>
            <div className="bg-gradient-to-r from-emerald-400 to-blue-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
              <span>{project.company}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-serif text-2xl md:text-4xl mt-2 md:mt-5">{project.title}</h3>
            <hr className="border-t-2 border-white/10 mt-4 md:mt-5" />
            <ul className="flex flex-col gap-4 mt-4 md:mt-5">
              {project.results.map((result: any) => (
                <li key={result.title} className="flex gap-2 text-sm md:text-base text-white/70">
                  <CheckCircle2 className="size-5 md:size-6 text-emerald-400" />
                  <span>{result.title}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-8">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-900 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight className="size-4" />
                  </motion.button>
                </a>
              )}
              <Link href={`/projects/${project.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white/20 bg-white/5 hover:bg-white/10 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="size-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div className="relative overflow-hidden rounded-2xl mt-4" style={{ x }}>
            <div className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-emerald-400/10 blur-2xl" />
            <div className="relative rounded-2xl ring-1 ring-white/10 overflow-hidden">
              <motion.div style={{ scale: imageScale }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                  priority={index === 0}
                  fill
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
