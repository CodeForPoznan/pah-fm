import { get } from './_http';

export function getRoutes() {
  return get('route');
}
