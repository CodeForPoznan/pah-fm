import React from 'react';
import { useT } from "@transifex/react";
import Page from '../components/Page';

const NotFoundView = () => {
  const notFound = useT('404: Not Found');

  return (
    <Page title={notFound}>
      {notFound}
    </Page>
  );
}

export default NotFoundView;
