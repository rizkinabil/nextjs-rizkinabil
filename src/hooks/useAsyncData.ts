import { LoadingState } from '@/types/frontend.types';
import { useEffect, useRef, useState } from 'react';

// Generic hook for data fetching
function useAsyncData<T>(fetchFn: () => Promise<T>, deps: React.DependencyList = []): LoadingState<T> {
  const [state, setState] = useState<LoadingState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Use ref to store the latest fetchFn to avoid stale closures
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await fetchFnRef.current();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

export default useAsyncData;
