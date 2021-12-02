import { combineReducers } from 'redux';
import apiCallsInProgress from './apiStatusReducer';
import authors from './authorReducer'
import courses from './courseReducer';
import todos from './todoReducer';

const rootReducer = combineReducers({
  authors,
  courses,
  todos,
  apiCallsInProgress
});

export default rootReducer;