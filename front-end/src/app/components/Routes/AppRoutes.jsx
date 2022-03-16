import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { selectUser } from '../../../features/users/usersSlice'
import { Home, Login, Signup } from '../../../pages'
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  const user = useSelector(selectUser);
  return (
    <Routes>
            <Route exact path='/' element={<Home />} />
      <Route exact path='login' element={<Login />} />
      <Route exact path='signup' element={<Signup />} />
      {/* <Route path="accept-invitation/:token" element={<AcceptInvitation />} /> */}

      {/* {user.auth_token &&
        <ProtectedRoutes />} */}
    </Routes>
  )
}

export default AppRoutes;