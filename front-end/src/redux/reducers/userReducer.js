import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_GET_SUCCESS:
      return { ...state, ...action.user };
    default:
      return state;
  }
}
