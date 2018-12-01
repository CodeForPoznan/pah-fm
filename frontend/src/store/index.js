import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { actions } from './actions';
import { mutations, SET_IS_CONNECTED } from './mutations';
import { modules } from './modules';

const USER = 'user';
const ROUTES = 'routes';
export const CARS = 'cars';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export const IS_ONLINE = 'isOnline';

const state = {
  [USER]: null,
  [ROUTES]: [],
  [CARS]: {
    loading: false,
    data: [],
    error: null,
  },
  [IS_ONLINE]: navigator.onLine,
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
    paths: [USER, ROUTES, CARS],
  })],
});

window.addEventListener('online', () => store.commit(SET_IS_CONNECTED, true));
window.addEventListener('offline', () => store.commit(SET_IS_CONNECTED, false));

export default store;
