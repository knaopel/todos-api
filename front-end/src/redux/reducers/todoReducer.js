import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function todoReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.TODO_CREATE_SUCCESS:
      return [...state, { ...action.course }];
    case types.TODO_UPDATE_SUCCESS:
      return state.map(todo =>
        todo.id === action.todo.id ? action.todo : todo
      );
    case types.TODOS_LOAD_SUCCESS:
      return action.todos;
    case types.TODO_DELETE_OPTIMISTIC:
      return state.filter(todo => todo.id !== action.todo.id);
    default:
      return state;
  }
}
