import { handleError, handleResponse } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL;

export function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${baseUrl}/users/authenticate`)
    .then(handleResponse)
    .catch(handleError);
}
