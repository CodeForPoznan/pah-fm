import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import LanguagePicker from './LanguagePicker';
import routes, { routeKeys } from '../routes';
import useT from '../utils/translation';
import logo from '../assets/logo_codeforpoznan.svg';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.sidebar.fg,
    background: theme.palette.sidebar.bg,
    height: '100vh',
    minWidth: 250,
    padding: 16,
  },
  close: {
    color: theme.palette.sidebar.fg,
  },
  link: {
    color: theme.palette.sidebar.fg,
    textDecoration: 'none',
  },
  grid: {
    paddingTop: 16,
  },
}));

const Sidebar = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const translations = {
    // keys are taken from routes.js::routes[].key
    [routeKeys.HOME]: useT('Home page'),
    [routeKeys.LOGIN]: useT('Log in'),
    [routeKeys.LOGOUT]: useT('Log out'),
    [routeKeys.DRIVE]: useT('Add new drive'),
    [routeKeys.TEST]: 'Testing',
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <Grid
        container
        wrap="nowrap"
        direction="column"
      >
        <Grid
          container
          wrap="nowrap"
          justifyContent="flex-end"
        >
          <IconButton
            color="primary"
            component="button"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Grid>
        <List>
          {routes.filter(r => r.exact).map(r => (
            <Link
              key={r.key}
              to={r.path}
              className={classes.link}
            >
              {console.log('traslations', r)}
              <ListItem>
                <ListItemText>
                  {translations[r.key]}
                </ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <LanguagePicker />
        <Divider />
        <Grid
          container
          wrap="nowrap"
          justifyContent="center"
          className={classes.grid}
        >
          <a
            href="https://codeforpoznan.pl"
            target="_blank"
            rel="noreferrer"
          >
            <img
              alt="CodeForPoznan logo"
              src={logo}
              width={80}
            />
          </a>
        </Grid>
      </Grid>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;

