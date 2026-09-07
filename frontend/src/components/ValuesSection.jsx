import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import valuesEngineeringSite from '../assets/images/values-engineering-site.jpg';
import iconG from '../assets/icons/G.png';
import iconI from '../assets/icons/i.png';
import iconS from '../assets/icons/s.png';

export const ValuesSection = () => {
  const { lang } = useLanguage();

  return (
    <section id="values" className="relative w-full py-16 lg:py-28 overflow-hidden select-none">
      {/* Background Split: 
          Top 64%: Left Rich Orange + Right Construction Engineering Photo
          Bottom 36%: Dark Industrial Floor Bar (#1A1C23)
      */}
      <div className="absolute inset-0 z-0 flex flex-col pointer-events-none">
        {/* Top 64% Row */}
        <div className="w-full h-[64%] flex flex-col lg:flex-row">
          {/* Top Left: Solid Rich Vibrant Orange */}
          <div className="w-full lg:w-[48%] h-full bg-[#EA580C] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722] via-[#EA580C] to-[#D03800] opacity-95"></div>
          </div>
          {/* Top Right: Construction Engineering Site */}
          <div className="w-full lg:w-[52%] h-full relative">
            <img
              src={valuesEngineeringSite}
              alt="GIS MEP Engineering Site"
              className="w-full h-full object-cover object-[50%_30%] filter brightness-[0.95] contrast-[1.08]"
            />
            {/* Blending overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#EA580C]/40 via-transparent to-black/30"></div>
          </div>
        </div>

        {/* Bottom 36% Row: Dark Industrial Floor Bar (#1A1C23) */}
        <div className="w-full h-[36%] bg-[#1A1C23] border-t border-black/20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
        </div>
      </div>

      {/* Main Foreground Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Header */}
        <div className="relative mb-10 sm:mb-14">
          {/* Ghost Watermark "VALUES" */}
          <div className="absolute -top-7 sm:-top-9 left-16 sm:left-32 pointer-events-none select-none opacity-20 transform translate-x-2">
            <span className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-white font-display">
              VALUES
            </span>
          </div>

          <div className="relative z-10 inline-block">
            {/* "VALUES" Title */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-display drop-shadow-sm leading-tight">
              VALUES
            </h2>
            {/* "STATEMENT" Title */}
            <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0A0B0D] uppercase font-display leading-none mt-1">
              STATEMENT
            </h3>
            {/* Underline */}
            <div className="h-1.5 w-24 sm:w-32 bg-[#EA580C] lg:bg-[#0A0B0D] rounded-full mt-3"></div>
          </div>
        </div>

        {/* 3 Parallelogram Cards (G - I - S) with 100% Transparent Cutout Windows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 items-stretch pt-2">
          
          {/* CARD 1: G - GOOD GOVERNANCE (White Card with icon image) */}
          <div className="slant-parallelogram relative min-h-[460px] sm:min-h-[500px] lg:min-h-[480px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02] overflow-hidden flex flex-col">
            {/* Icon area */}
            <div className="unskew-content flex justify-center items-center pt-12 pb-4 flex-1">
              <img
                src={iconG}
                alt="Good Governance"
                className="w-36 h-36 sm:w-40 sm:h-40 object-contain drop-shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="unskew-content px-8 pb-10 text-center">
              <h4 className="text-2xl sm:text-3xl font-black text-[#EA580C] uppercase tracking-wider font-display leading-tight">
                GOOD
              </h4>
              <h4 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-wider font-display leading-tight mt-0.5">
                GOVERNANCE
              </h4>
              {/* Horizontal Accent Line */}
              <div className="h-[3px] w-full max-w-[190px] bg-[#EA580C] mx-auto my-3.5"></div>
              {/* Description */}
              <div className="space-y-1 text-slate-700 font-semibold text-sm sm:text-base leading-snug">
                <p>{lang === 'th' ? 'ดำเนินงานด้วย' : 'Operate with'}</p>
                <p>{lang === 'th' ? 'ยึดหลักธรรมาภิบาล' : 'Good Governance'}</p>
              </div>
            </div>
          </div>

          {/* CARD 2: I - INNOVATION (Black Card with icon image) */}
          <div className="slant-parallelogram relative min-h-[460px] sm:min-h-[500px] lg:min-h-[480px] bg-[#1A1A1A] shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-[1.02] overflow-hidden flex flex-col">
            {/* Icon area */}
            <div className="unskew-content flex justify-center items-center pt-12 pb-4 flex-1">
              <img
                src={iconI}
                alt="Innovation"
                className="w-36 h-36 sm:w-40 sm:h-40 object-contain drop-shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="unskew-content px-8 pb-10 text-center">
              <h4 className="text-2xl sm:text-3xl font-black text-[#EA580C] uppercase tracking-wider font-display leading-tight">
                INNOVATION
              </h4>
              {/* Horizontal Accent Line */}
              <div className="h-[3px] w-14 bg-[#EA580C] mx-auto my-3.5 shadow-[0_0_8px_#ea580c]"></div>
              {/* Description */}
              <div className="space-y-1 text-white font-semibold text-sm sm:text-base leading-snug">
                <p>{lang === 'th' ? 'สร้างสรรค์' : 'Creating'}</p>
                <p>{lang === 'th' ? 'นวัตกรรม' : 'Innovation'}</p>
              </div>
            </div>
          </div>

          {/* CARD 3: S - SYNERGY (Light Gray Card with icon image) */}
          <div className="slant-parallelogram relative min-h-[460px] sm:min-h-[500px] lg:min-h-[480px] bg-[#E8E8E8] shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02] overflow-hidden flex flex-col">
            {/* Icon area */}
            <div className="unskew-content flex justify-center items-center pt-12 pb-4 flex-1">
              <img
                src={iconS}
                alt="Synergy"
                className="w-36 h-36 sm:w-40 sm:h-40 object-contain drop-shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="unskew-content px-8 pb-10 text-center">
              <h4 className="text-2xl sm:text-3xl font-black text-[#EA580C] uppercase tracking-wider font-display leading-tight">
                SYNERGY
              </h4>
              {/* Horizontal Accent Line */}
              <div className="h-[3px] w-14 bg-[#EA580C] mx-auto my-3.5"></div>
              {/* Description */}
              <div className="space-y-1 text-slate-700 font-semibold text-sm sm:text-base leading-snug">
                <p>{lang === 'th' ? 'ร่วมกัน' : 'Uniting to Build'}</p>
                <p>{lang === 'th' ? 'สร้างพลังอันยิ่งใหญ่' : 'Great Synergy'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
