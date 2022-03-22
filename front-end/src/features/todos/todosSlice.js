import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import * as todosApi from '../../api/todoApi';
import { addNewTodoBuilder, fetchTodosBuilder } from './reducers';

export const todosAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const initialState = todosAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updatedTodo, auth_token) => {
    return await todosApi.saveTodo(updatedTodo, auth_token);
  }
);

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
    builder
      .addCase(updateTodo.pending, state => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        todosAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
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
