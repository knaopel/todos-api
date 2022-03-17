import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../../../components'
import { selectUser } from '../../../features/users/selectors'
import { fetchLocalUser } from '../../../features/users/usersSlice'
import Main from '../Main/Main'

const Router = () => {
  const user = useSelector(selectUser);
  const [hasLocalUser, setHasLocalUser] = useState(true); // assume there is a local user
  const dispatch = useDispatch();
  useEffect(() => {
    if (hasLocalUser && !user.auth_token) {
      dispatch(fetchLocalUser())
      setHasLocalUser(user.status !== 'failed');
    }
  }, [dispatch, hasLocalUser, user]);

  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  )
}

export default Router