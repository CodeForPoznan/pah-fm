import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron';

import Page from '../../components/Page';

const LoginView = () => {
  const { t } = useTranslation();

  return (
    <Page
      title="Login"
    >
      <Jumbotron>
        <h2 className="header"> {t('common.login')}</h2>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>{t('login.username')}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t('login.username')}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>{t('login.password')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('login.password')}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {t('common.login')}
          </Button>
        </Form>
      </Jumbotron>
    </Page>
  );
};

export default LoginView;
