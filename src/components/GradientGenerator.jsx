import { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

const GradientGenerator = () => {
  const [colors, setColors] = useState([
    { color: '#FF5F6D', position: 0 },
    { color: '#FFC371', position: 100 }
  ]);
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [cssCode, setCssCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateCssCode();
  }, [colors, gradientType, angle]);

  const addColor = () => {
    const newPosition = Math.floor(Math.random() * 100);
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    setColors([...colors, { color: randomColor, position: newPosition }]);
  };

  const removeColor = (index) => {
    if (colors.length > 2) {
      const newColors = [...colors];
      newColors.splice(index, 1);
      setColors(newColors);
    }
  };

  const updateColor = (index, newColor) => {
    const newColors = [...colors];
    newColors[index].color = newColor;
    setColors(newColors);
  };

  const updatePosition = (index, newPosition) => {
    const newColors = [...colors];
    newColors[index].position = newPosition;
    setColors(newColors);
  };

  const generateCssCode = () => {
    const sortedColors = [...colors].sort((a, b) => a.position - b.position);
    const colorStops = sortedColors.map(c => `${c.color} ${c.position}%`).join(', ');
    
    let gradientCSS = '';
    if (gradientType === 'linear') {
      gradientCSS = `linear-gradient(${angle}deg, ${colorStops})`;
    } else {
      gradientCSS = `radial-gradient(circle, ${colorStops})`;
    }
    
    setCssCode(gradientCSS);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${cssCode};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveGradient = () => {
    try {
      const savedGradients = JSON.parse(localStorage.getItem('savedGradients') || '[]');
      const newGradient = {
        id: Date.now().toString(),
        type: gradientType,
        angle: gradientType === 'linear' ? angle : null,
        colors: colors,
        cssCode: `background: ${cssCode};`,
        createdAt: new Date().toISOString()
      };
      savedGradients.push(newGradient);
      localStorage.setItem('savedGradients', JSON.stringify(savedGradients));
      alert('Gradient saved successfully!');
    } catch (error) {
      console.error('Error saving gradient:', error);
      alert('Error saving gradient');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Gradient Generator
          </h1>
          <p className="text-gray-400 text-lg">Create beautiful gradients for your designs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Preview Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-1 aspect-square">
              <div 
                className="w-full h-full rounded-2xl transition-all duration-300"
                style={{ 
                  background: gradientType === 'linear' 
                    ? `linear-gradient(${angle}deg, ${colors.map(c => `${c.color} ${c.position}%`).join(', ')})`
                    : `radial-gradient(circle, ${colors.map(c => `${c.color} ${c.position}%`).join(', ')})`
                }}
              ></div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <button
                onClick={saveGradient}
                className="flex-1 py-3 bg-green-500/90 hover:bg-green-500 text-white rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Save Gradient
              </button>
              <button
                onClick={copyToClipboard}
                className="flex-1 py-3 bg-blue-500/90 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="lg:col-span-5 space-y-6">
            {/* Gradient Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Gradient Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Gradient Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGradientType('linear')}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                        gradientType === 'linear'
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Linear
                    </button>
                    <button
                      onClick={() => setGradientType('radial')}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                        gradientType === 'radial'
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      Radial
                    </button>
                  </div>
                </div>

                {gradientType === 'linear' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Angle: {angle}°
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={angle}
                      onChange={(e) => setAngle(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Color Stops */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Color Stops
                </h2>
                <button
                  onClick={addColor}
                  className="px-4 py-2 bg-blue-500/90 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 text-sm"
                >
                  Add Color
                </button>
              </div>
              <div className="space-y-5">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-700/30 rounded-xl p-4">
                    <div className="relative group">
                      <input
                        type="color"
                        value={color.color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="w-12 h-12 rounded-xl cursor-pointer bg-gray-700 border-2 border-gray-600 focus:border-blue-500 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {color.color}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={color.position}
                        onChange={(e) => updatePosition(index, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>0%</span>
                        <span>{color.position}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    {colors.length > 2 && (
                      <button
                        onClick={() => removeColor(index)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CSS Code */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                CSS Code
              </h2>
              <pre className="bg-gray-900/80 p-4 rounded-xl overflow-x-auto text-sm text-gray-300 font-mono">
                background: {cssCode};
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator; 