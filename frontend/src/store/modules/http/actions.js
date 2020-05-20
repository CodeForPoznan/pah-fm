import jwtDecode from 'jwt-decode';

import { TOKEN } from './state';
import { SET_TOKEN } from './mutations';
import { AUTH_DATA } from './getters';

const apiUrl = process.env.VUE_APP_API_URL;
const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';

async function handleResponse(response) {
  try {
    const message = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return message;
    }
    // eslint-disable-next-line
    return Promise.reject({ message, response });
  } catch (err) {
    // eslint-disable-next-line
    return Promise.reject({ err, response });
  }
}

export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const GET = 'GET';
export const POST = 'POST';

export default {
  /**
     * @arg {Object} credentials
     * @arg {string} credentials.username
     * @arg {string} credentials.password
     */
  [LOGIN]: async ({ dispatch, commit }, credentials) => {
    const { token } = await dispatch(POST, { url: 'api-token-auth/', payload: credentials, auth: false });
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
  [GET]: ({ getters }, { url, auth = true }) => {
    let requestOptions = {
        headers: {
            Accept: CONTENT_TYPE_JSON
        }
    }
    requestOptions = getters[AUTH_DATA]({ requestOptions, auth });
    return fetch(`${apiUrl}${url}`, requestOptions).then(handleResponse);
  },
  [POST]: ({ getters }, { url, payload, auth = true }) => {
    let requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      mode: 'cors',
      headers: {
        'Content-Type': CONTENT_TYPE_JSON,
      },
    };
    requestOptions = getters[AUTH_DATA]({ requestOptions, auth });
    return fetch(`${apiUrl}${url}`, requestOptions).then(handleResponse);
  },
};
