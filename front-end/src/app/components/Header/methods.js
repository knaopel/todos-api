import React from 'react'
import { logoutUser } from '../../../features/users/usersSlice';

export const handleHomeClick = navigate => {
  navigate('/');
}

export const handleMenu = event => {
  setAnchorEl(event.currentTarget);
};

export const handleClose = () => {
  setAnchorEl(null);
};

export const handleNavigate = (navigate,path) => {
  handleClose();
  navigate(path);
};

export const handleLogout = (dispatch,navigate) => {
  dispatch(logoutUser());
  handleClose();
  navigate('/');
};