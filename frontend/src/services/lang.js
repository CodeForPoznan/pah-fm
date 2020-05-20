import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '../translations.json';

Vue.use(VueI18n);

export const GB = 'GB';
export const PL = 'PL';
export const UA = 'UA';
export const SO = 'SO';

export const languages = {
  [GB]: 'gb',
  [PL]: 'pl',
  [UA]: 'ua',
  [SO]: 'so',
};

export const languagesOrder = ['pl', 'gb', 'ua', 'so'];

const locale = languages[GB];
const fallbackLocale = languages[GB];

const i18n = new VueI18n({
  locale,
  fallbackLocale,
  messages,
});

export default i18n;
