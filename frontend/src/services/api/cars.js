import { get } from './http';

export function getCars() {
  return get('cars');
}
