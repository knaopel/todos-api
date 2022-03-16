import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from './usersSlice';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupRequestStatus, setSignupRequestStatus] = useState('idle');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log(user);

  const canSave = [email, name, password].every(Boolean) && signupRequestStatus === 'idle';

  const onSignupClicked = () => {
    try {
      setSignupRequestStatus('pending');
      dispatch(signupUser({ name, email, password }));
      console.log(user);
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      console.log(user);
      console.log('Signup failure!');
    } finally {
      console.log(user);
      setSignupRequestStatus('idle');
    }
  }

  return (
    <section>
      <h2>Signup</h2>
      <form>
        <label htmlFor='userName'>Name:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          autoComplete='name'
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        <label htmlFor='userEmail'>EMail:</label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          autoComplete='email'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <label htmlFor='userPassword'>Password:</label>
        <input
          type='password'
          id='userPassword'
          name='userPassword'
          value={password}
          autoComplete='new-password'
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type='button'
          onClick={onSignupClicked}
          disabled={!canSave}
        >Signup</button>
      </form>
    </section>
  );
}
