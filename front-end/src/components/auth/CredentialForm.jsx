import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

const CredentialForm = ({ credentials, onChange, onSubmit, loggingIn = false, errors = {} }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      {errors.onLogin && (
        <div className="alert alert-danger" role="alert">
          {errors.onLogin}
        </div>
      )}
      <TextInput name="email" label="Email" value={credentials.email} onChange={onChange} error={errors.email} />
      <TextInput type="password" name='password' label="Password" value={credentials.password} onChange={onChange} error={errors.password} />
      <button type="submit" disabled={loggingIn} className="btn btn-primary">
        {loggingIn ? "logging in..." : "Login"}
      </button>
    </form>
  );
};

CredentialForm.propTypes = {
  credentials: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
  errors: PropTypes.object
};

export default CredentialForm;
