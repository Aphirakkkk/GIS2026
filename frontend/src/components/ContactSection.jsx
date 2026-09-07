import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactSection = () => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#0E1117] relative border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-gis-orange/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gis-orange/15 border border-gis-orange/30 text-gis-orange text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            <MessageSquare size={16} />
            <span>{t.contact.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-display mb-4">
            {t.contact.title}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base 2xl:text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Cards & Map Graphic */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#14171E] border border-white/10 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2 font-display">
                <span className="w-2.5 h-2.5 rounded-full bg-gis-orange"></span>
                {t.contact.headquarters}
              </h3>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-gis-orange shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      {lang === 'th' ? 'ที่ตั้งสำนักงาน' : 'Office Location'}
                    </span>
                    <p className="leading-snug text-gray-200">{t.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-gis-orange shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      {lang === 'th' ? 'เบอร์โทรศัพท์' : 'Telephone / Hotline'}
                    </span>
                    <p className="leading-snug text-gray-200 font-semibold">{t.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-gis-orange shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      {lang === 'th' ? 'อีเมลติดต่อ' : 'Email Address'}
                    </span>
                    <p className="leading-snug text-gray-200">{t.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-gis-orange shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      {lang === 'th' ? 'เวลาทำการ' : 'Working Hours'}
                    </span>
                    <p className="leading-snug text-gray-200">{t.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-52 bg-[#14171E] shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
                alt="Bangkok City GIS Location Map"
                className="w-full h-full object-cover filter contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white text-xs font-bold">
                  <MapPin size={16} className="text-gis-orange animate-bounce" />
                  <span>GIS TOWER (Rama 9, Bangkok)</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gis-orange hover:bg-gis-orange-hover text-white text-xs font-bold rounded-lg transition-colors shadow"
                >
                  {lang === 'th' ? 'เปิดแผนที่' : 'Open Map'}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-[#14171E] border border-white/10 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight font-display mb-2">
                {lang === 'th' ? 'แบบฟอร์มขอใบเสนอราคา / ติดต่อสอบถาม' : 'Project Consultation & Quotation Form'}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-8">
                {lang === 'th'
                  ? 'กรอกข้อมูลด้านล่าง วิศวกรผู้เชี่ยวชาญจะติดต่อกลับเพื่อประเมินโครงการเบื้องต้น'
                  : 'Fill in your project information and our engineering team will get back to you promptly.'}
              </p>

              {submitted && (
                <div className="p-4 mb-6 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm flex items-center gap-3 animate-in fade-in">
                  <CheckCircle size={20} className="text-emerald-400 shrink-0" />
                  <span>{t.contact.form.success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === 'th' ? 'เช่น สมชาย วิศวกรรม' : 'e.g. John Doe'}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange transition-all placeholder:text-gray-500"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      {t.contact.form.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={lang === 'th' ? 'เช่น บริษัท อุตสาหกรรม จำกัด' : 'e.g. Acme Industrial Ltd.'}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange transition-all placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      {t.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange transition-all placeholder:text-gray-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                      {t.contact.form.phone} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="081-234-5678"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange transition-all placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    {t.contact.form.service} *
                  </label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#1C2029] border border-white/10 text-white text-sm focus:outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange transition-all"
                  >
                    <option value="">{t.contact.form.servicePlaceholder}</option>
                    <option value="ME">Mechanical & Electrical Systems (M&E)</option>
                    <option value="HVAC">HVAC & Cleanroom Engineering</option>
                    <option value="Piping">Industrial Piping & Fire Protection</option>
                    <option value="Automation">Building Automation & BEMS</option>
                    <option value="Maintenance">24/7 Facility Maintenance Service</option>
                    <option value="Other">{lang === 'th' ? 'อื่นๆ / ขอคำปรึกษาทั่วไป' : 'Other / General Consultation'}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang === 'th' ? 'ระบุสถานที่โครงการ ขอบเขตงาน หรือวันที่ต้องการเริ่มงาน...' : 'Describe your project location, scope, or timeline...'}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gis-orange focus:ring-1 focus:ring-gis-orange transition-all placeholder:text-gray-500 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gis-orange hover:bg-gis-orange-hover text-white font-extrabold text-sm uppercase tracking-wider shadow-glow-orange transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? t.contact.form.submitting : t.contact.form.submit}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
