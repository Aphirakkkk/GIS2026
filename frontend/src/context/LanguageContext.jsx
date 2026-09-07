import React from 'react';
import { content } from '../data/content';

const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = React.useState(() => {
    try {
      const saved = localStorage.getItem('gis_lang');
      if (saved && (saved === 'th' || saved === 'en')) return saved;
    } catch (e) {}
    return 'th';
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('gis_lang', lang);
    } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'th' ? 'en' : 'th'));
  };

  const t = (content && content[lang]) ? content[lang] : (content?.th || {});

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
