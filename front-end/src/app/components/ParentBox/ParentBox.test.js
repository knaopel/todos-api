import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '../../../test-utils';
import ParentBox from './ParentBox';

describe('ParentBox component', () => {
  test('render parent box', () => {
    render(<ParentBox />);
    const parentBox = screen.getByTestId('parent-box');
    expect(parentBox).toBeInTheDocument();
  });
});
