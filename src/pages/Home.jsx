import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Color Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Create beautiful designs with our color tools
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Gradient Generator - Large Card */}
          <Link 
            to="/gradient" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Gradient Generator</h2>
              <p className="text-white/80 mb-4">Create beautiful linear and radial gradients</p>
              <div className="flex items-center text-sm">
                <span>Get Started</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Color Palette - Medium Card */}
          <Link 
            to="/palette" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 p-8 text-white hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Color Palette</h2>
              <p className="text-white/80 mb-4">Generate harmonious color combinations</p>
              <div className="flex items-center text-sm">
                <span>Get Started</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Glassmorphism - Medium Card */}
          <Link 
            to="/glassmorphism" 
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-8 text-white hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Glassmorphism</h2>
              <p className="text-white/80 mb-4">Create modern glass effects</p>
              <div className="flex items-center text-sm">
                <span>Get Started</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Saved Items - Wide Card */}
          <Link 
            to="/saved" 
            className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 p-8 hover:shadow-xl transition-all duration-300 md:col-span-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Saved Items</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">View your saved gradients, palettes, and effects</p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span>View All</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 