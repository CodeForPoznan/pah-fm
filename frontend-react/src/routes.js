import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {routes.map(route => {
        const Layout = route.layout || Fragment;
        const Guard = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/',
    key: 'Home',
    component: lazy(() => import('./views/Home'))
  },
  {
    exact: true,
    path: '/login',
    key: 'Login',
    component: lazy(() => import('./views/Login'))
  },
  {
    exact: true,
    path: '/logout',
    key: 'Logout',
    component: <Redirect to="/404" />
  },
  {
    path: '/404',
    key: 'NotFound',
    component: lazy(() => import('./views/NotFound'))
  },
  {
    path: '*',
    key: 'Default',
    component: () => <Redirect to="/404" />
  },
];

export default routes;
