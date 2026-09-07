import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { Save, Plus, Trash2, CheckCircle2, Eye, Sliders, Layers } from 'lucide-react';

export const BannerView = () => {
  const { currentContent, updateSection, lang, setIsPreviewOpen } = useAdmin();
  const [heroData, setHeroData] = useState(currentContent.hero || {});
  const [bannersList, setBannersList] = useState(currentContent.banners || []);

  // Update a simple hero text field
  const handleHeroChange = (field, value) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update a stat item
  const handleStatChange = (id, key, val) => {
    setHeroData(prev => ({
      ...prev,
      stats: prev.stats.map(s => s.id === id ? { ...s, [key]: val } : s)
    }));
  };

  // Save changes to context and localStorage
  const handleSaveAll = () => {
    updateSection('hero', heroData);
    updateSection('banners', bannersList);
  };

  // Manage Banner list
  const handleBannerChange = (id, field, val) => {
    setBannersList(prev => prev.map(b => b.id === id ? { ...b, [field]: val } : b));
  };

  const handleAddBanner = () => {
    const newBanner = {
      id: Date.now(),
      title: "หัวข้อแบนเนอร์ใหม่",
      subtitle: "รายละเอียดแบนเนอร์ย่อย",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      active: true,
      order: bannersList.length + 1
    };
    setBannersList([...bannersList, newBanner]);
  };

  const handleDeleteBanner = (id) => {
    if (window.confirm('คุณต้องการลบแบนเนอร์นี้ใช่หรือไม่?')) {
      setBannersList(bannersList.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">จัดการแบนเนอร์ & หน้าแรก (Hero Banner)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              ภาษา: {lang.toUpperCase()}
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            ปรับเปลี่ยนข้อความพาดหัว สถิติ ปุ่มกด และรูปภาพหน้าแรกของเว็บไซต์
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>ดูตัวอย่างเว็บ</span>
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกข้อมูลทั้งหมด</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: ข้อความ Hero Banner หลัก */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Sliders className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-800">1. ข้อความพาดหัวหลัก (Hero Main Headline)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">ข้อความแท็กด้านบน (Tagline)</label>
            <input
              type="text"
              value={heroData.tagline || ''}
              onChange={(e) => handleHeroChange('tagline', e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">ชื่อปุ่มติดต่อ (Contact Button Label)</label>
            <input
              type="text"
              value={heroData.btnContact || ''}
              onChange={(e) => handleHeroChange('btnContact', e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">พาดหัวใหญ่ บรรทัดที่ 1 (Title Line 1)</label>
            <input
              type="text"
              value={heroData.titleMain || ''}
              onChange={(e) => handleHeroChange('titleMain', e.target.value)}
              className="w-full text-base font-bold bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">พาดหัวใหญ่ บรรทัดที่ 2 (Title Line 2 - สีส้ม)</label>
            <input
              type="text"
              value={heroData.titleSub || ''}
              onChange={(e) => handleHeroChange('titleSub', e.target.value)}
              className="w-full text-base font-bold bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gis-orange"
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">คำบรรยายสรุป (Hero Description)</label>
            <textarea
              rows={3}
              value={heroData.description || ''}
              onChange={(e) => handleHeroChange('description', e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 leading-relaxed"
            />
          </div>
        </div>

        {/* Hero Background Image */}
        <div className="pt-2">
          <ImageUploadField
            label="รูปภาพพื้นหลังแบนเนอร์หลัก (Hero Background Image)"
            value={heroData.bgImage || ''}
            onChange={(newImg) => handleHeroChange('bgImage', newImg)}
            recommendation="ขนาดแนะนำ: 1920 x 1080 px (ภาพอาคาร/งานวิศวกรรมคุณภาพสูง)"
          />
        </div>
      </div>

      {/* SECTION 2: สถิติตัวเลข 4 ช่อง (KPI Stats) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-gis-orange" />
            <h2 className="text-base font-bold text-slate-800">2. สถิติความสำเร็จ (Hero Stats Counter)</h2>
          </div>
          <span className="text-xs text-slate-400">แสดงผล 4 ช่องใต้แบนเนอร์</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {heroData.stats?.map((stat, idx) => (
            <div key={stat.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-[11px] font-bold text-slate-400">ลำดับที่ {idx + 1}</div>
              <div>
                <label className="text-xs text-slate-600 font-medium">ตัวเลขสถิติ (Value)</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                  className="w-full text-lg font-black text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 font-medium">คำอธิบาย (Label)</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                  className="w-full text-xs text-slate-700 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: จัดการรายการสไลด์แบนเนอร์ (Banners Slides List) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-bold text-slate-800">3. รายการภาพสไลด์แบนเนอร์ (Slider Banners)</h2>
              <p className="text-xs text-slate-400">ทั้งหมด {bannersList.length} แบนเนอร์</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddBanner}
            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มแบนเนอร์ใหม่</span>
          </button>
        </div>

        <div className="space-y-4">
          {bannersList.map((banner, index) => (
            <div
              key={banner.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{banner.title || 'แบนเนอร์ไม่มีชื่อ'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteBanner(banner.id)}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 p-1 hover:bg-rose-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>ลบ</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">หัวข้อแบนเนอร์</label>
                  <input
                    type="text"
                    value={banner.title}
                    onChange={(e) => handleBannerChange(banner.id, 'title', e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">หัวข้อย่อย / คำโปรย</label>
                  <input
                    type="text"
                    value={banner.subtitle}
                    onChange={(e) => handleBannerChange(banner.id, 'subtitle', e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="รูปภาพแบนเนอร์"
                value={banner.image}
                onChange={(val) => handleBannerChange(banner.id, 'image', val)}
                recommendation="ขนาดแนะนำ: 1400 x 700 px (สัดส่วน 2:1)"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
