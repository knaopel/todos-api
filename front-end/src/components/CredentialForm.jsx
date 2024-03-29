import {
  Avatar,
  Box,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export const dataMap = {
  acceptance: {
    title: 'Accept Invitation',
    link: null,
    text: null
  },
  signup: {
    title: "Sign Up",
    link: "/login",
    text: "Already have an account? Log In",
  },
  login: {
    title: "Log In",
    link: "/signup",
    text: "Don't have a login? Sign Up",
  },
};

export const CredentialForm = ({ isLoading, processForm, data = dataMap.login }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let params = { password };
    if (data !== dataMap.login) {
      params.name = name;
    }
    if (data !== dataMap.acceptance) {
      params.email = email;
    }
    processForm(params);
  };

  return (
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
        {data.title}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {(data !== dataMap.login) && (
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
          )}
          {
            (data !== dataMap.acceptance) &&
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
          }
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
        </Grid>
        <LoadingButton
          type="submit"
          loading={isLoading}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
          disabled={
            ((data === dataMap.signup) && !Boolean(name.length)) ||
            ((data !== dataMap.acceptance) && !Boolean(email.length)) ||
            !Boolean(password.length)
          }
        >
          {data.title}
        </LoadingButton>
        {data.link && <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href={data.link} variant="body2">
              {data.text}
            </Link>
          </Grid>
        </Grid>}
      </Box>
    </Box>
  );
};