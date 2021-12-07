import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { apiCallError, beginApiCall } from './apiStatusActions';

export function loadUserSuccess(user) {
  return { type: types.USER_GET_SUCCESS, user };
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
