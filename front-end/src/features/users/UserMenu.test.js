import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import UserMenu from './UserMenu';

// import { render } from '../test-utils';
// import App from '../App';

describe('UserMenu Test Suite', () => {
  beforeAll(() => {
    render(<UserMenu />, { shouldUseRouter: true });
  });
  it('Should have no user email on init', () => {
    // arrange
    // act
    // const appHeader = screen.getByTestId('app-header');
    // assert
    expect(screen.queryByText(/new\@email\.io/i)).not.toBeInTheDocument();
  });
  test('Should have spinner when loading',()=>{
    // arrange
    // act

    // assert
  });
});
