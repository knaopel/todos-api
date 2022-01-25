import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

const todosAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = todosAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/todos', {
    headers: { Authorization: 'mocked_auth_token' },
  });
  return response.data;
});

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async initialTodo => {
    const response = await client.post('', initialTodo);
    return response.data;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingTodo = state.entities[id];
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        todosAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder.addCase(addNewTodo.fulfilled, todosAdapter.addOne);
  },
});

export const { todoUpdated } = todosSlice.actions;

export default todosSlice.reducer;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors(state => state.todos);
