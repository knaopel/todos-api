import { combineReducers } from 'redux';
import apiCallsInProgress from './apiStatusReducer';
import todos from './todoReducer';

const rootReducer = combineReducers({
  todos,
  apiCallsInProgress
});

export default rootReducer;