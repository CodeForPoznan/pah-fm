import { createSelector } from 'reselect';

const authSelector = state => state.auth;

export const isAuthenticatedSelector = createSelector(
  authSelector,
  auth => auth.isAuthenticated
);

export const currentUserUsernameSelector = createSelector(
  authSelector,
  auth => auth.user?.username
);

export const currentUserGroupsSelector = createSelector(
  authSelector,
  auth => auth.user?.groups?.map(({ name }) => name) || []
);

export const currentUserRsaPrivDSelector = createSelector(
  authSelector,
  auth => auth.user?.rsaPrivD
);

export const currentUserRsaModulusNSelector = createSelector(
  authSelector,
  auth => auth.user?.rsaModulusN
);
