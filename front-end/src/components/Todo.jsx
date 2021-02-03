import { AppBar, Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogContent as MuiDialogContent, DialogTitle as MuiDialogTitle, Grid, IconButton, Slide, TextField, Toolbar, Typography, withStyles } from '@material-ui/core'
import { AddCircle as AddCircleIcon, Close as CloseIcon } from '@material-ui/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Component } from 'react'
import { authMiddleware } from '../util/auth';

const API_URI = 'http://localhost:5000'

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  submitButton: {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: 14,
    right: 10
  },
  floatingButton: {
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  form: {
    width: '98%',
    marginLeft: 13,
    marginTop: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  root: {
    minWidth: 470
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  pos: {
    marginBottom: 12
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%'
  },
  dialogeStyle: {
    maxWidth: '50%'
  },
  viewRoot: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: '',
      title: '',
      body: '',
      todoId: '',
      errors: [],
      open: false,
      uiLoading: true,
      buttonType: '',
      viewOpen: false
    };

    this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
    this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
    this.handleViewOpen = this.handleViewOpen.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentWillMount = () => {
    authMiddleware(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` }
    axios
      .get('http://localhost:5000/todos')
      .then(resp => {
        console.log(resp.data)
        this.setState({
          todos: resp.data,
          uiLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });

  }

  deleteTodoHandler(data) {
    authMiddleware(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` }
    let todoId = data.todo.id;
    axios
      .delete(`${API_URI}/todos/${todoId}`)
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleEditClickOpen(data) {
    this.setState({
      title: data.todo.title,
      todoId: data.todo.id,
      buttonType: 'Edit',
      open: true
    })
  }
  handleViewOpen(data) {
    this.setState({
      title: data.todo.title,
      viewOpen: true
    })
  }

  render() {
    const DialogTitle = withStyles(styles)(props => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });

    const DialogContent = withStyles(theme => ({
      viewRoot: {
        padding: theme.spacing(2)
      }
    }))(MuiDialogContent);

    dayjs.extend(relativeTime);
    const { classes } = this.props;
    const { open, errors, viewOpen } = this.state;

    const handleClickOpen = () => {
      this.setState({
        todoId: '',
        title: '',
        body: '',
        buttonType: '',
        open: true
      })
    };

    const handleSubmit = event => {
      authMiddleware(this.props.history);
      event.preventDefault();
      const userTodo = {
        title: this.state.title
      }
      let options = {};
      if (this.state.buttonType === 'Edit') {
        options = {
          url: `${API_URI}/todos/${this.state.todoId}`,
          method: 'put',
          data: userTodo
        };
      } else {
        options = {
          url: `${API_URI}/todos`,
          method: 'post',
          data: userTodo
        };
      }
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` }
      axios(options)
        .then(() => {
          this.setState({ open: false });
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          this.setState({
            open: true,
            errors: err.respoonse.data
          })
        })
    };

    const handleViewClose = () => {
      this.setState({ viewOpen: false })
    };

    const handleClose = () => {
      this.setState({ open: false })
    };

    if (this.state.uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
        </main>
      )
    } else {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <IconButton
            className={classes.floatingButton}
            color="primary"
            aria-label="Add Todo"
            onClick={handleClickOpen}
          >
            <AddCircleIcon style={{ fontSize: 60 }} />
          </IconButton>
          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.AppBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {this.state.buttonType === 'Edit' ? 'Edit Todo' : 'Create Todo'}
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={handleSubmit}
                  className={classes.submitButton}
                >
                  {this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
                </Button>
              </Toolbar>
            </AppBar>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="todoTitle"
                    label="Todo Title"
                    name="title"
                    autoComplete="todoTitle"
                    helperText={errors.title}
                    value={this.state.title}
                    error={errors.title ? true : false}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
            </form>
          </Dialog>
          <Grid container spacing={2}>
            {this.state.todos.map(todo => (
              <Grid key={todo.id} item xs={12} sm={6}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {todo.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {dayjs(todo.created_at).fromNow()}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {todo.items[0]?.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => this.handleViewOpen({ todo })}>
                      {' '}
                      View{' '}
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ todo })}>
                      Edit
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.deleteTodoHandler({ todo })}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Dialog
            onClose={handleViewClose}
            aria-labeledby="customized-dialog-title"
            open={viewOpen}
            fullWidth
            classes={{ paperFullWidth: classes.dialogeStyle }}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
              {this.state.title}
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                fullWidth
                id="todoDetails"
                name="body"
                multiline
                readonly
                rows={1}
                rowsMax={25}
                value={this.state.body}
                InputProps={{
                  disableUnderline: true
                }}
              />
            </DialogContent>
          </Dialog>
        </main>
      )
    }
  }
}
export default withStyles(styles)(Todo);