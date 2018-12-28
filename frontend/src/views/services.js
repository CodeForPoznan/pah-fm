const requiredFields = [
  'date',
  'car',
  'description',
  'start_mileage',
  'end_mileage',
  'start_location',
  'end_location',
];

const stringFields = requiredFields;

const isErroring = route => key =>
  requiredFields.includes(key) && !route[key].trim();

const splitSnakeCase = label => label.split('_').join(' ');

const makeErrorMessage = t => field =>
  t('routes.validation_error', { field: splitSnakeCase(field) });

const makeErrors = t => (acc, field) => ({
  ...acc,
  [field]: makeErrorMessage(t)(field),
});

export { isErroring, makeErrorMessage, makeErrors, stringFields };
