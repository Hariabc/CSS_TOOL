import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
           CSS Tools
          </h1>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Your one-stop destination for modern CSS utilities. Create stunning gradients, design with glassmorphism effects, and generate beautiful color palettes for your web projects.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gradient Generator - Large Card */}
          <Link 
            to="/gradient" 
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">Gradient Generator</h2>
              <p className="text-white/90 mb-4">Create beautiful linear and radial gradients</p>
              <div className="flex items-center text-sm">
                <span className='text-white/90'>Get Started</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Color Palette - Medium Card */}
          <Link 
            to="/palette" 
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-500 p-8 text-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">Color Palette</h2>
              <p className="text-white/90 mb-4">Generate harmonious color combinations</p>
              <div className="flex items-center text-sm">
                <span className='text-white/90'>Get Started</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Glassmorphism - Medium Card */}
          <Link 
            to="/glassmorphism" 
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 p-8 text-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="absolute top-4 right-4 w-16 h-16 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg"></div>
              <div className="absolute top-12 right-12 w-24 h-24 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg"></div>
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg"></div>
              <h2 className="text-2xl font-bold mb-2 text-white relative z-20">Glassmorphism</h2>
              <p className="text-white/90 mb-4 relative z-20">Create modern glass effects</p>
              <div className="flex items-center text-sm relative z-20">
                <span className='text-white/90'>Get Started</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Saved Items - Wide Card */}
          <Link 
            to="/saved" 
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:col-span-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-700/50 dark:to-gray-800/50 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Saved Items</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">View your saved gradients, palettes, and effects</p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span>View All</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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