import { createSelector } from 'reselect';

const drivesSelector = state => state.drives;

export const drivesListSelector = createSelector(
  drivesSelector,
  drives => drives.list
);

export const addDriveSelector = createSelector(
  drivesSelector,
  drives => drives.addDrive
);

export const addDriveErrorsSelector = createSelector(
  addDriveSelector,
  addDrive => addDrive.errors
);
