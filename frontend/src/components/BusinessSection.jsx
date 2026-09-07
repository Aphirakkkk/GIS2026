import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { initialBusinessData } from '../data/businessDivisionsData';
import { Play, X, ExternalLink, CheckCircle2, Share2, Clock } from 'lucide-react';

// -------------------------------------------------------------
// High-Precision SVG Icons matching reference screenshots 1:1
// -------------------------------------------------------------

// 1. EPC DIVISION: Safety Helmet (Hard Hat)
const EpcHelmetIcon = ({ className = "w-7 h-7 sm:w-8 sm:h-8" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Hard Hat Dome */}
    <path 
      d="M12 25C12 17.8 17.4 12 24 12C30.6 12 36 17.8 36 25" 
      stroke="currentColor" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    {/* Top Reinforcing Ridges */}
    <path d="M24 12V23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M19 14.5V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M29 14.5V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Helmet Brim */}
    <path 
      d="M8 28.5C8 27 9.5 26 11 26H37C38.5 26 40 27 40 28.5C40 29.5 39 30.5 37.5 30.5H10.5C9 30.5 8 29.5 8 28.5Z" 
      fill="currentColor" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round" 
    />
    {/* Base Line / Strap */}
    <path d="M17 33.5H31" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 2. IBT DIVISION: Intelligent Building + Monitor + Smartphone
const IbtBuildingDevicesIcon = ({ className = "w-7 h-7 sm:w-8 sm:h-8" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Center Intelligent Building */}
    <rect x="18" y="11" width="12" height="24" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
    <line x1="22" y1="16" x2="22" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="16" x2="26" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="21" x2="22" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="21" x2="26" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="26" x2="22" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="26" x2="26" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Left Monitor */}
    <rect x="8" y="21" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12.5 29V33M10 33H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    {/* Right Smartphone */}
    <rect x="31" y="19" width="8" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="35" cy="31" r="0.75" fill="currentColor" />
  </svg>
);

// 3. ENR DIVISION: Speedometer / Energy Gauge with kWh
const EnrEnergyGaugeIcon = ({ className = "w-7 h-7 sm:w-8 sm:h-8" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Speedometer / Gauge Arc */}
    <path 
      d="M13 28A13 13 0 1 1 35 28" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeDasharray="2.5 3" 
      strokeLinecap="round" 
    />
    {/* Needle pointing up-right */}
    <line x1="24" y1="25" x2="31" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Center Pivot */}
    <circle cx="24" cy="25" r="2.5" fill="currentColor" />
    {/* kWh text */}
    <text 
      x="24" 
      y="35" 
      textAnchor="middle" 
      fill="currentColor" 
      stroke="none" 
      fontSize="7.5" 
      fontWeight="900" 
      fontFamily="system-ui, -apple-system, sans-serif"
      letterSpacing="0.2px"
    >
      kWh
    </text>
  </svg>
);

export const BusinessSection = () => {
  const { lang } = useLanguage();
  const isTh = lang === 'th';

  // Load merged data from localStorage or initialBusinessData
  const [businessData, setBusinessData] = useState(initialBusinessData);
  const [activeDivision, setActiveDivision] = useState('epc');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync data with admin updates in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('GIS_ADMIN_DATA_V1');
      if (saved) {
        const parsed = JSON.parse(saved);
        const dynamicData = parsed.content?.[lang]?.businessData || parsed.businessData || parsed.content?.th?.businessData;
        if (dynamicData) {
          setBusinessData(prev => ({ ...prev, ...dynamicData }));
        }
      }
    } catch (e) {
      console.warn('Could not read businessData from localStorage:', e);
    }
  }, [lang]);

  const currentDiv = businessData.divisions?.[activeDivision] || initialBusinessData.divisions.epc;

  // Extract YouTube ID if URL provided
  const videoUrl = businessData.video?.url || initialBusinessData.video.url;
  const videoId = videoUrl.includes('v=') 
    ? videoUrl.split('v=')[1].split('&')[0] 
    : videoUrl.split('/').pop();

  return (
    <section id="business" className="relative w-full overflow-hidden scroll-mt-20">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER WITH CEILING DUCTWORK BACKGROUND & DASHED LINES */}
      {/* ------------------------------------------------------------- */}
      <div className="relative py-14 sm:py-18 lg:py-20 bg-[#F4F6F9] overflow-hidden border-b border-orange-200/50">
        {/* Background Image of Industrial Ductwork */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-multiply"
          style={{ backgroundImage: `url(${businessData.bgImage || '/images/business-bg.jpg'})` }}
        />
        {/* White translucent overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />

        {/* Header Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Vertical dashed line from top */}
          <div className="w-[2px] h-8 sm:h-10 border-l-2 border-dashed border-[#EA580C] mx-auto mb-2" />

          {/* Horizontal dashed line */}
          <div className="w-28 sm:w-36 h-[2px] border-t-2 border-dashed border-[#EA580C] mx-auto mb-3" />

          {/* OUR BUSINESS Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#EA580C] uppercase tracking-wider font-display drop-shadow-sm">
            {isTh ? (businessData.sectionHeaderTh || businessData.sectionHeader || 'OUR BUSINESS') : (businessData.sectionHeader || 'OUR BUSINESS')}
          </h2>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN ORANGE BUSINESS SECTION MATCHING SCREENSHOTS          */}
      {/* ------------------------------------------------------------- */}
      <div className="relative bg-gradient-to-r from-[#E65100] via-[#EA580C] to-[#F97316] py-14 sm:py-18 lg:py-22 text-white overflow-hidden shadow-2xl">
        {/* Faint industrial background texture overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url(${businessData.bgImage || '/images/business-bg.jpg'})` }}
        />

        {/* Ambient subtle glow circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-black/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

            {/* LEFT COLUMN: Headlines, 3 Tilted Cards, Quote, Description, Read More */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-7">
              {/* Headlines */}
              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {isTh ? (businessData.headlineTh || businessData.headline) : businessData.headline}
                </h3>
                <p className="text-xl sm:text-2xl lg:text-3xl italic font-semibold text-[#FEF3C7] tracking-wide mt-1.5 drop-shadow">
                  {isTh ? (businessData.subheadlineTh || businessData.subheadline) : businessData.subheadline}
                </p>
              </div>

              {/* 3 DIVISION CARDS (EPC, IBT, ENR) - CLEAN ROUNDED RECTANGLES MATCHING REFERENCE */}
              <div 
                className="flex items-center gap-3 sm:gap-4 md:gap-5 py-3 px-1 overflow-x-auto sm:overflow-visible select-none no-scrollbar"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {/* 1. EPC DIVISION CARD */}
                <button
                  type="button"
                  onClick={() => setActiveDivision('epc')}
                  className={`relative w-32 sm:w-38 md:w-42 h-28 sm:h-32 md:h-34 rounded-2xl transition-all duration-300 cursor-pointer group text-center focus:outline-none flex-shrink-0 ${
                    activeDivision === 'epc'
                      ? 'border-2 border-white bg-white/20 shadow-2xl shadow-orange-950/40 -translate-y-1 z-10'
                      : 'border border-white/35 bg-white/10 hover:border-white/70 hover:bg-white/15 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full px-2">
                    {/* Circle icon frame */}
                    <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full border flex items-center justify-center mb-2 transition-all duration-300 ${
                      activeDivision === 'epc'
                        ? 'border-white bg-white/25 text-white shadow-sm'
                        : 'border-white/60 bg-white/5 text-white/90 group-hover:border-white group-hover:text-white'
                    }`}>
                      <EpcHelmetIcon />
                    </div>
                    {/* Title label */}
                    <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase text-white block whitespace-nowrap drop-shadow-sm">
                      EPC DIVISION
                    </span>
                  </div>
                </button>

                {/* 2. IBT DIVISION CARD */}
                <button
                  type="button"
                  onClick={() => setActiveDivision('ibt')}
                  className={`relative w-32 sm:w-38 md:w-42 h-28 sm:h-32 md:h-34 rounded-2xl transition-all duration-300 cursor-pointer group text-center focus:outline-none flex-shrink-0 ${
                    activeDivision === 'ibt'
                      ? 'border-2 border-white bg-white/20 shadow-2xl shadow-orange-950/40 -translate-y-1 z-10'
                      : 'border border-white/35 bg-white/10 hover:border-white/70 hover:bg-white/15 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full px-2">
                    {/* Circle icon frame */}
                    <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full border flex items-center justify-center mb-2 transition-all duration-300 ${
                      activeDivision === 'ibt'
                        ? 'border-white bg-white/25 text-white shadow-sm'
                        : 'border-white/60 bg-white/5 text-white/90 group-hover:border-white group-hover:text-white'
                    }`}>
                      <IbtBuildingDevicesIcon />
                    </div>
                    {/* Title label */}
                    <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase text-white block whitespace-nowrap drop-shadow-sm">
                      IBT DIVISION
                    </span>
                  </div>
                </button>

                {/* 3. ENR DIVISION CARD */}
                <button
                  type="button"
                  onClick={() => setActiveDivision('enr')}
                  className={`relative w-32 sm:w-38 md:w-42 h-28 sm:h-32 md:h-34 rounded-2xl transition-all duration-300 cursor-pointer group text-center focus:outline-none flex-shrink-0 ${
                    activeDivision === 'enr'
                      ? 'border-2 border-white bg-white/20 shadow-2xl shadow-orange-950/40 -translate-y-1 z-10'
                      : 'border border-white/35 bg-white/10 hover:border-white/70 hover:bg-white/15 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full px-2">
                    {/* Circle icon frame */}
                    <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full border flex items-center justify-center mb-2 transition-all duration-300 ${
                      activeDivision === 'enr'
                        ? 'border-white bg-white/25 text-white shadow-sm'
                        : 'border-white/60 bg-white/5 text-white/90 group-hover:border-white group-hover:text-white'
                    }`}>
                      <EnrEnergyGaugeIcon />
                    </div>
                    {/* Title label */}
                    <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase text-white block whitespace-nowrap drop-shadow-sm">
                      ENR DIVISION
                    </span>
                  </div>
                </button>
              </div>

              {/* WHITE SPEECH BUBBLE / PILL WITH QUOTE */}
              <div className="pt-2">
                <div className="inline-flex items-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-[#1E293B] shadow-xl border border-white/90 transition-all duration-300">
                  <p className="text-xs sm:text-sm lg:text-[15px] font-bold tracking-normal leading-snug">
                    “ {isTh ? (currentDiv.quoteTh || currentDiv.quote) : (currentDiv.quoteEn || currentDiv.quote)} ”
                  </p>
                </div>
              </div>

              {/* DIVISION TITLE & DETAILED DESCRIPTION */}
              <div className="space-y-3 pt-2">
                <h4 className="text-2xl sm:text-3xl font-black text-[#FDE047] uppercase tracking-wide drop-shadow-sm font-display">
                  {currentDiv.name}
                </h4>
                <p className="text-white/95 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-2xl font-normal drop-shadow-sm">
                  {isTh ? (currentDiv.shortDescTh || currentDiv.shortDesc) : (currentDiv.shortDescEn || currentDiv.shortDesc)}
                </p>
                
                {/* Read More Link */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-white hover:text-amber-200 text-xs sm:text-sm font-bold underline underline-offset-4 cursor-pointer transition-colors group focus:outline-none"
                  >
                    <span>{isTh ? (currentDiv.btnTextTh || 'Read More') : (currentDiv.btnTextEn || 'Read More')}</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&gt;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: REAL YOUTUBE VIDEO PLAYER */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-black group transition-all duration-300 hover:border-white/40">
                {isPlayingVideo ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={businessData.video?.title || "Fujitsu Trust Award - GIS Group Co ,Ltd"}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div 
                    onClick={() => setIsPlayingVideo(true)}
                    className="relative w-full h-full cursor-pointer select-none"
                  >
                    {/* YouTube Video Thumbnail */}
                    <img
                      src={businessData.video?.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={businessData.video?.title || "Fujitsu Trust Award"}
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient shadows for top and bottom bar readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/70 pointer-events-none" />

                    {/* Top Bar: Channel Avatar, Title, Share/Clock buttons */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-start justify-between gap-3 text-white pointer-events-none">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 border border-white/40 backdrop-blur-md flex items-center justify-center overflow-hidden flex-shrink-0">
                          <span className="text-[10px] font-black text-white">GIS</span>
                        </div>
                        <div className="text-left">
                          <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-1 drop-shadow-md">
                            {businessData.video?.title || "Fujitsu Trust Award - GIS Group Co ,Ltd"}
                          </h5>
                          <p className="text-[10px] sm:text-[11px] text-gray-300 line-clamp-1">
                            {businessData.video?.channel || "GENERAL Air Conditioning Manufacturing Thailand"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-white/90">
                        <span className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors" title="Share">
                          <Share2 size={16} />
                        </span>
                        <span className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors" title="Watch Later">
                          <Clock size={16} />
                        </span>
                      </div>
                    </div>

                    {/* Center: Iconic YouTube Red Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 sm:w-20 h-11 sm:h-14 bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300 group-hover:bg-[#E60000]">
                        <Play size={26} fill="white" className="text-white translate-x-0.5" />
                      </div>
                    </div>

                    {/* Bottom Right: "ดูใน YouTube" Link */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 hover:bg-black/90 text-white text-[10px] sm:text-xs font-semibold backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                      >
                        <span>{isTh ? 'ดูใน YouTube' : 'Watch on YouTube'}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CAPABILITIES & DIVISION DETAILS MODAL (READ MORE)         */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0F1117] border border-gis-orange/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="relative p-6 bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white flex items-start justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">
                  {currentDiv.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  {isTh ? (currentDiv.fullNameTh || currentDiv.fullName) : currentDiv.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto text-gray-200 text-sm leading-relaxed">
              {/* Quote highlight */}
              <div className="p-4 rounded-xl bg-gis-orange/10 border-l-4 border-gis-orange">
                <p className="text-sm sm:text-base font-semibold text-white italic">
                  “ {isTh ? (currentDiv.quoteTh || currentDiv.quote) : (currentDiv.quoteEn || currentDiv.quote)} ”
                </p>
                {currentDiv.slogan && (
                  <p className="text-xs text-orange-300 mt-1 font-medium">{currentDiv.slogan}</p>
                )}
              </div>

              {/* Full Description */}
              <p className="text-gray-300 leading-relaxed">
                {isTh ? (currentDiv.shortDescTh || currentDiv.shortDesc) : (currentDiv.shortDescEn || currentDiv.shortDesc)}
              </p>

              {/* Capabilities List */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gis-orange mb-3">
                  {isTh ? 'ขอบเขตความเชี่ยวชาญและบริการหลัก' : 'Key Capabilities & Specialist Solutions'}
                </h4>
                <div className="space-y-2.5">
                  {(isTh ? (currentDiv.capabilitiesTh || currentDiv.capabilities) : currentDiv.capabilities)?.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 size={18} className="text-gis-orange flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Image */}
              {currentDiv.image && (
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={currentDiv.image}
                    alt={currentDiv.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#141720] border-t border-white/10 flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-gis-orange hover:bg-gis-orange-dark text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                {isTh ? 'ติดต่อสอบถามข้อมูลโครงการ' : 'Contact for Project Inquiry'}
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                {isTh ? 'ปิดหน้าต่าง' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default BusinessSection;
