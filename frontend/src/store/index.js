import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { actions } from './actions';
import { VERIFICATION_TOKEN } from './constants';
import { mutations, SET_IS_CONNECTED } from './mutations';
import { modules } from './modules';

export const USER = 'user';
const ROUTES = 'routes';
export const CARS = 'cars';
export const LANGUAGE = 'language';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export const IS_ONLINE = 'isOnline';

const state = {
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
  state,
  actions,
  modules,
  mutations,
  plugins: [createPersistedState({
    paths: [USER, ROUTES, CARS, LANGUAGE],
  })],
});

window.addEventListener('online', () => store.commit(SET_IS_CONNECTED, true));
window.addEventListener('offline', () => store.commit(SET_IS_CONNECTED, false));

export default store;
