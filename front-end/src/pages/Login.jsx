import React, { useState } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router";
import { loginUser } from '../redux/actions/userActions';
import { CredentialForm } from "../components";

const Login = ({ loginUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (param) => {
    setLoading(true);
    try {
      await loginUser(param.email, param.password);
      setLoading(false);
      navigate("/");
    } catch {
      setLoading(false);
    }
  };

  return <CredentialForm processForm={handleSubmit} isLoading={loading} />;
};

const mapDispatchToProps = {
  loginUser
};
export default connect(null, mapDispatchToProps)(Login);
