import { handleError, handleResponse } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL + '/user/';
const KEY_NAME = 'user';

export const getLocalUser = () => {
  return new Promise(resolve => {
    const userStr = localStorage.getItem(KEY_NAME);
    const user = JSON.parse(userStr);
    resolve(user);
  });
};

export const setLocalUser = user => {
  return new Promise(resolve => {
    const userStr = JSON.stringify(user);
    localStorage.setItem(KEY_NAME, userStr);
    resolve(user);
  });
};

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
  return fetch(baseUrl + todoId, { method: 'DELETE' })
    .then(handleResponse)
    .catch(handleError);
}
