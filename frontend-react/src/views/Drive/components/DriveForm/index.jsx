import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

import useT from '../../../../utils/translation';
import { hashDict } from '../../../../utils/crypto';

import {
  addDrive,
  getDrives,
} from '../../../../store/slices/drives';
import { addDriveErrorsSelector } from '../../../../store/selectors/drives';

import { FIELDS } from './helpers';
import VerifyForm from '../VerifyForm';

const useStyles = makeStyles(theme => ({
  dialog: {
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 20px)',
      margin: 20,
      maxWidth: 560,
    },
    width: 560,
    padding: theme.spacing(2),
  },
}));

const DriveForm = ({
  cars,
  projects,
  passengers,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formErrors = useSelector(addDriveErrorsSelector);

  const [
    isConfirmationDialogOpen,
    setIsConfirmationDialogOpen,
  ] = useState(false);

  const [
    isSkippedDialogOpen,
    setIsSkippedDialogOpen,
  ] = useState(false);

  const selectItems = useMemo(() => ({
    project: projects.map(({
      id,
      title,
    }) => ({
      id,
      name: title,
    })),
    car: cars.map(({
      id,
      plates,
    }) => ({
      id,
      name: plates,
    })),
    passenger: passengers.map(({
      id,
      firstName,
      lastName,
    }) => ({
      id,
      name: `${firstName} ${lastName}`,
    })),
  }), [
    cars,
    passengers,
    projects,
  ]);
  const traveled = useT('traveled');
  const submit = useT('Submit');
  const clear = useT('Clear');
  const dialogTitle = useT('Confirm drive');
  const skipTitle = useT('Verification skipped');
  const skipMessage = useT('Drive was successfully added to database.');
  const skipInfo = useT('This drive was not verified, contact with a person from PAH responsible for drives to solve it.');
  const ok = useT('ok');

  const translatedFieldsLabels = {
    date: useT('Date'),
    startLocation: useT('Start location'),
    startMileage: useT('Starting mileage'),
    project: useT('Project'),
    car: useT('Car'),
    passenger: useT('Passenger'),
    description: useT('Description'),
    endLocation: useT('End location'),
    endMileage: useT('Ending mileage'),
  };

  const validationSchema = yup.object().shape({
    date: yup.string()
      .required(useT('Date is required')),
    startLocation: yup.string()
      .required(useT('Start location is required')),
    startMileage: yup.number()
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
    endMileage: yup.number()
      .required(useT('Ending mileage is required'))
      .min(0, useT('Ending mileage should be greater or equal to 0'))
      .test(
        {
          message: useT('Ending mileage should be greater or equal to starting mileage'),
          test: (value, path) => {
            const { parent: { startMileage } } = path;

            return value - startMileage >= 0;
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
      startMileage: 0,
      project: '',
      car: '',
      passenger: '',
      description: '',
      endLocation: '',
      endMileage: 0,
    },
    validationSchema,
    onSubmit: () => {
      setIsConfirmationDialogOpen(true);
    },
  });

  const traveledDistance = useMemo(
    () => Math.max(formik.values.endMileage - formik.values.startMileage, 0),
    [
      formik.values.endMileage,
      formik.values.startMileage,
    ]
  );

  useEffect(() => {
    if (formErrors) {
      const {
        passengers: passengersError,
      } = formErrors;

      formik.setErrors({
        passenger: passengersError?.[0],
      });
    }
  }, [formErrors]);

  const hashDriveChecksum = useMemo(
    () => String(hashDict({
      car: { id: formik.values.car },
      project: { id: formik.values.project },
      passengers: [{ id: formik.values.passenger }],
      startLocation: formik.values.startLocation,
      endLocation: formik.values.endLocation,
      startMileage: formik.values.startMileage,
      endMileage: formik.values.endMileage,
    })).padStart(6, '0'),
    [formik.values]
  );

  const handleSkip = () => {
    const {
      car,
      project,
      passenger,
      ...rest
    } = formik.values;

    const payload = {
      ...rest,
      isVerified: false,
      car: { id: car },
      project: { id: project },
      passengers: [{ id: passenger }],
      timestamp: Math.floor(Date.now() / 1000),
    };

    return dispatch(addDrive(payload))
      .then(() => {
        dispatch(getDrives());
        setIsConfirmationDialogOpen(false);
        setIsSkippedDialogOpen(true);
        formik.resetForm();
      });
  };

  const handleVerify = (values) => {
    console.log('confirm', values);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
      >
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
                  {...(type === 'date' ? { InputLabelProps: { shrink: true } } : {})}
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
      <Dialog
        classes={{ paper: classes.dialog }}
        open={isConfirmationDialogOpen}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <VerifyForm
            onSkip={handleSkip}
            onSubmit={handleVerify}
            checksum={hashDriveChecksum}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        classes={{ paper: classes.dialog }}
        open={isSkippedDialogOpen}
      >
        <DialogTitle>{skipTitle}</DialogTitle>
        <DialogContent>
          <Typography>
            {skipMessage}
          </Typography>
          <br />
          <Typography>
            {skipInfo}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsSkippedDialogOpen(false)}
            color="primary"
          >
            {ok}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DriveForm;
