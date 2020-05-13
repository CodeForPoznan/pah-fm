import { get } from './http';

export function getMyself() {
  return get('users/me');
}
