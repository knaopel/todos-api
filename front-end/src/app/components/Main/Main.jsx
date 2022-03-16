import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Copyright } from '../../../components'
import AppRoutes from '../Routes/AppRoutes'

const Main = () => {
  return (
    <Box component='main' sx={{ flexGrow: 1 }}>
      <Toolbar />
      <AppRoutes />
      <Copyright sx={{ mt: 5 }} />
    </Box>
  )
}

export default Main;