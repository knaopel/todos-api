import dispatcher from '../appDispatcher';
import appConstants, { authConstants } from '../util/constants';
import axios from 'axios';
import actionTypes from '../stores/actionTypes';

const API_URL = process.env.REACT_APP_API_URL;

// export const

export const logUserIn = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password }).then(({ auth_token }) => {
    localStorage.setItem(appConstants.authTokenName, auth_token);
    dispatcher.dispatch({
      actionType: authConstants.LOGIN_USER,
      token: auth_token
    });
  });
};

export const setUserToken = (token) => {
  dispatcher.dispatch({
    actionType: actionTypes.SET_AUTH_TOKEN,
    token
  });
};

export const logUserOut = () => {
  localStorage.removeItem(appConstants.authTokenName);
  dispatcher.dispatch({
    actionType: authConstants.LOGOUT_USER
  });
};