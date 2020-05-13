import Vue from 'vue';
import Router from 'vue-router';

import flatMap from 'array.prototype.flatmap';

import store from '../store';
import { IS_USER_LOGGED_IN } from '../store/modules/session';

import routes, {
  openRoutes,
  homeRoute,
  pageNotFoundRoute,
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
  const userLoggedIn = store.getters[`session/${IS_USER_LOGGED_IN}`];

  // 404 if not route matches
  if (to.name === pageNotFoundRoute.name) {
    return next({ path: homeRoute.path });
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
