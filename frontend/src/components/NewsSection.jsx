import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';

export const NewsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="news" className="py-24 lg:py-32 bg-[#0B0D11] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gis-orange/15 border border-gis-orange/30 text-gis-orange text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
            <Newspaper size={16} />
            <span>{t.news.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-display mb-4">
            {t.news.title}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base 2xl:text-lg leading-relaxed">
            {t.news.subtitle}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.news.items.map((item, idx) => (
            <article
              key={idx}
              className="bg-[#14171E] border border-white/10 rounded-2xl overflow-hidden hover:border-gis-orange/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14171E] via-transparent to-transparent"></div>
                  
                  {/* Date Badge */}
                  <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-gray-300 text-xs font-medium border border-white/10">
                    <Calendar size={12} className="text-gis-orange" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-gis-orange transition-colors font-display line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6 pt-2">
                <a
                  href="#news"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gis-orange hover:text-gis-orange-hover transition-colors"
                >
                  <span>{t.news.readMore}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
