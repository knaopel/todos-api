import React from 'react';
// import { screen } from '@testing-library/react';

import { render } from '../../../test-utils';
import Router from './Router';
import { KEY_NAME } from '../../../api/userApi';
import store from '../../store';

describe('Router component', () => {
  beforeEach(() => {
    localStorage.removeItem(KEY_NAME);
  });
  test('loads user from localstorage when present', () => {
    // arrange
    const mockLocalUser = { email: 'router@email.com', auth_token: 'router_token' };
    localStorage.setItem(KEY_NAME, JSON.stringify(mockLocalUser))
    // act
    render(<Router />);

    // assert
    let state = store.getState().user;
    expect(state.entity.email).toBe(mockLocalUser.email);
    expect(state.entity.auth_token).toBe(mockLocalUser.auth_token);
    expect(state.isLocal).toBe(true);
  });
});