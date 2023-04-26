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

const PREFIX = 'projects';
const GET_LIST = 'get list';

export const getProjects = createAsyncThunk(
  `${PREFIX}/${GET_LIST}`,
  async (_, {
    rejectWithValue,
  }) => {
    try {
      const response = await request.get('/projects');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectsSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state) => {
      state.error = null;
      state.status = REQUEST_STATUSES.LOADING;
    });
    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.status = REQUEST_STATUSES.SUCCEEDED;
      state.list = payload;
    });
    builder.addCase(getProjects.rejected, (state, { payload }) => {
      state.status = REQUEST_STATUSES.FAILED;
      state.error = payload;
    });
  },
});

export const projectsReducer = projectsSlice.reducer;
