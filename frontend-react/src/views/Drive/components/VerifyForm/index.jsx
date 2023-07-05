import {
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useT from '../../../../utils/translation';

const VerifyForm = ({
  checksum,
  onSubmit,
  onSkip,
}) => {
  const submit = useT('Submit');
  const skip = useT('Skip');

  const translatedFieldsLabels = {
    checksum: useT('Drive checksum'),
    signature: useT('Signature'),
  };

  const validationSchema = yup.object().shape({
    checksum: yup.string(),
    signature: yup.string()
      .required(useT('Signature is required')),
  });

  const formik = useFormik({
    initialValues: {
      checksum,
      signature: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
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
        <Box mb={3}>
          <TextField
            id="verify-checksum"
            name="checksum"
            disabled
            fullWidth
            label={translatedFieldsLabels.checksum}
            type="text"
            value={formik.values.checksum}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box mb={3}>
          <TextField
            id="verify-signature"
            name="signature"
            fullWidth
            label={translatedFieldsLabels.signature}
            type="text"
            value={formik.values.signature}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.signature && Boolean(formik.errors.signature)}
            helperText={formik.touched.signature && formik.errors.signature}
          />
        </Box>
      </Box>
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
          onClick={onSkip}
        >
          {skip}
        </Button>
      </Box>
    </form>
  );
};

export default VerifyForm;
