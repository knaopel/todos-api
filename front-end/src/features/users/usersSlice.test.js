import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  fetchUser,
  initialState,
  loginUser,
  signupUser,
  updateUser,
} from './usersSlice';
import store from '../../app/store';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

const goodUser = {
  name: 'Amy Pond',
  email: 'gingersnap@who.net',
  auth_token: 'fake_token',
};
const userCredentials = {
  email: goodUser.email,
  password: 'password',
};

describe('UsersSlice Test Suite', () => {
  describe('Store tests', () => {
    it('should initially have an empty user object', () => {
      const state = store.getState().user;
      expect(state).toEqual(initialState);
    });
  });

  describe('signupUser', () => {
    it('Should signup user', async () => {
      // arrange
      mock.onPost(`${baseUrl}/signup`).reply(201, { auth_token: 'fake_token' });
      // act
      const result = await store.dispatch(signupUser({}));
      let state = store.getState().user;
      // assert
      expect(state.entity.auth_token).toEqual('fake_token');
    });
  });
  describe('login User', () => {
    it('Should login user with api success', async () => {
      // arrange
      mock.onPost(`${baseUrl}/auth/login`).reply(200, goodUser);

      // act
      const result = await store.dispatch(loginUser(userCredentials));
      let state = store.getState().user;
      // assert
      expect(state.entity.auth_token).toEqual('fake_token');
      expect(state.status).toEqual('succeeded');
    });
    it('should fail on bad api call', async () => {
      // arrange
      mock.onPost(`${baseUrl}/auth/login`).reply(401);
      // act
      const result = await store.dispatch(loginUser(userCredentials));
      const state = store.getState().user;
      // assert
      expect(state.status).toEqual('failed');
      expect(state.entity.auth_token).toBeNull();
    });
  });
  describe('get User', () => {
    it('Should get user with api success', async () => {
      // arrange
      const expectedState = {
        ...initialState,
        entity: goodUser,
        status: 'succeeded',
      };
      mock.onGet(`${baseUrl}/user`).reply(200, goodUser);

      // act
      const result = await store.dispatch(fetchUser('fake_token'));
      const state = store.getState().user;

      // assert
      expect(state).toEqual(expectedState);
    });
    it('should fail on bad api call', async () => {
      // arrange
      mock.onGet(`${baseUrl}/user`).reply(401);
      // act
      const result = await store.dispatch(fetchUser());
      const state = store.getState().user;
      // assert
      expect(state.status).toEqual('failed');
    });
  });
  describe('update user', () => {
    const updatedUser = { ...goodUser, email: 'new@email.io' };
    it('Should update user with api success', async () => {
      // arrange
      const expectedState = {
        ...initialState,
        entity: updatedUser,
        status: 'succeeded',
      };
      mock.onPut(`${baseUrl}/user`).reply(200, updatedUser);
      // act
      const result = await store.dispatch(
        updateUser(updatedUser, 'fake_token')
      );
      const state = store.getState().user;
      // assert
      expect(state).toEqual(expectedState);
    });
    it('Should fail on bad api call', async () => {
      // arrange
      mock.onPut(`${baseUrl}/user`).reply(401);
      // act
      const result = await store.dispatch(
        updateUser(updatedUser, 'fake_token')
      );
      const state = store.getState().user;
      // assert
      expect(state.status).toEqual('failed');
    });
  });
});
