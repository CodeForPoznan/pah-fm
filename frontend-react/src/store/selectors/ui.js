import { createSelector } from 'reselect';

const uiSelector = state => state.ui;

export const getDirectionSelector = createSelector(
  uiSelector,
  ui => ui.rtl
);
