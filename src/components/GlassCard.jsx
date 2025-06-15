import React from 'react';

const GlassCard = ({ children, className = '', blur = 'lg', bgOpacity = '10', borderOpacity = '20' }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className={`absolute inset-0 backdrop-blur-${blur} bg-white/${bgOpacity} dark:bg-gray-800/${bgOpacity} border-white/${borderOpacity} dark:border-gray-700/${borderOpacity} shadow-lg`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard; 