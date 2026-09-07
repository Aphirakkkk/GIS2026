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
  Download,
  Navigation,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  Copy,
  Sliders,
  Sparkles,
  Map as MapIcon,
  Crosshair
} from 'lucide-react';

const PRESET_LOCATIONS = [
  {
    name: 'สำนักงานใหญ่ พระราม 3 (จีไอเอส กรุ๊ป)',
    locationName: 'จีไอเอส กรุ๊ป จำกัด (สำนักงานใหญ่)',
    address: '682, 59-60 ถ. พระรามที่ 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพมหานคร 10120',
    lat: 13.68094,
    lng: 100.52469,
    zoom: 17,
    tag: 'สำนักงานใหญ่'
  },
  {
    name: 'ศูนย์ปฏิบัติการ สีลมคอมเพล็กซ์',
    locationName: 'GIS GROUP - Silom Operations Branch',
    address: 'อาคารสีลมคอมเพล็กซ์ ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500',
    lat: 13.7278,
    lng: 100.5342,
    zoom: 16,
    tag: 'สาขา กทม.'
  },
  {
    name: 'ศูนย์กระจายสินค้า บางนา-ตราด',
    locationName: 'GIS GROUP - Bangna Logistics & Engineering Hub',
    address: 'ถนนบางนา-ตราด กม. 18 ตำบลบางโฉลง อำเภอบางพลี สมุทรปราการ 10540',
    lat: 13.6682,
    lng: 100.6341,
    zoom: 15,
    tag: 'คลังสินค้า'
  },
  {
    name: 'ศูนย์บริการโครงการ นิคมฯ ชลบุรี',
    locationName: 'GIS GROUP - Chonburi Industrial Services',
    address: 'นิคมอุตสาหกรรมอมตะซิตี้ ชลบุรี ตำบลคลองตำหรุ อำเภอเมือง ชลบุรี 20000',
    lat: 13.3611,
    lng: 100.9847,
    zoom: 15,
    tag: 'ภาคตะวันออก'
  },
  {
    name: 'ศูนย์วิศวกรรมปิโตรเคมี มาบตาพุด ระยอง',
    locationName: 'GIS GROUP - Map Ta Phut Engineering Center',
    address: 'นิคมอุตสาหกรรมมาบตาพุด ตำบลมาบตาพุด อำเภอเมือง ระยอง 21150',
    lat: 12.7215,
    lng: 101.1685,
    zoom: 15,
    tag: 'ปิโตรเคมี'
  }
];

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

  // Real Map States
  const [mapViewMode, setMapViewMode] = useState('real'); // 'real' (roadmap), 'satellite', 'vector'
  const [mapSearchText, setMapSearchText] = useState('');
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Current Map Data with exact GIS Group HQ coordinates (13.68094, 100.52469)
  const currentMap = contactData?.contactSection?.map || {
    address: "682, 59-60 ถ. พระรามที่ 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพมหานคร 10120",
    locationName: "จีไอเอส กรุ๊ป จำกัด (สำนักงานใหญ่)",
    lat: 13.68094,
    lng: 100.52469,
    zoom: 17,
    mapType: "m",
    googleMapsUrl: "https://maps.google.com/?q=13.68094,100.52469"
  };

  const getMapEmbedUrl = (map, mode) => {
    const lat = map?.lat;
    const lng = map?.lng;
    const addr = map?.address;
    const zoom = map?.zoom || 17;
    const type = mode === 'satellite' ? 'k' : 'm';
    const query = lat && lng ? `${lat},${lng}` : addr || '682, 59-60 ถ. พระรามที่ 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพมหานคร 10120';
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=${type}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
  };

  const applyPresetLocation = (preset) => {
    const updatedMap = {
      ...currentMap,
      locationName: preset.locationName,
      address: preset.address,
      lat: preset.lat,
      lng: preset.lng,
      zoom: preset.zoom,
      googleMapsUrl: `https://maps.google.com/?q=${preset.lat},${preset.lng}`
    };
    setContactData((prev) => ({
      ...prev,
      contactSection: {
        ...prev?.contactSection,
        map: updatedMap
      },
      footer: {
        ...prev?.footer,
        address: preset.address
      }
    }));
    showToast(`ปักหมุดแผนที่จริงไปยัง: ${preset.name}`);
  };

  const handleGeocodeSearch = async (e) => {
    if (e) e.preventDefault();
    const q = (mapSearchText || '').trim();
    if (!q) {
      showToast('กรุณากรอกชื่อสถานที่ ที่อยู่ หรือพิกัด GPS เพื่อค้นหา');
      return;
    }

    setIsSearchingLocation(true);

    // 1. Check if user pasted Lat, Lng coordinates (e.g. "13.68094, 100.52469" or "13.68094,100.52469")
    const coordMatch = q.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
    if (coordMatch) {
      const newLat = parseFloat(coordMatch[1]);
      const newLng = parseFloat(coordMatch[2]);
      const updatedMap = {
        ...currentMap,
        locationName: currentMap.locationName || 'พิกัดที่ระบุ',
        lat: newLat,
        lng: newLng,
        zoom: 17,
        googleMapsUrl: `https://maps.google.com/?q=${newLat},${newLng}`
      };
      setContactData((prev) => ({
        ...prev,
        contactSection: { ...prev?.contactSection, map: updatedMap }
      }));
      setIsSearchingLocation(false);
      showToast(`ปักหมุดตามพิกัด GPS: [${newLat.toFixed(5)}, ${newLng.toFixed(5)}]`);
      return;
    }

    // 2. Check if user searched for GIS Group, Rama 3, Plus Code MGJF+9V, or the exact Rama 3 address
    const qLower = q.toLowerCase();
    const isGISRama3 =
      qLower.includes('จีไอเอส') ||
      qLower.includes('gis') ||
      qLower.includes('mgjf+9v') ||
      qLower.includes('mgjf') ||
      qLower.includes('682') ||
      (qLower.includes('พระราม') && (qLower.includes('3') || qLower.includes('บางโพงพาง') || qLower.includes('ยานนาวา')));

    if (isGISRama3) {
      const exactLat = 13.68094;
      const exactLng = 100.52469;
      const exactAddress = '682, 59-60 ถ. พระรามที่ 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพมหานคร 10120';
      const updatedMap = {
        ...currentMap,
        locationName: 'จีไอเอส กรุ๊ป จำกัด (สำนักงานใหญ่)',
        address: exactAddress,
        lat: exactLat,
        lng: exactLng,
        zoom: 17,
        googleMapsUrl: `https://maps.google.com/?q=${exactLat},${exactLng}`
      };
      setContactData((prev) => ({
        ...prev,
        contactSection: { ...prev?.contactSection, map: updatedMap },
        footer: { ...prev?.footer, address: exactAddress }
      }));
      setIsSearchingLocation(false);
      showToast(`พบพิกัดสำนักงานใหญ่ จีไอเอส กรุ๊ป พระราม 3 [${exactLat}, ${exactLng}]`);
      return;
    }

    // 3. For other locations, perform cleaned geocoding via Nominatim
    try {
      const cleanQ = q.replace(/^[\d\s\/\,\.\-]+/, '').trim() || q;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          cleanQ
        )}&countrycodes=th&limit=1`,
        { headers: { 'Accept-Language': 'th, en', 'User-Agent': 'GIS-Group-Portal' } }
      );
      const resData = await res.json();
      if (resData && resData.length > 0) {
        const found = resData[0];
        const newLat = parseFloat(found.lat);
        const newLng = parseFloat(found.lon);

        // Sanity check: If query specified Bangkok / กทม. but result is in Pattaya (lat < 13.3)
        const wantsBangkok = q.includes('กรุงเทพ') || q.includes('กทม') || q.includes('Bangkok');
        if (wantsBangkok && (newLat < 13.4 || newLat > 13.95)) {
          throw new Error('Result outside Bangkok');
        }

        const updatedMap = {
          ...currentMap,
          locationName: q,
          address: found.display_name || q,
          lat: newLat,
          lng: newLng,
          zoom: 16,
          googleMapsUrl: `https://maps.google.com/?q=${newLat},${newLng}`
        };
        setContactData((prev) => ({
          ...prev,
          contactSection: { ...prev?.contactSection, map: updatedMap },
          footer: { ...prev?.footer, address: found.display_name || q }
        }));
        showToast(`พบพิกัดแล้ว! ปักหมุดไปที่ [${newLat.toFixed(4)}, ${newLng.toFixed(4)}]`);
      } else {
        const updatedMap = {
          ...currentMap,
          locationName: q,
          address: q,
          googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(q)}`
        };
        setContactData((prev) => ({
          ...prev,
          contactSection: { ...prev?.contactSection, map: updatedMap },
          footer: { ...prev?.footer, address: q }
        }));
        showToast(`อัปเดตที่อยู่และปักหมุดบน Google Maps: ${q}`);
      }
    } catch {
      const updatedMap = {
        ...currentMap,
        locationName: q,
        address: q,
        googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(q)}`
      };
      setContactData((prev) => ({
        ...prev,
        contactSection: { ...prev?.contactSection, map: updatedMap },
        footer: { ...prev?.footer, address: q }
      }));
      showToast(`ค้นหาและปักหมุดด้วยชื่อ: ${q}`);
    } finally {
      setIsSearchingLocation(false);
    }
  };

  const updateMapField = (field, value) => {
    setContactData((prev) => {
      const existingMap = prev?.contactSection?.map || currentMap;
      const newMap = { ...existingMap, [field]: value };
      if (field === 'lat' || field === 'lng') {
        const lat = field === 'lat' ? parseFloat(value) || 0 : newMap.lat;
        const lng = field === 'lng' ? parseFloat(value) || 0 : newMap.lng;
        newMap.googleMapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
      } else if (field === 'address') {
        return {
          ...prev,
          contactSection: { ...prev?.contactSection, map: newMap },
          footer: { ...prev?.footer, address: value }
        };
      }
      return {
        ...prev,
        contactSection: { ...prev?.contactSection, map: newMap }
      };
    });
  };

  const copyCoordsToClipboard = () => {
    if (currentMap.lat && currentMap.lng) {
      navigator.clipboard.writeText(`${currentMap.lat}, ${currentMap.lng}`);
      setCopiedCoords(true);
      showToast('คัดลอกพิกัด GPS เรียบร้อยแล้ว');
      setTimeout(() => setCopiedCoords(false), 2500);
    }
  };

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
          {/* Header & Quick Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Live Interactive Preview (แผนที่จริง & ปักหมุดตามสถานที่จริง)
              </h2>
            </div>

            {/* View Mode Switcher & Quick Map Link */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMapViewMode('real')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    mapViewMode === 'real'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5 text-orange-500" />
                  <span>แผนที่ถนนจริง</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapViewMode('satellite')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    mapViewMode === 'satellite'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  <span>ภาพดาวเทียม</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapViewMode('vector')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    mapViewMode === 'vector'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  <span>ภาพสเก็ตช์เดิม</span>
                </button>
              </div>

              <a
                href={currentMap.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(currentMap.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-gis-orange rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                title="เปิด Google Maps เต็มจอ"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Maps เต็มจอ</span>
              </a>
            </div>
          </div>

          {/* Full Container matching Screenshot */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white">
            {/* ----------------- TOP CONTACT US ON MAP SECTION ----------------- */}
            <div className="relative min-h-[620px] w-full overflow-hidden flex flex-col justify-center">
              {/* REAL MAP / SATELLITE or VECTOR CANVAS */}
              {mapViewMode !== 'vector' ? (
                <div className="absolute inset-0 z-0 bg-[#e5e3df] overflow-hidden">
                  <iframe
                    key={`${currentMap.lat}-${currentMap.lng}-${currentMap.zoom}-${mapViewMode}-${currentMap.address}`}
                    title="GIS Group Real Location Map"
                    src={getMapEmbedUrl(currentMap, mapViewMode)}
                    className="w-full h-full border-0 absolute inset-0 filter saturate-105"
                    loading="lazy"
                  />

                  {/* Overlaid Live Pin Card (Top Right) */}
                  <div className="absolute top-4 right-4 z-20 pointer-events-auto max-w-sm hidden md:block">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-slate-200/80 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#F26522] flex items-center justify-center text-white shadow-md shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5 animate-bounce" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {currentMap.locationName || 'GIS GROUP'}
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700">
                            หมุดพิกัดจริง
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {currentMap.address}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                          <span>Lat: {currentMap.lat?.toFixed(4)}</span>
                          <span>•</span>
                          <span>Lng: {currentMap.lng?.toFixed(4)}</span>
                          <span>•</span>
                          <span>Zoom: {currentMap.zoom || 16}x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Map Background Canvas (Realistic Bangkok Riverbend Map around Rama 3) */
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

                    {/* Expressways (Orange Highway) */}
                    <g stroke="#F6C358" strokeWidth="8" fill="none" opacity="0.95">
                      <path d="M 120,650 Q 500,450 720,0" />
                      <path d="M 450,650 Q 750,350 1200,200" />
                    </g>
                    <g stroke="#DE9B26" strokeWidth="2" fill="none" opacity="0.8">
                      <path d="M 120,650 Q 500,450 720,0" />
                      <path d="M 450,650 Q 750,350 1200,200" />
                    </g>

                    {/* Chao Phraya River Curve */}
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

                    {/* District / Sub-district Labels in Thai */}
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

                  {/* The Custom GIS GROUP Marker Pin on Rama 3 */}
                  <div 
                    className="absolute z-20 transition-transform hover:scale-110 cursor-pointer"
                    style={{ top: '35%', right: '27%' }}
                    title="GIS GROUP Headquarters (พระราม 3)"
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-[#F26522] text-white font-black italic px-4 py-2 rounded-lg shadow-2xl flex items-center gap-1.5 border-2 border-white tracking-wider text-sm">
                        <span className="font-sans">GIS</span>
                        <span className="text-amber-300">GROUP</span>
                      </div>
                      <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-[#F26522] -mt-0.5 filter drop-shadow-md"></div>
                      <div className="w-4 h-4 rounded-full bg-orange-500/40 animate-ping -mt-1"></div>
                    </div>
                  </div>
                </div>
              )}

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
      {/* ========================================================================= */}
      {/* TAB 3: HEADQUARTERS & REAL MAP GIS CONTROL */}
      {/* ========================================================================= */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          {/* Top Section: Interactive Map Showcase & Live Pin Finder */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-orange-100 text-gis-orange flex items-center justify-center">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>ศูนย์ควบคุมแผนที่จริง & ปักหมุดพิกัด (Real Map & GIS Coordinates)</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      Live Dynamic Map
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    หมุดจะขยับตามพิกัดและที่อยู่ที่ตั้งค่าไว้แบบ Real-time รองรับทั้งชื่อสถานที่ ที่อยู่ และพิกัด GPS
                  </p>
                </div>
              </div>

              {/* Map Mode Buttons inside Tab 3 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateMapField('mapType', currentMap.mapType === 'k' ? 'm' : 'k')}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-gis-orange" />
                  <span>{currentMap.mapType === 'k' ? 'สลับเป็นแผนที่ถนน' : 'สลับเป็นภาพดาวเทียม'}</span>
                </button>
                <a
                  href={currentMap.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(currentMap.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-gis-orange rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>เปิด Google Maps</span>
                </a>
              </div>
            </div>

            {/* Fast Location Search & Quick Presets Bar */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
              <form onSubmit={handleGeocodeSearch} className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="พิมพ์ชื่อสถานที่ หรือที่อยู่ เพื่อค้นหาและย้ายหมุดจริง เช่น พระราม 3, อาคารสีลม, นิคมมาบตาพุด..."
                    value={mapSearchText}
                    onChange={(e) => setMapSearchText(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearchingLocation}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gis-orange hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 shrink-0 transition-all disabled:opacity-50"
                >
                  {isSearchingLocation ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>กำลังค้นหา...</span>
                    </>
                  ) : (
                    <>
                      <Crosshair className="w-3.5 h-3.5" />
                      <span>ค้นหาและปักหมุดจริง</span>
                    </>
                  )}
                </button>
              </form>

              {/* Presets Chips */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  พิกัดด่วน:
                </span>
                {PRESET_LOCATIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPresetLocation(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                      currentMap.locationName === preset.locationName
                        ? 'bg-gis-orange text-white border-orange-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Map Box */}
            <div className="relative h-96 w-full rounded-xl overflow-hidden border border-slate-300 shadow-md bg-slate-100">
              <iframe
                key={`tab3-${currentMap.lat}-${currentMap.lng}-${currentMap.zoom}-${currentMap.mapType}-${currentMap.address}`}
                title="Interactive Admin Map"
                src={getMapEmbedUrl(currentMap, currentMap.mapType === 'k' ? 'satellite' : 'real')}
                className="w-full h-full border-0 absolute inset-0 filter saturate-105"
                loading="lazy"
              />

              {/* Floating Map HUD */}
              <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-lg shadow-md border border-slate-200/80 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gis-orange animate-bounce" />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">{currentMap.locationName || 'สำนักงานใหญ่'}</span>
                  <span className="text-slate-400 font-mono ml-2">
                    ({currentMap.lat?.toFixed(4)}, {currentMap.lng?.toFixed(4)})
                  </span>
                </div>
              </div>

              {/* Floating Action Controls on Map */}
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyCoordsToClipboard}
                  className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-slate-700 hover:text-gis-orange hover:bg-white text-xs font-semibold rounded-lg shadow-md border border-slate-200 flex items-center gap-1.5 transition-all"
                  title="คัดลอกพิกัด GPS"
                >
                  {copiedCoords ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCoords ? 'คัดลอกแล้ว!' : 'คัดลอก GPS'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Coordinates & Location Form */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building2 className="w-5 h-5 text-gis-orange" />
              <h3 className="text-base font-bold text-slate-900">
                ตั้งค่าพิกัด & รายละเอียดสถานที่ (Location & Pin Settings)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Location Name */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ชื่อสถานที่สำหรับป้ายหมุด (Pin Title / Location Name)
                </label>
                <input
                  type="text"
                  value={currentMap.locationName || ''}
                  onChange={(e) => updateMapField('locationName', e.target.value)}
                  placeholder="เช่น GIS GROUP Co., Ltd. (สำนักงานใหญ่ พระราม 3)"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              {/* Address (Thai) */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    ที่อยู่สำนักงานใหญ่ (Address - ภาษาไทย)
                  </label>
                  <span className="text-[11px] text-slate-400">
                    * อัปเดตไปยัง Footer และแผนที่อัตโนมัติ
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={currentMap.address || ''}
                  onChange={(e) => updateMapField('address', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              {/* Latitude */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ละติจูด (Latitude)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={currentMap.lat ?? 13.6844}
                  onChange={(e) => updateMapField('lat', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              {/* Longitude */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ลองจิจูด (Longitude)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={currentMap.lng ?? 100.5375}
                  onChange={(e) => updateMapField('lng', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              {/* Zoom Level Slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    ระดับการซูมเริ่มต้น (Zoom: {currentMap.zoom || 16}x)
                  </label>
                </div>
                <input
                  type="range"
                  min="10"
                  max="19"
                  step="1"
                  value={currentMap.zoom || 16}
                  onChange={(e) => updateMapField('zoom', parseInt(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer mt-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>10 (เมือง)</span>
                  <span>16 (ถนน/อาคาร)</span>
                  <span>19 (เจาะจงจุด)</span>
                </div>
              </div>

              {/* Google Maps Link */}
              <div className="lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ลิงก์ Google Maps สำหรับผู้เข้าชมเว็บ (Google Maps Link)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={currentMap.googleMapsUrl || ''}
                    onChange={(e) => updateMapField('googleMapsUrl', e.target.value)}
                    className="flex-1 px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium text-blue-600 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                  <a
                    href={currentMap.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(currentMap.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shrink-0 flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>ทดสอบเปิดลิงก์</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Headquarters Contacts */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Phone className="w-5 h-5 text-gis-orange" />
              <h3 className="text-base font-bold text-slate-900">
                ข้อมูลช่องทางติดต่อสำนักงานใหญ่ (Headquarters Contacts)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-bold text-gis-orange focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
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
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
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
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
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
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
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
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>
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
