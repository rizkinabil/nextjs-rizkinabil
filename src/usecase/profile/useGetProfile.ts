import useAsyncData from '@/hooks/useAsyncData';
import { PortfolioService } from '@/services/portfolio.service';

// Profile hooks
export function useGetProfile() {
  return useAsyncData(() => PortfolioService.getProfile());
}
