import { getToken } from '../../services/api/auth';

import { actions } from './actions';
import { mutations } from './mutations';

function rehydrateUser() {
  const token = getToken(true);
  if (token) {
    return {
      id: token.id,
      username: token.username,
    };
  }
  return null;
}

// initial state
const state = {
  user: rehydrateUser(),
  loginStatus: {
    inProgress: false,
  },
};

// getters
const getters = { };

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
