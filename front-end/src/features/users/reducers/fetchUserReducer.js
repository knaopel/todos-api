import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../../api/userApi';
import { thunkStatus as status } from '../../../util';

const fetchUserReducer = createAsyncThunk(
  'user/fetchUser',
  async auth_token => {
    const data = await userApi.loadUser(auth_token);
    return data;
  }
);

export const fetchUserBuilder = builder => {
  builder
    .addCase(fetchUserReducer.pending, (state, _action) => {
      state.status = status.pending;
      state.error = {};
    })
    .addCase(fetchUserReducer.fulfilled, (state, action) => {
      state.status = status.succeeded;
      state.entity = { ...state.entity, ...action.payload };
    })
    .addCase(fetchUserReducer.rejected, (state, action) => {
      state.status = status.failed;
      state.error = action.error;
    });
};

export { fetchUserReducer as fetchUser };
