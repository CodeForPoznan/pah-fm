import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import VueI18n from 'vue-i18n';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/index';
import messages from './translations.json';

Vue.use(VueI18n);

const EN = 'EN';
const PL = 'PL';

export const languages = {
  [EN]: 'en',
  [PL]: 'pl',
};

const locale = languages[EN];
const fallbackLocale = languages[EN];

const i18n = new VueI18n({
  locale,
  fallbackLocale,
  messages,
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app');
