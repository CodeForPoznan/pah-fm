import Vue from 'vue';
import Router from 'vue-router';

// import your views here
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
  ],
});
