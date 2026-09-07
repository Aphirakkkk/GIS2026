import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { initialProductsServicesData } from '../data/productsServicesData';
import { ImageUploadField } from '../components/common/ImageUploadField';
import {
  Save,
  Eye,
  Plus,
  Trash2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Package,
  Wrench,
  Sparkles,
  Layout,
  ExternalLink,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const ProductsServicesView = () => {
  const { currentContent, updateSection, lang, setIsPreviewOpen, activeView } = useAdmin();

  // Load data with fallback to initialProductsServicesData
  const [formData, setFormData] = useState(() => {
    return currentContent?.productsServicesData || initialProductsServicesData;
  });

  // Active view in Live Preview: 'products' | 'services' | 'overview'
  const [previewTab, setPreviewTab] = useState('products');

  // Active editor tab: 'products' | 'services' | 'overview'
  const [editorTab, setEditorTab] = useState('products');

  // Sync when sidebar sub-menu is clicked
  useEffect(() => {
    if (activeView === 'products') {
      setPreviewTab('products');
      setEditorTab('products');
    } else if (activeView === 'services') {
      setPreviewTab('services');
      setEditorTab('services');
    }
  }, [activeView]);

  // Keep local state in sync when global lang changes
  useEffect(() => {
    if (currentContent?.productsServicesData) {
      setFormData(currentContent.productsServicesData);
    }
  }, [currentContent, lang]);

  // Save changes to AdminContext
  const handleSave = () => {
    updateSection('productsServicesData', formData);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('คุณต้องการคืนค่า Products & Services ทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่?')) {
      setFormData(initialProductsServicesData);
    }
  };

  // --- Handlers for Products ---
  const updateProductsField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      products: {
        ...prev.products,
        [field]: value
      }
    }));
  };

  const handleAddCategory = () => {
    const newId = Date.now();
    const newCat = {
      id: newId,
      name: "หมวดสินค้าใหม่ (New Equipment)",
      brands: "Brand A, Brand B, Brand C"
    };
    setFormData(prev => ({
      ...prev,
      products: {
        ...prev.products,
        categories: [...prev.products.categories, newCat]
      }
    }));
  };

  const handleUpdateCategory = (idx, field, value) => {
    const updated = [...formData.products.categories];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData(prev => ({
      ...prev,
      products: {
        ...prev.products,
        categories: updated
      }
    }));
  };

  const handleDeleteCategory = (idx) => {
    const updated = formData.products.categories.filter((_, i) => i !== idx);
    setFormData(prev => ({
      ...prev,
      products: {
        ...prev.products,
        categories: updated
      }
    }));
  };

  // --- Handlers for Services ---
  const updateServicesField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [field]: value
      }
    }));
  };

  const handleAddServiceItem = () => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: [...prev.services.items, "ขอบเขตบริการและงานบำรุงรักษาใหม่"]
      }
    }));
  };

  const handleUpdateServiceItem = (idx, value) => {
    const updated = [...formData.services.items];
    updated[idx] = value;
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: updated
      }
    }));
  };

  const handleDeleteServiceItem = (idx) => {
    const updated = formData.services.items.filter((_, i) => i !== idx);
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: updated
      }
    }));
  };

  // --- Handlers for Overview ---
  const updateOverviewField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      overview: {
        ...prev.overview,
        [field]: value
      }
    }));
  };

  const handleUpdateSubtitle = (idx, value) => {
    const updated = [...formData.overview.subtitles];
    updated[idx] = value;
    updateOverviewField('subtitles', updated);
  };

  const handleAddBullet = () => {
    updateOverviewField('bullets', [...formData.overview.bullets, "รายการบริการและจุดเด่นใหม่"]);
  };

  const handleUpdateBullet = (idx, value) => {
    const updated = [...formData.overview.bullets];
    updated[idx] = value;
    updateOverviewField('bullets', updated);
  };

  const handleDeleteBullet = (idx) => {
    const updated = formData.overview.bullets.filter((_, i) => i !== idx);
    updateOverviewField('bullets', updated);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">จัดการสินค้าและบริการ (Products & Services)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              2 หมวดหลัก: Products | Services
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            ปรับแต่งแบรนด์สินค้าคู่ค้า (Air, Chiller, BMS, Fire Alarm), งานบริการวิศวกรรม (PM, 24x7 Call Center) และแบนเนอร์ภาพรวม
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 border border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="รีเซ็ตค่าเป็นค่าเริ่มต้น"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>คืนค่าเริ่มต้น</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>ดูพรีวิวทั้งเว็บ</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-gradient-to-r from-gis-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกการแก้ไข</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🌟 LIVE VISUAL PREVIEW: MATCHES 3 SCREENSHOTS EXACTLY 🌟 */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Preview Badge Header */}
        <div className="bg-slate-900 px-6 py-3 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Live Interactive Preview (ตัวอย่างการแสดงผลหน้าเว็บจริง)</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">— คลิกสลับแท็บ Products / Services ด้านล่างได้ทันที</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewTab('overview')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                previewTab === 'overview'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ดูการ์ดภาพรวม (Overview)
            </button>
          </div>
        </div>

        {/* Section Top: Dashed Accent & Slanted Toggle Buttons */}
        <div className="pt-8 pb-4 text-center bg-white border-b border-slate-100">
          {/* Orange dashed line above */}
          <div className="w-28 h-0 border-t-2 border-dashed border-orange-500 mx-auto mb-3"></div>

          {/* 2 Slanted Pills: Products vs Services */}
          <div className="inline-flex items-center gap-3">
            {/* Products Tab Button */}
            <button
              type="button"
              onClick={() => {
                setPreviewTab('products');
                setEditorTab('products');
              }}
              className={`group relative px-7 py-2.5 rounded-2xl font-black italic text-lg sm:text-xl tracking-wider transition-all transform hover:scale-105 select-none shadow-md ${
                previewTab === 'products'
                  ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white border-2 border-orange-400 ring-2 ring-orange-400/40'
                  : 'bg-slate-200 text-slate-500 hover:bg-slate-300 border-2 border-slate-300'
              }`}
              style={{ transform: 'skewX(-12deg)' }}
            >
              <span className="inline-block" style={{ transform: 'skewX(12deg)' }}>
                Products
              </span>
            </button>

            {/* Services Tab Button */}
            <button
              type="button"
              onClick={() => {
                setPreviewTab('services');
                setEditorTab('services');
              }}
              className={`group relative px-7 py-2.5 rounded-2xl font-black italic text-lg sm:text-xl tracking-wider transition-all transform hover:scale-105 select-none shadow-md ${
                previewTab === 'services'
                  ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white border-2 border-orange-400 ring-2 ring-orange-400/40'
                  : 'bg-slate-200 text-slate-500 hover:bg-slate-300 border-2 border-slate-300'
              }`}
              style={{ transform: 'skewX(-12deg)' }}
            >
              <span className="inline-block" style={{ transform: 'skewX(12deg)' }}>
                Services
              </span>
            </button>
          </div>
        </div>

        {/* Live Content Area Based on Preview Tab */}
        <div className="p-6 md:p-8 bg-slate-50/60">
          {previewTab === 'products' && (
            /* ============================================================ */
            /* SCREENSHOT 1: PRODUCTS PREVIEW                               */
            /* ============================================================ */
            <div className="space-y-8 max-w-6xl mx-auto">
              {/* Carousel Banner: 2 Image Cards with Orange Borders & Nav Arrows */}
              <div className="relative">
                {/* Arrow Left */}
                <button
                  type="button"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-400/80 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 2 Image Cards Side-by-Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Card 1: Chiller & Industrial Piping */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-orange-400 bg-white shadow-md group">
                    <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={formData.products.leftImage}
                        alt="Chiller Piping"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Orange slanted corner banner */}
                    <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none"></div>
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 truncate">
                        {formData.products.leftTitle}
                      </span>
                      <span className="text-[10px] bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded">
                        M&E / Chiller
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Fire Sprinkler & Piping Station */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-orange-400 bg-white shadow-md group">
                    <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={formData.products.rightImage}
                        alt="Fire Sprinkler"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Orange slanted corner banner */}
                    <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none"></div>
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 truncate">
                        {formData.products.rightTitle}
                      </span>
                      <span className="text-[10px] bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded">
                        Fire Protection
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow Right */}
                <button
                  type="button"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-400/80 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Brand & Partner Matrix (Matching the lower text block of Screenshot 1) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-orange-500" />
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                      หมวดหมู่และแบรนด์สินค้าคู่ค้า (Products & Partner Brands Matrix)
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {formData.products.categories.length} หมวดหมู่
                  </span>
                </div>

                {/* Matrix Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 text-xs">
                  {formData.products.categories.map((cat, idx) => (
                    <div
                      key={cat.id || idx}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/40 border border-slate-200/80 hover:border-orange-200 transition-colors"
                    >
                      <div className="font-bold text-[#EA580C] mb-1 flex items-center justify-between">
                        <span>{cat.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {cat.brands}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {previewTab === 'services' && (
            /* ============================================================ */
            /* SCREENSHOT 2: SERVICES PREVIEW                               */
            /* ============================================================ */
            <div className="space-y-8 max-w-6xl mx-auto">
              {/* Carousel Banner: 2 Service Image Cards */}
              <div className="relative">
                {/* Arrow Left */}
                <button
                  type="button"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-400/80 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 2 Image Cards Side-by-Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Card 1: GIS Engineers on Chiller Panel */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-orange-400 bg-white shadow-md group">
                    <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={formData.services.leftImage}
                        alt="GIS Chiller Engineer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none"></div>
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 truncate">
                        {formData.services.leftTitle}
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">
                        GIS Operation
                      </span>
                    </div>
                  </div>

                  {/* Card 2: PPE Cleanroom & AC Cleaning */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-orange-400 bg-white shadow-md group">
                    <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={formData.services.rightImage}
                        alt="PPE Technicians"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none"></div>
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 truncate">
                        {formData.services.rightTitle}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded">
                        Cleanroom & IAQ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow Right */}
                <button
                  type="button"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-400/80 hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Service Bullet Items (Matching lower section of Screenshot 2) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Wrench className="w-4 h-4 text-orange-500" />
                  <h3 className="text-sm font-bold text-slate-800">
                    รายการบริการวิศวกรรมหลัก (Scope of Engineering Services)
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {formData.services.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {previewTab === 'overview' && (
            /* ============================================================ */
            /* SCREENSHOT 3: OVERVIEW CARD PREVIEW                          */
            /* ============================================================ */
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl max-w-5xl mx-auto">
              {/* Background image overlay */}
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${formData.overview.bgImage})` }}
              ></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Two Engineers in orange safety vests */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                    <img
                      src={formData.overview.engineersImage}
                      alt="GIS Engineers"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-xs font-bold text-white">
                      GIS Engineering Team
                    </div>
                  </div>
                </div>

                {/* Right: Orange Polygonal Card */}
                <div className="lg:col-span-7">
                  <div
                    className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#FB923C] text-white shadow-2xl border-2 border-white/30"
                    style={{ transform: 'skewX(-2deg)' }}
                  >
                    <div style={{ transform: 'skewX(2deg)' }} className="space-y-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider font-sans">
                          {formData.overview.title}
                        </h3>
                        <div className="space-y-0.5 mt-2">
                          {formData.overview.subtitles.map((sub, idx) => (
                            <div key={idx} className="text-xs sm:text-sm font-semibold text-amber-100">
                              {sub}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bullet Highlights with > arrow */}
                      <div className="space-y-1.5 pt-2 border-t border-white/20">
                        {formData.overview.bullets.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-white/95 leading-relaxed">
                            <span className="text-amber-200 font-bold shrink-0">&gt;</span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Read More Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          className="px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
                        >
                          {formData.overview.btnText || 'Read More'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🛠️ TABBED EDITORS FOR PRODUCTS, SERVICES, AND OVERVIEW 🛠️ */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Editor Tabs Navigation */}
        <div className="flex items-center border-b border-slate-200 overflow-x-auto bg-slate-50/70 p-2 gap-2">
          {/* Tab 1: Products */}
          <button
            type="button"
            onClick={() => {
              setEditorTab('products');
              setPreviewTab('products');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              editorTab === 'products'
                ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 text-orange-500" />
            <span>หมวดสินค้า & แบรนด์คู่ค้า (Products)</span>
          </button>

          {/* Tab 2: Services */}
          <button
            type="button"
            onClick={() => {
              setEditorTab('services');
              setPreviewTab('services');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              editorTab === 'services'
                ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4 text-orange-500" />
            <span>งานบริการวิศวกรรม (Services)</span>
          </button>

          {/* Tab 3: Overview Card */}
          <button
            type="button"
            onClick={() => {
              setEditorTab('overview');
              setPreviewTab('overview');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              editorTab === 'overview'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <Layout className="w-4 h-4 text-blue-500" />
            <span>การ์ดภาพรวม (Product & Service Overview)</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="p-6">
          {editorTab === 'products' && (
            /* ============================================================ */
            /* 1. PRODUCTS EDITOR                                           */
            /* ============================================================ */
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    จัดการข้อมูลและรูปภาพสินค้า (Products Management)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    กำหนดภาพสไลด์ 2 ฝั่ง และหมวดหมู่อุปกรณ์พร้อมแบรนด์คู่ค้าพันธมิตร
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  เพิ่มหมวดสินค้า
                </button>
              </div>

              {/* 2 Banner Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">ชื่อภาพการ์ดฝั่งซ้าย</label>
                    <input
                      type="text"
                      value={formData.products.leftTitle || ''}
                      onChange={(e) => updateProductsField('leftTitle', e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                  <ImageUploadField
                    label="รูปภาพการ์ดฝั่งซ้าย (Chiller Plant / Piping)"
                    value={formData.products.leftImage || ''}
                    onChange={(val) => updateProductsField('leftImage', val)}
                    recommendation="ขนาดแนะนำ: 800 x 500 px (สัดส่วน 16:10)"
                  />
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">ชื่อภาพการ์ดฝั่งขวา</label>
                    <input
                      type="text"
                      value={formData.products.rightTitle || ''}
                      onChange={(e) => updateProductsField('rightTitle', e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                  <ImageUploadField
                    label="รูปภาพการ์ดฝั่งขวา (Fire Sprinkler / Alarm)"
                    value={formData.products.rightImage || ''}
                    onChange={(val) => updateProductsField('rightImage', val)}
                    recommendation="ขนาดแนะนำ: 800 x 500 px (สัดส่วน 16:10)"
                  />
                </div>
              </div>

              {/* Brand Categories List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    รายการหมวดสินค้าและแบรนด์ ({formData.products.categories.length} รายการ)
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    *คั่นชื่อแบรนด์ด้วยเครื่องหมายจุลภาค (,)
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 sidebar-scroll">
                  {formData.products.categories.map((cat, idx) => (
                    <div
                      key={cat.id || idx}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center gap-3 hover:border-orange-200 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>

                      <div className="w-full md:w-52 shrink-0">
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) => handleUpdateCategory(idx, 'name', e.target.value)}
                          placeholder="ชื่อหมวดหมู่ เช่น AIR Condition"
                          className="w-full text-xs font-bold text-orange-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none"
                        />
                      </div>

                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={cat.brands}
                          onChange={(e) => handleUpdateCategory(idx, 'brands', e.target.value)}
                          placeholder="แบรนด์ เช่น Mitsubishi, Carrier, Daikin"
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none text-slate-700"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded self-end md:self-center transition-colors"
                        title="ลบหมวดนี้"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {editorTab === 'services' && (
            /* ============================================================ */
            /* 2. SERVICES EDITOR                                           */
            /* ============================================================ */
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    จัดการข้อมูลและรูปภาพงานบริการ (Services Management)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    กำหนดภาพถ่ายทีมงานวิศวกร GIS และรายการบริการหลัก เช่น 24x7 Call Center, PM, IAQ
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddServiceItem}
                  className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  เพิ่มรายการบริการ
                </button>
              </div>

              {/* 2 Service Banner Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">ชื่อภาพการ์ดฝั่งซ้าย</label>
                    <input
                      type="text"
                      value={formData.services.leftTitle || ''}
                      onChange={(e) => updateServicesField('leftTitle', e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                  <ImageUploadField
                    label="รูปภาพการ์ดฝั่งซ้าย (GIS Engineer / Chiller Control)"
                    value={formData.services.leftImage || ''}
                    onChange={(val) => updateServicesField('leftImage', val)}
                    recommendation="ขนาดแนะนำ: 800 x 500 px (สัดส่วน 16:10)"
                  />
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">ชื่อภาพการ์ดฝั่งขวา</label>
                    <input
                      type="text"
                      value={formData.services.rightTitle || ''}
                      onChange={(e) => updateServicesField('rightTitle', e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                  <ImageUploadField
                    label="รูปภาพการ์ดฝั่งขวา (PPE Cleanroom / Disinfection)"
                    value={formData.services.rightImage || ''}
                    onChange={(val) => updateServicesField('rightImage', val)}
                    recommendation="ขนาดแนะนำ: 800 x 500 px (สัดส่วน 16:10)"
                  />
                </div>
              </div>

              {/* Service Bullet Items */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  รายการงานบริการ ({formData.services.items.length} รายการ)
                </h4>

                <div className="space-y-2">
                  {formData.services.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>

                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleUpdateServiceItem(idx, e.target.value)}
                        className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-medium text-slate-800"
                      />

                      <button
                        type="button"
                        onClick={() => handleDeleteServiceItem(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                        title="ลบรายการนี้"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {editorTab === 'overview' && (
            /* ============================================================ */
            /* 3. OVERVIEW BANNER EDITOR                                    */
            /* ============================================================ */
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    จัดการการ์ดภาพรวม (Product & Service Overview Card)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ปรับแต่งพาดหัว การ์ดสีส้มมุมเอียง และข้อความไฮไลต์ 8 ข้อตาม Screenshot 3
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddBullet}
                  className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  เพิ่มข้อความไฮไลต์
                </button>
              </div>

              {/* Title & Subtitles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    หัวข้อใหญ่บนการ์ดสีส้ม (Title)
                  </label>
                  <input
                    type="text"
                    value={formData.overview.title || ''}
                    onChange={(e) => updateOverviewField('title', e.target.value)}
                    className="w-full text-xs font-black uppercase text-orange-600 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    ข้อความปุ่ม (Button Text)
                  </label>
                  <input
                    type="text"
                    value={formData.overview.btnText || ''}
                    onChange={(e) => updateOverviewField('btnText', e.target.value)}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                  />
                </div>

                {/* 3 Subtitles */}
                <div className="md:col-span-2 space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="text-xs font-bold text-slate-700 block">
                    3 หัวข้อย่อยหลัก (Subtitles):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {formData.overview.subtitles.map((sub, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={sub}
                        onChange={(e) => handleUpdateSubtitle(idx, e.target.value)}
                        className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-semibold text-slate-800"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUploadField
                  label="รูปภาพทีมวิศวกร GIS ชี้ไซต์งาน (Engineers Image)"
                  value={formData.overview.engineersImage || ''}
                  onChange={(val) => updateOverviewField('engineersImage', val)}
                  recommendation="ขนาดแนะนำ: 800 x 900 px (ภาพวิศวกรสวมหมวกและเสื้อกั๊กสะท้อนแสง)"
                />
                <ImageUploadField
                  label="รูปพื้นหลังซึมใต้แสงสีส้ม (Background Image)"
                  value={formData.overview.bgImage || ''}
                  onChange={(val) => updateOverviewField('bgImage', val)}
                  recommendation="ขนาดแนะนำ: 1920 x 800 px (ภาพระบบโรงงานหรืออาคาร)"
                />
              </div>

              {/* Bullet Points with > */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  รายการไฮไลต์หัวข้อย่อย ({formData.overview.bullets.length} ข้อ)
                </h4>

                <div className="space-y-2">
                  {formData.overview.bullets.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <span className="text-orange-500 font-black text-sm shrink-0">&gt;</span>
                      <input
                        type="text"
                        value={b}
                        onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                        className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 outline-none font-medium text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteBullet(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                        title="ลบข้อนี้"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
