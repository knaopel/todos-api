import store from '../../../app/store';
import { fetchLocalUser, logoutUser } from '../usersSlice';

describe('fetchLocalUserReducer test suite', () => {
  beforeEach(() => {
    // clear user before the test
    store.dispatch(logoutUser());
  });
  test('gets user when present ing localStorage', () => {
    // arrange
    const expectedUser = { email: 'fake@email.com', auth_token: 'fake_token' };
    let state = store.getState().user;
    expect(state.entity.name).toBe('');

    // act
    localStorage.setItem('user', JSON.stringify(expectedUser));
    store.dispatch(fetchLocalUser());

    // assert
    state = store.getState().user;
    expect(state.entity.auth_token).toBe(expectedUser.auth_token);
    expect(state.entity.email).toBe(expectedUser.email);
  });
  test('sets status to "failed" when there is no local user', () => {
    // arrange
    let state = store.getState().user;
    expect(state.entity.auth_token).toBeNull();

    // act
    store.dispatch(fetchLocalUser());

    // assert
    state = store.getState().user;
    expect(state.entity.name).toBe('');
    expect(state.entity.email).toBe('');
    expect(state.entity.auth_token).toBeNull();
    expect(state.status).toBe('failed');
  });
});
