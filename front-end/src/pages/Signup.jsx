import React, { useState } from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import constants from "../util/constants";
import { Copyright } from "../components";

const theme = createTheme();
const API_URI = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuthContext();
  const { authTokenName } = constants;
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "name":
        setName(target.value);
        break;
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const param = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    axios
      .post(`${API_URI}/signup`, param)
      .then((resp) => {
        const { data } = resp;
        const { auth_token } = data;
        setToken(auth_token);
        localStorage.setItem(authTokenName, auth_token);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                  value={name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  id="email"
                  label="Email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive information, marketing promotions, and updates via email."
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              loading={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              disabled={
                !Boolean(name.length) ||
                !Boolean(email.length) ||
                !Boolean(password.length)
              }
            >
              Sign up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Signup;

// const styles = (theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   },
//   progess: {
//     position: 'absolute'
//   }
// });

// export class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       email: '',
//       password: '',
//       password_confirmation: '',
//       errors: [],
//       loading: false
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.UI.errors) {
//       this.setState({
//         errors: nextProps.UI.errors
//       });
//     }
//   }

//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.setState({ loading: true });
//     const newUserData = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       password_confirmation: this.state.password_confirmation
//     };

//     axios
//       .post('http://localhost:5000/signup', newUserData)
//       .then(resp => {
//         localStorage.setItem('AuthToken', `${resp.data.auth_token}`);
//         this.setState({ loading: false });
//         this.props.history.push('/');
//       })
//       .catch(err => {
//         this.setState({
//           errors: err.response.data,
//           loading: false
//         });
//       })
//   }

//   render() {
//     const { classes } = this.props;
//     const { errors, loading } = this.state;
//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign Up
//           </Typography>
//           <form className={classes.form} noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="name"
//               label="Name"
//               name="name"
//               autoComplete="name"
//               helperText={errors.name}
//               error={errors.name ? true : false}
//               onChange={this.handleChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               name="email"
//               autoComplete="email"
//               helperText={errors.email}
//               error={errors.email ? true : false}
//               onChange={this.handleChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               type="password"
//               id="password"
//               label="Password"
//               name="password"
//               autoComplete="current-password"
//               helperText={errors.password}
//               error={errors.password ? true : false}
//               onChange={this.handleChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               type="password"
//               id="password_confirmation"
//               label="Confirm Password"
//               name="password_confirmation"
//               autoComplete="current-password"
//               helperText={errors.password_confirmation}
//               error={errors.password_confirmation ? true : false}
//               onChange={this.handleChange}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//               onClick={this.handleSubmit}
//               disabled={loading ||
//                 !this.state.name ||
//                 !this.state.email ||
//                 !this.state.password ||
//                 !this.state.password_confirmation
//               }
//             >
//               Sign Up
//               {loading && <CircularProgress size={30} className={classes.progess} />}
//             </Button>
//             <Grid container justify="flex-end">
//               <Grid item>
//                 <Link href="login" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//       </Container>
//     )
//   }
// }

// export default withStyles(styles)(Signup);
