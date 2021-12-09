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
import { useNavigate } from 'react-router';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";

dayjs.extend(relativeTime);

export const TodoItem = ({ todo, completeTodo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = event => {
    const { id } = todo;
    navigate(`/todos/${id}/edit`);
  };

  const handleComplete = () => {
    setIsLoading(true);
    completeTodo(todo)
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

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
          <Button
            size="small"
            color="secondary"
            title="Complete"
            onClick={handleComplete}
            disabled={isLoading || todo.is_complete}
          >
            <CheckIcon />
          </Button>
          <Button
            size="small"
            color="secondary"
            title="Edit"
            onClick={handleEdit}
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
