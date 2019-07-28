import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import FlagIcon from 'vue-flag-icon';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import VueI18n from 'vue-i18n';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/index';
import messages from './translations.json';

Vue.use(FlagIcon);
Vue.use(VueI18n);

export const GB = 'GB';
export const PL = 'PL';
export const UA = 'UA';

export const languages = {
  [GB]: 'gb',
  [PL]: 'pl',
  [UA]: 'ua',
};

export const languagesOrder = [
  'pl',
  'gb',
  'ua',
];

const locale = languages[GB];
const fallbackLocale = languages[GB];

export const i18n = new VueI18n({
  locale,
  fallbackLocale,
  messages,
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);


if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://c09cea51a0b44371bc77137627641db2@sentry.io/1515416',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });
}

new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app');
