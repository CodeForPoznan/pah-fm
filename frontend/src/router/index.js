import Vue from 'vue';
import Router from 'vue-router';

import ConfirmationView from '../views/ConfirmationView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DriveFormView from '../views/DriveFormView.vue';
import DrivesView from '../views/DrivesView.vue';
import { getItem } from '../services/localStore';
import store from '../store';
import * as mutations from '../store/mutations';
import { tokenKey, deleteToken } from '../services/api/auth';


Vue.use(Router);

export const loginRoute = {
  path: '/login',
  name: 'Login',
  component: LoginView,
};
export const driveCreateRoute = {
  path: '/drive',
  name: 'Drive',
  component: DriveFormView,
};
export const driveListRoute = {
  path: '/drives',
  name: 'Drives',
  component: DrivesView,
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
export const logoutRoute = {
  path: '/logout',
  name: 'Logout',
};
export const pageNotFoundRoute = {
  path: '*',
  name: 'PageNotFound',
  component: HomeView,
  props: { pageNotFound: true },
};

const router = new Router({
  mode: 'history',
  routes: [
    loginRoute,
    driveCreateRoute,
    driveListRoute,
    confirmationRoute,
    homeRoute,
    pageNotFoundRoute,
    logoutRoute,
  ],
});

const openRoutes = [loginRoute.name, confirmationRoute.name];

router.beforeEach((to, _from, next) => {
  // 404 if not route matches
  if (to.name === pageNotFoundRoute.name) {
    return next({ path: homeRoute.path });
  }

  if (to.name === logoutRoute.name) {
    store.commit(mutations.SET_USER, null);
    deleteToken();
    return next({ path: homeRoute.path });
  }

  if (openRoutes.includes(to.name)) {
    return next();
  }

  // Redirect to login if user tries to access closed route without token
  if (!getItem(tokenKey) && !openRoutes.includes(to.name)) {
    return next({ path: loginRoute.path });
  }
  // Redirect home if logged-in user tries to access login route
  if (to.name === loginRoute.name && getItem(tokenKey)) {
    return next({ path: homeRoute.path });
  }
  return next();
});

export default router;
