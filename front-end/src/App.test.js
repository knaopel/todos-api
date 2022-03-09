import React from 'react';
import App from './App';
import { screen } from '@testing-library/react';
import { render } from './test-utils';

describe('App component', () => {
  test('full app rendering & navigating', () => {
    render(<App />);

    // should show no user initially, and not be fetching a user
    expect(screen.getByTestId('app-header')).toBeInTheDocument();
  });
});
