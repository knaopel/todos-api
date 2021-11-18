import { createContext, useContext, useState } from "react";

// Auth Context
export const AuthContext = createContext({
  token: null,
  setToken: (data) => {},
  user: null,
  setUser: (data) => {},
});

// Use Auth Context
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const value = {
    token: token,
    setToken: setToken,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
