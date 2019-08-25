import jwtDecode from 'jwt-decode';

import { post } from './http';
import { setItem, getItem, clearStorage } from '../localStore';

export const tokenKey = 'jwt';
const vuex = 'vuex';

export function login(username, password) {
  return post('api-token-auth/', { username, password }, false)
    .then(response => response.token);
}

export function saveToken(token) {
  setItem(tokenKey, token);
}

export function deleteStorageData() {
  const localData = getItem(vuex);
  const lang = localData.language;
  clearStorage();
  setItem(vuex, {
    language: lang,
  });
}

export function getToken(decoded = false) {
  const raw = getItem(tokenKey);
  if (raw) {
    const now = Math.floor(Date.now() / 1000);
    const token = jwtDecode(raw);
    if (token.exp < now) {
      console.debug('Expired token.');
      deleteStorageData();
      return null;
    }
    if (decoded) {
      return token;
    }
  }
  return raw;
}

export function getAuthHeader() {
  const token = getToken();
  if (token) {
    return {
      Authorization: `JWT ${token}`,
    };
  }
  return {};
}
