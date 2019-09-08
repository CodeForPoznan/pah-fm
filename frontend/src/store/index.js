import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { actions } from './actions';
import { VERIFICATION_TOKEN, SYNC, namespaces, IS_ONLINE, INCORRECT_DRIVE_ENTRIES,
  UNSYNCHRONISED_DRIVES, UNSYNCHRONISED_DRIVES_TOTAL_MILEAGE } from './constants';
import { mutations, SET_IS_CONNECTED } from './mutations';
import { modules } from './modules';
import { totalMileageReducer, totalMileageFilter } from '../utils';

export const USER = 'user';
export const CARS = 'cars';
export const LANGUAGE = 'language';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const initialState = {
  [USER]: null,
  [INCORRECT_DRIVE_ENTRIES]: [],
  [UNSYNCHRONISED_DRIVES]: [],
  [LANGUAGE]: null,
  [IS_ONLINE]: navigator.onLine,
  [VERIFICATION_TOKEN]: null,
  loginInProgress: false,
  logoutInProgress: false,
  loginError: null,
  updateReady: false,
};

const store = new Vuex.Store({
  strict: debug,
  state: initialState,
  actions,
  modules,
  mutations,
  plugins: [createPersistedState({
    paths: [USER, INCORRECT_DRIVE_ENTRIES, UNSYNCHRONISED_DRIVES, CARS,
      LANGUAGE, ...Object.values(namespaces)],
  })],
  getters: {
    [IS_ONLINE]: state => state.isOnline,
    [UNSYNCHRONISED_DRIVES]: state => state.unsyncedDrives,
    [UNSYNCHRONISED_DRIVES_TOTAL_MILEAGE]: state => state.unsyncedDrives
      .filter(totalMileageFilter)
      .reduce(
        totalMileageReducer,
        0,
      ),
  },
});

window.addEventListener('online', () => {
  store.commit(SET_IS_CONNECTED, true);
  store.dispatch(SYNC);
});

window.addEventListener('offline', () => store.commit(SET_IS_CONNECTED, false));

export default store;
