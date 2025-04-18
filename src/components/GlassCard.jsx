import React from 'react';

const GlassCard = ({ children, className = '', blurIntensity = 'md', borderOpacity = '20', bgOpacity = '10' }) => {
  return (
    <div 
      className={`
        bg-white/${bgOpacity} 
        dark:bg-gray-800/${bgOpacity} 
        backdrop-blur-${blurIntensity}
        border border-white/${borderOpacity} 
        dark:border-gray-700/${borderOpacity}
        shadow-lg 
        dark:shadow-gray-900/20
        rounded-xl 
        transition-all 
        duration-300 
        ease-in-out
        hover:shadow-xl 
        hover:shadow-gray-900/30
        dark:hover:shadow-gray-900/40
        hover:scale-[1.02]
        hover:bg-white/${parseInt(bgOpacity) + 5} 
        dark:hover:bg-gray-800/${parseInt(bgOpacity) + 5}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard; 