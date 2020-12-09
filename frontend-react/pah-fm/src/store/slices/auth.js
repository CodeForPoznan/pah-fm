import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import request from '../utils/request';

const initialState = {
  error: null,
  isFetching: false,
  isAuthenticated: false,
  user: null,
};

const PREFIX = 'auth';

const LOGIN = 'login';

export const login = createAsyncThunk(
  `${PREFIX}/${LOGIN}`,
  async (values) => {
    try {
      const response = await request.post('/api-token-auth/', values);

      console.log(response);

      return null;
    } catch (error) {
      return error.response.message;
    }
  }
)

const authSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => ({
      ...state,
      error: null,
      isFetching: true,
    }));
    builder.addCase(login.fulfilled, state => ({
      ...state,
      isFetching: false,
      isAuthenticated: true,
    }));
    builder.addCase(login.rejected, (state, { payload }) => ({
      ...state,
      isFetching: false,
      error: payload,
    }));
  },
});

export const authReducer = authSlice.reducer;
