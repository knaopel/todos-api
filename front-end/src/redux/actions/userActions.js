import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { apiCallError, beginApiCall } from './apiStatusActions';

// dispatches
export function loginSuccess(user) {
  return { type: types.AUTH_LOGIN_SUCESS, user };
}

export function getLocalUserComplete(user) {
  return { type: types.AUTH_GET_LOCAL_USER_COMPLETE, user };
}

export const setLocalUser = user => {
  return { type: types.AUTH_SET_LOCAL_USER, user };
};

export function loadUserSuccess(user) {
  return { type: types.USER_GET_SUCCESS, user };
}


// actions
export function loginUser(email, password) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .login(email, password)
      .then(user => {
        dispatch(loginSuccess(user));
        dispatch(setLocalUser({ ...user, email }));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getLocalUser() {
  return function (dispatch) {
    return userApi.getLocalUser().then(user => {
      dispatch(getLocalUserComplete(user));
    });
  };
}

export function loadUser() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUser()
      .then(user => {
        dispatch(loadUserSuccess(user));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
