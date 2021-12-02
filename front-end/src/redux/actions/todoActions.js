import * as types from './actionTypes';
import * as todoApi from '../../api/todoApi';
import { apiCallError, beginApiCall } from './apiStatusActions';

export function loadTodoSuccess(todos) {
  return { type: types.TODOS_LOAD_SUCCESS, todos };
}

export function createTodoSuccess(todo) {
  return { type: types.TODO_CREATE_SUCCESS, todo };
}

export function updateTodoSuccess(todo) {
  return { type: types.TODO_UPDATE_SUCCESS, todo };
}

export function deleteTodoOptimistic(todo) {
  return { type: types.TODO_DELETE_OPTIMISTIC, todo };
}

export function loadTodos() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return todoApi
      .getTodos()
      .then(todos => {
        dispatch(loadTodoSuccess(todos));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveTodo(todo) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return todoApi
      .saveTodo(todo)
      .then(savedTodo => {
        todo.id
          ? dispatch(updateTodoSuccess(savedTodo))
          : dispatch(createTodoSuccess(savedTodo));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deletTodo(todo) {
  return function (dispatch) {
    dispatch(deleteTodoOptimistic(todo));
    return todoApi.deleteTodo(todo.id);
  };
}
