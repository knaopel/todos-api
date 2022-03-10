// import * as types from './actionTypes';
// import * as todoApi from '../../api/todoApi';
// import { apiCallError, beginApiCall } from './apiStatusActions';


// export const loadTodosInit = () => {
//   return { type: types.TODOS_LOAD_INIT };
// };
// export const completeTodoComplete = (todo) => {
//   return { type: types.TODO_COMPLETE_COMPLETE, todo };
// };
// export function loadTodosSuccess(todos) {
//   return { type: types.TODOS_LOAD_SUCCESS, todos };
// }

// export function createTodoSuccess(todo) {
//   return { type: types.TODO_CREATE_SUCCESS, todo };
// }

// export function updateTodoSuccess(todo) {
//   return { type: types.TODO_UPDATE_SUCCESS, todo };
// }

// export function deleteTodoOptimistic(todo) {
//   return { type: types.TODO_DELETE_OPTIMISTIC, todo };
// }

// export function loadTodos(auth_token) {
//   return function (dispatch) {
//     dispatch(beginApiCall());
//     dispatch(loadTodosInit());
//     return todoApi
//       .getTodos(auth_token)
//       .then(todos => {
//         dispatch(loadTodosSuccess(todos));
//       })
//       .catch(error => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }

// export function saveTodo(todo, auth_token) {
//   return function (dispatch) {
//     dispatch(beginApiCall());
//     return todoApi
//       .saveTodo(todo, auth_token)
//       .then(savedTodo => {
//         todo.id
//           ? dispatch(updateTodoSuccess(savedTodo))
//           : dispatch(createTodoSuccess(savedTodo));
//       })
//       .catch(error => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }

// export const completeTodo = (todo, auth_token) => {
//   return function (dispatch) {
//     return todoApi
//       .completeTodo(todo, auth_token)
//       .then(todo => {
//         dispatch(completeTodoComplete(todo));
//       })
//       .catch(error => {
//         throw error;
//       });
//   };
// };

// export function deleteTodo(todo, auth_token) {
//   return function (dispatch) {
//     dispatch(deleteTodoOptimistic(todo));
//     return todoApi.deleteTodo(todo.id, auth_token);
//   };
// }
