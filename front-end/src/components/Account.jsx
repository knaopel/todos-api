import { Button, Card, CardActions, CardContent, CircularProgress, Divider, Grid, TextField, Typography, withStyles } from '@mui/material';
// import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import axios from 'axios';
import clsx from 'clsx';
import React, { Component } from 'react';
import { authMiddleware } from '../util/auth';
import HoneyTable from './HoneyTable';

const API_URI = 'http://localhost:5000';
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  locationText: {
    paddingLeft: '15px'
  },
  buttonProperty: {
    position: 'absolute',
    top: '50%'
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%'
  },
  progess: {
    position: 'absolute'
  },
  uploadButton: {
    marginLeft: '8px',
    margin: theme.spacing(1)
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  submitButton: {
    marginTop: '10px'
  }
});

class Account extends Component {
  constructor(props) {
    super(props)
    this.authToken = props.authToken;

    this.state = {
      name: '',
      email: '',
      uiLoading: true,
      buttonLoading: false,
      imageError: ''
    };
  }

  componentDidMount = () => {
    axios.defaults.headers.common = { Authorization: `${this.props.authToken}` };
    axios
      .get(`${API_URI}/user`)
      .then(resp => {
        console.log(resp.data);
        this.setState({
          name: resp.data.name,
          email: resp.data.email,
          uiLoading: false
        });
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(err);
        this.setState({ errorMsg: 'Error in retrieving the data' });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleImageChange = (event) => { }

  profilePictureHandler = (event) => { }

  updateFormValues = (event) => {
    event.preventDefault();
    this.setState({
      buttonLoading: true
    });
    authMiddleware(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    const formRequest = {
      name: this.state.name,
      email: this.state.email
    };
    axios
      .put(`${API_URI}/user`, formRequest)
      .then(() => {
        this.setState({ buttonLoading: false });
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(err);
        this.setState({ buttonLoading: false });
      });

  }

  render() {
    const { classes, ...rest } = this.props;
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
          <Card {...rest} className={clsx(classes.root, classes)}>
            <CardContent>
              <div className={classes.details}>
                <div>
                  <Typography className={classes.locationText} gutterBottom variant="h4">
                    {this.state.name}
                  </Typography>
                  {/* <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    size="small"
                    startIcon={<CloudUploadIcon />}
                    className={classes.uploadButton}
                    onClick={this.profilePictureHandler}
                  >
                    Upload Photo
                  </Button> */}
                  {/* <input type="file" onChange={this.handleImageChange} /> */}
                  {/* {this.state.imageError ? (
                    <div className={classes.customError}>
                      {' '}
                      Wrong Image Format || Supported Format are PNG and JPG
                    </div>
                  ) : (
                      false
                    )} */}
                </div>
              </div>
              <div className={classes.progress} />
            </CardContent>
            <Divider />
          </Card>
          <br />
          <Card {...rest} className={clsx(classes.root, classes)}>
            <form autoComplete="off" noValidate>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      margin="dense"
                      name="name"
                      variant="outlined"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      margin="dense"
                      name="email"
                      variant="outlined"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions />
            </form>
          </Card>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.submitButton}
            onClick={this.updateFormValues}
            disabled={
              this.state.buttonLoading ||
              !this.state.name ||
              !this.state.email
            }
          >
            Save Details
            {this.state.buttonLoading && <CircularProgress size={30} className={classes.progress} />}
          </Button>
          <HoneyTable authToken={this.authToken} />
        </main>
      )
    }
  }
}

export default withStyles(styles)(Account);