import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// app specific imports
import { buildAvatarUrl, thunkStatus } from '../util';
import { fetchLocalUser, logoutUser, selectUser, selectUserFetchStatus } from '../features/users/usersSlice';
import { fetchUser } from '../features/users/reducers';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userFetchStatus = useSelector(selectUserFetchStatus);
  const userLoading = userFetchStatus === thunkStatus.pending;
  const userFailed = userFetchStatus === thunkStatus.failed;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (user.auth_token) {
      if (!user.name && !userLoading) {
        dispatch(fetchUser(user.auth_token));
      }
      if (userFailed) {
        alert('Loading user failed.' + user.error);
        if (user.error.request.status === 401) {
          navigate('/login');
        }
      }
    } else {
      // no token loaded; try to get the token from local
      if (!userFailed && !userLoading) {
        dispatch(fetchLocalUser());
      }
    }
  }, [dispatch, user, userFetchStatus, navigate, userLoading, userFailed]);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = path => {
    handleClose();
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position='absolute'>
      <Toolbar>
        {/* {user?.auth_token && (
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )} */}
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
        {user?.auth_token && (
          <>
            {userLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant='body1' component='div'>
                {user?.email}
              </Typography>
            )}
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <Avatar src={buildAvatarUrl(user?.email)} />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => handleNavigate('/honeys_dewers')}>Honeys/Dewers</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
