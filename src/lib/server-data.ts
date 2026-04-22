import { getFeaturedProjects, getTestimonials } from '@/lib/database-service';
import type { Project, Testimonial } from '@/types/frontend.types';
import type { ProjectData, TestimonialData } from '@/lib/database-service';

function transformProject(data: ProjectData): Project {
  return {
    id: data.id,
    title: data.title,
    company: data.company,
    year: data.year,
    description: data.description || '',
    image: data.image,
    link: data.link || undefined,
    github: data.github_link || undefined,
    category: data.category,
    featured: data.featured,
    results: Array.isArray(data.results) ? data.results : [],
    tags: Array.isArray(data.tech_stack) ? data.tech_stack : [],
  };
}

function transformTestimonial(data: TestimonialData): Testimonial {
  return {
    id: data.id,
    name: data.name,
    position: data.position,
    text: data.text,
    source: data.source || undefined,
    avatar: data.avatar,
  };
}

export async function getFeaturedProjectsServer(): Promise<Project[]> {
  const data = await getFeaturedProjects();
  return data.map(transformProject);
}

export async function getTestimonialsServer(): Promise<Testimonial[]> {
  const data = await getTestimonials();
  return data.map(transformTestimonial);
}
