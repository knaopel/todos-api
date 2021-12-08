import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export const PublicHome = () => {
  const navigate = useNavigate();
  const handleClick = (action) => {
    navigate(`/${action}`);
  };
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="body1" component="p">
        Welcome to the online, digital "Honey Dew" list!
      </Typography>
      <Typography variant="body1" component="p">
        If you are new, simply{" "}
        <Link href="/signup" underline="hover">
          sign-up
        </Link>{" "}
        and add your "Honey" to allow them to assign you tasks. If you are a
        "Dew"er, you will see the tasks assigned to you by your "Honey". You can
        even assign tasks to people identified as your "Dew"ers.
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        For returning users,{" "}
        <Link href="/login" underline="hover">
          log in
        </Link>{" "}
        to get started!
      </Typography>
      <Stack spacing={2} direction="column">
        <Button
          variant="contained"
          size="large"
          onClick={() => handleClick("signup")}
        >
          Sign up
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => handleClick("login")}
        >
          Log in
        </Button>
      </Stack>
    </Box>
  );
};
