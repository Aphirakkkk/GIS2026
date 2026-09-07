import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { initialProductsServicesData } from '../data/productsServicesData';
import { ChevronLeft, ChevronRight, CheckCircle2, X, ExternalLink, HardHat, FileText, ArrowRight } from 'lucide-react';

export const ProductsServicesSection = () => {
  const { lang } = useLanguage();
  const isTh = lang === 'th';

  // State
  const [data, setData] = useState(initialProductsServicesData);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'services'
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isOverviewModalOpen, setIsOverviewModalOpen] = useState(false);

  // Sync data with admin updates in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('GIS_ADMIN_DATA_V1');
      if (saved) {
        const parsed = JSON.parse(saved);
        const dynamicData = parsed.content?.[lang]?.productsServicesData || parsed.productsServicesData || parsed.content?.th?.productsServicesData;
        if (dynamicData) {
          setData(prev => ({ ...prev, ...dynamicData }));
        }
      }
    } catch (e) {
      console.warn('Could not read productsServicesData from localStorage:', e);
    }
  }, [lang]);

  const overview = data.overview || initialProductsServicesData.overview;
  const products = data.products || initialProductsServicesData.products;
  const services = data.services || initialProductsServicesData.services;

  return (
    <section id="products-services" className="relative w-full overflow-hidden scroll-mt-20">

      {/* ============================================================= */}
      {/* 1. OVERVIEW FEATURE BANNER (SCREENSHOT 3)                      */}
      {/* ============================================================= */}
      <div className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#E2E8F0] overflow-hidden border-b border-slate-300">
        {/* Background ductwork watermark */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url(${overview.bgImage || '/images/business-bg.jpg'})` }}
        />

        <div className="relative z-10 max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT: Two Engineers in Orange Vests & Hard Hats */}
            <div className="lg:col-span-6 xl:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 group">
                <img
                  src={overview.engineersImage || '/images/products-overview-engineers.jpg'}
                  alt="GIS Professional Engineers"
                  className="w-full h-[360px] sm:h-[460px] lg:h-[500px] object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating engineer badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-2.5 shadow-lg">
                  <HardHat className="w-5 h-5 text-[#EA580C]" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide">
                    {isTh ? 'ทีมวิศวกรผู้เชี่ยวชาญ GIS GROUP' : 'GIS Certified Engineering Specialists'}
                  </span>
                </div>
              </div>

              {/* Decorative Foreground Helmet & Blueprint */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 items-center gap-2 p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-[11px] font-black text-slate-800 uppercase">ISO 9001:2015</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Certified Quality Standard</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Tilted Orange Card (PRODUCT & SERVICE) */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#EA580C] text-white shadow-2xl border-4 border-white/30">
                
                {/* Header Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider font-display drop-shadow-md">
                    {isTh ? (overview.titleTh || overview.title) : overview.title}
                  </h3>

                  {/* Subtitles */}
                  <div className="space-y-1 mt-3">
                    {(isTh ? (overview.subtitlesTh || overview.subtitles) : overview.subtitles)?.map((sub, idx) => (
                      <h4 key={idx} className="text-sm sm:text-base lg:text-lg font-extrabold text-amber-100 drop-shadow-sm">
                        {sub}
                      </h4>
                    ))}
                  </div>
                </div>

                {/* 8 Bullet Items with > Arrow */}
                <div className="space-y-2 pt-5 mt-5 border-t border-white/25">
                  {(isTh ? (overview.bulletsTh || overview.bullets) : overview.bullets)?.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 leading-relaxed font-medium">
                      <span className="text-amber-200 font-black text-sm shrink-0 mt-0.5">&gt;</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Read More Button */}
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => setIsOverviewModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-[#475569] hover:bg-[#334155] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-105 cursor-pointer focus:outline-none"
                  >
                    <span>{isTh ? (overview.btnTextTh || 'Read More') : (overview.btnText || 'Read More')}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 2. INTERACTIVE PRODUCTS & SERVICES CATALOG (SCREENSHOTS 1 & 2) */}
      {/* ============================================================= */}
      <div className="relative py-14 sm:py-18 lg:py-22 bg-[#F8FAFC] overflow-hidden">
        {/* Background industrial ductwork ceiling */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url(${overview.bgImage || '/images/business-bg.jpg'})` }}
        />
        {/* White translucent overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/90 pointer-events-none" />

        <div className="relative z-10 max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* Top Header: Vertical & Horizontal Dashed Lines */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="w-[2px] h-8 sm:h-10 border-l-2 border-dashed border-[#EA580C] mx-auto mb-2" />
            <div className="w-28 sm:w-36 h-[2px] border-t-2 border-dashed border-[#EA580C] mx-auto mb-5" />

            {/* 2 Slanted Pills: Products vs Services */}
            <div className="inline-flex items-center gap-3 sm:gap-4">
              {/* Tab 1: Products */}
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`group relative px-8 sm:px-10 py-3 sm:py-3.5 rounded-2xl font-black italic text-lg sm:text-xl lg:text-2xl tracking-wider transition-all transform hover:scale-105 select-none shadow-xl cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#EA580C] text-white border-2 border-amber-300 ring-4 ring-[#EA580C]/30'
                    : 'bg-[#5C6470] text-white/90 hover:bg-[#6C7685] border-2 border-slate-500/60'
                }`}
                style={{ transform: 'skewX(-12deg)' }}
              >
                <span className="inline-block" style={{ transform: 'skewX(12deg)' }}>
                  Products
                </span>
              </button>

              {/* Tab 2: Services */}
              <button
                type="button"
                onClick={() => setActiveTab('services')}
                className={`group relative px-8 sm:px-10 py-3 sm:py-3.5 rounded-2xl font-black italic text-lg sm:text-xl lg:text-2xl tracking-wider transition-all transform hover:scale-105 select-none shadow-xl cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#EA580C] text-white border-2 border-amber-300 ring-4 ring-[#EA580C]/30'
                    : 'bg-[#5C6470] text-white/90 hover:bg-[#6C7685] border-2 border-slate-500/60'
                }`}
                style={{ transform: 'skewX(-12deg)' }}
              >
                <span className="inline-block" style={{ transform: 'skewX(12deg)' }}>
                  Services
                </span>
              </button>
            </div>
          </div>

          {/* TAB 1 CONTENT: PRODUCTS (SCREENSHOT 1) */}
          {activeTab === 'products' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* Carousel Banner: 2 Image Cards with Orange Borders */}
              <div className="relative max-w-6xl mx-auto">
                {/* Arrow Left */}
                <button
                  type="button"
                  onClick={() => setCarouselIndex(prev => (prev === 0 ? 1 : 0))}
                  className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-400/90 hover:bg-[#EA580C] text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* 2 Image Cards Side-by-Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  
                  {/* Card 1: Chiller Plant & Industrial Piping */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-[3px] border-[#EA580C] bg-white shadow-2xl group">
                    <div className="aspect-[16/11] overflow-hidden bg-slate-900 relative">
                      <img
                        src={products.leftImage || '/images/products-chiller-piping.jpg'}
                        alt={products.leftTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Inset Thumbnails in bottom-left corner matching screenshot 1 */}
                      <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-2 p-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/30 shadow-lg">
                        <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/50">
                          <img src={products.leftImage} alt="Valve closeup" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/50">
                          <img src={products.rightImage} alt="Station closeup" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {isTh ? (products.leftTitleTh || products.leftTitle) : products.leftTitle}
                      </span>
                      <span className="text-[10px] sm:text-xs bg-orange-100 text-[#EA580C] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Chiller & Piping
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Fire Sprinkler & Piping Station */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-[3px] border-[#EA580C] bg-white shadow-2xl group">
                    <div className="aspect-[16/11] overflow-hidden bg-slate-900 relative">
                      <img
                        src={products.rightImage || '/images/products-fire-sprinkler.jpg'}
                        alt={products.rightTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Inset Hexagon / Thumbnails matching screenshot 1 */}
                      <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-2 p-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/30 shadow-lg">
                        <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/50">
                          <img src={products.rightImage} alt="Alarm station" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/50">
                          <img src={products.leftImage} alt="Pressure gauges" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {isTh ? (products.rightTitleTh || products.rightTitle) : products.rightTitle}
                      </span>
                      <span className="text-[10px] sm:text-xs bg-red-100 text-red-700 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Fire Protection
                      </span>
                    </div>
                  </div>

                </div>

                {/* Arrow Right */}
                <button
                  type="button"
                  onClick={() => setCarouselIndex(prev => (prev === 0 ? 1 : 0))}
                  className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-400/90 hover:bg-[#EA580C] text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* PRODUCTS & PARTNER BRANDS MATRIX (MATCHING SCREENSHOT 1) */}
              <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl max-w-6xl mx-auto">
                {/* 1st Row of Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 text-xs pb-6 border-b border-slate-200">
                  {products.categories.slice(0, 13).map((cat) => (
                    <div key={cat.id} className="space-y-1">
                      <h5 className="font-black text-[#EA580C] text-[11px] sm:text-xs leading-tight">
                        {cat.name}
                      </h5>
                      <div className="space-y-0.5 text-[10px] sm:text-[11px] text-slate-600 font-medium leading-relaxed">
                        {cat.brands.split(',').map((brand, bIdx) => (
                          <div key={bIdx} className="truncate">
                            - {brand.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2nd Row of Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-xs pt-6">
                  {products.categories.slice(13).map((cat) => (
                    <div key={cat.id} className="space-y-1">
                      <h5 className="font-black text-[#EA580C] text-[11px] sm:text-xs leading-tight">
                        {cat.name}
                      </h5>
                      <div className="space-y-0.5 text-[10px] sm:text-[11px] text-slate-600 font-medium leading-relaxed">
                        {cat.brands.split(',').map((brand, bIdx) => (
                          <div key={bIdx} className="truncate">
                            - {brand.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 CONTENT: SERVICES (SCREENSHOT 2) */}
          {activeTab === 'services' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* Carousel Banner: 2 Image Cards with Orange Borders */}
              <div className="relative max-w-6xl mx-auto">
                {/* Arrow Left */}
                <button
                  type="button"
                  onClick={() => setCarouselIndex(prev => (prev === 0 ? 1 : 0))}
                  className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-400/90 hover:bg-[#EA580C] text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* 2 Image Cards Side-by-Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  
                  {/* Card 1: GIS Engineers Operating Chiller Panel */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-[3px] border-[#EA580C] bg-white shadow-2xl group">
                    <div className="aspect-[16/11] overflow-hidden bg-slate-900 relative">
                      <img
                        src={services.leftImage || '/images/services-chiller-operation.jpg'}
                        alt={services.leftTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {isTh ? (services.leftTitleTh || services.leftTitle) : services.leftTitle}
                      </span>
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        GIS Operation
                      </span>
                    </div>
                  </div>

                  {/* Card 2: PPE Cleanroom Technicians */}
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-[3px] border-[#EA580C] bg-white shadow-2xl group">
                    <div className="aspect-[16/11] overflow-hidden bg-slate-900 relative">
                      <img
                        src={services.rightImage || '/images/services-cleanroom-ac.jpg'}
                        alt={services.rightTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {isTh ? (services.rightTitleTh || services.rightTitle) : services.rightTitle}
                      </span>
                      <span className="text-[10px] sm:text-xs bg-emerald-100 text-emerald-700 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Cleanroom & IAQ
                      </span>
                    </div>
                  </div>

                </div>

                {/* Arrow Right */}
                <button
                  type="button"
                  onClick={() => setCarouselIndex(prev => (prev === 0 ? 1 : 0))}
                  className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-400/90 hover:bg-[#EA580C] text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* SERVICES BULLET ITEMS (MATCHING SCREENSHOT 2) */}
              <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto space-y-4">
                <div className="space-y-3">
                  {(isTh ? (services.itemsTh || services.items) : services.items)?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-semibold">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#EA580C] shrink-0 shadow-sm" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ============================================================= */}
      {/* 3. OVERVIEW DETAIL MODAL (READ MORE)                           */}
      {/* ============================================================= */}
      {isOverviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0F1117] border border-[#EA580C]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white flex items-start justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">
                  GIS GROUP SOLUTIONS
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  {isTh ? 'ผลิตภัณฑ์และการบริการวิศวกรรมครบวงจร' : 'Products & Comprehensive Engineering Services'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOverviewModalOpen(false)}
                className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto text-gray-200 text-sm leading-relaxed">
              <div className="p-4 rounded-xl bg-[#EA580C]/10 border-l-4 border-[#EA580C]">
                <h4 className="font-bold text-white text-base mb-1">
                  {isTh ? 'ขอบเขตงานบริการวิศวกรรมเฉพาะทาง' : 'Scope of Specialized Engineering Solutions'}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300">
                  {isTh 
                    ? 'บริษัทฯ ให้บริการด้านวิศวกรรมระบบประกอบอาคารและอุตสาหกรรมอย่างเต็มรูปแบบ ครอบคลุมตั้งแต่การออกแบบ จัดหา ติดตั้ง และบำรุงรักษาเชิงป้องกันตลอดอายุการใช้งาน'
                    : 'We provide full-lifecycle turnkey MEP and industrial engineering solutions, from initial engineering design, equipment procurement, testing & commissioning, to 24/7 preventive maintenance.'}
                </p>
              </div>

              {/* Service list */}
              <div className="space-y-2.5">
                {(isTh ? (overview.bulletsTh || overview.bullets) : overview.bullets)?.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 size={18} className="text-[#EA580C] flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#141720] border-t border-white/10 flex items-center justify-between">
              <a
                href="#contact"
                onClick={() => setIsOverviewModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                {isTh ? 'ติดต่อสอบถามข้อมูลโครงการ' : 'Contact for Project Inquiry'}
              </a>
              <button
                type="button"
                onClick={() => setIsOverviewModalOpen(false)}
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

export default ProductsServicesSection;
