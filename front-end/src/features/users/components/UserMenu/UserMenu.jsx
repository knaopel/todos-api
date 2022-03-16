import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  CircularProgress,
} from '@mui/material';

import { fetchUser, selectUser, selectUserFetchStatus } from './usersSlice';

const UserMenu = () => {
  const userStatus = useSelector(selectUserFetchStatus);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user.auth_token && !user.name && userStatus !== 'loading') {
      //     setUserLoading(true);
      fetchUser(user.auth_token);
      //     loadUser(user.auth_token)
      //       .then(() => setUserLoading(false))
      //       .catch(error => {
      //         alert('Loading user failed.' + error);
      //         if (error.request.status === 401) {
      //           navigate('/login');
      //         }
      //       });
    }
  }, [user]);
  if (userStatus === 'loading') {
    return <CircularProgress />
  }
  return <div></div>;
};

// UserMenu.propTypes = {};

export default UserMenu;
