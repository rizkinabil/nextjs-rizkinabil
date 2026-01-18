import aiStartupLandingPage from '@/assets/images/ai-startup-landing-page.png';
import darkSaasLandingPage from '@/assets/images/dark-saas-landing-page.png';
import lightSaasLandingPage from '@/assets/images/light-saas-landing-page.png';
import { StaticImageData } from 'next/image';

export interface Project {
  id: string;
  company: string;
  year: string;
  title: string;
  description: string;
  results: { title: string }[];
  link: string | null;
  github?: string | null;
  image: StaticImageData;
  tags: string[];
  category: 'web' | 'mobile' | 'dashboard' | 'landing';
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'digital-infra-satu-data',
    company: 'Telkom Indonesia',
    year: '2024',
    title: 'Digital Infra – Satu Data Infra',
    description:
      'Analytics and Monitoring Dashboard Web Application for Infrastructure Cost at DBT Telkom. Enables top management and internal users to access and visualize infrastructure cost data effectively with real-time monitoring capabilities.',
    results: [
      { title: 'Enhanced dashboard performance and usability through optimization' },
      { title: 'Enabled effective data visualization for infrastructure cost management' },
      { title: 'Improved accessibility for top management and internal users' },
    ],
    link: null,
    github: null,
    image: darkSaasLandingPage,
    tags: ['React', 'TypeScript', 'React Query', 'Material UI', 'Legion Design System'],
    category: 'dashboard',
    featured: true,
  },
  {
    id: 'talent-center',
    company: 'Client Project',
    year: '2024',
    title: 'Talent Center',
    description:
      'Full-stack Talent Center Web Application with React frontend and Spring Boot backend. Features comprehensive admin dashboard for managing clients and talent, with secure authentication and authorization processes.',
    results: [
      { title: 'Developed full-stack application within 3-month timeframe' },
      { title: 'Implemented secure user authentication and authorization' },
      { title: 'Created comprehensive admin dashboard for operations management' },
    ],
    link: null,
    github: null,
    image: lightSaasLandingPage,
    tags: ['React', 'TypeScript', 'React Query', 'Material UI', 'Java Spring Boot'],
    category: 'web',
    featured: true,
  },
  {
    id: 'deventory',
    company: 'Personal Project',
    year: '2022',
    title: 'DEVENTORY',
    description:
      'Front-end development tools portal designed and implemented using Nuxt.js. Features GraphQL integration for data mutations and querying, providing users with comprehensive web tools references for front-end development.',
    results: [
      { title: 'Built complete portal in 2 weeks' },
      { title: 'Integrated GraphQL for efficient data management' },
      { title: 'Enabled users to access front-end development tools references' },
    ],
    link: null,
    github: null,
    image: aiStartupLandingPage,
    tags: ['Nuxt.js', 'GraphQL', 'SCSS', 'Bootstrap'],
    category: 'web',
    featured: true,
  },
  {
    id: 'fingervote',
    company: 'Team Project',
    year: '2021',
    title: 'FingerVote',
    description:
      'Web-based online voting application implemented using Vue.js. Developed in a collaborative team of 3 people including Frontend developer, Backend developer, and UI/UX designer.',
    results: [
      { title: 'Delivered complete voting system in 3 months' },
      { title: 'Collaborated effectively in cross-functional team' },
      { title: 'Enabled secure and accessible online voting platform' },
    ],
    link: null,
    github: null,
    image: darkSaasLandingPage,
    tags: ['Vue.js', 'HTML', 'CSS', 'JavaScript', 'Axios', 'REST API'],
    category: 'web',
    featured: false,
  },
  {
    id: 'points-id',
    company: 'Client Project',
    year: '2022',
    title: 'Points ID',
    description:
      'Loyalty point agent website with admin dashboard for managing and controlling cashflow. Enables users to exchange their loyalty points for various products with comprehensive point management system.',
    results: [
      { title: 'Built loyalty point exchange platform in 3 months' },
      { title: 'Created admin dashboard for cashflow management' },
      { title: 'Enabled seamless point-to-product exchange system' },
    ],
    link: null,
    github: null,
    image: lightSaasLandingPage,
    tags: ['Nuxt.js', 'Vuetify', 'Chart.js'],
    category: 'web',
    featured: false,
  },
  {
    id: 'mooview',
    company: 'Personal Project',
    year: '2022',
    title: 'Mooview',
    description:
      'Movie list recommendation application designed and implemented using Nuxt.js. Consumes TMDB API for movie data and features PWA optimization. Enables users to view movie recommendations by genre or categories.',
    results: [
      { title: 'Developed complete application in 2 days' },
      { title: 'Integrated TMDB API for movie data' },
      { title: 'Implemented PWA optimization for better user experience' },
    ],
    link: null,
    github: null,
    image: aiStartupLandingPage,
    tags: ['Nuxt.js', 'Vuetify', 'TMDB API', 'PWA', 'JavaScript', 'Figma'],
    category: 'web',
    featured: false,
  },
  {
    id: 'staycation',
    company: 'Client Project',
    year: '2023',
    title: 'Staycation',
    description:
      'Full-stack hotel booking web application using MERN stack (MongoDB, Express.js, React, Node.js). Features include user authentication, property search, booking management, and admin panel for property owners.',
    results: [
      { title: 'Developed a robust hotel booking platform' },
      { title: 'Implemented secure user authentication and authorization' },
      { title: 'Enabled efficient property search and booking management' },
    ],
    link: null,
    github: null,
    image: darkSaasLandingPage,
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Material UI'],
    category: 'web',
    featured: false,
  },
  {
    id: 'authorization-management-system',
    company: 'Client Project',
    year: '2024',
    title: 'Authorization Management System',
    description:
      'Dashboard web application for comprehensive authorization management, implementing Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC). Developed with Java Spring Boot for backend, Redis Cache for performance, and React for the frontend.',
    results: [
      { title: 'Designed and implemented RBAC and ABAC features' },
      { title: 'Optimized performance with Redis Cache integration' },
      { title: 'Developed a scalable and secure authorization dashboard' },
    ],
    link: null,
    github: null,
    image: aiStartupLandingPage,
    tags: ['Java Spring Boot', 'Redis', 'React', 'TypeScript', 'Material UI'],
    category: 'dashboard',
    featured: false,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
