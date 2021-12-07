import * as types from './actionTypes';
import * as authApi from '../../api/loginApi';
import { apiCallError, beginApiCall } from './apiStatusActions';

export function loginSucess(user) {
  return { type: types.AUTH_LOGIN_SUCESS, user };
}

// export const getTokenResult = (token) => {
//   return { type: types.AUTH_GET_TOKEN, token };
// };

export function loginUser(email, password) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authApi
      .login(email, password)
      .then(user => {
        dispatch(setLocalUser(user));
        dispatch(loginSucess(user));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export const setLocalUser = (user) => {
  return { type: types.AUTH_SET_LOCAL_USER, user };
};

// export function getToken() {
//   return { type: types.AUTH_GET_TOKEN };
// }