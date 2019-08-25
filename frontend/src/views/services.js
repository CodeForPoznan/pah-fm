import { FORM_STATE } from '../constants/form';
import { getItem } from '../services/localStore';

export const requiredFields = [
  'date',
  'car',
  'project',
  'startMileage',
  'endMileage',
  'startLocation',
  'endLocation',
  'passenger',
];

export const stringFields = requiredFields;

export const isErroring = route => key =>
  requiredFields.includes(key) && !route[key].trim();

export const splitCamelCase = label => label.replace(/([A-Z])/g, ' $1');

export const makeErrorMessage = t => field =>
  t('drive_form.validation_error', { field: splitCamelCase(field) });

export const makeErrors = t => (acc, field) => ({
  ...acc,
  [field]: makeErrorMessage(t)(field),
});

export const makeDefaultFormState = () => ({
  date: new Date().toISOString().slice(0, 10),
  car: '',
  description: '',
  startMileage: '',
  endMileage: '',
  project: '',
  passenger: '',
  startLocation: '',
  endLocation: '',
});


export const makeFormState = () => getItem(FORM_STATE) || makeDefaultFormState();
