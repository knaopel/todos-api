import React from 'react';
import { screen } from '@testing-library/react';

import App from './App';
import { render } from './test-utils'
import store from './app/store';

describe('App component', () => {
  test('render parent box', () => {
    render(<App />);
    const parentBox = screen.getByTestId('parent-box');
    expect(parentBox).toBeInTheDocument();
  });
  // test('loads local user when present', async () => {
  //   // arrange
  //   const mockUser = { email: 'fake@fake.it', auth_token: 'fake_token' };
  //   localStorage.setItem('user', JSON.stringify(mockUser));
  //   render(<App />);
  //   // act

  //   // assert
  //   const state = store.getState().user
  //   // expect(await state.entity).toBe(mockUser);
  //   // expect(await screen.getByText(mockUser.email)).toBeInTheDocument();
  // })
});
