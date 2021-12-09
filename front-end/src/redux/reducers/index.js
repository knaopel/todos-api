import { combineReducers } from 'redux';
import apiCallsInProgress from './apiStatusReducer';
import todos from './todoReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  user,
  todos,
  apiCallsInProgress
});

export default rootReducer;