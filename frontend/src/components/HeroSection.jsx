import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import heroBg from '../assets/images/dd.png';

export const HeroSection = () => {
  const { t } = useLanguage();
  const hero = t.hero || {};

  return (
    <section id="home" className="relative min-h-screen h-screen w-full flex items-center justify-start pt-20 pb-10 overflow-hidden">
      {/* Background: Exact High-Res Engineering Site Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.bgImage || heroBg}
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
          {/* Tagline */}
          {hero.tagline && (
            <div className="mb-3">
              <span
                className="inline-block text-xs sm:text-sm font-mono uppercase tracking-widest text-[#FF5500] font-black"
                dangerouslySetInnerHTML={{ __html: hero.tagline }}
              />
            </div>
          )}

          {/* Main Headline */}
          <div className="mb-6">
            <h1 className="font-sans font-black italic text-white uppercase leading-[0.88] tracking-tighter drop-shadow-[0_8px_25px_rgba(0,0,0,0.95)]">
              {/* Title Main */}
              <span
                className="block text-4xl sm:text-6xl md:text-7xl lg:text-[86px] 2xl:text-[104px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
                dangerouslySetInnerHTML={{ __html: hero.titleMain || "LOCAL EXPERTIST'S" }}
              />
              {/* Title Sub (Orange) */}
              <span
                className="block text-4xl sm:text-6xl md:text-7xl lg:text-[76px] 2xl:text-[92px] mt-1 sm:mt-2 text-[#FF5500] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
                dangerouslySetInnerHTML={{ __html: hero.titleSub || "INTERNATIONAL STANDARD" }}
              />
            </h1>
          </div>

          {/* Hero Description */}
          {hero.description && (
            <div
              className="text-sm sm:text-base text-gray-200 font-light leading-relaxed mb-6 max-w-2xl drop-shadow"
              dangerouslySetInnerHTML={{ __html: hero.description }}
            />
          )}

          {/* Action Buttons directly below headline */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-6">
            {/* ABOUT GIS GROUP Button */}
            <a
              href="#about"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl text-xs sm:text-sm font-black tracking-wider text-white uppercase bg-[#FF5500] hover:bg-[#E04500] transition-all duration-200 shadow-[0_4px_25px_rgba(255,85,0,0.6)] hover:shadow-[0_6px_35px_rgba(255,85,0,0.85)] hover:-translate-y-0.5 active:translate-y-0"
              dangerouslySetInnerHTML={{ __html: hero.btnAbout || 'ABOUT GIS GROUP' }}
            />

            {/* CONTACT Button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:px-9 sm:py-4 rounded-xl text-xs sm:text-sm font-black tracking-wider text-white uppercase bg-black/90 hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/50 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0"
              dangerouslySetInnerHTML={{ __html: hero.btnContact || 'CONTACT' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
