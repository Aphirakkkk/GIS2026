import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { initialBusinessData } from '../data/businessDivisionsData';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { RichTextEditor } from '../components/common/RichTextEditor';
import {
  Save,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  Video,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  Settings,
  Info
} from 'lucide-react';

// Custom SVG Icons matching the original reference screenshot
const EpcIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 26C10 16 16 10 24 10C32 10 38 16 38 26" />
    <path d="M6 26C6 26 8 28 24 28C40 28 42 26 42 26" />
    <path d="M8 28V32C8 33 10 34 24 34C38 34 40 33 40 32V28" />
    <circle cx="24" cy="20" r="4.5" fill="currentColor" fillOpacity="0.15" />
    <path d="M24 14V16M24 24V26M18 20H20M28 20H30M19.8 15.8L21.2 17.2M26.8 22.8L28.2 24.2M19.8 24.2L21.2 22.8M26.8 17.2L28.2 15.8" />
  </svg>
);

const IbtIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="20" y="8" width="16" height="26" rx="1.5" />
    <path d="M24 14H26M30 14H32M24 18H26M30 18H32M24 22H26M30 22H32M24 26H26M30 26H32" />
    <rect x="10" y="22" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.1" />
    <path d="M19 36V40M14 40H24" />
    <rect x="30" y="24" width="9" height="15" rx="1.5" fill="currentColor" fillOpacity="0.15" />
    <circle cx="34.5" cy="36" r="0.75" fill="currentColor" />
  </svg>
);

const EnrIcon = ({ className = "w-9 h-9" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="24" cy="24" r="16" />
    <path d="M14 26A11 11 0 0 1 34 26" strokeDasharray="2 3" />
    <line x1="24" y1="24" x2="31" y2="17" strokeWidth="2.5" />
    <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    <text x="24" y="34" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor" stroke="none">kWh</text>
  </svg>
);

export const BusinessView = () => {
  const { currentContent, updateSection, lang, setIsPreviewOpen, activeView } = useAdmin();

  // Load businessData with fallback to initialBusinessData
  const [formData, setFormData] = useState(() => {
    return currentContent?.businessData || initialBusinessData;
  });

  // Active division tab: 'epc' | 'ibt' | 'enr' | 'general'
  const [activeTab, setActiveTab] = useState('epc');

  // Preview video player mode: 'mockup' or 'iframe'
  const [playVideoEmbed, setPlayVideoEmbed] = useState(false);

  // Sync activeTab when sidebar sub-menu is clicked
  useEffect(() => {
    if (activeView === 'business-epc') setActiveTab('epc');
    else if (activeView === 'business-ibt') setActiveTab('ibt');
    else if (activeView === 'business-enr') setActiveTab('enr');
  }, [activeView]);

  // Keep local state in sync when global lang changes
  useEffect(() => {
    if (currentContent?.businessData) {
      setFormData(currentContent.businessData);
    }
  }, [currentContent, lang]);

  // Helper to update root properties (sectionHeader, headline, subheadline, bgImage)
  const updateGeneralField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper to update video properties
  const updateVideoField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      video: {
        ...prev.video,
        [field]: value
      }
    }));
  };

  // Helper to update a division's properties
  const updateDivisionField = (divKey, field, value) => {
    setFormData(prev => ({
      ...prev,
      divisions: {
        ...prev.divisions,
        [divKey]: {
          ...prev.divisions[divKey],
          [field]: value
        }
      }
    }));
  };

  // Manage capabilities list of the active division
  const handleAddCapability = (divKey) => {
    const currentList = formData.divisions[divKey]?.capabilities || [];
    updateDivisionField(divKey, 'capabilities', [...currentList, 'ความเชี่ยวชาญ / ขอบเขตงานใหม่']);
  };

  const handleUpdateCapability = (divKey, idx, value) => {
    const currentList = [...(formData.divisions[divKey]?.capabilities || [])];
    currentList[idx] = value;
    updateDivisionField(divKey, 'capabilities', currentList);
  };

  const handleDeleteCapability = (divKey, idx) => {
    const currentList = formData.divisions[divKey]?.capabilities.filter((_, i) => i !== idx) || [];
    updateDivisionField(divKey, 'capabilities', currentList);
  };

  // Save changes to AdminContext
  const handleSave = () => {
    updateSection('businessData', formData);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('คุณต้องการคืนค่ากลุ่มธุรกิจกลับเป็นค่าเริ่มต้นใช่หรือไม่?')) {
      setFormData(initialBusinessData);
    }
  };

  // Extract YouTube ID if valid
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  // Current active division object
  const currentDiv = formData.divisions[activeTab === 'general' ? 'epc' : activeTab] || formData.divisions.epc;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">กลุ่มธุรกิจองค์กร (Our Business)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
              3 สายงานหลัก: EPC | IBT | ENR
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            ปรับแต่งข้อมูลสายงานวิศวกรรม หัวข้อส่วน แบนเนอร์สีส้ม และวิดีโอแนะนำ Fujitsu Trust Award
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
      {/* 🌟 LIVE VISUAL PREVIEW: MATCHES SCREENSHOT EXACTLY 🌟 */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Preview Badge Header */}
        <div className="bg-slate-900 px-6 py-3 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Live Interactive Preview (ตัวอย่างการแสดงผลหน้าเว็บจริง)</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">— คลิกเลือกแท็บเพื่อทดสอบการสลับข้อมูลได้ทันที</span>
          </div>
          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-orange-400 font-mono">
            Desktop & Mobile Responsive
          </span>
        </div>

        {/* Outer Section: Dotted Header */}
        <div className="pt-8 pb-4 text-center bg-white">
          <div className="inline-flex flex-col items-center">
            {/* Orange dashed line above */}
            <div className="w-24 h-0 border-t-2 border-dashed border-orange-500 mb-2"></div>
            <h2 className="text-2xl md:text-3xl font-black tracking-widest text-[#F97316] uppercase font-sans">
              {formData.sectionHeader || 'OUR BUSINESS'}
            </h2>
          </div>
        </div>

        {/* Main Vibrant Orange Section */}
        <div
          className="relative bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#FB923C] text-white px-6 sm:px-10 py-10 md:py-14 overflow-hidden shadow-inner"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(234, 88, 12, 0.95), rgba(249, 115, 22, 0.92), rgba(251, 146, 60, 0.90)), url(${formData.bgImage || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle industrial overlay ductwork lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines, 3 Tabs, Speech Bubble & Description */}
            <div className="lg:col-span-7 space-y-5">
              {/* Headlines */}
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
                  {formData.headline || 'We Help You Build'}
                </h3>
                <p className="text-lg sm:text-xl md:text-2xl font-medium italic text-amber-100 tracking-wide mt-0.5">
                  {formData.subheadline || 'And Prepare For The Future'}
                </p>
              </div>

              {/* 3 Angled Division Buttons (EPC, IBT, ENR) */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-1">
                {/* 1. EPC DIVISION */}
                <button
                  type="button"
                  onClick={() => setActiveTab('epc')}
                  className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border-2 transition-all transform hover:-translate-y-0.5 min-w-[95px] sm:min-w-[115px] ${
                    activeTab === 'epc'
                      ? 'bg-gradient-to-b from-orange-600/90 to-orange-700/95 border-white text-white shadow-xl ring-2 ring-white/60'
                      : 'bg-orange-600/30 hover:bg-orange-600/50 border-white/60 text-white/90'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center mb-1.5 bg-white/10 group-hover:bg-white/20 transition-colors">
                    <EpcIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-extrabold tracking-wider uppercase text-center leading-tight">
                    {formData.divisions.epc.name}
                  </span>
                </button>

                {/* 2. IBT DIVISION */}
                <button
                  type="button"
                  onClick={() => setActiveTab('ibt')}
                  className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border-2 transition-all transform hover:-translate-y-0.5 min-w-[95px] sm:min-w-[115px] ${
                    activeTab === 'ibt'
                      ? 'bg-gradient-to-b from-orange-600/90 to-orange-700/95 border-white text-white shadow-xl ring-2 ring-white/60'
                      : 'bg-orange-600/30 hover:bg-orange-600/50 border-white/60 text-white/90'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center mb-1.5 bg-white/10 group-hover:bg-white/20 transition-colors">
                    <IbtIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-extrabold tracking-wider uppercase text-center leading-tight">
                    {formData.divisions.ibt.name}
                  </span>
                </button>

                {/* 3. ENR DIVISION */}
                <button
                  type="button"
                  onClick={() => setActiveTab('enr')}
                  className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border-2 transition-all transform hover:-translate-y-0.5 min-w-[95px] sm:min-w-[115px] ${
                    activeTab === 'enr'
                      ? 'bg-gradient-to-b from-orange-600/90 to-orange-700/95 border-white text-white shadow-xl ring-2 ring-white/60'
                      : 'bg-orange-600/30 hover:bg-orange-600/50 border-white/60 text-white/90'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center mb-1.5 bg-white/10 group-hover:bg-white/20 transition-colors">
                    <EnrIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-extrabold tracking-wider uppercase text-center leading-tight">
                    {formData.divisions.enr.name}
                  </span>
                </button>
              </div>

              {/* Speech Bubble Quote */}
              <div className="relative inline-block bg-white text-slate-800 px-4 py-2 rounded-xl shadow-md text-xs sm:text-sm font-semibold border border-orange-200/60 mt-1">
                <span className="text-[#EA580C] font-black mr-1">&ldquo;</span>
                <span>{currentDiv.quote || currentDiv.slogan}</span>
                <span className="text-[#EA580C] font-black ml-1">&rdquo;</span>
              </div>

              {/* Division Title & Description */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xl sm:text-2xl font-black text-amber-200 tracking-wide uppercase">
                  {currentDiv.name}
                </h4>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-light line-clamp-4">
                  {currentDiv.shortDesc}
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-200 underline underline-offset-4 hover:text-white cursor-pointer transition-colors">
                    {currentDiv.btnText || 'Read More'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: YouTube Video Embed or Mockup Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 group">
                {playVideoEmbed && getYouTubeEmbedUrl(formData.video.url) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(formData.video.url)}
                    title={formData.video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="relative w-full h-full bg-cover bg-center flex flex-col justify-between p-4"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.2) 40%, rgba(15, 23, 42, 0.85)), url(${formData.video.thumbnail || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop'})`
                    }}
                  >
                    {/* Top video author & title banner */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#EA580C] font-black text-xs shrink-0 shadow">
                        GIS
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate drop-shadow">
                          {formData.video.title || 'Fujitsu Trust Award - GIS Group Co ,Ltd'}
                        </div>
                        <div className="text-[10px] text-slate-300 truncate font-light">
                          {formData.video.channel || 'GENERAL Air Conditioning Manufacturing Thailand'}
                        </div>
                      </div>
                    </div>

                    {/* Big Center Red Play Button */}
                    <button
                      type="button"
                      onClick={() => setPlayVideoEmbed(true)}
                      className="absolute inset-0 m-auto w-16 h-11 bg-red-600 hover:bg-red-700 transition-all rounded-2xl flex items-center justify-center text-white shadow-xl hover:scale-110"
                      title="กดเพื่อเปิดเล่นวิดีโอ"
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </button>

                    {/* Bottom Controls Bar Mockup */}
                    <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2">
                      <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono">16:9 HD</span>
                      <a
                        href={formData.video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-black/70 hover:bg-black/90 px-2.5 py-1 rounded text-[11px] font-semibold text-white flex items-center gap-1 transition-colors"
                      >
                        <span>ดูใน YouTube</span>
                        <ExternalLink className="w-3 h-3 text-red-400" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🛠️ TABBED EDITORS FOR DIVISIONS & GENERAL SETTINGS 🛠️ */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Editor Tabs Navigation */}
        <div className="flex items-center border-b border-slate-200 overflow-x-auto bg-slate-50/70 p-2 gap-2">
          {/* Tab: EPC DIVISION */}
          <button
            type="button"
            onClick={() => setActiveTab('epc')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'epc'
                ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <EpcIcon className="w-4 h-4 text-orange-500" />
            <span>EPC DIVISION</span>
          </button>

          {/* Tab: IBT DIVISION */}
          <button
            type="button"
            onClick={() => setActiveTab('ibt')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'ibt'
                ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <IbtIcon className="w-4 h-4 text-orange-500" />
            <span>IBT DIVISION</span>
          </button>

          {/* Tab: ENR DIVISION */}
          <button
            type="button"
            onClick={() => setActiveTab('enr')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'enr'
                ? 'bg-white text-orange-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <EnrIcon className="w-4 h-4 text-orange-500" />
            <span>ENR DIVISION</span>
          </button>

          {/* Tab: General & Video Settings */}
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'general'
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 text-blue-500" />
            <span>หัวข้อส่วน & วิดีโอ YouTube (Header & Video)</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="p-6">
          {activeTab === 'general' ? (
            /* ============================================================ */
            /* 1. GENERAL & VIDEO SETTINGS EDITOR                           */
            /* ============================================================ */
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">ตั้งค่าหัวข้อหลัก & วิดีโอแนะนำองค์กร</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    กำหนดชื่อหัวข้อใหญ่ ข้อความนำเสนอ และลิงก์คลิปวิดีโอ YouTube ทางฝั่งขวา
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-600">
                  Global Business Section
                </span>
              </div>

              {/* Section Titles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    หัวข้อใหญ่ส่วน (Section Header)
                  </label>
                  <input
                    type="text"
                    value={formData.sectionHeader || ''}
                    onChange={(e) => updateGeneralField('sectionHeader', e.target.value)}
                    placeholder="OUR BUSINESS"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none font-bold text-orange-600"
                  />
                  <p className="text-[10px] text-slate-400">ข้อความตัวพิมพ์ใหญ่เหนือเส้นประสีส้ม</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    พาดหัวหลัก (Main Headline)
                  </label>
                  <input
                    type="text"
                    value={formData.headline || ''}
                    onChange={(e) => updateGeneralField('headline', e.target.value)}
                    placeholder="We Help You Build"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none font-bold text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400">ตัวหนังสือสีขาวขนาดใหญ่ในแถบส้ม</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    พาดหัวย่อย (Sub-headline)
                  </label>
                  <input
                    type="text"
                    value={formData.subheadline || ''}
                    onChange={(e) => updateGeneralField('subheadline', e.target.value)}
                    placeholder="And Prepare For The Future"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none italic text-slate-700"
                  />
                  <p className="text-[10px] text-slate-400">ตัวเอียงสีเหลืองทอง</p>
                </div>
              </div>

              {/* Video Settings */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-red-600" />
                  <h4 className="text-xs font-bold text-slate-800">ข้อมูลคลิปวิดีโอ YouTube (Fujitsu Trust Award)</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-slate-700">ลิงก์วิดีโอ YouTube (URL)</label>
                    <input
                      type="text"
                      value={formData.video?.url || ''}
                      onChange={(e) => updateVideoField('url', e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-mono text-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">ชื่อเรื่องคลิปวิดีโอ (Video Title)</label>
                    <input
                      type="text"
                      value={formData.video?.title || ''}
                      onChange={(e) => updateVideoField('title', e.target.value)}
                      placeholder="Fujitsu Trust Award - GIS Group Co ,Ltd"
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">ชื่อช่อง / ผู้ผลิต (Channel / Subtitle)</label>
                    <input
                      type="text"
                      value={formData.video?.channel || ''}
                      onChange={(e) => updateVideoField('channel', e.target.value)}
                      placeholder="GENERAL Air Conditioning Manufacturing Thailand"
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                {/* Video Thumbnail Image */}
                <ImageUploadField
                  label="รูปหน้าปกวิดีโอ (Video Thumbnail)"
                  value={formData.video?.thumbnail || ''}
                  onChange={(val) => updateVideoField('thumbnail', val)}
                  recommendation="ขนาดแนะนำ: 1280 x 720 px (สัดส่วน 16:9)"
                />
              </div>

              {/* Background Image of the Section */}
              <ImageUploadField
                label="ภาพพื้นหลังแถบสีส้ม (Background Texture Image)"
                value={formData.bgImage || ''}
                onChange={(val) => updateGeneralField('bgImage', val)}
                recommendation="ขนาดแนะนำ: 1920 x 800 px (ภาพท่อแอร์ดักท์หรือระบบโรงงานแบบซึมใต้แสงสีส้ม)"
              />
            </div>
          ) : (
            /* ============================================================ */
            /* 2. DIVISION SPECIFIC EDITOR (EPC, IBT, ENR)                  */
            /* ============================================================ */
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    {activeTab === 'epc' && <EpcIcon className="w-5 h-5" />}
                    {activeTab === 'ibt' && <IbtIcon className="w-5 h-5" />}
                    {activeTab === 'enr' && <EnrIcon className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      แก้ไขข้อมูล: {formData.divisions[activeTab].name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {formData.divisions[activeTab].fullName}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold bg-orange-50 text-orange-700 px-2.5 py-1 rounded-lg border border-orange-200">
                  ID: {activeTab.toUpperCase()}
                </span>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">ชื่อสายงานย่อ (Division Name / Tag)</label>
                  <input
                    type="text"
                    value={formData.divisions[activeTab].name || ''}
                    onChange={(e) => updateDivisionField(activeTab, 'name', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none font-bold text-orange-600 uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">ชื่อทางการเต็ม (Division Full Title)</label>
                  <input
                    type="text"
                    value={formData.divisions[activeTab].fullName || ''}
                    onChange={(e) => updateDivisionField(activeTab, 'fullName', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none font-medium text-slate-800"
                  />
                </div>

                {/* Speech Bubble Slogan */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>คำโปรยในบอลลูนคำพูด (Quote / Speech Bubble)</span>
                    <span className="text-[10px] text-orange-600 font-normal">
                      *ปรากฏในกล่องสีขาวโค้งมนเหนือคำอธิบาย
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.divisions[activeTab].quote || ''}
                    onChange={(e) => {
                      updateDivisionField(activeTab, 'quote', e.target.value);
                      updateDivisionField(activeTab, 'slogan', e.target.value);
                    }}
                    placeholder="Let our professional engineering team build for you"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none font-semibold text-slate-800"
                  />
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <RichTextEditor
                    label="คำอธิบายรายละเอียดสายงาน (Short Description - Rich Text)"
                    value={formData.divisions[activeTab].shortDesc || ''}
                    onChange={(html) => updateDivisionField(activeTab, 'shortDesc', html)}
                    placeholder="รายละเอียดภารกิจ ความเชี่ยวชาญ และโซลูชันของสายงาน..."
                    rows={4}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">ข้อความปุ่มกดลิงก์ (Button Text)</label>
                  <input
                    type="text"
                    value={formData.divisions[activeTab].btnText || 'Read More'}
                    onChange={(e) => updateDivisionField(activeTab, 'btnText', e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none font-semibold text-blue-600"
                  />
                </div>
              </div>

              {/* Division Banner Image */}
              <ImageUploadField
                label={`รูปภาพประกอบสายงาน ${formData.divisions[activeTab].name}`}
                value={formData.divisions[activeTab].image || ''}
                onChange={(val) => updateDivisionField(activeTab, 'image', val)}
                recommendation="ขนาดแนะนำ: 1200 x 700 px (สัดส่วน 16:9 ภาพไซต์งานหรือผลงานโครงการของสายงาน)"
              />

              {/* Capabilities List */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      รายการความเชี่ยวชาญและขอบเขตงาน (Core Capabilities & Scope)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      แสดงรายการความสามารถเด่นของสายงานนี้บนเว็บไซต์
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddCapability(activeTab)}
                    className="text-xs text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 px-2.5 py-1 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    เพิ่มความเชี่ยวชาญ
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.divisions[activeTab].capabilities || []).map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={cap}
                        onChange={(e) => handleUpdateCapability(activeTab, idx, e.target.value)}
                        className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-orange-500/20 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteCapability(activeTab, idx)}
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
        </div>
      </div>
    </div>
  );
};
