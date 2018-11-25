import { DATA, LOADING, ERRORS } from './constants';

const makeDefaultState = () => ({
  [DATA]: null,
  [LOADING]: false,
  [ERRORS]: [],
});

const makeAction = (action, actionName) => ({ commit }) => {
  const f = action();
  if (f) {
    f.then(data => commit(actionName, data));
  }
};

const makeFetch = name => `FETCH_${name.toUpperCase()}`;

const makeSetData = name => (state, data) =>
  Object.assign(
    state,
    {
      [name]: {
        [LOADING]: false,
        [DATA]: data,
        [ERRORS]: null,
      },
    },
  );

const makeSetError = name => (state, errors) =>
  Object.assign(
    state,
    {
      [name]: {
        [LOADING]: false,
        [DATA]: state[name][DATA],
        [ERRORS]: errors,
      },
    },
  );

const makeSetLoading = name => (state, isLoading) =>
  Object.assign(
    state,
    {
      [name]: {
        [LOADING]: isLoading,
        [DATA]: state[name][DATA],
        [ERRORS]: null,
      },
    },
  );


const makeSetActionName = name => `SET_${name.toUpperCase()}`;
const makeErrorActionName = name => `SET_ERROR_${name.toUpperCase()}`;
const makeLoadingActionName = name => `SET_LOADING_${name.toUpperCase()}`;

export {
  makeDefaultState,
  makeAction,
  makeFetch,
  makeSetData,
  makeSetError,
  makeSetLoading,
  makeSetActionName,
  makeErrorActionName,
  makeLoadingActionName,
};

