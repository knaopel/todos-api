import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import store from '../../../app/store';
import { initialState, logoutUser } from '../usersSlice';
import { loginUser } from './loginUserReducer';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

describe('loginUserReducer Test Suite', () => {
  beforeEach(() => {
    // clear out store
    store.dispatch(logoutUser());
  });
  test('sets user auth_token in store after login', async () => {
    // arrange
    mock
      .onPost(`${baseUrl}/auth/login`)
      .reply(200, { auth_token: 'fake_token' });
    const mockUserCredentials = {
      email: 'ginger@who.net',
      password: 'password',
    };
    let state = store.getState().user;
    expect(state.entity).toEqual(initialState.entity);

    // act
    await store.dispatch(loginUser(mockUserCredentials));

    // assert
    state = store.getState().user;
    expect(state.entity.auth_token).toBe('fake_token');
  });
  test('store should error on 401',async()=>{
    // arrange
    mock
      .onPost(`${baseUrl}/auth/login`)
      .reply(401,{});
      let state = store.getState().user;
      expect(state.entity).toEqual(initialState.entity);
  
      // act
      await store.dispatch(loginUser({}));

      // assert
      state = store.getState().user;
      expect(state.status).toBe('failed');
      expect(state.entity.auth_token).toBeNull();
      expect(state.error.message).toBe('Request failed with status code 401');  
  })
});
