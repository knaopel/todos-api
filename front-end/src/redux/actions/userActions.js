import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { apiCallError, beginApiCall } from './apiStatusActions';

// dispatches
export function logoutComplete() {
  return { type: types.USER_LOGOUT_COMPLETE };
}
export function loginSuccess(user) {
  return { type: types.USER_LOGIN_SUCCESS, user };
}

export const updateUserSuccess = user => {
  return { type: types.USER_UPDATE_SUCCESS, user };
};

export function signupSuccess(user) {
  return { type: types.USER_SIGNUP_SUCCESS, user };
}

export function getLocalUserComplete(user) {
  return { type: types.USER_GET_LOCAL_COMPLETE, user };
}

export const setLocalUserComplete = user => {
  return { type: types.USER_SET_LOCAL_COMPLETE, user };
};

export function loadUserSuccess(user) {
  return { type: types.USER_LOAD_SUCCESS, user };
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

export function signupUser(params) {
  const { email, name } = params;
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .signupUser(params)
      .then(user => {
        dispatch(signupSuccess(user));
        dispatch(setLocalUser({ ...user, email, name }));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateUser(user, auth_token) {
  const { email, name } = user;
  return (dispatch) => {
    dispatch(beginApiCall());
    return userApi
      .saveUser(user, auth_token)
      .then(user => {
        dispatch(updateUserSuccess(user));
        dispatch(setLocalUser({ ...user, email, name }));
      })
      .catch(err => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function logoutUser() {
  return function (dispatch) {
    return userApi.removeLocalUser()
      .then(msg => {
        dispatch(logoutComplete());
      })
      .catch(error => {
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

export function setLocalUser(user) {
  return function (dispatch) {
    return userApi.setLocalUser(user).then(user => {
      dispatch(setLocalUserComplete(user));
    });
  };
}

export function loadUser(auth_token) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi
      .loadUser(auth_token)
      .then(user => {
        dispatch(loadUserSuccess(user));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
