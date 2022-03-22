import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import * as todosApi from '../../api/todoApi';
import { fetchTodosBuilder } from './reducers';

export const todosAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const initialState = todosAdapter.getInitialState({
  status: 'idle',
  error: null,
});

// export const fetchTodos = createAsyncThunk(
//   'todos/fetchTodos',
//   async auth_token => {
//     return await todosApi.getTodos(auth_token);
//   }
// );

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (initialTodo, auth_token) => {
    return await todosApi.saveTodo(initialTodo, auth_token);
  }
);

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
    // builder
    //   .addCase(fetchTodos.pending, (state, action) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchTodos.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     todosAdapter.upsertMany(state, action.payload);
    //   })
    //   .addCase(fetchTodos.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message;
    //   });
    builder
      .addCase(addNewTodo.pending, state => {
        state.status = 'loading';
        state.error = {};
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        todosAdapter.addOne(state, action.payload);
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
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
