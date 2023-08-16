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
import { ROUTES_VISIBILITY } from './utils/constants';

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
  NOTFOUND: 'notfound',
  DEFAULT: 'default',
  DRIVE: 'drive',
  DRIVES: 'drives',
};

const routes = [
  {
    exact: true,
    path: '/',
    key: routeKeys.HOME,
    component: lazy(() => import('./views/Home')),
    visibility: ROUTES_VISIBILITY.ALWAYS,
  },
  {
    exact: true,
    path: '/login',
    key: routeKeys.LOGIN,
    component: lazy(() => import('./views/Login')),
    visibility: ROUTES_VISIBILITY.GUEST,
  },
  {
    path: '/404',
    key: routeKeys.NOTFOUND,
    component: lazy(() => import('./views/NotFound')),
  },
  {
    exact: true,
    path: '/drive',
    key: routeKeys.DRIVE,
    component: lazy(() => import('./views/Drive')),
    visibility: ROUTES_VISIBILITY.AUTHENTICATED,
  },
  {
    exact: true,
    path: '/drives',
    key: routeKeys.DRIVES,
    component: lazy(() => import('./views/Drives')),
    visibility: ROUTES_VISIBILITY.AUTHENTICATED,
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
