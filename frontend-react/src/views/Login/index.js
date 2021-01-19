import React from 'react';
import { useTranslation } from 'react-i18next';

import Page from '../../components/Page';

const LoginView = () => {
  const { t } = useTranslation();

  return (
    <Page
      title="Login"
    >
       {t('common.login')}
    </Page>
  );
};

export default LoginView;
