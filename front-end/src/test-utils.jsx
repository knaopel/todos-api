import React from 'react';
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'

import rootStore from './app/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const render = (ui, { shouldUseRouter, store = rootStore,
  ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    if (shouldUseRouter) {
      return (
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path='*' element={children} />
            </Routes>
            {/* {children} */}
          </Router>
        </Provider>
      )
    }
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export { render };