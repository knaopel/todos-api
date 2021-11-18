import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";

const CredentialForm = ({
  name,
  email,
  password,
  isLoading,
  handleChange,
  handleSubmit,
}) => {
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
              control={<Checkbox value="allowExtraEmails" color="primary" />}
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
  );
};

export default CredentialForm;
