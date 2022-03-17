import * as userApi from '../../../api/userApi';

export const fetchLocalUserReducer = state => {
  const data = userApi.getLocalUser();
  if (data) {
    state.entity = { ...state.entity, ...data };
    state.isLocal = true;
  } else {
    state.isLocal = false;
  }
};
