import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle2, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';

export const ServiceModal = ({ service, onClose }) => {
  const { lang } = useLanguage();
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#14171E] border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left">
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171E] via-[#14171E]/40 to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-gis-orange transition-colors border border-white/20"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Badge & Title */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded bg-gis-orange text-white text-xs font-bold uppercase tracking-wider mb-2">
              {service.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              {lang === 'th' ? service.thTitle : service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gis-orange mb-2">
              {lang === 'th' ? 'ภาพรวมการให้บริการ' : 'Service Overview'}
            </h4>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {service.shortDesc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gis-orange mb-3">
              {lang === 'th' ? 'ขอบเขตงานและมาตรฐานทางวิศวกรรม' : 'Key Engineering Scope & Capabilities'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
                  <CheckCircle2 size={16} className="text-gis-orange shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-200 font-medium leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee / Standards Callout */}
          <div className="p-4 rounded-xl bg-gis-orange/10 border border-gis-orange/30 flex items-center gap-3">
            <ShieldCheck size={24} className="text-gis-orange shrink-0" />
            <p className="text-xs text-gray-300 leading-relaxed">
              {lang === 'th'
                ? 'ทุกระบบได้รับการออกแบบและควบคุมโดยวิศวกรผู้เชี่ยวชาญตามมาตรฐานสากล พร้อมรับประกันคุณภาพและบริการบำรุงรักษาหลังการส่งมอบ'
                : 'All engineering systems are executed under certified standards by licensed engineers with turnkey warranty and preventative maintenance support.'}
            </p>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <a
              href="tel:021234567"
              className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
            >
              <PhoneCall size={16} className="text-gis-orange" />
              <span>{lang === 'th' ? 'โทรปรึกษาวิศวกร: 02-123-4567' : 'Consult Engineer: 02-123-4567'}</span>
            </a>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                {lang === 'th' ? 'ปิด' : 'Close'}
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase text-white bg-gis-orange hover:bg-gis-orange-hover transition-colors shadow-glow-orange flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>{lang === 'th' ? 'ขอใบเสนอราคา' : 'Request Quote'}</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
