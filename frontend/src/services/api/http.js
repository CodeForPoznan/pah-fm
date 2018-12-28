import { getAuthHeader } from './auth';

function handleResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  const error = new Error(response.statusText || response.status);
  error.response = response;

  return Promise.reject(error);
}

export const apiUrl = '/api/';

export function get(url, auth = true) {
  const requestOptions = {
    headers: {
      Accept: 'application/json; charset=utf-8',
    },
  };
  if (auth) {
    const authHeader = getAuthHeader();
    Object.assign(requestOptions.headers, authHeader);
  }
  return fetch(`${apiUrl}${url}`, requestOptions).then(handleResponse);
}

export function post(url, payload) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    mode: 'cors',
  };
  return fetch(`${apiUrl}${url}`, requestOptions).then(handleResponse);
}
