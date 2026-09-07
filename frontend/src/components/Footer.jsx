import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GisLogo } from './GisLogo';
import { Phone, Printer, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="w-full select-none text-white text-xs z-20 relative">
      <div className="flex flex-col lg:flex-row w-full items-stretch">
        
        {/* LEFT SECTION: Vibrant Orange with Logo & Address */}
        <div className="bg-[#EA580C] w-full lg:w-[27%] xl:w-[25%] px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-center space-y-4 shadow-lg">
          {/* GIS GROUP Logo */}
          <div className="flex items-center">
            <GisLogo className="h-10 sm:h-12 w-auto drop-shadow-md" />
          </div>

          {/* Address with MapPin Icon */}
          <div className="flex items-start gap-2.5 text-white/95 text-xs sm:text-[13px] leading-relaxed">
            <div className="w-5 h-5 rounded-full border border-white/80 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={11} className="text-white" />
            </div>
            <p>
              {lang === 'th' 
                ? '682/59-60 ถนนพระราม 3 แขวงบางโพงพาง เขตยานนาวา กรุงเทพ 10120'
                : '682/59-60 Rama 3 Rd., Bang Phongphang, Yannawa, Bangkok 10120'}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION: Dark Charcoal with Contacts, Nav Links, Social, and Copyright */}
        <div className="bg-[#383C41] flex-1 px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-between">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 xl:gap-8">
            
            {/* 1. Contact Information & Call Center */}
            <div className="flex flex-col space-y-2.5">
              {/* Call Center Headline */}
              <div className="text-[#FF6600] font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1">
                <span>Call Center :</span>
                <a href="tel:0811499090" className="hover:underline text-white font-bold ml-1">
                  081-149-9090
                </a>
              </div>

              {/* 2-Column Contact Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-white/90 text-xs sm:text-[13px]">
                {/* Phone */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/70 flex items-center justify-center flex-shrink-0">
                    <Phone size={11} className="text-white" />
                  </div>
                  <a href="tel:026821040" className="hover:text-gis-orange transition-colors">
                    +66(0)2 682 1040-4
                  </a>
                </div>

                {/* Fax / Printer */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/70 flex items-center justify-center flex-shrink-0">
                    <Printer size={11} className="text-white" />
                  </div>
                  <span>+66(0)2 682 1045</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/70 flex items-center justify-center flex-shrink-0">
                    <Mail size={11} className="text-white" />
                  </div>
                  <a href="mailto:info@gisgroup.co.th" className="hover:text-gis-orange transition-colors">
                    info@gisgroup.co.th
                  </a>
                </div>

                {/* LINE */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/70 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] font-black tracking-tighter">LINE</span>
                  </div>
                  <a 
                    href="https://line.me/R/ti/p/@gisgroup" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-gis-orange transition-colors"
                  >
                    @gisgroup
                  </a>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden xl:block w-[1px] h-16 bg-white/20"></div>

            {/* 2. Navigation Quick Links (2 Columns) */}
            <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-2 text-white/90 text-xs sm:text-[13px]">
              {/* Col A */}
              <div className="flex flex-col space-y-2">
                <a href="#about" className="hover:text-gis-orange transition-colors">
                  About GIS Group
                </a>
                <a href="#business" className="hover:text-gis-orange transition-colors">
                  Products & Services
                </a>
                <a href="#projects" className="hover:text-gis-orange transition-colors">
                  Projects Reference
                </a>
              </div>

              {/* Col B */}
              <div className="flex flex-col space-y-2">
                <a href="#business" className="hover:text-gis-orange transition-colors">
                  Our Business
                </a>
                <a href="#news" className="hover:text-gis-orange transition-colors">
                  News & Events
                </a>
                <a href="#contact" className="hover:text-gis-orange transition-colors">
                  Contact Us
                </a>
              </div>
            </div>

            {/* 3. Follow Us & Social Icons + Copyright */}
            <div className="flex flex-col items-start xl:items-end justify-between space-y-4 xl:space-y-3 pt-2 xl:pt-0">
              {/* FOLLOW US & Icons */}
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-xs uppercase tracking-wider">
                  FOLLOW US
                </span>

                {/* Facebook Button */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded border border-white/60 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all duration-200 shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>

                {/* LINE Button */}
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Line"
                  className="w-7 h-7 rounded border border-white/60 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all duration-200 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.12 1.88 5.86 4.7 7.37-.2.7-.72 2.56-.83 2.94-.14.49.18.48.38.35.15-.1 2.45-1.63 3.44-2.3.75.14 1.53.21 2.31.21 5.52 0 10-3.92 10-8.75S17.52 2 12 2zm-4.75 11.25h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zm2.75 0a.75.75 0 01-.75-.75V8.5a.75.75 0 011.5 0v3.25a.75.75 0 01-.75.75zm5-2.25h-1.75v1.5h1.75a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-1.75v1h1.75a.75.75 0 010 1.5z" />
                  </svg>
                </a>
              </div>

              {/* Copyright Statement */}
              <div className="text-[11px] text-gray-300 xl:text-right font-light tracking-tight flex items-center gap-1">
                <span>&copy; Copyright 2021 GIS Group Co.,Ltd. All Rights Reserved.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};
