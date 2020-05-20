import jwtDecode from 'jwt-decode';

const apiUrl = process.env.VUE_APP_API_URL;
const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';
const baseRequestOptions = {
  headers: {
    Accept: CONTENT_TYPE_JSON,
  },
};

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

export const TOKEN = 'TOKEN';

const moduleState = {
  [TOKEN]: null,
};


export const AUTH_HEADER = 'AUTH_HEADER';
export const AUTH_DATA = 'AUTH_DATA';
export const IS_USER_LOGGED_IN = 'IS_USER_LOGGED_IN';

const moduleGetters = {
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
export const GET = 'GET';
export const POST = 'POST';

const actions = {
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
    const requestOptions = getters[AUTH_DATA]({ requestOptions: baseRequestOptions, auth });
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


export default {
  namespaced: true,
  state: moduleState,
  mutations,
  actions,
  getters: moduleGetters,
};
