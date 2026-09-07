  import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import heroBg from '../assets/images/dd.png';


export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen h-screen w-full flex items-center justify-start pt-20 pb-10 overflow-hidden">
      {/* Background: Exact High-Res Engineering Site Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="GIS Engineering Specialists & Construction Site"
          className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
        />
        {/* Dark Vignette Overlay on Left Side for Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-transparent to-black/50"></div>
      </div>

      {/* Hero Content Container - Matching Design Exactly */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-16 pt-6">
        <div className="max-w-3xl text-left select-none">
          {/* Main Headline - 4 Lines Italic Heavy Bold */}
          <div className="mb-8">
            <h1 className="font-sans font-black italic text-white uppercase leading-[0.88] tracking-tighter drop-shadow-[0_8px_25px_rgba(0,0,0,0.95)]">
              {/* Line 1: LOCAL */}
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[90px] 2xl:text-[108px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                LOCAL
              </span>
              {/* Line 2: EXPERTIST'S */}
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[90px] 2xl:text-[108px] mt-1 sm:mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                EXPERTIST'S
              </span>
              {/* Line 3: INTERNATIONAL */}
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[76px] 2xl:text-[92px] mt-1 sm:mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                INTERNATIONAL
              </span>
              {/* Line 4: STANDARD */}
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[76px] 2xl:text-[92px] mt-1 sm:mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                STANDARD
              </span>
            </h1>
          </div>

          {/* Action Buttons directly below headline */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-6">
            {/* ABOUT GIS GROUP Button */}
            <a
              href="#about"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl text-xs sm:text-sm font-black tracking-wider text-white uppercase bg-[#FF5500] hover:bg-[#E04500] transition-all duration-200 shadow-[0_4px_25px_rgba(255,85,0,0.6)] hover:shadow-[0_6px_35px_rgba(255,85,0,0.85)] hover:-translate-y-0.5 active:translate-y-0"
            >
              ABOUT GIS GROUP
            </a>

            {/* CONTACT Button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl text-xs sm:text-sm font-black tracking-wider text-white uppercase bg-black/90 hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/50 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
