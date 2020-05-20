import { TOKEN } from './state';

export const AUTH_DATA = 'AUTH_DATA';
export const IS_USER_LOGGED_IN = 'IS_USER_LOGGED_IN';

export default {
  [AUTH_DATA]: state => ({ requestOptions, auth = true }) => {
    if (auth) {
      if (state[TOKEN]) {
        const authHeader = { Authorization: `JWT ${state[TOKEN]}` };
        const headers = requestOptions.headers ?
          { ...requestOptions.headers, ...authHeader } : authHeader;
        return { ...requestOptions, headers };
      }
      return requestOptions;
    }
    return { ...requestOptions, credentials: 'omit' };
  },
  [IS_USER_LOGGED_IN]: state => !!state[TOKEN],
};
