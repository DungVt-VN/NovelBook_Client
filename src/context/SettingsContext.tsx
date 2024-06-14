import { createContext, useContext, useState, ReactNode } from 'react';

interface Settings {
  theme: 'light' | 'dark';
  language: 'en' | 'vi';
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    language: 'en'
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  const value = { settings, updateSettings };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { SettingsProvider, useSettings };
