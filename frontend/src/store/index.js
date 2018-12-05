import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { actions } from './actions';
import { mutations, SET_IS_CONNECTED } from './mutations';

const USER = 'user';
const ROUTES = 'routes';
export const CARS = 'cars';
export const LANGUAGE = 'language';

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
  [LANGUAGE]: null,
  [IS_ONLINE]: navigator.onLine,
  loginInProgress: false,
  loginError: null,
  updateReady: false,
};

export const store = new Vuex.Store({
  strict: debug,
  state,
  actions,
  mutations,
  plugins: [createPersistedState({
    paths: [USER, ROUTES, CARS, LANGUAGE],
  })],
});

window.addEventListener('online', () => store.commit(SET_IS_CONNECTED, true));
window.addEventListener('offline', () => store.commit(SET_IS_CONNECTED, false));

