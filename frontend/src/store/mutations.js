import { USER, ROUTES } from './constants';
import { makeMutation } from './helpers';

const makeSetAction = name => `SET_${name}`;

export const SET_USER = makeSetAction(USER);
export const SET_ROUTES = makeSetAction(ROUTES);

export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const ADD_ROUTE = 'ADD_ROUTE';
export const SET_UPDATE_READY = 'SET_UPDATE_READY';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';

export const mutations = {
  [SET_USER](state, user) {
    Object.assign(state, { user });
  },
  [SET_ROUTES]: makeMutation(ROUTES),
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
};
