import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Info,
  Briefcase,
  Layers,
  FolderGit2,
  Newspaper,
  Mail,
  Settings,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Flame,
  LogOut,
  User,
  UserCheck
} from 'lucide-react';

export const Sidebar = () => {
  const { activeView, setActiveView, logout, currentUser } = useAdmin();

  // Accordion state for expandable menu groups (all collapsed by default)
  const [expanded, setExpanded] = useState({
    about: false,
    business: false,
    productsServices: false,
    projects: false,
    news: false,
    career: false,
    contact: false,
    settings: false
  });

  const toggleGroup = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-64 bg-[#111D35] text-slate-300 flex flex-col h-screen sticky top-0 select-none shadow-2xl z-30">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800/80 bg-[#0C1527]/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-gis-orange to-amber-500 flex items-center justify-center text-white font-black text-lg tracking-wider shadow-md shadow-orange-500/20">
            G
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black tracking-wider text-lg text-white font-sans">GIS</span>
              <span className="font-extrabold tracking-wide text-lg text-gis-orange">GROUP</span>
            </div>
            <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-widest">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 sidebar-scroll">
        {/* GROUP 1: ภาพรวม & หน้าแรก */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            ภาพรวม & หน้าแรก
          </div>
          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeView === 'dashboard'
                ? 'bg-white text-slate-900 shadow-md font-semibold'
                : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${activeView === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>หน้าหลัก (Dashboard)</span>
          </button>
        </div>

        {/* GROUP 2: Menu Main */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu Main
          </div>
          <button
            type="button"
            onClick={() => setActiveView('banner')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeView === 'banner'
                ? 'bg-white text-slate-900 shadow-md font-semibold'
                : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
            }`}
          >
            <ImageIcon className={`w-4 h-4 ${activeView === 'banner' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Banner</span>
          </button>
        </div>

        {/* GROUP 3: จัดการเนื้อหาเว็บไซต์ */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            จัดการเนื้อหาเว็บไซต์
          </div>

          <div className="space-y-1">
            {/* เกี่ยวกับเรา (About Us) with Expandable */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleGroup('about');
                  setActiveView('about');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeView.startsWith('about')
                    ? 'bg-[#1A2B4C] text-white font-semibold'
                    : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>เกี่ยวกับเรา (About Us)</span>
                </div>
                {expanded.about ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expanded.about && (
                <div className="pl-6 pr-2 py-1 space-y-0.5 border-l border-slate-700/60 ml-5 my-1 max-h-80 overflow-y-auto sidebar-scroll">
                  {[
                    { id: 'about-us', label: 'About Us' },
                    { id: 'about-org', label: 'Organizational Structure' },
                    { id: 'about-ethics', label: 'Ethics' },
                    { id: 'about-values', label: 'Values' },
                    { id: 'about-iso9001', label: 'ISO 9001:2015' },
                    { id: 'about-iso45001', label: 'ISO45001:2018' },
                    { id: 'about-iso27001', label: 'ISO / IEC 27001:2022' },
                    { id: 'about-achievement', label: 'Achievement' },
                    { id: 'about-why-choose', label: 'Why Choose' },
                    { id: 'about-policy', label: 'Policy' },
                    { id: 'about-carbon', label: 'Carbon Footprint' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveView(sub.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-all truncate block ${
                        activeView === sub.id || (sub.id === 'about-us' && activeView === 'about')
                          ? 'text-gis-orange font-semibold bg-[#14213D] shadow-inner'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A2B4C]/40'
                      }`}
                      title={sub.label}
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* กลุ่มธุรกิจ (Our Business) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleGroup('business');
                  setActiveView('business');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeView.startsWith('business')
                    ? 'bg-[#1A2B4C] text-white font-semibold'
                    : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  <span>กลุ่มธุรกิจ (Our Business)</span>
                </div>
                {expanded.business ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expanded.business && (
                <div className="pl-6 pr-2 py-1 space-y-0.5 border-l border-slate-700/60 ml-5 my-1">
                  {[
                    { id: 'business-epc', label: 'EPC DIVISION' },
                    { id: 'business-ibt', label: 'IBT DIVISION' },
                    { id: 'business-enr', label: 'ENR DIVISION' }
                  ].map((div) => (
                    <button
                      key={div.id}
                      type="button"
                      onClick={() => setActiveView(div.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-all truncate block ${
                        activeView === div.id
                          ? 'text-gis-orange font-semibold bg-[#14213D] shadow-inner'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A2B4C]/40'
                      }`}
                      title={div.label}
                    >
                      • {div.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* สินค้าและบริการ (Products & Services) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleGroup('productsServices');
                  setActiveView('products-services');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeView.startsWith('products') || activeView === 'services'
                    ? 'bg-[#1A2B4C] text-white font-semibold'
                    : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Products & Services</span>
                </div>
                {expanded.productsServices ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expanded.productsServices && (
                <div className="pl-6 pr-2 py-1 space-y-0.5 border-l border-slate-700/60 ml-5 my-1">
                  {[
                    { id: 'products', label: 'Products' },
                    { id: 'services', label: 'Services' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveView(item.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-all truncate block ${
                        activeView === item.id || (item.id === 'products' && activeView === 'products-services')
                          ? 'text-gis-orange font-semibold bg-[#14213D] shadow-inner'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A2B4C]/40'
                      }`}
                      title={item.label}
                    >
                      • {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ผลงานโครงการอ้างอิง (Projects Reference) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleGroup('projects');
                  setActiveView('projects');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeView.startsWith('projects')
                    ? 'bg-[#1A2B4C] text-white font-semibold'
                    : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-4 h-4 text-emerald-400" />
                  <span>Projects Reference</span>
                </div>
                {expanded.projects ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expanded.projects && (
                <div className="pl-6 pr-2 py-1 space-y-0.5 border-l border-slate-700/60 ml-5 my-1 max-h-72 overflow-y-auto sidebar-scroll">
                  {[
                    { id: 'projects', label: 'All Projects' },
                    { id: 'projects-highlight', label: 'Highlight Project' },
                    { id: 'projects-government', label: 'Government' },
                    { id: 'projects-commercial', label: 'Commercial' },
                    { id: 'projects-industrial', label: 'Industrial' },
                    { id: 'projects-health-education', label: 'Health & Education' },
                    { id: 'projects-critical-space', label: 'Critical Space' },
                    { id: 'projects-residential', label: 'Residential' },
                    { id: 'projects-hotel-leisure', label: 'Hotel & Leisure' },
                    { id: 'projects-construction', label: 'Construction' },
                    { id: 'projects-others', label: 'Others' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveView(sub.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-all truncate block ${
                        activeView === sub.id
                          ? 'text-gis-orange font-semibold bg-[#14213D] shadow-inner'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A2B4C]/40'
                      }`}
                      title={sub.label}
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ข่าวสารและกิจกรรม (News & Events) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleGroup('news');
                  setActiveView('news');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeView.startsWith('news')
                    ? 'bg-[#1A2B4C] text-white font-semibold'
                    : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Newspaper className="w-4 h-4 text-sky-400" />
                  <span>News & Events</span>
                </div>
                {expanded.news ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expanded.news && (
                <div className="pl-6 pr-2 py-1 space-y-0.5 border-l border-slate-700/60 ml-5 my-1">
                  {[
                    { id: 'news', label: 'All News & Events' },
                    { id: 'news-safety', label: 'Safety & Training' },
                    { id: 'news-csr', label: 'CSR & Activities' },
                    { id: 'news-trip', label: 'Company Trip' },
                    { id: 'news-corporate', label: 'Corporate News' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveView(sub.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-all truncate block ${
                        activeView === sub.id
                          ? 'text-gis-orange font-semibold bg-[#14213D] shadow-inner'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A2B4C]/40'
                      }`}
                      title={sub.label}
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ร่วมงานกับเรา (Career) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleGroup('career');
                  setActiveView('career');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeView.startsWith('career')
                    ? 'bg-[#1A2B4C] text-white font-semibold'
                    : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-gis-orange" />
                  <span>ร่วมงานกับเรา (Career)</span>
                </div>
                {expanded.career ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expanded.career && (
                <div className="pl-6 pr-2 py-1 space-y-0.5 border-l border-slate-700/60 ml-5 my-1">
                  {[
                    { id: 'career', label: 'Career Overview & สวัสดิการ' },
                    { id: 'career-admin', label: 'Business Support & Admin' },
                    { id: 'career-epc', label: 'EPC Division Engineers' },
                    { id: 'career-ibt', label: 'IBT Division Engineers' },
                    { id: 'career-apply', label: 'ช่องทางสมัครงาน (Apply)' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveView(sub.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-all truncate block ${
                        activeView === sub.id
                          ? 'text-gis-orange font-semibold bg-[#14213D] shadow-inner'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A2B4C]/40'
                      }`}
                      title={sub.label}
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ติดต่อเรา (Contact Us) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleGroup('contact');
                  setActiveView('contact');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeView === 'contact' || activeView === 'inquiries'
                    ? 'bg-[#1A2B4C] text-white font-semibold'
                    : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>ติดต่อเรา (Contact Us)</span>
                </div>
                {expanded.contact ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expanded.contact && (
                <div className="pl-6 pr-2 py-1 space-y-0.5 border-l border-slate-700/60 ml-5 my-1">
                  {[
                    { id: 'contact', label: 'ภาพรวม Contact & Footer' },
                    { id: 'contact-inquiries', label: 'ข้อความติดต่อกลับ (Inbox)' },
                    { id: 'contact-hq', label: 'ที่ตั้งสำนักงานใหญ่ & แผนที่' },
                    { id: 'contact-footer', label: 'ส่วนท้ายเว็บไซต์ (Footer)' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveView(sub.id)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-all truncate block ${
                        activeView === sub.id || (sub.id === 'contact-inquiries' && activeView === 'inquiries')
                          ? 'text-gis-orange font-semibold bg-[#14213D] shadow-inner'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A2B4C]/40'
                      }`}
                      title={sub.label}
                    >
                      • {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GROUP 4: ตั้งค่าระบบ */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            ตั้งค่าระบบ
          </div>
          <button
            type="button"
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeView === 'settings'
                ? 'bg-white text-slate-900 shadow-md font-semibold'
                : 'text-slate-300 hover:bg-[#1A2B4C] hover:text-white'
            }`}
          >
            <Settings className={`w-4 h-4 ${activeView === 'settings' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>ตั้งค่าระบบ (Settings)</span>
          </button>
        </div>
      </nav>

      {/* User Profile & Sign Out Section (ย้ายมาไว้แท็บด้านข้าง) */}
      <div className="p-3 border-t border-slate-800 bg-[#0C1527]/95">
        <div className="flex items-center justify-between gap-2.5 p-2 rounded-xl bg-[#14213D]/60 border border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1.5 ring-slate-900"></span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentUser?.name || 'Developer'}</div>
              <div className="text-[10px] text-slate-400 truncate">ผู้ดูแลระบบ</div>
            </div>
          </div>

          {/* ปุ่มออกจากระบบ */}
          <button
            type="button"
            onClick={logout}
            className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="ออกจากระบบ"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
