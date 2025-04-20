import { useState, useEffect } from 'react';

const ColorPalette = () => {
  const [paletteType, setPaletteType] = useState('analogous');
  const [baseColor, setBaseColor] = useState('#FF5F6D');
  const [colorCount, setColorCount] = useState(5);
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generatePalette();
  }, [baseColor, paletteType, colorCount]);

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

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Color Palette Generator
          </h1>
          <p className="text-gray-400 text-lg">Generate harmonious color combinations for your projects</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Preview Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 min-h-[400px]">
              <div className="grid grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => copyToClipboard(color)}
                  >
                    <div
                      className="aspect-square rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-black/50 backdrop-blur-sm rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-sm font-medium text-center">
                        {color.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <button
                onClick={savePalette}
                className="flex-1 py-3 bg-green-500/90 hover:bg-green-500 text-white rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Save Palette
              </button>
              <button
                onClick={() => copyToClipboard(palette.join(', '))}
                className="flex-1 py-3 bg-blue-500/90 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                {copied ? 'Copied!' : 'Copy All Colors'}
              </button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="lg:col-span-5 space-y-6">
            {/* Palette Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Palette Settings
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Base Color
                  </label>
                  <div className="relative group">
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-full h-16 rounded-xl cursor-pointer bg-gray-700 border-2 border-gray-600 focus:border-blue-500 transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {baseColor.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Palette Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['analogous', 'monochromatic', 'triadic', 'complementary'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setPaletteType(type)}
                        className={`px-4 py-3 rounded-xl capitalize transition-all duration-300 ${
                          paletteType === type
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Number of Colors: {colorCount}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={colorCount}
                      onChange={(e) => setColorCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>2</span>
                      <span>5</span>
                      <span>8</span>
                    </div>
                  </div>
                </div>
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
              <div className="bg-gray-900/80 rounded-xl p-4 font-mono">
                {palette.map((color, index) => (
                  <div key={index} className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-300 cursor-pointer" onClick={() => copyToClipboard(color)}>
                    color: {color.toUpperCase()};
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette; 