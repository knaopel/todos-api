import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useAuthContext } from "../contexts/AuthContext";
import { PublicHome, Todos } from "../components";
// import TodoService from "../services/todo-service";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// import authStore from '../stores/authStore';

const Home = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  // const [token] = useState(authStore.getToken());

  // useEffect(() => {
  //   if (token) {
  //     const todoSvc = new TodoService(token);
  //     setIsLoading(true);
  //     todoSvc
  //       .getTodos()
  //       .then((data) => {
  //         setTodos(data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setIsLoading(false);
  //       });
  //   }
  // }, [token]);

  if (isLoading === true) {
    return <CircularProgress size={150} />;
  }
  if (!user.auth_token) {
    return <PublicHome />;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Todos data={todos} /> */}
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
    user: state.user
  };
};

export default connect(mapStateToProps)(Home);
