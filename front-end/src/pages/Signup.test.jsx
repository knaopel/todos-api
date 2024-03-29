import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { signupUser } from '../features/users/usersSlice';
import { render } from '../test-utils';
import Signup from './Signup';

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch
}));


describe('Signup Page Test Suite', () => {
  beforeEach(() => {
    render(<Signup />, { shouldUseRouter: true, shouldUseSnackbar: true });
  });
  test('signup form renders', () => {
    expect(screen.queryByRole('heading', 'Sign Up')).toBeInTheDocument();
  });
  test('submitting form calls signupUser', () => {
    // arrange
    const nameInput = screen.getByRole('textbox', { id: 'name', name: 'Name' });
    const emailInput = screen.getByRole('textbox', { id: 'email', name: 'Email' });
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { type: 'submit' });
    // act
    userEvent.type(nameInput, 'fake name');
    userEvent.type(emailInput, 'fake@email.io');
    userEvent.type(passwordInput, 'password');
    fireEvent.click(submitButton);
    // assert
    expect(mockedDispatch).toHaveBeenCalled();
  })
});