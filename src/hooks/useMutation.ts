import { useState } from 'react';

// Generic mutation hook
function useMutation<TData, TVariables>(mutationFn: (variables: TVariables) => Promise<TData>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (variables: TVariables): Promise<TData | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(variables);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

export default useMutation;
