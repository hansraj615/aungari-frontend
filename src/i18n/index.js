import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import hi from "./hi";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "hi",
  fallbackLng: "hi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
