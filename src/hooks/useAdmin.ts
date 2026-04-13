import useMutation from '@/hooks/useMutation';
import { PortfolioService } from '@/services/portfolio.service';
import type { Experience, Profile, Project, Testimonial } from '@/types/frontend.types';

// Profile mutations
export function useUpdateProfile() {
  return useMutation<Profile, Partial<Profile>>((profileData) => PortfolioService.updateProfile(profileData));
}

// Testimonial mutations
export function useCreateTestimonial() {
  return useMutation<Testimonial, Omit<Testimonial, 'id'>>((testimonial) =>
    PortfolioService.createTestimonial(testimonial),
  );
}

// Project mutations
export function useCreateProject() {
  return useMutation<Project, Omit<Project, 'id'>>((project) => PortfolioService.createProject(project));
}

// Experience mutations
export function useCreateExperience() {
  return useMutation<Experience, Omit<Experience, 'id'>>((experience) => PortfolioService.createExperience(experience));
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
