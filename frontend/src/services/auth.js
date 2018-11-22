import jwtDecode from 'jwt-decode';

import { post } from './api/_http';
import { USER } from '../store/constants';
import { makeDefaultState } from '../store/helpers';

import { setItem, getItem, removeItem } from './localStore';

const tokenKey = 'jwt';

export function login(username, password) {
  return post('api-token-auth/', { username, password })
    .then(response => response.token);
}

export function saveToken(token) {
  setItem(tokenKey, token);
}

export function deleteToken() {
  const localData = getItem('vuex');
  setItem({
    ...localData,
    [USER]: makeDefaultState(),
  });
  removeItem(tokenKey);
}

export function getToken(decoded = false) {
  const raw = getItem(tokenKey);
  if (raw) {
    const now = Math.floor(Date.now() / 1000);
    const token = jwtDecode(raw);
    if (token.exp < now) {
      console.debug('Expired token.');
      deleteToken();
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
