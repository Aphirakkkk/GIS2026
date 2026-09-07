import React from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Image as ImageIcon,
  Newspaper,
  GitFork,
  Boxes,
  Briefcase,
  Mail,
  Users,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';

export const DashboardView = () => {
  const { data, currentContent, setActiveView } = useAdmin();
  const { stats, recentInquiries } = data;
  const recentNews = currentContent.news || [];

  return (
    <div className="space-y-6">
      {/* Welcome Banner / Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#14213D] to-[#1E3A8A] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2 text-xs text-blue-200 font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>GIS Content Management System</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold">ยินดีต้อนรับสู่ระบบจัดการเว็บไซต์ GIS GROUP</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl">
            คุณสามารถแก้ไขข้อความ ชื่อ สถิติ และรูปภาพของทุกส่วนบนหน้าเว็บได้ทันที โดยระบบแยกต่างหากจากเว็บหลักเพื่อความปลอดภัยสูงสุด
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView('banner')}
            className="px-4 py-2 bg-gis-orange hover:bg-orange-600 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-2"
          >
            <span>จัดการหน้าแรก</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
      </div>

      {/* KPI Stat Cards (Matching User's Screenshot Exactly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* 1. แบนเนอร์ (BANNER) - Blue/Purple */}
        <div
          onClick={() => setActiveView('banner')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-md shadow-blue-500/10 cursor-pointer hover:scale-[1.02] transition-transform duration-200 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-medium text-blue-100 tracking-wider">แบนเนอร์ (BANNER)</div>
            <div className="text-3xl font-extrabold mt-1">{stats?.bannerCount || 5}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>

        {/* 2. ข่าวสารและกิจกรรม - Sky Blue */}
        <div
          onClick={() => setActiveView('news')}
          className="bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl p-4 text-white shadow-md shadow-sky-500/10 cursor-pointer hover:scale-[1.02] transition-transform duration-200 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-medium text-sky-100 tracking-wider">ข่าวสารและกิจกรรม</div>
            <div className="text-3xl font-extrabold mt-1">{stats?.newsCount || 22}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>

        {/* 3. โครงการอ้างอิง - Emerald Green */}
        <div
          onClick={() => setActiveView('projects')}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-md shadow-emerald-500/10 cursor-pointer hover:scale-[1.02] transition-transform duration-200 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-medium text-emerald-100 tracking-wider">โครงการอ้างอิง</div>
            <div className="text-3xl font-extrabold mt-1">{stats?.projectsCount || 94}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <GitFork className="w-6 h-6" />
          </div>
        </div>

        {/* 4. สินค้าและบริการ - Amber */}
        <div
          onClick={() => setActiveView('services')}
          className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-md shadow-amber-500/10 cursor-pointer hover:scale-[1.02] transition-transform duration-200 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-medium text-amber-100 tracking-wider">สินค้าและบริการ</div>
            <div className="text-3xl font-extrabold mt-1">{currentContent.services?.length || 4}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Boxes className="w-6 h-6" />
          </div>
        </div>

        {/* 5. ตำแหน่งงานที่เปิดรับ - Red */}
        <div
          onClick={() => setActiveView('careers')}
          className="bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl p-4 text-white shadow-md shadow-rose-500/10 cursor-pointer hover:scale-[1.02] transition-transform duration-200 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-medium text-rose-100 tracking-wider">ตำแหน่งงานที่เปิดรับ</div>
            <div className="text-3xl font-extrabold mt-1">{stats?.jobsCount || 2}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* 6. ข้อความติดต่อกลับ - Dark Navy */}
        <div
          onClick={() => setActiveView('inquiries')}
          className="bg-gradient-to-r from-[#1B2A4A] to-[#111D35] rounded-2xl p-4 text-white shadow-md shadow-slate-900/10 cursor-pointer hover:scale-[1.02] transition-transform duration-200 flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-medium text-slate-300 tracking-wider">ข้อความติดต่อกลับ</div>
            <div className="text-3xl font-extrabold mt-1">{stats?.inquiriesCount || 23}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
            <Mail className="w-6 h-6 text-slate-200" />
          </div>
        </div>

        {/* 7. ผู้ดูแลระบบทั้งหมด - Clean Light Card */}
        <div
          className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-800 shadow-sm cursor-default flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-medium text-slate-400 tracking-wider">ผู้ดูแลระบบทั้งหมด</div>
            <div className="text-3xl font-extrabold mt-1 text-slate-800">{stats?.adminsCount || 2}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tables Section (Matching Lower Half of Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: ข่าวสารและกิจกรรมล่าสุด */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <Newspaper className="w-4 h-4 text-blue-600" />
              <span>ข่าวสารและกิจกรรมล่าสุด</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('news')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors"
            >
              ดูทั้งหมด
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="table-header">หัวข้อ</th>
                  <th className="table-header w-32 text-right">วันที่</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentNews.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="table-cell font-medium text-slate-800 line-clamp-1">
                      {item.title}
                    </td>
                    <td className="table-cell text-right text-xs text-slate-500 whitespace-nowrap">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: ข้อความติดต่อล่าสุด */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>ข้อความติดต่อล่าสุด</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('inquiries')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors"
            >
              ดูทั้งหมด
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="table-header">ผู้ติดต่อ</th>
                  <th className="table-header">เบอร์โทร / อีเมล</th>
                  <th className="table-header w-28 text-right">วันที่</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="table-cell font-medium text-slate-800">
                      {inq.name}
                    </td>
                    <td className="table-cell text-xs text-slate-600 font-mono">
                      {inq.contact}
                    </td>
                    <td className="table-cell text-right text-xs text-slate-500 whitespace-nowrap">
                      {inq.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
