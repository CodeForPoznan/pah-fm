import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { useSelector } from 'react-redux';
import LanguagePicker from './LanguagePicker';
import routes, { routeKeys } from '../routes';
import useT from '../utils/translation';
import logo from '../assets/logo_codeforpoznan.svg';
import {
  currentUserGroupsSelector,
  currentUserUsernameSelector,
  isAuthenticatedSelector,
} from '../store/selectors/auth';
import { ROUTES_VISIBILITY } from '../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.sidebar.fg,
    background: theme.palette.sidebar.bg,
    height: '100vh',
    minWidth: 250,
    padding: theme.spacing(2),
  },
  close: {
    color: theme.palette.sidebar.fg,
  },
  link: {
    color: theme.palette.sidebar.fg,
    textDecoration: 'none',
  },
  grid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  logoutButton: {
    color: theme.palette.sidebar.fg,
    textTransform: 'none',
  },
}));

const Sidebar = ({
  open,
  onClose,
}) => {
  const classes = useStyles();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const username = useSelector(currentUserUsernameSelector);
  const userGroups = useSelector(currentUserGroupsSelector);
  const translations = {
    // keys are taken from routes.js::routes[].key
    [routeKeys.HOME]: useT('Home page'),
    [routeKeys.LOGIN]: useT('Log in'),
    [routeKeys.DRIVE]: useT('Add new drive'),
    [routeKeys.DRIVES]: useT('Drives'),
    [routeKeys.PASSENGER]: useT('Confirm drive'),
  };

  const links = useMemo(
    () => routes.filter(({ exact }) => exact)
      .filter(({ visibility }) => (visibility === ROUTES_VISIBILITY.ALWAYS ||
      (isAuthenticated ?
        visibility === ROUTES_VISIBILITY.AUTHENTICATED :
        visibility === ROUTES_VISIBILITY.GUEST)
      ))
      .filter(({ groups }) => !groups || userGroups.some(role => groups.includes(role))),
    [
      routes,
      isAuthenticated,
    ]
  );

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
          {links.map(r => (
            <Link
              key={r.key}
              to={r.path}
              className={classes.link}
              onClick={onClose}
            >
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
      <Divider />
      {isAuthenticated && (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={2}
        >
          <Button
            className={classes.logoutButton}
            onClick={() => { console.log('dispatch logout'); }}
            disableRipple
          >
            <Typography>Logout</Typography>
          </Button>
          <Typography>{username}</Typography>
        </Box>
      )}
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;

