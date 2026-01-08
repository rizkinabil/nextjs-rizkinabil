import { StaticImageData } from 'next/image';

import memojiAvatar1 from '@/assets/images/memoji-avatar-1.png';
import memojiAvatar2 from '@/assets/images/memoji-avatar-2.png';
import memojiAvatar3 from '@/assets/images/memoji-avatar-3.png';
import memojiAvatar4 from '@/assets/images/memoji-avatar-4.png';
import memojiAvatar5 from '@/assets/images/memoji-avatar-5.png';

// Types
export interface Testimonial {
  name: string;
  position: string;
  text: string;
  source?: string;
  avatar: StaticImageData;
}

// Data
export const testimonials: Testimonial[] = [
  {
    name: 'Lutfhi Iqbal',
    position:
      'IT Manager | IT Practitioner | Project Management | Dynamics 365 Technical Specialist | IT Governance Specialist | Digital Transformation',
    text: "You are most compassionate person, talented programmer i've ever known, you are also meticoulous on every single part of tasks, you're the guy Rizki, wish you best luck !",
    source: 'LinkedIn',
    avatar: memojiAvatar1,
  },
  {
    name: 'Faris Azizy',
    position: 'ERP Solution Architect | Odoo Certified | Former Intern Data Analyst @ Gojek, Tiket.com',
    text: "I had the pleasure of working with Rizki on a college project. He's a top-notch developer with a keen eye for detail and a commitment to excellence.",
    source: 'LinkedIn',
    avatar: memojiAvatar1,
  },
  {
    name: 'Rifqi Arrahim',
    position: 'Junior Manager at Bank Rakyat Indonesia',
    text: 'I would highly recommend Nabil for their exceptional leadership and decision-making abilities. They have a remarkable talent for analyzing complex situations and arriving at logical and sensible solutions, without being swayed by emotions. Throughout my time working with Nabil, I have seen them demonstrate a consistent level of professionalism and composure in high-pressure situations. They have an innate ability to lead their team effectively, while remaining focused on the task at hand.',
    source: 'LinkedIn',
    avatar: memojiAvatar2,
  },
  {
    name: 'Imam Prayoga',
    position: 'Data Scientist at PT Mitra Solusi Telematika | Data Science Enthusiast',
    text: 'When an organization/team needs someone who can maintain the stability and harmony of the organization, as well as being an important figure to motivate people, Rizki Nabil is the right person for all of it. Nabil is a person who can think critically under pressure while maintaining the enthusiasm of the people in it. It was an honor to be his partner',
    source: 'LinkedIn',
    avatar: memojiAvatar3,
  },
  {
    name: 'Muhammad Ihsan Adly',
    position: 'Project Engineer at SCBD Data Center',
    text: 'Nabil is a very cheerful person, easy to work with, a great leader, hard worker',
    source: 'LinkedIn',
    avatar: memojiAvatar4,
  },
  {
    name: 'Aditya Andar Rahim',
    position: 'Flutter Mobile Engineer at Dealls Jobs',
    text: "Rizki and I are in the same class in University. I see Rizki as a creative and problem-solver person. It's always great to discuss with Rizki.",
    source: 'LinkedIn',
    avatar: memojiAvatar5,
  },
];
