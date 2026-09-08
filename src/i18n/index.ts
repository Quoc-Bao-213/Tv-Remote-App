import i18n from "i18next";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import { getLocales } from "expo-localization";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

const deviceLanguage = getLocales()[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
