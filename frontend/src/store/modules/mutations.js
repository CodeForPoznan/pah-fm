export const SET_USER = 'SET_USER';

export const mutations = {
  [SET_USER](state, { user }) {
    Object.assign(state, { user });
  },
};
