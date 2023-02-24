/* eslint-disable no-restricted-exports */
import React, {
  Suspense,
  Fragment,
  lazy,
} from 'react';
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {routes.map((route) => {
        const Layout = route.layout || Fragment;
        const Guard = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  {route.routes ?
                    renderRoutes(route.routes) :
                    <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routeKeys = {
  HOME: 'home',
  LOGIN: 'login',
  LOGOUT: 'logout',
  NOTFOUND: 'notfound',
  DEFAULT: 'default',
  DRIVE: 'drive',
};

const routes = [
  {
    exact: true,
    path: '/',
    key: routeKeys.HOME,
    component: lazy(() => import('./views/Home')),
  },
  {
    exact: true,
    path: '/login',
    key: routeKeys.LOGIN,
    component: lazy(() => import('./views/Login')),
  },
  {
    exact: true,
    path: '/logout',
    key: routeKeys.LOGOUT,
    component: <Redirect to="/404" />,
  },
  {
    path: '/404',
    key: routeKeys.NOTFOUND,
    component: lazy(() => import('./views/NotFound')),
  },
  {
    path: '/drive',
    key: routeKeys.DRIVE,
    component: lazy(() => import('./views/Drive')),
  },
  {
    path: '*',
    key: routeKeys.DEFAULT,
    component: () => <Redirect to="/404" />,
  },
];

export {
  routes as default,
  routeKeys,
};
