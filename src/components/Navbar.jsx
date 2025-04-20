import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // Don't show navbar on the home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg mb-4 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-500 group-hover:to-blue-400">
                CSS Tools
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/gradient"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  location.pathname === '/gradient'
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Gradient Generator
              </Link>
              <Link
                to="/palette"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  location.pathname === '/palette'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Color Palette
              </Link>
              <Link
                to="/glassmorphism"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  location.pathname === '/glassmorphism'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Glassmorphism
              </Link>
              <Link
                to="/saved"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  location.pathname === '/saved'
                    ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Saved Items
              </Link>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <Link
              to="/"
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-all duration-300"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around px-2 py-3">
          <Link
            to="/gradient"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              location.pathname === '/gradient'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Gradient
          </Link>
          <Link
            to="/palette"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              location.pathname === '/palette'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Palette
          </Link>
          <Link
            to="/glassmorphism"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              location.pathname === '/glassmorphism'
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Glass
          </Link>
          <Link
            to="/saved"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              location.pathname === '/saved'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Saved
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 