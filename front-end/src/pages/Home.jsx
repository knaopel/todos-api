import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { PublicHome, Todos } from "../components";
import { loadTodos } from '../redux/actions/todoActions';

const Home = ({ user, todos, isLoading, loadTodos }) => {
  useEffect(() => {
    if (user.auth_token && todos.items.length === 0 && !todos.isLoaded && !todos.isLoading) {
      console.log(user);
      loadTodos(user.auth_token).catch(err => {
        alert('Error fetching Todos. ' + err);
      });
    }
  }, [user, todos, loadTodos, isLoading]);

  if (isLoading === true) {
    return <CircularProgress size={150} />;
  }
  if (!user.auth_token) {
    return <PublicHome />;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Todos data={todos?.items} />
      <Grid container spacing={2}>
        <Grid item>
          <Link to="/todos/new">Add A new HoneyDew</Link>
          <Typography>TODO: Add a todo, etc...</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    todos: state.todos,
    isLoading: state.apiCallsInProgress > 0
  };
};

export default connect(mapStateToProps, { loadTodos })(Home);
