import { getAuthHeader } from './auth';

const CONTENT_TYPE_JSON = 'application/json; charset=utf-8';

function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  const error = new Error(response.statusText || response.status);
  error.response = response;

  return Promise.reject(error);
}

function setAuthData(requestOptions, auth) {
  if (auth) {
    const authHeader = getAuthHeader();
    const headers = Object.assign({}, requestOptions.headers, authHeader);
    return Object.assign({}, requestOptions, { headers });
  }
  return Object.assign({}, requestOptions, { credentials: 'omit' });
}

export const apiUrl = '/api/';

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
