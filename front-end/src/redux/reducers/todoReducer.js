import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function todoReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.TODO_CREATE_SUCCESS:
      return { ...state, items: [...state.items, { ...action.todo }] };
    case types.TODO_UPDATE_SUCCESS:
      return {
        ...state, items: state.items.map(todo =>
          todo.id === action.todo.id ? action.todo : todo
        )
      };
    case types.TODOS_LOAD_INIT:
      return { ...state, isLoaded: false, isLoading: true };
    case types.TODOS_LOAD_SUCCESS:
      return { items: action.todos, isLoaded: true, isLoading: false };
    case types.TODO_COMPLETE_COMPLETE:
    case types.TODO_DELETE_OPTIMISTIC:
      return { ...state, items: state.items.filter(todo => todo.id !== action.todo.id) };
    default:
      return state;
  }
}
