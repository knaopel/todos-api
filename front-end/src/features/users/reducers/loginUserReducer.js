import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../../api/userApi';
import { thunkStatus as status } from '../../../util';

const loginUserReducer = createAsyncThunk(
  'user/loginUser',
  async userCredentials => {
    const data = await userApi.login(userCredentials);
    return data;
  }
);

export const loginUserBuilder = builder => {
  builder
    .addCase(loginUserReducer.pending, (state, _action) => {
      state.status = status.pending;
      state.error = {};
    })
    .addCase(loginUserReducer.fulfilled, (state, action) => {
      userApi.setLocalUser(action.payload);
      state.status = status.succeeded;
      state.entity = action.payload;
    })
    .addCase(loginUserReducer.rejected, (state, action) => {
      state.status = status.failed;
      state.entity.auth_token = null;
      state.error = action.error;
    });
};

export { loginUserReducer as loginUser };
