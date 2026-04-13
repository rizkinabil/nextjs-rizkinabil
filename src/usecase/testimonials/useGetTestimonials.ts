import useAsyncData from '@/hooks/useAsyncData';
import { PortfolioService } from '@/services/portfolio.service';

// Testimonials hooks
export function useGetTestimonials() {
  return useAsyncData(() => PortfolioService.getTestimonials());
}
