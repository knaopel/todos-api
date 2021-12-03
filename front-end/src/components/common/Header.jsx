import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = isActive => {
    return isActive ? { color: '#F15B2A' } : {};
  };
  return (
    <nav>
      <NavLink to='/' style={({ isActive }) => activeStyle(isActive)} end>
        Home
      </NavLink>
      {' | '}
      <NavLink to='/courses' style={({ isActive }) => activeStyle(isActive)}>
        Courses
      </NavLink>
      {' | '}
      <NavLink to='/about' style={({ isActive }) => activeStyle(isActive)}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
