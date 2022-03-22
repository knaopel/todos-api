import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { loginUser } from '../features/users/usersSlice';
import { render } from '../test-utils';
import { Login } from './Login';

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch
}));

describe('Login Page Test Suite', () => {
  beforeEach(() => {
    render(<Login />, { shouldUseRouter: true, shouldUseSnackbar: true });
  });
  test('login form renders', () => {
    expect(screen.queryByRole('heading', 'Log In')).toBeInTheDocument();
  });
  test('submitting form calls loginUser', () => {
    // arrange
    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { type: 'submit' });
    // act
    userEvent.type(emailInput, 'fake@email.io');
    userEvent.type(passwordInput, 'password');
    fireEvent.click(submitButton);
    // assert
    expect(mockedDispatch).toHaveBeenCalled();
  })
});