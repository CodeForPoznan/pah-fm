import { FORM_STATE } from '../constants/form';
import { getItem } from '../services/localStore';
import { getToday } from '../services/time';

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
  date: getToday(),
  car: '',
  description: '',
  startMileage: '',
  endMileage: '',
  project: '',
  passenger: '',
  startLocation: '',
  endLocation: '',
});

const makeStoredFormState = () => {
  const storageState = getItem(FORM_STATE);
  if (storageState && !storageState.date) {
    return {
      ...storageState,
      date: getToday(),
    };
  }
  return storageState;
};

export const makeFormState = () => makeStoredFormState() || makeDefaultFormState();
