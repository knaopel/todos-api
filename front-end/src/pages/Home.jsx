import { AppBar, Avatar, CircularProgress, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, Toolbar, Typography, withStyles } from '@material-ui/core';
import { Notes as NotesIcon, AccountBox as AccountBoxIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import axios from 'axios';
import md5 from 'md5';
import React, { Component } from 'react'
import Account from '../components/Account';
import Todo from '../components/Todo';
import { authMiddleware } from '../util/auth';

const drawerWidth = 240;
const API_URI = 'http://localhost:5000';


const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    marginTop: 20
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%'
  },
  toolbar: theme.mixins.toolbar
});

export class Home extends Component {
  state = {
    render: false
  }

  loadAccountPage = (event) => {
    this.setState({ render: true });
  }
  loadTodoPage = (event) => {
    this.setState({ render: false });
  }

  logoutHandler = (event) => {
    localStorage.removeItem('AuthToken');
    this.props.history.push('/login');
  }

  buildAvatarUrl(email) {
    const fomattedEmail = ('' + email).trim().toLowerCase();
    const hash = md5(fomattedEmail);
    const src = `//www.gravatar.com/avatar/${hash}.jpg`;
    return src;
  }

  constructor(props) {
    super(props)

    this.state = {
      render: false,
      name: '',
      uiLoading: true,
      imageLoading: false
    }
  }

  componentWillMount = () => {
    authMiddleware(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` }
    axios
      .get(`${API_URI}/user`)
      .then(resp => {
        console.log(resp.data);
        this.setState({
          name: resp.data.name,
          email: resp.data.email,
          uiLoading: false
        })
      })
      .catch(err => {
        if (err.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(err);
        this.setState({ errorMsg: 'Error in retrieving data' });
      })
  }


  render() {
    const { classes } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <div className={classes.root}>
          {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Todos App
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <center>
              <Avatar className={classes.avatar} src={this.buildAvatarUrl(this.state.email)} />
              <p>
                {' '} {this.state.name}
              </p>
            </center>
            <Divider />
            <List>
              <ListItem button key="Todo" onClick={this.loadTodoPage}>
                <ListItemIcon>
                  {/* {' '} */}
                  <NotesIcon />
                </ListItemIcon>
              </ListItem>
              <ListItem button key="Acount" onClick={this.loadAccountPage}>
                <ListItemIcon>
                  {/* {' '} */}
                  <AccountBoxIcon />
                </ListItemIcon>
              </ListItem>
              <ListItem button key="Logout" onClick={this.logoutHandler}>
                <ListItemIcon>
                  {/* {' '} */}
                  <ExitToAppIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </Drawer>
          <div>{this.state.render ? <Account /> : <Todo />}</div>
        </div>
      )
    }
  }
}

export default withStyles(styles)(Home);
