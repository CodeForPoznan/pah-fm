import { login, saveToken, deleteToken } from '../services/auth';
import { getMyself } from '../services/api/user';
import { getRoutes } from '../services/api/routes';

import * as mutations from './mutations';

const makeFetch = name => `FETCH_${name.toUpperCase()}`;

export const FETCH_USER = makeFetch('user');
export const FETCH_ROUTES = makeFetch('cars');
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SUBMIT = 'SUBMIT';


export const actions = {
  [FETCH_USER]: ({ commit }) =>
    getMyself().then(data => commit(mutations.SET_USER, data)),
  [FETCH_ROUTES]: ({ commit }) =>
    getRoutes().then(data => commit(mutations.SET_ROUTES, data)),
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
    commit(mutations.SET_USER, makeDefaultState());
    deleteToken();
  },
  [SUBMIT]({ commit }, { form }) {
    commit(mutations.ADD_ROUTE, form);
  },
};
