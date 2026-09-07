import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { Save, Download, Upload, RotateCcw, Copy, Check, ShieldCheck, Database, Settings } from 'lucide-react';

export const SettingsView = () => {
  const { data, currentContent, updateSection, exportData, importData, resetToDefaults, showToast } = useAdmin();
  const [siteInfo, setSiteInfo] = useState(currentContent.siteInfo || {});
  const [copied, setCopied] = useState(false);

  const handleInfoChange = (field, val) => {
    setSiteInfo(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    updateSection('siteInfo', siteInfo);
  };

  const handleCopyFrontendCode = () => {
    // Generate valid content.js formatted string
    const code = `export const content = ${JSON.stringify(data.content, null, 2)};\n`;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      showToast('คัดลอกโค้ด content.js ไปยังคลิปบอร์ดแล้ว', 'success');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          importData(event.target.result);
        } catch (err) {
          showToast('ไฟล์ JSON ไม่ถูกต้อง', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">ตั้งค่าระบบ (System Settings & Sync)</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            จัดการข้อมูลโลโก้ ลิงก์โซเชียลมีเดีย และซิงก์ข้อมูลระหว่างระบบจัดการกับเว็บหลัก
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>

      {/* Section 1: Logo & Social Media */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Settings className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-800">1. โลโก้และข้อมูลโซเชียลมีเดีย (Brand & Social Media)</h2>
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
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">LinkedIn URL</label>
            <input
              type="text"
              value={siteInfo.linkedin || ''}
              onChange={(e) => handleInfoChange('linkedin', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">LINE Official Account</label>
            <input
              type="text"
              value={siteInfo.line || ''}
              onChange={(e) => handleInfoChange('line', e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Data Backup & Sync to Frontend */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Database className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-bold text-slate-800">2. การเชื่อมต่อและสำรองข้อมูล (Data Sync & Backup)</h2>
            <p className="text-xs text-slate-400">ส่งต่อเนื้อหาที่แก้ไขจาก Admin Panel ไปยัง Frontend เว็บหลัก</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Copy Code for content.js */}
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Copy className="w-4 h-4 text-blue-600" />
                <span>คัดลอกโค้ดสำหรับ `frontend/src/data/content.js`</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                คัดลอกโค้ดเนื้อหาล่าสุดทั้งหมดไปวางทับในไฟล์ข้อมูลของเว็บหลักได้ทันที ทำให้เว็บหลักอัปเดตตรงกับที่คุณแก้ไข
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyFrontendCode}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'คัดลอกโค้ดสำเร็จ!' : 'คัดลอกโค้ด JavaScript'}</span>
            </button>
          </div>

          {/* Card 2: Export JSON File */}
          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-600" />
                <span>ดาวน์โหลดสำรองข้อมูล (Export JSON)</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ดาวน์โหลดไฟล์ `.json` เก็บไว้ในเครื่องเพื่อเป็นข้อมูลสำรอง หรือนำไปอัปโหลดเข้าเซิร์ฟเวอร์จริงในอนาคต
              </p>
            </div>
            <button
              type="button"
              onClick={exportData}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดไฟล์ JSON</span>
            </button>
          </div>
        </div>

        {/* Import JSON & Reset */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors">
              <Upload className="w-4 h-4 text-slate-500" />
              <span>นำเข้าไฟล์ JSON จากเครื่อง (Import)</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            type="button"
            onClick={resetToDefaults}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5 p-2 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>คืนค่าเริ่มต้นทั้งหมด (Factory Reset)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
