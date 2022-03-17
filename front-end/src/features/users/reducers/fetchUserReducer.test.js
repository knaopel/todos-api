import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../app/store';
import { logoutUser } from '../usersSlice';
import { fetchUser } from './fetchUserReducer';
import { loginUser } from './loginUserReducer';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

describe('fetchUserReducer test suite', () => {
  beforeEach(() => {
    store.dispatch(logoutUser());
  });
  test('sets store after fetch', async () => {
    // arrange
    const mockUser = { name: 'Amy Pond', email: 'ginger@who.net' };
    mock.onGet(`${baseUrl}/user`).reply(200, mockUser);
    mock
      .onPost(`${baseUrl}/auth/login`)
      .reply(200, { auth_token: 'fake_token' });

    await store.dispatch(loginUser({}));
    
    let state = store.getState().user;
    expect(state.entity.auth_token).toEqual('fake_token');

    // act
    await store.dispatch(fetchUser());

    // assert
    state = store.getState().user;
    expect(state.entity.auth_token).toEqual('fake_token');
    expect(state.entity.name).toEqual(mockUser.name);
    expect(state.entity.email).toEqual(mockUser.email);
  });
});
