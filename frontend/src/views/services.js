const requiredFields = [
  'date', 'desciption', 'from', 'destination', 'startMileage', 'endMileage',
];

const isErroring = route => key => requiredFields.includes(key) && !route[key];

const makeErrorMessage = key => `${key} is required`;

export {
  isErroring,
  makeErrorMessage,
};

