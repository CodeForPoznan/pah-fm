import { getToken } from '../services/api/auth';

export function rehydrateUser() {
  const token = getToken(true);
  if (token) {
    return {
      id: token.user_id,
      username: token.username,
    };
  }
  return null;
}
