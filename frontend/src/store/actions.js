import { login, saveToken } from '../services/api/auth';
import { getMyself } from '../services/api/user';

import * as mutations from './mutations';


export const FETCH_USER = 'FETCH_USER';
export const LOGIN = 'LOGIN';

export const actions = {
  [FETCH_USER]({ commit }) {
    getMyself().then((user) => {
      commit(mutations.SET_USER, { user });
    });
  },
  [LOGIN]({ commit, dispatch }, { username, password }) {
    commit(mutations.SET_LOGIN_PROGRESS, true);
    login(username, password)
      .then((token) => {
        saveToken(token);
        dispatch(FETCH_USER);
      })
      .catch(e => console.log(e))
      .finally(() => {
        commit(mutations.SET_LOGIN_PROGRESS, false);
      });
  },
};
