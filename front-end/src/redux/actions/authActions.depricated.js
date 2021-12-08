import * as types from './actionTypes';
import * as authApi from '../../api/loginApi';
import * as userApi from '../../api/userApi';
import { apiCallError, beginApiCall } from './apiStatusActions';

export function loginSucess(user) {
  return { type: types.AUTH_LOGIN_SUCESS, user };
}

export function getLocalUserComplete(user) {
  return { type: types.AUTH_GET_LOCAL_USER_COMPLETE, user };
}

export function loginUser(email, password) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authApi
      .login(email, password)
      .then(user => {
        dispatch(loginSucess(user));
        dispatch(setLocalUser({ ...user, email }));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export const setLocalUser = user => {
  return { type: types.AUTH_SET_LOCAL_USER, user };
};

export function getLocalUser() {
  return function (dispatch) {
    return userApi.getLocalUser().then(user => {
      dispatch(getLocalUserComplete(user));
    });
  };
}
