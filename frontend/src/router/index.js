import Vue from 'vue';
import Router from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DriveFormView from '../views/DriveFormView.vue';
import DrivesView from '../views/DrivesView.vue';
import { getItem } from '../services/localStore';
import store from '../store';
import * as mutations from '../store/mutations';
import { tokenKey, deleteStorageData } from '../services/api/auth';


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
    homeRoute,
    pageNotFoundRoute,
    logoutRoute,
  ],
});

const openRoutes = [loginRoute.name];

router.beforeEach((to, _from, next) => {
  // 404 if not route matches
  if (to.name === pageNotFoundRoute.name) {
    return next({ path: homeRoute.path });
  }

  if (to.name === logoutRoute.name) {
    store.commit(mutations.SET_USER, null);
    deleteStorageData();
    return next({ path: homeRoute.path });
  }

  if (openRoutes.includes(to.name)) {
    return next();
  }

  if (!getItem(tokenKey) && !openRoutes.includes(to.name)) {
    return next({ path: loginRoute.path });
  }

  if (to.name === loginRoute.name && getItem(tokenKey)) {
    return next({ path: homeRoute.path });
  }

  if (to.name === loginRoute.name && getItem(tokenKey)) {
    return next({ path: homeRoute.path });
  }
  return next();
});

export default router;
