import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                ITConnect<span className="text-secondary">Nepal</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Connecting Nepali IT students to share projects, collaborate, and grow together.
            </p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@itconnectnepal.com" 
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  People
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} ITConnectNepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;