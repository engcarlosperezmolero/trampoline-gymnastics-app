import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en";
import esTranslations from "./locales/es";

// Initialize i18next outside of React component lifecycle
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations }
    },
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 