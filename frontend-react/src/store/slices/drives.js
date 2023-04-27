import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { REQUEST_STATUSES } from '../../utils/constants';
import request from '../../utils/request';

const initialState = {
  list: {
    data: [],
    status: REQUEST_STATUSES.IDLE,
    errors: null,
  },
  addDrive: {
    status: REQUEST_STATUSES.IDLE,
    errors: null,
  },
};

const PREFIX = 'drives';
const ADD_ITEM = 'add item';
const GET_LIST = 'get list';

export const addDrive = createAsyncThunk(
  `${PREFIX}/${ADD_ITEM}`,
  async (payload, {
    rejectWithValue,
  }) => {
    try {
      const response = await request.post('/drives', payload);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDrives = createAsyncThunk(
  `${PREFIX}/${GET_LIST}`,
  async (_, {
    rejectWithValue,
  }) => {
    try {
      const response = await request.get('/drives');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const drivesSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addDrive.pending, (state) => {
      state.addDrive.errors = null;
      state.addDrive.status = REQUEST_STATUSES.LOADING;
    });
    builder.addCase(addDrive.fulfilled, (state) => {
      state.addDrive.status = REQUEST_STATUSES.SUCCEEDED;
    });
    builder.addCase(addDrive.rejected, (state, { payload }) => {
      state.addDrive.status = REQUEST_STATUSES.FAILED;
      state.addDrive.errors = payload;
    });
    builder.addCase(getDrives.pending, (state) => {
      state.list.errors = null;
      state.list.status = REQUEST_STATUSES.LOADING;
    });
    builder.addCase(getDrives.fulfilled, (state, { payload }) => {
      state.list.status = REQUEST_STATUSES.SUCCEEDED;
      state.list.data = payload;
    });
    builder.addCase(getDrives.rejected, (state, { payload }) => {
      state.list.status = REQUEST_STATUSES.FAILED;
      state.list.errors = payload;
    });
  },
});

export const drivesReducer = drivesSlice.reducer;
