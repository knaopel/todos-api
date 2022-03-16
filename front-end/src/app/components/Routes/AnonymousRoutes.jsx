import React from 'react'
import { Route } from 'react-router-dom'

import { Home, Login, Signup } from '../../../pages';

const AnonymousRoutes = () => {
  return (
    <React.Fragment>
      <Route exact path='/' element={<Home />} />
      <Route exact path='login' element={<Login />} />
      <Route exact path='signup' element={<Signup />} />
      {/* <Route path="accept-invitation/:token" element={<AcceptInvitation />} /> */}
    </React.Fragment>
  )
};

export default AnonymousRoutes;