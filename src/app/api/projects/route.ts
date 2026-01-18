import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedProjects, getAllProjects, getProjectById, createProject } from '@/lib/database-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const id = searchParams.get('id');

    // Get single project by ID
    if (id) {
      const project = await getProjectById(id);
      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json(project);
    }

    // Get featured projects
    if (featured === 'true') {
      const projects = await getFeaturedProjects();
      return NextResponse.json(projects);
    }

    // Get all projects
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projects API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch projects',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await createProject(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create project',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
