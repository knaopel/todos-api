import { fetchLocalUser } from './usersSlice';
import store from '../../app/store';

const TEST_KEY = 'user';

describe('UsersSlice Test Suite', () => {
  it('should get local user', () => {
    // arrange
    const mockUser = {
      email: 'fake@fake.it',
      auth_token: 'fake_token',
      name: '',
    };
    localStorage.setItem(TEST_KEY, JSON.stringify(mockUser));
    // act
    store.dispatch(fetchLocalUser());
    const state = store.getState();
    // assert
    expect(state.user.entity).toEqual(mockUser);
    expect(state.user.isLocal).toBe(true);
  });
});
