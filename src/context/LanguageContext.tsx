import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = { language, setLanguage };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { LanguageProvider, useLanguage };
