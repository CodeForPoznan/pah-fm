import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import FlagIcon from 'vue-flag-icon';

import VueI18n from 'vue-i18n';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router, { driveCreateRoute, driveListRoute, homeRoute } from './router/index';
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


const navigation = [
  {
    text: i18n.tc('common.home'),
    to: homeRoute.path,
  },
  {
    text: i18n.tc('common.new_route'),
    to: driveCreateRoute.path,
  },
  {
    text: i18n.tc('common.routes'),
    to: driveListRoute.path,
  },
];

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.prototype.navigation = navigation;

new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app');
