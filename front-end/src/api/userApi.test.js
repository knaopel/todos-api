import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as userApi from './userApi';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

describe('userApi tests', () => {
  describe('user signup', () => {
    let params;
    beforeEach(() => {
      params = {};
    });
    it('should handle error', async () => {
      // arrange
      const errData = { error: 'Error' };
      mock.onPost(`${baseUrl}/signup`).reply(422, errData);
      // act
      const func = async () => await userApi.signupUser(params);
      // assert
      await expect(func()).rejects.toThrowError(
        'Request failed with status code 422'
      );
    });
    it('should return data on post', async () => {
      // arrange
      const params = {};
      const result = { message: 'Mock message', auth_token: 'mock_token' };
      mock
        .onPost(`${baseUrl}/signup`)
        .reply(201, { message: 'Mock message', auth_token: 'mock_token' });
      // act
      const data = await userApi.signupUser(params);
      // assert
      expect(data).toEqual(result);
    });
  });
  describe('user Login', () => {
    let userData;
    beforeEach(() => {
      userData = { email: 'me@email.io', auth_token: 'mock_token' };
    });
    it('should throw error', async () => {
      // arrange
      mock.onPost(`${baseUrl}/auth/login`, userData).reply(401, {});
      // act
      const func = async () => await userApi.login(userData);
      // assert
      await expect(func()).rejects.toThrow();
    });
    it('should return login user', async () => {
      // arrange
      mock.onPost(`${baseUrl}/auth/login`).reply(200, userData);
      // act
      const data = await userApi.login({ faker: 'fake' });
      // assert
      expect(data).toEqual(userData);
    });
  });
  describe('invite user', () => {
    const path = '/user/invite';
    it('should throw error', async () => {
      // arrange
      mock.onPost(baseUrl + path, {}).reply(422, {});
      // act
      const func = async () => await userApi.inviteUser({});
      // assert
      await expect(func()).rejects.toThrow();
    });
    it('should return success', async () => {
      // arrange
      const respData = { message: 'Invited', user: {} };
      mock.onPost(baseUrl + path).reply(200, respData);
      // act
      const data = await userApi.inviteUser({
        email: 'fake@faker.io',
        honey_or_dewer: 'honey',
      });
      // assert
      expect(data).toEqual(respData);
    });
  });
  describe('set Local User', () => {
    it('saves user to local storage', async () => {
      // arrange
      const userData = {
        name: 'Bilbo',
        email: 'bbaggins@theshire.co',
        auth_token: 'mocker_token',
      };
      // act
      const expectedUser = await userApi.setLocalUser(userData);
      const actualUser = JSON.parse(localStorage.getItem(userApi.KEY_NAME));
      // assert
      expect(expectedUser).toEqual(actualUser);
    });
  });
  describe('get Local User', () => {
    it('retrieves user from local storage', async () => {
      // arrange
      const userData = {
        name: 'Frodo',
        email: 'fbaggins@theshire.co',
        auth_token: 'mocker_token',
      };
      const userStr = JSON.stringify(userData);
      localStorage.setItem(userApi.KEY_NAME, userStr);
      // act
      const actualUser = await userApi.getLocalUser();
      // assert
      expect(actualUser).toEqual(userData);
    });
  });
  describe('remove local User', () => {
    it('removes user from local storage', () => {
      // arrange
      const userData = {
        name: 'Gandolf',
        email: 'olegrey@twarklocksrus.com',
        auth_token: 'mocker_token',
      };
      const userStr = JSON.stringify(userData);
      localStorage.setItem(userApi.KEY_NAME, userStr);
      const storedUser = JSON.parse(localStorage.getItem(userApi.KEY_NAME));
      // act
      userApi.removeLocalUser();
      const resultUser = JSON.parse(localStorage.getItem(userApi.KEY_NAME));
      // assert
      expect(storedUser).toEqual(userData);
      expect(resultUser).toBeNull();
    });
  });
  describe('load User from api', () => {
    const path = '/user';
    it('should throw error', async () => {
      // arrange
      mock.onPost(baseUrl + path).reply(422, {});
      // act
      const func = async () => await userApi.loadUser();
      // assert
      await expect(func()).rejects.toThrow();
    });
    it('should return success', async () => {
      // arrange
      const respData = {
        name: 'Gimli',
        email: 'bigman@dwarf.kingdom',
      };
      mock.onGet(baseUrl + path).reply(200, respData);
      // act
      const resultData = await userApi.loadUser('fake_token');
      // assert
      expect(respData).toEqual(resultData);
    });
  });
  describe('user exists', () => {
    const path = '/user/exists';
    const email = 'bbaggins@theshire.co.uk';
    const auth_token = 'fake_token';

    it('should throw error', async () => {
      // arrange
      mock.onPost(baseUrl + path).reply(422, {});
      // act
      const func = async () => await userApi.userExists(email, auth_token);
      // assert
      await expect(func()).rejects.toThrow();
    });
    it('should return success', async () => {
      // arrange
      const respData = { exists: true, user: {} };
      mock.onPost(baseUrl + path).reply(200, respData);
      // act
      const resultData = await userApi.userExists(email, auth_token);
      // assert
      expect(respData).toEqual(resultData);
    });
  });
  describe('save user', () => {
    const path = '/user';
    const user = {
      name: 'Gimli',
      email: 'bigman@dwarf.kingdom',
    };
    const auth_token = 'fake_token';

    it('should throw error', async () => {
      // arrange
      mock.onPut(baseUrl + path).reply(422, {});
      // act
      const func = async () => await userApi.saveUser(user, auth_token);
      // assert
      await expect(func()).rejects.toThrow();
    });
    it('should return success', async () => {
      // arrange
      mock.onPut(baseUrl + path).reply(200, user);
      // act
      const resultData = await userApi.saveUser(user, auth_token);
      // assert
      expect(resultData).toEqual(user);
    });
  });
  describe('accept invitation', () => {
    const path = '/acceptinvitation';
    const params = {
      password_reset_token: 'reset_token',
      name: 'Gimli',
      password: 'password',
    };
    const auth_token = 'fake_token';

    it('should throw error', async () => {
      // arrange
      mock.onPost(baseUrl + path).reply(422, {});
      // act
      const func = async () => await userApi.acceptInvitation(params);
      // assert
      await expect(func()).rejects.toThrow();
    });
    it('should return success', async () => {
      // arrange
      mock.onPost(baseUrl + path).reply(200, { auth_token });
      // act
      const resultData = await userApi.acceptInvitation(params);
      // assert
      expect(resultData).toEqual({ auth_token });
    });
  });
});
