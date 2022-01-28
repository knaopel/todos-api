import axios from 'axios';
import { getHeaders, handleAxiosResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL + '/todos/';

export const getTodos = async auth_token => {
  try {
    const response = await axios.get(baseUrl, {
      headers: getHeaders(auth_token),
    });
    return handleAxiosResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const saveTodo = async (todo, auth_token) => {
  try {
    const response = await axios(baseUrl + (todo.id || ''), {
      method: todo.id ? 'PUT' : 'POST',
      headers: getHeaders(auth_token),
      data: todo,
    });
    return handleAxiosResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// export const completeTodo = async (todo, auth_token) => {
//   return await saveTodo({ ...todo, is_completed: true }, auth_token);
// };

export const deleteTodo = async (todoId, auth_token) => {
  try {
    const response = await axios.delete(baseUrl + todoId, {
      headers: getHeaders(auth_token),
    });
    return handleAxiosResponse({ ...response, data: todoId  });
  } catch (error) {
    return handleError(error);
  }
};
