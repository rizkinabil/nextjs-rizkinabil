import useAsyncData from '@/hooks/useAsyncData';
import { PortfolioService } from '@/services/portfolio.service';

// Experiences hooks
export function useGetExperiences() {
  return useAsyncData(() => PortfolioService.getExperiences());
}
