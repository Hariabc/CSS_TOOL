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
      gradientCSS = `background: linear-gradient(${angle}deg, ${colorStops});`;
    } else {
      gradientCSS = `background: radial-gradient(circle, ${colorStops});`;
    }
    
    setCssCode(gradientCSS);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
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
        cssCode,
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

  const gradientStyle = {
    background: gradientType === 'linear' 
      ? `linear-gradient(${angle}deg, ${colors.map(c => `${c.color} ${c.position}%`).join(', ')})`
      : `radial-gradient(circle, ${colors.map(c => `${c.color} ${c.position}%`).join(', ')})`
  };

  return (
    <div className="py-8 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Gradient Generator
      </h1>
      
      <div className="mb-8 h-64 sm:h-80 rounded-2xl shadow-2xl relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0" style={gradientStyle}></div>
        <GlassCard className="absolute inset-0" blurIntensity="sm" bgOpacity="5" borderOpacity="10" />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Gradient Type</label>
          <div className="flex gap-4">
            <button 
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                gradientType === 'linear' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setGradientType('linear')}
            >
              Linear
            </button>
            <button 
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                gradientType === 'radial' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setGradientType('radial')}
            >
              Radial
            </button>
          </div>
        </div>
        
        {gradientType === 'linear' && (
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Angle: {angle}°</label>
            <input 
              type="range" 
              min="0" 
              max="360" 
              value={angle} 
              onChange={(e) => setAngle(parseInt(e.target.value))} 
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Color Stops</h2>
          <button 
            onClick={addColor}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40"
          >
            Add Color
          </button>
        </div>
        
        {colors.map((color, index) => (
          <GlassCard key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 p-4">
            <div className="w-full sm:w-auto flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl shadow-md transition-transform duration-300 hover:scale-110" 
                style={{ backgroundColor: color.color }}
              ></div>
              <div className="flex-1 sm:hidden">
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{color.color}</span>
              </div>
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Color</label>
              <input 
                type="color" 
                value={color.color} 
                onChange={(e) => updateColor(index, e.target.value)} 
                className="w-full h-10 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Position: {color.position}%</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={color.position} 
                onChange={(e) => updatePosition(index, parseInt(e.target.value))} 
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            {colors.length > 2 && (
              <button 
                onClick={() => removeColor(index)}
                className="mt-2 sm:mt-0 w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
              >
                Remove
              </button>
            )}
          </GlassCard>
        ))}
      </div>
      
      <GlassCard className="mt-6 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">CSS Code</h3>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={saveGradient}
              className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40"
            >
              Save
            </button>
            <button 
              onClick={copyToClipboard}
              className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <pre className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl overflow-x-auto text-sm font-mono border border-gray-200 dark:border-gray-700">
          {cssCode}
        </pre>
      </GlassCard>
    </div>
  );
};

export default GradientGenerator; 