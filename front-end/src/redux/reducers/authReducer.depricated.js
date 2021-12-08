import * as types from '../actions/actionTypes';
import initialState from './initialState';
const KEY_NAME = 'user';

export default function authReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCESS:
      return action.user;
    case types.AUTH_GET_LOCAL_USER_COMPLETE:
      return action.user;
    // case types.AUTH_GET_LOCAL_USER:
    //   const userStr = localStorage.getItem(KEY_NAME);
    //   const user = JSON.parse(userStr);
    //   return user;
    case types.AUTH_SET_LOCAL_USER:
      localStorage.setItem(KEY_NAME, JSON.stringify(action.user));
      return action.user;
    default:
      return state;
  }
}

export const getLocalUser = () => {
  return new Promise(resolve => {
    const userStr = localStorage.getItem(KEY_NAME);
    const user = JSON.parse(userStr);
    resolve(user);
  });
};
