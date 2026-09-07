import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { initialAboutSections } from '../data/aboutSectionsData';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { RichTextEditor } from '../components/common/RichTextEditor';
import {
  Save,
  Plus,
  Trash2,
  Users,
  Building2,
  Award,
  ShieldCheck,
  Lock,
  Trophy,
  HelpCircle,
  FileText,
  Leaf,
  Sparkles,
  ChevronRight,
  Bold,
  Italic,
  Underline,
  List,
  Link,
  Code,
  Globe,
  CheckCircle2,
  Eye,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const TAB_CONFIGS = [
  { id: 'about-us', label: 'About Us', labelTh: 'รู้จัก จีไอเอส', icon: Building2 },
  { id: 'org-structure', label: 'Organizational Structure', labelTh: 'โครงสร้างองค์กร', icon: Users },
  { id: 'ethics', label: 'Ethics', labelTh: 'จรรยาบรรณธุรกิจ', icon: ShieldCheck },
  { id: 'values', label: 'Values', labelTh: 'ค่านิยมองค์กร (G-I-S)', icon: Sparkles },
  { id: 'iso-9001', label: 'ISO 9001:2015', labelTh: 'มาตรฐาน ISO 9001', icon: Award },
  { id: 'iso-45001', label: 'ISO45001:2018', labelTh: 'มาตรฐาน ISO 45001', icon: Award },
  { id: 'iso-27001', label: 'ISO / IEC 27001:2022', labelTh: 'มาตรฐาน ISO 27001', icon: Lock },
  { id: 'achievement', label: 'Achievement', labelTh: 'ผลงานและความสำเร็จ', icon: Trophy },
  { id: 'why-choose', label: 'Why Choose', labelTh: 'ทำไมต้องเลือกเรา', icon: HelpCircle },
  { id: 'policy', label: 'Policy', labelTh: 'นโยบายองค์กร', icon: FileText },
  { id: 'carbon-footprint', label: 'Carbon Footprint', labelTh: 'คาร์บอนฟุตพริ้นท์', icon: Leaf }
];

export const AboutView = () => {
  const { currentContent, updateSection, activeView } = useAdmin();

  // Map sidebar activeView ID to tab ID
  const resolveInitialTab = () => {
    switch (activeView) {
      case 'about-org': return 'org-structure';
      case 'about-ethics': return 'ethics';
      case 'about-values': return 'values';
      case 'about-iso9001': return 'iso-9001';
      case 'about-iso45001': return 'iso-45001';
      case 'about-iso27001': return 'iso-27001';
      case 'about-achievement': return 'achievement';
      case 'about-why-choose': return 'why-choose';
      case 'about-policy': return 'policy';
      case 'about-carbon': return 'carbon-footprint';
      case 'about-us':
      default:
        return 'about-us';
    }
  };

  const [activeTab, setActiveTab] = useState(resolveInitialTab);
  
  // Dual Language Mode: 'dual' (both side by side / stacked), 'th' (Thai only), 'en' (English only)
  const [editorLang, setEditorLang] = useState('dual');

  // Load sections from admin context or fallback to initialAboutSections
  const [sectionsData, setSectionsData] = useState(() => {
    const fromContext = currentContent?.aboutSections || {};
    return { ...initialAboutSections, ...fromContext };
  });

  useEffect(() => {
    setActiveTab(resolveInitialTab());
  }, [activeView]);

  const activeSection = sectionsData[activeTab] || initialAboutSections[activeTab] || {};

  // Generic field updater
  const handleUpdateField = (field, val) => {
    setSectionsData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: val
      }
    }));
  };

  // Paragraphs TH updater
  const handleParagraphThChange = (idx, val) => {
    const list = [...(activeSection.paragraphsTh || activeSection.paragraphs || [])];
    list[idx] = val;
    handleUpdateField('paragraphsTh', list);
    handleUpdateField('paragraphs', list); // sync backward compat
  };

  // Paragraphs EN updater
  const handleParagraphEnChange = (idx, val) => {
    const list = [...(activeSection.paragraphsEn || [])];
    list[idx] = val;
    handleUpdateField('paragraphsEn', list);
  };

  const handleAddParagraph = () => {
    const listTh = [...(activeSection.paragraphsTh || activeSection.paragraphs || []), 'เพิ่มเนื้อหาย่อหน้าภาษาไทยใหม่ที่นี่...'];
    const listEn = [...(activeSection.paragraphsEn || []), 'Add new English detailed paragraph content here...'];
    handleUpdateField('paragraphsTh', listTh);
    handleUpdateField('paragraphs', listTh);
    handleUpdateField('paragraphsEn', listEn);
  };

  const handleDeleteParagraph = (idx) => {
    const listTh = (activeSection.paragraphsTh || activeSection.paragraphs || []).filter((_, i) => i !== idx);
    const listEn = (activeSection.paragraphsEn || []).filter((_, i) => i !== idx);
    handleUpdateField('paragraphsTh', listTh);
    handleUpdateField('paragraphs', listTh);
    handleUpdateField('paragraphsEn', listEn);
  };

  // Why Choose reasons updater
  const handleReasonThChange = (idx, val) => {
    const list = [...(activeSection.reasonsTh || [])];
    list[idx] = val;
    handleUpdateField('reasonsTh', list);
  };

  const handleReasonEnChange = (idx, val) => {
    const list = [...(activeSection.reasonsEn || [])];
    list[idx] = val;
    handleUpdateField('reasonsEn', list);
  };

  const handleAddReason = () => {
    const listTh = [...(activeSection.reasonsTh || []), 'จุดเด่นและเหตุผลสำคัญข้อใหม่ (ภาษาไทย)'];
    const listEn = [...(activeSection.reasonsEn || []), 'New key differentiator and reason (English)'];
    handleUpdateField('reasonsTh', listTh);
    handleUpdateField('reasonsEn', listEn);
  };

  const handleDeleteReason = (idx) => {
    const listTh = (activeSection.reasonsTh || []).filter((_, i) => i !== idx);
    const listEn = (activeSection.reasonsEn || []).filter((_, i) => i !== idx);
    handleUpdateField('reasonsTh', listTh);
    handleUpdateField('reasonsEn', listEn);
  };

  // Org members updater
  const handleMemberChange = (idx, field, val) => {
    const list = [...(activeSection.members || [])];
    list[idx] = { ...list[idx], [field]: val };
    handleUpdateField('members', list);
  };

  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      nameTh: 'ชื่อ-นามสกุล ผู้บริหารใหม่',
      nameEn: 'New Executive Name',
      roleTh: 'ตำแหน่งหน้าที่',
      roleEn: 'Position / Department Role',
      educationTh: 'วุฒิการศึกษา',
      educationEn: 'Education & Degree',
      experienceTh: 'ประวัติและประสบการณ์ทำงาน',
      experienceEn: 'Professional Experience',
      specialtyTh: 'ความเชี่ยวชาญพิเศษ',
      specialtyEn: 'Specialty & Core Competencies'
    };
    handleUpdateField('members', [...(activeSection.members || []), newMember]);
  };

  const handleDeleteMember = (idx) => {
    const list = (activeSection.members || []).filter((_, i) => i !== idx);
    handleUpdateField('members', list);
  };

  // Awards updater
  const handleAwardChange = (idx, field, val) => {
    const list = [...(activeSection.awards || [])];
    list[idx] = { ...list[idx], [field]: val };
    handleUpdateField('awards', list);
  };

  const handleAddAward = () => {
    const newAward = {
      id: Date.now(),
      titleTh: 'ชื่อรางวัลหรือใบรับรองใหม่',
      titleEn: 'New Award or Certificate Name',
      subtitleTh: 'องค์กรที่มอบรางวัล',
      subtitleEn: 'Awarding Organization / Issuer',
      category: 'Recognition',
      year: '2026',
      descTh: 'รายละเอียดและเกียรติประวัติของรางวัล',
      descEn: 'Award description and achievement significance'
    };
    handleUpdateField('awards', [...(activeSection.awards || []), newAward]);
  };

  const handleDeleteAward = (idx) => {
    const list = (activeSection.awards || []).filter((_, i) => i !== idx);
    handleUpdateField('awards', list);
  };

  // Save to AdminContext and LocalStorage
  const handleSave = () => {
    updateSection('aboutSections', sectionsData);
    try {
      const stored = localStorage.getItem('GIS_ADMIN_DATA_V1');
      let obj = stored ? JSON.parse(stored) : {};
      obj.aboutSections = sectionsData;
      localStorage.setItem('GIS_ADMIN_DATA_V1', JSON.stringify(obj));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">จัดการข้อมูลเกี่ยวกับเรา (About GIS Group)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gis-orange/10 text-gis-orange border border-gis-orange/30">
              รองรับ 2 ภาษา (TH / EN)
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            แก้ไขและจัดการเนื้อหาทั้ง 11 หมวดหมู่ พร้อมทั้งรองรับข้อมูลภาษาไทยและภาษาอังกฤษครบทุกฟิลด์
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-gis-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกข้อมูล (Save)</span>
          </button>
        </div>
      </div>

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 11 Navigation Menu Tabs */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 pb-1">
            เลือกหัวข้อย่อย (11 หมวดหมู่หลัก)
          </div>

          <div className="space-y-1.5 max-h-[780px] overflow-y-auto sidebar-scroll pr-1">
            {TAB_CONFIGS.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-gis-orange to-amber-500 text-white border-transparent shadow-md shadow-orange-500/20 font-bold scale-[1.01]'
                      : 'bg-white text-slate-700 hover:bg-orange-50/50 hover:border-orange-200 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange-100/70 text-gis-orange group-hover:bg-orange-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs truncate">{tab.label}</div>
                      <div className={`text-[10px] truncate ${isActive ? 'text-white/80 font-normal' : 'text-slate-400'}`}>
                        {tab.labelTh}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editor Form with Bilingual Controls */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          
          {/* Section Header & Dual Language Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-gis-orange uppercase tracking-wider">
                {activeSection.tagTh || activeSection.tag || "ABOUT SECTION"}
              </span>
              <h2 className="text-lg font-bold text-slate-800">
                {activeSection.titleTh || activeSection.title || activeSection.menuTitle || activeTab}
              </h2>
            </div>

            {/* Language Mode Selector Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setEditorLang('dual')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  editorLang === 'dual'
                    ? 'bg-white text-gis-orange shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Globe size={13} />
                <span>ทั้งสองภาษา (TH / EN)</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorLang('th')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  editorLang === 'th'
                    ? 'bg-white text-gis-orange shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>🇹🇭 ภาษาไทย</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorLang('en')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  editorLang === 'en'
                    ? 'bg-white text-gis-orange shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>🇬🇧 English</span>
              </button>
            </div>
          </div>

          {/* Core Title & Tag Fields */}
          <div className="space-y-4">
            
            {/* THAI FIELDS (Shown in 'dual' or 'th' mode) */}
            {(editorLang === 'dual' || editorLang === 'th') && (
              <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gis-orange flex items-center gap-1.5">
                    <span>🇹🇭</span>
                    <span>ข้อมูลภาษาไทย (Thai Content)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">THAI LANGUAGE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">หัวข้อภาษาไทย (Title TH)</label>
                    <input
                      type="text"
                      value={activeSection.titleTh || activeSection.title || ''}
                      onChange={(e) => {
                        handleUpdateField('titleTh', e.target.value);
                        handleUpdateField('title', e.target.value);
                      }}
                      className="w-full text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">แท็กหัวข้อย่อยภาษาไทย (Tag TH)</label>
                    <input
                      type="text"
                      value={activeSection.tagTh || activeSection.tag || ''}
                      onChange={(e) => {
                        handleUpdateField('tagTh', e.target.value);
                        handleUpdateField('tag', e.target.value);
                      }}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-mono focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <RichTextEditor
                    label="คำโปรยสรุปภาษาไทย (Summary Description TH)"
                    value={activeSection.descTh || activeSection.desc || ''}
                    onChange={(html) => {
                      handleUpdateField('descTh', html);
                      handleUpdateField('desc', html);
                    }}
                    lang="th"
                    rows={2}
                    placeholder="พิมพ์คำโปรยสรุปภาษาไทย..."
                  />
                </div>
              </div>
            )}

            {/* ENGLISH FIELDS (Shown in 'dual' or 'en' mode) */}
            {(editorLang === 'dual' || editorLang === 'en') && (
              <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                    <span>🇬🇧</span>
                    <span>ข้อมูลภาษาอังกฤษ (English Content)</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">ENGLISH LANGUAGE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">หัวข้อภาษาอังกฤษ (Title EN)</label>
                    <input
                      type="text"
                      value={activeSection.titleEn || activeSection.menuTitleEn || ''}
                      onChange={(e) => handleUpdateField('titleEn', e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g. About Us, Organizational Structure, Ethics..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">แท็กภาษาอังกฤษ (Tag EN)</label>
                    <input
                      type="text"
                      value={activeSection.tagEn || ''}
                      onChange={(e) => handleUpdateField('tagEn', e.target.value)}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g. WHO WE ARE, ORGANIZATION CHART..."
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <RichTextEditor
                    label="คำโปรยสรุปภาษาอังกฤษ (Summary Description EN)"
                    value={activeSection.descEn || ''}
                    onChange={(html) => handleUpdateField('descEn', html)}
                    lang="en"
                    rows={2}
                    placeholder="Brief introductory summary in English..."
                  />
                </div>
              </div>
            )}

          </div>

          {/* ============================================================ */}
          {/* TAB-SPECIFIC EDITORS */}
          {/* ============================================================ */}

          {/* 1. ORGANIZATIONAL STRUCTURE: Executive Members Editor */}
          {activeTab === 'org-structure' && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">รายชื่อคณะผู้บริหาร (Executive Team Members)</h3>
                  <p className="text-[11px] text-slate-500">จัดการรายชื่อ ตำแหน่ง วุฒิการศึกษา และความเชี่ยวชาญทั้ง 2 ภาษา</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="text-xs bg-orange-50 text-gis-orange hover:bg-orange-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>เพิ่มผู้บริหาร</span>
                </button>
              </div>

              <div className="space-y-4">
                {(activeSection.members || []).map((m, idx) => (
                  <div key={m.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gis-orange text-white text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{m.nameTh || m.name || 'ผู้บริหาร'} / {m.roleTh || m.role}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDeleteMember(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="ลบผู้บริหารท่านนี้"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">ชื่อ-นามสกุล (ภาษาไทย)</label>
                        <input
                          type="text"
                          value={m.nameTh || m.name || ''}
                          onChange={(e) => handleMemberChange(idx, 'nameTh', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">Name in English (EN)</label>
                        <input
                          type="text"
                          value={m.nameEn || ''}
                          onChange={(e) => handleMemberChange(idx, 'nameEn', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">ตำแหน่งหน้าที่ (ภาษาไทย)</label>
                        <input
                          type="text"
                          value={m.roleTh || m.role || ''}
                          onChange={(e) => handleMemberChange(idx, 'roleTh', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">Position / Role (EN)</label>
                        <input
                          type="text"
                          value={m.roleEn || ''}
                          onChange={(e) => handleMemberChange(idx, 'roleEn', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">วุฒิการศึกษา (TH)</label>
                        <input
                          type="text"
                          value={m.educationTh || m.education || ''}
                          onChange={(e) => handleMemberChange(idx, 'educationTh', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">Education (EN)</label>
                        <input
                          type="text"
                          value={m.educationEn || ''}
                          onChange={(e) => handleMemberChange(idx, 'educationEn', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">ประสบการณ์ทำงาน (TH / EN)</label>
                        <textarea
                          rows={2}
                          value={m.experienceTh || m.experience || ''}
                          onChange={(e) => handleMemberChange(idx, 'experienceTh', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded p-2"
                          placeholder="รายละเอียดประสบการณ์ทำงาน..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. ETHICS: 3 Pillars Editor */}
          {activeTab === 'ethics' && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">
                หลักจรรยาบรรณ 3 ประการ (3 Ethical Pillars: Conduct, Vision, Mission)
              </h3>
              
              <div className="space-y-4">
                {(activeSection.blocks || []).map((b, idx) => (
                  <div key={b.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-gis-orange text-white text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{b.badgeTh} / {b.badgeEn}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">ชื่อแถบหัวข้อ (TH)</label>
                        <input
                          type="text"
                          value={b.badgeTh || ''}
                          onChange={(e) => {
                            const updated = [...activeSection.blocks];
                            updated[idx].badgeTh = e.target.value;
                            handleUpdateField('blocks', updated);
                          }}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-600">Badge Label (EN)</label>
                        <input
                          type="text"
                          value={b.badgeEn || ''}
                          onChange={(e) => {
                            const updated = [...activeSection.blocks];
                            updated[idx].badgeEn = e.target.value;
                            handleUpdateField('blocks', updated);
                          }}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">รายละเอียดภาษาไทย (TH)</label>
                      <textarea
                        rows={2}
                        value={b.textTh || b.text || ''}
                        onChange={(e) => {
                          const updated = [...activeSection.blocks];
                          updated[idx].textTh = e.target.value;
                          handleUpdateField('blocks', updated);
                        }}
                        className="w-full text-xs bg-white border border-slate-300 rounded p-2.5"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-600">Description in English (EN)</label>
                      <textarea
                        rows={2}
                        value={b.textEn || ''}
                        onChange={(e) => {
                          const updated = [...activeSection.blocks];
                          updated[idx].textEn = e.target.value;
                          handleUpdateField('blocks', updated);
                        }}
                        className="w-full text-xs bg-white border border-slate-300 rounded p-2.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ACHIEVEMENT: Awards & Recognition Editor */}
          {activeTab === 'achievement' && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">รายการรางวัลและเกียรติประวัติ (Awards & Achievements)</h3>
                  <p className="text-[11px] text-slate-500">จัดการใบรับรองและรางวัลเกียรติยศที่แสดงในหน้าเว็บ</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddAward}
                  className="text-xs bg-orange-50 text-gis-orange hover:bg-orange-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>เพิ่มรางวัล</span>
                </button>
              </div>

              <div className="space-y-3">
                {(activeSection.awards || []).map((aw, idx) => (
                  <div key={aw.id || idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                        <Trophy size={15} className="text-[#EA580C]" />
                        <span>#{idx + 1} {aw.titleTh || aw.title}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteAward(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500">ชื่อรางวัล (TH)</label>
                        <input
                          type="text"
                          value={aw.titleTh || aw.title || ''}
                          onChange={(e) => handleAwardChange(idx, 'titleTh', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500">Award Title (EN)</label>
                        <input
                          type="text"
                          value={aw.titleEn || ''}
                          onChange={(e) => handleAwardChange(idx, 'titleEn', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 font-bold"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-semibold text-slate-500">คำอธิบายรางวัล (TH / EN)</label>
                        <input
                          type="text"
                          value={aw.descTh || aw.desc || ''}
                          onChange={(e) => handleAwardChange(idx, 'descTh', e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. WHY CHOOSE: 8 Reasons Editor */}
          {activeTab === 'why-choose' && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">จุดเด่น 8 ประการ (Why Choose Reasons)</h3>
                  <p className="text-[11px] text-slate-500">จัดการข้อความจุดเด่นพร้อมคำแปลภาษาอังกฤษ</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddReason}
                  className="text-xs bg-orange-50 text-gis-orange hover:bg-orange-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>เพิ่มจุดเด่น</span>
                </button>
              </div>

              <div className="space-y-3">
                {(activeSection.reasonsTh || activeSection.reasons || []).map((rTh, idx) => {
                  const rEn = (activeSection.reasonsEn || [])[idx] || '';

                  return (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <HelpCircle size={15} className="text-[#EA580C]" />
                          <span>ข้อที่ {idx + 1}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteReason(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <textarea
                          rows={2}
                          value={rTh}
                          onChange={(e) => handleReasonThChange(idx, e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded p-2.5"
                          placeholder="ข้อความภาษาไทย..."
                        />
                        <textarea
                          rows={2}
                          value={rEn}
                          onChange={(e) => handleReasonEnChange(idx, e.target.value)}
                          className="w-full text-xs bg-white border border-blue-200 rounded p-2.5 text-blue-900"
                          placeholder="English translation..."
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. GENERAL PARAGRAPHS (For About Us, ISO, Policy, Carbon Footprint) */}
          {activeTab !== 'org-structure' && activeTab !== 'ethics' && activeTab !== 'achievement' && activeTab !== 'why-choose' && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    เนื้อหาย่อหน้าแบบละเอียด (Detailed Paragraphs - TH & EN)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    จัดการย่อหน้าเนื้อหาทั้งหมดของส่วนนี้ สามารถแยกพิมพ์ทั้งภาษาไทยและภาษาอังกฤษ
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddParagraph}
                  className="text-xs bg-orange-50 text-gis-orange hover:bg-orange-100 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>เพิ่มย่อหน้า</span>
                </button>
              </div>

              <div className="space-y-4">
                {(activeSection.paragraphsTh || activeSection.paragraphs || []).map((pTh, idx) => {
                  const pEn = (activeSection.paragraphsEn || [])[idx] || '';

                  return (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="w-5 h-5 rounded-full bg-gis-orange text-white text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteParagraph(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Thai Paragraph Rich Text Editor */}
                      {(editorLang === 'dual' || editorLang === 'th') && (
                        <RichTextEditor
                          label={`ย่อหน้าที่ ${idx + 1} (ภาษาไทย)`}
                          value={pTh}
                          onChange={(html) => handleParagraphThChange(idx, html)}
                          lang="th"
                          rows={3}
                          placeholder="พิมพ์เนื้อหาย่อหน้าภาษาไทย พร้อมตกแต่งขนาด สี หรือหัวข้อย่อย..."
                        />
                      )}

                      {/* English Paragraph Rich Text Editor */}
                      {(editorLang === 'dual' || editorLang === 'en') && (
                        <RichTextEditor
                          label={`Paragraph ${idx + 1} (English)`}
                          value={pEn}
                          onChange={(html) => handleParagraphEnChange(idx, html)}
                          lang="en"
                          rows={3}
                          placeholder="Enter English paragraph with styles, colors, or lists..."
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Save Action Bar */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>ระบบบันทึกอัตโนมัติลงใน LocalStorage (GIS_ADMIN_DATA_V1)</span>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-gis-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกการแก้ไขทั้งหมด</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
