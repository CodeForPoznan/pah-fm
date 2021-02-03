import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Container from 'react-bootstrap/Container';

import routes, { renderRoutes } from './routes';
import {
  getMe,
  login,
} from './store/slices/auth';

const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = async () => {
      await dispatch(login({
        username: 'driver@codeforpoznan.pl',
        password: 'pass123',
      }));
      dispatch(getMe());
    }

    authenticate();
  }, [dispatch]);

  return (
      <div className="App">
        <Router history={history}>
          <Container className="p-3">
            {renderRoutes(routes)}
          </Container>
        </Router>
      </div>
  );
}

export default App;
