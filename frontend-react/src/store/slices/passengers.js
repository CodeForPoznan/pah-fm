import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { REQUEST_STATUSES } from '../../utils/constants';
import request from '../../utils/request';

const initialState = {
  list: [],
  status: REQUEST_STATUSES.IDLE,
  errors: null,
};

const PREFIX = 'passengers';
const GET_LIST = 'get list';

export const getPassengers = createAsyncThunk(
  `${PREFIX}/${GET_LIST}`,
  async (_, {
    rejectWithValue,
  }) => {
    try {
      const response = await request.get('/passengers');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const passengersSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPassengers.pending, (state) => {
      state.errors = null;
      state.status = REQUEST_STATUSES.LOADING;
    });
    builder.addCase(getPassengers.fulfilled, (state, { payload }) => {
      state.status = REQUEST_STATUSES.SUCCEEDED;
      state.list = payload;
    });
    builder.addCase(getPassengers.rejected, (state, { payload }) => {
      state.status = REQUEST_STATUSES.FAILED;
      state.errors = payload;
    });
  },
});

export const passengersReducer = passengersSlice.reducer;
