import React, {
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import rtl from 'jss-rtl';
import { create } from 'jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';

import themeObject from './theme';
import routes, { renderRoutes } from './routes';
import { getMe, login } from './store/slices/auth';
import { getDirectionSelector } from './store/selectors/ui';
import LanguagePicker from './components/LanguagePicker';
import { DIRECTIONS } from './utils/constants';

const history = createBrowserHistory();

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const ltrTheme = createMuiTheme({ ...themeObject, direction: DIRECTIONS.LTR });
const rtlTheme = createMuiTheme({ ...themeObject, direction: DIRECTIONS.RTL });

const App = () => {
  const dispatch = useDispatch();
  const isRtl = useSelector(getDirectionSelector);
  
  useLayoutEffect(() => {
    document.body.setAttribute("dir", isRtl ? DIRECTIONS.RTL : DIRECTIONS.LTR);
  }, [isRtl]);

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
      <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
        <CssBaseline />
        <div className="App">
          <BrowserRouter history={history}>
            {renderRoutes(routes)}
          </BrowserRouter>
          <LanguagePicker />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
