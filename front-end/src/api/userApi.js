import { getHeaders, handleAxiosResponse, handleError } from './apiUtils';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;
export const KEY_NAME = 'user';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
    return handleAxiosResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

export const signupUser = async params => {
  try {
    const response = await axios
      .post(`${baseUrl}/signup`, params);
    return handleAxiosResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const inviteUser = async (email, honey_or_dewer, auth_token) => {
  const data = { email, honey_or_dewer };
  try {
    const response = await axios
      .post(`${baseUrl}/user/invite`, data, { headers: getHeaders(auth_token) });
    return handleAxiosResponse(response);
  } catch (error) {
    return handleError(error);
  }
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

export const loadUser = async auth_token => {
  try {
    const response = await axios
      .get(`${baseUrl}/user`, { headers: getHeaders(auth_token) });
    return handleAxiosResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const userExists = async (email, auth_token) => {
  try {
    const response = await axios
      .post(
        `${baseUrl}/user/exists`,
        { email },
        { headers: getHeaders(auth_token) }
      );
    return handleAxiosResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const saveUser = async (user, auth_token) => {
  try {
    const response = await axios
      .put(`${baseUrl}/user`, { headers: getHeaders(auth_token), data: user });
    return handleAxiosResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const acceptInvitation = async params => {
  try {
    const response = await axios
      .post(`${baseUrl}/acceptinvitation`, params);
    return handleAxiosResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
