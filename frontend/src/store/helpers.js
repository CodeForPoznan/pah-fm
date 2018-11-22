import { DATA, LOADING, ERRORS } from './constants';

const makeDefaultState = () => ({
  [DATA]: null,
  [LOADING]: false,
  [ERRORS]: [],
});

export { makeDefaultState };

