export const SET_USER = 'SET_USER';
export const SET_LOGIN_PROGRESS = 'SET_LOGIN_PROGRESS';

export const mutations = {
  [SET_USER](state, { user }) {
    Object.assign(state, { user });
    console.log(state);
  },
  [SET_LOGIN_PROGRESS](state, loginInProgress) {
    Object.assign(state, { loginInProgress });
  },
};
