import { getToken } from '../services/api/auth';
import { getItem } from '../services/localStore';
import { UNSYNCED_ROUTES } from '../services/constants';

const rehydrateUser = () => {
  const token = getToken(true);
  if (token) {
    return {
      id: token.user_id,
      username: token.username,
    };
  }
  return null;
};

const rehydrateDriverRoutes = () => getItem(UNSYNCED_ROUTES) || [];

export {
  rehydrateUser,
  rehydrateDriverRoutes,
};

