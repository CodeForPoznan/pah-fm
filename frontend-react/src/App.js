import React, {
  useState,
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
import { Grid, IconButton, Link } from "@material-ui/core";
import { MenuOpen } from "@material-ui/icons";
import {
  createMuiTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';

import themeObject from './theme';
import routes, { renderRoutes } from './routes';
import { getMe, login } from './store/slices/auth';
import { getDirectionSelector } from './store/selectors/ui';
import { DIRECTIONS } from './utils/constants';
import Sidebar from './components/Sidebar';
import logo from './assets/logo_pah_en.svg';

const history = createBrowserHistory();

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const ltrTheme = createMuiTheme({ ...themeObject, direction: DIRECTIONS.LTR });
const rtlTheme = createMuiTheme({ ...themeObject, direction: DIRECTIONS.RTL });

const useStyles = makeStyles({
  root: {
    padding: 16,
    minWidth: 191,
  },
  grid: {
    paddingTop: 16,
    paddingBottom: 16,
  }
});

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isRtl = useSelector(getDirectionSelector);
  const [open, setOpen] = useState(false);

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
        <BrowserRouter history={history}>
          <Grid container className={classes.root}>
            <Grid container wrap="nowrap" direction="row">
              <Grid item xs>
                <Grid container wrap="nowrap" alignItems="flex-start" justify="flex-start">
                  <Link to="/">
                    <img alt="PAH logo" width={100} src={logo} />
                  </Link>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container wrap="nowrap" alignItems="flex-start" justify="flex-end">
                  <IconButton color="primary" component="button" onClick={() => setOpen(true)}>
                    <MenuOpen fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className={classes.grid}>
              {renderRoutes(routes)}
              <Sidebar open={open} onClose={() => setOpen(false)} />
            </Grid>
          </Grid>
        </BrowserRouter>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
