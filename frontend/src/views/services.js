const requiredFields = [
  'date',
  'car',
  'description',
  'from',
  'destination',
  'startMileage',
  'endMileage',
];

const isErroring = route => key => requiredFields.includes(key) && !route[key];

const splitField = fieldName => fieldName.replace(/([A-Z])/g, ' $1');

const makeErrorMessage = t => field =>
  t('routes.validation_error', { field: splitField(field) });

const reduceFields = t => (acc, field) => ({
  ...acc,
  [field]: makeErrorMessage(t)(field),
});

export { isErroring, makeErrorMessage, reduceFields };
