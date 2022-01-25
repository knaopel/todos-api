import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
// import App from './App';
import store from './app/store';
import { App1 } from './App1';
// import configureStore from './redux/configureStore';
// const store = configureStore();

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <ReduxProvider store={store}>
    {/* <App /> */}
    <App1 />
  </ReduxProvider>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
