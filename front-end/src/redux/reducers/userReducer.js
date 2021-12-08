import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCESS:
    case types.USER_GET_LOCAL_COMPLETE:
      return action.user;
    case types.USER_GET_SUCCESS:
      return { ...state, ...action.user };
    case types.USER_SET_LOCAL:
    default:
      return state;
  }
}
