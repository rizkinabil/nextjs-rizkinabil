import useAsyncData from '@/hooks/useAsyncData';
import { PortfolioService } from '@/services/portfolio.service';

// Projects hooks
export function useGetFeaturedProjects() {
  return useAsyncData(() => PortfolioService.getFeaturedProjects());
}
