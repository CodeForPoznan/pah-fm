import Vue from 'vue';
import Router from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RouteFormView from '../views/RouteFormView.vue';
import RoutesView from '../views/RoutesView.vue';
import { getItem } from '../services/localStore';
import { tokenKey } from '../services/api/auth';
import { LOGIN_PATH, LOGOUT_PATH, HOME_PATH, CONFIRMATION_PATH } from './constants';
import { deleteToken } from '../services/api/auth';
import store from '../store';
import * as mutations from "../store/mutations";
import ConfirmationView from "../views/ConfirmationView";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: LOGIN_PATH,
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/route',
      name: 'Route',
      component: RouteFormView,
    },
    {
      path: '/routes',
      name: 'Routes',
      component: RoutesView,
    },
    {
      path: CONFIRMATION_PATH,
      name: 'Confirmation',
      component: ConfirmationView,
    },
    {
      path: '/',
      name: HOME_PATH,
      component: HomeView,
    },
  ],
});

const openRoutes = ['Login', 'Confirmation'];

router.beforeEach((to, _from, next) => {
  if (to.fullPath === LOGOUT_PATH) {
    deleteToken();
    store.commit(mutations.SET_USER, null);
  }
  if (!getItem(tokenKey) && !openRoutes.includes(to.name)) {
    return next({ path: LOGIN_PATH });
  }
  if (openRoutes.includes(to.name) && getItem(tokenKey)) {
    return next({ path: HOME_PATH });
  }
  return next();
});

export default router;
