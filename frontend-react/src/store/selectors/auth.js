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
