import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { PublicHome, Todos } from "../components";
import { selectOpenTodos, selectTodosStatus } from "../features/todos/todosSlice";
import {thunkStatus as status} from '../util';

const Home = ({ user, isLoading }) => {
  const navigate = useNavigate();
  const todos = useSelector(selectOpenTodos);
  const todosStatus = useSelector(selectTodosStatus);
  const todosLoading = todosStatus === status.pending;
  const todosSucceeded = todosStatus === status.succeeded;
  // useEffect(() => {
  //   debugger;
  //   if (user.auth_token && !todosSucceeded && !todosLoading) {
  //     // loadTodos(user.auth_token).catch(err => {
  //     //   if (err.response.status === 401) {
  //     //     navigate('/login');
  //     //   }
  //     // });
  //   }
  // }, [navigate, user, todos, isLoading]);

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
      {/* <Todos data={todos?.items} completeTodo={handleComplete} /> */}
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
