import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from '../../assets/i18n/en.json';
import esTranslations from '../../assets/i18n/es.json';

const translations = {
  en: enTranslations,
  es: esTranslations
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Get language from URL query string (?language=EN or ?language=ES)
  const [language, setLanguageState] = useState(() => {
    // Get URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const languageParam = searchParams.get('language');
    
    // Priority: URL parameter > localStorage > default (es)
    if (languageParam !== null) {
      // Normalize to lowercase (en or es)
      const normalized = languageParam.toLowerCase();
      if (normalized === 'en' || normalized === 'es') {
        return normalized;
      }
    }
    
    // Fallback to localStorage if no URL param
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      return savedLanguage;
    }
    
    // Default to Spanish
    return 'es';
  });

  // Update localStorage when language changes (only if not from URL param)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const languageParam = searchParams.get('language');
    
    // Only save to localStorage if not controlled by URL parameter
    if (languageParam === null) {
      localStorage.setItem('language', language);
    }
  }, [language]);
  
  // Wrapper function to set language
  const setLanguage = (value) => {
    setLanguageState(value);
  };

  // Translation function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 