import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CredentialForm } from "../components";
import { selectUserFetchStatus, loginUser } from "../features/users/usersSlice";
import { thunkStatus } from "../util";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStatus = useSelector(selectUserFetchStatus);
  const loading = userStatus === thunkStatus.pending;

  // useEffect(() => {
  //   if (userStatus === thunkStatus.succeeded) {
  //     navigate("/");
  //   }
  // })

  const handleSubmit = async (param) => {
    await dispatch(loginUser(param));
    console.log(param);
    navigate('/');
  };

  return <CredentialForm processForm={handleSubmit} isLoading={loading} />;
};
