import { useState } from 'react';

const Glassmorphism = () => {
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(0.1);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(16);
  const [shadow, setShadow] = useState(10);
  const [copied, setCopied] = useState(false);

  const glassStyle = {
    backdropFilter: `blur(${blur}px)`,
    backgroundColor: `${backgroundColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    boxShadow: `0 8px 32px 0 rgba(0, 0, 0, ${shadow / 100})`,
  };

  const cssCode = `.glass-effect {
  backdrop-filter: blur(${blur}px);
  background-color: ${backgroundColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')};
  border: ${borderWidth}px solid ${borderColor};
  border-radius: ${borderRadius}px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, ${shadow / 100});
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Glassmorphism Generator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div 
                className="w-64 h-64 flex items-center justify-center text-white text-lg font-medium transition-all duration-300"
                style={glassStyle}
              >
                Glass Effect
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Customize Glass Effect</h2>
              
              <div className="space-y-4">
                {/* Blur Control */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blur: {blur}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={blur}
                    onChange={(e) => setBlur(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Opacity Control */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Opacity: {Math.round(opacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacity * 100}
                    onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Border Width Control */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Width: {borderWidth}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Border Color Control */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Color
                  </label>
                  <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Background Color Control */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Border Radius Control */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Border Radius: {borderRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Shadow Control */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Shadow Intensity: {shadow}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={shadow}
                    onChange={(e) => setShadow(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* CSS Code Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">CSS Code</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                {cssCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Glassmorphism; 