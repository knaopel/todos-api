import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userApi from '../../api/userApi';
import { thunkStatus as status } from '../../util';

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

export const setLocalUser = createAsyncThunk(
  'user/setLocalUser',
  async user => {
    const data = await userApi.setLocalUser(user);
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
    signupUserLoading(state, action) {
      state.status = status.pending;
    },
    signupUserSuccess(state, action) {
      state.entity.auth_token = action.payload.auth_token;
      state.status = status.succeeded;
    },
    logoutUserLoading(state, action) {
      state.status = status.pending;
    },
    logoutUserSuccess(state, action) {
      state.status = status.succeeded;
      state.entity = initialState.entity;
    },
    fetchLocalUserLoading(state, action) {
      state.status = status.pending;
    },
    fetchLocalUserSuccess(state, action) {
      if (action.payload) {
        state.status = status.succeeded;
        state.entity = action.payload;
      } else {
        state.status = status.failed;
        state.error = { message: 'No local user found.' };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = status.pending;
        state.error = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = status.succeeded;
        state.entity = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = status.failed;
        state.entity.auth_token = null;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchUser.pending, (state, action) => {
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
      .addCase(updateUser.pending, state => {
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

export const {
  userUpdated,
  signupUserLoading,
  signupUserSuccess,
  logoutUserLoading,
  logoutUserSuccess,
  fetchLocalUserLoading,
  fetchLocalUserSuccess,
} = usersSlice.actions;

export const selectUser = state => state.user.entity;
export const selectUserFetchStatus = state => state.user.status;

export default usersSlice.reducer;

/* Classic Thunks */
export const signupUser = params => async dispatch => {
  dispatch(signupUserLoading());
  const data = await userApi.signupUser(params);
  dispatch(signupUserSuccess(data));
};

export const logoutUser = () => async dispatch => {
  dispatch(logoutUserLoading());
  await userApi.removeLocalUser();
  dispatch(logoutUserSuccess());
};

export const fetchLocalUser = () => async dispatch => {
  dispatch(fetchLocalUserLoading());
  const data = await userApi.getLocalUser();
  dispatch(fetchLocalUserSuccess(data));
};
