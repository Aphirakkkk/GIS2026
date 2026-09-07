import React from 'react';
import logoImg from '../assets/logo/logo.png';

export const GisLogo = ({ className = "h-11 sm:h-13 lg:h-15", alt = "GIS GROUP" }) => {
  return (
    <img
      src={logoImg}
      alt={alt}
      className={`w-auto object-contain select-none transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.85)] drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] ${className}`}
      style={{
        imageRendering: 'crisp-edges'
      }}
    />
  );
};
