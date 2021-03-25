import React from 'react';
import Page from '../components/Page';
import t from '../utils/translation';

const NotFoundView = () => {
  const notFound = t("404: Not Found");

  return (
    <Page title="404">
      {notFound}
    </Page>
  );
};

export default NotFoundView;
