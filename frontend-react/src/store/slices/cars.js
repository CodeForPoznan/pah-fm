import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { REQUEST_STATUSES } from '../../utils/constants';
import request from '../../utils/request';

const initialState = {
  list: [],
  status: REQUEST_STATUSES.IDLE,
};

const PREFIX = 'cars';
const GET_LIST = 'get list';

export const getCars = createAsyncThunk(
  `${PREFIX}/${GET_LIST}`,
  async (_, {
    rejectWithValue,
  }) => {
    try {
      const response = await request.get('/cars');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const carsSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCars.pending, (state) => {
      state.error = null;
      state.status = REQUEST_STATUSES.LOADING;
    });
    builder.addCase(getCars.fulfilled, (state, { payload }) => {
      state.status = REQUEST_STATUSES.SUCCEEDED;
      state.list = payload;
    });
    builder.addCase(getCars.rejected, (state, { payload }) => {
      state.status = REQUEST_STATUSES.FAILED;
      state.error = payload;
    });
  },
});

export const carsReducer = carsSlice.reducer;
