import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './translations/en/translation.json';
import ukTranslation from './translations/uk/translation.json';
import soTranslation from './translations/so/translation.json';
import plTranslation from './translations/pl/translation.json';
import kuTranslation from './translations/ku/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  uk: {
    translation: ukTranslation,
  },
  so: {
    translation: soTranslation,
  },
  pl: {
    translation: plTranslation,
  },
  ku: {
    translation: kuTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    keySeparator: '.',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
    },
  });

  export default i18n;