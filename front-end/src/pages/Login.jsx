import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import axios from "axios";
import { Box } from "@mui/system";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import constants from "../util/constants";
// import MsIcon from '../auth_microsoft.svg';

const API_URI = "http://localhost:5000";

const Login = () => {
  const {authTokenName} = constants;
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userData = {
      email,
      password,
    };
    try {
      const resp = await axios.post(`${API_URI}/auth/login`, userData);
      const token = resp.data.auth_token;
      setToken(token);
      localStorage.setItem(authTokenName, token);
      setLoading(false);
      navigate("/");
    } catch {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <Container>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            variant="outlined"
            fullWidth
            required
            id="email"
            name="email"
            label="Email Address"
            value={email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={
              loading || !Boolean(email.length) || !Boolean(password.length)
            }
          >
            Sign in
          </Button>
        </div>
        <FormGroup>{/* <FormControlLabel /> */}</FormGroup>
      </Box>
    </Container>
  );
};

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
//     width: '100%',
//     marginTop: theme.spacing(1)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   },
//   customError: {
//     color: 'red',
//     fontSize: '0.8rem',
//     marginTop: 10
//   },
//   progess: {
//     position: 'absolute'
//   }
// });
/*
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
*/
export default Login;
