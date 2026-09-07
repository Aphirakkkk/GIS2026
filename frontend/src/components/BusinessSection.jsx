import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceModal } from './ServiceModal';
import { Wrench, ArrowRight, Zap, Wind, Flame, Cpu, Eye } from 'lucide-react';

export const BusinessSection = () => {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  const getServiceIcon = (id) => {
    switch (id) {
      case 'me':
        return <Zap className="text-gis-orange" size={24} />;
      case 'hvac':
        return <Wind className="text-cyan-400" size={24} />;
      case 'piping':
        return <Flame className="text-amber-500" size={24} />;
      case 'automation':
        return <Cpu className="text-emerald-400" size={24} />;
      default:
        return <Wrench className="text-gis-orange" size={24} />;
    }
  };

  const currentCategoryName = t.business.categories[activeCategory];
  const filteredServices =
    activeCategory === 0
      ? t.business.services
      : t.business.services.filter(
          (s) => s.category === currentCategoryName
        );

  return (
    <section id="business" className="py-24 lg:py-32 bg-[#0B0D11] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gis-orange/15 border border-gis-orange/30 text-gis-orange text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            <Wrench size={16} />
            <span>{t.business.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-display mb-4">
            {t.business.title}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base 2xl:text-lg leading-relaxed">
            {t.business.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {t.business.categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === idx
                  ? 'bg-gis-orange text-white shadow-glow-orange font-bold scale-105'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#14171E] border border-white/10 rounded-2xl overflow-hidden hover:border-gis-orange/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Card Top Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14171E] via-black/40 to-transparent"></div>
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md text-gis-orange border border-gis-orange/30 text-xs font-bold uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Service Icon floating badge */}
                <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 shadow-lg">
                  {getServiceIcon(service.id)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-gis-orange transition-colors font-display">
                    {lang === 'th' ? service.thTitle : service.title}
                  </h3>
                  <div
                    className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: service.shortDesc }}
                  />

                  {/* Feature Bullets Preview */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-gis-orange"></div>
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full mt-4 py-3 px-4 rounded-xl bg-white/5 hover:bg-gis-orange text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-gis-orange transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <Eye size={16} />
                  <span>{t.business.viewMore}</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};
