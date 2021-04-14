import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locale: 'en',
  rtl: false,
};

const PREFIX = 'ui';

const uiSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    setLocale(state, { payload }) {
      state.locale = payload.locale;
      state.rtl = payload.rtl;
    },
  },
});

export const {
  setLocale,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
