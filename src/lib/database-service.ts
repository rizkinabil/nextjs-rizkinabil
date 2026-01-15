import { supabase } from '@/config/supabase';
import { Database } from '@/types/database.type';

type Tables = Database['public']['Tables'];

// Types untuk komponen
export type TestimonialData = Tables['testimonials']['Row'];
export type ProjectData = Tables['projects']['Row'] & {
  results: Array<{ title: string }>;
  tech_stack: string[];
};
export type ProfileData = Tables['profile']['Row'];
export type ExperienceData = Tables['experiences']['Row'];
export type ToolboxData = Tables['toolbox_items']['Row'];
export type HighlightData = Tables['highlights']['Row'];

// Input types for database operations
export type TestimonialInput = Tables['testimonials']['Insert'];
export type ProjectInput = Tables['projects']['Insert'];
export type ProfileInput = Tables['profile']['Insert'];
export type ExperienceInput = Tables['experiences']['Insert'];
export type ToolboxInput = Tables['toolbox_items']['Insert'];
export type HighlightInput = Tables['highlights']['Insert'];

// Testimonials
export async function getTestimonials(): Promise<TestimonialData[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
  return data || [];
}

export async function createTestimonial(testimonial: TestimonialInput): Promise<TestimonialData> {
  const { data, error } = await supabase.from('testimonials').insert(testimonial).select().single();

  if (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
  return data;
}

export async function updateTestimonial(
  id: string,
  updates: Tables['testimonials']['Update']
): Promise<TestimonialData> {
  const { data, error } = await supabase.from('testimonials').update(updates).eq('id', id).select().single();

  if (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }
  return data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { error } = await supabase.from('testimonials').update({ is_active: false }).eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}

// Projects
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured projects:', error);
    throw error;
  }

  return (data || []).map((project) => ({
    ...project,
    results: Array.isArray(project.results) ? (project.results as Array<{ title: string }>) : [],
    tech_stack: Array.isArray(project.tech_stack) ? (project.tech_stack as string[]) : [],
  }));
}

export async function getAllProjects(): Promise<ProjectData[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return (data || []).map((project) => ({
    ...project,
    results: Array.isArray(project.results) ? (project.results as Array<{ title: string }>) : [],
    tech_stack: Array.isArray(project.tech_stack) ? (project.tech_stack as string[]) : [],
  }));
}

export async function getProjectById(id: string): Promise<ProjectData | null> {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).eq('is_active', true).single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching project:', error);
    throw error;
  }

  return {
    ...data,
    results: Array.isArray(data.results) ? (data.results as Array<{ title: string }>) : [],
    tech_stack: Array.isArray(data.tech_stack) ? (data.tech_stack as string[]) : [],
  };
}

export async function createProject(project: ProjectInput): Promise<ProjectData> {
  const { data, error } = await supabase.from('projects').insert(project).select().single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return {
    ...data,
    results: Array.isArray(data.results) ? (data.results as Array<{ title: string }>) : [],
    tech_stack: Array.isArray(data.tech_stack) ? (data.tech_stack as string[]) : [],
  };
}

// Profile
export async function getProfile(): Promise<ProfileData | null> {
  const { data, error } = await supabase.from('profile').select('*').single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching profile:', error);
    throw error;
  }
  return data;
}

export async function updateProfile(updates: Tables['profile']['Update']): Promise<ProfileData> {
  // Get first profile record and update it
  const { data: existing } = await supabase.from('profile').select('id').single();

  if (existing) {
    const { data, error } = await supabase.from('profile').update(updates).eq('id', existing.id).select().single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    return data;
  } else {
    // Create new profile if none exists
    const { data, error } = await supabase
      .from('profile')
      .insert(updates as ProfileInput)
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
    return data;
  }
}

// Experiences
export async function getExperiences(): Promise<ExperienceData[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
  return data || [];
}

export async function createExperience(experience: ExperienceInput): Promise<ExperienceData> {
  const { data, error } = await supabase.from('experiences').insert(experience).select().single();

  if (error) {
    console.error('Error creating experience:', error);
    throw error;
  }
  return data;
}

// Toolbox Items
export async function getToolboxItems(): Promise<ToolboxData[]> {
  const { data, error } = await supabase
    .from('toolbox_items')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching toolbox items:', error);
    throw error;
  }
  return data || [];
}

// Highlights
export async function getHighlights(): Promise<HighlightData[]> {
  const { data, error } = await supabase
    .from('highlights')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching highlights:', error);
    throw error;
  }
  return data || [];
}
