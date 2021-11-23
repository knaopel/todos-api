import { LoadingButton } from "@mui/lab";
import { Box, Grid, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import TodoService from "../services/todo-service";

const TodoForm = ({ edit, view, id }) => {
  const { token, user } = useAuthContext();
  const pageTitle = edit ? "Edit Todo" : "View Todo";
  const [todo, setTodo] = useState({ title: "", body: "" });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (token && id) {
      const todoSvc = new TodoService(token);
      todoSvc
        .getTodo(id)
        .then((data) => {
          setTodo(data);
        })
        .catch((err) => console.log(err));
    }
  }, [id, token]);

  const handleChange = ({ target }) => {
    const updatedTodo = { ...todo };
    updatedTodo[target.name] = target.value;
    setTodo(updatedTodo);
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        {pageTitle}
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              required
              fullWidth
              id="title"
              label="Title"
              inputProps={{ readOnly: Boolean(view) }}
              onChange={handleChange}
              value={todo?.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              name="body"
              required
              fullWidth
              id="body"
              label="Body"
              inputProps={{ readOnly: Boolean(view) }}
              onChange={handleChange}
              value={todo?.body}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          loading={isLoading}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => console.log("handleSubmit()")}
          disabled={false}
        >
          {id ? "Update" : "Add Todo"}
        </LoadingButton>
      </Box>
      {view && <div>Viewing #{id}</div>}
      {edit && <div>Editing #{id}</div>}
      {!edit && !view && <div>Adding</div>}
    </Box>
  );
};

export default TodoForm;
