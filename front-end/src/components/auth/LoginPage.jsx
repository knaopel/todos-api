import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../../redux/actions/authActions';
import CredentialForm from './CredentialForm';

const LoginPage = ({ token, loginUser }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loggingIn, setLoggingIn] = useState(false);

  function handleChange({ target }) {
    const { name, value } = target;
    setCredentials(prevCreds => ({
      ...prevCreds,
      [name]: value
    }));
  }

  const formIsValid = () => {
    const { email, password } = credentials;
    const errors = {};

    if (!email) errors.email = 'Email is required.';
    if (!password) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = credentials;
    if (!formIsValid()) return;
    setLoggingIn(true);
    loginUser(email, password)
      .then(() => {
        toast.success('User logged in!');
        setLoggingIn(false);
      })
      .catch(error => {
        setLoggingIn(false);
        setErrors({ onLogin: error.message });
      });
  };

  return (
    <CredentialForm credentials={credentials} loggingIn={loggingIn} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
  );
};


const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

const mapDispatchToProps = {
  loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);