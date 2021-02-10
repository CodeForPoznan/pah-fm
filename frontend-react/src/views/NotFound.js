import React from 'react';

import { Typography } from '@material-ui/core'; 

import Page from '../components/Page';

const NotFoundView = () => {
  return (
    <Page
      title="404: Not found"
    >
      <Typography>
        404
      </Typography>
    </Page>
  );
};

export default NotFoundView;
