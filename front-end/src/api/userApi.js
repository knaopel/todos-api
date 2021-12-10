import { getHeaders, handleAxiosResponse, handleError, handleResponse } from './apiUtils';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;
const KEY_NAME = 'user';

export function login(email, password) {
  return axios
    .post(`${baseUrl}/auth/login`, { email, password })
    .then(handleAxiosResponse)
    .catch(handleError);
}

export const signupUser = params => {
  return axios
    .post(`${baseUrl}/signup`, params)
    .then(handleAxiosResponse)
    .catch(handleError);
};

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

export const removeLocalUser = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(KEY_NAME);
      resolve('local user removed');
    } catch (error) {
      reject(error);
    }
  });
};

export const loadUser = auth_token => {
  return axios
    .get(`${baseUrl}/user`, { headers: getHeaders(auth_token) })
    .then(handleAxiosResponse)
    .catch(handleError);
};

export const saveUser = (user, auth_token) => {
  return axios
    .put(`${baseUrl}/user`, { headers: getHeaders(auth_token), data: user })
    .then(handleAxiosResponse)
    .catch(handleError);
};

export function getTodos() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
