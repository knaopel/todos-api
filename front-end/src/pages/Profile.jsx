import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { buildAvatarUrl } from '../util';

const Profile = ({ user, isLoading }) => {
  const [userCopy, setUserCopy] = useState(user);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserCopy(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={buildAvatarUrl(userCopy.email)} />
      <Typography component="h1" variant="h5">
        Profile
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete='name'
              name='name'
              required
              fullWidth
              id='name'
              label='Name'
              autoFocus
              onChange={handleChange}
              value={userCopy.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete='email'
              name='email'
              required
              fullWidth
              id='email'
              label='Email'
              type='email'
              autoFocus
              onChange={handleChange}
              value={userCopy.email}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type='submit'
          loading={isLoading}
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={() => alert('clickey')}
          disabled={false}>
          Update Profile
        </LoadingButton>
      </Box>
    </Box>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    isLoading: state.apiCallsInProgress > 0
  };
};


export default connect(mapStateToProps)(Profile);
