import { USER, ROUTES } from './constants';

import {
  makeSetData,
  makeSetError,
  makeSetLoading,
  makeSetActionName,
  makeErrorActionName,
  makeLoadingActionName,
} from './helpers';

export const SET_USER = makeSetActionName(USER);
export const SET_USER_ERROR = makeErrorActionName(USER);
export const SET_USER_LOADING = makeLoadingActionName(USER);
export const SET_ROUTES = makeSetActionName(ROUTES);

export const ADD_ROUTE = 'ADD_ROUTE';
export const SET_UPDATE_READY = 'SET_UPDATE_READY';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING';

export const mutations = {
  [SET_USER]: makeSetData(USER),
  [SET_USER_ERROR]: makeSetError(USER),
  [SET_USER_LOADING]: makeSetLoading(USER),
  [SET_ROUTES]: makeSetData(ROUTES),
  [ADD_ROUTE](state, route) {
    Object.assign(state, { routes: [...state.routes, Object.assign({}, route)] });
  },
  [SET_UPDATE_READY](state, isReady) {
    Object.assign(state, { updateReady: isReady });
  },
  [SET_IS_CONNECTED](state, isOnline) {
    Object.assign(state, { isOnline });
  },
  [SET_LOGIN_LOADING](state, loginInProgress) {
    Object.assign(state, { loginInProgress });
  },
  [SET_LOGIN_ERROR](state, loginError) {
    Object.assign(state, { loginError });
  },
};
