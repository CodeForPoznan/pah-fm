const requiredFields = [
  'date',
  'car',
  'project',
  'startMileage',
  'endMileage',
  'startLocation',
  'endLocation',
];

const stringFields = requiredFields;

const isErroring = route => key =>
  requiredFields.includes(key) && !route[key].trim();

const splitCamelCase = label => label.replace(/([A-Z])/g, ' $1');

const makeErrorMessage = t => field =>
  t('drives.validation_error', { field: splitCamelCase(field) });

const makeErrors = t => (acc, field) => ({
  ...acc,
  [field]: makeErrorMessage(t)(field),
});

export { isErroring, makeErrorMessage, makeErrors, stringFields };
