import { createSelector } from 'reselect';

import { REQUEST_STATUSES } from '../../utils/constants';

const carsSelector = state => state.cars;

export const getCarsListSelector = createSelector(
  carsSelector,
  cars => cars.list
);

export const getCarsIsLoadingSelector = createSelector(
  carsSelector,
  cars => cars.status === REQUEST_STATUSES.LOADING
);
