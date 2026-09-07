import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { Save, Settings } from 'lucide-react';

export const SettingsView = () => {
  const { currentContent, updateSection } = useAdmin();
  const [siteInfo, setSiteInfo] = useState(currentContent.siteInfo || {});

  const handleInfoChange = (field, val) => {
    setSiteInfo(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    updateSection('siteInfo', siteInfo);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">ตั้งค่าระบบ (System Settings)</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            จัดการข้อมูลโลโก้และลิงก์โซเชียลมีเดียขององค์กร
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2 bg-gis-orange hover:bg-orange-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>

      {/* Section 1: Logo & Social Media */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Settings className="w-5 h-5 text-gis-orange" />
          <h2 className="text-base font-bold text-slate-800">โลโก้และข้อมูลโซเชียลมีเดีย (Brand & Social Media)</h2>
        </div>

        <ImageUploadField
          label="โลโก้บริษัท (Company Logo)"
          value={siteInfo.logoUrl || ''}
          onChange={(val) => handleInfoChange('logoUrl', val)}
          recommendation="ขนาดแนะนำ: 300 x 80 px (ไฟล์ PNG พื้นหลังโปร่งใส)"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Facebook URL</label>
            <input
              type="text"
              value={siteInfo.facebook || ''}
              onChange={(e) => handleInfoChange('facebook', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">LinkedIn URL</label>
            <input
              type="text"
              value={siteInfo.linkedin || ''}
              onChange={(e) => handleInfoChange('linkedin', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">LINE Official Account</label>
            <input
              type="text"
              value={siteInfo.line || ''}
              onChange={(e) => handleInfoChange('line', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
