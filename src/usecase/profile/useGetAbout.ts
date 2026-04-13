import { useGetExperiences } from '@/usecase/profile/useGetExperiences';
import { useGetHighlights } from '@/usecase/profile/useGetHighlights';
import { useGetProfile } from '@/usecase/profile/useGetProfile';
import { useGetToolboxItems } from '@/usecase/profile/useGetToolboxItems';

export function useGetAbout() {
  const profile = useGetProfile();
  const experiences = useGetExperiences();
  const toolboxItems = useGetToolboxItems();
  const highlights = useGetHighlights();

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
