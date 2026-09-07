import React, { useRef, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { UploadCloud, Link as LinkIcon, Image as ImageIcon, Trash2, Check } from 'lucide-react';

export const ImageUploadField = ({
  label = "รูปภาพ",
  value = "",
  onChange,
  aspectRatio = "16:9",
  recommendation = "ขนาดแนะนำ: 1200 x 600 px (สัดส่วน 16:9)"
}) => {
  const { showToast } = useAdmin();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('url'); // 'url' or 'upload'
  const [urlInput, setUrlInput] = useState(value);
  const [imageError, setImageError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('กรุณาเลือกไฟล์รูปภาพขนาดไม่เกิน 5MB', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        onChange(dataUrl);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    onChange(urlInput);
    setImageError(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <span className="text-xs text-slate-400">{recommendation}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-slate-50/70 p-3.5 rounded-xl border border-slate-200">
        {/* Preview Thumbnail */}
        <div className="md:col-span-5 relative group rounded-lg overflow-hidden bg-slate-900/5 border border-slate-200 flex items-center justify-center min-h-[140px]">
          {value && !imageError ? (
            <>
              <img
                src={value}
                alt="Preview"
                onError={() => setImageError(true)}
                className="w-full h-36 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="p-1.5 bg-rose-600 text-white rounded-md hover:bg-rose-700 shadow-md transition-colors"
                  title="ลบรูปภาพ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-4 text-slate-400 flex flex-col items-center gap-1.5">
              <ImageIcon className="w-8 h-8 text-slate-300 stroke-[1.5]" />
              <span className="text-xs">{imageError ? 'ไม่สามารถโหลดรูปภาพได้' : 'ยังไม่มีรูปภาพ'}</span>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <div className="md:col-span-7 space-y-3">
          {/* Method Selector */}
          <div className="flex rounded-lg bg-slate-200/70 p-1 text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-1.5 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'url' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              ใส่ลิงก์รูป (Image URL)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 px-3 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'upload' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              อัปโหลดจากเครื่อง
            </button>
          </div>

          {activeTab === 'url' ? (
            <div className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 text-xs bg-white px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 shadow-sm transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  ปรับใช้
                </button>
              </div>
              <p className="text-[11px] text-slate-400">วาง URL ของรูปภาพ เช่น จาก Unsplash หรือ CDN</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2 px-3 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/40 rounded-lg text-xs text-slate-600 flex items-center justify-center gap-2 transition-all"
              >
                <UploadCloud className="w-4 h-4 text-blue-500" />
                คลิกเพื่อเลือกไฟล์ภาพจากเครื่อง (PNG, JPG, WebP)
              </button>
              <p className="text-[11px] text-slate-400">รองรับไฟล์ภาพขนาดไม่เกิน 5 MB</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
