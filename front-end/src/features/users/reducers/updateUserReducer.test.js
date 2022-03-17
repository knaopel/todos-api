import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../app/store';
import { logoutUser } from '../usersSlice';
import { fetchUser } from './fetchUserReducer';
import { loginUser } from './loginUserReducer';
import { updateUser } from './updateUserReducer';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

const mockOGUser = { name: 'Amy Pond', email: 'ginger@who.net' };
const mockUserToUpdate = { name: 'Summer Wind', email: 'summer@who.net' };
mock.onPost(`${baseUrl}/auth/login`).reply(200, { auth_token: 'fake_token' });
mock.onGet(`${baseUrl}/user`).reply(200, mockOGUser);

describe('updateUserReducer test suite', () => {
  beforeEach(() => {
    store.dispatch(logoutUser());
  });
  test('sets store after put', async () => {
    // arrange
    mock.onPut(`${baseUrl}/user`).reply(200, mockUserToUpdate);
    await store.dispatch(loginUser({}));

    let state = store.getState().user;
    expect(state.entity.auth_token).toEqual('fake_token');

    await store.dispatch(fetchUser());

    // act
    await store.dispatch(updateUser(mockUserToUpdate));

    // assert
    state = store.getState().user;
    expect(state.entity.auth_token).toEqual('fake_token');
    expect(state.entity.name).toEqual(mockUserToUpdate.name);
    expect(state.entity.email).toEqual(mockUserToUpdate.email);
  });
  test('sets status as failed on bad response', async () => {
    // arrange
    mock.onPut(`${baseUrl}/user`).reply(422, { message: 'failed!' });
    await store.dispatch(loginUser({}));

    let state = store.getState().user;
    expect(state.entity.auth_token).toEqual('fake_token');

    await store.dispatch(fetchUser());

    // act
    await store.dispatch(updateUser(mockUserToUpdate));

    // assert
    state = store.getState().user;
    expect(state.entity.auth_token).toEqual('fake_token');
    expect(state.status).toEqual('failed');
    expect(state.error.message).toEqual('Request failed with status code 422');
  });
});
