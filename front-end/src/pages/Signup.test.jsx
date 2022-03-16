import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../test-utils';
import Signup from './Signup';

describe('Signup Page Test Suite', () => {
  beforeEach(() => {
    render(<Signup />, { shouldUseRouter: true });
  });
  test('signup form renders', () => {
    expect(screen.queryByRole('heading','Sign Up')).toBeInTheDocument();
  });
  test('submitting form calls signupUser',()=>{
    
  })
});