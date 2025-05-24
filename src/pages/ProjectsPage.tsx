import React from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/mockData'; // Import projects

function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;