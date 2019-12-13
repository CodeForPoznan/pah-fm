import Vue from 'vue';
import Router from 'vue-router';
import flatMap from 'array.prototype.flatmap';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DriveFormView from '../views/DriveFormView.vue';
import DrivesView from '../views/DrivesView.vue';
import SuccessfulLogoutView from '../views/SuccessfulLogoutView.vue';
import PassengerView from '../views/PassengerView.vue';
import PassengerSubmitView from '../views/PassengerSubmitView.vue';

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
export const passengerSubmitRoute = {
  path: '/confirm',
  name: 'Confirm',
  component: PassengerSubmitView,
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
    passengerSubmitRoute,
    homeRoute,
    pageNotFoundRoute,
    logoutRoute,
  ],
});

export const groupBasedRoutes = {
  driver: [
    {
      text: 'common.new_drive',
      to: driveCreateRoute,
      visibleOnMenu: true,
    },
    {
      text: 'common.drives',
      to: driveListRoute,
      visibleOnMenu: true,
    },
  ],
  passenger: [
    {
      text: 'common.confirm_drive',
      to: passengerRoute,
      visibleOnMenu: true,
    },
    {
      text: '',
      to: passengerSubmitRoute,
      visibleOnMenu: false,
    },
  ],
};

const allGroupBasedRoutes = [
  ...groupBasedRoutes.driver,
  ...groupBasedRoutes.passenger,
].map(route => route.to.name);

const openRoutes = [loginRoute.name];

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

  // Guard routes based on groups
  if (userLoggedIn && allGroupBasedRoutes.includes(to.name)) {
    const availableRoutes = flatMap(
      store.state.user.groups,
      group => groupBasedRoutes[group.name.toLowerCase()],
    ).map(route => route.to.name);

    const routeAccessible = availableRoutes.includes(to.name);

    if (!routeAccessible) {
      return next({ path: availableRoutes[0].path });
    }
  }

  return next();
});

export default router;
