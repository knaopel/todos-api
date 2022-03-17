import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveUser } from '../../../api/userApi';
import { thunkStatus as status } from '../../../util';

const updateUserReducer = createAsyncThunk(
  'user/updateUser',
  async (user, auth_token) => {
    const data = await saveUser(user, auth_token);
    return data;
  }
);

export const updateUserBuilder = builder => {
  builder
    .addCase(updateUserReducer.pending, (state, _action) => {
      state.status = status.pending;
      state.error = {};
    })
    .addCase(updateUserReducer.fulfilled, (state, action) => {
      state.status = status.succeeded;
      state.entity = { ...state.entity, ...action.payload };
    })
    .addCase(updateUserReducer.rejected, (state, action) => {
      state.status = status.failed;
      state.error = action.error;
    });
};

export { updateUserReducer as updateUser };
