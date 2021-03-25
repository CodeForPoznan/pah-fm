import React from 'react';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron';

import Page from '../../components/Page';
import useT from '../../utils/translation';

const LoginView = () => {
  const login = useT("Login");
  const username = useT("Username");
  const password = useT("Password");

  return (
    <Page title="Login">
      <Jumbotron>
        <h2 className="header"> {login}</h2>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>{username}</Form.Label>
            <Form.Control
              type="email"
              placeholder={username}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>{password}</Form.Label>
            <Form.Control
              type="password"
              placeholder={password}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {login}
          </Button>
        </Form>
      </Jumbotron>
    </Page>
  );
}

export default LoginView;
