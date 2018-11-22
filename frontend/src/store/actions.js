import { login, saveToken, deleteToken } from '../services/auth';
import { getMyself } from '../services/api/user';
import { getRoutes } from '../services/api/routes';

import * as mutations from './mutations';

const makeFetch = name => `FETCH_${name.toUpperCase()}`;

export const USER = 'user';

export const FETCH_USER = makeFetch(USER);
export const FETCH_ROUTES = makeFetch('cars');

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SUBMIT = 'SUBMIT';


const makeAction = (action, actionName) => ({ commit }) => {
  const f = action();
  if (f) {
    f.then(data => commit(mutations[actionName], data));
  }
};

export const actions = {
  [FETCH_USER]: makeAction(getMyself, 'SET_USER'),
  [FETCH_ROUTES]: makeAction(getRoutes, 'SET_ROUTES'),
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
  [LOGOUT]() {
    deleteToken();
  },
  [SUBMIT]({ commit }, { form }) {
    commit(mutations.ADD_ROUTE, form);
  },
};
