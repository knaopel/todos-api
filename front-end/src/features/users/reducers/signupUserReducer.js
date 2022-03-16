import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../../api/userApi';

export const signupUserReducer = createAsyncThunk(
  'user/signupUser',
  async userParams => {
    const data = await userApi.signupUser(userParams);
    return data;
  }
);
