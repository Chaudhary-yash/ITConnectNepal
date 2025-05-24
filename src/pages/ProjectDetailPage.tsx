import React from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetailPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Loading project {id}...
        </p>
      </div>
    </div>
  );
}

export default ProjectDetailPage;