import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userApi from '../../api/userApi';
import { thunkStatus as status } from '../../util';
import {
  fetchLocalUserReducer,
  logoutUserReducer,
  signupUserReducer as signupUser,
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

/* Async Thunks */

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async userCredentials => {
    const data = await userApi.login(userCredentials);
    return data;
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async auth_token => {
    const data = await userApi.loadUser(auth_token);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, auth_token) => {
    const data = await userApi.saveUser(user, auth_token);
    return data;
  }
);

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchLocalUser: fetchLocalUserReducer,
    logoutUser: logoutUserReducer,
  },
  extraReducers(builder) {
    builder
      .addCase(signupUser.pending, (state, _action) => {
        state.status = status.pending;
        state.error = {};
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = status.succeeded;
        state.entity = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = status.failed;
        state.error = action.error;
      });
    builder
      .addCase(loginUser.pending, (state, _action) => {
        state.status = status.pending;
        state.error = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        userApi.setLocalUser(action.payload);
        state.status = status.succeeded;
        state.entity = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = status.failed;
        state.entity.auth_token = null;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchUser.pending, (state, _action) => {
        state.status = status.pending;
        state.error = {};
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = status.succeeded;
        state.entity = { ...state.entity, ...action.payload };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = status.failed;
        state.error = action.error;
      });
    builder
      .addCase(updateUser.pending, (state, _action) => {
        state.status = status.pending;
        state.error = {};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = status.succeeded;
        state.entity = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = status.failed;
        state.error = action.error;
      });
  },
});

export const { userUpdated, logoutUser, fetchLocalUser } = usersSlice.actions;

export const selectUser = state => state.user.entity;
export const selectUserFetchStatus = state => state.user.status;

export default usersSlice.reducer;
export { signupUser };
