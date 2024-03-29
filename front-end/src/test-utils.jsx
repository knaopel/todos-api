import React from 'react';
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import rootStore from './app/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';


const customRender = (ui, { shouldUseRouter, store = rootStore, ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    if (shouldUseRouter) {
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
      )
    }
    return <Provider store={store}>{children}</Provider>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { customRender as render };