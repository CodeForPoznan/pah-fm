import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { actions } from './actions';
import { VERIFICATION_TOKEN, SYNC, namespaces, IS_ONLINE } from './constants';
import { mutations, SET_IS_CONNECTED } from './mutations';
import { modules } from './modules';

export const USER = 'user';
export const ROUTES = 'routes';
export const CARS = 'cars';
export const LANGUAGE = 'language';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const initialState = {
  [USER]: null,
  [ROUTES]: [],
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
  modules,
  mutations,
  plugins: [createPersistedState({
    paths: [USER, ROUTES, CARS, LANGUAGE, ...Object.values(namespaces)],
  })],
  getters: {
    [IS_ONLINE]: state => state.isOnline,
  },
});

window.addEventListener('online', () => {
  store.commit(SET_IS_CONNECTED, true);
  store.dispatch(SYNC);
});

window.addEventListener('offline', () => store.commit(SET_IS_CONNECTED, false));

export default store;
