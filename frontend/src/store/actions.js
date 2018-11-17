import { login, saveToken, deleteToken } from '../services/api/auth';
import { getMyself } from '../services/api/user';
import { setItem } from '../services/localStore';
import { UNSYNCED_ROUTES } from '../services/constants';

import * as mutations from './mutations';

export const FETCH_USER = 'FETCH_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SUBMIT = 'SUBMIT';

export const actions = {
  [FETCH_USER]({ commit }) {
    getMyself().then((user) => {
      commit(mutations.SET_USER, user);
    });
  },
  [LOGIN]({ commit, dispatch }, { username, password }) {
    commit(mutations.SET_LOGIN_PROGRESS, true);
    login(username, password)
      .then((token) => {
        commit(mutations.SET_LOGIN_ERROR, null);
        saveToken(token);
        dispatch(FETCH_USER);
      })
      .catch(() => {
        commit(mutations.SET_LOGIN_ERROR, 'Login unsuccessful');
      })
      .finally(() => {
        commit(mutations.SET_LOGIN_PROGRESS, false);
      });
  },
  [LOGOUT]({ commit }) {
    commit(mutations.SET_USER, null);
    deleteToken();
  },
  [SUBMIT]({ commit }, { form, routes }) {
    commit(mutations.ADD_ROUTE, form);
    setItem(UNSYNCED_ROUTES, [...routes, form]);
  },
};
