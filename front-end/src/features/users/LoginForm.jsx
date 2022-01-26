import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from './usersSlice';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginRequestStatus, setLoginRequestStatus] = useState('idle');
  const dispatch = useDispatch();

  const onLoginClicked = async () => {
    try {
      setLoginRequestStatus('pending');
      await dispatch(loginUser({ email, password })).unwrap();
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log('Login failure!');
    } finally {
      setLoginRequestStatus('idle');
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <form>
        <label htmlFor='userEmail'>EMail:</label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <label htmlFor='userPassword'>Password:</label>
        <input
          type='password'
          id='userPassword'
          name='userPassword'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type='button'
          onClick={onLoginClicked}
        >Login</button>
      </form>
    </section>)
}
