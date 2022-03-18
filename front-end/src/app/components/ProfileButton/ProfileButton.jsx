import { Avatar, CircularProgress, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildAvatarUrl } from '../../../util'
import { handleClose, handleLogout, handleMenu, handleNavigate } from './methods'

const AvatarButton = ({ handleMenu, email, open = false }) => {
  return (
    <IconButton
      size='large'
      id='menu-button'
      aria-label='account of current user'
      aria-controls={open ? 'menu-appbar' : undefined}
      aria-haspopup='true'
      aria-expanded={open ? 'true' : undefined}
      onClick={handleMenu}
      color='inherit'
    >
      <Avatar src={buildAvatarUrl(email)} />
    </IconButton>
  )
}

const ProfileMenu = ({ anchorEl, handleClose, handleNavigate, handleLogout }) => {
  return (
    <Menu
      id='menu-appbar'
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
      <MenuItem onClick={() => handleNavigate('/honeys_dewers')}>Honeys/Dewers</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )
}

const EmailBug = ({ userLoading = false, email }) => {
  if (userLoading) return <CircularProgress />
  return (
    <Typography variant='body1' component='div'>
      {email}
    </Typography>
  )
}

const ProfileWrapper = ({ email, }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  return (
    <div>
      <AvatarButton handleMenu={event => handleMenu(setAnchorEl, event)} email={email} open={Boolean(anchorEl)} />
      <ProfileMenu anchorEl={anchorEl} handleClose={() => handleClose(setAnchorEl)} handleLogout={() => handleLogout(navigate, setAnchorEl)} handleNavigate={path => handleNavigate(navigate, path)} />
    </div>
  )
}

export const ProfileButton = ({ authToken, userLoading, email }) => {
  if (!authToken) return <></>
  return (
    <>
      <EmailBug userLoading={userLoading} email={email} />
      <ProfileWrapper email={email} />
    </>
  )
}
