import * as userApi from '../../../api/userApi';
import { thunkStatus } from '../../../util';

export const fetchLocalUserReducer = state => {
  const data = userApi.getLocalUser();
  if (data) {
    state.entity = { ...state.entity, ...data };
  } else {
    state.status = thunkStatus.failed;
  }
};
