import React from 'react';
import { screen } from '@testing-library/react';

import App from './App';
import { render } from './test-utils'

describe('App component', () => {
  test('render parent box', () => {
    render(<App />);
    const parentBox = screen.getByTestId('parent-box');
    expect(parentBox).toBeInTheDocument();
  });
});
