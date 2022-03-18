import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../../../components'
import { selectUser } from '../../../features/users/selectors'
import { fetchLocalUser } from '../../../features/users/usersSlice'
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