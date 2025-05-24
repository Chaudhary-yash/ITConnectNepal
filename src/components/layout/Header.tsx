import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, MessageSquare, Sun, Moon, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">
              ITConnect<span className="text-secondary">Nepal</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-secondary"></span>
                </button>

                {/* Messages */}
                <Link to="/messages" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-secondary"></span>
                </Link>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-1">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link
                      to={`/profile/${user?.username}`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user?.avatar}
                        alt={user?.name}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to={`/profile/${user?.username}`}
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <UserCircle className="mr-3 h-5 w-5" />
                      Your Profile
                    </Link>
                    <Link
                      to="/messages"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <MessageSquare className="mr-3 h-5 w-5" />
                      Messages
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              <button
                onClick={toggleTheme}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 mt-2"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="mr-3 h-5 w-5" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-3 h-5 w-5" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;