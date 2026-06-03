import {
  getAllProjects,
  getExperiences,
  getHighlights,
  getProfile,
  getPublishedBlogPosts,
  getToolboxItems,
} from '@/lib/database-service';

export async function buildPortfolioContext(): Promise<string> {
  const [profile, experiences, projects, blogPosts, highlights, toolbox] = await Promise.all([
    getProfile(),
    getExperiences(),
    getAllProjects(),
    getPublishedBlogPosts(),
    getHighlights(),
    getToolboxItems(),
  ]);

  const sections: string[] = [];

  if (profile) {
    sections.push(`## About
Name: ${profile.name}
Headline: ${profile.headline ?? ''}
Location: ${profile.location ?? ''}
Email: ${profile.email ?? ''}
GitHub: ${profile.github ?? ''}
LinkedIn: ${profile.linkedin ?? ''}
Summary: ${profile.summary ?? ''}`);
  }

  if (highlights.length > 0) {
    sections.push(`## Highlights
${highlights.map((h) => `- ${h.label}: ${h.value}`).join('\n')}`);
  }

  if (toolbox.length > 0) {
    sections.push(`## Skills & Tools
${toolbox.map((t) => t.name).join(', ')}`);
  }

  if (experiences.length > 0) {
    sections.push(`## Work Experience
${experiences
  .map(
    (e) => `### ${e.job_title} at ${e.company}
Period: ${e.period}${e.location ? `\nLocation: ${e.location}` : ''}
${e.description ?? ''}`,
  )
  .join('\n\n')}`);
  }

  if (projects.length > 0) {
    sections.push(`## Projects
${projects
  .map(
    (p) => `### ${p.title} (${p.year})
Company: ${p.company} | Category: ${p.category}
${p.description ?? ''}
Tech Stack: ${Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : ''}
Key Results: ${Array.isArray(p.results) ? (p.results as Array<{ title: string }>).map((r) => r.title).join('; ') : ''}${p.link ? `\nLive: ${p.link}` : ''}${p.github_link ? `\nGitHub: ${p.github_link}` : ''}`,
  )
  .join('\n\n')}`);
  }

  if (blogPosts.length > 0) {
    sections.push(`## Blog Posts
${blogPosts
  .map(
    (b) =>
      `- "${b.title}" (${new Date(b.created_at).getFullYear()}) — Tags: ${b.tags.join(', ')}${b.excerpt ? `\n  ${b.excerpt}` : ''}\n  URL: /blog/${b.slug}`,
  )
  .join('\n')}`);
  }

  return sections.join('\n\n');
}
