import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOGOUT_COMPLETE:
      return initialState.user;
    case types.USER_LOGIN_SUCCESS:
    case types.USER_SIGNUP_SUCCESS:
    case types.USER_UPDATE_SUCCESS:
    case types.USER_GET_LOCAL_COMPLETE:
      return action.user || initialState.user;
    case types.USER_LOAD_SUCCESS:
      return { ...state, ...action.user };
    case types.HONEYS_LOAD_SUCCESS:
      return { ...state, honeys: { isLoaded: true, items: action.honeys } };
    case types.HONEY_ADD_SUCCESS:
      return {
        ...state,
        honeys: {
          items: [
            ...state.honeys.items,
            action.honey
          ]
        }
      };
    case types.DEWERS_LOAD_SUCCESS:
      return { ...state, dewers: { isLoaded: true, items: action.dewers } };
    case types.DEWER_ADD_SUCCESS:
      return {
        ...state,
        dewers: {
          items: [
            ...state.dewers.items,
            action.dewer
          ]
        }
      };
    case types.USER_SET_LOCAL_COMPLETE:
    default:
      return state;
  }
}
