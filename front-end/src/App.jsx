import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import { Login, Home, Signup, Todo } from './pages';
import { Copyright, Header } from './components';

import theme from './util/theme';

import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', p: '1em' }}>
      <CssBaseline />
      <Header />
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path='signup' element={<Signup />} />
            <Route path='todos'>
              <Route path='new' element={<Todo />} />
              <Route path=':id' element={<Todo view />} />
              <Route path=':id/edit' element={<Todo edit />} />
              <Route path='' element={<div>Nothing to see here</div>} />
            </Route>
          </Routes>
        </Router>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  </ThemeProvider>
);
export default App;