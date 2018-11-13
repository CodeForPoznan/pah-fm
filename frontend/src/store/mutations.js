export const SET_USER = 'SET_USER';
export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_UPDATE_READY = 'SET_UPDATE_READY';

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
  [SET_UPDATE_READY](state, isReady) {
    Object.assign(state, { updateReady: isReady });
  },
};
