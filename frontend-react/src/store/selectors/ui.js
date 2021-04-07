import { createSelector } from 'reselect';

const uiSelector = state => state.ui;

export const getDirectionSelector = createSelector(
  uiSelector,
  state => state.direction,
);
