import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '../test-utils';
import { Header } from '.';

// let mockedUseNavigate = jest.fn();

// jest.mock('react-router-dom');

describe('Header Test Suite', () => {
  beforeEach(()=>{
    render(<Header />, { shouldUseRouter: true });
  });
  it('should have app name', () => {
    expect(screen.getByText(/Honey Dew/)).toBeInTheDocument();
  });
  // it('should fire handleHomeClick on App name Click', () => {
  //   render(<Header />, { shouldUseRouter: true });
  //   const appHeader = screen.getByTestId('app-header');
  //   // reactRouterDom.mockImplementation(() => {
  //   //   return {
  //   //     useNavigate: mockedUseNavigate,
  //   //   };
  //   // });
  //   // const mockImpl = jest.fn().mockImplementation(to=>{
  //   //   console.log('mocked to ', to);
  //   // });
  //   fireEvent.click(appHeader);
  //   // expect(mockedUseNavigate).toHaveBeenCalled();
  // });
});
