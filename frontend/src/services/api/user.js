import { get } from './_http';

export function getMyself() {
  return get('users/me');
}
