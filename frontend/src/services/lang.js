import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '../translations.json';

Vue.use(VueI18n);

export const GB = 'GB';
export const PL = 'PL';
export const UA = 'UA';

export const languages = {
  [GB]: 'gb',
  [PL]: 'pl',
  [UA]: 'ua',
};

export const languagesOrder = ['pl', 'gb', 'ua'];

const locale = languages[GB];
const fallbackLocale = languages[GB];

const i18n = new VueI18n({
  locale,
  fallbackLocale,
  messages,
});

export default i18n;
