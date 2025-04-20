import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../translations';
import { Translation } from '../types';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, section?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('it');

  const t = useCallback((key: string, section?: string): string => {
    try {
      const translation = translations[language];
      if (!section) {
        return key.split('.').reduce((obj: any, k) => obj[k], translation) || key;
      }
      return key.split('.').reduce((obj: any, k) => obj[k], translation[section]) || key;
    } catch (error) {
      console.warn(`Translation missing for key: ${key} in section: ${section}`);
      return key;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 