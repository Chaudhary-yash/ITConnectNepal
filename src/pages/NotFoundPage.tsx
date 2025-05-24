import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;