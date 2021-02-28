import React from 'react';

import Page from '../../components/Page';
import { T } from "@transifex/react";

const statement = `
The Polish Humanitarian Action is a Polish non-governmental organisation which \
operates in Poland and other countries. Its mission is "to make the world a \
better place through alleviation of human suffering and promotion of \
humanitarian values".
`;

const LoginView = () => (
  <Page title="Home">
    <T _str={statement}/>
  </Page>
);

export default LoginView;
