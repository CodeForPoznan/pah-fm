import React, {
  useState,
  useEffect,
} from 'react';
import {
  FormControl,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Button,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Page from '../../components/Page';

import useT from '../../utils/translation';

import {
  useStyles,
  WhiteBox,
  ButtonsContainer,
} from './styles';

const DriveView = () => {
  // local state
  const [
    traveled,
    setTraveled,
  ] = useState(0);

  // Translated labels
  const title = useT('Add new drive');
  const errorTitle = useT('Please correct the following error(s):');
  const traveledT = useT('traveled');
  const submit = useT('Submit');
  const reset = useT('Reset');

  // separate object to generate fields dynamically
  const translatedFieldsLabels = {
    date: useT('Date'),
    startLocation: useT('Start location'),
    mileageStart: useT('Starting mileage'),
    project: useT('Project'),
    car: useT('Choose a car'),
    passenger: useT('Passenger'),
    description: useT('Description'),
    endLocation: useT('End location'),
    mileageEnd: useT('Ending mileage'),
  };

  const validationSchema = yup.object().shape({
    startLocation: yup.string()
      .required(useT('Start location is required')),
    mileageStart: yup.number()
      .required(useT('Starting mileage is required')),
    project: yup.string()
      .required(useT('Project is required')),
    car: yup.string()
      .required(useT('Car is required')),
    passenger: yup.string()
      .required(useT('Start location is required')),
    endLocation: yup.string()
      .required(useT('End location is required')),
    mileageEnd: yup.number()
      .required(useT('Ending mileage is required')),
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
    validateOnChange: false,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    const {
      mileageStart, mileageEnd,
    } = formik.values;
    const mileage = mileageEnd - mileageStart;

    if (mileage !== traveled && mileage >= 0) {
      setTraveled(mileage);
    }
  }, [
    formik.values,
    traveled,
  ]);

  // values to generate MenuItems in select fields. Will be converted to redux slice.
  const selectItems = {
    project: [
      'TestProject1',
      'TestProject2',
      'TestProject3',
    ],
    car: [
      'Audi',
      'Opel',
      'Lamborghini',
    ],
    passenger: [
      'Passenger1',
      'Passenger2',
      'Passenger3',
    ],
  };

  const selectItemsNames = Object.keys(selectItems);

  // generate fieldList array dynamically
  const fieldList = Object.keys(formik.values).map((label) => {
    let type = 'text';

    // set type based on label
    if (label.includes('mileage')) {
      type = 'number';
    } else if (label === 'date') {
      type = 'date';
    }

    const isSelect = selectItemsNames.includes(label);

    const result = {
      isTextField: !isSelect,
      translatedLabel: translatedFieldsLabels[label],
      labelName: label,
      type,
      errorText: formik.errors[label],
    };

    if (isSelect) {
      result.items = selectItems[label];
    }

    return result;
  });

  const classes = useStyles();

  return (
    <Page
      title="Drive"
      className={classes.root}
    >
      <Container
        className={classes.container}
        maxWidth="md"
      >
        {!!Object.keys(formik.errors).length && (
          <Box className={classes.errorContainer}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.errorTitle}
            >
              {errorTitle}
            </Typography>
            <ul>
              {Object.values(formik.errors).map(errorText => (
                <li key={errorText}>{errorText}</li>
              ))}
            </ul>
          </Box>
        )}
        <form
          className={classes.formContainer}
          onSubmit={formik.handleSubmit}
        >
          <Typography
            variant="h2"
            component="h2"
            className={classes.title}
          >
            {title}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
          >
            {fieldList.map((field) => {
              const {
                translatedLabel,
                labelName,
                type,
                items,
                errorText,
              } = field;

              if (!field.isTextField) {
                return (
                  <WhiteBox key={`${labelName}-select-container`}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel id={`drive-${labelName}-label`}>
                        {translatedLabel}
                      </InputLabel>
                      <Select
                        id={`drive-${labelName}`}
                        name={labelName}
                        labelId={`drive-${labelName}-label`}
                        label={translatedLabel}
                        value={formik.values[labelName]}
                        onChange={formik.handleChange}
                        error={!!errorText}
                      >
                        {items.map(item => (
                          <MenuItem
                            key={item}
                            value={item}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </WhiteBox>
                );
              }

              return (
                <WhiteBox key={`${labelName}-container`}>
                  <TextField
                    id={`drive-${labelName}`}
                    name={labelName}
                    variant="outlined"
                    fullWidth
                    label={translatedLabel}
                    type={type}
                    value={formik.values[labelName]}
                    onChange={formik.handleChange}
                    error={!!errorText}
                  />
                </WhiteBox>
              );
            })}
          </Box>
          <p>
            {traveled}
            {' '}
            km
            {' '}
            {traveledT}
          </p>
          <ButtonsContainer>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {submit}
            </Button>
            <Button
              variant="contained"
              onClick={formik.resetForm}
            >
              {reset}
            </Button>
          </ButtonsContainer>
        </form>
      </Container>
    </Page>
  );
};

export default DriveView;
