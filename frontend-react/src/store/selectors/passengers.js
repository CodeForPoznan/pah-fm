import { createSelector } from 'reselect';

import { REQUEST_STATUSES } from '../../utils/constants';

const passengersSelector = state => state.passengers;

export const getPassengersListSelector = createSelector(
  passengersSelector,
  passengers => passengers.list
);

export const getPassengersIsLoadingSelector = createSelector(
  passengersSelector,
  passengers => passengers.status === REQUEST_STATUSES.LOADING
);
