import { Grid, Typography } from "@mui/material";
import TodoItem from "./TodoItem";

const Todos = ({ data }) => {
  if (!Boolean(data.length)) {
    return <Typography variant="body1">No Todos</Typography>;
  }
  return (
    <Grid container spacing={2}>
      {data.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </Grid>
  );
};

export default Todos;
