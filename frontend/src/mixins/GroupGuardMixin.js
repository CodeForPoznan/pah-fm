import store from '../store';
import { groupBasedRoutes } from '../router/routes';
import { reverseObject } from '../services/reverseObject';

const { user } = store ? store.state : { user: undefined };
const groups = user ? user.groups.map(({ name }) => name.toLowerCase()) : [];

const getRouteGroup = (routeName) => {
  const groupBasedRouteNames = Object.keys(groupBasedRoutes).reduce(
    (acc, key) => {
      acc[key] = groupBasedRoutes[key].map(route => route.to.name);
      return acc;
    },
    {},
  );
  const routes = reverseObject(groupBasedRouteNames);
  return routes[routeName];
};

export default {
  beforeRouteEnter(to, from, next) {
    const groupOfRoute = getRouteGroup(to.name);
    if (groupOfRoute && groups.includes(groupOfRoute)) {
      next();
    } else {
      next({ path: '/' });
    }
  },
};
