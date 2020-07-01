import {
  LOADING,
  DATA,
  ERRORS,
  FETCH,
  SAVE,
  SET_DATA,
  SET_ERRORS,
} from './constants';
import { GET } from './modules/http/actions';
import i18n from '../services/lang';

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
    [FETCH](state) {
      state[LOADING] = true;
      state[ERRORS] = null;
    },
    [SET_DATA](state, data) {
      state[LOADING] = false;
      state[DATA] = data;
      state[ERRORS] = null;
    },
    [SET_ERRORS](state, errors) {
      state[LOADING] = false;
      state[ERRORS] = errors;
    },
    [SAVE](state) {
      state[LOADING] = true;
      state[ERRORS] = null;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: moduleActions,
});

const makeFetchData = url => ({ dispatch, commit }) => {
  dispatch(`http/${GET}`, { url }, { root: true })
    .then((data) => {
      commit(SET_DATA, data);
    })
    .catch(() => {
      commit(SET_ERRORS, i18n.tc('common.error'));
    });
};

const makeDomainItem = id => ({ id });

const mapDrive = drive => ({
  ...drive,
  car: makeDomainItem(drive.car),
  project: makeDomainItem(drive.project),
  passengers: drive.passengers.map(makeDomainItem),
});

export { mapDrive, makeDomainItem, makeModule, makeFetchData };
