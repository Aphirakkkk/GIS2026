import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { initialProjectsReferenceData, projectCategories } from '../data/projectsReferenceData';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { RichTextEditor } from '../components/common/RichTextEditor';
import {
  Save,
  Plus,
  Trash2,
  Edit3,
  Eye,
  FolderGit2,
  MapPin,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Coins,
  Calendar,
  CheckCircle2,
  Sparkles,
  Building2,
  Star
} from 'lucide-react';

export const ProjectsView = () => {
  const { currentContent, updateSection, lang, setIsPreviewOpen, activeView, showToast, showConfirm } = useAdmin();

  // Load projectsReferenceData with fallback
  const [data, setData] = useState(() => {
    return currentContent?.projectsReferenceData || initialProjectsReferenceData;
  });

  const projectsList = data.projects || [];

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected project for Screenshot 2 Lightbox Modal Preview
  const [previewProject, setPreviewProject] = useState(null);

  // Selected project for Form Editing Drawer
  const [editingProject, setEditingProject] = useState(null);

  // Sync category filter when sidebar sub-menu is clicked
  useEffect(() => {
    if (!activeView) return;
    if (activeView === 'projects') {
      setSelectedCategory('all');
    } else if (activeView.startsWith('projects-')) {
      const catKey = activeView.replace('projects-', '');
      setSelectedCategory(catKey);
    }
  }, [activeView]);

  // Keep local state in sync when global lang changes
  useEffect(() => {
    if (currentContent?.projectsReferenceData) {
      setData(currentContent.projectsReferenceData);
    }
  }, [currentContent, lang]);

  // Save changes to AdminContext
  const handleSave = () => {
    updateSection('projectsReferenceData', data);
  };

  // Reset to default
  const handleReset = async () => {
    const confirmed = await showConfirm({
      title: 'คืนค่าผลงานโครงการเริ่มต้น',
      message: 'คุณต้องการคืนค่าผลงานโครงการทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่? ข้อมูลโครงการที่เพิ่มหรือแก้ไขไว้จะถูกแทนที่',
      confirmText: 'คืนค่าเริ่มต้น',
      cancelText: 'ยกเลิก',
      type: 'warning'
    });

    if (confirmed) {
      setData(initialProjectsReferenceData);
      setSelectedCategory('all');
      showToast('คืนค่าผลงานโครงการกลับเป็นค่าเริ่มต้นสำเร็จ', 'info');
    }
  };

  // Filter projects by category and search
  const filteredProjects = projectsList.filter(p => {
    const matchesCat =
      selectedCategory === 'all' ||
      (selectedCategory === 'highlight' && p.isHighlight) ||
      p.category === selectedCategory;

    const matchesSearch =
      searchQuery === '' ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.segment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.owner?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  // Add new project
  const handleAddNew = () => {
    const newId = Date.now();
    const newProj = {
      id: newId,
      title: "โครงการใหม่อ้างอิง (New Project)",
      segment: selectedCategory !== 'all' ? projectCategories.find(c => c.id === selectedCategory)?.label : "Commercial",
      category: selectedCategory !== 'all' && selectedCategory !== 'highlight' ? selectedCategory : "commercial",
      owner: "COMPANY / OWNER NAME",
      projectValue: "30",
      valueUnit: "Million Baht",
      startYear: "2022",
      completionYear: "2024",
      scope: "งานออกแบบและติดตั้งระบบวิศวกรรมประกอบอาคาร (MEP) และระบบปรับอากาศประหยัดพลังงาน",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format&fit=crop",
      clientName: "Client",
      isHighlight: selectedCategory === 'highlight'
    };

    const updated = [newProj, ...projectsList];
    setData(prev => ({ ...prev, projects: updated }));
    setEditingProject(newProj);
    showToast('เพิ่มโครงการใหม่แล้ว กรุณากรอกรายละเอียดในแผงด้านขวา', 'success');
  };

  // Delete project
  const handleDelete = async (id) => {
    const targetProj = projectsList.find(p => p.id === id);
    const title = targetProj?.title || 'โครงการนี้';

    const confirmed = await showConfirm({
      title: 'ยืนยันการลบโครงการ',
      message: `คุณต้องการลบโครงการ "${title}" ใช่หรือไม่? ข้อมูลของโครงการนี้จะถูกลบออกจากระบบอย่างถาวร`,
      confirmText: 'ยืนยันการลบ',
      cancelText: 'ยกเลิก',
      type: 'danger'
    });

    if (confirmed) {
      const updated = projectsList.filter(p => p.id !== id);
      setData(prev => ({ ...prev, projects: updated }));
      if (editingProject?.id === id) setEditingProject(null);
      if (previewProject?.id === id) setPreviewProject(null);
      showToast(`ลบโครงการ "${title}" เรียบร้อยแล้ว`, 'success');
    }
  };

  // Update field of project being edited
  const handleUpdateProjectField = (id, field, value) => {
    const updated = projectsList.map(p => p.id === id ? { ...p, [field]: value } : p);
    setData(prev => ({ ...prev, projects: updated }));
    if (editingProject?.id === id) {
      setEditingProject(prev => ({ ...prev, [field]: value }));
    }
    if (previewProject?.id === id) {
      setPreviewProject(prev => ({ ...prev, [field]: value }));
    }
  };

  // Diamond Cluster Categories Definition for Screenshot 1
  const diamondCategories = [
    { id: 'highlight', label: 'Highlight Project', highlight: true },
    { id: 'residential', label: 'Residential' },
    { id: 'health-education', label: 'Health & Education' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'government', label: 'Government' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'critical-space', label: 'Critical Space' },
    { id: 'construction', label: 'Construction' },
    { id: 'others', label: 'Others' },
    { id: 'hotel-leisure', label: 'Hotel & Leisure' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">ผลงานโครงการอ้างอิง (Projects Reference)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {projectsList.length} โครงการในระบบ
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            คลิกภาพเพื่อดูหน้าต่างป๊อปอัปรายละเอียดโครงการ (EnCo, Nestlé, AIS, สสส., PTT) และปรับแต่งมูลค่าโครงการ ปีที่แล้วเสร็จ
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-gradient-to-r from-gis-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกโครงการทั้งหมด</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🌟 LIVE VISUAL PREVIEW: MATCHES SCREENSHOT 1 EXACTLY 🌟       */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Preview Badge Header */}
        <div className="bg-slate-900 px-6 py-3 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Live Interactive Preview (ตัวอย่างการแสดงผลหน้าเว็บจริง)</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">— คลิกที่รูปภาพเพื่อเปิดหน้าต่างป๊อปอัปตามภาพตัวอย่างที่ 2</span>
          </div>
          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-orange-400 font-mono">
            Interactive Lightbox Ready
          </span>
        </div>

        {/* Main Section Background with Faint Blueprint Texture */}
        <div className="p-6 md:p-10 bg-gradient-to-r from-slate-100/70 via-slate-50/50 to-slate-100/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
            {/* Left Column: Diamond Categories & Title */}
            <div className="xl:col-span-5 flex flex-col items-center justify-center space-y-6">
              {/* Diamond Category Cluster */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 p-3 sm:p-4 bg-white/70 backdrop-blur-xs rounded-3xl border border-slate-200/80 shadow-inner">
                {diamondCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const isTopHighlight = cat.highlight;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`group relative p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center text-center select-none shadow-sm ${
                        isSelected
                          ? isTopHighlight
                            ? 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black ring-2 ring-orange-400 shadow-md shadow-orange-500/30'
                            : 'bg-slate-800 text-white font-bold ring-2 ring-slate-700'
                          : isTopHighlight
                            ? 'bg-gradient-to-tr from-orange-500/90 to-amber-500/90 text-white hover:opacity-100 font-bold'
                            : 'bg-slate-400/80 hover:bg-slate-500 text-white'
                      }`}
                    >
                      <span className="text-[10px] sm:text-[11px] leading-tight drop-shadow-xs">
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Center Title with Arrows */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#EA580C] uppercase tracking-wider font-sans drop-shadow-xs">
                    {data.sectionTitle || 'PROJECTS REFERENCE'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    แสดงหมวด: <span className="font-bold text-slate-800 uppercase">{selectedCategory}</span> ({filteredProjects.length} โครงการ)
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = diamondCategories.findIndex(c => c.id === selectedCategory);
                      const prevIdx = (idx - 1 + diamondCategories.length) % diamondCategories.length;
                      setSelectedCategory(diamondCategories[prevIdx].id);
                    }}
                    className="w-8 h-8 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
                    title="หมวดหมู่ก่อนหน้า"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const idx = diamondCategories.findIndex(c => c.id === selectedCategory);
                      const nextIdx = (idx + 1) % diamondCategories.length;
                      setSelectedCategory(diamondCategories[nextIdx].id);
                    }}
                    className="w-8 h-8 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
                    title="หมวดหมู่ถัดไป"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 3x3 Project Grid */}
            <div className="xl:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                {filteredProjects.slice(0, 9).map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setPreviewProject(proj)}
                    className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 bg-white cursor-pointer transition-all transform hover:-translate-y-1"
                  >
                    {/* Project Photo Aspect 16:11 */}
                    <div className="aspect-[16/11] bg-slate-800 overflow-hidden relative">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Top Right Logo Pill */}
                      {proj.clientName && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-slate-800 shadow flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          <span dangerouslySetInnerHTML={{ __html: proj.clientName }} />
                        </div>
                      )}

                      {/* Bottom Info on Card */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                        <span className="text-[9px] uppercase tracking-wider text-amber-300 font-bold block truncate">
                          {proj.segment}
                        </span>
                        <h4
                          className="text-xs font-black truncate leading-tight"
                          dangerouslySetInnerHTML={{ __html: proj.title }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                  <p className="text-sm font-semibold text-slate-500">ไม่พบโครงการในหมวดหมู่นี้</p>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="mt-2 text-xs font-bold text-orange-600 hover:underline"
                  >
                    ดูโครงการทั้งหมด
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🌟 LIGHTBOX MODAL: MATCHES SCREENSHOT 2 EXACTLY 🌟           */}
      {/* ============================================================ */}
      {previewProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          {/* Modal Container */}
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 flex flex-col">
            {/* Top Close [X] Button */}
            <button
              type="button"
              onClick={() => setPreviewProject(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
              title="ปิดหน้าต่าง"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Project Site Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              <img
                src={previewProject.image}
                alt={previewProject.title}
                className="w-full h-full object-cover"
              />

              {/* Top Right Client Logo (e.g. EnCo oval badge from screenshot 2) */}
              <div className="absolute top-4 right-14 sm:right-16 z-20">
                <div className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-slate-200 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-black">
                    G
                  </div>
                  <span
                    className="font-black text-sm sm:text-base tracking-wider text-slate-800"
                    dangerouslySetInnerHTML={{ __html: previewProject.clientName || 'CLIENT LOGO' }}
                  />
                </div>
              </div>

              {/* Bottom Orange Semi-Transparent Bar (Screenshot 2) */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#EA580C]/90 via-[#F97316]/90 to-[#FB923C]/90 backdrop-blur-md text-white p-4 sm:p-6 shadow-2xl border-t border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Left Column: Segment, Project Name, Project Owner */}
                  <div className="md:col-span-7 space-y-1">
                    <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-100">
                      Segment : {previewProject.segment}
                    </div>
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide uppercase drop-shadow-sm font-sans"
                      dangerouslySetInnerHTML={{ __html: previewProject.title }}
                    />
                    <div className="text-[10px] sm:text-xs text-white/90 font-light truncate">
                      Project Owner : <span dangerouslySetInnerHTML={{ __html: previewProject.owner }} />
                    </div>
                  </div>

                  {/* Right Column: 3 Circular Metric Badges */}
                  <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-5 sm:gap-7">
                    {/* Metric 1: Project Value */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/80 flex items-center justify-center bg-white/10 mb-1 shadow-inner">
                        <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-amber-100 font-semibold">
                        Project Value
                      </span>
                      <span className="text-base sm:text-lg font-black text-white leading-tight">
                        {previewProject.projectValue}
                      </span>
                      <span className="text-[8px] text-white/80">
                        {previewProject.valueUnit || 'Million Baht'}
                      </span>
                    </div>

                    {/* Metric 2: Start Project */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/80 flex items-center justify-center bg-white/10 mb-1 shadow-inner">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-amber-100 font-semibold">
                        Start Project
                      </span>
                      <span className="text-base sm:text-lg font-black text-white leading-tight">
                        {previewProject.startYear}
                      </span>
                    </div>

                    {/* Metric 3: Completion */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/80 flex items-center justify-center bg-white/10 mb-1 shadow-inner">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-amber-100 font-semibold">
                        Completion
                      </span>
                      <span className="text-base sm:text-lg font-black text-white leading-tight">
                        {previewProject.completionYear}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Bar: Edit Button & Close */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>คลิก &ldquo;แก้ไขโครงการนี้&rdquo; เพื่อเปลี่ยนข้อความ รูปภาพ หรือมูลค่าโครงการ</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(previewProject);
                    setPreviewProject(null);
                  }}
                  className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>แก้ไขโครงการนี้</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-colors"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🛠️ PROJECTS MANAGEMENT TABLE & CONTROLS 🛠️                    */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              ตารางบริหารจัดการโครงการทั้งหมด (Projects Database)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              เพิ่ม ลบ และปรับแต่งข้อมูลโครงการสำหรับแสดงผลในหน้าเว็บหลัก
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNew}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มโครงการใหม่</span>
          </button>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อโครงการ, เจ้าของงาน, หรือหมวดหมู่..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full sidebar-scroll">
            {projectCategories.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image with overlay badge */}
              <div className="h-44 relative bg-slate-900 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {proj.segment}
                </span>
                {proj.isHighlight && (
                  <span className="absolute top-2.5 right-2.5 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 fill-white" />
                    Highlight
                  </span>
                )}
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4
                    className="text-sm font-bold text-slate-800 line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: proj.title }}
                  />
                  <p className="text-xs text-slate-500 line-clamp-1">
                    เจ้าของ: <span dangerouslySetInnerHTML={{ __html: proj.owner }} />
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-600 pt-1 font-mono">
                    <span>มูลค่า: <b>{proj.projectValue}</b> ลบ.</span>
                    <span>ปี: <b>{proj.startYear} - {proj.completionYear}</b></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setPreviewProject(proj)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>ดูหน้าต่างป๊อปอัป</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditingProject(proj)}
                      className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded"
                      title="แก้ไขข้อมูล"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                      title="ลบโครงการ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* ✍️ EDIT PROJECT MODAL DRAWER ✍️                               */}
      {/* ============================================================ */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-bold text-slate-800">
                  แก้ไขข้อมูลโครงการ: {editingProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <RichTextEditor
                    label="ชื่อโครงการ (Project Name)"
                    value={editingProject.title || ''}
                    onChange={(val) => handleUpdateProjectField(editingProject.id, 'title', val)}
                    placeholder="เช่น ENCO-PTTOR"
                    compact={true}
                    singleLine={true}
                    minHeight="38px"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">หมวดหมู่โครงการ (Segment / Category)</label>
                  <select
                    value={editingProject.category || 'commercial'}
                    onChange={(e) => {
                      const cat = projectCategories.find(c => c.id === e.target.value);
                      handleUpdateProjectField(editingProject.id, 'category', e.target.value);
                      if (cat) handleUpdateProjectField(editingProject.id, 'segment', cat.label);
                    }}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                  >
                    {projectCategories.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <RichTextEditor
                    label="เจ้าของโครงการ (Project Owner)"
                    value={editingProject.owner || ''}
                    onChange={(val) => handleUpdateProjectField(editingProject.id, 'owner', val)}
                    placeholder="เช่น ENERGY COMPLEX COMPANY LIMITED"
                    compact={true}
                    singleLine={true}
                    minHeight="38px"
                  />
                </div>

                <div className="space-y-1">
                  <RichTextEditor
                    label="ชื่อแบรนด์ลูกค้า / โลโก้ (Client Name)"
                    value={editingProject.clientName || ''}
                    onChange={(val) => handleUpdateProjectField(editingProject.id, 'clientName', val)}
                    placeholder="เช่น EnCo, Nestlé, AIS, PTT"
                    compact={true}
                    singleLine={true}
                    minHeight="38px"
                  />
                </div>
              </div>

              {/* 3 Metric Fields from Screenshot 2 */}
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200/70 space-y-3">
                <span className="text-xs font-bold text-orange-800 block">
                  ตัวเลขสถิติโครงการ 3 ช่อง (Key Project Metrics)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">มูลค่าโครงการ (Project Value)</label>
                    <input
                      type="text"
                      value={editingProject.projectValue || ''}
                      onChange={(e) => handleUpdateProjectField(editingProject.id, 'projectValue', e.target.value)}
                      placeholder="เช่น 29 (ล้านบาท)"
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">ปีที่เริ่ม (Start Project)</label>
                    <input
                      type="text"
                      value={editingProject.startYear || ''}
                      onChange={(e) => handleUpdateProjectField(editingProject.id, 'startYear', e.target.value)}
                      placeholder="เช่น 2019"
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700">ปีที่แล้วเสร็จ (Completion)</label>
                    <input
                      type="text"
                      value={editingProject.completionYear || ''}
                      onChange={(e) => handleUpdateProjectField(editingProject.id, 'completionYear', e.target.value)}
                      placeholder="เช่น 2022"
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Scope of Work */}
              <div className="space-y-1">
                <RichTextEditor
                  label="ขอบเขตงานวิศวกรรม (Scope of Work)"
                  value={editingProject.scope || ''}
                  onChange={(val) => handleUpdateProjectField(editingProject.id, 'scope', val)}
                  placeholder="รายละเอียดงานติดตั้งและระบบวิศวกรรม..."
                  compact={true}
                  rows={3}
                />
              </div>

              {/* Images */}
              <div className="space-y-4">
                <ImageUploadField
                  label="รูปภาพหน้างาน / อาคารโครงการ (Project Site Image)"
                  value={editingProject.image || ''}
                  onChange={(val) => handleUpdateProjectField(editingProject.id, 'image', val)}
                  recommendation="ขนาดแนะนำ: 1200 x 800 px (สัดส่วน 16:10 หรือ 16:9)"
                />
              </div>

              {/* Highlight Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isHighlight"
                  checked={!!editingProject.isHighlight}
                  onChange={(e) => handleUpdateProjectField(editingProject.id, 'isHighlight', e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
                />
                <label htmlFor="isHighlight" className="text-xs font-bold text-slate-700 cursor-pointer">
                  ปักหมุดเป็นโครงการเด่น (Highlight Project)
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setPreviewProject(editingProject);
                  setEditingProject(null);
                }}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>ดูหน้าต่างป๊อปอัปจำลอง</span>
              </button>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
