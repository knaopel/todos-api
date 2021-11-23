import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import {
  Check as CheckIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);

const TodoItem = ({ todo }) => {
  // const handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  return (
    <Grid key={todo.id} item xs={12} sm={6}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {todo.title}
          </Typography>
          <Typography color="textSecondary">
            {dayjs(todo.created_at).fromNow()}
          </Typography>
          <Typography variant="body2" component="p">
            {todo.body}
          </Typography>
        </CardContent>
        <CardActions>
          {/* TODO: Complete this action */}
          <Button
            size="small"
            color="secondary"
            title="Complete"
            onClick={() => console.log("TODO: complete this action", todo)}
          >
            <CheckIcon />
          </Button>
          {/* TODO: Complete this action */}
          <Button
            size="small"
            color="secondary"
            title="Edit"
            onClick={() => console.log("TODO: Complete this action", todo)}
          >
            <EditIcon />
          </Button>
          {/* <Button size="small" color="primary" onClick={() => this.handleViewOpen({ todo })}>
                      {' '}
                      View{' '}
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ todo })}>
                      Edit
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.deleteTodoHandler({ todo })}>
                      Delete
                    </Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TodoItem;
