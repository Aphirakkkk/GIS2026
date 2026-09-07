import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Building2, MapPin, Layers, ArrowUpRight } from 'lucide-react';

export const ProjectsSection = () => {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { key: 'all', label: t.projects.filterAll },
    ...t.projects.categories.map((c) => ({ key: c, label: c }))
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? t.projects.items
      : t.projects.items.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#0E1117] relative border-t border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gis-orange/15 border border-gis-orange/30 text-gis-orange text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
              <Layers size={16} />
              <span>{t.projects.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-display">
              {t.projects.title}
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mt-4 md:mt-0">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveFilter(opt.key)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                activeFilter === opt.key
                  ? 'bg-gis-orange text-white shadow-glow-orange'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-[#14171E] border border-white/10 hover:border-gis-orange/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image with zoom on hover */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14171E] via-black/30 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-gis-orange text-[11px] font-bold uppercase tracking-wider border border-gis-orange/30">
                    {project.category}
                  </span>
                </div>

                {/* Floating Arrow Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gis-orange/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-gis-orange transition-colors font-display line-clamp-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gis-orange font-medium mb-3">
                    <MapPin size={13} className="shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                    <span className="text-gray-300 font-semibold">{lang === 'th' ? 'ขอบเขตงาน: ' : 'Scope: '}</span>
                    {project.scope}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
