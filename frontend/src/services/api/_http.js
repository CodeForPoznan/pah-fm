import { getAuthHeader } from '../auth';

export const apiUrl = '/api/';

function handleResponse(response) {
  return response.json().then((data) => {
    if (!response.ok) {
      return Promise.reject(data);
    }

    return data;
  });
}

export function get(url, auth = true) {
  if (!navigator.onLine) {
    return null;
  }

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
  if (!navigator.onLine) {
    return null;
  }

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
