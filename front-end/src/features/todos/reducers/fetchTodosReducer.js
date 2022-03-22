import { createAsyncThunk } from '@reduxjs/toolkit';
import * as todosApi from '../../../api/todoApi';
import { todosAdapter } from '../todosSlice';
import { thunkStatus as status } from '../../../util';

const fetchTodosReducer = createAsyncThunk(
  'todos/fetchTodos',
  async auth_token => {
    return await todosApi.getTodos(auth_token);
  }
);

export const fetchTodosBuilder = builder => {
  builder
    .addCase(fetchTodosReducer.pending, (state, action) => {
      state.status = status.pending;
    })
    .addCase(fetchTodosReducer.fulfilled, (state, action) => {
      state.status = status.succeeded;
      todosAdapter.upsertMany(state, action.payload);
    })
    .addCase(fetchTodosReducer.rejected, (state, action) => {
      state.status = status.failed;
      state.error = action.error.message;
    });
};

export { fetchTodosReducer as fetchTodos };
