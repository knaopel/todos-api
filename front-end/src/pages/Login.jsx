import React, { Component } from 'react';
import { Avatar, Button, CircularProgress, Container, CssBaseline, Grid, Link, TextField, Typography, withStyles } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import axios from 'axios';
// import MsIcon from '../auth_microsoft.svg';

const API_URI = 'http://localhost:5000';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progess: {
    position: 'absolute'
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: [],
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if ("errors" in nextProps.UI) {
      if (nextProps.UI.errors) {
        this.setState({
          errors: nextProps.UI.errors
        });
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(`${API_URI}/auth/login`, userData)
      .then(response => {
        // console.log(response.data);
        localStorage.setItem('AuthToken', `${response.data.auth_token}`);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error)
        this.setState({
          errors: error.response.data,
          loading: false
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
              disabled={loading || !this.state.email || !this.state.password}
            >
              Sign In
              {loading && <CircularProgress size={30} className={classes.progress} />}
            </Button>
            {/* <Button
              href="/partnerlogin/microsoft"
              fullWidth
              variant="contained"
              color="white"
              startIcon={<SvgIcon>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect id="Rectangle" fill="#F54F0D" x="0" y="0" width="8" height="8"></rect>
                  <rect id="Rectangle" fill="#00A2F2" x="0" y="9" width="8" height="9"></rect>
                  <rect id="Rectangle" fill="#7DBC00" x="9" y="0" width="9" height="8"></rect>
                  <rect id="Rectangle" fill="#FFBA00" x="9" y="9" width="9" height="9"></rect>
                </g>
              </SvgIcon>}
            >Sign in with Microsoft</Button> */}
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {errors.message && (
              <Typography variant="body2" className={classes.customError}>
                {errors.message}
              </Typography>
            )}
          </form>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles)(Login);
