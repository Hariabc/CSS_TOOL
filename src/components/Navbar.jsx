import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // Don't show navbar on the home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-md mb-4">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Color Tools
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/gradient"
                className={`px-4 py-2 text-sm font-medium ${
                  location.pathname === '/gradient'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                Gradient Generator
              </Link>
              <Link
                to="/palette"
                className={`px-4 py-2 text-sm font-medium ${
                  location.pathname === '/palette'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                Color Palette
              </Link>
              <Link
                to="/saved"
                className={`px-4 py-2 text-sm font-medium ${
                  location.pathname === '/saved'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                Saved Items
              </Link>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <Link
              to="/"
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
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
            className={`block px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/gradient'
                ? 'bg-purple-100 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Gradient
          </Link>
          <Link
            to="/palette"
            className={`block px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/palette'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Palette
          </Link>
          <Link
            to="/saved"
            className={`block px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/saved'
                ? 'bg-green-100 text-green-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
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