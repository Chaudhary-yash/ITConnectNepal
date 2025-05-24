import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { posts, projects, users } from '../data/mockData';
import PostCard from '../components/posts/PostCard';
import ProjectCard from '../components/projects/ProjectCard';
import NewPostForm from '../components/posts/NewPostForm';
import { FeedType, FeedContentType } from '../types';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [feedType, setFeedType] = useState<FeedType>('following');
  const [contentType, setContentType] = useState<FeedContentType>('all');

  // Filter posts based on feedType
  const filteredPosts = posts.filter(post => {
    if (feedType === 'following' && user) {
      return user.following.includes(post.author.id);
    }
    return true; // For trending, show all posts
  });

  // Filter projects based on feedType
  const filteredProjects = projects.filter(project => {
    if (feedType === 'following' && user) {
      return user.following.includes(project.author.id);
    }
    return true; // For trending, show all projects
  });

  // Get feed content based on contentType
  const getFeedContent = () => {
    let itemsToRender: (Post | Project)[] = [];

    if (contentType === 'all' || contentType === 'posts') {
      itemsToRender.push(...filteredPosts);
    }
    if (contentType === 'all' || contentType === 'projects') {
      itemsToRender.push(...filteredProjects);
    }

    itemsToRender.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime(); // Sorts in descending order (newest first)
    });

    return itemsToRender.map(item => {
      // Use a distinctive property to differentiate Post from Project
      // Projects have a 'title' property, Posts primarily have 'content'.
      if ('title' in item) {
        return <ProjectCard key={`project-${item.id}`} project={item as Project} />;
      } else {
        return <PostCard key={`post-${item.id}`} post={item as Post} />;
      }
    });
  };

  const feedContent = getFeedContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link to="#" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Mobile Apps
                  </Link>
                </li>
                <li>
                  <Link to="#" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    AI & Machine Learning
                  </Link>
                </li>
                <li>
                  <Link to="#" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Game Development
                  </Link>
                </li>
                <li>
                  <Link to="#" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    UI/UX Design
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  #React
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  #Flutter
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  #Python
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  #DevOps
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  #MachineLearning
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  #JavaScript
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  #UI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {isAuthenticated && (
            <NewPostForm />
          )}

          {/* Feed Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  feedType === 'following'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary'
                }`}
                onClick={() => setFeedType('following')}
              >
                <Users className="inline-block h-4 w-4 mr-2" />
                Following
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  feedType === 'trending'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary'
                }`}
                onClick={() => setFeedType('trending')}
              >
                <TrendingUp className="inline-block h-4 w-4 mr-2" />
                Trending
              </button>
            </div>

            <div className="flex p-2">
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  contentType === 'all'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setContentType('all')}
              >
                All
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-full ml-2 ${
                  contentType === 'posts'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setContentType('posts')}
              >
                Posts
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-full ml-2 ${
                  contentType === 'projects'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setContentType('projects')}
              >
                Projects
              </button>
            </div>
          </div>

          {/* Feed Content */}
          {feedContent.length > 0 ? (
            <div className="space-y-6">
              {feedContent}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No content to display
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feedType === 'following'
                  ? "You're not following anyone yet or they haven't posted content."
                  : "There's no trending content at the moment."}
              </p>
              {feedType === 'following' && (
                <button
                  onClick={() => setFeedType('trending')}
                  className="btn btn-primary"
                >
                  Explore Trending Content
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4">People to Follow</h3>
              <ul className="space-y-4">
                {users.slice(0, 3).map((suggestedUser) => (
                  <li key={suggestedUser.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={suggestedUser.avatar}
                        alt={suggestedUser.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {suggestedUser.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {suggestedUser.skills.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-primary hover:text-primary/80">
                      Follow
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
              <ul className="space-y-4">
                <li>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Kathmandu Developer Meetup
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    June 25, 2023 • Thamel, Kathmandu
                  </p>
                </li>
                <li>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    React Nepal Conference
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    July 10, 2023 • Patan, Lalitpur
                  </p>
                </li>
                <li>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Flutter Workshop for Beginners
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    July 15, 2023 • Online
                  </p>
                </li>
              </ul>
              <Link
                to="#"
                className="block text-center text-sm font-medium text-primary hover:text-primary/80 mt-4"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;