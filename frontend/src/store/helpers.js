import { LOADING, DATA, ERRORS } from './constants';


const defaultState = {
  [LOADING]: false,
  [DATA]: null,
  [ERRORS]: null,
};

const makeModule = moduleActions => ({
  namespaced: true,
  state: { ...defaultState },
  mutations: {
    /* eslint-disable no-param-reassign */
    fetch(state) {
      state[LOADING] = true;
      state[ERRORS] = null;
    },
    setData(state, data) {
      state[LOADING] = false;
      state[DATA] = data;
      state[ERRORS] = null;
    },
    setErrors(state, errors) {
      state[LOADING] = false;
      state[ERRORS] = errors;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: moduleActions,
});

export {
  makeModule,
};
