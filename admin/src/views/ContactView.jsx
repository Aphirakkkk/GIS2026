import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  MapPin,
  Phone,
  Mail,
  Printer,
  Send,
  CheckCircle2,
  Trash2,
  Search,
  FileText,
  Eye,
  Save,
  RotateCcw,
  Building2,
  Globe,
  MessageSquare,
  ExternalLink,
  Share2,
  Check,
  Clock,
  User,
  ShieldCheck,
  ChevronRight,
  Download
} from 'lucide-react';

export const ContactView = () => {
  const { data, updateSection, updateRootField, lang, showToast, activeView } = useAdmin();

  // Load contactFooterData & recentInquiries from context
  const initialCF = data.content?.[lang]?.contactFooterData || data.content?.th?.contactFooterData;
  const [contactData, setContactData] = useState(initialCF);
  const [inquiries, setInquiries] = useState(data.recentInquiries || []);

  // Tabs: 'preview', 'inbox', 'info', 'footer'
  const [activeTab, setActiveTab] = useState('preview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Live Interactive Preview form states
  const [previewForm, setPreviewForm] = useState({
    fullName: '',
    email: '',
    telephone: '',
    topic: '',
    detail: '',
    isRobotChecked: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync state if context updates
  useEffect(() => {
    if (initialCF) {
      setContactData(initialCF);
    }
  }, [initialCF, lang]);

  useEffect(() => {
    if (data.recentInquiries) {
      setInquiries(data.recentInquiries);
    }
  }, [data.recentInquiries]);

  // Sync with activeView from Sidebar
  useEffect(() => {
    if (activeView === 'contact-inquiries' || activeView === 'inquiries') {
      setActiveTab('inbox');
    } else if (activeView === 'contact-hq') {
      setActiveTab('info');
    } else if (activeView === 'contact-footer') {
      setActiveTab('footer');
    } else if (activeView === 'contact') {
      setActiveTab('preview');
    }
  }, [activeView]);

  // Save all changes
  const handleSave = () => {
    updateSection('contactFooterData', contactData);
    updateRootField('recentInquiries', inquiries);
    showToast('บันทึกข้อมูลหน้า Contact & Footer เรียบร้อยแล้ว');
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('ต้องการรีเซ็ตข้อมูลหน้าติดต่อเราและส่วนท้ายเว็บกลับเป็นค่าเริ่มต้นหรือไม่?')) {
      const defaultData = data.content?.th?.contactFooterData;
      setContactData(JSON.parse(JSON.stringify(defaultData)));
      showToast('รีเซ็ตข้อมูลสำเร็จ');
    }
  };

  // Handle Form Submit in Live Preview
  const handlePreviewFormSubmit = (e) => {
    e.preventDefault();
    if (!previewForm.fullName.trim() || !previewForm.email.trim()) {
      alert('กรุณากรอกชื่อและอีเมลให้ครบถ้วน');
      return;
    }

    const newInq = {
      id: Date.now(),
      name: previewForm.fullName,
      contact: previewForm.telephone || previewForm.email,
      email: previewForm.email,
      subject: previewForm.topic || 'ข้อความจากหน้าเว็บ',
      detail: previewForm.detail,
      date: new Date().toLocaleDateString('th-TH'),
      status: 'pending'
    };

    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    updateRootField('recentInquiries', updated);

    setFormSubmitted(true);
    setPreviewForm({
      fullName: '',
      email: '',
      telephone: '',
      topic: '',
      detail: '',
      isRobotChecked: false
    });

    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);

    showToast('ส่งข้อความทดสอบสำเร็จ! บันทึกลงกล่องข้อความแล้ว');
  };

  // Status toggle in Inbox
  const handleToggleStatus = (id) => {
    const updated = inquiries.map((item) => {
      if (item.id === id) {
        const nextStatus =
          item.status === 'pending'
            ? 'contacted'
            : item.status === 'contacted'
            ? 'completed'
            : 'pending';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    setInquiries(updated);
    updateRootField('recentInquiries', updated);
    showToast('อัปเดตสถานะข้อความเรียบร้อย');
  };

  // Delete inquiry
  const handleDeleteInquiry = (id) => {
    if (window.confirm('คุณต้องการลบข้อความนี้ใช่หรือไม่?')) {
      const updated = inquiries.filter((item) => item.id !== id);
      setInquiries(updated);
      updateRootField('recentInquiries', updated);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      showToast('ลบข้อความเรียบร้อยแล้ว');
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const matchQuery =
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.contact || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-gis-orange">
              Contact & Footer Management
            </span>
            <span className="text-xs text-slate-400">• GIS GROUP Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-gis-orange" />
            จัดการหน้า Contact Us & ส่วนท้ายเว็บไซต์ (Footer)
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            แบบฟอร์มติดต่อสอบถาม แผนที่ที่ตั้งสำนักงานใหญ่พระราม 3 กล่องข้อความจากลูกค้า และ Footer
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

      {/* Navigation Tabs */}
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
          <span>Live Interactive Preview (แสดงตัวอย่างจริงตามภาพ)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inbox')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'inbox'
              ? 'bg-[#111D35] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-sky-400" />
          <span>กล่องข้อความลูกค้า ({inquiries.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('info')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'info'
              ? 'bg-[#111D35] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span>ที่ตั้งสำนักงานใหญ่ & แผนที่</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('footer')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'footer'
              ? 'bg-[#111D35] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Share2 className="w-4 h-4 text-purple-400" />
          <span>ข้อมูลส่วนท้ายเว็บ & ลิงก์ (Footer)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LIVE INTERACTIVE PREVIEW (MATCHING SCREENSHOT 100%) */}
      {/* ========================================================================= */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Interactive Preview (ถอดแบบหน้าจริงและแผนที่แม่น้ำเจ้าพระยา)
            </h2>
            <span className="text-xs text-slate-400">
              * ฟอร์มนี้ใช้งานได้จริง สามารถทดลองพิมพ์ส่งเพื่อเพิ่มเข้าสู่ Inbox ได้ทันที
            </span>
          </div>

          {/* Full Container matching Screenshot */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white">
            {/* ----------------- TOP CONTACT US ON MAP SECTION ----------------- */}
            <div className="relative min-h-[580px] w-full overflow-hidden flex flex-col justify-center">
              {/* Map Background Canvas (Realistic Bangkok Riverbend Map around Rama 3) */}
              <div className="absolute inset-0 z-0 bg-[#e5e3df] overflow-hidden select-none pointer-events-auto">
                <svg
                  viewBox="0 0 1200 650"
                  className="w-full h-full object-cover"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* Land Background */}
                  <rect width="1200" height="650" fill="#E8ECE9" />

                  {/* Road Grid Network */}
                  <g stroke="#FFFFFF" strokeWidth="6" opacity="0.9" fill="none">
                    <path d="M 0,150 L 1200,150" />
                    <path d="M 0,320 L 1200,320" />
                    <path d="M 0,480 L 1200,480" />
                    <path d="M 200,0 L 200,650" />
                    <path d="M 450,0 L 450,650" />
                    <path d="M 750,0 L 750,650" />
                    <path d="M 980,0 L 980,650" />
                  </g>

                  {/* Minor Roads */}
                  <g stroke="#F4F6F4" strokeWidth="2.5" opacity="0.8" fill="none">
                    <path d="M 50,0 L 50,650" />
                    <path d="M 350,0 L 350,650" />
                    <path d="M 600,0 L 600,650" />
                    <path d="M 880,0 L 880,650" />
                    <path d="M 1100,0 L 1100,650" />
                    <path d="M 0,80 L 1200,80" />
                    <path d="M 0,230 L 1200,230" />
                    <path d="M 0,400 L 1200,400" />
                    <path d="M 0,560 L 1200,560" />
                  </g>

                  {/* Expressways (Orange Highway like in screenshot: ทางพิเศษเฉลิมมหานคร) */}
                  <g stroke="#F6C358" strokeWidth="8" fill="none" opacity="0.95">
                    <path d="M 120,650 Q 500,450 720,0" />
                    <path d="M 450,650 Q 750,350 1200,200" />
                  </g>
                  <g stroke="#DE9B26" strokeWidth="2" fill="none" opacity="0.8">
                    <path d="M 120,650 Q 500,450 720,0" />
                    <path d="M 450,650 Q 750,350 1200,200" />
                  </g>

                  {/* Chao Phraya River Curve (Blue Waterway through Yannawa / Bang Kho Laem) */}
                  <path
                    d="M 500,0 C 480,180 820,180 880,350 C 940,520 800,650 780,650 L 950,650 C 980,500 1150,380 1200,250 L 1200,0 Z"
                    fill="#A5C9EB"
                    opacity="0.9"
                  />
                  <path
                    d="M 400,200 C 520,200 800,250 820,400 C 840,550 700,650 680,650 L 780,650 C 800,650 940,520 880,350 C 820,180 480,180 500,0 L 400,0 Z"
                    fill="#8EBEEC"
                  />

                  {/* River Label */}
                  <text
                    x="560"
                    y="215"
                    fill="#5F88B0"
                    fontSize="13"
                    fontWeight="500"
                    fontStyle="italic"
                    transform="rotate(-15, 560, 215)"
                  >
                    แม่น้ำเจ้าพระยา
                  </text>
                  <text
                    x="760"
                    y="480"
                    fill="#5F88B0"
                    fontSize="13"
                    fontWeight="500"
                    fontStyle="italic"
                    transform="rotate(60, 760, 480)"
                  >
                    แม่น้ำเจ้าพระยา
                  </text>

                  {/* District / Sub-district Labels in Thai (matching screenshot) */}
                  <g fill="#7A8B99" fontSize="12" fontWeight="bold">
                    <text x="560" y="240">เขตบางคอแหลม</text>
                    <text x="890" y="440">แขวงบางโพงพาง</text>
                    <text x="880" y="70">แขวงช่องนนทรี</text>
                    <text x="830" y="140">เขตยานนาวา</text>
                    <text x="560" y="640">เขตราษฎร์บูรณะ</text>
                    <text x="100" y="580">แขวงบางมด</text>
                    <text x="250" y="520">แขวงบางปะกอก</text>
                  </g>

                  {/* Landmarks Labels */}
                  <g fill="#9AA7B2" fontSize="10">
                    <text x="660" y="180">โฮมโปร พระราม 3</text>
                    <text x="760" y="120">ทาวน์เฮ้าส์ อยู่สุข</text>
                    <text x="570" y="325">หมู่บ้าน ไทยสามัคคี</text>
                    <text x="590" y="800">Loft 17 Residence</text>
                  </g>

                  {/* Rama 3 Road Label */}
                  <text
                    x="840"
                    y="420"
                    fill="#DE9B26"
                    fontSize="11"
                    fontWeight="bold"
                    transform="rotate(-25, 840, 420)"
                  >
                    ถ. พระรามที่ 3
                  </text>
                </svg>

                {/* The Custom GIS GROUP Marker Pin on Rama 3 (matching screenshot) */}
                <div 
                  className="absolute z-20 transition-transform hover:scale-110 cursor-pointer"
                  style={{ top: '35%', right: '27%' }}
                  title="GIS GROUP Headquarters (พระราม 3)"
                >
                  <div className="flex flex-col items-center">
                    {/* Orange GIS GROUP Label Tag */}
                    <div className="bg-[#F26522] text-white font-black italic px-4 py-2 rounded-lg shadow-2xl flex items-center gap-1.5 border-2 border-white tracking-wider text-sm">
                      <span className="font-sans">GIS</span>
                      <span className="text-amber-300">GROUP</span>
                    </div>
                    {/* Pin Point Pointer */}
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-[#F26522] -mt-0.5 filter drop-shadow-md"></div>
                    {/* Pulsing Base */}
                    <div className="w-4 h-4 rounded-full bg-orange-500/40 animate-ping -mt-1"></div>
                  </div>
                </div>
              </div>

              {/* ----------------- FLOATING CONTACT FORM (LEFT SIDE) ----------------- */}
              <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-10 pointer-events-none">
                <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-slate-200/80 pointer-events-auto transition-all">
                  {/* Header: CONTACT US in vibrant orange */}
                  <h2 className="text-3xl font-black text-gis-orange tracking-tight uppercase mb-6 font-sans">
                    {contactData.contactSection?.title || "CONTACT US"}
                  </h2>

                  {formSubmitted && (
                    <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>ข้อความของคุณถูกส่งเรียบร้อยแล้ว และถูกเพิ่มลงใน Inbox!</span>
                    </div>
                  )}

                  <form onSubmit={handlePreviewFormSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={contactData.contactSection?.labels?.fullName || "Full name"}
                        value={previewForm.fullName}
                        onChange={(e) => setPreviewForm({ ...previewForm, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-md focus:border-gis-orange focus:ring-1 focus:ring-gis-orange focus:outline-hidden text-slate-800"
                      />
                    </div>

                    {/* Email & Telephone in 2 columns */}
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="email"
                        required
                        placeholder={contactData.contactSection?.labels?.email || "Email"}
                        value={previewForm.email}
                        onChange={(e) => setPreviewForm({ ...previewForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-md focus:border-gis-orange focus:ring-1 focus:ring-gis-orange focus:outline-hidden text-slate-800"
                      />
                      <input
                        type="tel"
                        placeholder={contactData.contactSection?.labels?.telephone || "Telephone"}
                        value={previewForm.telephone}
                        onChange={(e) => setPreviewForm({ ...previewForm, telephone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-md focus:border-gis-orange focus:ring-1 focus:ring-gis-orange focus:outline-hidden text-slate-800"
                      />
                    </div>

                    {/* Topic */}
                    <div>
                      <input
                        type="text"
                        placeholder={contactData.contactSection?.labels?.topic || "Topic"}
                        value={previewForm.topic}
                        onChange={(e) => setPreviewForm({ ...previewForm, topic: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-md focus:border-gis-orange focus:ring-1 focus:ring-gis-orange focus:outline-hidden text-slate-800"
                      />
                    </div>

                    {/* Detail Textarea */}
                    <div>
                      <textarea
                        rows={4}
                        placeholder={contactData.contactSection?.labels?.detail || "Detail"}
                        value={previewForm.detail}
                        onChange={(e) => setPreviewForm({ ...previewForm, detail: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-md focus:border-gis-orange focus:ring-1 focus:ring-gis-orange focus:outline-hidden text-slate-800 resize-none"
                      />
                    </div>

                    {/* reCAPTCHA Widget mockup */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-300 rounded-md select-none">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={previewForm.isRobotChecked}
                          onChange={(e) =>
                            setPreviewForm({ ...previewForm, isRobotChecked: e.target.checked })
                          }
                          className="w-5 h-5 text-blue-600 rounded-xs border-slate-400 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs text-slate-700 font-medium">I'm not a robot</span>
                      </label>
                      <div className="flex flex-col items-center justify-center opacity-70">
                        <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin-slow"></div>
                        <span className="text-[8px] text-slate-400 font-semibold tracking-tighter">reCAPTCHA</span>
                      </div>
                    </div>

                    {/* Submit Button: SEND in solid dark gray */}
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-[#4A5568] hover:bg-[#2D3748] text-white text-xs font-bold tracking-wider rounded-md uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{contactData.contactSection?.labels?.sendButton || "SEND"}</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* ----------------- BOTTOM FOOTER SECTION (EXACT AS SCREENSHOT) ----------------- */}
            <div className="flex flex-col lg:flex-row text-white text-xs">
              {/* Left Orange Block (Logo & Thai Address) */}
              <div className="bg-[#F26522] lg:w-[30%] p-6 lg:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl lg:text-3xl font-black italic tracking-wider text-white font-sans">
                      GIS
                    </span>
                    <span className="text-2xl lg:text-3xl font-extrabold italic tracking-wider text-amber-200 font-sans">
                      GROUP
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-white/95 leading-relaxed">
                    <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{contactData.footer?.address || "682/59-60 ถนนพระราม 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพฯ 10120"}</span>
                  </div>
                </div>
              </div>

              {/* Right Dark Charcoal Block (Call Center, Numbers, Links, Follow Us, Copyright) */}
              <div className="bg-[#212529] lg:w-[70%] p-6 lg:p-8 flex flex-col justify-between space-y-6">
                {/* Top Row: Call center & Contact Badges */}
                <div className="space-y-2 pb-4 border-b border-slate-700/60">
                  <div className="text-sm font-bold text-white tracking-wide">
                    Call Center : <span className="text-amber-400 font-extrabold">{contactData.footer?.callCenter || "081-149-9090"}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{contactData.footer?.phone || "+66(0)2 682 1040-4"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Printer className="w-3.5 h-3.5 text-amber-400" />
                      <span>{contactData.footer?.fax || "+66(0)2 682 1045"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>{contactData.footer?.email || "info@gisgroup.co.th"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-[9px] text-white flex items-center justify-center font-bold">L</span>
                      <span>{contactData.footer?.line || "@gisgroup"}</span>
                    </div>
                  </div>
                </div>

                {/* Middle Row: 2-Column Links + Follow Us */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  {/* 2-Columns Sitemap Links */}
                  <div className="grid grid-cols-2 gap-8 text-[11px] text-slate-300 font-medium">
                    <div className="space-y-2">
                      {contactData.footer?.quickLinksCol1?.map((link, idx) => (
                        <div key={idx} className="hover:text-white transition-colors cursor-pointer">
                          {link.label}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {contactData.footer?.quickLinksCol2?.map((link, idx) => (
                        <div key={idx} className="hover:text-white transition-colors cursor-pointer">
                          {link.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Follow Us */}
                  <div className="flex flex-col items-start sm:items-end space-y-2">
                    <span className="text-[11px] font-bold text-white tracking-wider uppercase">
                      FOLLOW US
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={contactData.footer?.social?.facebook || "https://facebook.com/gisgroupthailand"}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-sm bg-[#3B5998] hover:opacity-90 flex items-center justify-center text-white font-bold text-xs shadow-xs"
                        title="Facebook"
                      >
                        f
                      </a>
                      <a
                        href={contactData.footer?.social?.line || "https://line.me/R/ti/p/@gisgroup"}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-sm bg-[#00B900] hover:opacity-90 flex items-center justify-center text-white font-bold text-xs shadow-xs"
                        title="LINE"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Copyright Notice */}
                <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>{contactData.footer?.copyright || "© Copyright 2021 GIS Group Co.,Ltd. All Right Reserved"}</span>
                  <span className="text-slate-500">ISO 9001:2015 | ISO 14001:2015 | ISO 45001:2018 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INQUIRIES INBOX (กล่องข้อความลูกค้า) */}
      {/* ========================================================================= */}
      {activeTab === 'inbox' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gis-orange" />
                กล่องข้อความติดต่อกลับจากลูกค้า (Inquiries Inbox)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                ข้อความที่ลูกค้ากรอกผ่านแบบฟอร์ม CONTACT US บนเว็บไซต์ (ทั้งหมด {inquiries.length} รายการ)
              </p>
            </div>

            {/* Filter & Search */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อ, หัวข้อ, อีเมล..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:outline-hidden w-48 sm:w-60"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:outline-hidden"
              >
                <option value="all">ทุกสถานะ</option>
                <option value="pending">รอดำเนินการ (Pending)</option>
                <option value="contacted">กำลังประสานงาน (Contacted)</option>
                <option value="completed">ติดต่อแล้ว (Completed)</option>
              </select>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                <tr>
                  <th className="px-4 py-3">ผู้ติดต่อ</th>
                  <th className="px-4 py-3">ช่องทางติดต่อ</th>
                  <th className="px-4 py-3">หัวข้อที่ติดต่อ</th>
                  <th className="px-4 py-3">วันที่</th>
                  <th className="px-4 py-3 text-center">สถานะ</th>
                  <th className="px-4 py-3 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                      ไม่พบข้อความที่ตรงกับเงื่อนไขค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-slate-900">{inq.name}</td>
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          <div className="text-slate-800 font-medium">{inq.contact}</div>
                          <div className="text-[11px] text-slate-400">{inq.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 max-w-xs truncate font-medium text-slate-800">
                        {inq.subject}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{inq.date}</td>
                      <td className="px-4 py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(inq.id)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                            inq.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : inq.status === 'contacted'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                          title="คลิกเพื่อเปลี่ยนสถานะ"
                        >
                          {inq.status === 'completed'
                            ? 'ติดต่อแล้ว'
                            : inq.status === 'contacted'
                            ? 'กำลังประสานงาน'
                            : 'รอดำเนินการ'}
                        </button>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-1.5 text-slate-500 hover:text-gis-orange hover:bg-orange-50 rounded-md"
                            title="ดูข้อความฉบับเต็ม"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                            title="ลบข้อความนี้"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: HEADQUARTERS & MAP SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-gis-orange" />
            <h2 className="text-base font-bold text-slate-900">
              ข้อมูลที่ตั้งสำนักงานใหญ่ & พิกัดแผนที่ (Headquarters & Map)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ที่อยู่สำนักงานใหญ่ (ภาษาไทย)
              </label>
              <textarea
                rows={2}
                value={contactData.footer?.address || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, address: e.target.value },
                    contactSection: {
                      ...prev.contactSection,
                      map: { ...prev.contactSection.map, address: e.target.value }
                    }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                เบอร์โทรศัพท์ Call Center
              </label>
              <input
                type="text"
                value={contactData.footer?.callCenter || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, callCenter: e.target.value }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-gis-orange focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                เบอร์โทรศัพท์สำนักงานใหญ่ (Office Phone)
              </label>
              <input
                type="text"
                value={contactData.footer?.phone || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, phone: e.target.value }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                เบอร์โทรสาร (Fax)
              </label>
              <input
                type="text"
                value={contactData.footer?.fax || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, fax: e.target.value }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                อีเมลหลักของบริษัท (Official Email)
              </label>
              <input
                type="email"
                value={contactData.footer?.email || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, email: e.target.value }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                LINE Official ID
              </label>
              <input
                type="text"
                value={contactData.footer?.line || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, line: e.target.value }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ลิงก์ Google Maps
              </label>
              <input
                type="text"
                value={contactData.contactSection?.map?.googleMapsUrl || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    contactSection: {
                      ...prev.contactSection,
                      map: { ...prev.contactSection.map, googleMapsUrl: e.target.value }
                    }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: FOOTER SETTINGS & SOCIAL LINKS */}
      {/* ========================================================================= */}
      {activeTab === 'footer' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Share2 className="w-5 h-5 text-gis-orange" />
            <h2 className="text-base font-bold text-slate-900">
              ตั้งค่าส่วนท้ายเว็บไซต์ & ลิงก์โซเชียลมีเดีย (Footer & Social)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ข้อความสงวนลิขสิทธิ์ (Copyright Notice)
              </label>
              <input
                type="text"
                value={contactData.footer?.copyright || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, copyright: e.target.value }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Facebook Fanpage URL
              </label>
              <input
                type="text"
                value={contactData.footer?.social?.facebook || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      social: { ...prev.footer.social, facebook: e.target.value }
                    }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                LINE Official Account Link
              </label>
              <input
                type="text"
                value={contactData.footer?.social?.line || ''}
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      social: { ...prev.footer.social, line: e.target.value }
                    }
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VIEW INQUIRY DETAILS */}
      {/* ========================================================================= */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gis-orange" />
                <h3 className="font-bold text-sm">รายละเอียดข้อความติดต่อ</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block mb-0.5">ผู้ส่ง:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">วันที่ส่ง:</span>
                  <span className="font-medium text-slate-700">{selectedInquiry.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">อีเมล:</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">เบอร์โทรศัพท์:</span>
                  <a
                    href={`tel:${selectedInquiry.contact}`}
                    className="font-medium text-slate-800 hover:underline"
                  >
                    {selectedInquiry.contact}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">หัวข้อ:</span>
                <div className="font-bold text-slate-800 text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {selectedInquiry.subject}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">ข้อความรายละเอียด:</span>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700 leading-relaxed min-h-[80px]">
                  {selectedInquiry.detail || 'ไม่มีรายละเอียดเพิ่มเติม'}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(selectedInquiry.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  สถานะ:{' '}
                  {selectedInquiry.status === 'completed'
                    ? 'ติดต่อแล้ว'
                    : selectedInquiry.status === 'contacted'
                    ? 'กำลังประสานงาน'
                    : 'รอดำเนินการ'}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                    className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg font-semibold"
                  >
                    ลบข้อความ
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-semibold"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
