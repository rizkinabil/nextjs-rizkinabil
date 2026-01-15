import { useState } from 'react';
import { PortfolioService } from '@/services/portfolio.service';
import type { 
  Profile, 
  Testimonial, 
  Project, 
  Experience, 
  ToolboxItem, 
  Highlight 
} from '@/types/frontend.types';

// Generic mutation hook
function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (variables: TVariables): Promise<TData | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(variables);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

// Profile mutations
export function useUpdateProfile() {
  return useMutation<Profile, Partial<Profile>>(
    (profileData) => PortfolioService.updateProfile(profileData)
  );
}

// Testimonial mutations
export function useCreateTestimonial() {
  return useMutation<Testimonial, Omit<Testimonial, 'id'>>(
    (testimonial) => PortfolioService.createTestimonial(testimonial)
  );
}

// Project mutations
export function useCreateProject() {
  return useMutation<Project, Omit<Project, 'id'>>(
    (project) => PortfolioService.createProject(project)
  );
}

// Experience mutations
export function useCreateExperience() {
  return useMutation<Experience, Omit<Experience, 'id'>>(
    (experience) => PortfolioService.createExperience(experience)
  );
}

// Combined admin hook
export function useAdminDashboard() {
  const updateProfile = useUpdateProfile();
  const createTestimonial = useCreateTestimonial();
  const createProject = useCreateProject();
  const createExperience = useCreateExperience();

  return {
    profile: {
      update: updateProfile.mutate,
      loading: updateProfile.loading,
      error: updateProfile.error,
    },
    testimonials: {
      create: createTestimonial.mutate,
      loading: createTestimonial.loading,
      error: createTestimonial.error,
    },
    projects: {
      create: createProject.mutate,
      loading: createProject.loading,
      error: createProject.error,
    },
    experiences: {
      create: createExperience.mutate,
      loading: createExperience.loading,
      error: createExperience.error,
    },
  };
}