import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import { Login, Home, Signup, Todo, HoneysDewers } from './pages';
import { Copyright, Header } from './components';

import { theme } from './util';

import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import { selectUser } from './features/users/usersSlice';

// const App = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const userFetchStatus = useSelector(selectUserFetchStatus);

//   return (
//     <div>
//       {/* Display the current user name */}
//       <div data-testid="userName">{user}</div>
//       {/* On button click, dispatch a thunk action to fetch a user */}
//       <button onClick={() => dispatch(fetchUser('auth_token'))}>Fetch User</button>
//       {/* At any point if we're fetching a user, displaay that on the UI */}
//       {userFetchStatus === 'loading' && <div>Fetching user...</div>}
//     </div>
//   );
// }

// export default App;

const App = () => {
  const user = useSelector(selectUser);

 return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', p: '1em' }} data-testid="parent-box">
        <CssBaseline />
        <Router>
          <Header />
          <Box component='main' sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Routes>
              <Route exact path='/' element={<Home user={user} />} />
              <Route exact path='login' element={<Login />} />
              <Route exact path='signup' element={<Signup />} />
              {/* <Route path="accept-invitation/:token" element={<AcceptInvitation />} /> */}
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

export default App;