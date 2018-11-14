import Vue from 'vue';
import Vuex from 'vuex';

import { rehydrateUser } from './utils';
import { actions } from './actions';
import { mutations, SET_IS_CONNECTED } from './mutations';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export const IS_ONLINE = 'isOnline';

const state = {
  user: rehydrateUser(),
  loginInProgress: false,
  loginError: null,
  updateReady: false,
  [IS_ONLINE]: navigator.onLine,
};

const store = new Vuex.Store({
  strict: debug,
  state,
  actions,
  mutations,
});

window.addEventListener('online', () => store.commit(SET_IS_CONNECTED, true));
window.addEventListener('offline', () => store.commit(SET_IS_CONNECTED, false));

export default store;
