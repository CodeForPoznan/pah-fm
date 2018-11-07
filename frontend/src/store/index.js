import Vue from 'vue';
import Vuex from 'vuex';

import { rehydrateUser } from './utils';
import { actions } from './actions';
import { mutations } from './mutations';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const state = {
  user: rehydrateUser(),
  loginInProgress: false,
  loginError: null,
};

export default new Vuex.Store({
  strict: debug,
  state,
  actions,
  mutations,
});
