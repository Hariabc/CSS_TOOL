import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SavedItems = () => {
  const [activeTab, setActiveTab] = useState('gradients');
  const [gradients, setGradients] = useState([]);
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    try {
      const savedGradients = JSON.parse(localStorage.getItem('savedGradients') || '[]');
      const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
      
      setGradients(savedGradients);
      setPalettes(savedPalettes);
    } catch (error) {
      console.error('Error loading saved items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteGradient = (id) => {
    try {
      // Filter out the gradient with the given id
      const updatedGradients = gradients.filter(gradient => gradient.id !== id);
      
      // Update state and localStorage
      setGradients(updatedGradients);
      localStorage.setItem('savedGradients', JSON.stringify(updatedGradients));
    } catch (error) {
      console.error('Error deleting gradient:', error);
      alert('Failed to delete gradient');
    }
  };

  const deletePalette = (id) => {
    try {
      // Filter out the palette with the given id
      const updatedPalettes = palettes.filter(palette => palette.id !== id);
      
      // Update state and localStorage
      setPalettes(updatedPalettes);
      localStorage.setItem('savedPalettes', JSON.stringify(updatedPalettes));
    } catch (error) {
      console.error('Error deleting palette:', error);
      alert('Failed to delete palette');
    }
  };

  return (
    <div className="py-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Saved Items</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700 text-sm sm:text-base">
          Back to Home
        </Link>
      </div>

      <div className="flex border-b mb-6 overflow-x-auto">
        <button 
          className={`py-2 px-4 font-medium text-sm sm:text-base whitespace-nowrap ${activeTab === 'gradients' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('gradients')}
        >
          Gradients
        </button>
        <button 
          className={`py-2 px-4 font-medium text-sm sm:text-base whitespace-nowrap ${activeTab === 'palettes' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('palettes')}
        >
          Palettes
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {activeTab === 'gradients' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradients.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-10 text-sm sm:text-base">No saved gradients found.</p>
              ) : (
                gradients.map((gradient) => (
                  <div key={gradient.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div 
                      className="h-40" 
                      style={{ 
                        background: gradient.type === 'linear' 
                          ? `linear-gradient(${gradient.angle}deg, ${gradient.colors.map(c => `${c.color} ${c.position}%`).join(', ')})` 
                          : `radial-gradient(circle, ${gradient.colors.map(c => `${c.color} ${c.position}%`).join(', ')})`
                      }}
                    ></div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-sm sm:text-base">{gradient.type.charAt(0).toUpperCase() + gradient.type.slice(1)} Gradient</p>
                        <button 
                          onClick={() => deleteGradient(gradient.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {gradient.cssCode}
                      </pre>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'palettes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {palettes.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-10 text-sm sm:text-base">No saved palettes found.</p>
              ) : (
                palettes.map((palette) => (
                  <div key={palette.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex h-20">
                      {palette.colors.map((color, index) => (
                        <div 
                          key={index} 
                          className="flex-1" 
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-sm sm:text-base">{palette.paletteType.charAt(0).toUpperCase() + palette.paletteType.slice(1)} Palette</p>
                        <button 
                          onClick={() => deletePalette(palette.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-5 gap-2 mt-2">
                        {palette.colors.map((color, index) => (
                          <div key={index} className="text-center">
                            <div 
                              className="w-full aspect-square rounded-md mb-1" 
                              style={{ backgroundColor: color }}
                            ></div>
                            <p className="text-xs font-mono truncate">{color}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedItems; 