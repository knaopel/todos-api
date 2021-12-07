import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { getLocalUser } from '../../redux/actions/authActions';

const HomePage = ({ user, getLocalUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    debugger;
    if (user?.auth_token) {
      navigate('/todos');
    } else {
      const fetchLocalUser = async () => {
        await getLocalUser();
        if (!user?.auth_token) {
          console.log(`navigate('/login');`);
          navigate('/login');
        }
      };
      fetchLocalUser();
    }
  }, [navigate, getLocalUser, user, user?.auth_token]);

  return (
    <>
      {}
      <div className='jumbotron'>
        <h1>Pluralsight Administration</h1>
        <p>React, Redux and React Router for ultra-responsive web apps.</p>
        <Link to='about' className='btn btn-primary btn-lg'>
          Learn more
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  getLocalUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
