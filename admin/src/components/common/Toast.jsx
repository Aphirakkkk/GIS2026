import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast, hideToast } = useAdmin();

  if (!toast?.show) return null;

  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
      title: 'ดำเนินการสำเร็จ',
      bar: 'bg-emerald-500',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      shadow: 'shadow-emerald-500/10'
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
      title: 'เกิดข้อผิดพลาด',
      bar: 'bg-rose-500',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      shadow: 'shadow-rose-500/10'
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
      title: 'แจ้งเตือน',
      bar: 'bg-amber-500',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      shadow: 'shadow-amber-500/10'
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
      title: 'ข้อความระบบ',
      bar: 'bg-blue-500',
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      shadow: 'shadow-blue-500/10'
    }
  };

  const current = typeConfig[toast.type] || typeConfig.success;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className={`relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 shadow-2xl ${current.shadow} overflow-hidden flex items-start gap-3.5 ring-1 ring-black/5`}>
        {/* Color accent left bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${current.bar}`} />

        {/* Icon */}
        <div className="mt-0.5">
          {current.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-800">
              {current.title}
            </h4>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed break-words font-medium">
            {toast.message}
          </p>
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={hideToast}
          className="p-1 -mr-1 -mt-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="ปิดการแจ้งเตือน"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
