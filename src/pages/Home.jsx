import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-white">Color Tools</h1>
        <p className="text-lg sm:text-xl text-white mb-8 sm:mb-12">
          Create beautiful gradients and color palettes for your projects
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-purple-600">Gradient Generator</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Create and customize beautiful linear and radial gradients
            </p>
            <Link 
              to="/gradient" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors w-full text-center text-sm sm:text-base"
            >
              Create Gradients
            </Link>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-blue-600">Color Palette</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Generate harmonious color palettes for your design projects
            </p>
            <Link 
              to="/palette" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors w-full text-center text-sm sm:text-base"
            >
              Create Palettes
            </Link>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12">
          <Link 
            to="/saved" 
            className="text-white hover:text-blue-200 transition-colors text-sm sm:text-base"
          >
            View your saved gradients and palettes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 