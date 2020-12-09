import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit'

import { authReducer } from './slices/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: rootReducer
});

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     store.replaceReducer(rootReducer);
//   });
// }

export default store;
