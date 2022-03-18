import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { fetchLocalUser,selectUser } from '../../../features/users/usersSlice'

import Header from '../Header/Header'
import Main from '../Main/Main'

const Router = () => {
  const user = useSelector(selectUser);
  const [checkedForLocalUser, setCheckedForLocalUser] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!checkedForLocalUser && !user.auth_token) {
      dispatch(fetchLocalUser())
      setCheckedForLocalUser(true);
    }
  }, [checkedForLocalUser, dispatch, user]);

  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  )
}

export default Router