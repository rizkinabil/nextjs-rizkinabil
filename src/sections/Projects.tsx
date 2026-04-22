import projectsHero from '@/assets/images/projects-hero.png';
import { SectionHeader } from '@/components/SectionHeader';
import { getFeaturedProjectsServer } from '@/lib/server-data';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectsListClient } from './ProjectsClient';

export async function ProjectsSection() {
  const featuredProjects = await getFeaturedProjectsServer();

  return (
    <section className="relative pb-16 lg:py-24" id="projects">
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

        <ProjectsListClient projects={featuredProjects} />

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
}
