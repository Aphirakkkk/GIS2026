import React, { useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AlertTriangle, Trash2, AlertCircle, Info, CheckCircle2, X } from 'lucide-react';

export const ConfirmModal = () => {
  const { confirmState } = useAdmin();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!confirmState?.isOpen) return;
      if (e.key === 'Escape') {
        confirmState.onCancel?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmState]);

  if (!confirmState?.isOpen) return null;

  const {
    title = 'ยืนยันการทำรายการ',
    message = 'คุณแน่ใจหรือไม่ว่าต้องการดำเนินการนี้?',
    confirmText = 'ยืนยัน',
    cancelText = 'ยกเลิก',
    type = 'danger', // 'danger' | 'warning' | 'info' | 'success'
    onConfirm,
    onCancel
  } = confirmState;

  // Icon config based on type
  const typeConfig = {
    danger: {
      icon: <Trash2 className="w-6 h-6 text-red-600" />,
      bg: 'bg-red-50 ring-8 ring-red-50/70 border-red-200',
      btn: 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg shadow-red-500/25 ring-1 ring-red-600/30',
      badge: 'text-red-700 bg-red-100/80 border-red-200'
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 ring-8 ring-amber-50/70 border-amber-200',
      btn: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 ring-1 ring-amber-500/30',
      badge: 'text-amber-700 bg-amber-100/80 border-amber-200'
    },
    info: {
      icon: <Info className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50 ring-8 ring-sky-50/70 border-sky-200',
      btn: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-600/30',
      badge: 'text-sky-700 bg-sky-100/80 border-sky-200'
    },
    success: {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 ring-8 ring-emerald-50/70 border-emerald-200',
      btn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-600/30',
      badge: 'text-emerald-700 bg-emerald-100/80 border-emerald-200'
    }
  };

  const currentConfig = typeConfig[type] || typeConfig.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click dismiss */}
      <div 
        className="absolute inset-0" 
        onClick={() => onCancel?.()} 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 z-10">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => onCancel?.()}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7">
          {/* Animated Icon */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${currentConfig.bg} transition-transform`}>
              {currentConfig.icon}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {title}
              </h3>
              <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border mt-1 ${currentConfig.badge}`}>
                {type === 'danger' ? 'การลบข้อมูล' : type === 'warning' ? 'แจ้งเตือนความปลอดภัย' : 'ข้อความระบบ'}
              </span>
            </div>
          </div>

          {/* Description Message */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onCancel?.()}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 transition-all cursor-pointer"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => onConfirm?.()}
              autoFocus
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 ${currentConfig.btn}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
