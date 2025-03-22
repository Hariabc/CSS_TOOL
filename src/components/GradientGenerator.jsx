import { useState, useEffect } from 'react';

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
      // Get existing gradients or initialize empty array
      const savedGradients = JSON.parse(localStorage.getItem('savedGradients') || '[]');
      
      // Create new gradient object with unique ID
      const newGradient = {
        id: Date.now().toString(),
        type: gradientType,
        angle: gradientType === 'linear' ? angle : null,
        colors: colors,
        cssCode,
        createdAt: new Date().toISOString()
      };
      
      // Add to array and save back to localStorage
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
    <div className="py-6 w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Gradient Generator</h1>
      
      <div className="mb-8 h-48 sm:h-64 rounded-lg shadow-lg" style={gradientStyle}></div>
      
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium mb-2">Gradient Type</label>
          <div className="flex gap-4">
            <button 
              className={`flex-1 px-4 py-2 rounded-md text-sm ${gradientType === 'linear' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setGradientType('linear')}
            >
              Linear
            </button>
            <button 
              className={`flex-1 px-4 py-2 rounded-md text-sm ${gradientType === 'radial' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setGradientType('radial')}
            >
              Radial
            </button>
          </div>
        </div>
        
        {gradientType === 'linear' && (
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium mb-2">Angle: {angle}°</label>
            <input 
              type="range" 
              min="0" 
              max="360" 
              value={angle} 
              onChange={(e) => setAngle(parseInt(e.target.value))} 
              className="w-full"
            />
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Color Stops</h2>
          <button 
            onClick={addColor}
            className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md text-sm sm:text-base"
          >
            Add Color
          </button>
        </div>
        
        {colors.map((color, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <div className="w-full sm:w-auto flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md" style={{ backgroundColor: color.color }}></div>
              <div className="flex-1 sm:hidden">
                <span className="block text-xs font-medium">{color.color}</span>
              </div>
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block text-xs sm:text-sm font-medium mb-1">Color</label>
              <input 
                type="color" 
                value={color.color} 
                onChange={(e) => updateColor(index, e.target.value)} 
                className="w-full h-8"
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block text-xs sm:text-sm font-medium mb-1">Position: {color.position}%</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={color.position} 
                onChange={(e) => updatePosition(index, parseInt(e.target.value))} 
                className="w-full"
              />
            </div>
            {colors.length > 2 && (
              <button 
                onClick={() => removeColor(index)}
                className="mt-2 sm:mt-0 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
          <h3 className="font-semibold">CSS Code</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={saveGradient}
              className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Save
            </button>
            <button 
              onClick={copyToClipboard}
              className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <pre className="bg-gray-200 dark:bg-gray-700 p-2 sm:p-3 rounded overflow-x-auto text-xs sm:text-sm">
          {cssCode}
        </pre>
      </div>
    </div>
  );
};

export default GradientGenerator; 