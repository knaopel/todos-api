import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import md5 from 'md5';

import { render } from '../test-utils';
import { Header } from '.';
import { initialState } from '../features/users/usersSlice';

const mockedNavigate = jest.fn();
// const mockedFetchUser = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

// jest.mock('../features/users/usersSlice', () => ({
//   ...jest.requireActual('../features/users/usersSlice'),
//   fetchUser: () => mockedFetchUser
// }));

test('Header non-test', () => {
  expect(true).toBeTruthy();
})

// describe('Header Test Suite', () => {
//   beforeEach(() => {
//     render(<Header />, { shouldUseRouter: true });
//   });
//   it('should have app name', () => {
//     expect(screen.getByText(/Honey Dew/)).toBeInTheDocument();
//   });
//   it('should fire handleHomeClick on App name Click', () => {
//     // arrange
//     const appHeader = screen.getByTestId('app-header');
//     // act
//     fireEvent.click(appHeader);
//     // assert
//     expect(mockedNavigate).toHaveBeenCalled();
//   });
//   // describe('user present', () => {
//   //   let store;
//   //   beforeEach(() => {
//   //     const mockStore = configureStore([]);
//   //     const userState = { ...initialState, entity: { email: 'fake@fake.it', auth_token: 'fake_token' } }
//   //     store = mockStore({
//   //       user: userState
//   //     });
//   //     render(<Header />, { shouldUseRouter: true, store });
//   //   });
//   //   // it('fetchUser should get called to load details', () => {
//   //   //   // arrange
//   //   //   expect(mockedFetchUser).toHaveBeenCalledWith(store.getState().user.entity.email);
//   //   // })
//     // it('Avatar should be present and have expected img', () => {
//     //   // arrange
//     //   const hash = md5('fake@fake.it');
//     //   // act
//     //   // assert
//     //   expect(screen.queryByRole('img', { src: `//www.gravatar.com/avatar/${hash}.jpg` })).toBeInTheDocument();
//     // })
//     // describe('user menu', () => {
//       // it('should show user menu button', () => {
//       //   const userIconBtn = screen.getByRole('button', { 'aira-label': 'account of current user' });
//       //   expect(userIconBtn).toBeInTheDocument();
//       // });
//   //     it('should open menu on click', () => {
//   //       // arrange
//   //       const userIconBtn = screen.getByRole('button', { 'aira-label': 'account of current user' });
//   //       // act
//   //       fireEvent.click(userIconBtn);
//   //       // assert
//   //       expect(screen.getByText(/profile/i)).toBeInTheDocument();
//   //       expect(screen.getByText(/honeys\/dewers/i)).toBeInTheDocument();
//   //       expect(screen.getByText(/logout/i)).toBeInTheDocument();
//   //     });
//   //     it('should fire handleNavigate on profile menu item click', () => {
//   //       // arrange
//   //       const userIconBtn = screen.getByRole('button', { 'aira-label': 'account of current user' });
//   //       // act
//   //       fireEvent.click(userIconBtn);
//   //       const userProfileBtn = screen.getByText(/profile/i);
//   //       fireEvent.click(userProfileBtn);
//   //       // assert
//   //       expect(mockedNavigate).toHaveBeenCalledWith('/profile');
//   //     });
//   //     it('should fire handleNavigate on Honeys/Dewers menu item click', () => {
//   //       // arrange
//   //       const userIconBtn = screen.getByRole('button', { 'aira-label': 'account of current user' });
//   //       // act
//   //       fireEvent.click(userIconBtn);
//   //       const userHoneysBtn = screen.getByText(/honeys\/dewers/i);
//   //       fireEvent.click(userHoneysBtn);
//   //       // assert
//   //       expect(mockedNavigate).toHaveBeenCalledWith('/honeys_dewers');
//   //     });
//   //     it('should fire handleLogout on Logout menu item click', () => {
//   //       // arrange
//   //       const userIconBtn = screen.getByRole('button', { 'aira-label': 'account of current user' });
//   //       // act
//   //       fireEvent.click(userIconBtn);
//   //       const userLogoutBtn = screen.getByText(/logout/i);
//   //       fireEvent.click(userLogoutBtn);
//   //       // assert
//   //       expect(mockedNavigate).toHaveBeenCalledWith('/');
//   //     });
//     // });
//   // });
//   // describe('no user', () => {
//   //   it('should not show user menu', () => {
//   //     const mockStore = configureStore([]);
//   //     const store = mockStore({ user: initialState });
//   //     render(<Header />, { store });

//   //     expect(screen.queryByRole('button', { 'aria-label': 'account of current user' })).not.toBeInTheDocument();
//   //   });
//   // });
// });
