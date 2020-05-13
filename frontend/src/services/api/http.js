import store from '../../store';
import { AUTH_HEADER } from '../../store/modules/session';

export const apiUrl = process.env.VUE_APP_API_URL;
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

function setAuthData(requestOptions, auth) {
  if (auth) {
    const authHeader = store.getters[`session/${AUTH_HEADER}`];
    const headers = { ...requestOptions.headers, ...authHeader };
    return { ...requestOptions, headers };
  }
  return { ...requestOptions, credentials: 'omit' };
}

export function get(url, auth = true) {
  let requestOptions = {
    headers: {
      Accept: CONTENT_TYPE_JSON,
    },
  };
  requestOptions = setAuthData(requestOptions, auth);
  return fetch(`${apiUrl}${url}`, requestOptions).then(handleResponse);
}

export function post(url, payload, auth = true) {
  let requestOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
    mode: 'cors',
  };
  requestOptions = setAuthData(requestOptions, auth);
  return fetch(`${apiUrl}${url}`, requestOptions).then(handleResponse);
}

export function patch(url, payload, auth = true) {
  let requestOptions = {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': CONTENT_TYPE_JSON,
    },
    mode: 'cors',
  };
  requestOptions = setAuthData(requestOptions, auth);
  return fetch(`${apiUrl}${url}`, requestOptions).then(handleResponse);
}
