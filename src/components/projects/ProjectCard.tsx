import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { user } = useAuth();

  // Safeguard against undefined project or project.likes
  const initialLiked = user && project?.likes ? project.likes.includes(user.id) : false;
  const initialLikeCount = project?.likes?.length || 0;

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = () => {
    if (!user || !project) return; // Safeguard
    
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  // Safeguard for rendering, return null or a placeholder if project is not defined
  if (!project || !project.author) {
    // Optionally, render a loading state or a placeholder
    return null; 
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Project Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${project.author.username}`} className="flex items-center">
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {project.author.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {/* Safeguard for project.createdAt */}
              {project.createdAt ? formatDistanceToNow(new Date(project.createdAt)) : 'Date unavailable'}
            </p>
          </div>
        </Link>
      </div>

      {/* Project Preview Images */}
      {project.previewImages && project.previewImages.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.previewImages[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-lg font-semibold">
              <Link to={`/projects/${project.id}`} className="hover:underline">
                {project.title}
              </Link>
            </h3>
          </div>
        </div>
      )}

      {/* Project Content */}
      <div className="p-4">
        {!project.previewImages?.length && (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            <Link to={`/projects/${project.id}`} className="hover:underline">
              {project.title}
            </Link>
          </h3>
        )}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Project Links */}
      <div className="px-4 pb-2 flex space-x-3">
        {project.repoUrl && (
          <a 
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            <Github className="h-3 w-3 mr-1" />
            Repository
          </a>
        )}
        {project.demoUrl && (
          <a 
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Live Demo
          </a>
        )}
      </div>

      {/* Project Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            className={`flex items-center space-x-1 ${liked ? 'text-secondary' : 'text-gray-500 dark:text-gray-400'}`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </button>
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400"
          >
            <MessageCircle className="h-5 w-5" />
            {/* Safeguard for project.comments */}
            <span>{project.comments?.length || 0}</span>
          </Link>
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;