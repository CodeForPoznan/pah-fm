import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

import Page from '../../components/Page';

const LoginView = () => {
  const { t } = useTranslation();

  return (
    <Page
      title="Login"
    >
      <Container>
        <Typography variant="h2" component="h2"> {t('common.login')}</Typography>
        <form>
          <Box
            display="flex"
            flexDirection="column"
          >
            <Box mb={2}>
              <TextField
                fullWidth
                label={t('login.username')}
                type="email"
                placeholder={t('login.username')}
                />
            </Box>
            <Box mb={2} width="100%">
              <TextField
                fullWidth
                label={t('login.password')}
                type="email"
                placeholder={t('login.password')}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              {t('common.login')}
            </Button>
          </Box>
        </form>
      </Container>
    </Page>
  );
};

export default LoginView;
