import { SYNC_ITEM_SUCCESS, VERIFICATION_TOKEN } from './constants';

export const SET_USER = 'SET_USER';
export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const ADD_ROUTE = 'ADD_ROUTE';
export const SET_UPDATE_READY = 'SET_UPDATE_READY';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const SET_LANG = 'SET_LANG';
export const SET_VERIFICATION_TOKEN_ACTIVE = 'SET_VERIFICATION_TOKEN_ACTIVE';
export const SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS = 'SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS';

export const mutations = {
  [SYNC_ITEM_SUCCESS](state, syncId) {
    Object.assign(state, {
      routes: state.routes.filter(route => route.syncId !== syncId),
    });
  },
  [SET_USER](state, user) {
    Object.assign(state, { user });
  },
  [SET_LOGIN_PROGRESS](state, loginInProgress) {
    Object.assign(state, { loginInProgress });
  },
  [SET_LOGIN_ERROR](state, loginError) {
    Object.assign(state, { loginError });
  },
  [ADD_ROUTE](state, route) {
    Object.assign(state, { routes: [...state.routes, Object.assign({}, route)] });
  },
  [SET_UPDATE_READY](state, isReady) {
    Object.assign(state, { updateReady: isReady });
  },
  [SET_IS_CONNECTED](state, isOnline) {
    Object.assign(state, { isOnline });
  },
  [SET_LANG](state, language) {
    Object.assign(state, { language });
  },
  [SET_VERIFICATION_TOKEN_ACTIVE](state, { token, isActive }) {
    Object.assign(state, {
      [VERIFICATION_TOKEN]: { token, isActive },
    });
  },
  [SET_VERIFICATION_TOKEN_SUBMISSION_PROGRESS](state, inProgress) {
    Object.assign(state[VERIFICATION_TOKEN], { inProgress });
  },
};
