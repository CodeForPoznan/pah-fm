import Vue from 'vue';
import Router from 'vue-router';

import flatMap from 'array.prototype.flatmap';

import store from '../store';
import * as mutations from '../store/mutations';
import { deleteStorageData } from '../services/api/auth';
import { isUserLoggedIn } from '../services/api/user';

import routes, {
  openRoutes,
  homeRoute,
  pageNotFoundRoute,
  logoutRoute,
  loginRoute,
  groupBasedRoutes,
  allGroupBasedRoutes,
} from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
});

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
      (group) => groupBasedRoutes[group.name.toLowerCase()]
    ).map((route) => route.to.name);

    const routeAccessible = availableRoutes.includes(to.name);

    if (!routeAccessible) {
      return next({ path: availableRoutes[0].path });
    }
  }

  return next();
});

export default router;
