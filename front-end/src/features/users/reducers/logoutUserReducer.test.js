import store from '../../../app/store';
import { fetchLocalUser, initialState, logoutUser } from '../usersSlice';

const TEST_KEY = 'user';

test('logoutUserReducer test', () => {
  // arrange
  const fakeUser = {
    name: '',
    email: 'fake@email.com',
    auth_token: 'fake_token',
  };
  localStorage.setItem(TEST_KEY, JSON.stringify(fakeUser));
  store.dispatch(fetchLocalUser());
  let state = store.getState().user;
  expect(state.entity).toEqual(fakeUser);

  // act
  store.dispatch(logoutUser());

  // assert
  state = store.getState().user;
  expect(state).toBe(initialState);
  expect(localStorage.getItem(TEST_KEY)).toBeNull();
});
