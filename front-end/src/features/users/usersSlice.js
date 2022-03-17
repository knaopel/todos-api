import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLocalUserReducer,
  fetchUserBuilder,
  loginUserBuilder,
  logoutUserReducer,
  signupUserBuilder,
  updateUserBuilder,
} from './reducers';

export const initialState = {
  entity: {
    name: '',
    email: '',
    auth_token: null,
  },
  error: {},
  status: 'idle',
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchLocalUser: fetchLocalUserReducer,
    logoutUser: logoutUserReducer,
  },
  extraReducers(builder) {
    signupUserBuilder(builder);
    loginUserBuilder(builder);
    fetchUserBuilder(builder);
    updateUserBuilder(builder);
  },
});

export const { userUpdated, logoutUser, fetchLocalUser } = usersSlice.actions;

// export const selectUser = state => state.user.entity;
// export const selectUserFetchStatus = state => state.user.status;

export default usersSlice.reducer;
