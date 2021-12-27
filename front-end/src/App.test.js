import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';

describe("App component", () => {
  test('renders learn react link', () => {
    render(
      <Provider store={createStore()}>
        <App />
      </Provider>
    );
    const headerElement = screen.getByText(/honey dew/i);
    expect(headerElement).toBeInTheDocument();
  });
});
