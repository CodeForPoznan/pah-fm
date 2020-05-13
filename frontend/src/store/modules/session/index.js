import jwtDecode from 'jwt-decode';

import { post } from '../../../services/api/http';

export const TOKEN = 'TOKEN';

const moduleState = {
  [TOKEN]: null,
};

export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_SESSION = 'CLEAR_SESSION';

const mutations = {
  [SET_TOKEN]: (state, token) => {
    Object.assign(state, { [TOKEN]: token });
  },
  [CLEAR_SESSION]: (state) => {
    Object.assign(state, { [TOKEN]: null });
  },
};

export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';

const actions = {
  /**
     * @arg {Object} credentials
     * @arg {string} credentials.username
     * @arg {string} credentials.password
     */
  [LOGIN]: async ({ commit }, credentials) => {
    const { token } = await post('api-token-auth/', credentials, false);
    commit(SET_TOKEN, token);
  },
  [GET_TOKEN]: ({ state, commit }) => {
    if (state[TOKEN]) {
      const now = Math.floor(Date.now() / 1000);
      const decodedToken = jwtDecode(state[TOKEN]);
      if (decodedToken.exp < now) {
        console.debug('Expired token.');
        commit(SET_TOKEN, null);
        return null;
      }
    }
    return state[TOKEN];
  },

};

export const AUTH_HEADER = 'AUTH_HEADER';
export const IS_USER_LOGGED_IN = 'IS_USER_LOGGED_IN';

const getters = {
  [AUTH_HEADER]: state => (state[TOKEN] ? {
    Authorization: `JWT ${state[TOKEN]}` } : {}),
  [IS_USER_LOGGED_IN]: state => !!state[TOKEN],
};

export default {
  namespaced: true,
  state: moduleState,
  mutations,
  actions,
  getters,
};
