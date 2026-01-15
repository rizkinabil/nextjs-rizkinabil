import { getAllProjects } from '@/lib/database-service';

export async function generateStaticParams() {
  const allProjects = await getAllProjects();
  return allProjects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
