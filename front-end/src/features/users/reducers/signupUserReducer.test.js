import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../app/store';
import { initialState, logoutUser, signupUser } from '../usersSlice';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

describe('signupUserReducer test suite', () => {
  beforeEach(() => {
    store.dispatch(logoutUser());
  });
  test('sets store after login', async () => {
    // arrange
    mock.onPost(`${baseUrl}/signup`).reply(201, { auth_token: 'fake_token' });
    const userParams = {
      name: 'Amy Pond',
      email: 'ginger@who.net',
      password: 'password',
    };
    let state = store.getState().user;
    expect(state.entity).toEqual(initialState.entity);

    // act
    await store.dispatch(signupUser(userParams));

    // assert
    state = store.getState().user;
    expect(state.entity.auth_token).toEqual('fake_token');
  });
});
