import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './i18n/translations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      it: {
        translation: translations.it
      },
      en: {
        translation: translations.en
      },
      bg: {
        translation: translations.bg
      }
    },
    lng: 'it', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 