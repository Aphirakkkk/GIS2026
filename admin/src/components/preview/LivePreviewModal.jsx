import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { X, Smartphone, Monitor, Tablet, ExternalLink, ShieldCheck, Lightbulb, Users, CheckCircle2 } from 'lucide-react';

export const LivePreviewModal = () => {
  const { isPreviewOpen, setIsPreviewOpen, currentContent, lang, setLang } = useAdmin();
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop, tablet, mobile

  if (!isPreviewOpen) return null;

  const { hero, values, about, services, projects, news, siteInfo } = currentContent;

  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'max-w-2xl mx-auto ring-8 ring-slate-800 rounded-3xl overflow-hidden my-4',
    mobile: 'max-w-sm mx-auto ring-8 ring-slate-800 rounded-3xl overflow-hidden my-4'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col">
      {/* Top control bar */}
      <div className="h-14 bg-[#0C1322] border-b border-slate-800 px-6 flex items-center justify-between text-white select-none">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            ตัวอย่างหน้าเว็บจริง (Live Website Simulation)
          </span>
          <span className="text-xs bg-blue-900/80 text-blue-200 px-2 py-0.5 rounded font-mono">
            {lang.toUpperCase()}
          </span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${deviceMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${deviceMode === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-lg text-xs transition-colors ${deviceMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsPreviewOpen(false)}
          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 text-xs"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">ปิดหน้าต่าง</span>
        </button>
      </div>

      {/* Preview Content Area */}
      <div className="flex-1 overflow-y-auto bg-slate-900 p-2 sm:p-4">
        <div className={`${deviceWidths[deviceMode]} bg-[#0B0D11] text-slate-100 min-h-screen transition-all shadow-2xl`}>
          
          {/* Simulated Header */}
          <header className="h-20 bg-[#0B0D11]/90 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-white">GIS</span>
              <span className="text-xl font-black tracking-wider text-gis-orange">GROUP</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <span className="text-gis-orange cursor-pointer">HOME</span>
              <span className="hover:text-white cursor-pointer">ABOUT GIS GROUP</span>
              <span className="hover:text-white cursor-pointer">OUR BUSINESS</span>
              <span className="hover:text-white cursor-pointer">PROJECTS</span>
              <span className="hover:text-white cursor-pointer">NEWS</span>
              <span className="hover:text-white cursor-pointer">CONTACT</span>
            </nav>
            <div className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
              {lang.toUpperCase()}
            </div>
          </header>

          {/* Simulated Hero Section */}
          <section className="relative min-h-[600px] flex items-center justify-center p-6 md:p-12 overflow-hidden">
            {/* Background Image */}
            {hero?.bgImage && (
              <div className="absolute inset-0 z-0">
                <img src={hero.bgImage} alt="Hero background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D11] via-[#0B0D11]/85 to-transparent"></div>
              </div>
            )}

            <div className="relative z-10 max-w-4xl w-full space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gis-orange/20 border border-gis-orange/40 text-gis-orange text-xs font-bold tracking-widest uppercase">
                {hero?.tagline}
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                  {hero?.titleMain}
                </h1>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gis-orange tracking-tight">
                  {hero?.titleSub}
                </h1>
              </div>

              <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
                {hero?.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button className="px-6 py-3 bg-gis-orange text-white font-bold text-xs tracking-wider rounded uppercase shadow-lg shadow-orange-500/20">
                  {hero?.btnAbout || "ABOUT GIS GROUP"}
                </button>
                <button className="px-6 py-3 bg-transparent border-2 border-white/80 hover:bg-white hover:text-slate-900 text-white font-bold text-xs tracking-wider rounded uppercase transition-colors">
                  {hero?.btnContact || "CONTACT"}
                </button>
              </div>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
                {hero?.stats?.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Simulated Values (G-I-S) */}
          <section className="p-8 md:p-16 bg-[#0E1117] border-t border-slate-800 space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-bold text-gis-orange tracking-widest uppercase">
                {values?.titleTop} {values?.titleBottom}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {values?.subtitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values?.cards?.map((c) => (
                <div key={c.id} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gis-orange text-white text-xl font-black flex items-center justify-center">
                    {c.letter}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {c.title1} {c.title2}
                  </h3>
                  <div className="text-xs text-gis-orange font-semibold">{c.desc}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Simulated About Section */}
          <section className="p-8 md:p-16 border-t border-slate-800 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-gis-orange tracking-widest">{about?.tag}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{about?.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{about?.desc1}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{about?.desc2}</p>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {about?.certs?.map((cert, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="font-bold text-emerald-400">{cert.name}</div>
                      <div className="text-[11px] text-slate-400">{cert.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {about?.image && (
                <div className="rounded-2xl overflow-hidden border border-slate-800">
                  <img src={about.image} alt="About" className="w-full h-80 object-cover" />
                </div>
              )}
            </div>
          </section>

          {/* Simulated Footer */}
          <footer className="p-8 bg-black border-t border-slate-900 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {siteInfo?.companyFullName || "GIS GROUP"}. All Rights Reserved.</p>
          </footer>

        </div>
      </div>
    </div>
  );
};
