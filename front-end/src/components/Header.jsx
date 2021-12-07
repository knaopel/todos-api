import React, { useEffect, useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
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
import { connect } from 'react-redux';
// import { useAuthContext } from "../contexts/AuthContext";
// import contants from "../util/constants";
// import UserService from "../services/user-service";
import { getLocalUser } from '../redux/actions/authActions';
import md5 from 'md5';
import { useNavigate } from 'react-router';

const Header = ({ user, getLocalUser }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { authTokenName } = contants;

  useEffect(() => {
    if (!user?.auth_token) {
      const fetchLocalUser = async () => {
        await getLocalUser();
        if (!user?.auth_token) {
          navigate('/login');
        }
      };
      fetchLocalUser();
    }
    if (user.auth_token && !user.name) {
    //   const userSvc = new UserService(token);
    //   setIsLoading(true);
    //   userSvc
    //     .getUser()
    //     .then(data => {
    //       setUser(data);
    //       setIsLoading(false);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       setIsLoading(false);
    //     });
    }
  }, [user, getLocalUser, navigate]);

  const buildAvatarUrl = email => {
    const formattedEmail = ('' + email).trim().toLowerCase();
    const hash = md5(formattedEmail);
    return `//www.gravatar.com/avatar/${hash}.jpg`;
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // setToken(null);
    // localStorage.removeItem(authTokenName);
    handleClose();
  };

  return (
    <AppBar position='absolute'>
      <Toolbar>
        {user?.auth_token && (
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}
          align='center'
        >
          Honey Dew
        </Typography>
        {user?.auth_token && (
          <>
            {isLoading ? (
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  getLocalUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
