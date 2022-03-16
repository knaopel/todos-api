import React from 'react'
import { Route } from 'react-router-dom';
import TodoRoutes from '../../../features/users/components/Routes/TodoRoutes';
import { HoneysDewers, Profile } from '../../../pages'

const ProtectedRoutes = () => {
  return (
    <>
      <Route path='todos'>
        <TodoRoutes />
      </Route>
      <Route path='profile' element={<Profile />} />
      <Route path='honeys-dewers' element={<HoneysDewers />} />
    </>
  )
};

export default ProtectedRoutes;