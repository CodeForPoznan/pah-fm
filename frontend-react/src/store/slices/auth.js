import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import request from '../../utils/request';
import { setToken } from '../../utils/token';

const initialState = {
  error: null,
  isAuthenticated: false,
  isFetching: false,
  user: null,
};

const PREFIX = 'auth';

const LOGIN = 'login';
const GET_ME = 'get me';

export const getMe = createAsyncThunk(
  `${PREFIX}/${GET_ME}`,
  async () => {
    try {
      const response = await request.get('/users/me');

      return response.data;
    } catch (error) {
      return error.response.message;
    }
  }
);

export const login = createAsyncThunk(
  `${PREFIX}/${LOGIN}`,
  async (values, {
    rejectWithValue,
    dispatch,
  }) => {
    try {
      const response = await request.post('/authenticate', values);
      const { access } = response.data;

      request.setAuthToken(access);
      setToken(access);

      await dispatch(getMe());

      return null;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.isFetching = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isFetching = false;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
    builder.addCase(getMe.pending, (state) => {
      state.error = null;
      state.isFetching = true;
    });
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.user = payload;
    });
    builder.addCase(getMe.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

export const authReducer = authSlice.reducer;
