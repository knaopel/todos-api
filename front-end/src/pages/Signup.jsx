import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import constants from "../util/constants";
import { CredentialForm } from "../components";

const API_URI = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuthContext();
  const { authTokenName } = constants;
  const navigate = useNavigate();

  const handleSubmit = (params) => {
    setIsLoading(true);
    axios
      .post(`${API_URI}/signup`, params)
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
    <CredentialForm
      isSignup={true}
      isLoading={isLoading}
      processForm={handleSubmit}
    />
  );
};
export default Signup;
