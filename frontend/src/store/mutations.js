import { setItem } from '../services/localStore';
import { UNSYNCED_ROUTES } from '../services/constants';

export const SET_USER = 'SET_USER';
export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const ADD_ROUTE = 'ADD_ROUTE';
export const SET_UPDATE_READY = 'SET_UPDATE_READY';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';

export const mutations = {
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
    setItem(UNSYNCED_ROUTES, [...state.routes]);
  },
  [SET_UPDATE_READY](state, isReady) {
    Object.assign(state, { updateReady: isReady });
  },
  [SET_IS_CONNECTED](state, isOnline) {
    Object.assign(state, { isOnline });
  },
};
