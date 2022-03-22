import React from 'react';
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import rootStore from './app/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const RouterSnackbarWrapper = ({ children, store }) => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Routes>
            <Route path='*' element={children} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

const RouterWrapper = ({ children, shouldUseSnackbar, store }) => {
  if (shouldUseSnackbar) {
    return <RouterSnackbarWrapper children={children} store={store} />
  }
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='*' element={children} />
        </Routes>
      </Router>
    </Provider>
  );
};

const customRender = (ui, { shouldUseRouter, shouldUseSnackbar, store = rootStore,
  ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    if (shouldUseRouter) {
      return (
        <RouterWrapper shouldUseSnackbar={shouldUseSnackbar} store={store} children={children} />
      )
    }
    return <Provider store={store}>{children}</Provider>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { customRender as render };