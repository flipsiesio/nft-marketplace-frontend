import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LocaleKey } from 'appConstants';

import App from './app';

const resources = {
  [LocaleKey.es]: {
    translation: {
      ...App.es,
    },
  },
  [LocaleKey.en]: {
    translation: {
      ...App.en,
    },
  },
  [LocaleKey.fr]: {
    translation: {
      ...App.fr,
    },
  },
  [LocaleKey.ja]: {
    translation: {
      ...App.ja,
    },
  },
  [LocaleKey.pt]: {
    translation: {
      ...App.pt,
    },
  },
  [LocaleKey.zh]: {
    translation: {
      ...App.zh,
    },
  },
  [LocaleKey.ko]: {
    translation: {
      ...App.ko,
    },
  },
  [LocaleKey['zh-hk']]: {
    translation: {
      ...App.zhHk,
    },
  },
  [LocaleKey.de]: {
    translation: {
      ...App.de,
    },
  },
  [LocaleKey.ru]: {
    translation: {
      ...App.ru,
    },
  },
  [LocaleKey.hi]: {
    translation: {
      ...App.hi,
    },
  },
  [LocaleKey.pan]: {
    translation: {
      ...App.pan,
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    debug: false,

    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      useSuspense: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b', 'ol', 'li', 'a'],
    },
  });

export default i18n;
