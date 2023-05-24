import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useT from '../../../../utils/translation';

const ConfirmForm = ({ onSubmit }) => {
  const submit = useT('Submit');
  const clear = useT('Clear');
  const codeFieldLabel = useT('Driver code');
  const codeFieldError = useT('Code is required');
  const codeLengthError = useT('Code has to be exactly 6 digits');
  const signError = useT('Problem with signature generation');
  const signSuccessInfo = useT('Generated signature code');

  const [
    generatedSignature,
    setGeneratedSignature,
  ] = useState('');

  const validationSchema = yup.object().shape({
    code: yup.string()
      .required(codeFieldError)
      .length(6, codeLengthError),
  });

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema,
    onSubmit: async ({ code }, { setErrors }) => {
      setGeneratedSignature('');
      onSubmit(code).then(
        (response) => {
          setGeneratedSignature(response);
        }
      )
        .catch(() => {
          setErrors({ code: signError });
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <Box
        display="flex"
        flexDirection="column"
      >
        <Box
          mb={3}
          mt={2}
        >
          <TextField
            id="code"
            name="code"
            fullWidth
            label={codeFieldLabel}
            type="text"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />
        </Box>
      </Box>
      {generatedSignature && (
        <Box mb={2}>
          <Alert severity="success">
            {signSuccessInfo}
            {' '}
            <b>{generatedSignature}</b>
          </Alert>
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
        >
          {submit}
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={formik.resetForm}
        >
          {clear}
        </Button>
      </Box>
    </form>
  );
};

export default ConfirmForm;
