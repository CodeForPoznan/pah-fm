import { get } from './http';
import { getItem } from '../localStore';
import { tokenKey } from './auth';

export function getMyself() {
  return get('users/me');
}

export function isUserLoggedIn() {
  return !!getItem(tokenKey);
}
