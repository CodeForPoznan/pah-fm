import { login, saveToken, deleteToken } from '../services/auth';
import { getMyself } from '../services/api/user';
import { getRoutes } from '../services/api/routes';
import { makeAction as makeActionPartial, makeFetch } from './helpers';
import { USER, CARS } from './constants';

import * as mutations from './mutations';

const makeAction = makeActionPartial(mutations);

export const FETCH_USER = makeFetch(USER);
export const FETCH_ROUTES = makeFetch(CARS);

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SUBMIT = 'SUBMIT';

export const actions = {
  [FETCH_USER]: makeAction(getMyself, mutations.SET_USER),
  [FETCH_ROUTES]: makeAction(getRoutes, mutations.SET_ROUTES),
  [LOGIN]({ commit, dispatch }, { username, password }) {
    commit(mutations[mutations.SET_LOGIN_LOADING], true);
    login(username, password)
      .then((token) => {
        commit(mutations.SET_LOGIN_ERROR, null);
        saveToken(token);
        dispatch(FETCH_USER);
        dispatch(FETCH_ROUTES);
      })
      .catch(() => {
        // commit(mutations.SET_LOGIN_ERROR, 'Login unsuccessful');
      })
      .finally(() => {
        // commit(mutations.SET_LOGIN_PROGRESS, false);
      });
  },
  [LOGOUT]({ commit }) {
    commit(mutations.SET_USER, null);
    deleteToken();
  },
  [SUBMIT]({ commit }, { form }) {
    commit(mutations.ADD_ROUTE, form);
  },
};
