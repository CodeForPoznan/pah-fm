import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import Vue from 'vue';

import FlagIcon from 'vue-flag-icon';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/index';
import i18n from './services/lang';

Vue.use(FlagIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://d4ec1a8095964813a55529d873eae0e6@sentry.io/1518607',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });
}

new Vue({
  render: (h) => h(App),
  router,
  i18n,
}).$mount('#app');
