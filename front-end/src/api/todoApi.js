import axios from 'axios';
import { getHeaders, handleAxiosResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL + '/todos/';

export function getTodos(auth_token) {
  return axios.get(baseUrl, { headers: getHeaders(auth_token) })
    .then(handleAxiosResponse)
    .catch(handleError);
}

export function saveTodo(todo, auth_token) {
  return axios(baseUrl + (todo.id || ''), {
    method: todo.id ? 'PUT' : 'POST',
    headers: getHeaders(auth_token),
    data: todo,
  })
    .then(handleAxiosResponse)
    .catch(handleError);
}

export function deleteTodo(todoId, auth_token) {
  return axios.delete(baseUrl + todoId, { headers: getHeaders(auth_token) })
    .then(handleAxiosResponse)
    .catch(handleError);
}
