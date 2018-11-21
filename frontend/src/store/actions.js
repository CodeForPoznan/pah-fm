import { login, saveToken, deleteToken } from '../services/api/auth';
import { getMyself } from '../services/api/user';
import { getCars } from '../services/api/cars';

import * as mutations from './mutations';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_CARS = 'FETCH_CARS';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SUBMIT = 'SUBMIT';

export const actions = {
  [FETCH_USER]({ commit }) {
    getMyself().then((user) => {
      commit(mutations.SET_USER, user);
    });
  },
  [FETCH_CARS]({ commit }) {
    commit(mutations.SET_FETCHING_CARS_PROGRESS, true);
    commit(mutations.SET_FETCHING_CARS_ERROR, null);
    getCars()
      .then((cars) => {
        commit(mutations.SET_CARS, cars);
      })
      .catch(() => {
        commit(mutations.SET_FETCHING_CARS_ERROR, 'Fetching cars unsuccessful');
      })
      .finally(() => {
        commit(mutations.SET_FETCHING_CARS_PROGRESS, false);
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
  [SUBMIT]({ commit }, { form }) {
    commit(mutations.ADD_ROUTE, form);
  },
};
