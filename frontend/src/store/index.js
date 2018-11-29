import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { actions } from './actions';
import { mutations, SET_IS_CONNECTED } from './mutations';
import { makeModule } from './helpers';

const USER = 'user';
const ROUTES = 'routes';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export const IS_ONLINE = 'isOnline';

const namespaces = {
  cars: 'cars',
};

const state = {
  [USER]: null,
  [ROUTES]: [],
  [IS_ONLINE]: navigator.onLine,
  loginInProgress: false,
  loginError: null,
  updateReady: false,
};

const store = new Vuex.Store({
  strict: debug,
  state,
  actions,
  modules: {
    [namespaces.cars]: makeModule({
      async getCars({ commit }) {
        commit('fetch');
      },
    }),
  },
  mutations,
  plugins: [createPersistedState({
    paths: [USER, ROUTES],
  })],
});

window.addEventListener('online', () => store.commit(SET_IS_CONNECTED, true));
window.addEventListener('offline', () => store.commit(SET_IS_CONNECTED, false));

export default store;
