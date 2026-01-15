// Frontend Types - untuk komponen UI
export interface Profile {
  name: string;
  headline: string;
  summary: string;
  avatar: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  text: string;
  source?: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  year: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  featured: boolean;
  results: Array<{ title: string }>;
  category: string;
  tags: string[];
}

export interface Experience {
  id: string;
  job: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

export interface ToolboxItem {
  id: string;
  title: string;
  iconUrl: string;
  category?: string;
}

export interface Highlight {
  id: string;
  label: string;
  value: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}

// Loading States
export interface LoadingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
