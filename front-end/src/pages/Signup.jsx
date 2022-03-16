import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signupUser } from '../features/users/usersSlice';
import { CredentialForm, dataMap } from "../components";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (params) => {
    try {
      setIsLoading(true);
      dispatch(signupUser(params));
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <CredentialForm
      data={dataMap.signup}
      isLoading={isLoading}
      processForm={handleSubmit}
    />
  );
};
export default Signup;
