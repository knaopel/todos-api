import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { users } from './user.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert
});

export default rootReducer;
