const requiredFields = [
  'date', 'car', 'description', 'from', 'destination', 'startMileage', 'endMileage',
];

const isErroring = route => key => requiredFields.includes(key) && !route[key];

const makeErrorMessage = t => field => t('routes.validation_error', { field });

export {
  isErroring,
  makeErrorMessage,
};

