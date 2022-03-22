import { createAsyncThunk } from '@reduxjs/toolkit';
import * as todosApi from '../../../api/todoApi';
import { todosAdapter } from '../todosSlice'

const addNewTodoReducer = createAsyncThunk(
  'todos/addNewTodo',
  async (initialTodo, authToken) => {
    return await todosApi.saveTodo(initialTodo, authToken);
  }
);

export const addNewTodoBuilder = builder =>{
      builder
      .addCase(addNewTodoReducer.pending, state => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(addNewTodoReducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        todosAdapter.addOne(state, action.payload);
      })
      .addCase(addNewTodoReducer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
}

export { addNewTodoReducer as addNewTodo };
