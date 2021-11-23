import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import contants from "../util/constants";
import UserService from "../services/user-service";

const Header = () => {
  const { token, setToken, user, setUser } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authTokenName } = contants;

  useEffect(() => {
    if (!token) {
      const storToken = localStorage.getItem(authTokenName);
      if (storToken) setToken(storToken);
    }
    if (token && !user.email) {
      const userSvc = new UserService(token);
      setIsLoading(true);
      userSvc
        .getUser()
        .then((data) => {
          setUser(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [user, setUser, token, setToken, authTokenName]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem(authTokenName);
    handleClose();
  };

  return (
    <AppBar position="absolute">
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
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="body1" component="div">
                {user?.email}
              </Typography>
            )}
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
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
