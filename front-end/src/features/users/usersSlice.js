import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userApi from '../../api/userApi';

export const initialState = {
  entity: {
    name: '',
    email: '',
    auth_token: null,
  },
  error: {},
  status: 'idle',
};

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
    signupUserLoading(state, action) {
      state.status = 'pending';
    },
    signupUserSuccess(state, action) {
      state.entity.auth_token = action.payload.auth_token;
      state.status = 'fulfilled';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entity.auth_token = action.payload.auth_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.entity.auth_token = null;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entity = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
    builder
      .addCase(updateUser.pending, state => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entity = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { userUpdated, signupUserLoading, signupUserSuccess } =
  usersSlice.actions;

export default usersSlice.reducer;

// export const { selectAll, selectById } = usersAdapter.getSelectors(
//   state => state.users
// );

// Thunks
export const signupUser = params => async dispatch => {
  dispatch(signupUserLoading());
  const data = await userApi.signupUser(params);
  dispatch(signupUserSuccess(data));
};
