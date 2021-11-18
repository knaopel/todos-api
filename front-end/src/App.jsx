import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import {Login, Home, Signup} from "./pages";

import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
