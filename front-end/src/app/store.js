import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/usersSlice';
import todosReducer from '../features/todos/todosSlice';

export default configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
  },
});
