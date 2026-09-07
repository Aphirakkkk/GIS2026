import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Briefcase,
  DollarSign,
  Gift,
  HeartHandshake,
  Mail,
  Phone,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Eye,
  CheckCircle2,
  Building2,
  Sparkles,
  Users,
  HardHat,
  Cpu,
  Layers,
  FileCheck
} from 'lucide-react';

export const CareerView = () => {
  const { data, updateSection, lang, showToast, activeView } = useAdmin();

  // Retrieve current career data from context
  const currentCareer = data.content?.[lang]?.careerData || data.content?.th?.careerData;

  // Local state for editing
  const [careerData, setCareerData] = useState(currentCareer);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview', 'benefits', 'positions', 'contact'
  const [selectedDeptId, setSelectedDeptId] = useState('all');
  
  // Position modal state
  const [editingPosition, setEditingPosition] = useState(null); // { deptId, index, title }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPositionText, setNewPositionText] = useState('');
  const [targetDeptId, setTargetDeptId] = useState('admin');

  // Sync if context updates or route changes
  useEffect(() => {
    if (currentCareer) {
      setCareerData(currentCareer);
    }
  }, [currentCareer, lang]);

  // If user navigated via sidebar submenus, auto-switch to relevant department
  useEffect(() => {
    if (activeView === 'career-admin') {
      setActiveTab('positions');
      setSelectedDeptId('admin');
    } else if (activeView === 'career-epc') {
      setActiveTab('positions');
      setSelectedDeptId('epc');
    } else if (activeView === 'career-ibt') {
      setActiveTab('positions');
      setSelectedDeptId('ibt');
    } else if (activeView === 'career-apply') {
      setActiveTab('contact');
    }
  }, [activeView]);

  // Save changes to global context & localStorage
  const handleSave = () => {
    updateSection('careerData', careerData);
    showToast('บันทึกข้อมูลหน้า Career เรียบร้อยแล้ว');
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลหน้า Career กลับเป็นค่าเริ่มต้นใช่หรือไม่?')) {
      const defaultData = data.content?.th?.careerData;
      setCareerData(JSON.parse(JSON.stringify(defaultData)));
      showToast('รีเซ็ตข้อมูลหน้า Career สำเร็จ');
    }
  };

  // Position Management Handlers
  const handleOpenAddModal = (deptId) => {
    setEditingPosition(null);
    setTargetDeptId(deptId || 'admin');
    setNewPositionText('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (deptId, index, currentText) => {
    setEditingPosition({ deptId, index, title: currentText });
    setTargetDeptId(deptId);
    setNewPositionText(currentText);
    setIsModalOpen(true);
  };

  const handleSavePositionModal = (e) => {
    e.preventDefault();
    if (!newPositionText.trim()) return;

    setCareerData((prev) => {
      const nextDepts = prev.departments.map((dept) => {
        if (editingPosition) {
          // Editing existing
          if (dept.id === editingPosition.deptId) {
            const updatedPositions = [...dept.positions];
            updatedPositions[editingPosition.index] = newPositionText.trim();
            return { ...dept, positions: updatedPositions };
          }
        } else {
          // Adding new to targetDeptId
          if (dept.id === targetDeptId) {
            return {
              ...dept,
              positions: [...dept.positions, newPositionText.trim()]
            };
          }
        }
        return dept;
      });
      return { ...prev, departments: nextDepts };
    });

    setIsModalOpen(false);
    showToast(editingPosition ? 'แก้ไขชื่อตำแหน่งงานเรียบร้อย' : 'เพิ่มตำแหน่งงานใหม่เรียบร้อย');
  };

  const handleDeletePosition = (deptId, index) => {
    if (window.confirm('คุณต้องการลบตำแหน่งงานนี้หรือไม่?')) {
      setCareerData((prev) => ({
        ...prev,
        departments: prev.departments.map((dept) => {
          if (dept.id === deptId) {
            return {
              ...dept,
              positions: dept.positions.filter((_, i) => i !== index)
            };
          }
          return dept;
        })
      }));
      showToast('ลบตำแหน่งงานเรียบร้อยแล้ว');
    }
  };

  // Benefit Item Management
  const handleAddBenefitItem = (benefitIndex) => {
    const newItem = prompt('กรุณาระบุสวัสดิการหรือผลตอบแทนใหม่:');
    if (!newItem || !newItem.trim()) return;

    setCareerData((prev) => {
      const nextBenefits = [...prev.benefits];
      nextBenefits[benefitIndex] = {
        ...nextBenefits[benefitIndex],
        items: [...nextBenefits[benefitIndex].items, newItem.trim()]
      };
      return { ...prev, benefits: nextBenefits };
    });
    showToast('เพิ่มรายการสวัสดิการเรียบร้อย');
  };

  const handleDeleteBenefitItem = (benefitIndex, itemIndex) => {
    setCareerData((prev) => {
      const nextBenefits = [...prev.benefits];
      nextBenefits[benefitIndex] = {
        ...nextBenefits[benefitIndex],
        items: nextBenefits[benefitIndex].items.filter((_, i) => i !== itemIndex)
      };
      return { ...prev, benefits: nextBenefits };
    });
    showToast('ลบรายการสวัสดิการเรียบร้อย');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-gis-orange">
              Career & Recruitment Management
            </span>
            <span className="text-xs text-slate-400">• GIS GROUP Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-gis-orange" />
            จัดการหน้า Career (ร่วมงานกับเรา)
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            ปรับแต่งข้อเสนอสวัสดิการ (We Offer), ข้อมูลการสมัครงาน (Apply) และตำแหน่งงานที่เปิดรับทั้ง 3 แผนก
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            รีเซ็ตค่าเดิม
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gis-orange hover:bg-orange-600 rounded-lg shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            บันทึกข้อมูล
          </button>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-1.5 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'preview'
              ? 'bg-[#111D35] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Eye className="w-4 h-4 text-amber-400" />
          <span>Live Interactive Preview (แสดงตัวอย่างจริง)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('benefits')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'benefits'
              ? 'bg-[#111D35] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Gift className="w-4 h-4 text-emerald-400" />
          <span>สวัสดิการ & ผลตอบแทน (We Offer)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('positions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'positions'
              ? 'bg-[#111D35] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4 text-sky-400" />
          <span>ตำแหน่งงาน 3 แผนก (Open Positions)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'contact'
              ? 'bg-[#111D35] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4 text-purple-400" />
          <span>ช่องทางสมัครงาน & ติดต่อ HR</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LIVE INTERACTIVE PREVIEW (MATCHING SCREENSHOT 100%) */}
      {/* ========================================================================= */}
      {(activeTab === 'preview' || activeTab === 'all') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Page Preview (อิงตามโครงสร้างหน้าจริง GIS Group)
            </h2>
            <span className="text-xs text-slate-400">
              * ข้อมูลตรงกับรูปถ่ายและสามารถกดแก้ไขได้จากแท็บด้านบน
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-300">
            {/* ----------------- TOP SECTION (LIGHT) ----------------- */}
            <div className="bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/80 p-8 md:p-12 relative">
              {/* Subtle background engineering ceiling watermark overlay */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop')`
                }}
              />

              <div className="relative z-10 max-w-6xl mx-auto space-y-8">
                {/* Header Row: CAREER + Slogans */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gis-orange font-sans drop-shadow-xs">
                    {careerData.header?.title || "CAREER"}
                  </h1>
                  <div className="text-slate-700 text-sm md:text-base font-medium space-y-0.5 border-l-2 border-gis-orange/30 pl-4">
                    <p className="text-slate-800">
                      {careerData.header?.slogan1 || "If you're committed to great work, Consider joining our team."}
                    </p>
                    <p className="font-bold tracking-wide uppercase text-xs md:text-sm">
                      PROFESSIONAL TALENT AND COMMITMENT ARE A PRIORITY.{' '}
                      <span className="text-gis-orange font-black">WE OFFER.</span>
                    </p>
                  </div>
                </div>

                {/* 3 Benefit Cards with Gold Borders and Chamfered Accents */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {careerData.benefits?.map((benefit, idx) => (
                    <div
                      key={benefit.id || idx}
                      className="bg-white/95 backdrop-blur-xs rounded-xl border-2 border-amber-400 p-6 shadow-lg shadow-amber-400/5 relative hover:shadow-xl hover:border-amber-500 transition-all flex flex-col justify-between group"
                    >
                      {/* Decorative corner tag */}
                      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-lg">
                        <div className="w-12 h-12 bg-amber-400 rotate-45 transform origin-bottom-left -translate-y-6 opacity-30 group-hover:opacity-60 transition-opacity"></div>
                      </div>

                      <div>
                        {/* Title */}
                        <h3 className="text-base md:text-lg font-black tracking-wider text-gis-orange uppercase">
                          {benefit.title}
                        </h3>
                        {/* Subtitle */}
                        <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed min-h-[32px]">
                          {benefit.subtitle}
                        </p>

                        {/* Items in 2 columns */}
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-slate-700">
                          {benefit.items?.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-start gap-1.5">
                              <span className="text-amber-500 font-bold">•</span>
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom gold accent bar */}
                      <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-700 font-medium">
                        <span>{benefit.items?.length || 0} รายการสิทธิประโยชน์</span>
                        <span className="text-gis-orange group-hover:translate-x-1 transition-transform">★ GIS Standard</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------- BOTTOM SECTION (VIBRANT ORANGE) ----------------- */}
            <div className="bg-gradient-to-r from-orange-600 via-gis-orange to-amber-600 p-8 md:p-12 relative text-white">
              {/* Background structural warehouse truss overlay */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center mix-blend-overlay"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1600&auto=format&fit=crop')`
                }}
              />

              <div className="relative z-10 max-w-6xl mx-auto space-y-8">
                {/* Apply Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-white/20">
                  <div className="flex items-center gap-6 flex-wrap">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans drop-shadow-md">
                      {careerData.apply?.title || "APPLY"}
                    </h2>
                    <div>
                      <p className="text-xs md:text-sm font-semibold tracking-wider text-orange-100 uppercase">
                        {careerData.apply?.subtitle || "WHAT POSITION IS RIGHT FOR YOU?"}
                      </p>
                      <div className="flex items-center gap-4 mt-1 flex-wrap text-xs md:text-sm font-bold">
                        <a
                          href={`mailto:${careerData.apply?.email || 'HR.RECRUIT@GISGROUP.CO.TH'}`}
                          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-md backdrop-blur-xs transition-colors"
                        >
                          <Mail className="w-4 h-4 text-amber-200" />
                          <span>{careerData.apply?.email || "HR.RECRUIT@GISGROUP.CO.TH"}</span>
                        </a>
                        <a
                          href={`tel:${careerData.apply?.phone || '+66(0)2 682 1040-5'}`}
                          className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-md backdrop-blur-xs transition-colors"
                        >
                          <Phone className="w-4 h-4 text-amber-200" />
                          <span>{careerData.apply?.phone || "+66(0)2 682 1040-5"}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right quick apply button */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenAddModal('admin')}
                      className="px-4 py-2 bg-white text-gis-orange font-bold text-xs rounded-lg shadow hover:bg-amber-50 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      เพิ่มตำแหน่งงาน
                    </button>
                  </div>
                </div>

                {/* 3 Department Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {careerData.departments?.map((dept) => (
                    <div
                      key={dept.id}
                      className="bg-black/15 backdrop-blur-md rounded-xl border-2 border-amber-300/80 p-6 shadow-xl relative hover:border-white transition-all flex flex-col justify-between group"
                    >
                      {/* Chamfered decorative corner */}
                      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-lg pointer-events-none">
                        <div className="w-12 h-12 bg-amber-300 rotate-45 transform origin-bottom-left -translate-y-6 opacity-40"></div>
                      </div>

                      <div>
                        {/* Department Title */}
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <h3 className="text-sm md:text-base font-black leading-snug text-white tracking-wide">
                            {dept.name}
                          </h3>
                        </div>

                        {/* Positions 2 Columns */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs text-white/95">
                          {dept.positions?.map((pos, posIdx) => (
                            <div
                              key={posIdx}
                              onClick={() => handleOpenEditModal(dept.id, posIdx, pos)}
                              className="flex items-start gap-1.5 hover:text-amber-200 cursor-pointer transition-colors group/item"
                              title="คลิกเพื่อแก้ไขตำแหน่งนี้"
                            >
                              <span className="text-amber-300 font-bold">•</span>
                              <span className="leading-tight group-hover/item:underline">{pos}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Badge */}
                      <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-orange-100 font-medium">
                        <span>เปิดรับ {dept.positions?.length || 0} ตำแหน่ง</span>
                        <button
                          type="button"
                          onClick={() => handleOpenAddModal(dept.id)}
                          className="hover:text-white flex items-center gap-1 font-semibold underline text-amber-200"
                        >
                          + เพิ่มในแผนกนี้
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: BENEFITS & PERKS EDITOR */}
      {/* ========================================================================= */}
      {activeTab === 'benefits' && (
        <div className="space-y-6">
          {/* Header Texts */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gis-orange" />
              ข้อความหัวเรื่อง & สโลแกนหลัก (Main Header & Slogans)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ชื่อหัวข้อใหญ่ (Title)
                </label>
                <input
                  type="text"
                  value={careerData.header?.title || ''}
                  onChange={(e) =>
                    setCareerData((prev) => ({
                      ...prev,
                      header: { ...prev.header, title: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-gis-orange focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  สโลแกนแถวที่ 1 (Slogan 1)
                </label>
                <input
                  type="text"
                  value={careerData.header?.slogan1 || ''}
                  onChange={(e) =>
                    setCareerData((prev) => ({
                      ...prev,
                      header: { ...prev.header, slogan1: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  สโลแกนแถวที่ 2 (Slogan 2)
                </label>
                <input
                  type="text"
                  value={careerData.header?.slogan2 || ''}
                  onChange={(e) =>
                    setCareerData((prev) => ({
                      ...prev,
                      header: { ...prev.header, slogan2: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* 3 Benefit Cards Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {careerData.benefits?.map((benefit, bIdx) => (
              <div
                key={benefit.id || bIdx}
                className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-amber-100 text-amber-800">
                      Card {bIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddBenefitItem(bIdx)}
                      className="text-xs font-semibold text-gis-orange hover:text-orange-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> เพิ่มรายการ
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">หัวข้อการ์ด (Title)</label>
                    <input
                      type="text"
                      value={benefit.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCareerData((prev) => {
                          const next = [...prev.benefits];
                          next[bIdx].title = val;
                          return { ...prev, benefits: next };
                        });
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-gis-orange focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">คำอธิบายย่อย (Subtitle)</label>
                    <textarea
                      rows={2}
                      value={benefit.subtitle}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCareerData((prev) => {
                          const next = [...prev.benefits];
                          next[bIdx].subtitle = val;
                          return { ...prev, benefits: next };
                        });
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-600 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>

                  {/* List of items */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      รายการสวัสดิการ ({benefit.items?.length || 0})
                    </label>
                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                      {benefit.items?.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        >
                          <span className="font-medium text-slate-700 truncate">{item}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteBenefitItem(bIdx, iIdx)}
                            className="text-slate-400 hover:text-red-500 p-1"
                            title="ลบรายการนี้"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: OPEN POSITIONS BY DIVISION */}
      {/* ========================================================================= */}
      {activeTab === 'positions' && (
        <div className="space-y-6">
          {/* Department Filter Tabs */}
          <div className="flex items-center justify-between gap-4 flex-wrap bg-white rounded-xl shadow-xs border border-slate-200 p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                เลือกแผนก:
              </span>
              {[
                { id: 'all', label: 'ทุกแผนก (All Divisions)' },
                { id: 'admin', label: 'Business Support & Admin' },
                { id: 'epc', label: 'M&E Contractor EPC' },
                { id: 'ibt', label: 'Building Technologies IBT' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedDeptId(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedDeptId === tab.id
                      ? 'bg-gis-orange text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleOpenAddModal(selectedDeptId === 'all' ? 'admin' : selectedDeptId)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gis-orange text-white text-xs font-bold rounded-lg shadow-sm hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              เพิ่มตำแหน่งงานใหม่
            </button>
          </div>

          {/* Department Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {careerData.departments
              ?.filter((d) => selectedDeptId === 'all' || d.id === selectedDeptId)
              .map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col justify-between space-y-4"
                >
                  <div>
                    {/* Dept Header */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 text-gis-orange flex items-center justify-center font-bold text-xs">
                          {dept.id.toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">
                            {dept.name}
                          </h3>
                          <span className="text-[11px] text-slate-400">
                            {dept.positions?.length || 0} ตำแหน่งงานที่เปิดรับ
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenAddModal(dept.id)}
                        className="p-1.5 rounded-md hover:bg-orange-50 text-gis-orange"
                        title="เพิ่มตำแหน่งในแผนกนี้"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Positions List */}
                    <div className="mt-4 space-y-2">
                      {dept.positions?.map((pos, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg hover:border-orange-200 group transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-white border border-slate-300 text-[10px] font-bold text-slate-500 flex items-center justify-center shrink-0">
                              {pIdx + 1}
                            </span>
                            <span className="text-xs font-semibold text-slate-800 truncate">
                              {pos}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(dept.id, pIdx, pos)}
                              className="p-1 text-slate-400 hover:text-blue-600 hover:bg-white rounded-sm"
                              title="แก้ไขชื่อตำแหน่ง"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePosition(dept.id, pIdx)}
                              className="p-1 text-slate-400 hover:text-red-600 hover:bg-white rounded-sm"
                              title="ลบตำแหน่ง"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>สถานะ: เปิดรับสมัครต่อเนื่อง</span>
                    <span className="text-gis-orange font-semibold">Active</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: APPLY & HR CONTACT INFO */}
      {/* ========================================================================= */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Mail className="w-5 h-5 text-gis-orange" />
            <h2 className="text-base font-bold text-slate-900">
              ช่องทางการรับสมัครงาน & ข้อมูลติดต่อฝ่ายบุคคล (HR Information)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                หัวข้อหลักส่วนสมัครงาน (Apply Title)
              </label>
              <input
                type="text"
                value={careerData.apply?.title || ''}
                onChange={(e) =>
                  setCareerData((prev) => ({
                    ...prev,
                    apply: { ...prev.apply, title: e.target.value }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-gis-orange focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                สโลแกนส่วนสมัครงาน (Apply Subtitle)
              </label>
              <input
                type="text"
                value={careerData.apply?.subtitle || ''}
                onChange={(e) =>
                  setCareerData((prev) => ({
                    ...prev,
                    apply: { ...prev.apply, subtitle: e.target.value }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                อีเมลรับสมัครงาน (HR Recruitment Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={careerData.apply?.email || ''}
                  onChange={(e) =>
                    setCareerData((prev) => ({
                      ...prev,
                      apply: { ...prev.apply, email: e.target.value }
                    }))
                  }
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                * ผู้สมัครจะส่ง Resume และผลงาน Portfolio มาที่อีเมลนี้
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                เบอร์โทรศัพท์ติดต่อฝ่ายบุคคล (HR Hotline Phone)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={careerData.apply?.phone || ''}
                  onChange={(e) =>
                    setCareerData((prev) => ({
                      ...prev,
                      apply: { ...prev.apply, phone: e.target.value }
                    }))
                  }
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                * แสดงในแบนเนอร์ด้านล่างหน้า Career
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT POSITION */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gis-orange" />
                <h3 className="font-bold text-sm">
                  {editingPosition ? 'แก้ไขชื่อตำแหน่งงาน' : 'เพิ่มตำแหน่งงานใหม่'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePositionModal} className="p-6 space-y-4">
              {!editingPosition && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    เลือกแผนกที่ต้องการรับสมัคร
                  </label>
                  <select
                    value={targetDeptId}
                    onChange={(e) => setTargetDeptId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  >
                    <option value="admin">Business Support & Administration Department</option>
                    <option value="epc">Mechanical & Electrical (M&E) Contractor EPC Division</option>
                    <option value="ibt">Building Technologies System Integrator IBT Division</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ชื่อตำแหน่งงาน (ภาษาอังกฤษ หรือ ภาษาไทย)
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="เช่น Senior Electrical Engineer, Safety Officer..."
                  value={newPositionText}
                  onChange={(e) => setNewPositionText(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gis-orange hover:bg-orange-600 rounded-lg shadow-sm"
                >
                  {editingPosition ? 'บันทึกการแก้ไข' : 'เพิ่มตำแหน่ง'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
