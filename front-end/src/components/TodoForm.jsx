import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";

export const TodoForm = ({ edit, view, todo, loading, handleChange, handleSubmit }) => {
  let pageTitle = "Add Todo";
  if (edit) pageTitle = "Edit Todo";
  else if (todo.id) pageTitle = "View Todo";

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
          loading={loading}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
          disabled={todo.title.length === 0 || todo.body?.length === 0}
        >
          {todo.id ? view ? 'Close' : "Update" : "Add Todo"}
        </LoadingButton>
      </Box>
    </Box>
  );
};
