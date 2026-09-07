import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { initialAboutSections } from '../data/aboutSectionsData';
import {
  Users,
  Award,
  ShieldCheck,
  Lock,
  Trophy,
  HelpCircle,
  FileText,
  Leaf,
  Building2,
  TrendingUp,
  ChevronRight,
  X,
  GraduationCap,
  Briefcase,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const TAB_CONFIG = [
  { id: 'about-us', label: 'About Us', labelTh: 'รู้จัก จีไอเอส', icon: Building2 },
  { id: 'org-structure', label: 'Organizational Structure', labelTh: 'โครงสร้างองค์กร', icon: Users },
  { id: 'ethics', label: 'Ethics', labelTh: 'จรรยาบรรณธุรกิจ', icon: ShieldCheck },
  { id: 'values', label: 'Values', labelTh: 'ค่านิยมองค์กร (G-I-S)', icon: TrendingUp },
  { id: 'iso-9001', label: 'ISO 9001:2015', labelTh: 'มาตรฐาน ISO 9001', icon: Award },
  { id: 'iso-45001', label: 'ISO45001:2018', labelTh: 'มาตรฐาน ISO 45001', icon: Award },
  { id: 'iso-27001', label: 'ISO / IEC 27001:2022', labelTh: 'มาตรฐาน ISO 27001', icon: Lock },
  { id: 'achievement', label: 'Achievement', labelTh: 'ผลงานและความสำเร็จ', icon: Trophy },
  { id: 'why-choose', label: 'Why Choose', labelTh: 'ทำไมต้องเลือกเรา', icon: HelpCircle },
  { id: 'policy', label: 'Policy', labelTh: 'นโยบายองค์กร', icon: FileText },
  { id: 'carbon-footprint', label: 'Carbon Footprint', labelTh: 'คาร์บอนฟุตพริ้นท์', icon: Leaf }
];

export const AboutSection = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('org-structure');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);

  // Load merged data from localStorage (admin) or fallback to initialAboutSections
  const [aboutData, setAboutData] = useState(initialAboutSections);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('GIS_ADMIN_DATA_V1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.aboutSections) {
          setAboutData(prev => ({ ...prev, ...parsed.aboutSections }));
        }
      }
    } catch (e) {
      console.warn('Could not read admin data from localStorage:', e);
    }
  }, []);

  // Sync with hash if loaded with specific tab
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('org') || hash.includes('structure')) setActiveTab('org-structure');
      else if (hash.includes('ethics')) setActiveTab('ethics');
      else if (hash.includes('values')) setActiveTab('values');
      else if (hash.includes('9001')) setActiveTab('iso-9001');
      else if (hash.includes('45001')) setActiveTab('iso-45001');
      else if (hash.includes('27001') || hash.includes('iec')) setActiveTab('iso-27001');
      else if (hash.includes('achievement')) setActiveTab('achievement');
      else if (hash.includes('why')) setActiveTab('why-choose');
      else if (hash.includes('policy')) setActiveTab('policy');
      else if (hash.includes('carbon')) setActiveTab('carbon-footprint');
      else if (hash.includes('about')) setActiveTab('about-us');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const cur = aboutData[activeTab] || initialAboutSections[activeTab] || initialAboutSections['about-us'];

  // Bilingual Title and Description getters
  const displayTitle = lang === 'th' 
    ? (cur.titleTh || cur.title || (activeTab === 'ethics' ? 'จรรยาบรรณธุรกิจ (Ethics)' : activeTab === 'why-choose' ? 'ทำไมต้องเลือกเรา (Why Choose)' : activeTab === 'achievement' ? 'ผลงานและความสำเร็จ' : 'โครงสร้างองค์กร'))
    : (cur.titleEn || cur.title || (activeTab === 'ethics' ? 'ETHICS' : activeTab === 'why-choose' ? 'WHY CHOOSE' : activeTab === 'achievement' ? 'Achievement' : 'Organizational Structure'));

  const displayDesc = lang === 'th'
    ? (cur.descTh || cur.desc)
    : (cur.descEn || cur.desc);

  return (
    <section id="about" className="relative bg-[#F4F6F9] text-slate-800 overflow-hidden py-12 lg:py-16 border-t border-slate-200">
      
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Mobile Horizontal Tabs Selector */}
        <div className="lg:hidden mb-8 overflow-x-auto pb-2 scrollbar-none flex gap-2">
          {TAB_CONFIG.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                  isActive
                    ? 'bg-[#2D3748] text-white ring-2 ring-[#EA580C]'
                    : 'bg-[#F26522] text-white hover:bg-[#EA580C]'
                }`}
              >
                <Icon size={14} />
                <span>{lang === 'th' ? tab.labelTh : tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Layout (Content on Left, 11 Slanted Tabs on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ============================================================ */}
          {/* LEFT 9 COLS: DYNAMIC VIEW AREA */}
          {/* ============================================================ */}
          <div className="lg:col-span-8 xl:col-span-9 bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-200/80 min-h-[720px] flex flex-col justify-between transition-all">
            
            <div>
              {/* Top Accent Dashed Orange Line matching screenshots */}
              <div className="flex items-center gap-1.5 mb-3 text-[#EA580C] select-none">
                <span className="text-xl font-black tracking-[0.2em]">_ _ _ _ _ _ _ _ _ _</span>
              </div>

              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#EA580C] uppercase tracking-tight font-display">
                  {displayTitle}
                </h2>
                {displayDesc && (
                  <div
                    className="text-sm text-slate-500 font-medium mt-2 max-w-3xl leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: displayDesc }}
                  />
                )}
              </div>

              {/* -------------------------------------------------------- */}
              {/* TAB 1: ORGANIZATIONAL STRUCTURE (Screenshot 1) */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'org-structure' && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
                    {((cur.members && cur.members.length > 0) ? cur.members : initialAboutSections['org-structure'].members).map((member, idx) => {
                      const name = lang === 'th' ? (member.nameTh || member.name) : (member.nameEn || member.name);
                      const role = lang === 'th' ? (member.roleTh || member.role) : (member.roleEn || member.role);

                      return (
                        <div
                          key={member.id || idx}
                          onClick={() => setSelectedMember(member)}
                          className="group cursor-pointer flex flex-col items-center transition-transform duration-300 hover:-translate-y-1.5"
                        >
                          {/* Tilted Orange Parallelogram Card Frame */}
                          <div className="relative w-full max-w-[210px] aspect-[4/5] bg-gradient-to-b from-white to-slate-50 border-2 border-[#EA580C] rounded-sm p-3 shadow-md overflow-hidden flex flex-col items-center justify-center transition-all group-hover:shadow-xl group-hover:border-[#F26522]">
                            
                            <div className="w-full h-full bg-slate-100/90 rounded flex flex-col items-center justify-center relative overflow-hidden border border-slate-200">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={name}
                                  className="w-full h-full object-cover object-top filter brightness-100 contrast-105"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center p-4 text-center">
                                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-100 to-amber-50 border-2 border-[#EA580C]/40 flex items-center justify-center text-[#EA580C] shadow-inner mb-2 group-hover:scale-110 transition-transform">
                                    <Users size={36} className="text-[#EA580C]" />
                                  </div>
                                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    GIS TEAM
                                  </span>
                                </div>
                              )}

                              {/* View info pill on hover */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold gap-1 backdrop-blur-[2px]">
                                <span>{lang === 'th' ? 'ดูประวัติ' : 'View Bio'}</span>
                                <ChevronRight size={14} />
                              </div>
                            </div>
                          </div>

                          {/* Orange Position Trapezoid Badge */}
                          <div className="w-full max-w-[210px] mt-2.5">
                            <div className="bg-[#EA580C] text-white text-center py-1.5 px-2 rounded-t-sm shadow-sm">
                              <p className="text-[11px] sm:text-xs font-bold leading-tight line-clamp-1">
                                {role}
                              </p>
                            </div>
                            
                            {/* Dark Gray Name Pill Badge */}
                            <div className="bg-[#4A5568] text-white text-center py-1 px-2 rounded-b-sm shadow-sm">
                              <p className="text-[11px] sm:text-xs font-medium leading-tight line-clamp-1 text-slate-100">
                                {name}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {lang === 'th' 
                        ? '* คลิกที่รายชื่อผู้บริหารเพื่อดูวุฒิการศึกษาและประสบการณ์ทำงาน'
                        : '* Click any executive to view full education & background'}
                    </span>
                    <span className="font-semibold text-[#EA580C]">GIS GROUP LEADERSHIP</span>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 2: ETHICS (Screenshot 2) */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'ethics' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                  
                  {/* Left Column: 3 Orange Pill Badges & Content */}
                  <div className="lg:col-span-7 space-y-6">
                    {((cur.blocks && cur.blocks.length > 0) ? cur.blocks : initialAboutSections['ethics'].blocks).map((block, idx) => {
                      const badge = lang === 'th' ? (block.badgeTh || block.badge) : (block.badgeEn || block.badge);
                      const text = lang === 'th' ? (block.textTh || block.text) : (block.textEn || block.text);

                      return (
                        <div key={block.id || idx} className="space-y-2.5">
                          {/* Orange Stadium Pill Header */}
                          <div className="inline-block">
                            <div className="bg-[#F8A575] text-[#2D3748] px-6 py-2 rounded-full font-bold text-base sm:text-lg shadow-sm border border-orange-200">
                              {badge}
                            </div>
                          </div>

                          {/* Paragraph content */}
                          <p className="text-slate-700 text-sm sm:text-base leading-relaxed pl-2 font-normal">
                            {text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Visual Container */}
                  <div className="lg:col-span-5 flex justify-center items-center">
                    <div className="relative w-full max-w-md bg-gradient-to-tr from-orange-50 via-slate-50 to-white rounded-2xl p-6 border border-orange-200 shadow-lg flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#EA580C] to-[#F26522] flex items-center justify-center text-white shadow-lg mb-4">
                        <ShieldCheck size={48} />
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">
                        {lang === 'th' ? 'มาตรฐานจรรยาบรรณวิศวกรรม' : 'Engineering Ethics & Standards'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {lang === 'th'
                          ? 'GIS GROUP มุ่งมั่นปฏิบัติงานด้วยความซื่อสัตย์ โปร่งใส ปฏิบัติตามมาตรฐานวิศวกรรมระดับสากล และรับผิดชอบต่อผู้มีส่วนได้ส่วนเสียทุกภาคส่วน'
                          : 'Committed to integrity, transparency, international engineering standards, and responsibility towards all stakeholders.'}
                      </p>
                      
                      <div className="mt-6 grid grid-cols-2 gap-3 w-full text-left">
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-[#EA580C]">{lang === 'th' ? '100% โปร่งใส' : '100% Integrity'}</div>
                          <div className="text-[11px] text-slate-500">{lang === 'th' ? 'ตรวจสอบได้ทุกโครงการ' : 'Transparent Audits'}</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-[#EA580C]">ISO 27001</div>
                          <div className="text-[11px] text-slate-500">{lang === 'th' ? 'รักษาความลับลูกค้า' : 'Data Confidentiality'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 3: ACHIEVEMENT (Screenshot 3) */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'achievement' && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                    {((cur.awards && cur.awards.length > 0) ? cur.awards : initialAboutSections['achievement'].awards).map((award, idx) => {
                      const title = lang === 'th' ? (award.titleTh || award.title) : (award.titleEn || award.title);
                      const subtitle = lang === 'th' ? (award.subtitleTh || award.subtitle) : (award.subtitleEn || award.subtitle);

                      return (
                        <div
                          key={award.id || idx}
                          onClick={() => setSelectedAward(award)}
                          className="group cursor-pointer bg-white border-2 border-[#EA580C] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                        >
                          <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 via-white to-orange-50/40 p-4 flex flex-col items-center justify-center text-center overflow-hidden border-b border-orange-100">
                            <div className="w-14 h-14 rounded-full bg-orange-100 text-[#EA580C] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <Trophy size={28} />
                            </div>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              {award.category || 'RECOGNITION'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {award.year || 'GIS GROUP'}
                            </span>

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[10px] bg-[#EA580C] text-white px-2 py-0.5 rounded font-bold">
                                {lang === 'th' ? 'ขยายดู' : 'View'}
                              </span>
                            </div>
                          </div>

                          <div className="bg-[#EA580C] text-white p-3 text-center transition-colors group-hover:bg-[#F26522]">
                            <h4 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">
                              {title}
                            </h4>
                            {subtitle && (
                              <p className="text-[10px] text-orange-100 mt-0.5 font-medium line-clamp-1">
                                {subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {lang === 'th' 
                        ? '* คลิกที่แต่ละรางวัลเพื่อดูรายละเอียดหนังสือรับรองและเกียรติบัตร'
                        : '* Click any award card to read verification details'}
                    </span>
                    <span className="font-semibold text-[#EA580C]">25 YEARS OF EXCELLENCE</span>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 4: WHY CHOOSE (Screenshot 4) */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'why-choose' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                  
                  {/* Left Column: 8 Speech Bubble Question Points */}
                  <div className="lg:col-span-8 space-y-4">
                    {(lang === 'th' 
                      ? (cur.reasonsTh || cur.reasons || initialAboutSections['why-choose'].reasonsTh)
                      : (cur.reasonsEn || cur.reasons || initialAboutSections['why-choose'].reasonsEn)
                    ).map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 group">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#F26522] flex-shrink-0 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform mt-0.5">
                          <HelpCircle size={18} className="text-white" />
                        </div>

                        <div className="flex-1 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                          {reason}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Visual Hero Card */}
                  <div className="lg:col-span-4 flex justify-center">
                    <div className="w-full max-w-sm bg-gradient-to-b from-orange-50 via-white to-slate-50 rounded-2xl p-6 border-2 border-orange-200 shadow-xl text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#EA580C] to-[#F26522] flex items-center justify-center text-white shadow-lg mb-4">
                        <CheckCircle2 size={40} />
                      </div>
                      
                      <h4 className="text-lg font-black text-slate-800 font-display">
                        {lang === 'th' ? 'ทำไมต้อง จีไอเอส กรุ๊ป' : 'Why Choose GIS Group'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {lang === 'th'
                          ? 'ส่งมอบงานตรงเวลา ควบคุมงบประมาณได้ พร้อมมาตรฐานวิศวกรรมสากล ISO 3 ด้าน และทีมงานวิศวกรผู้เชี่ยวชาญกว่า 150 ท่าน'
                          : 'On-time turnkey MEP delivery, budget control, triple ISO standards, and a dedicated team of over 150 specialized engineers.'}
                      </p>

                      <div className="mt-5 space-y-2">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-left flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
                          <span className="text-xs font-bold text-slate-700">
                            {lang === 'th' ? 'รับประกันคุณภาพงาน 100%' : '100% Quality Guaranteed'}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-left flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
                          <span className="text-xs font-bold text-slate-700">
                            {lang === 'th' ? 'บริการฉุกเฉิน 24 ชั่วโมง 365 วัน' : '24/7 Rapid Emergency Response'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 5: ABOUT US */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'about-us' && (
                <div className="space-y-6 pt-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                      {(lang === 'th'
                        ? (cur.paragraphsTh || cur.paragraphs || initialAboutSections['about-us'].paragraphsTh)
                        : (cur.paragraphsEn || cur.paragraphs || initialAboutSections['about-us'].paragraphsEn)
                      ).map((p, idx) => (
                        <div key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-[#1F2937] text-white p-8 rounded-2xl border border-slate-800 shadow-xl">
                      <span className="text-xs font-bold text-[#EA580C] uppercase tracking-widest">
                        ESTABLISHED SINCE 2000
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black mt-2 mb-4 font-display">
                        LEADING ENGINEERING & MEP CONTRACTOR
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        {lang === 'th'
                          ? 'ผู้นำด้านวิศวกรรมระบบประกอบอาคาร โรงงาน และโครงสร้างพื้นฐานระดับประเทศ ผ่านการรับรองมาตรฐานสากล ISO ครบวงจร'
                          : 'A leading engineering turnkey contractor for commercial, industrial, and national infrastructure with ISO accreditations.'}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-3 border-t border-slate-800 pt-5 text-center">
                        <div>
                          <div className="text-2xl sm:text-3xl font-black text-[#EA580C]">24+</div>
                          <div className="text-[11px] text-slate-400 mt-1">{lang === 'th' ? 'ปีประสบการณ์' : 'Years'}</div>
                        </div>
                        <div>
                          <div className="text-2xl sm:text-3xl font-black text-[#EA580C]">5</div>
                          <div className="text-[11px] text-slate-400 mt-1">{lang === 'th' ? 'มาตรฐาน ISO' : 'ISO Certs'}</div>
                        </div>
                        <div>
                          <div className="text-2xl sm:text-3xl font-black text-[#EA580C]">100%</div>
                          <div className="text-[11px] text-slate-400 mt-1">{lang === 'th' ? 'ความปลอดภัย' : 'Safety'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 6: VALUES */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'values' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {(cur.cards || initialAboutSections['values'].cards).map((item, idx) => {
                    const desc = lang === 'th' ? (item.descTh || item.desc) : (item.descEn || item.desc);
                    const detail = lang === 'th' ? (item.detailTh || item.detail) : (item.detailEn || item.detail);

                    return (
                      <div
                        key={idx}
                        className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-md hover:border-[#EA580C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-16 h-16 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-black text-3xl font-display mb-4">
                            {item.letter}
                          </div>
                          <h3 className="text-xl font-black text-slate-800 font-display">
                            {item.title1} {item.title2}
                          </h3>
                          <h4 className="text-xs font-bold text-[#EA580C] mt-1 mb-3">
                            {desc}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {detail}
                          </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                          <span>GIS CORE DNA</span>
                          <Sparkles size={14} className="text-[#EA580C]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TABS 7, 8, 9: ISO 9001, 45001, 27001 */}
              {/* -------------------------------------------------------- */}
              {(activeTab === 'iso-9001' || activeTab === 'iso-45001' || activeTab === 'iso-27001') && (
                <div className="space-y-6 pt-2">
                  <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="text-[#EA580C]" size={24} />
                      <h3 className="text-xl font-bold text-slate-800">
                        {cur.certificateNo || cur.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">
                        {lang === 'th' ? 'ขอบข่ายการรับรอง (Scope):' : 'Scope of Registration:'}
                      </strong>{' '}
                      {lang === 'th' ? (cur.scopeTh || cur.scope) : (cur.scopeEn || cur.scope)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        {lang === 'th' ? 'รายละเอียดมาตรฐาน' : 'Standard Overview'}
                      </h4>
                      {(lang === 'th'
                        ? (cur.paragraphsTh || cur.paragraphs || [])
                        : (cur.paragraphsEn || cur.paragraphs || [])
                      ).map((p, idx) => (
                        <div key={idx} className="text-xs sm:text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        {lang === 'th' ? 'จุดเด่นการปฏิบัติงาน' : 'Key Principles'}
                      </h4>
                      <div className="space-y-2">
                        {(lang === 'th'
                          ? [
                              'การควบคุมกระบวนการวิศวกรรมตามเกณฑ์มาตรฐานสากล',
                              'การประเมินความเสี่ยงและแผนบริหารความต่อเนื่องทางธุรกิจ',
                              'การปรับปรุงประสิทธิภาพและทดสอบระบบก่อนส่งมอบ 100%'
                            ]
                          : [
                              'Comprehensive quality compliance across all MEP engineering workflows',
                              'Systematic risk assessment and continuous improvement processes',
                              'Strict 100% pre-commissioning testing and verification protocols'
                            ]
                        ).map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                            <CheckCircle2 size={16} className="text-[#EA580C] flex-shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 10: POLICY */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'policy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {(cur.policies || initialAboutSections['policy'].policies).map((p, idx) => {
                    const title = lang === 'th' ? (p.titleTh || p.title) : (p.titleEn || p.title);
                    const desc = lang === 'th' ? (p.descTh || p.desc) : (p.descEn || p.desc);

                    return (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-[#EA580C] transition-colors">
                        <h4 className="text-sm sm:text-base font-bold text-[#EA580C] mb-2 flex items-center gap-2">
                          <FileText size={16} />
                          {title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* -------------------------------------------------------- */}
              {/* TAB 11: CARBON FOOTPRINT */}
              {/* -------------------------------------------------------- */}
              {activeTab === 'carbon-footprint' && (
                <div className="space-y-6 pt-2">
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-6">
                    <div className="flex items-center gap-2.5 mb-2">
                      <Leaf className="text-emerald-600" size={22} />
                      <h3 className="text-lg font-bold text-slate-800">
                        {lang === 'th' ? 'นโยบายความยั่งยืนและการลดคาร์บอน' : 'Sustainability & Net Zero Policy'}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {lang === 'th' 
                        ? (cur.sustainabilityPolicyTh || cur.sustainabilityPolicy) 
                        : (cur.sustainabilityPolicyEn || cur.sustainabilityPolicy)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {(cur.services || initialAboutSections['carbon-footprint'].services).map((srv, idx) => (
                      <div key={idx} className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm hover:border-emerald-500 transition-colors">
                        <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-display">
                          {srv.code}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 mt-2 mb-1.5">
                          {lang === 'th' ? (srv.titleTh || srv.title) : (srv.titleEn || srv.title)}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {lang === 'th' ? (srv.descTh || srv.desc) : (srv.descEn || srv.desc)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span>
                      {lang === 'th'
                        ? (cur.consultingNoteTh || cur.consultingNote)
                        : (cur.consultingNoteEn || cur.consultingNote)}
                    </span>
                    <span className="font-bold text-[#EA580C]">TGO CERTIFIED</span>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Section Accreditations Bar */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
                <span className="font-semibold text-slate-700">GIS GROUP (THAILAND)</span>
                <span>• ISO 9001 • ISO 45001 • ISO 27001</span>
              </div>
              <a
                href="#contact"
                className="text-[#EA580C] font-bold hover:underline flex items-center gap-1"
              >
                <span>{lang === 'th' ? 'ติดต่อสอบถามเพิ่มเติม' : 'Contact Engineering Team'}</span>
                <ChevronRight size={14} />
              </a>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT 3-4 COLS: 11 SLANTED TABS MENU RAIL (Matching Screenshots) */}
          {/* ============================================================ */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-2.5 sticky top-24">
            
            {TAB_CONFIG.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.location.hash = `#v-${tab.id}`;
                  }}
                  className={`w-full text-left py-3 px-5 transition-all duration-200 flex items-center justify-between group shadow-sm rounded-l-md rounded-r-2xl border ${
                    isActive
                      ? 'bg-[#374151] text-white border-slate-600 shadow-lg translate-x-1 ring-1 ring-orange-500/50'
                      : 'bg-[#F26522] hover:bg-[#EA580C] text-white border-transparent hover:translate-x-1 shadow-md'
                  }`}
                  style={{
                    clipPath: 'polygon(0 0, 96% 0, 100% 50%, 96% 100%, 0 100%)'
                  }}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20 text-white">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs xl:text-sm font-bold tracking-wide">
                      {lang === 'th' ? tab.labelTh : tab.label}
                    </span>
                  </div>

                  <ChevronRight
                    size={15}
                    className={`transition-transform duration-200 ${
                      isActive ? 'text-[#EA580C] translate-x-0.5' : 'text-white/70 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* MEMBER DETAILS MODAL */}
      {/* ============================================================ */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg font-display text-2xl font-black">
                {selectedMember.nameTh ? selectedMember.nameTh.charAt(0) : 'G'}
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                  {lang === 'th' ? (selectedMember.roleTh || selectedMember.role) : (selectedMember.roleEn || selectedMember.role)}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mt-1">
                  {lang === 'th' ? (selectedMember.nameTh || selectedMember.name) : (selectedMember.nameEn || selectedMember.name)}
                </h3>
                {selectedMember.nameEn && lang === 'th' && (
                  <p className="text-xs text-slate-400">{selectedMember.nameEn}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {(selectedMember.educationTh || selectedMember.educationEn || selectedMember.education) && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                    <GraduationCap size={16} className="text-[#EA580C]" />
                    <span>{lang === 'th' ? 'วุฒิการศึกษา' : 'Education & Credentials'}</span>
                  </div>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    {lang === 'th'
                      ? (selectedMember.educationTh || selectedMember.education)
                      : (selectedMember.educationEn || selectedMember.education)}
                  </p>
                </div>
              )}

              {(selectedMember.experienceTh || selectedMember.experienceEn || selectedMember.experience) && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-700 mb-1">
                    <Briefcase size={16} className="text-[#EA580C]" />
                    <span>{lang === 'th' ? 'ประวัติและประสบการณ์ทำงาน' : 'Professional Background'}</span>
                  </div>
                  <p className="text-slate-600 pl-6 leading-relaxed">
                    {lang === 'th'
                      ? (selectedMember.experienceTh || selectedMember.experience)
                      : (selectedMember.experienceEn || selectedMember.experience)}
                  </p>
                </div>
              )}

              {(selectedMember.specialtyTh || selectedMember.specialtyEn || selectedMember.specialty) && (
                <div className="bg-orange-50/60 p-3.5 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-2 font-bold text-[#EA580C] mb-1">
                    <Sparkles size={16} />
                    <span>{lang === 'th' ? 'ความเชี่ยวชาญพิเศษ' : 'Key Expertise'}</span>
                  </div>
                  <p className="text-slate-700 pl-6 leading-relaxed">
                    {lang === 'th'
                      ? (selectedMember.specialtyTh || selectedMember.specialty)
                      : (selectedMember.specialtyEn || selectedMember.specialty)}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors"
              >
                {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* AWARD DETAILS MODAL */}
      {/* ============================================================ */}
      {selectedAward && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedAward(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-[#EA580C] flex items-center justify-center">
                <Trophy size={24} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider">
                  {selectedAward.category || 'RECOGNITION'} • {selectedAward.year}
                </span>
                <h3 className="text-lg font-bold text-slate-800">
                  {lang === 'th' ? (selectedAward.titleTh || selectedAward.title) : (selectedAward.titleEn || selectedAward.title)}
                </h3>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              {lang === 'th' ? (selectedAward.descTh || selectedAward.desc) : (selectedAward.descEn || selectedAward.desc)}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium">GIS GROUP ACCOMPANYING SUCCESS</span>
              <button
                onClick={() => setSelectedAward(null)}
                className="px-5 py-2 bg-[#EA580C] hover:bg-[#F26522] text-white rounded-lg font-bold transition-colors"
              >
                {lang === 'th' ? 'ตกลง' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
