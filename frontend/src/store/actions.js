import { get, patch, post } from '../services/api/http';
import { login, saveToken, deleteToken } from '../services/api/auth';
import { getMyself } from '../services/api/user';
import * as mutations from './mutations';
import { mapDrive } from './helpers';
import { i18n } from '../main';
import { actions as apiActions, namespaces, SYNC, SYNC_ITEM_SUCCESS, SYNC_ITEM_FAILURE,
  UNSYNCHRONISED_DRIVES } from './constants';

export const FETCH_USER = 'FETCH_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SUBMIT = 'SUBMIT';
export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';
export const VERIFY_CONFIRMATION_TOKEN = 'VERIFY_CONFIRMATION_TOKEN';
export const SUBMIT_CONFIRMATION_TOKEN = 'SUBMIT_CONFIRMATION_TOKEN';

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
        dispatch(FETCH_USER, { callback: () => window.location.replace('/drive') });
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
    deleteToken();
    window.location.replace(login.path);
  },

  [SUBMIT]({ commit, dispatch }, { form }) {
    commit(mutations.ADD_DRIVE, form);
    dispatch(SYNC);
  },

  [SWITCH_LANGUAGE]({ commit }, language) {
    commit(mutations.SET_LANG, language);
    i18n.locale = language;
  },

  [VERIFY_CONFIRMATION_TOKEN]({ commit }, token) {
    get(`verification-token/${token}`)
      .catch((err) => {
        commit(mutations.SET_VERIFICATION_TOKEN_ACTIVE, { token, isActive: false });
        throw err;
      })
      .then(resp => resp.isActive)
      .then(isActive => commit(mutations.SET_VERIFICATION_TOKEN_ACTIVE, { token, isActive }))
      .catch(() => console.debug(`Token ${token} not found.`));
  },

  [SUBMIT_CONFIRMATION_TOKEN]({ commit }, { payload, token }) {
    return patch(`verification-token/${token}`, payload, false)
      .then(resp => resp.isActive)
      .then(isActive => commit(mutations.SET_VERIFICATION_TOKEN_ACTIVE, { token, isActive }))
      .then(() => commit(mutations.SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS, false));
  },

  async [SYNC]({ dispatch, state, commit }) {
    if (state[UNSYNCHRONISED_DRIVES].length === 0 && state.user) {
      dispatch(`${namespaces.drives}/${apiActions.fetchDrives}`);
      return;
    }

    if (state[UNSYNCHRONISED_DRIVES].length === 0 || !state.user || !navigator.onLine) {
      return;
    }

    const { syncId, ...mappedRoute } = mapDrive(state[UNSYNCHRONISED_DRIVES][0]);

    try {
      await post('drives', mappedRoute);
      commit(SYNC_ITEM_SUCCESS, syncId);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        commit(SYNC_ITEM_FAILURE, syncId);
      }
    }
    dispatch(SYNC);
  },
};
