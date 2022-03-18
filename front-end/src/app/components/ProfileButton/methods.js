import { logoutUser } from '../../../features/users/usersSlice';
import store from '../../store';

export const handleClose = setAnchorEl => {
  setAnchorEl(null);
};

export const handleMenu = (setAnchorEl, event) => {
  setAnchorEl(event.currentTarget);
};

export const handleNavigate = (navigate, path) => {
  navigate(path);
};

export const handleLogout = (navigate, setAnchorEl) => {
  store.dispatch(logoutUser());
  handleClose(setAnchorEl);
  navigate('/');
};
