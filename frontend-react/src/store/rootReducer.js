import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { uiReducer } from './slices/ui';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export default rootReducer;
