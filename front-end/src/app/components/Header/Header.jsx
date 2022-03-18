import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// app specific imports
import { thunkStatus } from '../../../util';
import { fetchUser, selectUser, selectUserFetchStatus } from '../../../features/users/usersSlice';
import { ProfileButton } from '../ProfileButton/ProfileButton';

const Title = ({ handleHomeClick }) => {
  return (
    <Typography
      data-testid='app-header'
      variant='h6'
      component='div'
      sx={{ flexGrow: 1 }}
      align='center'
      onClick={handleHomeClick}
      className='appName'
    >
      Honey Dew
    </Typography>
  )
};

const AppToolbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userFetchStatus = useSelector(selectUserFetchStatus);
  // const userLoading = userFetchStatus === thunkStatus.pending;
  // const userFailed = userFetchStatus === thunkStatus.failed;
  const navigate = useNavigate();

  useEffect(() => {
    if (user.auth_token) {
      if (!user.name && !userFetchStatus === thunkStatus.pending) {
        dispatch(fetchUser(user.auth_token));
      }
      if (userFetchStatus === thunkStatus.failed) {
        alert('Loading user failed.' + user.error);
        if (user.error.request.status === 401) {
          navigate('/login');
        }
      }
    }
  }, [dispatch, user, userFetchStatus, navigate]);

  const handleHomeClick = () => {
    navigate('/');
  }
  return (
    <Toolbar>
      <Title handleHomeClick={handleHomeClick} />
      <ProfileButton authToken={user?.auth_token} email={user?.email} userLoading={userFetchStatus === thunkStatus.pending} />
    </Toolbar>

  )
}

const Header = () => {
  return (
    <AppBar position='absolute'>
      <AppToolbar />
    </AppBar>
  );
};

export default Header;
