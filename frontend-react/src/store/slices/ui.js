import { createSlice } from '@reduxjs/toolkit';
import { DIRECTIONS } from '../../utils/constants';

const initialState = {
  locale: 'en',
  direction: DIRECTIONS.LTR,
};

const PREFIX = 'ui';

const uiSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setLocale(state, { payload }) {
      state.locale = payload.locale;
      state.direction = payload.direction;
    },
  },
});

export const {
  setLocale,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
