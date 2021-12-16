import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import { Login, Home, Signup, Todo, HoneysDewers } from './pages';
import { Copyright, Header } from './components';
import { getLocalUser } from './redux/actions/userActions';

import { theme } from './util';

import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { connect } from 'react-redux';
import Profile from './pages/Profile';

const App = ({ user, getLocalUser }) => {
  useEffect(() => {
    if (!user.auth_token) {
      getLocalUser();
    }
  }, [user, getLocalUser]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', p: '1em' }}>
        <CssBaseline />
        <Router>
          <Header />
          <Box component='main' sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='login' element={<Login />} />
              <Route exact path='signup' element={<Signup />} />
              {user.auth_token &&
                <>
                  <Route path='todos'>
                    <Route path='new' element={<Todo />} />
                    <Route path=':id' element={<Todo view />} />
                    <Route path=':id/edit' element={<Todo edit />} />
                    <Route path='' element={<div>Nothing to see here</div>} />
                  </Route>
                  <Route path='profile' element={<Profile />} />
                  <Route path='honeys-dewers' element={<HoneysDewers />} />
                </>}
            </Routes>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { getLocalUser })(App);