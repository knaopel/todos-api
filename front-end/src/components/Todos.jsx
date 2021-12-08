import { Grid, Typography } from "@mui/material";
import { TodoItem } from "./";

export const Todos = ({ data }) => {
  console.log(data);
  if (!Boolean(data.length)) {
    return <Typography variant="body1">No Todos</Typography>;
  }
  return (
    <Grid container spacing={2}>
      {data.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Grid>
  );
};