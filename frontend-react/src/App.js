import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import routes, { renderRoutes } from './routes';
import { getMe, login } from './store/slices/auth';
import LanguagePicker from './components/LanguagePicker';

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
        {renderRoutes(routes)}
      </Router>
      <LanguagePicker />
    </div>
  );
}

export default App;
