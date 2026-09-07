import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GisLogo } from './GisLogo';
import { ChevronDown, Menu, X, PhoneCall } from 'lucide-react';

export const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/5'
          : 'bg-black/90 sm:bg-gradient-to-b sm:from-black sm:via-black/90 sm:to-black/70 py-4 lg:py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Official Logo */}
        <a href="#home" className="flex items-center group py-0.5">
          <GisLogo className="h-10 sm:h-12 lg:h-14 xl:h-16 w-auto transition-transform duration-300 group-hover:scale-105" />
        </a>

        {/* Desktop Navigation Menu matching reference */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {/* HOME (Active with Orange Bar) */}
          <a
            href="#home"
            className="relative py-2 text-xs xl:text-sm font-bold tracking-wider text-gis-orange transition-colors uppercase flex items-center"
          >
            {t.nav.home}
            <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gis-orange rounded-full shadow-[0_0_10px_#ff5500]"></span>
          </a>

          {/* ABOUT GIS GROUP */}
          <div
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <a
              href="#about"
              className="py-2 text-xs xl:text-sm font-bold tracking-wider text-white hover:text-gis-orange transition-colors uppercase flex items-center gap-1.5 group"
            >
              {t.nav.about}
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 text-gray-300 group-hover:text-gis-orange ${
                  aboutDropdownOpen ? 'rotate-180 text-gis-orange' : ''
                }`}
              />
            </a>

            {aboutDropdownOpen && (
              <div className="absolute top-full left-0 w-64 py-2 bg-[#0B0D11]/98 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {t.nav.aboutDropdown.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setAboutDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gis-orange/20 hover:border-l-2 hover:border-gis-orange transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* OUR BUSINESS */}
          <div
            className="relative"
            onMouseEnter={() => setBusinessDropdownOpen(true)}
            onMouseLeave={() => setBusinessDropdownOpen(false)}
          >
            <a
              href="#business"
              className="py-2 text-xs xl:text-sm font-bold tracking-wider text-white hover:text-gis-orange transition-colors uppercase flex items-center gap-1.5 group"
            >
              {t.nav.business}
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 text-gray-300 group-hover:text-gis-orange ${
                  businessDropdownOpen ? 'rotate-180 text-gis-orange' : ''
                }`}
              />
            </a>

            {businessDropdownOpen && (
              <div className="absolute top-full left-0 w-72 py-2 bg-[#0B0D11]/98 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {t.nav.businessDropdown.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setBusinessDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-gis-orange/20 hover:border-l-2 hover:border-gis-orange transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* NEWS & EVENT */}
          <a
            href="#news"
            className="py-2 text-xs xl:text-sm font-bold tracking-wider text-white hover:text-gis-orange transition-colors uppercase"
          >
            {t.nav.news}
          </a>

          {/* CONTACT */}
          <a
            href="#contact"
            className="py-2 text-xs xl:text-sm font-bold tracking-wider text-white hover:text-gis-orange transition-colors uppercase"
          >
            {t.nav.contact}
          </a>

          {/* TH/EN Text Switcher matching Image 1 */}
          <button
            onClick={toggleLanguage}
            className="py-2 text-xs xl:text-sm font-black tracking-wider text-white hover:text-gis-orange transition-colors uppercase ml-4 cursor-pointer focus:outline-none"
            title="Toggle Language (TH / EN)"
          >
            <span className={lang === 'th' ? 'text-gis-orange font-black' : 'text-gray-400'}>TH</span>
            <span className="text-gray-500 mx-0.5">/</span>
            <span className={lang === 'en' ? 'text-gis-orange font-black' : 'text-gray-400'}>EN</span>
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded text-xs font-bold border border-white/20 bg-white/5 text-gray-200"
          >
            {lang.toUpperCase()}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1117] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top duration-200 shadow-2xl">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-gis-orange bg-white/5 rounded-md"
          >
            {t.nav.home}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
          >
            {t.nav.about}
          </a>
          <a
            href="#values"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md pl-6 text-sm text-gis-orange"
          >
            ↳ {lang === 'th' ? 'ค่านิยมองค์กร (G-I-S)' : 'Corporate Values (G-I-S)'}
          </a>
          <a
            href="#business"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
          >
            {t.nav.business}
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
          >
            {lang === 'th' ? 'ผลงานโครงการ' : 'Projects'}
          </a>
          <a
            href="#news"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
          >
            {t.nav.news}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
          >
            {t.nav.contact}
          </a>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <a
              href="tel:021234567"
              className="flex items-center gap-2 text-sm text-gis-orange font-semibold"
            >
              <PhoneCall size={16} />
              <span>02-123-4567</span>
            </a>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-gis-orange text-white text-xs font-bold rounded"
            >
              {lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
