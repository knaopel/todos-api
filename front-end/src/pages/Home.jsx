import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PublicHome, Todos } from "../components";

const Home = ({ user, todos, isLoading, loadTodos, completeTodo }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user.auth_token && !todos.isLoaded && !todos.isLoading) {
      // loadTodos(user.auth_token).catch(err => {
      //   if (err.response.status === 401) {
      //     navigate('/login');
      //   }
      // });
    }
  }, [navigate, user, todos, loadTodos, isLoading]);

  const handleComplete = (todo) => {
    // return completeTodo(todo, user.auth_token);
  };

  if (isLoading === true) {
    return <CircularProgress size={150} />;
  }
  if (!user.auth_token) {
    return <PublicHome />;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Todos data={todos?.items} completeTodo={handleComplete} />
      <Grid container spacing={2}>
        <Grid item>
          <Link to="/todos/new">Add A new HoneyDew</Link>
          <Typography>TODO: Add a todo, etc...</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

// const mapStateToProps = state => {
//   return {
//     user: state.user,
//     todos: state.todos,
//     isLoading: state.apiCallsInProgress > 0
//   };
// };

export default Home;
