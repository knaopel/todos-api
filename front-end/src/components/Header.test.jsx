import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { render } from '../test-utils';
import { Header } from '.';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}))

describe('Header Test Suite', () => {
  beforeEach(() => {
    render(<Header />, { shouldUseRouter: true });
  });
  it('should have app name', () => {
    expect(screen.getByText(/Honey Dew/)).toBeInTheDocument();
  });
  it('should fire handleHomeClick on App name Click', () => {
    // arrange
    const appHeader = screen.getByTestId('app-header');
    // act
    fireEvent.click(appHeader);
    // assert
    expect(mockedNavigate).toHaveBeenCalled();
  });
  describe('user present', () => {
    it('should show user menu', () => {
      // TODO: implementation here
      expect(true).toBeTruthy();
    });
  });
  describe('no user', () => {
    it('should not show user menu', () => {
      // TODO: implementation here
      expect(true).toBeTruthy();
    });
  });
});
