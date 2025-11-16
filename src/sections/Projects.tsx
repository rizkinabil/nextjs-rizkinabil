'use client';

import aiStartupLandingPage from '@/assets/images/ai-startup-landing-page.png';
import darkSaasLandingPage from '@/assets/images/dark-saas-landing-page.png';
import lightSaasLandingPage from '@/assets/images/light-saas-landing-page.png';
import projectsHero from '@/assets/images/projects-hero.png';
import { Card } from '@/components/Card';
import { SectionHeader } from '@/components/SectionHeader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';

const portfolioProjects: {
  company: string;
  year: string;
  title: string;
  results: { title: string }[];
  link: string | null;
  image: StaticImageData;
}[] = [
  {
    company: 'Telkom Indonesia',
    year: 'Ongoing',
    title: 'Digital Infra Dashboard',
    results: [
      { title: 'Enhanced user experience by 40%' },
      { title: 'Improved site speed by 50%' },
      { title: 'Increased mobile traffic by 35%' },
    ],
    link: null,
    image: darkSaasLandingPage,
  },
  {
    company: 'Innovative Co',
    year: '2021',
    title: 'Light Saas Landing Page',
    results: [
      { title: 'Boosted sales by 20%' },
      { title: 'Expanded customer reach by 35%' },
      { title: 'Increased brand awareness by 15%' },
    ],
    link: 'https://youtu.be/7hi5zwO75yc',
    image: lightSaasLandingPage,
  },
  {
    company: 'Quantum Dynamics',
    year: '2023',
    title: 'AI Startup Landing Page',
    results: [
      { title: 'Enhanced user experience by 40%' },
      { title: 'Improved site speed by 50%' },
      { title: 'Increased mobile traffic by 35%' },
    ],
    link: 'https://youtu.be/Z7I5uSRHMHg',
    image: aiStartupLandingPage,
  },
];

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

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
          {portfolioProjects.map((project, index) => {
            const targetScale = 1 - (portfolioProjects.length - index) * 0.05;

            return (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                targetScale={targetScale}
                range={[index * 0.25, 1]}
                progress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  targetScale,
  range,
  progress,
}: {
  project: (typeof portfolioProjects)[0];
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
    >
      <Card
        className="
    px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20
    rounded-3xl
    bg-[#020817]/70
    backdrop-blur-2xl
    border border-white/10
    shadow-[inset_0_0_20px_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.3)]
  "
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <motion.div className="lg:pb-16" style={{ opacity }}>
            <div className="bg-gradient-to-r from-[hsl(var(--calm-blue))] to-[hsl(var(--calm-accent))] inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
              <span>{project.company}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-serif text-2xl md:text-4xl mt-2 md:mt-5">{project.title}</h3>
            <hr className="border-t-2 border-border/50 mt-4 md:mt-5" />
            <ul className="flex flex-col gap-4 mt-4 md:mt-5">
              {project.results.map((result) => (
                <li key={result.title} className="flex gap-2 text-sm md:text-base text-muted-foreground">
                  <CheckCircle2 className="size-5 md:size-6 text-[hsl(var(--calm-blue))]" />
                  <span>{result.title}</span>
                </li>
              ))}
            </ul>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 hover:bg-primary/90 transition-colors"
                >
                  <span>Visit Live Site</span>
                  <ArrowUpRight className="size-4" />
                </motion.button>
              </a>
            )}
          </motion.div>

          {/* image side */}
          <motion.div className="relative overflow-hidden rounded-2xl" style={{ x }}>
            <div className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-emerald-400/10 blur-2xl" />
            <div className="relative rounded-2xl ring-1 ring-white/10 overflow-hidden">
              <motion.div style={{ scale: imageScale }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                  priority={index === 0}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
