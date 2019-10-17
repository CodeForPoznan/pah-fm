import Vue from 'vue';
import Router from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DriveFormView from '../views/DriveFormView.vue';
import DrivesView from '../views/DrivesView.vue';
import SuccessfulLogoutView from '../views/SuccessfulLogoutView.vue';
import PassengerView from '../views/PassengerView.vue';

import store from '../store';
import * as mutations from '../store/mutations';
import { deleteStorageData } from '../services/api/auth';
import { isUserLoggedIn } from '../services/api/user';

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
export const passengerRoute = {
  path: '/passenger',
  name: 'Passenger',
  component: PassengerView,
};
export const homeRoute = {
  path: '/',
  name: 'Home',
  component: HomeView,
};
export const logoutRoute = {
  path: '/logout',
  name: 'Logout',
  component: SuccessfulLogoutView,
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
    passengerRoute,
    homeRoute,
    pageNotFoundRoute,
    logoutRoute,
  ],
});

const openRoutes = [loginRoute.name];

const roleBasedRoutes = {
  driver: [driveCreateRoute, driveListRoute],
  passenger: [passengerRoute],
};
const allRoleBasedRoutes = [
  ...roleBasedRoutes.driver,
  ...roleBasedRoutes.passenger,
];

router.beforeEach((to, _from, next) => {
  const userLoggedIn = isUserLoggedIn();

  // 404 if not route matches
  if (to.name === pageNotFoundRoute.name) {
    return next({ path: homeRoute.path });
  }

  // user is going to log out
  if (userLoggedIn && to.name === logoutRoute.name) {
    store.commit(mutations.SET_USER, null);
    deleteStorageData();
    store.commit(mutations.SET_LOGOUT_PROGRESS, true);
    return next();
  }

  // user logged out
  if (store.state.logoutInProgress && to.name === logoutRoute.name) {
    store.commit(mutations.SET_LOGOUT_PROGRESS, false);
    return next();
  }

  // route is open
  if (openRoutes.includes(to.name)) {
    return next();
  }

  // Redirect to login if user tries to access closed route without token
  if (!userLoggedIn && !openRoutes.includes(to.name)) {
    return next({ path: loginRoute.path });
  }
  // Redirect home if logged-in user tries to access login route
  if (userLoggedIn && to.name === loginRoute.name) {
    return next({ path: homeRoute.path });
  }

  if (userLoggedIn && allRoleBasedRoutes.includes(to.name)) {
    if (store.state.user.role) {
      const availableRoutes = roleBasedRoutes[store.state.user.role].map(route => route.name);

      if (!availableRoutes.includes(to.name)) {
        return next({ path: availableRoutes[0].path });
      }
    }
  }

  return next();
});

export default router;
