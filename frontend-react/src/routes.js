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
            key={route.path} 
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
    path: '/404',
    component: lazy(() => import('./views/NotFound'))
  },
  {
    exact: true,
    path: '/login',
    component: lazy(() => import('./views/Login'))
  },
  {
    exact: true,
    path: '/',
    component: lazy(() => import('./views/Home'))
  },
  {
    path: '*',
    routes: [
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
