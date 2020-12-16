import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routes, { renderRoutes } from './routes';

import { login } from './store/slices/auth';

import './App.css';
const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login({
      username: 'driver@codeforpoznan.pl',
      password: 'pass123',
    }));
  }, [dispatch]);

  return (
      <div className="App">
        <Router history={history}>
          {renderRoutes(routes)}
        </Router>
      </div>
  );
}

export default App;
