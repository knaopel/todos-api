import * as userApi from '../../../api/userApi';
import { initialState } from '../usersSlice';

export const logoutUserReducer = _state => {
  userApi.removeLocalUser();
  return initialState;
};
