import React from 'react';

import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

import Page from '../../components/Page';
import useT from '../../utils/translation';

const LoginView = () => {
  const login = useT("Login");
  const username = useT("Username");
  const password = useT("Password");

  return (
    <Page
      title="Login"
    >
      <Container>
        <Typography variant="h2" component="h2"> {login}</Typography>
        <form>
          <Box
            display="flex"
            flexDirection="column"
          >
            <Box mb={2}>
              <TextField
                fullWidth
                label={username}
                type="email"
                placeholder={username}
                />
            </Box>
            <Box mb={2} width="100%">
              <TextField
                fullWidth
                label={password}
                type="email"
                placeholder={password}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              {login}
            </Button>
          </Box>
        </form>
      </Container>
    </Page>
  );
}

export default LoginView;
