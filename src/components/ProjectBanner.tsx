import { Card } from '@/components/Card';
import { Project } from '@/types/frontend.types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export const ProjectBanner = ({
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
      <Card className="p-6 pb-0 md:pt-12 lg:pt-16 lg:pl-20 lg:pr-0 bg-[#020817]/70 backdrop-blur-2xl border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.04),0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
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
            <div className="flex flex-col md:flex-row sm:w-auto gap-3 mt-8">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-900 h-12 w-full px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
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
                  className="border border-white/20 bg-white/5 w-full hover:bg-white/10 h-12 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 transition-colors sm:mb-8"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="size-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl rounded-b-none lg:rounded-r-none h-full w-full mt-8 md:mt-12 lg:mt-0"
          >
            <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-emerald-400/10 blur-2xl" />
            <div className="ring-1 ring-white/10 overflow-hidden h-[300px] md:h-[400px] lg:h-[500px]">
              <motion.div style={{ scale: imageScale }} className="h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover"
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
