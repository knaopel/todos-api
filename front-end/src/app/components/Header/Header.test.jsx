import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../test-utils'
import Header from './Header';

describe('Header Test Suite', () => {
  test('should have app name', () => {
    render(<Header />, { shouldUseRouter: true });
    expect(screen.getByText(/Honey Dew/)).toBeInTheDocument();
  });
});
