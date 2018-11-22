import { DATA, LOADING, ERRORS } from './constants';

const makeMutation = name => (state, data) =>
  Object.assign(
    state,
    {
      [name]: {
        [LOADING]: false,
        [DATA]: data,
        [ERRORS]: [],
      },
    },
  );


const makeDefaultState = () => ({
  [DATA]: null,
  [LOADING]: false,
  [ERRORS]: [],
});

export { makeDefaultState, makeMutation };

