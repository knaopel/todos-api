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
import { buildAvatarUrl } from '../util';
import { fetchUser, logoutUser, selectUser, selectUserFetchStatus } from '../features/users/usersSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userFetchStatus = useSelector(selectUserFetchStatus);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    if (user.auth_token) {
      if (!user.name && !userLoading) {
        setUserLoading(true);
        dispatch(fetchUser(user.auth_token));
      }
      if (userFetchStatus === 'succeeded') {
        setUserLoading(false);
      }
      if (userFetchStatus === 'failed') {
        setUserLoading(false);
        // alert('Loading user failed.' + error);
        // if (error.request.status === 401) {
        //   navigate('/login');
        // }
      }
    }
  }, [dispatch, user, userFetchStatus, userLoading, navigate]);

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
    logoutUser();
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
