import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// app specific imports
import { UserTable } from '../components';
import { loadDewers, loadHoneys } from '../redux/actions/userActions';
import * as userApi from '../api/userApi';
// import { loadTodos } from '../redux/actions/todoActions';
// import { CheckOutlined } from '@mui/icons-material';

const HoneysDewers = ({ loading, user, loadDewers, loadHoneys }) => {
  const [email, setEmail] = useState('');
  const [newUser, setNewUser] = useState(null);
  const [searchHoneyOpen, setSearchHoneyOpen] = useState(false);
  const [inviteHoneyOpen, setInviteHoneyOpen] = useState(false);
  const [searchDewerOpen, setSearchDewerOpen] = useState(false);
  const [inviteDewerOpen, setInviteDewerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.auth_token && !user?.honeys?.isLoaded && !loading) {
      loadHoneys(user.auth_token)
        .catch(error => {
          if (error.response.status === 401) {
            navigate('/login');
          }
        });
    }
    if (user.auth_token && !user?.dewers?.isLoaded && !loading) {
      loadDewers(user.auth_token)
        .catch(error => {
          if (error.response.status === 401) {
            navigate('/login');
          }
        });
    }
  }, [user, loading, loadHoneys, loadDewers, navigate]);

  const handleDialogToggle = (value, setter) => {
    setter(!value);
  };

  const handleToggleDialogHoney = () => {
    handleDialogToggle(searchHoneyOpen, setSearchHoneyOpen);
  };

  const handleToggleDialogDewer = () => {
    handleDialogToggle(searchDewerOpen, setSearchDewerOpen);
  };

  const checkUser = async (email, setFunc) => {
    try {
      const { exists } = await userApi.userExists(email, user.auth_token);
      if (exists) {
        setNewUser(email);
      }
      setFunc(!exists);
    } catch ({ response: { data: { exists }, status } }) {
      if (status === 422) {
        setFunc(!exists);
      }
    }
  };


  const handleEmailChange = ({ target: { value, name } }) => {
    setEmail(value);
  };

  const checkHoney = async () => {
    await checkUser(email, setInviteHoneyOpen);
  };

  const checkDewer = async () => {
    await checkUser(email, setInviteDewerOpen);
  };

  // Invitations
  const handleInviteUser = (scope) => {
    console.log(`${email} will be invited as a ${scope}`);
  };

  const handleInviteHoney = () => {
    handleInviteUser('honey');
    setSearchHoneyOpen(false);
    setInviteHoneyOpen(false);
    // handleToggleDialogHoney();
  };

  const handleInviteDewer = () => {
    handleInviteUser('dewer');
  };

  // Add existing user
  const handleAddUser = (scope) => {
    console.log(`${email} will be added to ${scope}`);
  };

  const handleAddHoney = () => {
    handleAddUser('honey');
  };

  const handleAddDewer = () => {
    handleAddUser('dewer');
  };

  return (
    <>
      <Typography variant='h2' component='h1' align='center'>
        Your Honeys &amp; Dewers
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Card variant='outlined'>
            <CardHeader title="Honeys" align='center' subheader='A honey is someone that can assign you a task to you so that you can "dew" it.' />
            <CardContent>
              <UserTable
                users={user?.honeys?.items}
                user={user}
                email={email}
                newUser={newUser}
                handleChange={handleEmailChange}
                handleAdd={handleAddHoney}
                handleInvite={handleInviteHoney}
                toggleDialog={handleToggleDialogHoney}
                searchUserOpen={searchHoneyOpen}
                inviteUserOpen={inviteHoneyOpen}
                honeyOrDewer='Honey'
                checkUser={checkHoney}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant='outlined'>
            <CardHeader title="Dewers" align="center" subheader='You can also add someone to whom you can assign work for them to "dew".' />
            <CardContent>
              <UserTable
                users={user?.dewers?.items}
                user={user}
                email={email}
                toggleDialog={handleToggleDialogDewer}
                handleChange={handleEmailChange}
                handleAdd={handleAddDewer}
                handleInvite={handleInviteDewer}
                searchUserOpen={searchDewerOpen}
                inviteUserOpen={inviteDewerOpen}
                honeyOrDewer='Dewer'
                checkUser={checkDewer}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

HoneysDewers.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ apiCallsInProgress, user }) => {
  return {
    user,
    loading: apiCallsInProgress > 0
  };
};

export default connect(mapStateToProps, { loadHoneys, loadDewers })(HoneysDewers);
