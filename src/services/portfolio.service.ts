import { apiClient } from '@/lib/api-client';
import type { Profile, Testimonial, Project, Experience, ToolboxItem, Highlight } from '@/types/frontend.types';
import type {
  ProfileData,
  TestimonialData,
  ProjectData,
  ExperienceData,
  ToolboxData,
  HighlightData,
} from '@/lib/database-service';

// Data transformation utilities
class PortfolioTransformer {
  static transformProfile(data: ProfileData): Profile {
    return {
      name: data.name,
      headline: data.headline || '',
      summary: data.summary || '',
      avatar: data.avatar || '/images/placeholder-avatar.jpg',
      email: data.email || '',
      github: data.github || '',
      linkedin: data.linkedin || '',
      location: data.location || '',
    };
  }

  static transformTestimonial(data: TestimonialData): Testimonial {
    return {
      id: data.id,
      name: data.name,
      position: data.position,
      text: data.text,
      source: data.source || undefined,
      avatar: data.avatar,
    };
  }

  static transformProject(data: ProjectData): Project {
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

  static transformExperience(data: ExperienceData): Experience {
    return {
      id: data.id,
      job: data.job_title,
      company: data.company,
      period: data.period,
      location: data.location || '',
      description: data.description || '',
    };
  }

  static transformToolboxItem(data: ToolboxData): ToolboxItem {
    return {
      id: data.id,
      title: data.name,
      iconUrl: data.icon_url || '/icons/placeholder.svg',
      category: data.category || undefined,
    };
  }

  static transformHighlight(data: HighlightData): Highlight {
    return {
      id: data.id,
      label: data.label,
      value: data.value,
    };
  }
}

// Service class for portfolio data
export class PortfolioService {
  // Profile
  static async getProfile(): Promise<Profile> {
    const data = await apiClient.get<ProfileData>('/profile');
    return PortfolioTransformer.transformProfile(data);
  }

  static async updateProfile(profileData: Partial<Profile>): Promise<Profile> {
    const data = await apiClient.put<ProfileData>('/profile', profileData);
    return PortfolioTransformer.transformProfile(data);
  }

  // Testimonials
  static async getTestimonials(): Promise<Testimonial[]> {
    const data = await apiClient.get<TestimonialData[]>('/testimonials');
    return data.map(PortfolioTransformer.transformTestimonial);
  }

  static async createTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const data = await apiClient.post<TestimonialData>('/testimonials', testimonial);
    return PortfolioTransformer.transformTestimonial(data);
  }

  // Projects
  static async getFeaturedProjects(): Promise<Project[]> {
    const data = await apiClient.get<ProjectData[]>('/projects?featured=true');
    return data.map(PortfolioTransformer.transformProject);
  }

  static async getAllProjects(): Promise<Project[]> {
    const data = await apiClient.get<ProjectData[]>('/projects');
    return data.map(PortfolioTransformer.transformProject);
  }

  static async getProjectById(id: string): Promise<Project> {
    const data = await apiClient.get<ProjectData>(`/projects/${id}`);
    return PortfolioTransformer.transformProject(data);
  }

  static async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const data = await apiClient.post<ProjectData>('/projects', project);
    return PortfolioTransformer.transformProject(data);
  }

  // Experiences
  static async getExperiences(): Promise<Experience[]> {
    const data = await apiClient.get<ExperienceData[]>('/experiences');
    return data.map(PortfolioTransformer.transformExperience);
  }

  static async createExperience(experience: Omit<Experience, 'id'>): Promise<Experience> {
    const data = await apiClient.post<ExperienceData>('/experiences', experience);
    return PortfolioTransformer.transformExperience(data);
  }

  // Toolbox Items
  static async getToolboxItems(): Promise<ToolboxItem[]> {
    const data = await apiClient.get<ToolboxData[]>('/toolbox-items');
    return data.map(PortfolioTransformer.transformToolboxItem);
  }

  // Highlights
  static async getHighlights(): Promise<Highlight[]> {
    const data = await apiClient.get<HighlightData[]>('/highlights');
    return data.map(PortfolioTransformer.transformHighlight);
  }
}
