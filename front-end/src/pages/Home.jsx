import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
  withStyles,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notes as NotesIcon,
  AccountBox as AccountBoxIcon,
  ExitToApp as ExitToAppIcon,
  AccountCircle,
} from "@mui/icons-material";
// import axios from 'axios';
import md5 from "md5";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "axios";
import PublicHome from "../components/PublicHome";
// import Account from '../components/Account';
// import Todo from '../components/Todo';
// import { authMiddleware } from '../util/auth';

// const drawerWidth = 240;
// const API_URI = 'http://localhost:5000';

// const styles = (theme) => ({
//   root: {
//     display: 'flex'
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0
//   },
//   drawerPaper: {
//     width: drawerWidth
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3)
//   },
//   avatar: {
//     height: 110,
//     width: 100,
//     flexShrink: 0,
//     flexGrow: 0,
//     marginTop: 20
//   },
//   uiProgess: {
//     position: 'fixed',
//     zIndex: '1000',
//     height: '31px',
//     width: '31px',
//     left: '50%',
//     top: '35%'
//   },
//   toolbar: theme.mixins.toolbar
// });

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const { token, user, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  // const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/user`, { headers: { Authorization: token } })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  // const handleChange = () => {
  //   setAuth(!auth);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading === true) {
    return <CircularProgress size={150} />;
  }
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login-switch"
              />
            }
            label={auth ? "Login" : "Logout"}
          />
        </FormGroup> */}
        <AppBar position="static">
          <Toolbar>
            {token && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              align="center"
            >
              Honey Dew
            </Typography>
            {token && (
              <>
                <Typography variant="body1" component="div">
                  {user?.email}
                </Typography>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My Account</MenuItem>
                  </Menu>
                </div>
              </>
            )}
          </Toolbar>
        </AppBar>
        {!token && <PublicHome />}
      </Box>
      {/* <Drawer variant="permanent">
        <Divider />
        <Avatar />
        <Typography variant="body1">Kurt Opel</Typography>
        <Divider />
        <List>
          <ListItem button key="Todo">
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="Account">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="Logout">
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer> */}
    </Container>
  );
};

// export class Home extends Component {
//   state = {
//     render: false
//   }

//   loadAccountPage = (event) => {
//     this.setState({ render: true });
//   }
//   loadTodoPage = (event) => {
//     this.setState({ render: false });
//   }

//   logoutHandler = (event) => {
//     localStorage.removeItem('AuthToken');
//     this.props.history.push('/login');
//   }

//   buildAvatarUrl(email) {
//     const fomattedEmail = ('' + email).trim().toLowerCase();
//     const hash = md5(fomattedEmail);
//     const src = `//www.gravatar.com/avatar/${hash}.jpg`;
//     return src;
//   }

//   constructor(props) {
//     super(props)

//     this.state = {
//       render: false,
//       name: '',
//       authToken: '',
//       uiLoading: true,
//       imageLoading: false
//     }
//   }

//   componentWillMount = () => {
//     authMiddleware(this.props.history);
//     const authToken = localStorage.getItem('AuthToken');
//     this.setState({authToken:authToken});
//     axios.defaults.headers.common = { Authorization: `${authToken}` }
//     axios
//       .get(`${API_URI}/user`)
//       .then(resp => {
//         console.log(resp.data);
//         this.setState({
//           name: resp.data.name,
//           email: resp.data.email,
//           uiLoading: false
//         })
//       })
//       .catch(err => {
//         if (err.response.status === 401) {
//           this.props.history.push('/login');
//         }
//         console.log(err);
//         this.setState({ errorMsg: 'Error in retrieving data' });
//       })
//   }

//   render() {
//     const { classes } = this.props;
//     if (this.state.uiLoading === true) {
//       return (
//         <div className={classes.root}>
//           {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
//         </div>
//       )
//     } else {
//       return (
//         <div className={classes.root}>
//           <CssBaseline />
//           <AppBar position="fixed" className={classes.appBar}>
//             <Toolbar>
//               <Typography variant="h6" noWrap>
//                 Todos App
//               </Typography>
//             </Toolbar>
//           </AppBar>
//           <Drawer
//             className={classes.drawer}
//             variant="permanent"
//             classes={{ paper: classes.drawerPaper }}
//           >
//             <div className={classes.toolbar} />
//             <Divider />
//             <center>
//               <Avatar className={classes.avatar} src={this.buildAvatarUrl(this.state.email)} />
//               <p>
//                 {' '} {this.state.name}
//               </p>
//             </center>
//             <Divider />
//             <List>
//               <ListItem button key="Todo" onClick={this.loadTodoPage}>
//                 <ListItemIcon>
//                   {/* {' '} */}
//                   <NotesIcon />
//                 </ListItemIcon>
//               </ListItem>
//               <ListItem button key="Acount" onClick={this.loadAccountPage}>
//                 <ListItemIcon>
//                   {/* {' '} */}
//                   <AccountBoxIcon />
//                 </ListItemIcon>
//               </ListItem>
//               <ListItem button key="Logout" onClick={this.logoutHandler}>
//                 <ListItemIcon>
//                   {/* {' '} */}
//                   <ExitToAppIcon />
//                 </ListItemIcon>
//               </ListItem>
//             </List>
//           </Drawer>
//           <div>{this.state.render ? <Account authToken={this.state.authToken} /> : <Todo />}</div>
//         </div>
//       )
//     }
//   }
// }

// export default withStyles(styles)(Home);
export default Home;
