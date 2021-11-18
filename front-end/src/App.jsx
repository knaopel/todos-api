import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import { Login, Home, Signup } from "./pages";
import { Copyright } from "./components";
import theme from "./util/theme";

import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="s">
          <CssBaseline />
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </Router>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
