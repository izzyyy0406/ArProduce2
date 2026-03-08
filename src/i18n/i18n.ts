import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en.json';
import esTranslation from './es.json';
import frTranslation from './fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslation,
      es: esTranslation,
      fr: frTranslation
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
