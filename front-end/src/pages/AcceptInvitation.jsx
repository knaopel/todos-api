import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';


// app specific imports
import { CredentialForm, dataMap } from '../components';

const AcceptInvitation = ({ acceptUserInvitation }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { token } = useParams();

  const processForm = params => {
    setLoading(true);
    // acceptUserInvitation({ ...params, token })
    //   .then(user => {
        setLoading(false);
        navigate('/');
    //   })
    //   .catch(error => {
    //     setLoading(false);
    //     console.log(error);
    //   });
  };
  return (
    <CredentialForm isLoading={loading} data={dataMap.acceptance} processForm={processForm} />
  );
};

AcceptInvitation.propTypes = {
  acceptUserInvitation: PropTypes.func.isRequired
};

export default AcceptInvitation;
