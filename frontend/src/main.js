import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/index';


Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
