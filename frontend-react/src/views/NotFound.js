import React from 'react';
import Page from '../components/Page';
import useT from '../utils/translation';

const NotFoundView = () => (
  <Page title="404">
    {useT("404: Not Found")}
  </Page>
);

export default NotFoundView;
