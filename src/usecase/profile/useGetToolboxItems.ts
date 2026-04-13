import useAsyncData from '@/hooks/useAsyncData';
import { PortfolioService } from '@/services/portfolio.service';

// Toolbox hooks
export function useGetToolboxItems() {
  return useAsyncData(() => PortfolioService.getToolboxItems());
}
