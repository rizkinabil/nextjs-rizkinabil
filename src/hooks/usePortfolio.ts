import { PortfolioService } from '@/services/portfolio.service';
import type { LoadingState } from '@/types/frontend.types';
import { useEffect, useState } from 'react';

// Generic hook for data fetching
function useAsyncData<T>(fetchFn: () => Promise<T>, deps: React.DependencyList = []): LoadingState<T> {
  const [state, setState] = useState<LoadingState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await fetchFn();

        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
}

// Profile hooks
export function useProfile() {
  return useAsyncData(() => PortfolioService.getProfile());
}

// Testimonials hooks
export function useTestimonials() {
  return useAsyncData(() => PortfolioService.getTestimonials());
}

// Projects hooks
export function useFeaturedProjects() {
  return useAsyncData(() => PortfolioService.getFeaturedProjects());
}

export function useAllProjects() {
  return useAsyncData(() => PortfolioService.getAllProjects());
}

export function useProject(id: string) {
  return useAsyncData(() => PortfolioService.getProjectById(id), [id]);
}

// Experiences hooks
export function useExperiences() {
  return useAsyncData(() => PortfolioService.getExperiences());
}

// Toolbox hooks
export function useToolboxItems() {
  return useAsyncData(() => PortfolioService.getToolboxItems());
}

// Highlights hooks
export function useHighlights() {
  return useAsyncData(() => PortfolioService.getHighlights());
}

// Combined hook for About page
export function useAboutData() {
  const profile = useProfile();
  const experiences = useExperiences();
  const toolboxItems = useToolboxItems();
  const highlights = useHighlights();

  const loading = profile.loading || experiences.loading || toolboxItems.loading || highlights.loading;
  const error = profile.error || experiences.error || toolboxItems.error || highlights.error;

  return {
    profile: profile.data,
    experiences: experiences.data || [],
    toolboxItems: toolboxItems.data || [],
    highlights: highlights.data || [],
    loading,
    error,
  };
}
