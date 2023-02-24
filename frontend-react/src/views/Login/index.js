import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';

import Page from '../../components/Page';
import LoginForm from './components/LoginForm';

import { login as loginAction } from '../../store/slices/auth';

import useT from '../../utils/translation';

const LoginView = () => {
  const login = useT('Login');
  const dispatch = useDispatch();

  const formSubmit = values => dispatch(loginAction(values));

  return (
    <Page title={login}>
      <Typography
        variant="h2"
        component="h2"
      >
        {login}
      </Typography>
      <LoginForm submitAction={formSubmit} />
    </Page>
  );
};

export default LoginView;
