import { handleError, handleResponse } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL;

export function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${baseUrl}/auth/login`, requestOptions)
    .then(handleResponse)
    .catch(handleError);
}
