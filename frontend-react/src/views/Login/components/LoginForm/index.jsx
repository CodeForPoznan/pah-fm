import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import useT from '../../../../utils/translation';

const MAX_USERNAME = 150;
const MIN_PASSWORD = 7;
const MAX_PASSWORD = 128;

const LoginForm = ({ submitAction }) => {
  const [notFieldError, setNonFieldError] = useState(null);
  const login = useT("Login");
  const username = useT("Username");
  const password = useT("Password");
  const passwordRequired = useT("Password is required");
  const usernameRequired = useT("Username is required");
  const usernameMax = useT("Should not be longer than {max} characters", { max: MAX_USERNAME });
  const passwordMin = useT("Should not be shorter than {min} characters", { min: MIN_PASSWORD });
  const passwordMax = useT("Should not be longer than {max} characters", { max: MAX_PASSWORD });

  const history = useHistory();

  const validationSchema =  Yup.object().shape({
    username: Yup.string()
      .required(usernameRequired)
      .max(MAX_USERNAME, usernameMax),
    password: Yup.string()
      .required(passwordRequired)
      .min(MIN_PASSWORD, passwordMin)
      .max(MAX_PASSWORD, passwordMax),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, formikBag) => {
      const response = await submitAction(values);

      if (response?.payload) {
        setNonFieldError(response.payload.detail || response.payload.nonFieldErrors[0]);
      } else {
        history.push('/')
      }
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        pt={3}
      >
        <Box mb={2}>
          <TextField
            id="username"
            name="username"
            fullWidth
            label={username}
            placeholder={username}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box mb={4}>
          <TextField
            fullWidth
            label={password}
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>
        {notFieldError && (
          <Box mb={2}>
            <Alert severity="error">
              {notFieldError}
            </Alert>
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          {login}
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
