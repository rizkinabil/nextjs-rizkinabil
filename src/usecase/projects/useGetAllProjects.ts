import useAsyncData from '@/hooks/useAsyncData';
import { PortfolioService } from '@/services/portfolio.service';

export function useGetAllProjects() {
  return useAsyncData(() => PortfolioService.getAllProjects());
}
