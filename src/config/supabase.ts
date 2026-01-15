import { Database } from '@/types/database.type';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase client options
const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (url: RequestInfo | URL, options: RequestInit | undefined = {}) => {
      // For development: bypass SSL certificate validation
      if (process.env.NODE_ENV === 'development') {
        return fetch(url, {
          ...options,
          // Add headers to handle SSL issues in development
        });
      }
      return fetch(url, options);
    },
  },
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, supabaseOptions);

// Server-side client with service role (for admin operations)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  supabaseOptions
);
