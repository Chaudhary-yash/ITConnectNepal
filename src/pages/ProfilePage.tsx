import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Mail, Calendar, Edit, Github, Globe, Twitter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { users, projects, posts } from '../data/mockData';
import { User } from '../types';
import PostCard from '../components/posts/PostCard';
import ProjectCard from '../components/projects/ProjectCard';

type ProfileTab = 'posts' | 'projects' | 'about';

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Find the user by username
    const foundUser = users.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      // Check if current user is following this user
      if (currentUser) {
        setIsFollowing(currentUser.following.includes(foundUser.id));
      }
    }
  }, [username, currentUser]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <p className="text-xl text-gray-600 dark:text-gray-300">User not found</p>
      </div>
    );
  }

  const userPosts = posts.filter(post => post.author.id === user.id);
  const userProjects = projects.filter(project => project.author.id === user.id);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // In a real app, we would update the database
  };

  const isCurrentUser = currentUser?.id === user.id;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary to-secondary"></div>
        
        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
          </div>
          
          {/* Profile Actions */}
          <div className="flex justify-end pt-4">
            {isCurrentUser ? (
              <Link to="#" className="btn btn-outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            ) : (
              <button
                onClick={handleFollow}
                className={`btn ${isFollowing ? 'btn-outline' : 'btn-primary'}`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
          
          {/* Profile Details */}
          <div className="mt-16">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">@{user.username}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-200">{user.bio}</p>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-1" />
                {user.location}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Briefcase className="h-4 w-4 mr-1" />
                Software Developer
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 mr-1" />
                {user.email}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-4 flex space-x-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.following.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Following</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.followers.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{userProjects.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{userPosts.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Posts</p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary"
                aria-label="Website"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-4 px-6 text-center font-medium ${
              activeTab === 'posts'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-700 dark:text-gray-200 hover:text-primary'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`py-4 px-6 text-center font-medium ${
              activeTab === 'projects'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-700 dark:text-gray-200 hover:text-primary'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`py-4 px-6 text-center font-medium ${
              activeTab === 'about'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-700 dark:text-gray-200 hover:text-primary'
            }`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {userPosts.length > 0 ? (
                userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    No posts yet
                  </p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {userProjects.length > 0 ? (
                userProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    No projects yet
                  </p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'about' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {user.bio}
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {user.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  {user.location}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;