import { Box, CssBaseline } from '@mui/material';
import React from 'react'
import Router from '../Router/Router';

const ParentBox = () => {
  return (
    <Box sx={{ display: 'flex', p: '1em' }} data-testid="parent-box">
      <CssBaseline />
      <Router/>
    </Box>
  )
}
export default ParentBox;