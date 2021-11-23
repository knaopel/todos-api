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
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notes as NotesIcon,
  AccountBox as AccountBoxIcon,
  ExitToApp as ExitToAppIcon,
  AccountCircle,
} from "@mui/icons-material";
import md5 from "md5";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { PublicHome, Todos } from "../components";
import TodoService from "../services/todo-service";
// import Account from '../components/Account';
// import { authMiddleware } from '../util/auth';

const Home = () => {
  const { token } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (token) {
      const todoSvc = new TodoService(token);
      setIsLoading(true);
      todoSvc
        .getTodos()
        .then((data) => {
          setTodos(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [token]);

  if (isLoading === true) {
    return <CircularProgress size={150} />;
  }
  if (!token) {
    return <PublicHome />;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Todos data={todos} />
      <Grid container spacing={2}>
        <Grid item>
          <Typography>TODO: Add a todo, etc...</Typography>
        </Grid>
      </Grid>
    </Box>
    // <Drawer variant="permanent">
    //   <Divider />
    //   <Avatar />
    //   <Typography variant="body1">Kurt Opel</Typography>
    //   <Divider />
    //   <List>
    //     <ListItem button key="Todo">
    //       <ListItemIcon>
    //         <NotesIcon />
    //       </ListItemIcon>
    //     </ListItem>
    //     <ListItem button key="Account">
    //       <ListItemIcon>
    //         <AccountBoxIcon />
    //       </ListItemIcon>
    //     </ListItem>
    //     <ListItem button key="Logout">
    //       <ListItemIcon>
    //         <ExitToAppIcon />
    //       </ListItemIcon>
    //     </ListItem>
    //   </List>
    // </Drawer>
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
