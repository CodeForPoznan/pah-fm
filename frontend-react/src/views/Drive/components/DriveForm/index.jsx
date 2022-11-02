import { useMemo } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useT from '../../../../utils/translation';
import { selectItems } from './mockItems';
import { FIELDS } from './helpers';

const DriveForm = () => {
  const traveled = useT('traveled');
  const submit = useT('Submit');
  const clear = useT('Clear');

  const translatedFieldsLabels = {
    date: useT('Date'),
    startLocation: useT('Start location'),
    mileageStart: useT('Starting mileage'),
    project: useT('Project'),
    car: useT('Car'),
    passenger: useT('Passenger'),
    description: useT('Description'),
    endLocation: useT('End location'),
    mileageEnd: useT('Ending mileage'),
  };

  const validationSchema = yup.object().shape({
    startLocation: yup.string()
      .required(useT('Start location is required')),
    mileageStart: yup.number()
      .min(0, useT('Starting mileage should be greater or equal to 0'))
      .required(useT('Starting mileage is required')),
    project: yup.string()
      .required(useT('Project is required')),
    car: yup.string()
      .required(useT('Car is required')),
    passenger: yup.string()
      .required(useT('Passenger is required')),
    endLocation: yup.string()
      .required(useT('End location is required')),
    mileageEnd: yup.number()
      .required(useT('Ending mileage is required'))
      .min(0, useT('Ending mileage should be greater or equal to 0'))
      .test(
        {
          message: useT('Ending mileage should be greater or equal to starting mileage'),
          test: (value, path) => {
            const { parent: { mileageStart } } = path;

            return value - mileageStart >= 0;
          },
        }
      ),
  });

  const fieldList = FIELDS.map((field) => {
    const isSelect = field.type === 'select';

    return {
      ...field,
      translatedLabel: translatedFieldsLabels[field.labelName],
      isTextField: !isSelect,
      ...(isSelect ? { items: selectItems[field.labelName] } : {}),
    };
  });

  const formik = useFormik({
    initialValues: {
      date: new Date().toISOString()
        .split('T')[0],
      startLocation: '',
      mileageStart: 0,
      project: '',
      car: '',
      passenger: '',
      description: '',
      endLocation: '',
      mileageEnd: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
    },
  });

  const traveledDistance = useMemo(
    () => Math.max(formik.values.mileageEnd - formik.values.mileageStart, 0),
    [
      formik.values.mileageStart,
      formik.values.mileageEnd,
    ]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        pt={3}
      >
        {fieldList.map((field) => {
          const {
            translatedLabel,
            labelName,
            type,
            items,
          } = field;

          if (!field.isTextField) {
            return (
              <Box
                mb={3}
                key={labelName}
              >
                <FormControl
                  fullWidth
                  error={formik.touched[labelName] && Boolean(formik.errors[labelName])}
                >
                  <InputLabel htmlFor={labelName}>
                    {translatedLabel}
                  </InputLabel>
                  <Select
                    id={labelName}
                    name={labelName}
                    label={translatedLabel}
                    value={formik.values[labelName]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[labelName] && Boolean(formik.errors[labelName])}
                  >
                    {items.map(item => (
                      <MenuItem
                        value={item.id}
                        key={item.id}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched[labelName] && Boolean(formik.errors[labelName]) && (
                    <FormHelperText error>{formik.errors[labelName]}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            );
          }

          return (
            <Box
              mb={3}
              key={labelName}
            >
              <TextField
                id={`drive-${labelName}-label`}
                name={labelName}
                fullWidth
                label={translatedLabel}
                type={type}
                value={formik.values[labelName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[labelName] && Boolean(formik.errors[labelName])}
                helperText={formik.touched[labelName] && formik.errors[labelName]}
              />
            </Box>
          );
        })}
      </Box>
      <p>
        {`${traveledDistance} km ${traveled}`}
      </p>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formik.valid}
        >
          {submit}
        </Button>
        <Button
          variant="contained"
          onClick={formik.resetForm}
        >
          {clear}
        </Button>
      </Box>
    </form>
  );
};

export default DriveForm;
