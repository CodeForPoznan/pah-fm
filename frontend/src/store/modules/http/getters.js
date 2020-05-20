import { TOKEN } from './state';

export const AUTH_HEADER = 'AUTH_HEADER';
export const AUTH_DATA = 'AUTH_DATA';
export const IS_USER_LOGGED_IN = 'IS_USER_LOGGED_IN';

export default {
  [AUTH_DATA]: (state, getters) => ({ requestOptions, auth }) => {
    if (auth) {
      const authHeader = getters[AUTH_HEADER];
      const headers = { ...requestOptions.headers, ...authHeader };
      return { ...requestOptions, headers };
    }
    return { ...requestOptions, credentials: 'omit' };
  },
  [AUTH_HEADER]: state => (state[TOKEN] ? {
    Authorization: `JWT ${state[TOKEN]}` } : {}),
  [IS_USER_LOGGED_IN]: state => !!state[TOKEN],
};
