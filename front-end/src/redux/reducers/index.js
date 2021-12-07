import { combineReducers } from 'redux';
import apiCallsInProgress from './apiStatusReducer';
import user from './authReducer';
import authors from './authorReducer';
import courses from './coursesReducer';
import todos from './todoReducer';
// import user from './userReducer'

const rootReducer = combineReducers({
  authors,
  user,
  courses,
  todos,
  apiCallsInProgress
});

export default rootReducer;