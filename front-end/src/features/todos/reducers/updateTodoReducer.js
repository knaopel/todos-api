import { createAsyncThunk } from '@reduxjs/toolkit';
import * as todosApi from '../../../api/todoApi';
import { todosAdapter } from '../todosSlice';

const updateTodoReducer = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo, auth_token) => {
    return await todosApi.saveTodo(updatedTodo, auth_token);
  }
);

export const updateTodoBuilder = builder => {
  builder
    .addCase(updateTodoReducer.pending, state => {
      state.status = 'loading';
      state.error = {};
    })
    .addCase(updateTodoReducer.fulfilled, (state, action) => {
      state.status = 'succeeded';
      todosAdapter.upsertOne(state, action.payload);
    })
    .addCase(updateTodoReducer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });
};

export { updateTodoReducer as updateTodo };
