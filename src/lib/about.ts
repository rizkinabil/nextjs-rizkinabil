import { StaticImageData } from 'next/image';
import React from 'react';

import GitHubIcon from '@/assets/icons/github.svg';
import ReactIcon from '@/assets/icons/react.svg';
import JavascriptIcon from '@/assets/icons/square-js.svg';
import smileMemoji from '@/assets/images/memoji-smile.png';

// Types
export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  avatar: StaticImageData;
}

export interface Experience {
  company: string;
  period: string;
  job: string;
  location: string;
  description: string;
}

export interface Highlight {
  label: string;
  value: string;
}

export interface ToolboxItem {
  title: string;
  iconType: React.ElementType;
}

// Data
export const profile: Profile = {
  name: 'Rizki Nabil Aufa',
  headline: 'Software Engineer',
  location: 'Jakarta, Indonesia',
  email: 'rizukinbr@gmail.com',
  github: 'rizkinabil',
  linkedin: 'rizkinabilaufa',
  summary:
    'I am a Software Engineer passionate about solving problems and delivering impactful solutions through technology. I specialize in building scalable and maintainable web applications using TypeScript, React, and modern frontend tools, while also leveraging Java and Spring Boot for backend development. I focus on creating reliable, user-centered systems that align with business objectives. Committed to continuous learning and technical excellence, I strive to build products that make a meaningful difference.',
  avatar: smileMemoji,
};

export const experiences: Experience[] = [
  {
    company: 'Hyundai AutoEver Indonesia',
    period: 'Feb 2024 – Present',
    job: 'Developer Specialist - Fulltime',
    location: 'Jakarta, ID',
    description:
      'Develop scalable enterprise systems using Java Spring Boot and React (TypeScript) to support global business operations. Collaborate directly with Korean development teams to align product standards, enhance system performance, and ensure secure global deployments.',
  },
  {
    company: 'PT TELKOM INDONESIA',
    period: 'Oct 2023 – Oct 2024',
    job: 'Jr Frontend Developer - Contract',
    location: 'Bandung (Hybrid), ID',
    description:
      'Built production-grade dashboards used by top management, implementing best practices with React, React Query, and React Hook Form. Partnered with UI/UX and backend teams to deliver cohesive, performant, and maintainable applications using Jenkins and Docker for CI/CD.',
  },
  {
    company: 'PT Padepokan Tujuh Sembilan',
    period: 'Jul 2024 – Sep 2024',
    job: 'Software Developer - Freelance',
    location: 'Bandung (Hybrid), ID',
    description:
      'Developed full-stack applications with React (TypeScript) and Java Spring Boot, ensuring modular and clean code architecture. Collaborated with UI/UX designers and system analysts to align technical implementation with business objectives.',
  },
  {
    company: 'PT TELKOM INDONESIA',
    period: 'Feb 2023 – Jun 2023',
    job: 'Frontend Developer - Internship',
    location: 'Bandung (Hybrid), ID',
    description:
      'Supported the development of responsive web apps using React TypeScript and Material UI. Optimized data access and performance using Hasura GraphQL. Collaborated across teams to deliver high-quality, adaptive web interfaces.',
  },
];

export const highlights: Highlight[] = [
  { label: 'Experience', value: '3+ Years' },
  { label: 'Education', value: 'Bach. Computer Science, Telkom University' },
  { label: 'Location', value: 'Jakarta, Indonesia' },
  { label: 'Tech Focus', value: 'TypeScript, React, Java, Spring Boot' },
];

export const toolboxItems: ToolboxItem[] = [
  {
    title: 'TypeScript',
    iconType: JavascriptIcon, // Replace with TypeScript icon if available
  },
  {
    title: 'React',
    iconType: ReactIcon,
  },
  {
    title: 'Java',
    iconType: JavascriptIcon, // Replace with Java icon if available
  },
  {
    title: 'Spring Boot',
    iconType: JavascriptIcon, // Replace with Spring Boot icon if available
  },
  {
    title: 'JavaScript',
    iconType: JavascriptIcon,
  },
  {
    title: 'GitHub',
    iconType: GitHubIcon,
  },
];
