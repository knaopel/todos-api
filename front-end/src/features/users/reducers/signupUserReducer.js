import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../../api/userApi';
import { thunkStatus as status } from '../../../util';

const signupUserReducer = createAsyncThunk(
  'user/signupUser',
  async userParams => {
    const data = await userApi.signupUser(userParams);
    return data;
  }
);
export const signupUserBuilder = builder => {
  builder
    .addCase(signupUserReducer.pending, (state, _action) => {
      state.status = status.pending;
      state.error = {};
    })
    .addCase(signupUserReducer.fulfilled, (state, action) => {
      userApi.setLocalUser(action.payload);
      state.status = status.succeeded;
      state.entity = action.payload;
    })
    .addCase(signupUserReducer.rejected, (state, action) => {
      state.status = status.failed;
      state.error = action.error;
    });
};

export { signupUserReducer as signupUser };
