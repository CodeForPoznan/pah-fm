import { post } from '../services/api/http';
import { login, saveToken, deleteStorageData } from '../services/api/auth';
import { getMyself } from '../services/api/user';
import * as mutations from './mutations';
import { mapDrive } from './helpers';
import { i18n } from '../main';
import {
  actions as apiActions,
  namespaces,
  SYNC,
  SYNC_ITEM_SUCCESS,
  SYNC_ITEM_FAILURE,
  UNSYNCHRONISED_DRIVES,
} from './constants';

export const FETCH_USER = 'FETCH_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SUBMIT = 'SUBMIT';
export const SET_HASH = 'SET_HASH';
export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

export const actions = {
  [FETCH_USER]({ dispatch, commit }, { callback } = {}) {
    getMyself().then((user) => {
      commit(mutations.SET_USER, user);
      dispatch(`${namespaces.passengers}/${apiActions.fetchPassengers}`);
      dispatch(`${namespaces.cars}/${apiActions.fetchCars}`);
      dispatch(`${namespaces.drives}/${apiActions.fetchDrives}`);
      dispatch(`${namespaces.projects}/${apiActions.fetchProjects}`);
      if (callback) {
        callback();
      }
    });
  },

  [LOGIN]({ commit, dispatch }, { username, password }) {
    commit(mutations.SET_LOGIN_PROGRESS, true);
    login(username, password)
      .then((token) => {
        commit(mutations.SET_LOGIN_ERROR, null);
        saveToken(token);
        dispatch(FETCH_USER, {
          callback: () => window.location.replace('/drive'),
        });
      })
      .catch(() => {
        commit(mutations.SET_LOGIN_ERROR, i18n.tc('login.login_error'));
      })
      .finally(() => {
        commit(mutations.SET_LOGIN_PROGRESS, false);
      });
  },

  [LOGOUT]({ commit }) {
    commit(mutations.SET_USER, null);
    deleteStorageData();
  },

  [SUBMIT]({ commit, dispatch }, { form }) {
    commit(mutations.ADD_DRIVE, form);
    dispatch(SYNC);
  },

  [SET_HASH]({ commit }, hash) {
    commit(mutations.SET_HASH, hash);
  },

  [SWITCH_LANGUAGE]({ commit }, language) {
    commit(mutations.SET_LANG, language);
    i18n.locale = language;
  },

  async [SYNC]({ dispatch, state, commit }) {
    if (state[UNSYNCHRONISED_DRIVES].length === 0 && state.user) {
      dispatch(`${namespaces.drives}/${apiActions.fetchDrives}`);
      return;
    }

    if (
      state[UNSYNCHRONISED_DRIVES].length === 0 ||
      !state.user ||
      !navigator.onLine
    ) {
      return;
    }

    const mappedDrive = mapDrive(state[UNSYNCHRONISED_DRIVES][0]);
    const { timestamp } = mappedDrive;

    try {
      await post('drives', mappedDrive);
      commit(SYNC_ITEM_SUCCESS, timestamp);
      dispatch(SYNC);
    } catch (e) {
      if (e.response && e.response.status === 409) {
        // was synced previously
        commit(SYNC_ITEM_SUCCESS, timestamp);
      } else if (e.response && [400, 403, 500].includes(e.response.status)) {
        commit(SYNC_ITEM_FAILURE, timestamp);
        dispatch(SYNC);
      } else {
        setTimeout(() => dispatch(SYNC), 60000);
      }
    }
  },
};
