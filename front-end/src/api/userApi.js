import { handleError, handleResponse } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL + '/todos/';

export function getTodos() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveTodo(todo) {
  return fetch(baseUrl + (todo.id || ''), {
    method: todo.id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTodo(todoId) {
  return fetch(basUrl + todoId, { method: 'DELETE' })
    .then(handleResponse)
    .catch(handleError);
}
