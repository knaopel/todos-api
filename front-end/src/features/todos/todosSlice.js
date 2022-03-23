import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import * as todosApi from '../../api/todoApi';
import { addNewTodoBuilder, fetchTodosBuilder, updateTodoBuilder } from './reducers';

export const todosAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const initialState = todosAdapter.getInitialState({
  status: 'idle',
  error: null,
});


export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId, auth_token) => {
    return await todosApi.deleteTodo(todoId, auth_token);
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    fetchTodosBuilder(builder);
    addNewTodoBuilder(builder);
    updateTodoBuilder(builder);
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      todosAdapter.removeOne(state, action.payload);
    });
  },
});

export const { todoUpdated } = todosSlice.actions;

export default todosSlice.reducer;

export const {
  selectAll: selectTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors(state => state.todos);

export const selectOpenTodos = createSelector(selectTodos, todos =>
  todos.filter(todo => !todo.is_completed)
);

export const selectTodosStatus = state => state.todos.status;

export * from './reducers';
