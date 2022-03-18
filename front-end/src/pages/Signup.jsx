import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { selectUser, selectUserFetchStatus, signupUser } from '../features/users/usersSlice';
import { CredentialForm, dataMap } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { thunkStatus } from "../util";

const Signup = () => {
  const user = useSelector(selectUser);
  const userFetchStatus = useSelector(selectUserFetchStatus);
  const isLoading = userFetchStatus === thunkStatus.pending;
  const hasFailed = userFetchStatus === thunkStatus.failed;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && user.auth_token) {
      navigate('/');
    } else if (hasFailed) {
      // TODO: feedback to user
      console.log('log the error', user.error)
    }
  }, [hasFailed, isLoading, navigate, user])

  const handleSubmit = (params) => {
    dispatch(signupUser(params));
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
