import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import store from '../app/store';
import { fetchUser, loginUser } from '../features/users/usersSlice';
import { render } from '../test-utils';
import { Home } from './Home';

const baseUrl = process.env.REACT_APP_API_URL;
const mock = new MockAdapter(axios);

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch
}));


describe('Home Page Test Suite', () => {
  beforeEach(() => {
    render(<Home />, { shouldUseRouter: true });
  });
  test('public home renders if no user signed in', () => {
    expect(screen.queryByText(/Welcome to the online, digital "Honey Dew" list!/)).toBeInTheDocument();
  });
  test('private home renders if user signed in', async () => {
    // arrange
    const mockUserCredentals = { email: 'ginger@who.net', password: 'password' };
    const mockUser = { name: 'Amy Pond', email: mockUserCredentals.email, auth_token: 'mocked_auth_token' };
    mock.onGet(`${baseUrl}/user`).reply(200, mockUser);
    // act
    await store.dispatch(fetchUser())
    // assert
    const state = store.getState().user;
    expect(state.entity).toEqual(mockUser);
    expect(screen.queryByRole('link', /Add A new HoneyDew/)).toBeInTheDocument();
    // expect(screen.queryByText('Todos')).toBeInTheDocument();
  });
  // test('submitting form calls signupUser', () => {
  //   // arrange
  //   const nameInput = screen.getByRole('textbox', { id: 'name', name: 'Name' });
  //   const emailInput = screen.getByRole('textbox', { id: 'email', name: 'Email' });
  //   const passwordInput = screen.getByLabelText(/Password/);
  //   const submitButton = screen.getByRole('button', { type: 'submit' });
  //   // act
  //   userEvent.type(nameInput, 'fake name');
  //   userEvent.type(emailInput, 'fake@email.io');
  //   userEvent.type(passwordInput, 'password');
  //   fireEvent.click(submitButton);
  //   // assert
  //   expect(mockedDispatch).toHaveBeenCalled();
  // })
});