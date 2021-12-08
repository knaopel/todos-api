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
import TodoService from '../services/todo-service';
import { useAuthContext } from '../contexts/AuthContext';

dayjs.extend(relativeTime);

export const TodoItem = ({ todo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const handleEdit = event => {
    const { id } = todo;
    navigate(`/todos/${id}/edit`);
  };

  const handleComplete = () => {
    setIsLoading(true);
    const todoSvc = new TodoService(token);
    todoSvc
      .completeTodo(todo)
      .then(data => {
        console.log(data);
        setIsLoading(false);
      }).catch(err => {
        console(err);
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
          {/* TODO: Complete this action */}
          <Button
            size="small"
            color="secondary"
            title="Complete"
            onClick={handleComplete}
            disabled={isLoading}
          >
            <CheckIcon />
          </Button>
          {/* TODO: Complete this action */}
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
