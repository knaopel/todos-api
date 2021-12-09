import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signupUser } from '../redux/actions/userActions';
import { CredentialForm } from "../components";
import { connect } from 'react-redux';

const Signup = ({ signupUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (params) => {
    setIsLoading(true);
    signupUser(params)
      .then(user => {
        setIsLoading(false);
        navigate('/');
      })
      .catch(err => {

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
export default connect(null, { signupUser })(Signup);
