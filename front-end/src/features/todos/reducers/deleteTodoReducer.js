import { createAsyncThunk } from "@reduxjs/toolkit";
import * as todosApi from '../../../api/todoApi';
import { todosAdapter } from "../todosSlice";

const deleteTodoReducer = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId, authToken) => {
    return await todosApi.deleteTodo(todoId, authToken);
  }
);

export const deleteTodoBuilder = builder => {
  builder.addCase(deleteTodoReducer.fulfilled, (state, { payload }) => {
    todosAdapter.removeOne(state, payload);
  });
}

export { deleteTodoReducer as deleteTodo };