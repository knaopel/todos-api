import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = null, action) {
  switch (action.type) {
    case types.AUTH_LOGIN:
    default:
      return state;
  }
}
