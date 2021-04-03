import React from 'react';

import Page from '../../components/Page';
import useT from '../../utils/translation';

const statement =
  'The Polish Humanitarian Action is a Polish non-governmental organisation ' +
  'which operates in Poland and other countries. Its mission is "to make the' +
  'world a better place through alleviation of human suffering and promotion' +
  'of humanitarian values".';

const LoginView = () => (
  <Page title="Home">
    {useT(statement)}
  </Page>
);

export default LoginView;
