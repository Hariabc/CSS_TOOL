import { useState, useEffect } from 'react';

const GlassmorphismGenerator = () => {
  const [blurValue, setBlurValue] = useState(4.0);
  const [transparency, setTransparency] = useState(0.25);
  const [showOutline, setShowOutline] = useState(true);
  const [borderRadius, setBorderRadius] = useState(10);
  const [shadowColor, setShadowColor] = useState('#1f2687');
  const [shadowOpacity, setShadowOpacity] = useState(0.37);
  const [shadowSpread, setShadowSpread] = useState(32);
  const [hoverEffect, setHoverEffect] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [cssCode, setCssCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateCssCode();
  }, [blurValue, transparency, showOutline, borderRadius, shadowColor, shadowOpacity, shadowSpread, hoverEffect, backgroundColor]);

  const generateCssCode = () => {
    const css = `
.glass-effect {
  background: ${backgroundColor}${Math.round(transparency * 255).toString(16).padStart(2, '0')};
  box-shadow: 0 8px ${shadowSpread}px 0 ${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')};
  backdrop-filter: blur(${blurValue}px);
  -webkit-backdrop-filter: blur(${blurValue}px);
  border-radius: ${borderRadius}px;
  ${showOutline ? `border: 1px solid rgba(255, 255, 255, 0.18);` : ''}
  transition: all 0.3s ease;
}

${hoverEffect ? `
.glass-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px ${shadowSpread + 8}px 0 ${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')};
  background: ${backgroundColor}${Math.round((transparency + 0.05) * 255).toString(16).padStart(2, '0')};
}` : ''}`;
    setCssCode(css);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveGlassmorphism = () => {
    try {
      const savedEffects = JSON.parse(localStorage.getItem('savedGlassmorphism') || '[]');
      const newEffect = {
        id: Date.now().toString(),
        blurValue,
        transparency,
        showOutline,
        borderRadius,
        shadowColor,
        shadowOpacity,
        shadowSpread,
        hoverEffect,
        backgroundColor,
        cssCode,
        createdAt: new Date().toISOString()
      };
      
      savedEffects.push(newEffect);
      localStorage.setItem('savedGlassmorphism', JSON.stringify(savedEffects));
      alert('Glassmorphism effect saved successfully!');
    } catch (error) {
      console.error('Error saving glassmorphism effect:', error);
      alert('Error saving glassmorphism effect');
    }
  };

  const cardStyle = {
    background: `${backgroundColor}${Math.round(transparency * 255).toString(16).padStart(2, '0')}`,
    backdropFilter: `blur(${blurValue}px)`,
    WebkitBackdropFilter: `blur(${blurValue}px)`,
    boxShadow: `0 8px ${shadowSpread}px 0 ${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')}`,
    borderRadius: `${borderRadius}px`,
    border: showOutline ? '1px solid rgba(255, 255, 255, 0.18)' : 'none',
    transition: 'all 0.3s ease',
    ...(hoverEffect && {
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 12px ${shadowSpread + 8}px 0 ${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')}`,
        background: `${backgroundColor}${Math.round((transparency + 0.05) * 255).toString(16).padStart(2, '0')}`
      }
    })
  };

  return (
    <div className="py-6 w-full px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Advanced Glassmorphism Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="space-y-4">
            <div 
              className="p-6 rounded-lg"
              style={cardStyle}
            >
              <h3 className="text-xl font-bold mb-2">Sample Card</h3>
              <p className="text-gray-600 dark:text-gray-300">
                This is a sample card with advanced glassmorphism effect. Hover over it to see the interaction!
              </p>
            </div>
            
            <div 
              className="p-6 rounded-lg"
              style={cardStyle}
            >
              <h3 className="text-xl font-bold mb-2">Another Card</h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can use this effect on any container to create a modern, translucent look.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Customize</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Blur value: {blurValue}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={blurValue}
                onChange={(e) => setBlurValue(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Transparency: {Math.round(transparency * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={transparency}
                onChange={(e) => setTransparency(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Border Radius: {borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={borderRadius}
                onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Background Color
              </label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Shadow Color
              </label>
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Shadow Opacity: {Math.round(shadowOpacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={shadowOpacity}
                onChange={(e) => setShadowOpacity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Shadow Spread: {shadowSpread}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={shadowSpread}
                onChange={(e) => setShadowSpread(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showOutline"
                  checked={showOutline}
                  onChange={(e) => setShowOutline(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="showOutline" className="ml-2 block text-sm font-medium">
                  Show outline
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hoverEffect"
                  checked={hoverEffect}
                  onChange={(e) => setHoverEffect(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="hoverEffect" className="ml-2 block text-sm font-medium">
                  Hover effect
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
          <h3 className="font-semibold">CSS Code</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={saveGlassmorphism}
              className="flex-1 sm:flex-none bg-green-500/80 hover:bg-green-600/80 text-white px-3 py-1 rounded-md text-sm transition-all duration-200 shadow-lg"
            >
              Save
            </button>
            <button 
              onClick={copyToClipboard}
              className="flex-1 sm:flex-none bg-blue-500/80 hover:bg-blue-600/80 text-white px-3 py-1 rounded-md text-sm transition-all duration-200 shadow-lg"
            >
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
        </div>
        <pre className="bg-white/5 dark:bg-gray-700/50 p-3 rounded overflow-x-auto text-xs sm:text-sm border border-white/10">
          {cssCode}
        </pre>
      </div>
    </div>
  );
};

export default GlassmorphismGenerator; 