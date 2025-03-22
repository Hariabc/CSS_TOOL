import { useState } from 'react';

const ColorPalette = () => {
  const [paletteType, setPaletteType] = useState('analogous');
  const [baseColor, setBaseColor] = useState('#3498db');
  const [colorCount, setColorCount] = useState(5);
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState(null);

  const hexToHsl = (hex) => {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;

    // Calculate hue
    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Convert to percentages
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
  };

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;  
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
  };

  const generatePalette = () => {
    const { h, s, l } = hexToHsl(baseColor);
    let paletteColors = [];

    switch (paletteType) {
      case 'analogous':
        // Analogous colors are adjacent on the color wheel
        for (let i = 0; i < colorCount; i++) {
          const hue = (h + 30 * (i - Math.floor(colorCount / 2))) % 360;
          paletteColors.push(hslToHex(hue < 0 ? hue + 360 : hue, s, l));
        }
        break;
      
      case 'monochromatic':
        // Monochromatic colors have the same hue but different saturation/lightness
        for (let i = 0; i < colorCount; i++) {
          const newL = Math.max(20, Math.min(80, l - 30 + (60 * i / (colorCount - 1))));
          paletteColors.push(hslToHex(h, s, newL));
        }
        break;
      
      case 'triadic':
        // Triadic colors are evenly spaced on the color wheel (120° apart)
        const triadicBase = colorCount === 3 ? 120 : 360 / colorCount;
        for (let i = 0; i < colorCount; i++) {
          const hue = (h + triadicBase * i) % 360;
          paletteColors.push(hslToHex(hue, s, l));
        }
        break;
      
      case 'complementary':
        // Complementary colors are opposite on the color wheel
        const step = colorCount <= 2 ? 180 : 180 / (colorCount - 1);
        for (let i = 0; i < colorCount; i++) {
          const hue = (h + step * i) % 360;
          paletteColors.push(hslToHex(hue, s, l));
        }
        break;
      
      default:
        paletteColors = [baseColor];
    }

    setPalette(paletteColors);
  };

  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  };

  const savePalette = () => {
    try {
      // Get existing palettes or initialize empty array
      const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
      
      // Create new palette object with unique ID
      const newPalette = {
        id: Date.now().toString(),
        baseColor,
        paletteType,
        colors: palette,
        colorCount,
        createdAt: new Date().toISOString()
      };
      
      // Add to array and save back to localStorage
      savedPalettes.push(newPalette);
      localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
      
      alert('Palette saved successfully!');
    } catch (error) {
      console.error('Error saving palette:', error);
      alert('Error saving palette');
    }
  };

  return (
    <div className="py-6 w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Color Palette Generator</h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Base Color</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input 
                    type="color" 
                    value={baseColor} 
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <span className="block text-xs sm:hidden">{baseColor}</span>
                </div>
                <input 
                  type="text" 
                  value={baseColor} 
                  onChange={(e) => setBaseColor(e.target.value)} 
                  className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Palette Type</label>
              <select 
                value={paletteType} 
                onChange={(e) => setPaletteType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="analogous">Analogous</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="triadic">Triadic</option>
                <option value="complementary">Complementary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Number of Colors: {colorCount}</label>
              <input 
                type="range" 
                min="2" 
                max="10" 
                value={colorCount} 
                onChange={(e) => setColorCount(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <button 
                onClick={generatePalette}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm sm:text-base"
              >
                Generate Palette
              </button>
            </div>
          </div>
        </div>

        {palette.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">Your Color Palette</h2>
              <button 
                onClick={savePalette}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm sm:text-base"
              >
                Save Palette
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {palette.map((color, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                  onClick={() => copyToClipboard(color, index)}
                >
                  <div 
                    className="w-full aspect-square rounded-md shadow-md cursor-pointer transition-transform hover:scale-105" 
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="mt-2 text-center">
                    <p className="font-mono text-xs sm:text-sm">{color}</p>
                    {copied === index && (
                      <span className="text-xs text-green-500">Copied!</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPalette; 