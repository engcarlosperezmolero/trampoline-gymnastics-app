
import { createContext, useContext, useState, useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en";
import esTranslations from "../locales/es";

type Language = "en" | "es";

type LanguageProviderProps = {
  children: React.ReactNode;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "en";
  });

  useEffect(() => {
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: enTranslations },
          es: { translation: esTranslations }
        },
        lng: language,
        fallbackLng: "en",
        interpolation: {
          escapeValue: false
        }
      });

    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
