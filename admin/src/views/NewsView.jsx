import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { initialNewsEventsData } from '../data/newsEventsData';
import { ImageUploadField } from '../components/common/ImageUploadField';
import {
  Save,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Newspaper,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  Tag,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const NewsView = () => {
  const { currentContent, updateSection, lang, setIsPreviewOpen, activeView, showToast, showConfirm } = useAdmin();

  // Load newsEventsData with fallback to initialNewsEventsData
  const [data, setData] = useState(() => {
    return currentContent?.newsEventsData || initialNewsEventsData;
  });

  const newsList = data.items || [];

  // Carousel current slide index (0 to Math.ceil(items.length / 3) - 1)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Search and filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected article for Article Detail Lightbox Modal
  const [readingArticle, setReadingArticle] = useState(null);

  // Selected article for Form Editor Drawer
  const [editingArticle, setEditingArticle] = useState(null);

  // Sync category filter when sidebar sub-menu is clicked
  useEffect(() => {
    if (!activeView) return;
    if (activeView === 'news') {
      setSelectedCategory('all');
    } else if (activeView.startsWith('news-')) {
      const catKey = activeView.replace('news-', '');
      setSelectedCategory(catKey);
      setCurrentSlide(0);
    }
  }, [activeView]);

  // Keep local state in sync when global lang changes
  useEffect(() => {
    if (currentContent?.newsEventsData) {
      setData(currentContent.newsEventsData);
    }
  }, [currentContent, lang]);

  // Save changes to AdminContext
  const handleSave = () => {
    updateSection('newsEventsData', data);
  };

  // Reset to default
  const handleReset = async () => {
    const confirmed = await showConfirm({
      title: 'คืนค่าข่าวสารและกิจกรรมเริ่มต้น',
      message: 'คุณต้องการคืนค่าข่าวสารและกิจกรรมทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่? ข้อมูลข่าวสารที่แก้ไขหรือเพิ่มไว้จะถูกแทนที่',
      confirmText: 'คืนค่าเริ่มต้น',
      cancelText: 'ยกเลิก',
      type: 'warning'
    });

    if (confirmed) {
      setData(initialNewsEventsData);
      setSelectedCategory('all');
      setCurrentSlide(0);
      showToast('คืนค่าข่าวสารและกิจกรรมเป็นค่าเริ่มต้นสำเร็จ', 'info');
    }
  };

  // Filter news
  const filteredNews = newsList.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pages for carousel (3 cards per page)
  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));
  const visibleCards = filteredNews.slice(currentSlide * itemsPerPage, (currentSlide + 1) * itemsPerPage);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Add new article
  const handleAddNew = () => {
    const today = new Date();
    const thaiYear = today.getFullYear() + 543;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateStr = `${thaiYear}-${month}-${day}`;

    const newId = Date.now();
    const newItem = {
      id: newId,
      date: dateStr,
      category: selectedCategory !== 'all' ? selectedCategory : 'company',
      categoryLabel: data.categories.find(c => c.id === selectedCategory)?.label || 'Company News',
      title: "หัวข้อข่าวสารหรือกิจกรรมใหม่ขององค์กร",
      excerpt: "สรุปรายละเอียดกิจกรรมเพื่อสร้างความตระหนักรู้ ส่งเสริมความปลอดภัย และพัฒนาศักยภาพบุคลากร",
      content: "รายละเอียดเนื้อหาข่าวสารฉบับเต็ม บันทึกกิจกรรม ภาพบรรยากาศ และเป้าหมายความสำเร็จขององค์กรในการดำเนินงานอย่างยั่งยืน",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop",
      btnText: "Read more",
      isHighlight: false
    };

    const updated = [newItem, ...newsList];
    setData(prev => ({ ...prev, items: updated }));
    setEditingArticle(newItem);
    showToast('สร้างข่าวสารใหม่แล้ว กรุณากรอกรายละเอียดในแผงด้านขวา', 'success');
  };

  // Delete article
  const handleDelete = async (id) => {
    const item = newsList.find(n => n.id === id);
    const title = item?.title || 'ข่าวสารนี้';

    const confirmed = await showConfirm({
      title: 'ยืนยันการลบข่าวสาร',
      message: `คุณต้องการลบ "${title}" ใช่หรือไม่? ข้อมูลนี้จะถูกลบออกจากระบบอย่างถาวร`,
      confirmText: 'ยืนยันการลบ',
      cancelText: 'ยกเลิก',
      type: 'danger'
    });

    if (confirmed) {
      const updated = newsList.filter(n => n.id !== id);
      setData(prev => ({ ...prev, items: updated }));
      if (editingArticle?.id === id) setEditingArticle(null);
      if (readingArticle?.id === id) setReadingArticle(null);
      showToast(`ลบข่าวสาร "${title}" เรียบร้อยแล้ว`, 'success');
    }
  };

  // Update article field
  const handleUpdateField = (id, field, value) => {
    const updated = newsList.map(item => item.id === id ? { ...item, [field]: value } : item);
    setData(prev => ({ ...prev, items: updated }));
    if (editingArticle?.id === id) {
      setEditingArticle(prev => ({ ...prev, [field]: value }));
    }
    if (readingArticle?.id === id) {
      setReadingArticle(prev => ({ ...prev, [field]: value }));
    }
  };

  // Update section title
  const handleUpdateSectionTitle = (title) => {
    setData(prev => ({ ...prev, sectionTitle: title }));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">ข่าวสารและกิจกรรม (News & Events)</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
              {newsList.length} บทความในระบบ
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            ปรับแต่งสไลเดอร์ข่าว 3 ช่อง การ์ดบทความ วันที่เผยแพร่ และเนื้อหากิจกรรม CSR & Safety
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-gradient-to-r from-gis-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกข่าวสารทั้งหมด</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🌟 LIVE VISUAL PREVIEW: MATCHES SCREENSHOT EXACTLY 🌟         */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Preview Badge Header */}
        <div className="bg-slate-900 px-6 py-3 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">Live Interactive Preview (ตัวอย่างการแสดงผลหน้าเว็บจริง)</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">— เลื่อนการ์ดสไลเดอร์ 3 ช่อง และคลิก &ldquo;Read more&rdquo; เพื่อเปิดอ่าน</span>
          </div>
          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-orange-400 font-mono">
            3-Card Carousel Active
          </span>
        </div>

        {/* Outer Section: Dotted Orange Line & NEWS & EVENT Header */}
        <div className="pt-8 pb-4 text-center bg-white">
          <div className="inline-flex flex-col items-center">
            {/* Orange dashed line above */}
            <div className="w-24 h-0 border-t-2 border-dashed border-orange-500 mb-2"></div>
            <h2 className="text-2xl md:text-3xl font-black tracking-widest text-[#F97316] uppercase font-sans">
              {data.sectionTitle || 'NEWS & EVENT'}
            </h2>
          </div>
        </div>

        {/* Carousel Area with Faint Factory/Ductwork Texture */}
        <div className="relative px-6 sm:px-12 py-8 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80">
          {/* Arrow Left */}
          <button
            type="button"
            onClick={handlePrevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-orange-500 text-slate-400 hover:text-white flex items-center justify-center shadow-lg border border-slate-200 transition-all hover:scale-110"
            title="ข่าวสารก่อนหน้า"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 3 News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visibleCards.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Card Image with Date Badge */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top-Left Date Badge: Calendar icon + 2560-12-10 */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#EA580C] px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 text-xs font-bold border border-orange-100">
                    <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span className="font-mono text-[11px]">{item.date}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-black text-slate-800 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-light">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Read More Pill Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setReadingArticle(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white text-xs font-bold transition-all group/btn"
                    >
                      <span>{item.btnText || 'Read more'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow Right */}
          <button
            type="button"
            onClick={handleNextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-orange-500 text-slate-400 hover:text-white flex items-center justify-center shadow-lg border border-slate-200 transition-all hover:scale-110"
            title="ข่าวสารถัดไป"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots Matching Screenshot: • • • • ══ • • */}
          <div className="flex items-center justify-center gap-2 pt-8 pb-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all rounded-full ${
                  currentSlide === idx
                    ? 'w-6 h-2 bg-orange-500 shadow-xs'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`ไปที่หน้า ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 📖 ARTICLE READER LIGHTBOX MODAL 📖                           */}
      {/* ============================================================ */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setReadingArticle(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Cover Image */}
            <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img
                src={readingArticle.image}
                alt={readingArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              {/* Badges on Image */}
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="bg-white/95 text-[#EA580C] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-mono">{readingArticle.date}</span>
                </div>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {readingArticle.categoryLabel || 'GIS Activity'}
                </span>
              </div>
            </div>

            {/* Modal Article Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
                {readingArticle.title}
              </h2>
              <div className="p-3.5 bg-orange-50/60 rounded-xl border border-orange-100 text-xs text-orange-900 font-medium leading-relaxed">
                {readingArticle.excerpt}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 pt-2">
                <p>{readingArticle.content}</p>
              </div>
            </div>

            {/* Modal Footer Bar */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setEditingArticle(readingArticle);
                  setReadingArticle(null);
                }}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>แก้ไขบทความนี้</span>
              </button>
              <button
                type="button"
                onClick={() => setReadingArticle(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🛠️ NEWS MANAGEMENT TABLE & CONTROLS 🛠️                         */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              ตารางบริหารจัดการบทความข่าวสาร (Articles Database)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              เพิ่มเนื้อหากิจกรรมใหม่ แก้ไขภาพประกอบ หรือปรับวันที่เผยแพร่
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNew}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มข่าวสารใหม่</span>
          </button>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อข่าว วันที่ หรือเนื้อหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full sidebar-scroll">
            {data.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentSlide(0);
                }}
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

        {/* News List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="h-44 relative bg-slate-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-orange-400" />
                  <span>{item.date}</span>
                </span>
                <span className="absolute top-2.5 right-2.5 bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.categoryLabel || item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setReadingArticle(item)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>อ่านเนื้อหา</span>
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditingArticle(item)}
                      className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded"
                      title="แก้ไขข่าวสาร"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                      title="ลบข่าวสาร"
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
      {/* ✍️ EDIT ARTICLE MODAL DRAWER ✍️                               */}
      {/* ============================================================ */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-bold text-slate-800">
                  แก้ไขข้อมูลข่าวสาร: {editingArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">หัวข้อข่าวสาร (Title)</label>
                <input
                  type="text"
                  value={editingArticle.title || ''}
                  onChange={(e) => handleUpdateField(editingArticle.id, 'title', e.target.value)}
                  placeholder="เช่น Safety week activities of the year 2017"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    วันที่เผยแพร่ (Date Format: 2560-12-10)
                  </label>
                  <input
                    type="text"
                    value={editingArticle.date || ''}
                    onChange={(e) => handleUpdateField(editingArticle.id, 'date', e.target.value)}
                    placeholder="เช่น 2560-12-10"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">หมวดหมู่ข่าวสาร (Category)</label>
                  <select
                    value={editingArticle.category || 'company'}
                    onChange={(e) => {
                      const cat = data.categories.find(c => c.id === e.target.value);
                      handleUpdateField(editingArticle.id, 'category', e.target.value);
                      if (cat) handleUpdateField(editingArticle.id, 'categoryLabel', cat.label);
                    }}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
                  >
                    {data.categories.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  เนื้อหาย่อสำหรับแสดงบนการ์ด (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt || ''}
                  onChange={(e) => handleUpdateField(editingArticle.id, 'excerpt', e.target.value)}
                  placeholder="สรุปสั้น 2-3 บรรทัด..."
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">เนื้อหาข่าวฉบับเต็ม (Full Content)</label>
                <textarea
                  rows={4}
                  value={editingArticle.content || ''}
                  onChange={(e) => handleUpdateField(editingArticle.id, 'content', e.target.value)}
                  placeholder="รายละเอียดกิจกรรมและเนื้อหาบทความฉบับเต็ม..."
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none leading-relaxed"
                />
              </div>

              <ImageUploadField
                label="รูปภาพประกอบข่าวสาร (Article Image)"
                value={editingArticle.image || ''}
                onChange={(val) => handleUpdateField(editingArticle.id, 'image', val)}
                recommendation="ขนาดแนะนำ: 800 x 500 px (สัดส่วน 16:10 ภาพกิจกรรมหรือภาพหมู่)"
              />
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
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
