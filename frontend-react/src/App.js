import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import rtl from 'jss-rtl';
import { create } from 'jss';

import routes, { renderRoutes } from './routes';
import { getMe, login } from './store/slices/auth';
import { getDirectionSelector } from './store/selectors/ui';
import LanguagePicker from './components/LanguagePicker';
import { DIRECTIONS } from './utils/constants';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';

import themeObject from './theme';

const history = createBrowserHistory();

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const ltrTheme = createMuiTheme({ ...themeObject, direction: DIRECTIONS.LTR });
const rtlTheme = createMuiTheme({ ...themeObject, direction: DIRECTIONS.RTL });


const App = () => {
  const dispatch = useDispatch();
  const  direction = useSelector(getDirectionSelector);
  
  useLayoutEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

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
    <StylesProvider jss={jss}>
      <ThemeProvider theme={direction === DIRECTIONS.LTR ? ltrTheme : rtlTheme}>
        <CssBaseline />
        <div className="App">
          <Router history={history}>
            {renderRoutes(routes)}
          </Router>
          <LanguagePicker />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
