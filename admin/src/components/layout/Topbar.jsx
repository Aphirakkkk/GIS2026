import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Home } from 'lucide-react';

export const Topbar = () => {
  const { activeView } = useAdmin();
  const [currentTime, setCurrentTime] = useState('');

  // Thai Date & Time formatting matching original reference
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];
      const day = now.getDate();
      const month = thaiMonths[now.getMonth()];
      const year = now.getFullYear() + 543; // Buddhist Era
      const time = now.toLocaleTimeString('th-TH');
      setCurrentTime(`ข้อมูล ณ วันที่ ${day} ${month} ${year} เวลา ${time} น.`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format view name for breadcrumb
  const getViewName = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'banner': return 'จัดการแบนเนอร์ (Banner)';
      case 'about':
      case 'about-us': return 'About / About Us';
      case 'about-org': return 'About / Organizational Structure';
      case 'about-ethics': return 'About / Ethics';
      case 'about-values': return 'About / Values';
      case 'about-iso9001': return 'About / ISO 9001:2015';
      case 'about-iso45001': return 'About / ISO45001:2018';
      case 'about-iso27001': return 'About / ISO / IEC 27001:2022';
      case 'about-achievement': return 'About / Achievement';
      case 'about-why-choose': return 'About / Why Choose';
      case 'about-policy': return 'About / Policy';
      case 'about-carbon': return 'About / Carbon Footprint';
      case 'business': return 'Our Business (กลุ่มธุรกิจ)';
      case 'business-epc': return 'Our Business / EPC DIVISION';
      case 'business-ibt': return 'Our Business / IBT DIVISION';
      case 'business-enr': return 'Our Business / ENR DIVISION';
      case 'products-services': return 'Products & Services';
      case 'products': return 'Products & Services / Products';
      case 'services': return 'Products & Services / Services';
      case 'projects': return 'Projects Reference (โครงการทั้งหมด)';
      case 'projects-highlight': return 'Projects Reference / Highlight Project';
      case 'projects-government': return 'Projects Reference / Government';
      case 'projects-commercial': return 'Projects Reference / Commercial';
      case 'projects-industrial': return 'Projects Reference / Industrial';
      case 'projects-health-education': return 'Projects Reference / Health & Education';
      case 'projects-critical-space': return 'Projects Reference / Critical Space';
      case 'projects-residential': return 'Projects Reference / Residential';
      case 'projects-hotel-leisure': return 'Projects Reference / Hotel & Leisure';
      case 'projects-construction': return 'Projects Reference / Construction';
      case 'projects-others': return 'Projects Reference / Others';
      case 'news': return 'News & Events (ข่าวสารและกิจกรรม)';
      case 'news-safety': return 'News & Events / Safety & Training';
      case 'news-csr': return 'News & Events / CSR & Activities';
      case 'news-trip': return 'News & Events / Company Trip';
      case 'news-corporate': return 'News & Events / Corporate News';
      case 'career': return 'Career (ร่วมงานกับเรา)';
      case 'career-admin': return 'Career / Business Support & Administration';
      case 'career-epc': return 'Career / M&E Contractor EPC Division';
      case 'career-ibt': return 'Career / Building Technologies IBT Division';
      case 'career-apply': return 'Career / ช่องทางสมัครงาน (Apply & HR)';
      case 'contact': return 'Contact Us (ติดต่อเรา & ส่วนท้ายเว็บไซต์)';
      case 'contact-inquiries':
      case 'inquiries': return 'Contact Us / ข้อความติดต่อกลับ (Inquiries Inbox)';
      case 'contact-hq': return 'Contact Us / ข้อมูลสำนักงานใหญ่ & แผนที่';
      case 'contact-footer': return 'Contact Us / ส่วนท้ายเว็บไซต์ (Footer & Social)';
      case 'settings': return 'ตั้งค่าระบบ (Settings)';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Breadcrumb & Real-time Date/Time string */}
      <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
        <Home className="w-4 h-4 text-blue-600" />
        <span>/</span>
        <span className="font-semibold text-slate-800">{getViewName()}</span>
        <span className="hidden sm:inline-block text-slate-400 font-light ml-2">
          {currentTime}
        </span>
      </div>
    </header>
  );
};
