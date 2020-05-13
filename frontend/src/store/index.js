import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { actions } from './actions';
import {
  VERIFICATION_TOKEN,
  SYNC,
  namespaces,
  IS_ONLINE,
  INCORRECT_DRIVE_ENTRIES,
  UNSYNCHRONISED_DRIVES,
  UNSYNCHRONISED_DRIVES_TOTAL_MILEAGE,
  GET_HASH,
} from './constants';
import { mutations, SET_IS_CONNECTED } from './mutations';
import { modules } from './modules';
import { totalMileageReducer, totalMileageFilter } from '../utils';

// NEW MODULES - see https://github.com/CodeForPoznan/pah-fm/issues/421
import data from './modules/data';
import session from './modules/session';

export const USER = 'user';
export const HASH = 'hash';
export const DRIVE_HASH = 'drive_hash';
export const DRIVE_FORM = 'drive_form';
export const CARS = 'cars';
export const LANGUAGE = 'language';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const initialState = {
  [USER]: null,
  [HASH]: null,
  [INCORRECT_DRIVE_ENTRIES]: [],
  [UNSYNCHRONISED_DRIVES]: [],
  [LANGUAGE]: null,
  [IS_ONLINE]: navigator.onLine,
  [VERIFICATION_TOKEN]: null,
  loginInProgress: false,
  loginError: null,
  updateReady: false,
};

const store = new Vuex.Store({
  strict: debug,
  state: initialState,
  actions,
  modules: {
    ...modules,
    data,
    session,
  },
  mutations,
  plugins: [
    createPersistedState({
      paths: [
        USER,
        INCORRECT_DRIVE_ENTRIES,
        UNSYNCHRONISED_DRIVES,
        CARS,
        LANGUAGE,
        ...Object.values(namespaces),
        'data',
        'session',
      ],
    }),
  ],
  getters: {
    [GET_HASH]: state => state.hash,
    [IS_ONLINE]: state => state.isOnline,
    [UNSYNCHRONISED_DRIVES]: state => state.unsyncedDrives,
    [UNSYNCHRONISED_DRIVES_TOTAL_MILEAGE]: state =>
      state.unsyncedDrives
        .filter(totalMileageFilter)
        .reduce(totalMileageReducer, 0),
  },
});

window.addEventListener('online', () => {
  store.commit(SET_IS_CONNECTED, true);
  store.dispatch(SYNC);
});

window.addEventListener('offline', () => store.commit(SET_IS_CONNECTED, false));

export default store;
