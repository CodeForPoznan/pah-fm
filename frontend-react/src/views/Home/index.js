import React from 'react';

import Page from '../../components/Page';
import useT from "../../utils/translation";

const LoginView = () => {
  // I know this line sucks, but there's no better way to handle this long string now, unfortunately
  const statement = useT('The Polish Humanitarian Action is a Polish non-governmental organisation which operates in Poland and other countries. Its mission is "to make the world a better place through alleviation of human suffering and promotion of humanitarian values".');

  return (
    <Page title="Home">
      {statement}
    </Page>
  );
};

export default LoginView;
