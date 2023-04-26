import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { uiReducer } from './slices/ui';
import { carsReducer } from './slices/cars';
import { projectsReducer } from './slices/projects';
import { passengersReducer } from './slices/passengers';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  cars: carsReducer,
  passengers: passengersReducer,
  projects: projectsReducer,
});

export default rootReducer;
