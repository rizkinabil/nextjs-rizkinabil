import useAsyncData from '@/hooks/useAsyncData';
import { PortfolioService } from '@/services/portfolio.service';

// Highlights hooks
export function useGetHighlights() {
  return useAsyncData(() => PortfolioService.getHighlights());
}
