'use client';

import { ProjectBanner } from '@/components/ProjectBanner';
import { Project } from '@/types/frontend.types';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';

export function ProjectsListClient({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={containerRef} className="flex flex-col mt-10 md:mt-20 gap-11">
      {projects.map((project, index) => {
        const targetScale = 1 - (projects.length - index) * 0.05;
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
  );
}
