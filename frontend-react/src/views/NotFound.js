import React from 'react';

import { Typography } from '@material-ui/core';

import Page from '../components/Page';
import useT from '../utils/translation';

const NotFoundView = () => {
  const notFound = useT('404: Not Found');

  return (
    <Page title="404">
      <Typography>
        {notFound}
      </Typography>
    </Page>
  );
};

export default NotFoundView;
