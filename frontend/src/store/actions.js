import { login, saveToken, deleteToken } from '../services/auth';
import { getMyself } from '../services/api/user';
import { getRoutes } from '../services/api/routes';
import { makeAction, makeFetch } from './helpers';
import { USER, CARS, LOGIN, LOGOUT, SUBMIT } from './constants';
import {
  SET_USER,
  SET_ROUTES,
  SET_LOGIN_LOADING,
  SET_LOGIN_ERROR,
  ADD_ROUTE,
} from './mutations';

export const FETCH_USER = makeFetch(USER);
export const FETCH_ROUTES = makeFetch(CARS);


export const actions = {
  [FETCH_USER]: makeAction(getMyself, SET_USER),
  [FETCH_ROUTES]: makeAction(getRoutes, SET_ROUTES),
  [LOGIN]({ commit, dispatch }, { username, password }) {
    commit(SET_LOGIN_LOADING, true);
    login(username, password)
      .then((token) => {
        commit(SET_LOGIN_ERROR, null);
        saveToken(token);
        dispatch(FETCH_USER);
        dispatch(FETCH_ROUTES);
      })
      .catch(() => {
        commit(SET_LOGIN_ERROR, 'Login unsuccessful');
      })
      .finally(() => {
        // commit(SET_LOGIN_PROGRESS, false);
      });
  },
  [LOGOUT]({ commit }) {
    commit(SET_USER, null);
    deleteToken();
  },
  [SUBMIT]({ commit }, { form }) {
    commit(ADD_ROUTE, form);
  },
};
