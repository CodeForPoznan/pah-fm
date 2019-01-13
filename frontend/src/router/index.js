import Vue from 'vue';
import Router from 'vue-router';

import ConfirmationView from '../views/ConfirmationView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RouteFormView from '../views/RouteFormView.vue';
import RoutesView from '../views/RoutesView.vue';
import { getItem } from '../services/localStore';
import { tokenKey } from '../services/api/auth';


Vue.use(Router);

export const loginRoute = {
  path: '/login',
  name: 'Login',
  component: LoginView,
};
export const driveCreateRoute = {
  path: '/drive',
  name: 'Drive',
  component: RouteFormView,
};
export const driveListRoute = {
  path: '/drives',
  name: 'Drives',
  component: RoutesView,
};
export const confirmationRoute = {
  path: '/confirmation/:token',
  name: 'Confirmation',
  component: ConfirmationView,
};
export const homeRoute = {
  path: '/',
  name: 'Home',
  component: HomeView,
};


const router = new Router({
  mode: 'history',
  routes: [
    loginRoute,
    driveCreateRoute,
    driveListRoute,
    confirmationRoute,
    homeRoute,
  ],
});

const openRoutes = ['Login', 'Confirmation'];

router.beforeEach((to, _from, next) => {
  if (!getItem(tokenKey) && !openRoutes.includes(to.name)) {
    return next({ path: loginRoute.path });
  }
  if (openRoutes.includes(to.name) && getItem(tokenKey)) {
    return next({ path: homeRoute.path });
  }
  return next();
});

export default router;
