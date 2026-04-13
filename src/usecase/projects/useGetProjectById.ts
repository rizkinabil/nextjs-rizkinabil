import useAsyncData from '@/hooks/useAsyncData';
import { PortfolioService } from '@/services/portfolio.service';

export function useGetProjectById(id: string) {
  return useAsyncData(() => PortfolioService.getProjectById(id), [id]);
}
