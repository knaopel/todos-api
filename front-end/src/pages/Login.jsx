import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CredentialForm } from "../components";
import { selectUser, selectUserFetchStatus, loginUser } from "../features/users/usersSlice";
import { thunkStatus } from "../util";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserFetchStatus);
  const loading = userStatus === thunkStatus.pending;

  useEffect(() => {
    if (userStatus === thunkStatus.failed) {
      alert('login failed');
    }
    if (userStatus === thunkStatus.succeeded
      && user.auth_token) {
      navigate("/");
    }
  }, [navigate, user, userStatus]);

  const handleSubmit = param => {
    dispatch(loginUser(param));
  };

  return <CredentialForm processForm={handleSubmit} isLoading={loading} />;
};
